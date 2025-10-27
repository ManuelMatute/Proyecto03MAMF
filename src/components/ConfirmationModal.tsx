import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { FormData } from "./RegistrationForm";
import { toast } from "sonner";

interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  formData: FormData;
}

export const ConfirmationModal = ({ isOpen, onClose, formData }: ConfirmationModalProps) => {
  const generateICS = () => {
    const event = {
      title: "Intercambio de Libros ESPOL",
      description: `Has confirmado tu asistencia al intercambio de libros. Bloque horario: ${formData.timeSlot}. ${formData.books.length > 0 ? `Libros registrados: ${formData.books.length}` : ''}`,
      location: "Plaza del Estudiante, Campus Gustavo Galindo, ESPOL",
      start: "2025-10-28T10:00:00",
      end: "2025-10-28T13:00:00",
    };

    const icsContent = [
      "BEGIN:VCALENDAR",
      "VERSION:2.0",
      "PRODID:-//Intercambio Libros ESPOL//ES",
      "BEGIN:VEVENT",
      `DTSTART:${event.start.replace(/[-:]/g, "")}`,
      `DTEND:${event.end.replace(/[-:]/g, "")}`,
      `SUMMARY:${event.title}`,
      `DESCRIPTION:${event.description}`,
      `LOCATION:${event.location}`,
      "END:VEVENT",
      "END:VCALENDAR",
    ].join("\n");

    const blob = new Blob([icsContent], { type: "text/calendar" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "intercambio-libros-espol.ics";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    toast.success("Evento descargado. Agrégalo a tu calendario.");
  };

  const copyWhatsAppMessage = () => {
    const date = "28 de octubre";
    const time = formData.timeSlot;
    const message = `¡Voy al intercambio de libros ESPOL el ${date} a las ${time}! 📚 ¿Te apuntas? Es en la Plaza del Estudiante.`;

    navigator.clipboard.writeText(message).then(() => {
      toast.success("Mensaje copiado. Pégalo en WhatsApp.");
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center text-2xl">¡Registro Confirmado!</DialogTitle>
        </DialogHeader>
        <div className="space-y-6 py-4">
          <div className="rounded-lg bg-success/10 p-4 text-center">
            <div className="mx-auto mb-3 flex h-16 w-16 items-center justify-center rounded-full bg-success text-success-foreground">
              <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <p className="font-semibold text-foreground">
              Listo, {formData.name.split(" ")[0]}!
            </p>
            <p className="mt-2 text-sm text-muted-foreground">
              Te esperamos el <strong>28 de octubre</strong> en el bloque <strong>{formData.timeSlot}</strong>
            </p>
          </div>

          <div className="space-y-2 rounded-lg border bg-card p-4">
            <h3 className="font-semibold text-card-foreground">Resumen de tu registro:</h3>
            <ul className="space-y-1 text-sm text-muted-foreground">
              <li>• Nombre: {formData.name}</li>
              <li>• Bloque: {formData.timeSlot}</li>
              <li>• Libros registrados: {formData.books.length}</li>
            </ul>
          </div>

          <div className="space-y-3">
            <Button onClick={generateICS} className="w-full" variant="outline">
              📅 Agregar a mi calendario (.ics)
            </Button>
            <Button onClick={copyWhatsAppMessage} className="w-full bg-gradient-warm">
              💬 Copiar invitación para WhatsApp
            </Button>
          </div>

          <Button onClick={onClose} className="w-full" variant="secondary">
            Cerrar
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
