import type { BenchmarkConfig, BenchmarkResult } from './types';

const API_BASE = import.meta.env.VITE_API_BASE || '/api';

export async function runBenchmark(config: BenchmarkConfig): Promise<BenchmarkResult> {
  const res = await fetch(`${API_BASE}/run-benchmark`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(config),
  });
  if (!res.ok) throw new Error('Failed to run benchmark');
  return res.json();
}

export async function generateCodeSnippet(config: BenchmarkConfig): Promise<string> {
  const res = await fetch(`${API_BASE}/generate-code-snippet`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(config),
  });
  if (!res.ok) throw new Error('Failed to generate code');
  return res.text();
}

export async function generateExplanation(config: BenchmarkConfig): Promise<string[]> {
  const res = await fetch(`${API_BASE}/generate-explanation`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(config),
  });
  if (!res.ok) throw new Error('Failed to generate explanation');
  return res.json();
}
