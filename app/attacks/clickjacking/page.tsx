"use client";

import { useEffect, useState } from "react";
import {
  AlertTriangle,
  CheckCircle2,
  Clock3,
  LockKeyhole,
  ShieldCheck,
} from "lucide-react";

import ScenarioNavigation from "@/components/shared/ScenarioNavigation";
import styles from "@/styles/clickjacking.module.scss";
import { trackAttackEventOnce } from "@/utils/analytics";

export default function ClickjackingAttackPage() {
  const [isTriggered, setIsTriggered] = useState(false);
  const [isRevealed, setIsRevealed] = useState(false);

  useEffect(() => {
    trackAttackEventOnce({
      attack: "clickjacking",
      event: "started",
    });

    const handleMessage = (event: MessageEvent) => {
      if (event.data?.type === "CLICKJACKING_ACTION_TRIGGERED") {
        setIsTriggered(true);
      }
    };

    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, []);

  return (
    <main className={styles.page}>
      <ScenarioNavigation
        secureHref={
          isTriggered ? "/attacks/clickjacking/secure" : undefined
        }
        showDashboard={isTriggered}
      />

      <section className={styles.shell}>
        <aside className={styles.sidebar}>
          <div className={styles.logo}>
            <ShieldCheck size={22} />
            <span>Security Center</span>
          </div>

          <nav className={styles.nav}>
            <span className={styles.navActive}>Overview</span>
            <span>Devices</span>
            <span>Access</span>
            <span>Audit log</span>
          </nav>
        </aside>

        <section className={styles.content}>
          <header className={styles.header}>
            <div>
              <p className={styles.eyebrow}>Account protection</p>
              <h1>Security recommendation available</h1>
            </div>

            <span className={styles.statusBadge}>
              <LockKeyhole size={16} />
              Secure session
            </span>
          </header>

          <section className={styles.attackCard}>
            <div className={styles.securityPanel}>
              <div className={styles.warningIcon}>
                <AlertTriangle size={30} />
              </div>

              <p className={styles.badge}>Recommended action</p>

              <h2>Enable enhanced account protection</h2>

              <p>
                A new security recommendation is available for your workspace.
                Enable enhanced protection to reduce the risk of unauthorized
                sign-ins.
              </p>

              <div className={styles.benefits}>
                <div>
                  <CheckCircle2 size={18} />
                  Blocks suspicious access patterns
                </div>

                <div>
                  <CheckCircle2 size={18} />
                  Adds additional session verification
                </div>

                <div>
                  <Clock3 size={18} />
                  Recommendation expires soon
                </div>
              </div>

              <button className={styles.fakeButton} type="button">
                Secure account
              </button>
            </div>

            <iframe
              className={isRevealed ? styles.revealedFrame : styles.hiddenFrame}
              src="/attacks/clickjacking/target"
              title="Hidden sensitive action"
            />
          </section>

          <section className={styles.auditPanel}>
            <p className={styles.panelTitle}>Recent security activity</p>

            <div className={styles.auditItem}>
              <span>10:24</span>
              <strong>New recommendation generated</strong>
            </div>

            <div className={styles.auditItem}>
              <span>10:21</span>
              <strong>Workspace risk score updated</strong>
            </div>

            <div className={styles.auditItem}>
              <span>10:18</span>
              <strong>Session verification completed</strong>
            </div>
          </section>

          {isTriggered && (
            <>
              <button
                className={styles.revealButton}
                type="button"
                onClick={() => setIsRevealed((current) => !current)}
              >
                {isRevealed ? "Hide attack layer" : "Reveal hidden layer"}
              </button>
              <section className={styles.resultCard}>
                <p className={styles.eyebrow}>Simulation result</p>
                <h2>Hidden action triggered</h2>
                <p>
                  This was a simulation. The visible button looked like a
                  security recommendation, but the click was captured by an
                  invisible iframe positioned above it.
                </p>
              </section>
            </>
          )}
        </section>
      </section>
    </main>
  );
}
