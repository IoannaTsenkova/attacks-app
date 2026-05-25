import styles from "@/styles/xss.module.scss";

export function SecureSessionPanel() {
  return (
    <section className={styles.tokenCard}>
      <p className={styles.cardLabel}>Account session</p>
      <h2>Protected session</h2>
      <p className={styles.muted}>Your current support session is active.</p>

      <div className={styles.sessionDetails}>
        <div>
          <span>Status</span>
          <strong>Active</strong>
        </div>

        <div>
          <span>User</span>
          <strong>customer@support.com</strong>
        </div>

        <div>
          <span>Rendering</span>
          <strong>Sanitized</strong>
        </div>
      </div>
    </section>
  );
}
