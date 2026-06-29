import {
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  type PieLabelRenderProps,
} from "recharts";

type AttackPieChartProps = {
  data: {
    attack: string;
    count: number;
  }[];
};

const SLICE_COLORS = ["#4f46e5", "#0891b2", "#059669", "#d97706"];

function renderPercentageLabel(props: PieLabelRenderProps) {
  const { cx, cy, midAngle, outerRadius, percent } = props;

  if (
    typeof cx !== "number" ||
    typeof cy !== "number" ||
    typeof midAngle !== "number" ||
    typeof outerRadius !== "number" ||
    typeof percent !== "number" ||
    percent === 0
  ) {
    return null;
  }

  const radius = outerRadius + 18;
  const radians = (Math.PI / 180) * -midAngle;
  const x = cx + radius * Math.cos(radians);
  const y = cy + radius * Math.sin(radians);

  return (
    <text
      x={x}
      y={y}
      fill="#334155"
      fontSize={13}
      fontWeight={800}
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
    >
      {`${(percent * 100).toFixed(1)}%`}
    </text>
  );
}

export function AttackPieChart({ data }: AttackPieChartProps) {
  const totalSuccessfulEvents = data.reduce((sum, item) => sum + item.count, 0);

  if (!totalSuccessfulEvents) {
    return <p>No successful attack results recorded yet.</p>;
  }

  return (
    <ResponsiveContainer width="100%" height={340}>
      <PieChart>
        <Pie
          data={data}
          dataKey="count"
          nameKey="attack"
          cx="50%"
          cy="48%"
          outerRadius="70%"
          label={renderPercentageLabel}
          labelLine={false}
        >
          {data.map((entry, index) => (
            <Cell
              key={entry.attack}
              fill={SLICE_COLORS[index % SLICE_COLORS.length]}
            />
          ))}
        </Pie>
        <Tooltip formatter={(value) => [value, "Successful events"]} />
        <Legend verticalAlign="bottom" height={32} />
      </PieChart>
    </ResponsiveContainer>
  );
}
