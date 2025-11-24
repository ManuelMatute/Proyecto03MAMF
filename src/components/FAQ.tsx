import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export const FAQ = () => {
  const faqs = [
    {
      question: "¿Puedo vender libros?",
      answer:
        "No, este es un evento de intercambio, no de venta. El objetivo es dar una segunda vida a los libros mediante el trueque.",
    },
    {
      question: "¿Puedo ir sin pre-registrar libros?",
      answer:
        "Sí, puedes asistir sin pre-registrar libros en la web. Sin embargo, el pre-registro nos ayuda a organizar mejor los bloques y a saber qué tipo de libros llegarán.",
    },
    {
      question:
        "¿Mi libro aparece automáticamente en la lista de 'Disponible ahora'?",
      answer:
        "No. Primero debes entregar el libro en la mesa el día del evento. El equipo revisa su estado y solo los libros aprobados se muestran como 'Disponibles' en la web.",
    },
    {
      question: "¿Para qué sirve pre-registrar mis libros?",
      answer:
        "El pre-registro permite estimar cuántos libros llegarán por bloque, reducir tiempos de espera y mostrar con anticipación el tipo de títulos que podrían estar en el intercambio.",
    },
    {
      question: "¿Qué tipo de libros puedo llevar?",
      answer:
        "Cualquier libro en buenas condiciones: académicos, literatura, técnicos, idiomas, etc. Deben estar limpios, legibles y sin fotocopias.",
    },
  ];

  return (
    <section className="py-16 md:py-20 bg-muted" id="faq">
      <div className="container mx-auto px-4 max-w-3xl">
        <h2 className="mb-8 text-center text-3xl font-bold md:text-4xl text-foreground">
          Preguntas Frecuentes
        </h2>
        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger className="text-left font-semibold">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
};
