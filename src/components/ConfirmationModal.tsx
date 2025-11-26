import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { FormData } from "./RegistrationForm";

interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  formData: FormData;
}

export const ConfirmationModal = ({
  isOpen,
  onClose,
  formData,
}: ConfirmationModalProps) => {
  const firstName = formData.name.trim().split(" ")[0] || formData.name;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center text-2xl">
            ¡Registro guardado!
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-6 py-4">
          <div className="rounded-lg bg-success/10 p-4 text-center">
            <div className="mx-auto mb-3 flex h-16 w-16 items-center justify-center rounded-full bg-success text-success-foreground">
              <svg
                className="h-8 w-8"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <p className="font-semibold text-foreground">
              Listo, {firstName}!
            </p>
            <p className="mt-2 text-sm text-muted-foreground">
              Te esperamos el <strong>28 de octubre</strong> en el bloque{" "}
              <strong>{formData.timeSlot}</strong>.
            </p>
            <p className="mt-1 text-xs text-muted-foreground">
              Registramos tu asistencia y los <strong>libros de interés</strong>{" "}
              que te gustaría encontrar en el intercambio.
            </p>
          </div>

          <div className="space-y-2 rounded-lg border bg-card p-4">
            <h3 className="font-semibold text-card-foreground">
              Resumen de tu registro:
            </h3>
            <ul className="space-y-1 text-sm text-muted-foreground">
              <li>• Nombre: {formData.name}</li>
              <li>• Bloque: {formData.timeSlot}</li>
              <li>• Libros de interés indicados: {formData.books.length}</li>
            </ul>
          </div>

          <Button onClick={onClose} className="w-full" variant="secondary">
            Cerrar
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
