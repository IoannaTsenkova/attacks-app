import styles from "@/attacks/mfa-fatigue/page.module.scss";
import type { MfaRequest } from "@/utils/mfaFatigueTypes";

type MfaRequestPanelProps = {
  request: MfaRequest;
  requestCount: number;
  totalRequests: number;
  isSuspicious: boolean;
  onApprove: () => void;
  onDeny: () => void;
};

export function MfaRequestPanel({
  request,
  requestCount,
  totalRequests,
  isSuspicious,
  onApprove,
  onDeny,
}: Readonly<MfaRequestPanelProps>) {
  return (
    <section className={styles.card}>
      <div>
        <p className={styles.cardLabel}>Security verification</p>
        <h2>Approve sign-in?</h2>
        <p className={styles.muted}>
          A sign-in request was sent to your authenticator app.
        </p>
      </div>

      {isSuspicious && (
        <div className={styles.warningBox}>
          Multiple verification requests are pending. Approve the latest request
          to continue.
        </div>
      )}

      <div className={styles.details}>
        <div>
          <span>Request</span>
          <strong>
            {requestCount} of {totalRequests}
          </strong>
        </div>

        <div>
          <span>Location</span>
          <strong>{request.location}</strong>
        </div>

        <div>
          <span>Device</span>
          <strong>{request.device}</strong>
        </div>

        <div>
          <span>Browser</span>
          <strong>{request.browser}</strong>
        </div>

        <div>
          <span>Time</span>
          <strong>{request.time}</strong>
        </div>
      </div>

      <div className={styles.actions}>
        <button
          className={styles.dangerButton}
          type="button"
          onClick={onApprove}
        >
          Approve
        </button>

        <button
          className={styles.secondaryButton}
          type="button"
          onClick={onDeny}
        >
          Deny
        </button>
      </div>
    </section>
  );
}
