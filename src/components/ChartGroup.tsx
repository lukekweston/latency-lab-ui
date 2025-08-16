import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
} from 'recharts';
import { Card, CardHeader, CardContent } from '../components/ui/card';
import type { BenchmarkRun } from '../types';

type Props = {
  runs: BenchmarkRun[];
  chartType: 'latency' | 'throughput';
};

const ChartGroup = ({ runs, chartType }: Props) => {
  const chartTitle =
    chartType === 'latency' ? 'Latency Over Time' : 'Throughput Over Time';
  const unit = chartType === 'latency' ? 'ms' : 'ops/s';

  return (
    <Card className="h-full">
      <CardHeader className="text-sm font-semibold">{chartTitle}</CardHeader>
      <CardContent className="p-2 h-[300px]">
<ResponsiveContainer width="100%" height="100%">
  <LineChart>
    <XAxis
      type="number"
      dataKey="index"
      tick={{ fontSize: 10 }}
      domain={['dataMin', 'dataMax']}
    />
    <YAxis
        scale="log"
        domain={['auto', 'auto']}
        tickFormatter={(v) => `${v}${unit}`}
        tick={{ fontSize: 10 }}
    />
    <Tooltip />

    {runs.map((run, i) => (
      <Line
        key={i}
        data={run[chartType].map((value, index) => ({
          index,
          value,
        }))}
        dataKey="value"
        name={`Run ${i + 1}`}
        stroke={['#8884d8', '#82ca9d', '#ff7300', '#ff4d4d'][i % 4]}
        dot={false}
        strokeWidth={2}
      />
    ))}

    {/* GC markers — reference on X axis */}
    {runs.length > 0 &&
      runs[0].gcEvents.map((gc, idx) => (
        <ReferenceLine
          key={idx}
          x={gc}
          stroke="red"
          strokeDasharray="3 3"
          label={chartType === 'latency' ? 'GC' : undefined}
        />
      ))}
  </LineChart>
</ResponsiveContainer>

      </CardContent>
    </Card>
  );
};

export default ChartGroup;
