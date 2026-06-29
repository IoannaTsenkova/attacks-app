import styles from "./page.module.scss";
import AttackCard from "@/components/ui/AttackCard";

export default function Home() {
  return (
    <main className={styles.container}>
      <h1>Social Engineering Simulator</h1>
      <p>
        Interactive demonstration of social engineering attacks and defense
        mechanisms
      </p>

      <div className={styles.grid}>
        <AttackCard
          title="BitB Phishing"
          description="Фалшив login popup"
          attackLink="/attacks/bitb"
        />

        <AttackCard
          title="MFA Fatigue"
          description="Повтарящи се login заявки"
          attackLink="/attacks/mfa-fatigue"
        />

        <AttackCard
          title="DOM XSS"
          description="Инжектиране на JavaScript"
          attackLink="/attacks/xss"
        />

        <AttackCard
          title="Clickjacking"
          description="Подвеждащ интерфейс"
          attackLink="/attacks/clickjacking"
        />
        <AttackCard
          title="Live Results Dashboard"
          description="View anonymous analytics collected from attack simulations."
          primaryLink={{ href: "/dashboard", label: "Open Dashboard" }}
          className={styles.dashboardCard}
        />
      </div>
    </main>
  );
}
