// src/components/AvailableBooks.tsx
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
import { Label } from "@/components/ui/label";
import { useBooks } from "@/hooks/use-books";
import { Book, createBook, markBookAsNotAvailable } from "@/lib/books";
import { seedDemoBooks } from "@/lib/demoBooks";
import { toast } from "sonner";

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

export const AvailableBooks = () => {
  const { books: remoteBooks, loading } = useBooks();

  const [availableBooks, setAvailableBooks] = useState<Book[]>([]);
  const [swappedBooks, setSwappedBooks] = useState<Book[]>([]);
  const [filteredBooks, setFilteredBooks] = useState<Book[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("all");
  const [lastUpdate, setLastUpdate] = useState<Date | null>(null);

  const [swappingId, setSwappingId] = useState<string | null>(null);
  const [swapGenre, setSwapGenre] = useState("");
  const [swapTitle, setSwapTitle] = useState("");
  const [savingSwap, setSavingSwap] = useState(false);

  const [seeding, setSeeding] = useState(false);
  const isDev = import.meta.env.DEV;

  useEffect(() => {
    const available = remoteBooks.filter((b) => b.disponible !== false);
    const swapped = remoteBooks.filter((b) => b.disponible === false);
    setAvailableBooks(available);
    setSwappedBooks(swapped);
    setLastUpdate(new Date());
  }, [remoteBooks]);

  const genres = [
    "all",
    ...Array.from(new Set(availableBooks.map((b) => b.genero))),
  ];

  useEffect(() => {
    let filtered = availableBooks;

    if (searchTerm) {
      filtered = filtered.filter((book) =>
        book.titulo.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedGenre !== "all") {
      filtered = filtered.filter((book) => book.genero === selectedGenre);
    }

    setFilteredBooks(filtered);
  }, [searchTerm, selectedGenre, availableBooks]);

  const handleRefresh = () => {
    setLastUpdate(new Date());
  };

  const getMinutesAgo = () => {
    if (!lastUpdate) return "—";
    const now = new Date();
    const diff = Math.floor((now.getTime() - lastUpdate.getTime()) / 60000);
    return diff === 0 ? "hace un momento" : `hace ${diff} min`;
  };

  const startSwap = (book: Book) => {
    if (!book.id) return;
    setSwappingId(book.id);
    setSwapGenre(book.genero);
    setSwapTitle("");
  };

  const cancelSwap = () => {
    setSwappingId(null);
    setSwapGenre("");
    setSwapTitle("");
  };

  const handleConfirmSwap = async (book: Book) => {
    if (!book.id) return;
    if (!swapGenre.trim() || !swapTitle.trim()) {
      toast.error("Completa el género y el título del nuevo libro");
      return;
    }

    setSavingSwap(true);
    try {
      await markBookAsNotAvailable(book.id);

      await createBook({
        genero: swapGenre.trim(),
        titulo: swapTitle.trim(),
        estado: book.estado,
        estudianteNombre: book.estudianteNombre,
        estudianteCorreo: book.estudianteCorreo,
        estudianteCodigo: book.estudianteCodigo,
        bloqueHorario: book.bloqueHorario,
        disponible: true,
      });

      toast.success("Intercambio registrado");
      cancelSwap();
    } catch (e) {
      console.error(e);
      toast.error("No se pudo registrar el intercambio");
    } finally {
      setSavingSwap(false);
    }
  };

  const handleSeed = async () => {
    setSeeding(true);
    try {
      await seedDemoBooks();
      toast.success("Libros de prueba cargados");
    } catch (e) {
      console.error(e);
      toast.error("No se pudieron cargar los libros de prueba");
    } finally {
      setSeeding(false);
    }
  };

  return (
    <section className="py-16 md:py-20 bg-background" id="disponible">
      <div className="container mx-auto px-4 max-w-6xl">
        <h2 className="mb-3 text-center text-3xl font-bold md:text-4xl text-foreground">
          Libros disponibles para intercambio
        </h2>
        <p className="mb-8 text-center text-muted-foreground">
          Explora el stock de libros que actualmente están disponibles en el
          punto de intercambio.
        </p>

        {isDev && (
          <div className="mb-4 flex justify-end">
            <Button
              variant="outline"
              size="sm"
              onClick={handleSeed}
              disabled={seeding}
            >
              {seeding ? "Cargando..." : "Cargar libros de prueba"}
            </Button>
          </div>
        )}

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
                    {book.genero}
                  </Badge>
                  <Badge
                    className={`text-xs ${getConditionColor(book.estado)}`}
                  >
                    {book.estado}
                  </Badge>
                </div>
                <h3 className="font-semibold text-card-foreground line-clamp-2">
                  {book.titulo}
                </h3>

                {swappingId === book.id ? (
                  <div className="mt-4 space-y-2">
                    <p className="text-xs text-muted-foreground">
                      ¿Por cuál libro se intercambió?
                    </p>
                    <div>
                      <Label className="text-xs">Género del nuevo libro</Label>
                      <Input
                        type="text"
                        value={swapGenre}
                        onChange={(e) => setSwapGenre(e.target.value)}
                        className="mt-1 h-8 text-xs"
                      />
                    </div>
                    <div>
                      <Label className="text-xs">Título del nuevo libro</Label>
                      <Input
                        type="text"
                        value={swapTitle}
                        onChange={(e) => setSwapTitle(e.target.value)}
                        className="mt-1 h-8 text-xs"
                      />
                    </div>
                    <div className="mt-2 flex justify-end gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={cancelSwap}
                        disabled={savingSwap}
                      >
                        Cancelar
                      </Button>
                      <Button
                        size="sm"
                        onClick={() => handleConfirmSwap(book)}
                        disabled={savingSwap}
                      >
                        {savingSwap ? "Guardando..." : "Guardar intercambio"}
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="mt-4 flex justify-end">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => startSwap(book)}
                    >
                      Marcar como intercambiado
                    </Button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {swappedBooks.length > 0 && (
          <div className="mt-12 border-t pt-8">
            <h3 className="mb-3 text-2xl font-semibold text-foreground">
              Libros intercambiados (no disponibles)
            </h3>
            <p className="mb-4 text-sm text-muted-foreground">
              Estos libros ya fueron intercambiados y se muestran solo como
              historial.
            </p>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {swappedBooks.map((book) => (
                <div
                  key={book.id}
                  className="rounded-lg border bg-card p-5 shadow-sm opacity-70"
                >
                  <div className="mb-3 flex items-start justify-between">
                    <Badge variant="outline" className="text-xs">
                      {book.genero}
                    </Badge>
                    <Badge
                      className={`text-xs ${getConditionColor(book.estado)}`}
                    >
                      {book.estado}
                    </Badge>
                  </div>
                  <h3 className="font-semibold text-card-foreground line-clamp-2">
                    {book.titulo}
                  </h3>
                  <div className="mt-3">
                    <Badge className="text-[10px] bg-destructive text-destructive-foreground">
                      No disponible
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
