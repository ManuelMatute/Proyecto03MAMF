// src/components/ui/AvailableBooks.tsx
import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useBooks } from "@/hooks/use-books";

export interface AvailableBook {
  id: string;
  genre: string;
  title: string;
  condition: string;
}

export const AvailableBooks = () => {
  const { books: remoteBooks, loading } = useBooks();

  const [books, setBooks] = useState<AvailableBook[]>([]);
  const [filteredBooks, setFilteredBooks] = useState<AvailableBook[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("all");
  const [lastUpdate, setLastUpdate] = useState<Date | null>(null);

  // Cuando cambian los libros en Firestore, los mapeamos a tu estructura
  useEffect(() => {
    const mapped: AvailableBook[] = remoteBooks.map((b) => ({
      id: b.id ?? "",
      genre: b.genero,
      title: b.titulo,
      condition: b.estado,
    }));

    setBooks(mapped);
    setLastUpdate(new Date());
  }, [remoteBooks]);

  // Géneros dinámicos a partir de lo que venga de Firebase
  const genres = ["all", ...Array.from(new Set(books.map((b) => b.genre)))];

  useEffect(() => {
    filterBooks();
  }, [searchTerm, selectedGenre, books]);

  const filterBooks = () => {
    let filtered = books;

    if (searchTerm) {
      filtered = filtered.filter((book) =>
        book.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedGenre !== "all") {
      filtered = filtered.filter((book) => book.genre === selectedGenre);
    }

    setFilteredBooks(filtered);
  };

  // Ahora "Actualizar" solo refresca la hora (los datos vienen en tiempo real de Firestore)
  const handleRefresh = () => {
    setLastUpdate(new Date());
  };

  const getMinutesAgo = () => {
    if (!lastUpdate) return "—";
    const now = new Date();
    const diff = Math.floor((now.getTime() - lastUpdate.getTime()) / 60000);
    return diff === 0 ? "hace un momento" : `hace ${diff} min`;
  };

  const getConditionColor = (condition: string) => {
    switch (condition) {
      case "Nuevo":
        return "bg-success text-success-foreground";
      case "Bueno":
        return "bg-primary text-primary-foreground";
      case "Aceptable":
        return "bg-secondary text-secondary-foreground";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  return (
    <section className="py-16 md:py-20 bg-background" id="disponible">
      <div className="container mx-auto px-4 max-w-6xl">
        <h2 className="mb-3 text-center text-3xl font-bold md:text-4xl text-foreground">
          Disponible Ahora
        </h2>
        <p className="mb-8 text-center text-muted-foreground">
          Libros que están en el stand en este momento
        </p>

        <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-end">
          <div className="flex-1">
            <Input
              type="text"
              placeholder="Buscar por título…"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full"
            />
          </div>
          <div className="md:w-64">
            <Select value={selectedGenre} onValueChange={setSelectedGenre}>
              <SelectTrigger>
                <SelectValue placeholder="Todos los géneros" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos los géneros</SelectItem>
                {genres
                  .filter((g) => g !== "all")
                  .map((genre) => (
                    <SelectItem key={genre} value={genre}>
                      {genre}
                    </SelectItem>
                  ))}
              </SelectContent>
            </Select>
          </div>
          <Button onClick={handleRefresh} variant="outline">
            Actualizar
          </Button>
        </div>

        <p className="mb-4 text-sm text-muted-foreground">
          Última actualización: {getMinutesAgo()}
        </p>

        {loading ? (
          <div className="py-12 text-center">
            <p className="text-muted-foreground">Cargando libros...</p>
          </div>
        ) : filteredBooks.length === 0 ? (
          <div className="py-12 text-center">
            <p className="text-muted-foreground">
              No se encontraron libros con estos criterios.
            </p>
          </div>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredBooks.map((book) => (
              <div
                key={book.id}
                className="rounded-lg border bg-card p-5 shadow-sm transition-shadow hover:shadow-md"
              >
                <div className="mb-3 flex items-start justify-between">
                  <Badge variant="outline" className="text-xs">
                    {book.genre}
                  </Badge>
                  <Badge
                    className={`text-xs ${getConditionColor(book.condition)}`}
                  >
                    {book.condition}
                  </Badge>
                </div>
                <h3 className="font-semibold text-card-foreground line-clamp-2">
                  {book.title}
                </h3>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
