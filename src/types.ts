export type ThreadingMode = 'single' | 'threadpool';
export type GCStrategy = 'G1GC' | 'ZGC' | 'Epsilon';
export type MemoryAccess = 'onheap' | 'direct' | 'offheap';

export interface BenchmarkConfig {
  // GC & Memory
  gc: GCStrategy;
  useObjectPool: boolean;
  usePrimitives: boolean;
  disableAllocations: boolean;
  preTouchMemory: boolean;
  memoryAccess: MemoryAccess;

  // Concurrency
  threading: ThreadingMode;
  pinThreads: boolean;

  // Throughput Tuning
  enableBatching: boolean;
  batchSize: number;

  // Advanced
  escapeAnalysisDisabled: boolean;
  simulateLoad: boolean;
}


export interface BenchmarkResult {
  latency: number[];
  throughput: number[];
  gcEvents: number[];
  code: string;
  explanation: string[];
}

export interface BenchmarkRun extends BenchmarkConfig, BenchmarkResult {}