export const LocationInfo = () => {
  return (
    <section className="py-16 md:py-20 bg-muted" id="ubicacion">
      <div className="container mx-auto px-4 max-w-5xl">
        <h2 className="mb-8 text-center text-3xl font-bold md:text-4xl text-foreground">
          Fecha y Ubicación
        </h2>

        <div className="grid gap-8 md:grid-cols-2">
          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
                <svg
                  className="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <div>
                <h3 className="mb-1 text-lg font-semibold text-foreground">
                  Viernes, 28 de Octubre
                </h3>
                <p className="text-muted-foreground">10:00 AM - 1:00 PM</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
                <svg
                  className="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <div>
                <h3 className="mb-1 text-lg font-semibold text-foreground">
                  Puntualidad
                </h3>
                <p className="text-muted-foreground">
                  Llega 5 minutos antes de tu bloque. Si llegas tarde, pasarás
                  al final de la cola si hay espacio disponible.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
                <svg
                  className="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              </div>
              <div>
                <h3 className="mb-1 text-lg font-semibold text-foreground">
                  Ubicación
                </h3>
                <p className="text-muted-foreground">
                  Campus Gustavo Galindo, biblioteca central.
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-xl border bg-card p-6 shadow-md">
            <h3 className="mb-4 text-lg font-semibold text-card-foreground">
              Mapa de Ubicación
            </h3>
            <div className="h-64 rounded-lg overflow-hidden">
              <iframe
                title="Ubicación Biblioteca Central ESPOL"
                src="https://www.google.com/maps?q=Biblioteca+Central+ESPOL+Guayaquil&output=embed"
                className="h-full w-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
            <p className="mt-2 text-xs text-muted-foreground">
              Referencia: zona de la Biblioteca Central de ESPOL, en el Campus
              Gustavo Galindo.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

