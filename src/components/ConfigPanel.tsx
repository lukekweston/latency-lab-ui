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
      <CardContent className="pt-6 space-y-4">
        <h2 className="text-lg font-semibold mb-2">Configuration</h2>

        <div className="flex items-center justify-between">
          <Label>No GC</Label>
          <Checkbox
            checked={config.gc === 'Epsilon'}
            onCheckedChange={(checked) =>
              update('gc', checked ? 'Epsilon' : 'G1GC')
            }
          />
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
          <Label>Use threading</Label>
          <Checkbox
            checked={config.threading === 'threadpool'}
            onCheckedChange={(val) =>
              update('threading', val ? 'threadpool' : 'single')
            }
          />
        </div>

        <div className="flex flex-col space-y-2">
          <Label>GC Strategy</Label>
          <Select
            value={config.gc}
            onValueChange={(val) => update('gc', val)}
          >
            <SelectTrigger className="z-[50] bg-background">
              <SelectValue placeholder="Select GC" />
            </SelectTrigger>
            <SelectContent className="z-[9999] bg-white border border-gray-200 shadow-md rounded-md">
              <SelectItem value="G1GC">G1GC</SelectItem>
              <SelectItem value="ZGC">ZGC</SelectItem>
              <SelectItem value="Epsilon">Epsilon (No GC)</SelectItem>
            </SelectContent>
          </Select>
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
