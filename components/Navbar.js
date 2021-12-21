import Link from "next/link";
import styles from "../styles/Navbar.module.css";

export const Navbar = () => {
  return (
    <div className={styles.main}>
      <div>
        <Link href="/" passHref>
          Home
        </Link>
      </div>
      <div>
        <Link href="/feed/1" passHref>
          Feed
        </Link>
      </div>
      <div>
        <Link href="https://instagram.com">
          <a target="_blank">Instagram</a>
        </Link>
      </div>
      <div>
        <Link href="https://twitter.com">
          <a target="_blank">Twitter</a>
        </Link>
      </div>
    </div>
  );
};
