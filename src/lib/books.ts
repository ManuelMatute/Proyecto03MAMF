// src/lib/books.ts
import {
  collection,
  addDoc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  doc,
  updateDoc,
} from "firebase/firestore";
import { db } from "./firebase";

export type EstadoLibro = "Nuevo" | "Bueno" | "Aceptable";

export interface Book {
  id?: string;
  genero: string;
  titulo: string;
  estado: EstadoLibro;
  estudianteNombre: string;
  estudianteCorreo: string;
  estudianteCodigo: string;
  bloqueHorario: string;
  disponible?: boolean;
  createdAt?: any;
}

const booksCol = collection(db, "books");

export async function createBook(
  data: Omit<Book, "id" | "createdAt">
): Promise<void> {
  await addDoc(booksCol, {
    ...data,
    disponible: data.disponible ?? true,
    createdAt: serverTimestamp(),
  });
}

export async function markBookAsNotAvailable(id: string): Promise<void> {
  const ref = doc(booksCol, id);
  await updateDoc(ref, { disponible: false });
}

export function subscribeBooks(callback: (books: Book[]) => void) {
  const q = query(booksCol, orderBy("createdAt", "desc"));

  return onSnapshot(q, (snapshot) => {
    const books: Book[] = snapshot.docs.map((docSnap) => ({
      id: docSnap.id,
      ...(docSnap.data() as Omit<Book, "id">),
    }));
    callback(books);
  });
}
