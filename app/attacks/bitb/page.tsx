"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import styles from "./page.module.scss";
import FakeBrowserPopup from "@/components/bitb/FakeBrowserPopup";
import ScenarioNavigation from "@/components/shared/ScenarioNavigation";
import { trackAttackEvent } from "@/utils/analytics";

export default function BitBAttackPage() {
  const [showPopup, setShowPopup] = useState(false);
  const [submittedEmail, setSubmittedEmail] = useState("");
  useEffect(() => {
    trackAttackEvent({
      attack: "bitb",
      event: "started",
    });
  }, []);

  return (
    <main className={styles.container}>
      <ScenarioNavigation
        secureHref={submittedEmail ? "/attacks/bitb/secure" : undefined}
        showDashboard={Boolean(submittedEmail)}
      />

      <section className={styles.portalCard}>
        <div className={styles.portalHeader}>
          <span className={styles.logoMark}>S</span>
          <span className={styles.logoText}>Secure Client Portal</span>
        </div>

        <div className={styles.content}>
          <p className={styles.eyebrow}>Account access</p>

          <h1>Sign in to continue</h1>

          <p className={styles.description}>
            Access your personal dashboard, documents and recent account
            activity.
          </p>
          <button
            className={styles.googleButton}
            onClick={() => {
              setShowPopup(true);
            }}
          >
            <Image
              src="/google-button-logo.png"
              alt=""
              width={20}
              height={20}
              className={styles.googleIcon}
            />
            <span>Sign in with Google</span>
          </button>
          <p className={styles.trustText}>
            Protected access for registered users
          </p>
        </div>
      </section>

      {submittedEmail && (
        <section className={styles.resultBox}>
          <strong>⚠️ This was a simulation</strong>
          <p>
            The entered email address was captured by a fake authentication
            popup:
            <br />
            <span>{submittedEmail}</span>
          </p>
          <p>
            In a real attack, credentials could be collected by an attacker
            through a visually convincing login window.
          </p>
        </section>
      )}

      {showPopup && (
        <FakeBrowserPopup
          onClose={() => setShowPopup(false)}
          onSubmit={(email) => {
            setSubmittedEmail(email);
            setShowPopup(false);
            trackAttackEvent({
              attack: "bitb",
              event: "victim",
            });
          }}
        />
      )}
    </main>
  );
}
