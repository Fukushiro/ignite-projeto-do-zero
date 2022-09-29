import Image from 'next/image';
import styles from './header.module.scss';

export default function Header() {
  return (
    <div className={styles.container}>
      <Image src="/images/icon.svg" width={50} height={50} />

      <h2>spacetraveling</h2>
    </div>
  );
}
