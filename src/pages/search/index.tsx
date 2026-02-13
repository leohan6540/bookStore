import React, { ReactNode, useEffect, useState } from "react";
import SearchableLayout from "@/components/searchable-layout";
import BookItem from "@/components/book-item";
import fetchBooks from "@/lib/fetch-books";
import { BookData } from "@/types";
import { useRouter } from "next/router";
import Head from "next/head";

// export const getServerSideProps = async (
//   context: GetServerSidePropsContext,
// ) => {
//   const { q } = context.query;
//   const queryString = Array.isArray(q) ? q[0] : q;
//   const SearchedBooks = await fetchBooks(queryString ?? "");
//   return {
//     props: { SearchedBooks },
//   };
// };

const Page = () => {
  const [books, setBooks] = useState<BookData[]>([]);
  const router = useRouter();
  const q = router.query.q as string;

  const fetchSearchResult = async () => {
    const data = await fetchBooks(q);
    setBooks(data);
  };

  useEffect(() => {
    if (q) fetchSearchResult();
  }, [q]);

  return (
    <>
      <Head>
        <title>한입북스 - 검색결과</title>
        <meta property="og:image" content="/thumbnail.png" />
        <meta property="og:title" content="한입북스-검색결과" />
        <meta
          property="og:description"
          content="한입북스에 등록된 도서를 만나보세요   "
        />
      </Head>
      <div>
        {books.map((book) => (
          <BookItem key={book.id} {...book} />
        ))}
      </div>
    </>
  );
};

export default Page;

Page.getLayout = (page: ReactNode) => {
  return <SearchableLayout>{page}</SearchableLayout>;
};
