"use client";

import { useState } from "react";

import styles from "@/styles/clickjacking.module.scss";
import { trackAttackEventOnce } from "@/utils/analytics";

export default function ClickjackingTargetPage() {
  const [hasTriggered, setHasTriggered] = useState(false);

  const handleAuthorize = () => {
    if (hasTriggered) {
      return;
    }

    setHasTriggered(true);
    trackAttackEventOnce({
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
        disabled={hasTriggered}
        onClick={handleAuthorize}
      >
        {hasTriggered ? "Policy approved" : "Approve security policy"}
      </button>
    </main>
  );
}
