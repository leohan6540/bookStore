import { BookData } from "@/types";

export default async function fetchBook(id: string): Promise<BookData | null> {
  const url = `https://onebite-books-server-seven-plum.vercel.app/book/${id}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("서버 상태 이상");
    }
    return await response.json();
  } catch (error) {
    console.error(error);
    return null;
  }
}
