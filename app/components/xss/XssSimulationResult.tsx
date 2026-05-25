import styles from "@/styles/xss.module.scss";

type XssSimulationResultProps = {
  capturedToken: string;
  onReset: () => void;
};

export function XssSimulationResult({
  capturedToken,
  onReset,
}: Readonly<XssSimulationResultProps>) {
  return (
    <section className={styles.resultCard}>
      <p className={styles.cardLabel}>Simulation result</p>
      <h2>Token could be stolen</h2>

      <p>
        This was a simulation. The submitted content contained a script-like
        payload that could execute in the browser if rendered unsafely.
      </p>

      <div className={styles.capturedBox}>
        <span>Captured mock token</span>
        <code>{capturedToken}</code>
      </div>

      <p>
        In a real attack, this could allow an attacker to steal session data or
        act as the authenticated user.
      </p>

      <button
        className={styles.secondaryButton}
        type="button"
        onClick={onReset}
      >
        Restart simulation
      </button>
    </section>
  );
}
