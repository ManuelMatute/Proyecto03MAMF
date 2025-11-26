// src/lib/interests.ts
import {
  collection,
  addDoc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "./firebase";
import { EstadoLibro } from "./books";

export interface Interest {
  id?: string;
  bookId?: string;
  genero: string;
  titulo: string;
  estadoDeseado?: EstadoLibro;
  estudianteNombre: string;
  estudianteCorreo: string;
  estudianteCodigo: string;
  bloqueHorario: string;
  createdAt?: any;
}

const interestsCol = collection(db, "interests");

export async function createInterest(
  data: Omit<Interest, "id" | "createdAt">
): Promise<void> {
  await addDoc(interestsCol, {
    ...data,
    createdAt: serverTimestamp(),
  });
}

export function subscribeInterests(callback: (interests: Interest[]) => void) {
  const q = query(interestsCol, orderBy("createdAt", "desc"));

  return onSnapshot(q, (snapshot) => {
    const interests: Interest[] = snapshot.docs.map((docSnap) => ({
      id: docSnap.id,
      ...(docSnap.data() as Omit<Interest, "id">),
    }));
    callback(interests);
  });
}
