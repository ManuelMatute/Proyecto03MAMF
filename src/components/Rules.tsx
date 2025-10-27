export const Rules = () => {
  const rules = [
    "Trueque 1 libro ≈ 1 libro; ediciones muy recientes pueden valer 2.",
    "Sin fotocopias ni piratería.",
    "Libros limpios y legibles.",
    "Respeta tu bloque; si llegas tarde, pasas al final si hay espacio.",
    "Trato respetuoso en la mesa.",
  ];

  return (
    <section className="py-16 md:py-20 bg-background">
      <div className="container mx-auto px-4 max-w-4xl">
        <h2 className="mb-8 text-center text-3xl font-bold md:text-4xl text-foreground">
          Reglas Básicas
        </h2>
        <div className="rounded-2xl border bg-card p-8 shadow-lg">
          <ul className="space-y-4">
            {rules.map((rule, index) => (
              <li key={index} className="flex items-start gap-3">
                <div className="mt-1 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                  {index + 1}
                </div>
                <p className="text-card-foreground">{rule}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};
