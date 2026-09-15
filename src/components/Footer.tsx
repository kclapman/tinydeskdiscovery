import styles from './Footer.module.css';

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.copy}>
        An unofficial fan project — not affiliated with, endorsed by, or sponsored by NPR. All performances are
        hosted on YouTube; this site only helps you find them.
      </div>
    </footer>
  );
}
