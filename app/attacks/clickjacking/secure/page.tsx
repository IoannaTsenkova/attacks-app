"use client";

import {
  CheckCircle2,
  FileLock2,
  Frame,
  LockKeyhole,
  ShieldCheck,
} from "lucide-react";

import ScenarioNavigation from "@/components/shared/ScenarioNavigation";
import styles from "@/styles/clickjacking.module.scss";

export default function ClickjackingSecurePage() {
  return (
    <main className={styles.page}>
      <ScenarioNavigation attackHref="/attacks/clickjacking" />

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
              <p className={styles.eyebrow}>Protected interface</p>
              <h1>Clickjacking protection enabled</h1>
            </div>

            <span className={styles.statusBadge}>
              <LockKeyhole size={16} />
              Protected session
            </span>
          </header>

          <section className={styles.secureCard}>
            <div className={styles.secureIcon}>
              <FileLock2 size={34} />
            </div>

            <p className={styles.badge}>Frame protection</p>

            <h2>This page cannot be embedded by another site</h2>

            <p>
              Sensitive actions are protected from hidden iframe overlays by
              using frame restrictions and additional confirmation steps.
            </p>

            <div className={styles.protectionGrid}>
              <div>
                <Frame size={20} />
                <strong>Framing blocked</strong>
                <span>
                  External pages are not allowed to embed this interface.
                </span>
              </div>

              <div>
                <ShieldCheck size={20} />
                <strong>Protected action</strong>
                <span>
                  Sensitive operations require visible user confirmation.
                </span>
              </div>

              <div>
                <CheckCircle2 size={20} />
                <strong>Clear context</strong>
                <span>
                  The user can see the real action before confirming it.
                </span>
              </div>
            </div>

            <button className={styles.secureButton} type="button">
              Confirm visible security action
            </button>
          </section>

          <section className={styles.headersPanel}>
            <p className={styles.panelTitle}>Applied security headers</p>

            <div className={styles.headerSnippet}>
              <span>Content-Security-Policy</span>
              <code>frame-ancestors &apos;self&apos;</code>
            </div>

            <div className={styles.headerSnippet}>
              <span>X-Frame-Options</span>
              <code>SAMEORIGIN</code>
            </div>
          </section>

          <section className={styles.safeResultCard}>
            <p className={styles.eyebrow}>Protection result</p>
            <h2>Hidden overlay attack prevented</h2>
            <p>
              Unlike the attack scenario, this interface is designed so that
              sensitive actions cannot be silently triggered through an
              invisible iframe controlled by another page.
            </p>
          </section>
        </section>
      </section>
    </main>
  );
}
