import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ReferenceLine } from 'recharts';
import type { BenchmarkRun } from '../types';

interface Props {
  runs: BenchmarkRun[];
}

const ChartGroup = ({ runs }: Props) => {
  const chartData = (key: 'latency' | 'throughput') =>
    runs.map((run, i) => ({
      name: `Run ${i + 1}`,
      color: ['#8884d8', '#82ca9d', '#ff7300', '#ff4d4d'][i % 4],
      data: run[key].map((value, idx) => ({
        index: idx,
        value,
      })),
      gcEvents: run.gcEvents,
    }));

  return (
    <div>
      <h2>Latency Over Time</h2>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="index" />
          <YAxis unit="ms" />
          <Tooltip />
          <Legend />
          {chartData('latency').map((series, i) => (
            <Line key={i} type="monotone" dataKey="value" name={series.name} data={series.data} stroke={series.color} dot={false} />
          ))}
          {runs[0]?.gcEvents?.map((gcTime, i) => (
            <ReferenceLine key={`gc-${i}`} x={gcTime} stroke="red" strokeDasharray="3 3" label="GC" />
          ))}
        </LineChart>
      </ResponsiveContainer>

      <h2 style={{ marginTop: '2rem' }}>Throughput Over Time</h2>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="index" />
          <YAxis unit="ops/s" />
          <Tooltip />
          <Legend />
          {chartData('throughput').map((series, i) => (
            <Line key={i} type="monotone" dataKey="value" name={series.name} data={series.data} stroke={series.color} dot={false} />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ChartGroup;
