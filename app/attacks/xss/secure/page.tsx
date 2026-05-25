"use client";

import { useEffect, useMemo, useState } from "react";
import DOMPurify from "dompurify";

import { SecureFeedbackForm } from "@/components/xss/SecureFeedbackForm";
import { SecureFeedbackPreview } from "@/components/xss/SecureFeedbackPreview";
import { SecureSessionPanel } from "@/components/xss/SecureSessionPanel";
import { SanitizationResult } from "@/components/xss/SanitizationResult";

import styles from "@/styles/xss.module.scss";

const STORAGE_KEY = "support_session_token";

const MOCK_TOKEN =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.secure-demo-session-token";

export default function XssSecurePage() {
  const [feedback, setFeedback] = useState("");
  const [submittedFeedback, setSubmittedFeedback] = useState("");

  useEffect(() => {
    sessionStorage.setItem(STORAGE_KEY, MOCK_TOKEN);
  }, []);

  const sanitizedFeedback = useMemo(() => {
    if (!submittedFeedback) return "";

    return DOMPurify.sanitize(submittedFeedback, {
      USE_PROFILES: { html: true },
    });
  }, [submittedFeedback]);

  const wasSanitized =
    Boolean(submittedFeedback) && submittedFeedback !== sanitizedFeedback;

  const handleSubmit = () => {
    setSubmittedFeedback(feedback);
  };

  const handleReset = () => {
    setFeedback("");
    setSubmittedFeedback("");
    sessionStorage.setItem(STORAGE_KEY, MOCK_TOKEN);
  };

  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        <p className={styles.eyebrow}>Secure Support Portal</p>
        <h1>Protected Feedback Center</h1>
        <p>
          Submit feedback through a protected interface that sanitizes unsafe
          content before rendering it in the browser.
        </p>
      </section>

      <section className={styles.layout}>
        <div className={styles.leftColumn}>
          <SecureFeedbackForm
            value={feedback}
            onChange={setFeedback}
            onSubmit={handleSubmit}
          />

          {submittedFeedback && (
            <SanitizationResult
              wasSanitized={wasSanitized}
              onReset={handleReset}
            />
          )}
        </div>

        <div className={styles.rightColumn}>
          <SecureSessionPanel />

          <SecureFeedbackPreview
            feedback={sanitizedFeedback}
            wasSanitized={wasSanitized}
          />
        </div>
      </section>
    </main>
  );
}
