import styles from "@/styles/dashboard.module.scss";

type StatsCardProps = {
  label: string;
  value: number;
};

export function StatsCard({ label, value }: StatsCardProps) {
  return (
    <article className={styles.statsCard}>
      <span>{label}</span>
      <strong>{value}</strong>
    </article>
  );
}
