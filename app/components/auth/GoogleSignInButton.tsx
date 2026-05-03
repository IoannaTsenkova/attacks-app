"use client";

import { signIn } from "next-auth/react";
import Image from "next/image";
import styles from "./GoogleSignInButton.module.scss";

export default function GoogleSignInButton() {
  return (
    <button
      className={styles.googleButton}
      onClick={() => signIn("google", { callbackUrl: "/attacks/bitb/secure" })}
    >
      <Image src="/google-button-logo.png" alt="" width={20} height={20} />
      <span>Sign in with Google</span>
    </button>
  );
}
