import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

type AttackBarChartProps = {
  data: {
    attack: string;
    count: number;
  }[];
};

export function AttackBarChart({ data }: AttackBarChartProps) {
  const totalSuccessfulEvents = data.reduce((sum, item) => sum + item.count, 0);

  if (!totalSuccessfulEvents) {
    return <p>No successful attack results recorded yet.</p>;
  }

  return (
    <ResponsiveContainer width="100%" height={320}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="attack" />
        <YAxis allowDecimals={false} />
        <Tooltip />
        <Bar dataKey="count" radius={[10, 10, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}
