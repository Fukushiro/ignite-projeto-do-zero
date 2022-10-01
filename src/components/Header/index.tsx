import Image from 'next/image';
import styles from './header.module.scss';
import Link from 'next/link';
export default function Header() {
  return (
    <div className={styles.container}>
      <Link href={'/'}>
        <a href="">
          <Image src="/images/Logo.svg" width={238} height={50} alt="logo" />
        </a>
      </Link>
      {/* <h2>spacetraveling</h2> */}
    </div>
  );
}
