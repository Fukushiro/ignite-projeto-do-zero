import Image from 'next/image';
import styles from './header.module.scss';

export default function Header() {
  return (
    <div className={styles.container}>
      <Image src="/images/Logo.svg" width={238} height={50} />

      {/* <h2>spacetraveling</h2> */}
    </div>
  );
}
