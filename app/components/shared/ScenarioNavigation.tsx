import Link from "next/link";
import clsx from "clsx";

import styles from "@/styles/scenario-navigation.module.scss";

export type ScenarioNavigationProps = {
  backHref?: string;
  attackHref?: string;
  secureHref?: string;
  showDashboard?: boolean;
};

type NavigationLink = {
  href: string;
  label: string;
  variant?: "primary" | "secondary";
};

export default function ScenarioNavigation({
  backHref = "/",
  attackHref,
  secureHref,
  showDashboard = true,
}: Readonly<ScenarioNavigationProps>) {
  const links: NavigationLink[] = [
    { href: backHref, label: backHref === "/" ? "Back to Home" : "Back" },
    ...(attackHref
      ? [{ href: attackHref, label: "Attack", variant: "primary" as const }]
      : []),
    ...(secureHref
      ? [
          {
            href: secureHref,
            label: "Secure Version",
            variant: "secondary" as const,
          },
        ]
      : []),
    ...(showDashboard
      ? [
          {
            href: "/dashboard",
            label: "Results Dashboard",
            variant: "secondary" as const,
          },
        ]
      : []),
  ];

  return (
    <nav className={styles.nav} aria-label="Scenario navigation">
      {links.map((link) => (
        <Link
          key={`${link.href}-${link.label}`}
          href={link.href}
          className={clsx(styles.link, link.variant && styles[link.variant])}
        >
          {link.label}
        </Link>
      ))}
    </nav>
  );
}
