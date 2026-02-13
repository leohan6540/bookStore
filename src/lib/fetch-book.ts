import { BookData } from "@/types";

export default async function fetchBook(id: string): Promise<BookData | null> {
  const url = `http://localhost:12345/book/${id}`;

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
