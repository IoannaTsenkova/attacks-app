import styles from "@/styles/xss.module.scss";

export function TokenPanel() {
  return (
    <section className={styles.tokenCard}>
      <p className={styles.cardLabel}>Account session</p>
      <h2>Authenticated session</h2>
      <p className={styles.muted}>Your current support session is active.</p>

      <div className={styles.sessionStatus}>
        <span>Status:</span> <strong>Active</strong>
      </div>

      <div className={styles.sessionStatus}>
        <span>User:</span> <strong>customer@support.com</strong>
      </div>
    </section>
  );
}
