import styles from "@/styles/xss.module.scss";

type SanitizationResultProps = {
  wasSanitized: boolean;
  onReset: () => void;
};

export function SanitizationResult({
  wasSanitized,
  onReset,
}: Readonly<SanitizationResultProps>) {
  return (
    <section className={styles.safeResultCard}>
      <p className={styles.cardLabel}>Protection result</p>

      <h2>{wasSanitized ? "Unsafe content sanitized" : "Content published"}</h2>

      <p>
        {wasSanitized
          ? "Potentially dangerous HTML was detected and cleaned before being rendered in the browser."
          : "The submitted feedback did not contain unsafe HTML and was rendered normally."}
      </p>

      <div className={styles.safeBox}>
        DOMPurify removes dangerous attributes such as event handlers, reducing
        the risk of DOM-based XSS and token theft.
      </div>

      <button
        className={styles.secondaryButton}
        type="button"
        onClick={onReset}
      >
        Reset secure demo
      </button>
    </section>
  );
}
