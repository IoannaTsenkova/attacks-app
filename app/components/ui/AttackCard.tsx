import Link from "next/link";
import clsx from "clsx";
import styles from "./AttackCard.module.scss";

type Props = {
  title: string;
  description: string;
  attackLink?: string;
  secureLink?: string;
  primaryLink?: {
    href: string;
    label: string;
  };
  secondaryLink?: {
    href: string;
    label: string;
  };
  className?: string;
};

export default function AttackCard({
  title,
  description,
  attackLink,
  secureLink,
  primaryLink,
  secondaryLink,
  className,
}: Props) {
  const links = primaryLink
    ? [
        primaryLink,
        ...(secondaryLink ? [secondaryLink] : []),
      ]
    : attackLink
      ? [
          { href: attackLink, label: "Attack" },
          { href: secureLink ?? `${attackLink}/secure`, label: "Secure" },
        ]
      : [];

  return (
    <div className={clsx(styles.card, className)}>
      <h3>{title}</h3>
      <p>{description}</p>

      {links.length > 0 && (
        <div className={styles.actions}>
          {links.map((link) => (
            <Link key={link.href} href={link.href}>
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
