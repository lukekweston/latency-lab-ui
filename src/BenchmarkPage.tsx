import { useState } from 'react';
import type { BenchmarkConfig, BenchmarkRun } from './types';
import { runBenchmark } from './api';
import ConfigPanel from './components/ConfigPanel';
import ChartGroup from './components/ChartGroup';
import CodeDisplay from './components/CodeDisplay';
import ExplanationPanel from './components/ExplanationPanel';

const BenchmarkPage = () => {
  const [config, setConfig] = useState<BenchmarkConfig>({
    useObjectPool: false,
    usePrimitives: false,
    threading: 'single',
    gc: 'G1GC',
  });

  const [results, setResults] = useState<BenchmarkRun | null>(null);
  const [history, setHistory] = useState<BenchmarkRun[]>([]);

  const handleRun = async () => {
    try {
      const data = await runBenchmark(config);
      const run: BenchmarkRun = { ...config, ...data };
      setResults(run);
      setHistory((prev) => [...prev, run]);
    } catch (err) {
      console.error(err);
      alert('Failed to run benchmark');
    }
  };

  return (
    <div className="max-w-screen-xl mx-auto px-6 py-4 font-sans text-foreground space-y-4">
  <h1 className="text-2xl font-bold">Low-Latency Optimization</h1>

  {/* Top Row: Config + Code/Explanation */}
  <div className="grid grid-cols-3 gap-4">
    <div className="col-span-1">
      <ConfigPanel config={config} setConfig={setConfig} onRun={handleRun} />
    </div>
    <div className="col-span-2 flex flex-col space-y-2">
      <CodeDisplay
        code={
          results?.code ??
          '// Run a benchmark to see generated low-latency code here.'
        }
      />
      <ExplanationPanel
        explanation={
          results?.explanation ??
          'This panel will explain how selected options affect performance, GC behavior, and latency once you run a benchmark.'
        }
      />
    </div>
  </div>

  {/* Bottom Row: Charts side-by-side */}
  <div className="grid grid-cols-2 gap-4">
    <ChartGroup runs={history} chartType="latency" />
    <ChartGroup runs={history} chartType="throughput" />
  </div>
</div>

  );
};

export default BenchmarkPage;
