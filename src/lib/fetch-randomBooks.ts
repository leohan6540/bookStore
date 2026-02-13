import { BookData } from "@/types";

export default async function fetchRandomBooks(): Promise<BookData[]> {
  const url = "https://onebite-books-server-seven-plum.vercel.app/book/random";

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`서버에러 ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error(error);
    return [];
  }
}
