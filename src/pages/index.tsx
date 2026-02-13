import SearchableLayout from "@/components/searchable-layout";
import style from "./index.module.css";
import { ReactNode } from "react";
import BookItem from "@/components/book-item";
import { InferGetStaticPropsType } from "next";
import fetchBooks from "@/lib/fetch-books";
import fetchRandomBooks from "@/lib/fetch-randomBooks";
import Head from "next/head";

export const getStaticProps = async () => {
  //getStaticProps
  //빌드타임에 (내가 개발다 끝내고 vercel에 올리는 시간) 딱 한 번만 사전렌더링함. 그래서 빠름

  // getServerSideProps
  //사전렌더링 시에 컴포넌트보다 먼저 실행되어서, 컴포넌트에 필요한 데이터를 불러오는 함수(SSR)
  //서버에서 실행됨
  const [allBooks, recBooks] = await Promise.all([
    fetchBooks(),
    fetchRandomBooks(),
  ]);
  return {
    props: {
      allBooks,
      recBooks,
    },
    //revalidate: 3, //이거 쓰면 ISR 방식 적용. SSG장점 + SSR장점 합침. 3초마다 재생성
  };
};

export default function Home({
  allBooks,
  recBooks,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  //이 컴포넌트는 2번 실행됨. 1.사전렌더링떄 서버에서 한 번, 2. js 번들파일 넘겨받은 브라우저에서 하이드레이션 때 또 한 번
  return (
    <>
      <Head>
        <title>한입북스</title>
        <meta property="og:image" content="/thumbnail.png" />
        <meta property="og:title" content="한입북스" />
        <meta
          property="og:description"
          content="한입북스에 등록된 도서를 만나보세요   "
        />
      </Head>
      <div className={style.container}>
        <section>
          <h3>지금 추천하는 도서</h3>
          {recBooks.map((book) => (
            <BookItem key={book.id} {...book} />
          ))}
        </section>
        <section>
          <h3>등록된 모든 도서</h3>
          {allBooks.map((book) => (
            <BookItem key={book.id} {...book} />
          ))}
        </section>
      </div>
    </>
  );
}

Home.getLayout = (page: ReactNode) => {
  return <SearchableLayout>{page}s</SearchableLayout>;
};
