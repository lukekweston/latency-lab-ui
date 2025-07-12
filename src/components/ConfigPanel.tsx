import { Card, CardContent } from '../components/ui/card';
import { Label } from '../components/ui/label';
import { Button } from '../components/ui/button';
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from '../components/ui/select';
import { Checkbox } from '../components/ui/checkbox';
import type { BenchmarkConfig } from '../types';

interface Props {
  config: BenchmarkConfig;
  setConfig: (cfg: BenchmarkConfig) => void;
  onRun: () => void;
}

const ConfigPanel = ({ config, setConfig, onRun }: Props) => {
  const update = <K extends keyof BenchmarkConfig>(
    key: K,
    value: BenchmarkConfig[K]
  ) => {
    setConfig({ ...config, [key]: value });
  };

  return (
    <Card>
      <CardContent className="pt-6 space-y-6">
        <h2 className="text-lg font-semibold mb-2">Low-Latency Configuration</h2>

        {/* GC & Memory Section */}
        <div className="space-y-3">
          <h3 className="font-semibold">GC & Memory</h3>

          <div className="flex flex-col space-y-2">
  <Label>GC Strategy</Label>
  <Select
    value={config.gc}
    onValueChange={(val) => update('gc', val as BenchmarkConfig['gc'])}
  >
    <SelectTrigger className="z-[50] bg-background">
      <SelectValue placeholder="Select GC Strategy" />
    </SelectTrigger>
    <SelectContent className="z-[9999] bg-white border border-gray-200 shadow-md rounded-md">
      <SelectItem value="G1GC">G1GC</SelectItem>
      <SelectItem value="ZGC">ZGC</SelectItem>
      <SelectItem value="Epsilon">No GC (Epsilon)</SelectItem>
    </SelectContent>
  </Select>
</div>

          <div className="flex items-center justify-between">
            <Label>Use object pool</Label>
            <Checkbox
              checked={config.useObjectPool}
              onCheckedChange={(val) => update('useObjectPool', val)}
            />
          </div>

          <div className="flex items-center justify-between">
            <Label>Use primitives</Label>
            <Checkbox
              checked={config.usePrimitives}
              onCheckedChange={(val) => update('usePrimitives', val)}
            />
          </div>

          <div className="flex items-center justify-between">
            <Label>Disable allocations</Label>
            <Checkbox
              checked={config.disableAllocations}
              onCheckedChange={(val) => update('disableAllocations', val)}
            />
          </div>

          <div className="flex items-center justify-between">
            <Label>Pre-touch memory</Label>
            <Checkbox
              checked={config.preTouchMemory}
              onCheckedChange={(val) => update('preTouchMemory', val)}
            />
          </div>

          <div className="flex flex-col space-y-2">
            <Label>Memory Access</Label>
            <Select
              value={config.memoryAccess}
              onValueChange={(val) =>
                update('memoryAccess', val as BenchmarkConfig['memoryAccess'])
              }
            >
              <SelectTrigger className="z-[50] bg-background">
                <SelectValue placeholder="Select Memory Access" />
              </SelectTrigger>
              <SelectContent className="z-[9999] bg-white border border-gray-200 shadow-md rounded-md">
                <SelectItem value="onheap">On-heap</SelectItem>
                <SelectItem value="direct">Direct ByteBuffer</SelectItem>
                <SelectItem value="offheap">Off-heap</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Threading Section */}
        <div className="space-y-3">
          <h3 className="font-semibold">Threading</h3>

          <div className="flex items-center justify-between">
            <Label>Use thread pool</Label>
            <Checkbox
              checked={config.threading === 'threadpool'}
              onCheckedChange={(val) =>
                update('threading', val ? 'threadpool' : 'single')
              }
            />
          </div>

          <div className="flex items-center justify-between">
            <Label>Pin threads to cores</Label>
            <Checkbox
              checked={config.pinThreads}
              onCheckedChange={(val) => update('pinThreads', val)}
            />
          </div>
        </div>

        {/* Throughput Tuning */}
        <div className="space-y-3">
          <h3 className="font-semibold">Throughput</h3>

          <div className="flex items-center justify-between">
            <Label>Enable batching</Label>
            <Checkbox
              checked={config.enableBatching}
              onCheckedChange={(val) => update('enableBatching', val)}
            />
          </div>

          <div className="flex items-center justify-between">
            <Label>Batch size</Label>
            <input
              type="number"
              className="ml-4 border rounded px-2 py-1 w-24 text-sm"
              min={1}
              max={10000}
              value={config.batchSize}
              onChange={(e) =>
                update('batchSize', parseInt(e.target.value) || 1)
              }
            />
          </div>
        </div>

        {/* Advanced */}
        <div className="space-y-3">
          <h3 className="font-semibold">Advanced</h3>

          <div className="flex items-center justify-between">
            <Label>Disable escape analysis (simulated)</Label>
            <Checkbox
              checked={config.escapeAnalysisDisabled}
              onCheckedChange={(val) => update('escapeAnalysisDisabled', val)}
            />
          </div>

          <div className="flex items-center justify-between">
            <Label>Simulate system load</Label>
            <Checkbox
              checked={config.simulateLoad}
              onCheckedChange={(val) => update('simulateLoad', val)}
            />
          </div>
        </div>

        <Button
          onClick={onRun}
          className="w-full bg-blue-600 text-white hover:bg-blue-700 mt-4"
        >
          Run Benchmark
        </Button>
      </CardContent>
    </Card>
  );
};

export default ConfigPanel;
