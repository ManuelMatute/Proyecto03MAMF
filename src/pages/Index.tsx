import { useState, useRef } from "react";
import { Hero } from "@/components/Hero";
import { ComoFunciona } from "@/components/ComoFunciona";
import { RegistrationForm, FormData } from "@/components/RegistrationForm";
import { AvailableBooks } from "@/components/AvailableBooks";
import { LocationInfo } from "@/components/LocationInfo";
import { Rules } from "@/components/Rules";
import { FAQ } from "@/components/FAQ";
import { ConfirmationModal } from "@/components/ConfirmationModal";
import { InterestStats } from "@/components/InterestStats";

const Index = () => {
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [submittedData, setSubmittedData] = useState<FormData | null>(null);
  const registroRef = useRef<HTMLDivElement>(null);

  const scrollToRegistro = () => {
    registroRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleFormSubmit = (data: FormData) => {
    setSubmittedData(data);
    setShowConfirmation(true);
  };

  return (
    <div className="min-h-screen">
      <Hero
        onConfirmarClick={scrollToRegistro}
        onRegistrarClick={scrollToRegistro}
      />
      <ComoFunciona />
      <div ref={registroRef}>
        <RegistrationForm onSubmit={handleFormSubmit} />
      </div>
      <InterestStats />
      <AvailableBooks />
      <LocationInfo />
      <Rules />
      <FAQ />

      {submittedData && (
        <ConfirmationModal
          isOpen={showConfirmation}
          onClose={() => setShowConfirmation(false)}
          formData={submittedData}
        />
      )}

      <footer className="bg-primary py-8 text-center text-primary-foreground">
        <div className="container mx-auto px-4">
          <p className="text-sm">
            Intercambio de Libros ESPOL 2025 • Organizado por estudiantes para
            estudiantes
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
