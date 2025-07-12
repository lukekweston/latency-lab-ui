import type { BenchmarkConfig } from '../types';

interface Props {
  config: BenchmarkConfig;
  setConfig: (c: BenchmarkConfig) => void;
  onRun: () => void;
}

const ConfigPanel = ({ config, setConfig, onRun }: Props) => {
  const update = <K extends keyof BenchmarkConfig>(key: K, value: BenchmarkConfig[K]) => {
    setConfig({ ...config, [key]: value });
  };

  return (
    <div style={{ marginBottom: '1rem', padding: '1rem', border: '1px solid #ccc' }}>
      <h2>Benchmark Configuration</h2>

      <label>
        <input
          type="checkbox"
          checked={config.useObjectPool}
          onChange={e => update('useObjectPool', e.target.checked)}
        />
        {' '}Use Object Pool
      </label>
      <br />

      <label>
        <input
          type="checkbox"
          checked={config.usePrimitives}
          onChange={e => update('usePrimitives', e.target.checked)}
        />
        {' '}Use Primitives
      </label>
      <br />

      <label>
        Threading:
        <select
          value={config.threading}
          onChange={e => update('threading', e.target.value as 'single' | 'threadpool')}
        >
          <option value="single">Single-threaded</option>
          <option value="threadpool">Thread Pool</option>
        </select>
      </label>
      <br />

      <label>
        GC Strategy:
        <select
          value={config.gc}
          onChange={e => update('gc', e.target.value)}
        >
          <option value="G1GC">G1GC</option>
          <option value="ZGC">ZGC</option>
          <option value="Epsilon">Epsilon (No GC)</option>
        </select>
      </label>

      <br /><br />
      <button onClick={onRun}>Run Benchmark</button>
    </div>
  );
};

export default ConfigPanel;
