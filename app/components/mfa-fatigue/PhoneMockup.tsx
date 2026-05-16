import styles from "@/styles/mfa-fatigue.module.scss";
import type { MfaRequest } from "@/utils/mfaFatigueTypes";

type PhoneMockupProps = {
  requests: MfaRequest[];
  isSuspicious: boolean;
  canRespond: boolean;
  onApprove: () => void;
  onDeny: () => void;
};

export function PhoneMockup({
  requests,
  isSuspicious,
  canRespond,
  onApprove,
  onDeny,
}: Readonly<PhoneMockupProps>) {
  const latestRequest = requests.at(-1);

  return (
    <aside className={styles.phoneWrapper} aria-label="Simulated phone screen">
      <div className={styles.phone}>
        <div className={styles.phoneTopBar}>
          <span>9:41</span>
          <span>●●●</span>
        </div>

        <div className={styles.phoneHeader}>
          <p>Authenticator</p>
          <h3>Sign-in requests</h3>
        </div>

        <div className={styles.notifications}>
          {requests.map((request) => (
            <article className={styles.notification} key={request.id}>
              <div className={styles.notificationHeader}>
                <strong>Approve sign-in?</strong>
                <span>{request.time}</span>
              </div>

              <p>
                {request.browser} on {request.device}
              </p>

              <small>{request.location}</small>
            </article>
          ))}
        </div>
        {canRespond && latestRequest && (
          <div className={styles.phoneActions}>
            <button
              className={styles.phoneApproveButton}
              type="button"
              onClick={onApprove}
            >
              Approve
            </button>

            <button
              className={styles.phoneDenyButton}
              type="button"
              onClick={onDeny}
            >
              Deny
            </button>
          </div>
        )}
      </div>
    </aside>
  );
}
