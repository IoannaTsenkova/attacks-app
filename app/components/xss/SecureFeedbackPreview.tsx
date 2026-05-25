import styles from "@/styles/xss.module.scss";

type SecureFeedbackPreviewProps = {
  feedback: string;
  wasSanitized: boolean;
};

export function SecureFeedbackPreview({
  feedback,
  wasSanitized,
}: Readonly<SecureFeedbackPreviewProps>) {
  return (
    <section className={styles.card}>
      <p className={styles.cardLabel}>Safe preview</p>
      <h2>Published feedback</h2>

      {!feedback ? (
        <p className={styles.emptyState}>
          Sanitized feedback will appear here.
        </p>
      ) : (
        <div
          className={styles.previewBox}
          dangerouslySetInnerHTML={{ __html: feedback }}
        />
      )}

      {wasSanitized && (
        <div className={styles.safeBox}>
          Unsafe attributes or script-like content were removed before
          rendering.
        </div>
      )}
    </section>
  );
}
