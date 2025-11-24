export const ComoFunciona = () => {
  const steps = [
    {
      number: "1",
      title: "Regístrate",
      description: "Confirma que vas y elige una hora aproximada.",
    },
    {
      number: "2",
      title: "Pre-registra tus libros",
      description:
        "Añade uno o dos libros con género, título y estado. Esto nos ayuda a organizar el intercambio.",
    },
    {
      number: "3",
      title: "Entrega en la mesa",
      description:
        "Lleva tus libros en tu bloque horario. El equipo revisa que cumplan las reglas.",
    },
    {
      number: "4",
      title: "Intercambia",
      description:
        "Una vez aprobados, tus libros se suman al stand y puedes elegir nuevos libros.",
    },
  ];

  return (
    <section className="py-16 md:py-20 bg-background" id="como-funciona">
      <div className="container mx-auto px-4 max-w-5xl">
        <h2 className="mb-12 text-center text-3xl font-bold md:text-4xl text-foreground">
          Cómo Funciona
        </h2>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
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

