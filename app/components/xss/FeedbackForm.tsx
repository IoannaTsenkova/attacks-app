import styles from "@/styles/xss.module.scss";

type FeedbackFormProps = {
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
};

export function FeedbackForm({
  value,
  onChange,
  onSubmit,
}: Readonly<FeedbackFormProps>) {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit();
  };

  return (
    <form className={styles.card} onSubmit={handleSubmit}>
      <div>
        <p className={styles.cardLabel}>Feedback form</p>
        <h2>Leave a message</h2>
        <p className={styles.muted}>
          Submit feedback about your recent support experience. Our team reviews
          all submitted messages.
        </p>
      </div>

      <label className={styles.field}>
        Message
        <textarea
          value={value}
          placeholder="Example: The support team helped me quickly."
          rows={8}
          onChange={(event) => onChange(event.target.value)}
          required
        />
      </label>

      <button className={styles.primaryButton} type="submit">
        Submit feedback
      </button>
    </form>
  );
}
