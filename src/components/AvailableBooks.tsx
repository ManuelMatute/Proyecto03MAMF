import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export interface AvailableBook {
  id: string;
  genre: string;
  title: string;
  condition: string;
}

const INITIAL_BOOKS: AvailableBook[] = [
  { id: "1", genre: "Literatura", title: "Cien Años de Soledad", condition: "Bueno" },
  { id: "2", genre: "Ingeniería", title: "Estructuras de Datos en C++", condition: "Aceptable" },
  { id: "3", genre: "Matemáticas", title: "Cálculo Diferencial e Integral", condition: "Bueno" },
  { id: "4", genre: "Ciencias", title: "Física para Ingeniería", condition: "Nuevo" },
  { id: "5", genre: "Literatura", title: "El Amor en los Tiempos del Cólera", condition: "Bueno" },
  { id: "6", genre: "Economía", title: "Principios de Economía", condition: "Aceptable" },
  { id: "7", genre: "Idiomas", title: "English Grammar in Use", condition: "Nuevo" },
  { id: "8", genre: "Arte", title: "Historia del Arte Contemporáneo", condition: "Bueno" },
];

export const AvailableBooks = () => {
  const [books, setBooks] = useState<AvailableBook[]>(INITIAL_BOOKS);
  const [filteredBooks, setFilteredBooks] = useState<AvailableBook[]>(INITIAL_BOOKS);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("all");
  const [lastUpdate, setLastUpdate] = useState<Date>(new Date());

  const genres = ["all", ...Array.from(new Set(INITIAL_BOOKS.map((b) => b.genre)))];

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

  const handleRefresh = () => {
    // Simular actualización mezclando el array
    const shuffled = [...INITIAL_BOOKS].sort(() => Math.random() - 0.5);
    setBooks(shuffled);
    setLastUpdate(new Date());
  };

  const getMinutesAgo = () => {
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
                {genres.filter((g) => g !== "all").map((genre) => (
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

        {filteredBooks.length === 0 ? (
          <div className="py-12 text-center">
            <p className="text-muted-foreground">No se encontraron libros con estos criterios.</p>
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
                  <Badge className={`text-xs ${getConditionColor(book.condition)}`}>
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
