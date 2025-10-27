import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export const FAQ = () => {
  const faqs = [
    {
      question: "¿Puedo vender libros?",
      answer: "No, este es un evento de intercambio, no de venta. El objetivo es dar una segunda vida a los libros mediante el trueque.",
    },
    {
      question: "¿Puedo ir sin registrar libros?",
      answer: "Sí, puedes asistir sin registrar libros previamente. Sin embargo, registrarlos ayuda a ordenar mejor el evento y facilita el proceso de intercambio.",
    },
    {
      question: "¿Qué pasa si no encuentro nada que me interese?",
      answer: "Puedes dejar tu 'lista de deseos' con el encargado del stand. Si alguien trae un libro que buscas, te contactaremos.",
    },
    {
      question: "¿Qué tipo de libros puedo llevar?",
      answer: "Cualquier libro en buenas condiciones: académicos, literatura, técnicos, idiomas, etc. Deben estar limpios, legibles y sin fotocopias.",
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
