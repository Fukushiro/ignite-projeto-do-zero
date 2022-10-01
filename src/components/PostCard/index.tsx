import { HTMLAttributes } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Post } from '../../pages';
import styles from './postcard.module.scss';

interface PostCardProps extends HTMLAttributes<HTMLDivElement> {
  post: Post;
}

export function PostCard({ post, ...rest }: PostCardProps) {
  return (
    <Link href={`/post/${post.uid}`}>
      <a className={styles.link}>
        <div className={styles.container} {...rest}>
          <h1>{post.data.title}</h1>
          <h2>{post.data.subtitle}</h2>

          <div className={styles.infos}>
            <div className={styles.time}>
              <Image
                src="/images/calendar.svg"
                width={20}
                height={20}
                color="white"
              />
              <time>{post.first_publication_date}</time>
            </div>
            <div className={styles.name}>
              <Image
                src="/images/user.svg"
                width={20}
                height={20}
                color="white"
              />
              {post.data.author}
            </div>
          </div>
        </div>
      </a>
    </Link>
  );
}
