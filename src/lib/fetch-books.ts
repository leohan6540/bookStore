import { BookData } from "@/types";

const fetchBooks = async (q?: string): Promise<BookData[]> => {
  let url = new URL(`http://localhost:12345/book`);
  if (q) {
    //url += `/search?q=${q}`;
    url = new URL(`${url}/search`);
    url.searchParams.append("q", q);
  }

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("데이터 페칭 실패");
    }
    return await response.json();
  } catch (err) {
    console.error(err);
    return [];
  }
};

export default fetchBooks;
