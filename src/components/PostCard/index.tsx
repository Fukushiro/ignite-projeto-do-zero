import { HTMLAttributes } from 'react';
import Image from 'next/image';
import styles from './postcard.module.scss';

interface PostCardProps extends HTMLAttributes<HTMLDivElement> {
  title: string;
}

export function PostCard({ title, ...rest }: PostCardProps) {
  return (
    <div className={styles.container} {...rest}>
      <h1>Criando um app CRA do zero</h1>
      <h2>
        Tudo sobre como criar a sua primeira aplicação utilizando Create React
        App
      </h2>

      <div className={styles.infos}>
        <div className={styles.time}>
          <Image
            src="/images/calendar.svg"
            width={20}
            height={20}
            color="white"
          />
          <time>12/12/2022</time>
        </div>
        <div className={styles.name}>
          <Image src="/images/user.svg" width={20} height={20} color="white" />
          Joseph Oliveira
        </div>
      </div>
    </div>
  );
}
