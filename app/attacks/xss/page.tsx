"use client";

import { useEffect, useState } from "react";

import { FeedbackForm } from "@/components/xss/FeedbackForm";
import { FeedbackPreview } from "@/components/xss/FeedbackPreview";
import { TokenPanel } from "@/components/xss/TokenPanel";
import { XssSimulationResult } from "@/components/xss/XssSimulationResult";

import styles from "@/styles/xss.module.scss";

const STORAGE_KEY = "support_session_token";

const MOCK_TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.demo-session-token";

declare global {
  interface Window {
    captureDemoToken?: (token: string | null) => void;
  }
}
export default function XssAttackPage() {
  const [feedback, setFeedback] = useState("");
  const [submittedFeedback, setSubmittedFeedback] = useState("");
  const [capturedToken, setCapturedToken] = useState<string | null>(null);

  sessionStorage.setItem(STORAGE_KEY, MOCK_TOKEN);

  useEffect(() => {
    window.captureDemoToken = (token: string | null) => {
      setCapturedToken(token);
    };

    return () => {
      delete window.captureDemoToken;
    };
  }, []);

  const handleSubmit = () => {
    setSubmittedFeedback(feedback);
  };

  const handleReset = () => {
    setFeedback("");
    setSubmittedFeedback("");
    setCapturedToken(null);
    sessionStorage.setItem(STORAGE_KEY, MOCK_TOKEN);
  };

  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        <p className={styles.eyebrow}>Support Portal</p>
        <h1>Customer Feedback Center</h1>
        <p>
          Submit feedback about your recent support experience. Our team reviews
          all submitted messages.
        </p>
      </section>

      <section className={styles.layout}>
        <div className={styles.leftColumn}>
          <FeedbackForm
            value={feedback}
            onChange={setFeedback}
            onSubmit={handleSubmit}
          />

          {capturedToken && (
            <XssSimulationResult
              capturedToken={capturedToken}
              onReset={handleReset}
            />
          )}
        </div>

        <div className={styles.rightColumn}>
          <TokenPanel />
          <FeedbackPreview feedback={submittedFeedback} />
        </div>
      </section>
    </main>
  );
}
