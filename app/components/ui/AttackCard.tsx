import Link from "next/link";
import styles from "./AttackCard.module.scss";

type Props = {
  title: string;
  description: string;
  attackLink: string;
};

export default function AttackCard({ title, description, attackLink }: Props) {
  return (
    <div className={styles.card}>
      <h3>{title}</h3>
      <p>{description}</p>

      <div className={styles.actions}>
        <Link href={attackLink}>Attack</Link>
        <Link href={`${attackLink}/secure`}>Secure</Link>
      </div>
    </div>
  );
}
