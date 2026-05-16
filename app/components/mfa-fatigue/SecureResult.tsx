import styles from "@/styles/mfa-fatigue.module.scss";

type SecureResultProps = {
  result: "success" | "blocked" | "denied";
  onRestart: () => void;
};

export function SecureResult({ result, onRestart }: SecureResultProps) {
  const content = {
    success: {
      title: "Sign-in verified",
      text: "The sign-in was completed only after the correct number was entered on the trusted device.",
      box: "Number matching prevents accidental approval because the user must actively compare the displayed number.",
      className: styles.safeBox,
    },
    blocked: {
      title: "Suspicious activity blocked",
      text: "The system blocked additional verification attempts after the maximum number of requests was reached.",
      box: "Rate limiting reduces MFA fatigue by preventing repeated approval prompts.",
      className: styles.warningBox,
    },
    denied: {
      title: "Sign-in denied",
      text: "The verification request was rejected from the trusted device.",
      box: "Denying unexpected MFA requests is the correct response when the user did not initiate the login.",
      className: styles.safeBox,
    },
  }[result];

  return (
    <section className={styles.card}>
      <p className={styles.cardLabel}>Secure result</p>

      <h2>{content.title}</h2>

      <p className={styles.muted}>{content.text}</p>

      <div className={content.className}>{content.box}</div>

      <button
        className={styles.primaryButton}
        type="button"
        onClick={onRestart}
      >
        Restart secure flow
      </button>
    </section>
  );
}
