"use client";

import { useEffect, useMemo, useState } from "react";

import { LoginPanel } from "@/components/mfa-fatigue/LoginPanel";
import { PhoneMockup } from "@/components/mfa-fatigue/PhoneMockup";
import { SimulationResult } from "@/components/mfa-fatigue/SimulationResults";
import { VerificationStatusPanel } from "@/components/mfa-fatigue/VerificationStatusPanel";
import { mfaRequests } from "@/utils/mfaFatigueData";
import type { AttackStep, SimulationResultType } from "@/utils/mfaFatigueTypes";

import styles from "@/styles/mfa-fatigue.module.scss";

export default function MfaFatigueAttackPage() {
  const [step, setStep] = useState<AttackStep>("login");
  const [requestIndex, setRequestIndex] = useState(-1);
  const [result, setResult] = useState<SimulationResultType | null>(null);

  const visibleRequests = useMemo(
    () => mfaRequests.slice(0, requestIndex + 1),
    [requestIndex],
  );

  const isLastRequest = requestIndex >= mfaRequests.length - 1;
  const isSuspicious = requestIndex >= 2;

  useEffect(() => {
    if (step !== "mfa") return;

    const timer = globalThis.setTimeout(() => {
      mfaRequests.push({
        id: mfaRequests.length + 1,
        location: "Unknown location",
        device: "Windows device",
        browser: "Chrome",
        time: "Just now",
      });
      setRequestIndex((current) => current + 1);
    }, 2500);

    return () => globalThis.clearTimeout(timer);
  }, [step, requestIndex, isLastRequest]);

  const handleLoginSubmit = () => {
    setStep("mfa");
  };

  const handleApprove = () => {
    setResult("approved");
    setStep("result");
  };

  const handleDeny = () => {
    setResult("denied");
    setStep("result");
  };

  const handleRestart = () => {
    setStep("login");
    setRequestIndex(-1);
    setResult(null);
  };

  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        <p className={styles.eyebrow}>Secure Workspace</p>
        <h1>Corporate VPN Access</h1>
        <p>
          Sign in with your company account to continue to the internal
          dashboard.
        </p>
      </section>

      <section className={styles.layout}>
        <div className={styles.leftPanel}>
          {step === "login" && <LoginPanel onSubmit={handleLoginSubmit} />}

          {step === "mfa" && (
            <VerificationStatusPanel
              requestCount={requestIndex + 1}
              isSuspicious={isSuspicious}
            />
          )}

          {step === "result" && result && (
            <SimulationResult result={result} onRestart={handleRestart} />
          )}
        </div>

        <PhoneMockup
          requests={visibleRequests}
          isSuspicious={isSuspicious}
          canRespond={step === "mfa"}
          onApprove={handleApprove}
          onDeny={handleDeny}
        />
      </section>
    </main>
  );
}
