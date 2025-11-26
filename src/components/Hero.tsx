// src/components/Hero.tsx
import { Button } from "@/components/ui/button";
import campusImage from "@/assets/hero-espol.jpg";

interface HeroProps {
  onConfirmarClick: () => void;
  onRegistrarClick: () => void;
}

export const Hero = ({ onConfirmarClick, onRegistrarClick }: HeroProps) => {
  return (
    <section className="relative overflow-hidden bg-gradient-primary py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="grid gap-8 md:grid-cols-2 md:gap-12 items-center">
          <div className="text-white">
            <div className="inline-block mb-4 rounded-full bg-white/20 px-4 py-1.5 text-sm font-medium backdrop-blur-sm">
              Evento presencial | Entrada libre
            </div>
            <h1 className="mb-6 text-4xl font-bold leading-tight md:text-5xl lg:text-6xl">
              Intercambia tus libros en ESPOL y dales una segunda vida
            </h1>
            <p className="mb-8 text-lg text-white/90 md:text-xl">
              Elige tu hora, trae tus libros y descubre otros. 
              Registra tus intereses y ayuda a organizar mejor el trueque.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row">
              <Button
                onClick={onConfirmarClick}
                size="lg"
                className="bg-white text-primary hover:bg-white/90 font-semibold shadow-lg w-full sm:w-auto"
              >
                Confirmar asistencia
              </Button>
              <Button
                onClick={onRegistrarClick}
                size="lg"
                variant="outline"
                className="border-2 border-white bg-transparent text-white hover:bg-white hover:text-primary font-semibold w-full sm:w-auto"
              >
                Registrar mis intereses
              </Button>
            </div>
          </div>
          <div className="order-first md:order-last">
            <img
              src={campusImage}
              alt="Campus ESPOL"
              className="rounded-2xl shadow-2xl w-full h-auto"
            />
          </div>
        </div>
      </div>
    </section>
  );
};
