import next, { GetStaticProps } from 'next';
import { useEffect, useState } from 'react';
import Header from '../components/Header';
import { PostCard } from '../components/PostCard';

import { getPrismicClient } from '../services/prismic';

import commonStyles from '../styles/common.module.scss';
import { convertToString } from '../utils/date';
import styles from './home.module.scss';

export interface Post {
  uid?: string;
  first_publication_date: string | null;
  data: {
    title: string;
    subtitle: string;
    author: string;
    banner: {
      dimensions: { width: number; height: number };
      url: string;
    };
    content: { heading: string; body: { type: string; text: string }[] }[];
  };
}

interface PostPagination {
  next_page: string;
  results: Post[];
}

interface HomeProps {
  postsPagination: PostPagination;
}

export default function Home({ postsPagination }: HomeProps) {
  // useState
  const [posts, setPosts] = useState<Post[]>([]);
  const [nextPage, setNextPage] = useState<string>('');
  // useEffect
  useEffect(() => {
    setPosts(postsPagination.results);
    setNextPage(postsPagination.next_page);
  }, [postsPagination.results]);

  // handlers
  async function handlerLoadMorePosts() {
    if (nextPage === '') {
      return;
    }
    const response = await fetch(nextPage);
    const data = await response.json();

    setPosts([
      ...posts,
      ...data.results.map(v => ({
        ...v,
        first_publication_date: convertToString(v.first_publication_date),
      })),
    ]);
    setNextPage(data.next_page === null ? '' : data.next_page);
    console.log(data.next_page);

    console.log(data);

    console.log(data.results);
  }
  return (
    <main>
      <div className={styles.content}>
        <Header />

        <div className={styles.cards}>
          {/* card */}

          {/* <PostCard title="Titulo" /> */}

          {posts.map(post => {
            return <PostCard key={post.uid} post={post} />;
          })}
        </div>
        {nextPage !== '' && (
          <button
            onClick={() => {
              handlerLoadMorePosts();
            }}
            type="button"
            className={styles.button}
          >
            Carregar mais posts
          </button>
        )}
      </div>
    </main>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const prismic = getPrismicClient({});
  const postsResponse = await prismic.getByType('posts', { pageSize: 5 });

  console.log(postsResponse);
  const posts = postsResponse.results;
  return {
    props: {
      postsPagination: {
        results: posts.map(v => ({
          ...v,
          first_publication_date: convertToString(v.first_publication_date),
        })),
        next_page: postsResponse.next_page,
      },
    },
    revalidate: 60,
  };
};
