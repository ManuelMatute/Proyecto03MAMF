// src/components/ComoFunciona.tsx
export const ComoFunciona = () => {
  const steps = [
    {
      number: "1",
      title: "Regístrate",
      description: "Confirma que vas y elige una hora aproximada.",
    },
    {
      number: "2",
      title: "Cuéntanos qué buscas",
      description:
        "Registra uno o dos libros que te gustaría encontrar, por género, título y estado.",
    },
    {
      number: "3",
      title: "Intercambia",
      description:
        "Llega 5 minutos antes. Los libros se revisan en la mesa y se van marcando como disponibles o intercambiados.",
    },
  ];

  return (
    <section className="py-16 md:py-20 bg-background" id="como-funciona">
      <div className="container mx-auto px-4 max-w-5xl">
        <h2 className="mb-12 text-center text-3xl font-bold md:text-4xl text-foreground">
          Cómo Funciona
        </h2>
        <div className="grid gap-8 md:grid-cols-3">
          {steps.map((step) => (
            <div key={step.number} className="text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-primary text-2xl font-bold text-white shadow-md">
                {step.number}
              </div>
              <h3 className="mb-2 text-xl font-semibold text-foreground">
                {step.title}
              </h3>
              <p className="text-muted-foreground">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
