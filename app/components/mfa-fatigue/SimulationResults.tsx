import styles from "@/attacks/mfa-fatigue/page.module.scss";
import type { SimulationResultType } from "@/utils/mfaFatigueTypes";

type SimulationResultProps = {
  result: SimulationResultType;
  onRestart: () => void;
};

export function SimulationResult({
  result,
  onRestart,
}: Readonly<SimulationResultProps>) {
  const isApproved = result === "approved";

  return (
    <section className={styles.card}>
      <p className={styles.cardLabel}>Simulation result</p>

      <h2>{isApproved ? "Suspicious request approved" : "Request denied"}</h2>

      {isApproved ? (
        <p className={styles.muted}>
          This was a simulation. In a real MFA fatigue attack, approving an
          unexpected request could give an attacker access to the account.
        </p>
      ) : (
        <p className={styles.muted}>
          Good decision. Unexpected MFA requests should be denied and reported,
          especially when they appear repeatedly.
        </p>
      )}

      <div className={isApproved ? styles.riskBox : styles.safeBox}>
        {isApproved
          ? "Risk: the attacker may gain unauthorized access after the approval."
          : "Safe behavior: deny the request and verify whether the login attempt was legitimate."}
      </div>

      <button
        className={styles.primaryButton}
        type="button"
        onClick={onRestart}
      >
        Restart simulation
      </button>
    </section>
  );
}
