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
import { useBooks } from "@/hooks/use-books";
import { Book, approveBook, deleteBook } from "@/lib/books";
import { toast } from "sonner";

const ACTIVE_WINDOW_MS = 48 * 60 * 60 * 1000; // 48 horas

const getCreatedMs = (book: Book) => {
  const ts: any = book.createdAt;
  if (!ts || typeof ts.seconds !== "number") return null;
  return ts.seconds * 1000;
};

const getHoursToExpire = (book: Book) => {
  const createdMs = getCreatedMs(book);
  if (!createdMs) return null;
  const now = Date.now();
  const remaining = ACTIVE_WINDOW_MS - (now - createdMs);
  if (remaining <= 0) return 0;
  return Math.ceil(remaining / (60 * 60 * 1000));
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

export const AvailableBooks = () => {
  const { books: remoteBooks, loading } = useBooks();

  const [approvedBooks, setApprovedBooks] = useState<Book[]>([]);
  const [pendingBooks, setPendingBooks] = useState<Book[]>([]);
  const [filteredApproved, setFilteredApproved] = useState<Book[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("all");
  const [lastUpdate, setLastUpdate] = useState<Date | null>(null);
  const [approvingId, setApprovingId] = useState<string | null>(null);

  useEffect(() => {
    const now = Date.now();

    const activeBooks = remoteBooks.filter((b) => {
      const createdMs = getCreatedMs(b);
      if (!createdMs) return true;
      return now - createdMs < ACTIVE_WINDOW_MS;
    });

    const expiredBooks = remoteBooks.filter((b) => {
      if (b.aprobado) return false;
      const createdMs = getCreatedMs(b);
      if (!createdMs) return false;
      return now - createdMs >= ACTIVE_WINDOW_MS;
    });

    if (expiredBooks.length > 0) {
      expiredBooks.forEach((b) => {
        if (b.id) deleteBook(b.id);
      });
    }

    const approved = activeBooks.filter((b) => b.aprobado);
    const pending = activeBooks.filter((b) => !b.aprobado);

    setApprovedBooks(approved);
    setPendingBooks(pending);
    setLastUpdate(new Date());
  }, [remoteBooks]);

  const genres = [
    "all",
    ...Array.from(new Set(approvedBooks.map((b) => b.genero))),
  ];

  useEffect(() => {
    let filtered = approvedBooks;

    if (searchTerm) {
      filtered = filtered.filter((book) =>
        book.titulo.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedGenre !== "all") {
      filtered = filtered.filter((book) => book.genero === selectedGenre);
    }

    setFilteredApproved(filtered);
  }, [searchTerm, selectedGenre, approvedBooks]);

  const handleRefresh = () => {
    setLastUpdate(new Date());
  };

  const getMinutesAgo = () => {
    if (!lastUpdate) return "—";
    const now = new Date();
    const diff = Math.floor((now.getTime() - lastUpdate.getTime()) / 60000);
    return diff === 0 ? "hace un momento" : `hace ${diff} min`;
  };

  const handleApprove = async (book: Book) => {
    if (!book.id) return;
    setApprovingId(book.id);
    try {
      await approveBook(book.id);
      toast.success("Libro marcado como aprobado");
    } catch (e) {
      console.error(e);
      toast.error("No se pudo aprobar el libro");
    } finally {
      setApprovingId(null);
    }
  };

  return (
    <section className="py-16 md:py-20 bg-background" id="disponible">
      <div className="container mx-auto px-4 max-w-6xl">
        <h2 className="mb-3 text-center text-3xl font-bold md:text-4xl text-foreground">
          Libros del intercambio
        </h2>
        <p className="mb-8 text-center text-muted-foreground">
          Revisa los libros pre-registrados y los que ya están disponibles en el
          stand.
        </p>

        <div className="mb-10 grid gap-4 md:grid-cols-2">
          <div className="rounded-xl border bg-card p-4 shadow-sm">
            <p className="text-sm text-muted-foreground">
              Libros pre-registrados activos
            </p>
            <p className="mt-2 text-3xl font-bold text-card-foreground">
              {pendingBooks.length}
            </p>
          </div>
          <div className="rounded-xl border bg-card p-4 shadow-sm">
            <p className="text-sm text-muted-foreground">
              Libros aprobados en el stand
            </p>
            <p className="mt-2 text-3xl font-bold text-card-foreground">
              {approvedBooks.length}
            </p>
          </div>
        </div>

        {/* PRE-REGISTRADOS */}
        <div className="mb-12">
          <h3 className="mb-3 text-2xl font-semibold text-foreground">
            Libros pre-registrados (pendientes de revisión)
          </h3>
          <p className="mb-4 text-sm text-muted-foreground">
            Estos libros fueron registrados en la web y se revisarán en la mesa
            antes de entrar al intercambio. Los pre-registros tienen vigencia de
            48 horas.
          </p>

          {pendingBooks.length === 0 ? (
            <div className="py-6 text-sm text-muted-foreground">
              No hay libros pre-registrados activos en este momento.
            </div>
          ) : (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {pendingBooks.map((book) => {
                const hoursLeft = getHoursToExpire(book);
                return (
                  <div
                    key={book.id}
                    className="rounded-lg border bg-card p-5 shadow-sm"
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
                    <p className="mt-1 text-xs text-muted-foreground">
                      Registrado por: {book.estudianteNombre}{" "}
                      {book.estudianteCodigo
                        ? `(${book.estudianteCodigo})`
                        : ""}
                    </p>
                    <p className="mt-1 text-xs text-muted-foreground">
                      {hoursLeft === null
                        ? "Pre-registro reciente"
                        : hoursLeft === 0
                        ? "Expira muy pronto"
                        : `Expira en ${hoursLeft} h`}
                    </p>
                    <div className="mt-4 flex items-center justify-between">
                      <Badge className="text-[10px] bg-amber-500 text-white">
                        Pendiente de revisión
                      </Badge>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleApprove(book)}
                        disabled={approvingId === book.id}
                        className="text-xs"
                      >
                        {approvingId === book.id
                          ? "Aprobando..."
                          : "Marcar como aprobado"}
                      </Button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* DISPONIBLES */}
        <div className="border-t pt-10">
          <h3 className="mb-3 text-2xl font-semibold text-foreground">
            Disponible ahora
          </h3>
          <p className="mb-8 text-sm text-muted-foreground">
            Libros ya revisados y aprobados por el equipo, disponibles en el
            stand.
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

          <p className="mb-1 text-sm text-muted-foreground">
            Solo se muestran aquí los libros que ya fueron revisados en la mesa.
          </p>
          <p className="mb-4 text-sm text-muted-foreground">
            Última actualización: {getMinutesAgo()}
          </p>

          {loading ? (
            <div className="py-12 text-center">
              <p className="text-muted-foreground">Cargando libros...</p>
            </div>
          ) : filteredApproved.length === 0 ? (
            <div className="py-12 text-center">
              <p className="text-muted-foreground">
                No se encontraron libros con estos criterios.
              </p>
            </div>
          ) : (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {filteredApproved.map((book) => (
                <div
                  key={book.id}
                  className="rounded-lg border bg-card p-5 shadow-sm transition-shadow hover-shadow-md"
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
                    <Badge className="text-[10px] bg-success text-success-foreground">
                      Aprobado en recepción
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
