import { Navbar } from "../components/Navbar";
import styles from "../styles/Home.module.css";

export default function Home() {
  return (
    <div className="page-container">
      <Navbar />
      <div className={styles.main}>
        <h1>News App</h1>
        <h3>Your one step shot for the latest news articles</h3>
      </div>
    </div>
  );
}
