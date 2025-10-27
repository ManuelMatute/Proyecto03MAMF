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
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <h3 className="mb-1 text-lg font-semibold text-foreground">Viernes, 28 de Octubre</h3>
                <p className="text-muted-foreground">10:00 AM - 1:00 PM</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h3 className="mb-1 text-lg font-semibold text-foreground">Puntualidad</h3>
                <p className="text-muted-foreground">
                  Llega 5 minutos antes de tu bloque. Si llegas tarde, pasarás al final de la cola si hay espacio disponible.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <div>
                <h3 className="mb-1 text-lg font-semibold text-foreground">Plaza del Estudiante</h3>
                <p className="text-muted-foreground">
                  Campus Gustavo Galindo, ESPOL. Busca la mesa de intercambio junto a la cafetería central.
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-xl border bg-card p-6 shadow-md">
            <h3 className="mb-4 text-lg font-semibold text-card-foreground">Mapa de Ubicación</h3>
            <div className="flex h-64 items-center justify-center rounded-lg bg-muted">
              <div className="text-center text-muted-foreground">
                <svg className="mx-auto mb-2 h-16 w-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                </svg>
                <p className="text-sm">Mesa ubicada en Plaza del Estudiante</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
