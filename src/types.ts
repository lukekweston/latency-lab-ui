export interface BenchmarkConfig {
  useObjectPool: boolean;
  usePrimitives: boolean;
  threading: 'single' | 'threadpool';
  gc: string;
}

export interface BenchmarkResult {
  latency: number[];
  throughput: number[];
  gcEvents: number[];
  code: string;
  explanation: string[];
}

export interface BenchmarkRun extends BenchmarkConfig, BenchmarkResult {}