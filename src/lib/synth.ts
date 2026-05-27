/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export class AuraSynth {
  private ctx: AudioContext | null = null;
  
  // Audio Nodes
  private masterGain: GainNode | null = null;
  private synthGain: GainNode | null = null;
  private windGain: GainNode | null = null;
  private rainGain: GainNode | null = null;
  private binauralGain: GainNode | null = null;

  // Sound Sources & Processors
  private oscillators: OscillatorNode[] = [];
  private windSource: AudioBufferSourceNode | null = null;
  private rainSource: AudioBufferSourceNode | null = null;
  private binauralOscL: OscillatorNode | null = null;
  private binauralOscR: OscillatorNode | null = null;
  
  // LFOs for organic movement
  private windLFOGain: GainNode | null = null;
  private windLFO: OscillatorNode | null = null;
  private filterLFO: OscillatorNode | null = null;
  private synthFilter: BiquadFilterNode | null = null;

  // Analyser for real-time visual waves
  public analyser: AnalyserNode | null = null;

  private isRunning: boolean = false;

  constructor() {
    // AudioContext will be lazily initialized on user gesture
  }

  private initContext() {
    if (this.ctx) return;
    
    // Create AudioContext with fallback support
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioContextClass) {
      console.warn("Web Audio API is not supported in this browser.");
      return;
    }

    this.ctx = new AudioContextClass();
    
    // Setup Analyser
    this.analyser = this.ctx.createAnalyser();
    this.analyser.fftSize = 128;
    
    // Master Output Chain
    this.masterGain = this.ctx.createGain();
    this.masterGain.gain.setValueAtTime(0.001, this.ctx.currentTime); // Start silent for fade-in
    this.masterGain.connect(this.analyser);
    this.analyser.connect(this.ctx.destination);

    // Sub-Gain Nodes
    this.synthGain = this.ctx.createGain();
    this.windGain = this.ctx.createGain();
    this.rainGain = this.ctx.createGain();
    this.binauralGain = this.ctx.createGain();

    this.synthGain.connect(this.masterGain);
    this.windGain.connect(this.masterGain);
    this.rainGain.connect(this.masterGain);
    this.binauralGain.connect(this.masterGain);
  }

  private createNoiseBuffer(duration: number = 3.0): AudioBuffer {
    if (!this.ctx) throw new Error("AudioContext not ready");
    const bufferSize = this.ctx.sampleRate * duration;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }
    return buffer;
  }

  public async start(initialVolumes: {
    synth: number;
    wind: number;
    rain: number;
    binaural: number;
    focusFreq: number;
  }) {
    if (this.isRunning) return;
    
    this.initContext();
    if (!this.ctx) return;

    // Force resume if context was suspended (browser security autoplay policy)
    if (this.ctx.state === "suspended") {
      await this.ctx.resume();
    }

    const now = this.ctx.currentTime;

    // Set sub-gains according to slider positions
    this.synthGain!.gain.setValueAtTime(initialVolumes.synth / 100 * 0.45, now);
    this.windGain!.gain.setValueAtTime(initialVolumes.wind / 100 * 0.25, now);
    this.rainGain!.gain.setValueAtTime(initialVolumes.rain / 100 * 0.15, now);
    this.binauralGain!.gain.setValueAtTime(initialVolumes.binaural / 100 * 0.20, now);

    // 1. Synth Engines: Soothing ambient harmonized major chord
    // F2 (87.31 Hz), C3 (130.81 Hz), F3 (174.61 Hz), A3 (220.00 Hz), C4 (261.63 Hz)
    const chordFreqs = [87.31, 130.81, 174.61, 220.00, 261.63];
    
    this.synthFilter = this.ctx.createBiquadFilter();
    this.synthFilter.type = "lowpass";
    this.synthFilter.frequency.setValueAtTime(320, now);
    this.synthFilter.Q.setValueAtTime(1.5, now);
    this.synthFilter.connect(this.synthGain!);

    this.oscillators = chordFreqs.map((freq) => {
      if (!this.ctx) throw new Error("Context destroyed");
      const osc = this.ctx.createOscillator();
      const gainNode = this.ctx.createGain();
      
      // Warm triangles for organic textures
      osc.type = "triangle";
      osc.frequency.setValueAtTime(freq, now);
      
      // Slight detune for a rich, wide feel
      osc.detune.setValueAtTime((Math.random() * 2 - 1) * 8, now);

      // Distribute gain slightly across notes to keep low end warm but controlled
      const noteGain = freq < 100 ? 0.35 : (freq < 200 ? 0.25 : 0.18);
      gainNode.gain.setValueAtTime(noteGain, now);

      osc.connect(gainNode);
      gainNode.connect(this.synthFilter!);
      
      osc.start(now);
      return osc;
    });

    // Layer an LFO that slowly pans or filter-modulates the lowpass cutoff to "breathe"
    this.filterLFO = this.ctx.createOscillator();
    const lfoGain = this.ctx.createGain();
    this.filterLFO.frequency.setValueAtTime(0.08, now); // Super slow - 12 seconds per wave
    lfoGain.gain.setValueAtTime(120, now); // Sweep is 120Hz wide
    
    this.filterLFO.connect(lfoGain);
    lfoGain.connect(this.synthFilter.frequency);
    this.filterLFO.start(now);

    // 2. Wind Engine: Bandpass filtered white noise with slow LFO gain sweeps
    const noiseBuffer = this.createNoiseBuffer();
    
    this.windSource = this.ctx.createBufferSource();
    this.windSource.buffer = noiseBuffer;
    this.windSource.loop = true;

    const windFilter = this.ctx.createBiquadFilter();
    windFilter.type = "bandpass";
    windFilter.frequency.setValueAtTime(250, now);
    windFilter.Q.setValueAtTime(1.2, now);

    this.windLFO = this.ctx.createOscillator();
    this.windLFO.frequency.setValueAtTime(0.05, now); // 20s period
    this.windLFOGain = this.ctx.createGain();
    this.windLFOGain.gain.setValueAtTime(0.12, now); // Adjust amplitude of swell

    this.windLFO.connect(this.windLFOGain);
    
    const windGainScaler = this.ctx.createGain();
    windGainScaler.gain.setValueAtTime(0.12, now);
    
    this.windLFOGain.connect(windGainScaler.gain);

    this.windSource.connect(windFilter);
    windFilter.connect(windGainScaler);
    windGainScaler.connect(this.windGain!);

    this.windLFO.start(now);
    this.windSource.start(now);

    // 3. Rain Engine: Highpass filtered pink-shaded noise to simulate soothing rainfall drops
    this.rainSource = this.ctx.createBufferSource();
    this.rainSource.buffer = noiseBuffer;
    this.rainSource.loop = true;

    const rainFilter = this.ctx.createBiquadFilter();
    rainFilter.type = "highpass";
    rainFilter.frequency.setValueAtTime(1100, now);

    const rainPeakFilter = this.ctx.createBiquadFilter();
    rainPeakFilter.type = "peaking";
    rainPeakFilter.frequency.setValueAtTime(3200, now);
    rainPeakFilter.Q.setValueAtTime(2.0, now);
    rainPeakFilter.gain.setValueAtTime(-10, now); // Soften harsh highs

    this.rainSource.connect(rainFilter);
    rainFilter.connect(rainPeakFilter);
    rainPeakFilter.connect(this.rainGain!);

    this.rainSource.start(now);

    // 4. Genuine Binaural beats:
    // Left Channel = Sine wave at 120Hz
    // Right Channel = Sine wave at 120Hz + focusFreq (e.g. 120Hz + 40Hz = 160Hz)
    const baseBinauralFreq = 120.0;
    
    this.binauralOscL = this.ctx.createOscillator();
    this.binauralOscL.type = "sine";
    this.binauralOscL.frequency.setValueAtTime(baseBinauralFreq, now);

    this.binauralOscR = this.ctx.createOscillator();
    this.binauralOscR.type = "sine";
    this.binauralOscR.frequency.setValueAtTime(baseBinauralFreq + initialVolumes.focusFreq, now);

    const leftGain = this.ctx.createGain();
    const rightGain = this.ctx.createGain();
    leftGain.gain.setValueAtTime(0.5, now);
    rightGain.gain.setValueAtTime(0.5, now);

    const merger = this.ctx.createChannelMerger(2);

    this.binauralOscL.connect(leftGain);
    this.binauralOscR.connect(rightGain);

    leftGain.connect(merger, 0, 0); // connect left channel to merger destination input 0
    rightGain.connect(merger, 0, 1); // connect right channel to merger destination input 1

    merger.connect(this.binauralGain!);

    this.binauralOscL.start(now);
    this.binauralOscR.start(now);

    // Smooth overall master fade-in over 1.5 seconds to protect human ears
    this.masterGain!.gain.setValueAtTime(0.001, now);
    this.masterGain!.gain.exponentialRampToValueAtTime(0.85, now + 1.5);

    this.isRunning = true;
  }

  public setSynthVolume(vol: number) {
    if (!this.ctx || !this.synthGain) return;
    const now = this.ctx.currentTime;
    // Cap at reasonable maximum limit
    this.synthGain.gain.setTargetAtTime(vol / 100 * 0.45, now, 0.15);
  }

  public setWindVolume(vol: number) {
    if (!this.ctx || !this.windGain) return;
    const now = this.ctx.currentTime;
    this.windGain.gain.setTargetAtTime(vol / 100 * 0.25, now, 0.15);
  }

  public setRainVolume(vol: number) {
    if (!this.ctx || !this.rainGain) return;
    const now = this.ctx.currentTime;
    this.rainGain.gain.setTargetAtTime(vol / 100 * 0.15, now, 0.15);
  }

  public setBinauralVolume(vol: number) {
    if (!this.ctx || !this.binauralGain) return;
    const now = this.ctx.currentTime;
    this.binauralGain.gain.setTargetAtTime(vol / 100 * 0.20, now, 0.15);
  }

  public setFocusFrequency(freq: number) {
    if (!this.ctx || !this.binauralOscR) return;
    const now = this.ctx.currentTime;
    const baseBinauralFreq = 120.0;
    // Set target frequency smoothly
    this.binauralOscR.frequency.setTargetAtTime(baseBinauralFreq + freq, now, 0.25);
  }

  public async stop() {
    if (!this.isRunning || !this.ctx || !this.masterGain) return;

    const now = this.ctx.currentTime;
    // Smooth master fade out over 0.6 seconds to avoid pops and clicks
    this.masterGain.gain.setValueAtTime(this.masterGain.gain.value, now);
    this.masterGain.gain.exponentialRampToValueAtTime(0.001, now + 0.6);

    return new Promise((resolve) => {
      setTimeout(() => {
        try {
          // Tear down oscillators
          this.oscillators.forEach(osc => {
            try { osc.stop(); } catch(e) {}
          });
          this.oscillators = [];

          if (this.filterLFO) { try { this.filterLFO.stop(); } catch(e) {} this.filterLFO = null; }
          if (this.windLFO) { try { this.windLFO.stop(); } catch(e) {} this.windLFO = null; }
          if (this.windSource) { try { this.windSource.stop(); } catch(e) {} this.windSource = null; }
          if (this.rainSource) { try { this.rainSource.stop(); } catch(e) {} this.rainSource = null; }
          if (this.binauralOscL) { try { this.binauralOscL.stop(); } catch(e) {} this.binauralOscL = null; }
          if (this.binauralOscR) { try { this.binauralOscR.stop(); } catch(e) {} this.binauralOscR = null; }

          this.isRunning = false;
        } catch (e) {
          console.error("Error during synth teardown:", e);
        }
        resolve(true);
      }, 700);
    });
  }

  public getIsRunning() {
    return this.isRunning;
  }
}
