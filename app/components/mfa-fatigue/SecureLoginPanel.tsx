import styles from "@/styles/mfa-fatigue.module.scss";

type SecureLoginPanelProps = {
  onSubmit: () => void;
};

export function SecureLoginPanel({ onSubmit }: SecureLoginPanelProps) {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit();
  };

  return (
    <form className={styles.card} onSubmit={handleSubmit}>
      <div>
        <p className={styles.cardLabel}>Corporate VPN</p>
        <h2>Sign in securely</h2>
        <p className={styles.muted}>
          Enter your company credentials. The second step will require number
          matching on your trusted device.
        </p>
      </div>

      <label className={styles.field}>
        Email address
        <input type="email" placeholder="employee@company.com" required />
      </label>

      <label className={styles.field}>
        Password
        <input type="password" placeholder="Enter password" required />
      </label>

      <button className={styles.primaryButton} type="submit">
        Continue
      </button>
    </form>
  );
}
