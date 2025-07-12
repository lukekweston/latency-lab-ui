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
      setHistory(prev => [...prev, run]);
    } catch (err) {
      console.error(err);
      alert('Failed to run benchmark');
    }
  };

  return (
    <div style={{ padding: '1rem' }}>
      <ConfigPanel config={config} setConfig={setConfig} onRun={handleRun} />
      {results && (
        <>
          <ChartGroup runs={history} />
          <CodeDisplay code={results.code} />
          <ExplanationPanel explanation={results.explanation} />
        </>
      )}
    </div>
  );
};

export default BenchmarkPage;
