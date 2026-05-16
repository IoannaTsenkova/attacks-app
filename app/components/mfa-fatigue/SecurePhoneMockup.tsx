import styles from "@/styles/mfa-fatigue.module.scss";

type SecurePhoneMockupProps = {
  code: string;
  inputCode: string;
  context: {
    location: string;
    device: string;
    time: string;
  };
  requestCount: number;
  isActive: boolean;
  isLimitReached: boolean;
  hasCodeError: boolean;
  onInputChange: (value: string) => void;
  onVerify: () => void;
  onSendAgain: () => void;
  onDeny: () => void;
};

export function SecurePhoneMockup({
  code,
  inputCode,
  context,
  requestCount,
  isActive,
  isLimitReached,
  hasCodeError,
  onInputChange,
  onVerify,
  onSendAgain,
  onDeny,
}: Readonly<SecurePhoneMockupProps>) {
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value.replace(/\D/g, "").slice(0, 2);
    onInputChange(value);
  };

  return (
    <aside className={styles.phoneWrapper} aria-label="Secure MFA phone screen">
      <div className={styles.phone}>
        <div className={styles.phoneTopBar}>
          <span>9:41</span>
          <span>●●●</span>
        </div>

        <div className={styles.phoneHeader}>
          <p>Authenticator</p>
          <h3>Secure sign-in</h3>
        </div>

        {!isActive && (
          <div className={styles.emptyPhoneState}>
            Waiting for a secure sign-in request.
          </div>
        )}

        {isActive && (
          <>
            <div className={styles.phoneContent}>
              <article className={styles.secureRequest}>
                <p className={styles.phoneLabel}>Number matching required</p>

                <p className={styles.phoneInstruction}>
                  Enter the number shown in your browser.
                </p>

                <label className={styles.phoneInputLabel}>
                  Verification number
                  <input
                    value={inputCode}
                    inputMode="numeric"
                    maxLength={2}
                    placeholder="--"
                    onChange={handleInputChange}
                  />
                </label>

                {hasCodeError && (
                  <p className={styles.phoneError}>
                    Incorrect number. Check the browser and try again.
                  </p>
                )}

                <div className={styles.phoneDetails}>
                  <div>
                    <span>Location</span>
                    <strong>{context.location}</strong>
                  </div>

                  <div>
                    <span>Device</span>
                    <strong>{context.device}</strong>
                  </div>

                  <div>
                    <span>Time</span>
                    <strong>{context.time}</strong>
                  </div>

                  <div>
                    <span>Requests</span>
                    <strong>{requestCount}</strong>
                  </div>
                </div>
              </article>
            </div>

            {isLimitReached && (
              <div className={styles.phoneWarning}>
                Too many requests. Additional approval attempts are blocked.
              </div>
            )}

            <div className={styles.phoneActions}>
              <button
                className={styles.phoneApproveButton}
                type="button"
                onClick={onVerify}
                disabled={inputCode.length !== 2 || isLimitReached}
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

            <button
              className={styles.phoneLinkButton}
              type="button"
              onClick={onSendAgain}
              disabled={isLimitReached}
            >
              Send new request
            </button>
          </>
        )}
      </div>
    </aside>
  );
}
