import styles from "@/attacks/mfa-fatigue/page.module.scss";

type LoginPanelProps = {
  onSubmit: () => void;
};

export function LoginPanel({ onSubmit }: Readonly<LoginPanelProps>) {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit();
  };

  return (
    <form className={styles.card} onSubmit={handleSubmit}>
      <div>
        <p className={styles.cardLabel}>Corporate VPN</p>
        <h2>Sign in to continue</h2>
        <p className={styles.muted}>
          Use your work account to access the secure internal portal.
        </p>
      </div>

      <label className={styles.field}>
        Email address
        <input
          type="email"
          placeholder="employee@company.com"
          autoComplete="email"
          required={true}
        />
      </label>

      <label className={styles.field}>
        Password
        <input
          type="password"
          placeholder="Enter password"
          autoComplete="current-password"
          required={true}
        />
      </label>

      <button className={styles.primaryButton} type="submit">
        Sign in
      </button>

      <p className={styles.helperText}>
        After submitting, a simulated MFA approval request will be sent.
      </p>
    </form>
  );
}
