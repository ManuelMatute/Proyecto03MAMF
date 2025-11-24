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
import { createBook, EstadoLibro } from "@/lib/books";

export interface Book {
  genre: string;
  title: string;
  condition: string;
}

export interface FormData {
  name: string;
  email: string;
  studentId: string;
  timeSlot: string;
  books: Book[];
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

  const genres = [
    "Literatura",
    "Ingeniería",
    "Matemáticas",
    "Ciencias",
    "Economía",
    "Idiomas",
    "Arte",
    "Otros",
  ];

  const conditions = ["Nuevo", "Bueno", "Aceptable"];

  const timeSlots = ["10:00–10:20", "10:20–10:40", "10:40–11:00", "11:00–11:20"];

  const addBook = () => {
    if (formData.books.length < 2) {
      setFormData({
        ...formData,
        books: [...formData.books, { genre: "", title: "", condition: "" }],
      });
    }
  };

  const removeBook = (index: number) => {
    setFormData({
      ...formData,
      books: formData.books.filter((_, i) => i !== index),
    });
  };

  const updateBook = (index: number, field: keyof Book, value: string) => {
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
      if (!book.genre) newErrors[`book${index}genre`] = "Selecciona un género";
      if (!book.title.trim())
        newErrors[`book${index}title`] = "El título es obligatorio";
      if (!book.condition)
        newErrors[`book${index}condition`] = "Selecciona un estado";
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

    setSubmitting(true);
    try {
      for (const book of formData.books) {
        if (book.genre && book.title && book.condition) {
          await createBook({
            genero: book.genre,
            titulo: book.title,
            estado: book.condition as EstadoLibro,
            estudianteNombre: formData.name,
            estudianteCorreo: formData.email,
            estudianteCodigo: formData.studentId,
            bloqueHorario: formData.timeSlot,
            aprobado: false, // se aprobará luego en recepción
          });
        }
      }

      onSubmit(formData);
      toast.success("Registro guardado correctamente ");
    } catch (error) {
      console.error("Error al registrar libros:", error);
      toast.error(
        "Ocurrió un error al registrar los libros. Intenta de nuevo."
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="py-16 md:py-20 bg-muted" id="registro">
      <div className="container mx-auto px-4 max-w-3xl">
        <h2 className="mb-3 text-center text-3xl font-bold md:text-4xl text-foreground">
          Regístrate y Pre-registra tus Libros
        </h2>
        <p className="mb-8 text-center text-muted-foreground">
          Completa el formulario para confirmar tu asistencia y pre-registrar
          los libros que llevarás. La disponibilidad se confirma el día del
          evento en la mesa.
        </p>

        <form
          onSubmit={handleSubmit}
          className="rounded-2xl bg-card p-6 shadow-lg md:p-8"
        >
          <div className="space-y-6">
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
                Código de Estudiante / Matrícula *
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
                Tu código solo lo ve el encargado; no se mostrará
                públicamente.
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

            <div className="border-t pt-6">
              <h3 className="mb-1 text-lg font-semibold text-foreground">
                Pre-registrar libros (opcional - máximo 2)
              </h3>
              <p className="mb-4 text-sm text-muted-foreground">
                Este registro es preliminar: los libros se revisan en la mesa y
                solo los aprobados entran al intercambio.
              </p>

              {formData.books.map((book, index) => (
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
                      <Label htmlFor={`genre${index}`}>Género *</Label>
                      <Select
                        value={book.genre}
                        onValueChange={(value) =>
                          updateBook(index, "genre", value)
                        }
                      >
                        <SelectTrigger
                          className={
                            errors[`book${index}genre`]
                              ? "border-destructive"
                              : ""
                          }
                        >
                          <SelectValue placeholder="Selecciona un género" />
                        </SelectTrigger>
                        <SelectContent>
                          {genres.map((genre) => (
                            <SelectItem key={genre} value={genre}>
                              {genre}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {errors[`book${index}genre`] && (
                        <p className="mt-1 text-sm text-destructive">
                          {errors[`book${index}genre`]}
                        </p>
                      )}
                    </div>

                    <div>
                      <Label htmlFor={`title${index}`}>Título *</Label>
                      <Input
                        id={`title${index}`}
                        type="text"
                        value={book.title}
                        onChange={(e) =>
                          updateBook(index, "title", e.target.value)
                        }
                        className={
                          errors[`book${index}title`]
                            ? "border-destructive"
                            : ""
                        }
                        placeholder="Nombre del libro"
                      />
                      {errors[`book${index}title`] && (
                        <p className="mt-1 text-sm text-destructive">
                          {errors[`book${index}title`]}
                        </p>
                      )}
                    </div>

                    <div>
                      <Label htmlFor={`condition${index}`}>Estado *</Label>
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
                        Se confirmará en el stand.
                      </p>
                      {errors[`book${index}condition`] && (
                        <p className="mt-1 text-sm text-destructive">
                          {errors[`book${index}condition`]}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              ))}

              {formData.books.length < 2 && (
                <Button
                  type="button"
                  variant="outline"
                  onClick={addBook}
                  className="w-full"
                >
                  + Añadir libro
                </Button>
              )}
            </div>

            <Button
              type="submit"
              className="w-full bg-gradient-primary text-lg font-semibold"
              size="lg"
              disabled={submitting}
            >
              {submitting ? "Registrando..." : "Generar Invitación y Registrar"}
            </Button>
          </div>
        </form>
      </div>
    </section>
  );
};
