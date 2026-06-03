"use client";

import styles from "@/styles/clickjacking.module.scss";
import { trackAttackEvent } from "@/utils/analytics";

export default function ClickjackingTargetPage() {
  const handleAuthorize = () => {
    trackAttackEvent({
      attack: "clickjacking",
      event: "hidden_action_triggered",
    });
    window.parent.postMessage({ type: "CLICKJACKING_ACTION_TRIGGERED" }, "*");
  };

  return (
    <main className={styles.targetPage}>
      <button
        className={styles.realSensitiveButton}
        type="button"
        onClick={handleAuthorize}
      >
        Approve security policy
      </button>
    </main>
  );
}
