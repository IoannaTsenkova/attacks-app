"use client";

import { useMemo, useState } from "react";

import { SecureLoginPanel } from "@/components/mfa-fatigue/SecureLoginPanel";
import { SecurePhoneMockup } from "@/components/mfa-fatigue/SecurePhoneMockup";
import ScenarioNavigation from "@/components/shared/ScenarioNavigation";
import { SecureResult } from "@/components/mfa-fatigue/SecureResult";
import { SecureVerificationPanel } from "@/components/mfa-fatigue/SecureVerificationPanel";

import styles from "@/styles/mfa-fatigue.module.scss";

type Step = "login" | "verify" | "result";
type Result = "success" | "blocked" | "denied";

const MAX_REQUESTS = 3;

function generateCode() {
  return Math.floor(10 + Math.random() * 90).toString();
}

export default function MfaFatigueSecurePage() {
  const [step, setStep] = useState<Step>("login");
  const [code, setCode] = useState("");
  const [inputCode, setInputCode] = useState("");
  const [requestCount, setRequestCount] = useState(0);
  const [result, setResult] = useState<Result | null>(null);
  const [hasCodeError, setHasCodeError] = useState(false);

  const isLimitReached = requestCount >= MAX_REQUESTS;

  const context = useMemo(
    () => ({
      location: "Veliko Tarnovo, Bulgaria",
      device: "Chrome on Windows",
      time: "Just now",
    }),
    [],
  );

  const handleLoginSubmit = () => {
    setCode(generateCode());
    setInputCode("");
    setRequestCount(1);
    setHasCodeError(false);
    setStep("verify");
  };

  const handleSendAgain = () => {
    if (isLimitReached) {
      setResult("blocked");
      setStep("result");
      return;
    }

    setCode(generateCode());
    setInputCode("");
    setHasCodeError(false);
    setRequestCount((current) => current + 1);
  };

  const handleVerify = () => {
    if (inputCode === code) {
      setResult("success");
      setStep("result");
      return;
    }

    setHasCodeError(true);
    setInputCode("");
  };

  const handleDeny = () => {
    setResult("denied");
    setStep("result");
  };

  const handleRestart = () => {
    setStep("login");
    setCode("");
    setInputCode("");
    setRequestCount(0);
    setResult(null);
    setHasCodeError(false);
  };

  return (
    <main className={styles.page}>
      <ScenarioNavigation attackHref="/attacks/mfa-fatigue" />

      <section className={styles.hero}>
        <p className={styles.eyebrow}>Secure Workspace</p>
        <h1>Protected Corporate VPN Access</h1>
        <p>
          Sign in with number matching, request limits and contextual
          verification details.
        </p>
      </section>

      <section className={styles.layout}>
        <div className={styles.leftPanel}>
          {step === "login" && (
            <SecureLoginPanel onSubmit={handleLoginSubmit} />
          )}

          {step === "verify" && (
            <SecureVerificationPanel
              code={code}
              requestCount={requestCount}
              maxRequests={MAX_REQUESTS}
              isLimitReached={isLimitReached}
            />
          )}

          {step === "result" && result && (
            <SecureResult result={result} onRestart={handleRestart} />
          )}
        </div>

        <SecurePhoneMockup
          code={code}
          inputCode={inputCode}
          context={context}
          requestCount={requestCount}
          isActive={step === "verify"}
          isLimitReached={isLimitReached}
          hasCodeError={hasCodeError}
          onInputChange={(value) => {
            setInputCode(value);
            setHasCodeError(false);
          }}
          onVerify={handleVerify}
          onSendAgain={handleSendAgain}
          onDeny={handleDeny}
        />
      </section>
    </main>
  );
}
