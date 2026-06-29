"use client";

import Image from "next/image";
import { signIn, signOut } from "next-auth/react";
import type { Session } from "next-auth";
import styles from "./page.module.scss";
import GoogleSignInButton from "@/components/auth/GoogleSignInButton";
import ScenarioNavigation from "@/components/shared/ScenarioNavigation";
type Props = {
  session: Session | null;
};

export default function BitBSecureClient({ session }: Readonly<Props>) {
  const handleGoogleLogin = () => {
    signIn(
      "google",
      { callbackUrl: "/attacks/bitb/secure" },
      { prompt: "select_account" },
    );
  };

  const handleForceGoogleLogin = () => {
    signIn(
      "google",
      { callbackUrl: "/attacks/bitb/secure" },
      { prompt: "login" },
    );
  };

  return (
    <main className={styles.container}>
      <ScenarioNavigation attackHref="/attacks/bitb" />

      <section className={styles.hero}>
        <span className={styles.badge}>Secure mode</span>
        <h1>Secure Google authentication</h1>
        <p>
          This page demonstrates the secure alternative to a
          Browser-in-the-Browser phishing attack: a real OAuth login flow
          through Google.
        </p>
      </section>
      <section className={styles.authCard}>
        <div className={styles.authContent}>
          <h2>Real OAuth flow</h2>
          <p>
            In the secure version, the application does not render a fake login
            popup and does not handle the user password. Instead, the user is
            redirected to the real Google authentication flow.
          </p>
          {session?.user ? (
            <div className={styles.sessionBox}>
              <div className={styles.userRow}>
                {session?.user?.image && (
                  <Image
                    src={session?.user?.image || ""}
                    alt=""
                    width={44}
                    height={44}
                    className={styles.avatar}
                  />
                )}
                <div>
                  <strong>Authenticated securely</strong>
                  <p>{session.user.email}</p>
                </div>
              </div>
              <div className={styles.sessionActions}>
                <button
                  type="button"
                  className={styles.primaryButton}
                  onClick={handleGoogleLogin}
                >
                  Choose Google account again
                </button>
                <button
                  type="button"
                  className={styles.secondaryButton}
                  onClick={handleForceGoogleLogin}
                >
                  Force Google login screen
                </button>

                <button
                  type="button"
                  className={styles.neutralButton}
                  onClick={() =>
                    signOut({ callbackUrl: "/attacks/bitb/secure" })
                  }
                >
                  Sign out
                </button>
              </div>
            </div>
          ) : (
            <GoogleSignInButton />
          )}
        </div>

        <div className={styles.explanationBox}>
          <h3>Why this is safer</h3>

          <ul>
            <li>The login happens on the real Google domain.</li>
            <li>
              The password is never entered into the application interface.
            </li>
            <li>The browser address bar can be verified by the user.</li>
            <li>
              Password managers can detect whether the domain is legitimate.
            </li>
          </ul>
        </div>
      </section>

      <section className={styles.comparison}>
        <h2>Attack vs secure behavior</h2>

        <div className={styles.comparisonGrid}>
          <div className={styles.attackBox}>
            <span>Attack version</span>
            <h3>Fake popup</h3>
            <p>
              The login window is visually imitated and rendered inside the
              attacker-controlled page. The user believes it is a real provider
              window.
            </p>
          </div>

          <div className={styles.safeBox}>
            <span>Secure version</span>
            <h3>Real redirect</h3>
            <p>
              The application redirects the user to Google. Credentials are
              entered only on the real provider domain and the application
              receives only the authentication result.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
