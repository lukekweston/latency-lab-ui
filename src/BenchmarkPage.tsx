import { useState, useEffect } from 'react';
import type { BenchmarkConfig, BenchmarkRun } from './types';
import { runBenchmark, generateCodeSnippet, generateExplanation } from './api';
import ConfigPanel from './components/ConfigPanel';
import ChartGroup from './components/ChartGroup';
import CodeDisplay from './components/CodeDisplay';
import ExplanationPanel from './components/ExplanationPanel';

const BenchmarkPage = () => {
  const [config, setConfig] = useState<BenchmarkConfig>({
    gc: 'G1GC',
    useObjectPool: false,
    usePrimitives: false,
    disableAllocations: false,
    preTouchMemory: false,
    memoryAccess: 'onheap',
    threading: 'single',
    pinThreads: false,
    enableBatching: false,
    batchSize: 100,
    escapeAnalysisDisabled: false,
    simulateLoad: false,
  });

  const [results, setResults] = useState<BenchmarkRun | null>(null);
  const [history, setHistory] = useState<BenchmarkRun[]>([]);

  // 👇 These update when config changes
  const [code, setCode] = useState('// Code preview will appear here...');
  const [explanation, setExplanation] = useState(
    'Explanation for each setting will appear here.'
  );

  useEffect(() => {
    const fetchUpdates = async () => {
      try {
        const codeSnippet = await generateCodeSnippet(config);
        const explanationText = await generateExplanation(config);
        setCode(codeSnippet);
        setExplanation(explanationText);
      } catch (err) {
        console.error('Failed to update preview:', err);
      }
    };

    fetchUpdates();
  }, [config]);

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
    <div className="max-w-screen-xl mx-auto px-6 py-4 font-sans text-foreground space-y-4">
  <h1 className="text-2xl font-bold">Low-Latency Optimization</h1>

  {/* Top Row: Config + Code/Explanation */}
  <div className="grid grid-cols-3 gap-4">
    <div className="col-span-1">
      <ConfigPanel config={config} setConfig={setConfig} onRun={handleRun} />
    </div>
    <div className="col-span-2 flex flex-col space-y-2">
      <CodeDisplay
        code={code}
      />
      <ExplanationPanel
        explanation={explanation}
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


 