import styles from "@/styles/xss.module.scss";

type FeedbackPreviewProps = {
  feedback: string;
};

export function FeedbackPreview({ feedback }: Readonly<FeedbackPreviewProps>) {
  return (
    <section className={styles.card}>
      <p className={styles.cardLabel}>Live preview</p>
      <h2>Published feedback</h2>

      {feedback ? (
        <div
          className={styles.previewBox}
          dangerouslySetInnerHTML={{ __html: feedback }}
        />
      ) : (
        <p className={styles.emptyState}>
          Submitted feedback will appear here.
        </p>
      )}
    </section>
  );
}
