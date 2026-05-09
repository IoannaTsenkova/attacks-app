import styles from "@/styles/mfa-fatigue.module.scss";

type VerificationStatusPanelProps = {
  requestCount: number;
  isSuspicious: boolean;
};

export function VerificationStatusPanel({
  requestCount,
  isSuspicious,
}: Readonly<VerificationStatusPanelProps>) {
  return (
    <section className={styles.card}>
      <div>
        <p className={styles.cardLabel}>Security verification</p>
        <h2>Check your phone</h2>
        <p className={styles.muted}>
          A sign-in approval request was sent to your authenticator app.
        </p>
      </div>

      <div className={styles.details}>
        <div>
          <span>Status</span>
          <strong>Waiting for approval</strong>
        </div>

        <div>
          <span>Requests sent</span>
          <strong>{requestCount}</strong>
        </div>
      </div>

      {isSuspicious && (
        <div className={styles.warningBox}>
          Multiple requests are pending. Approve the latest request on your
          device to continue.
        </div>
      )}

      <p className={styles.helperText}>
        Keep this page open while the verification is completed.
      </p>
    </section>
  );
}
