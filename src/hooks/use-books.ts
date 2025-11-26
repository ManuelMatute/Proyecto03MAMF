// src/hooks/use-books.ts
import { useEffect, useState } from "react";
import { Book, subscribeBooks } from "@/lib/books";

export function useBooks() {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = subscribeBooks((data) => {
      setBooks(
        data.map((b) => ({
          ...b,
          disponible: b.disponible ?? true,
        }))
      );
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return { books, loading };
}
