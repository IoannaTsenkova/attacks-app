import styles from "@/attacks/mfa-fatigue/page.module.scss";
import type { MfaRequest } from "@/utils/mfaFatigueTypes";

type PhoneMockupProps = {
  requests: MfaRequest[];
  isSuspicious: boolean;
};

export function PhoneMockup({
  requests,
  isSuspicious,
}: Readonly<PhoneMockupProps>) {
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

        {isSuspicious && (
          <div className={styles.phoneWarning}>
            Unusual number of approval requests detected.
          </div>
        )}
      </div>
    </aside>
  );
}
