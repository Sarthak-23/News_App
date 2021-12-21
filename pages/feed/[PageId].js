import { useRouter } from "next/router";
import Link from "next/link";
import styles from "../../styles/Feed.module.css";
import { Navbar } from "../../components/Navbar";

export const Feed = ({ pageNumber, articles }) => {
  const router = useRouter();
  return articles.length ? (
    <div className="page-container">
      <Navbar />
      <div className={styles.main}>
        {articles.map((article, index) => (
          <div key={index} className={styles.post}>
            <h1>
              <Link href={article.url}>
                <a target="_blank">{article.title}</a>
              </Link>
            </h1>
            <p>{article.description}</p>
            {!!article.urlToImage && <img src={article.urlToImage} />}
          </div>
        ))}
      </div>

      <div className={styles.paginator}>
        <div
          className={pageNumber === 1 ? styles.disabled : styles.active}
          onClick={() => {
            if (pageNumber > 1) {
              router
                .push(`/feed/${pageNumber - 1}`)
                .then(() => window.scrollTo(0, 0));
            }
          }}
        >
          {"<"}
        </div>

        <div>#{pageNumber}</div>

        <div
          className={pageNumber === 5 ? styles.disabled : styles.active}
          onClick={() => {
            if (pageNumber < 5) {
              router
                .push(`/feed/${pageNumber + 1}`)
                .then(() => window.scrollTo(0, 0));
            }
          }}
        >
          {">"}
        </div>
      </div>
    </div>
  ) : (
    <div className="page-container">
      <Navbar />
      <div className={styles.main}>
        <h1>Oops! No articles for this page</h1>
      </div>
    </div>
  );
};

export const getServerSideProps = async (context) => {
  const PageNumber = context.query.PageId;

  if (!PageNumber || PageNumber < 1 || PageNumber > 5) {
    return {
      props: {
        articles: [],
        pageNumber: 1,
      },
    };
  }

  const Response = await fetch(
    `https://newsapi.org/v2/top-headlines?country=in&pageSize=5&page=${PageNumber}`,
    {
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_NEWS_KEY}`,
      },
    }
  );

  const data = await Response.json();

  const { articles } = data;

  return {
    props: {
      articles: articles,
      pageNumber: Number.parseInt(PageNumber),
    },
  };
};

export default Feed;
