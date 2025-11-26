import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { EstadoLibro, Book as StockBook } from "@/lib/books";
import { createInterest } from "@/lib/interests";
import { useBooks } from "@/hooks/use-books";

export interface InterestBook {
  bookId: string;
  condition: string;
}

export interface FormData {
  name: string;
  email: string;
  studentId: string;
  timeSlot: string;
  books: InterestBook[];
}

interface RegistrationFormProps {
  onSubmit: (data: FormData) => void;
}

export const RegistrationForm = ({ onSubmit }: RegistrationFormProps) => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    studentId: "",
    timeSlot: "",
    books: [],
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);

  const { books: stockBooks, loading: loadingStock } = useBooks();
  const availableBooks: StockBook[] = stockBooks.filter(
    (b) => b.disponible !== false
  );

  const conditions = ["Nuevo", "Bueno", "Aceptable"];

  const timeSlots = ["10:00–10:20", "10:20–10:40", "10:40–11:00", "11:00–11:20"];

  const addBook = () => {
    if (formData.books.length < 2) {
      setFormData({
        ...formData,
        books: [...formData.books, { bookId: "", condition: "" }],
      });
    }
  };

  const removeBook = (index: number) => {
    setFormData({
      ...formData,
      books: formData.books.filter((_, i) => i !== index),
    });
  };

  const updateBook = (
    index: number,
    field: keyof InterestBook,
    value: string
  ) => {
    const newBooks = [...formData.books];
    newBooks[index] = { ...newBooks[index], [field]: value };
    setFormData({ ...formData, books: newBooks });
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) newErrors.name = "El nombre es obligatorio";
    if (!formData.email.trim()) newErrors.email = "El correo es obligatorio";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
      newErrors.email = "Formato de correo inválido";
    if (!formData.studentId.trim())
      newErrors.studentId = "El código es obligatorio";
    if (!formData.timeSlot) newErrors.timeSlot = "Selecciona un horario";

    formData.books.forEach((book, index) => {
      if (!book.bookId)
        newErrors[`book${index}bookId`] = "Selecciona un libro del catálogo";
      if (!book.condition)
        newErrors[`book${index}condition`] = "Selecciona un estado preferido";
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) {
      toast.error("Por favor, completa todos los campos obligatorios");
      return;
    }

    if (availableBooks.length === 0) {
      toast.error(
        "No hay libros disponibles en el catálogo para registrar intereses."
      );
      return;
    }

    setSubmitting(true);
    try {
      for (const book of formData.books) {
        if (!book.bookId || !book.condition) continue;

        const baseBook = availableBooks.find((b) => b.id === book.bookId);
        if (!baseBook) continue;

        await createInterest({
          bookId: baseBook.id,
          genero: baseBook.genero,
          titulo: baseBook.titulo,
          estadoDeseado: book.condition as EstadoLibro,
          estudianteNombre: formData.name,
          estudianteCorreo: formData.email,
          estudianteCodigo: formData.studentId,
          bloqueHorario: formData.timeSlot,
        });
      }

      onSubmit(formData);
      toast.success("Registro de interés guardado correctamente");
    } catch (error) {
      console.error("Error al registrar intereses:", error);
      toast.error(
        "Ocurrió un error al registrar tus intereses. Intenta de nuevo."
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="py-16 md:py-20 bg-muted" id="registro">
      <div className="container mx-auto px-4 max-w-3xl">
        <h2 className="mb-3 text-center text-3xl font-bold md:text-4xl text-foreground">
          Regístrate y cuéntanos qué libro del catálogo te interesa
        </h2>
        <p className="mb-4 text-center text-muted-foreground">
          Confirma tu asistencia y selecciona, del catálogo actual, los libros
          que más te gustaría intercambiar.
        </p>
        {loadingStock && (
          <p className="mb-4 text-center text-xs text-muted-foreground">
            Cargando catálogo de libros disponibles…
          </p>
        )}

        <form
          onSubmit={handleSubmit}
          className="rounded-2xl bg-card p-6 shadow-lg md:p-8"
        >
          <div className="space-y-6">
            {/* datos personales */}
            <div>
              <Label htmlFor="name">Nombre y Apellido *</Label>
              <Input
                id="name"
                type="text"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className={errors.name ? "border-destructive" : ""}
                placeholder="Ej: Juan Pérez"
              />
              {errors.name && (
                <p className="mt-1 text-sm text-destructive">{errors.name}</p>
              )}
            </div>

            <div>
              <Label htmlFor="email">Correo ESPOL *</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className={errors.email ? "border-destructive" : ""}
                placeholder="ejemplo@espol.edu.ec"
              />
              {errors.email && (
                <p className="mt-1 text-sm text-destructive">{errors.email}</p>
              )}
            </div>

            <div>
              <Label htmlFor="studentId">
                Matrícula *
              </Label>
              <Input
                id="studentId"
                type="text"
                value={formData.studentId}
                onChange={(e) =>
                  setFormData({ ...formData, studentId: e.target.value })
                }
                className={errors.studentId ? "border-destructive" : ""}
                placeholder="Ej: 202012345"
              />
              <p className="mt-1 text-xs text-muted-foreground">
                Tu código solo lo ve el encargado; no se mostrará públicamente.
              </p>
              {errors.studentId && (
                <p className="mt-1 text-sm text-destructive">
                  {errors.studentId}
                </p>
              )}
            </div>

            <div>
              <Label htmlFor="timeSlot">Bloque Horario *</Label>
              <Select
                value={formData.timeSlot}
                onValueChange={(value) =>
                  setFormData({ ...formData, timeSlot: value })
                }
              >
                <SelectTrigger
                  className={errors.timeSlot ? "border-destructive" : ""}
                >
                  <SelectValue placeholder="Selecciona un horario" />
                </SelectTrigger>
                <SelectContent>
                  {timeSlots.map((slot) => (
                    <SelectItem key={slot} value={slot}>
                      {slot}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.timeSlot && (
                <p className="mt-1 text-sm text-destructive">
                  {errors.timeSlot}
                </p>
              )}
            </div>

            {/* intereses */}
            <div className="border-t pt-6">
              <h3 className="mb-1 text-lg font-semibold text-foreground">
                Libros del catálogo que te interesan (máximo 2)
              </h3>
              <p className="mb-4 text-sm text-muted-foreground">
                Elige libros de la sección &quot;Libros disponibles&quot;. Esto
                nos ayuda a ver qué títulos generan más demanda.
              </p>

              {formData.books.map((book, index) => {
                const selectedBase = availableBooks.find(
                  (b) => b.id === book.bookId
                );

                return (
                  <div
                    key={index}
                    className="mb-6 rounded-lg border bg-accent/50 p-4"
                  >
                    <div className="mb-3 flex items-center justify-between">
                      <h4 className="font-medium text-accent-foreground">
                        Libro {index + 1}
                      </h4>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => removeBook(index)}
                        className="text-destructive hover:text-destructive"
                      >
                        Eliminar
                      </Button>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <Label>Libro disponible *</Label>
                        <Select
                          value={book.bookId}
                          onValueChange={(value) =>
                            updateBook(index, "bookId", value)
                          }
                        >
                          <SelectTrigger
                            className={
                              errors[`book${index}bookId`]
                                ? "border-destructive"
                                : ""
                            }
                          >
                            <SelectValue
                              placeholder={
                                availableBooks.length === 0
                                  ? "No hay libros en el catálogo aún"
                                  : "Selecciona un libro del catálogo"
                              }
                            />
                          </SelectTrigger>
                          <SelectContent>
                            {availableBooks.map((b) => (
                              <SelectItem key={b.id} value={b.id || ""}>
                                {b.titulo} — {b.genero}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        {errors[`book${index}bookId`] && (
                          <p className="mt-1 text-sm text-destructive">
                            {errors[`book${index}bookId`]}
                          </p>
                        )}
                        {selectedBase && (
                          <p className="mt-1 text-xs text-muted-foreground">
                            Género: {selectedBase.genero}
                          </p>
                        )}
                      </div>

                      <div>
                        <Label>Estado preferido *</Label>
                        <Select
                          value={book.condition}
                          onValueChange={(value) =>
                            updateBook(index, "condition", value)
                          }
                        >
                          <SelectTrigger
                            className={
                              errors[`book${index}condition`]
                                ? "border-destructive"
                                : ""
                            }
                          >
                            <SelectValue placeholder="Selecciona el estado" />
                          </SelectTrigger>
                          <SelectContent>
                            {conditions.map((condition) => (
                              <SelectItem key={condition} value={condition}>
                                {condition}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <p className="mt-1 text-xs text-muted-foreground">
                          Solo indica tu preferencia; en el intercambio real
                          puede variar un poco.
                        </p>
                        {errors[`book${index}condition`] && (
                          <p className="mt-1 text-sm text-destructive">
                            {errors[`book${index}condition`]}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}

              {formData.books.length < 2 && (
                <Button
                  type="button"
                  variant="outline"
                  onClick={addBook}
                  className="w-full"
                  disabled={availableBooks.length === 0}
                >
                  + Añadir libro de interés
                </Button>
              )}
            </div>

            <Button
              type="submit"
              className="w-full bg-gradient-primary text-lg font-semibold"
              size="lg"
              disabled={submitting}
            >
              {submitting ? "Registrando..." : "Generar invitación y registrar"}
            </Button>
          </div>
        </form>
      </div>
    </section>
  );
};
