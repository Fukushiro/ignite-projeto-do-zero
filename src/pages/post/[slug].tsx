import { GetStaticPaths, GetStaticProps } from 'next';
import Header from '../../components/Header';

import { getPrismicClient } from '../../services/prismic';
import Image from 'next/image';
import commonStyles from '../../styles/common.module.scss';
import styles from './post.module.scss';
import { RichText } from 'prismic-dom';
import { convertToString } from '../../utils/date';

interface Post {
  first_publication_date: string | null;
  data: {
    title: string;
    banner: {
      // dimensions: { width: number; height: number };
      url: string;
    };
    author: string;
    content: {
      heading: string;
      body: {
        text: string;
      }[];
    }[];
  };
}

interface PostProps {
  post: Post;
}

export default function Post({ post }: PostProps) {
  console.log(post);

  return (
    <main>
      <div className={styles.headerArea}>
        <Header />
      </div>

      <div className={styles.imageArea}>
        {post.data.banner.url && (
          <Image
            src={post.data.banner.url}
            width={1440}
            height={400}
            objectFit="cover"
            layout="responsive"
          />
        )}
      </div>
      <div className={styles.content}>
        <h2>{post.data.title}</h2>

        <div className={styles.infos}>
          <div>
            <Image
              src="/images/calendar.svg"
              width={20}
              height={20}
              color="white"
            />
            <time>{convertToString(post.first_publication_date)}</time>
          </div>
          <div>
            <Image
              src="/images/user.svg"
              width={20}
              height={20}
              color="white"
            />
            {post.data.author}
          </div>
          <div>
            <Image
              src="/images/clock.svg"
              width={20}
              height={20}
              color="white"
            />
            4 min
          </div>
        </div>

        {post.data.content.map((cont, index) => {
          return (
            <div className={styles.paragraph} key={index}>
              <div className={styles.heading}>{cont.heading}</div>
              <div className={styles.text}>
                {/* {cont.body.map(val => {
                  return <p> {val.text}</p>;
                })} */}
                <div dangerouslySetInnerHTML={{ __html: cont.body }} />
              </div>
            </div>
          );
        })}
      </div>
    </main>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  // const prismic = getPrismicClient({});
  // const posts = await prismic.getByType(TODO);

  // TODO

  return {
    paths: [],
    fallback: 'blocking',
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { slug } = params;
  console.log(slug);

  const prismic = getPrismicClient({});
  const response = await prismic.getByUID('posts', String(slug), {});
  console.log(response.data);

  return {
    props: {
      post: {
        ...response,
        first_publication_date: convertToString(
          response.first_publication_date
        ),

        data: {
          ...response.data,

          content: [
            ...response.data.content.map(v => ({
              ...v,
              body: RichText.asHtml(v.body),
            })),
          ],
        },
      },
    },
    revalidate: 60 * 60,
  };
};
