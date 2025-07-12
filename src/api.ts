import type { BenchmarkConfig, BenchmarkResult } from './types';

export async function runBenchmark(config: BenchmarkConfig): Promise<BenchmarkResult> {
  const res = await fetch('http://localhost:8080/api/run-benchmark', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(config),
  });

  if (!res.ok) {
    throw new Error('Failed to run benchmark');
  }

  return await res.json();
}