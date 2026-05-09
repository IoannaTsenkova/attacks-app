import styles from "@/styles/mfa-fatigue.module.scss";

type SecureVerificationPanelProps = {
  code: string;
  requestCount: number;
  maxRequests: number;
  isLimitReached: boolean;
};

export function SecureVerificationPanel({
  code,
  requestCount,
  maxRequests,
  isLimitReached,
}: SecureVerificationPanelProps) {
  return (
    <section className={styles.card}>
      <div>
        <p className={styles.cardLabel}>Number matching</p>
        <h2>Check your authenticator app</h2>
        <p className={styles.muted}>
          Enter the number shown below into your trusted device to approve this
          sign-in.
        </p>
      </div>

      <div className={styles.codeBox}>
        <span>Your verification number</span>
        <strong>{code}</strong>
      </div>

      <div className={styles.details}>
        <div>
          <span>Requests used</span>
          <strong>
            {requestCount} / {maxRequests}
          </strong>
        </div>

        <div>
          <span>Protection</span>
          <strong>{isLimitReached ? "Limit reached" : "Active"}</strong>
        </div>
      </div>

      {isLimitReached && (
        <div className={styles.warningBox}>
          Request limit reached. Additional verification attempts are blocked.
        </div>
      )}

      <p className={styles.helperText}>
        The approval must be completed from the trusted device.
      </p>
    </section>
  );
}
