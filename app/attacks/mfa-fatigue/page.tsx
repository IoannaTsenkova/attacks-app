"use client";

import { useEffect, useMemo, useState } from "react";

import { LoginPanel } from "@/components/mfa-fatigue/LoginPanel";
import { MfaRequestPanel } from "@/components/mfa-fatigue/MfaRequestPanel";
import { PhoneMockup } from "@/components/mfa-fatigue/PhoneMockup";
import { SimulationResult } from "@/components/mfa-fatigue/SimulationResults";
import { mfaRequests } from "@/utils/mfaFatigueData";
import type { AttackStep, SimulationResultType } from "@/utils/mfaFatigueTypes";

import styles from "./page.module.scss";

export default function MfaFatigueAttackPage() {
  const [step, setStep] = useState<AttackStep>("login");
  const [requestIndex, setRequestIndex] = useState(0);
  const [result, setResult] = useState<SimulationResultType | null>(null);

  const visibleRequests = useMemo(
    () => mfaRequests.slice(0, requestIndex + 1),
    [requestIndex],
  );

  const currentRequest = mfaRequests[requestIndex];

  const isLastRequest = requestIndex === mfaRequests.length - 1;
  const isSuspicious = requestIndex >= 2;

  useEffect(() => {
    if (step !== "mfa" || isLastRequest) return;

    const timer = window.setTimeout(() => {
      setRequestIndex((current) => current + 1);
    }, 2500);

    return () => window.clearTimeout(timer);
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
    setRequestIndex(0);
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

          {step === "mfa" && currentRequest && (
            <MfaRequestPanel
              request={currentRequest}
              requestCount={requestIndex + 1}
              totalRequests={mfaRequests.length}
              isSuspicious={isSuspicious}
              onApprove={handleApprove}
              onDeny={handleDeny}
            />
          )}

          {step === "result" && result && (
            <SimulationResult result={result} onRestart={handleRestart} />
          )}
        </div>

        <PhoneMockup requests={visibleRequests} isSuspicious={isSuspicious} />
      </section>
    </main>
  );
}
