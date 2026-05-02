"use client";

import Image from "next/image";
import { useState } from "react";
import clsx from "clsx";
import styles from "./FakeBrowserPopup.module.scss";

type Props = {
  onClose: () => void;
  onSubmit: (email: string) => void;
};

export default function FakeBrowserPopup({
  onClose,
  onSubmit,
}: Readonly<Props>) {
  const [step, setStep] = useState<"email" | "password">("email");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const [isMaximized, setIsMaximized] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const isValidEmail = (value: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
  };

  const handleEmailNext = () => {
    setEmailError("");

    if (!email.trim()) {
      setEmailError("Enter an email or phone number");
      return;
    }

    if (!isValidEmail(email)) {
      setEmailError("Enter a valid email address");
      return;
    }

    setStep("password");
  };

  const handlePasswordNext = () => {
    setPasswordError("");

    if (!password.trim()) {
      setPasswordError("Enter your password");
      return;
    }

    if (password.length < 6) {
      setPasswordError("Password must be at least 6 characters");
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      onSubmit(email);
      setIsLoading(false);
    }, 1400);
  };
  if (isMinimized) {
    return (
      <div className={styles.minimizedBar}>
        <button onClick={() => setIsMinimized(false)}>
          Google Sign in - accounts.google.com
        </button>
      </div>
    );
  }

  return (
    <div className={styles.overlay}>
      <div
        className={clsx(styles.popup, {
          [styles.maximized]: isMaximized,
        })}
      >
        <div className={styles.browserBar}>
          <div className={styles.addressBar}>
            <span className={styles.lock}>🔒</span>
            <span>accounts.google.com</span>
          </div>

          <div className={styles.windowControls}>
            <button
              type="button"
              aria-label="Minimize"
              onClick={() => setIsMinimized(true)}
            >
              —
            </button>

            <button
              type="button"
              aria-label="Maximize"
              onClick={() => setIsMaximized((prev) => !prev)}
            >
              □
            </button>

            <button
              type="button"
              aria-label="Close"
              className={styles.closeButton}
              onClick={onClose}
            >
              ×
            </button>
          </div>
        </div>

        <div className={styles.content}>
          <Image
            src="/google_logo.png"
            alt="Google"
            width={75}
            height={25}
            className={styles.logo}
          />

          <h2>Sign in</h2>
          <p className={styles.subtitle}>Use your Google Account</p>

          {step === "email" ? (
            <>
              <div className={styles.inputGroup}>
                <input
                  className={clsx({ [styles.inputError]: emailError })}
                  type="email"
                  placeholder="Email or phone"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setEmailError("");
                  }}
                />

                {emailError && (
                  <p className={styles.errorMessage}>{emailError}</p>
                )}
              </div>

              <button className={styles.linkButton} type="button">
                Forgot email?
              </button>

              <p className={styles.infoText}>
                Not your computer? Use Guest mode to sign in privately.
              </p>

              <button className={styles.linkButton} type="button">
                Learn more
              </button>

              <div className={styles.actions}>
                <button className={styles.textButton} onClick={onClose}>
                  Cancel
                </button>

                <button
                  className={styles.primaryButton}
                  onClick={handleEmailNext}
                >
                  Next
                </button>
              </div>
            </>
          ) : (
            <>
              <div className={styles.emailChip}>{email}</div>

              <div className={styles.inputGroup}>
                <input
                  className={clsx({ [styles.inputError]: passwordError })}
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setPasswordError("");
                  }}
                />

                {passwordError && (
                  <p className={styles.errorMessage}>{passwordError}</p>
                )}
              </div>

              <button className={styles.linkButton} type="button">
                Forgot password?
              </button>

              <div className={styles.actions}>
                <button
                  className={styles.textButton}
                  onClick={() => {
                    setStep("email");
                    setPassword("");
                    setPasswordError("");
                  }}
                >
                  Back
                </button>

                <button
                  className={styles.primaryButton}
                  onClick={handlePasswordNext}
                  disabled={isLoading}
                >
                  {isLoading ? "Signing in..." : "Next"}
                </button>
              </div>
            </>
          )}
        </div>
      </div>
      {isLoading && (
        <div className={styles.loadingOverlay}>
          <div className={styles.spinner}></div>
        </div>
      )}
    </div>
  );
}
