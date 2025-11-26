// src/components/InterestStats.tsx
import { useInterests } from "@/hooks/use-interests";

export const InterestStats = () => {
  const { interests, loading } = useInterests();

  if (loading && interests.length === 0) {
    return (
      <section className="py-10 bg-background">
        <div className="container mx-auto px-4 max-w-5xl">
          <p className="text-sm text-muted-foreground">
            Cargando interés de la comunidad…
          </p>
        </div>
      </section>
    );
  }

  const totalInterests = interests.length;

  const uniqueStudents = new Set(
    interests.map(
      (i) => i.estudianteCodigo || i.estudianteCorreo || i.estudianteNombre
    )
  ).size;

  const genreCounts = new Map<string, number>();
  interests.forEach((i) => {
    const g = i.genero || "Sin género";
    genreCounts.set(g, (genreCounts.get(g) ?? 0) + 1);
  });

  let topGenre = "";
  let topGenreCount = 0;
  genreCounts.forEach((count, genre) => {
    if (count > topGenreCount) {
      topGenreCount = count;
      topGenre = genre;
    }
  });

  const genreEntries = Array.from(genreCounts.entries()).sort(
    (a, b) => b[1] - a[1]
  );

  return (
    <section className="py-16 md:py-20 bg-background">
      <div className="container mx-auto px-4 max-w-5xl">
        <h2 className="mb-6 text-center text-3xl font-bold md:text-4xl text-foreground">
          Interés de la comunidad
        </h2>

        <div className="mb-8 grid gap-4 md:grid-cols-3">
          <div className="rounded-xl border bg-card p-4 shadow-sm">
            <p className="text-sm text-muted-foreground">
              Solicitudes de interés
            </p>
            <p className="mt-2 text-3xl font-bold text-card-foreground">
              {totalInterests}
            </p>
          </div>
          <div className="rounded-xl border bg-card p-4 shadow-sm">
            <p className="text-sm text-muted-foreground">
              Estudiantes interesados
            </p>
            <p className="mt-2 text-3xl font-bold text-card-foreground">
              {uniqueStudents}
            </p>
          </div>
          <div className="rounded-xl border bg-card p-4 shadow-sm">
            <p className="text-sm text-muted-foreground">
              Género más solicitado
            </p>
            <p className="mt-2 text-lg font-semibold text-card-foreground">
              {topGenreCount > 0 ? topGenre : "—"}
            </p>
          </div>
        </div>

        <h3 className="mb-3 text-xl font-semibold text-foreground">
          Interés por género
        </h3>
        {genreEntries.length === 0 ? (
          <p className="text-sm text-muted-foreground">
            Aún no hay intereses registrados.
          </p>
        ) : (
          <div className="grid gap-3 md:grid-cols-2">
            {genreEntries.map(([genre, count]) => (
              <div
                key={genre}
                className="flex items-center justify-between rounded-lg border bg-card p-3 text-sm"
              >
                <span className="font-medium text-card-foreground">
                  {genre}
                </span>
                <span className="text-muted-foreground">
                  {count} solicitud{count !== 1 ? "es" : ""}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
