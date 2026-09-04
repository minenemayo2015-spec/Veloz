import React, { useState } from 'react';
import { ScreenId } from '../types';

interface HomeScreenProps {
  onNavigate: (screen: ScreenId) => void;
  onOpenChat: () => void;
  onQuickTrack: (code: string) => void;
  onOpenInstallModal?: () => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({
  onNavigate,
  onOpenChat,
  onQuickTrack,
  onOpenInstallModal,
}) => {
  const [trackQuery, setTrackQuery] = useState('');
  const [showTarifarioModal, setShowTarifarioModal] = useState(false);

  const handleTrackSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (trackQuery.trim()) {
      onQuickTrack(trackQuery.trim());
    } else {
      onNavigate('rastreo');
    }
  };

  const handleScanClick = () => {
    setTrackQuery('VX-94821');
    setTimeout(() => {
      onQuickTrack('VX-94821');
    }, 400);
  };

  return (
    <div className="flex flex-col w-full max-w-md mx-auto">
      {/* Saludo y Bienvenida */}
      <section className="px-space-md pt-space-md pb-space-xs">
        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <h1 className="font-headline-md text-headline-md text-on-surface font-bold">
              ¡Hola, Carlos! 👋
            </h1>
            <span className="font-body-md text-body-md text-secondary mt-space-2xs">
              Rastrea o gestiona tus paquetes hoy
            </span>
          </div>
          <div className="w-10 h-10 rounded-full bg-secondary-container flex items-center justify-center text-on-secondary-fixed shadow-sm">
            <span
              className="material-symbols-outlined text-lg"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              local_shipping
            </span>
          </div>
        </div>
      </section>

      {/* Buscador y Escáner Rápido */}
      <section className="px-space-md py-space-xs">
        <form
          onSubmit={handleTrackSubmit}
          className="bg-surface-container-lowest rounded-xl shadow-[0_1px_3px_0_rgba(15,23,42,0.06)] p-space-xs flex items-center gap-space-xs border border-surface-container/50"
        >
          <span className="material-symbols-outlined text-secondary ml-space-xs text-[20px]">
            search
          </span>
          <input
            className="w-full bg-transparent font-body-md text-body-md text-on-surface placeholder:text-secondary focus:outline-none"
            id="quick-track-input"
            placeholder="Ingresa número de guía (ej. VX-89240)"
            type="text"
            value={trackQuery}
            onChange={(e) => setTrackQuery(e.target.value)}
          />
          <button
            className="w-10 h-10 rounded-lg bg-surface-container-low hover:bg-surface-container text-primary flex items-center justify-center transition-transform active:scale-95 shrink-0 cursor-pointer"
            id="btn-scan"
            title="Escanear código de barras o QR"
            type="button"
            onClick={handleScanClick}
          >
            <span className="material-symbols-outlined text-[20px]">qr_code_scanner</span>
          </button>
        </form>
      </section>

      {/* Instalar App / Exportar APK Banner */}
      {onOpenInstallModal && (
        <section className="px-space-md py-space-2xs">
          <div className="bg-surface-container-lowest rounded-2xl p-space-sm border border-primary/25 shadow-sm flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-primary-fixed flex items-center justify-center text-primary shrink-0 shadow-sm">
                <span className="material-symbols-outlined text-2xl">install_mobile</span>
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-1.5">
                  <span className="font-label-md font-bold text-on-surface">
                    Instalar en tu Teléfono
                  </span>
                  <span className="px-1.5 py-0.2 bg-primary text-on-primary text-[10px] font-bold rounded-md">
                    APK / PWA
                  </span>
                </div>
                <span className="text-xs text-secondary leading-tight">
                  Instala en Android en 1 clic o genera tu archivo APK
                </span>
              </div>
            </div>
            <button
              onClick={onOpenInstallModal}
              className="px-3 py-2 bg-primary hover:bg-primary-container text-on-primary text-xs font-bold rounded-xl shadow-sm transition-all active:scale-95 shrink-0 flex items-center gap-1 cursor-pointer"
            >
              <span>Instalar</span>
              <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </button>
          </div>
        </section>
      )}

      {/* Acciones Destacadas Banner */}
      <section className="px-space-md py-space-xs">
        <div className="bg-gradient-to-br from-primary via-primary-container to-primary text-on-primary rounded-2xl p-space-lg shadow-[0_10px_15px_-3px_rgba(163,57,0,0.25)] relative overflow-hidden">
          <div className="absolute -right-6 -bottom-6 w-32 h-32 bg-white/10 rounded-full blur-xl pointer-events-none"></div>
          <div className="relative z-10 flex flex-col gap-space-sm">
            <div className="flex items-center gap-space-xs">
              <span className="font-label-sm text-label-sm uppercase tracking-wider bg-white/20 px-space-xs py-0.5 rounded-full text-white font-bold">
                Velocidad Prioritaria
              </span>
              <span className="inline-block w-2 h-2 rounded-full bg-tertiary-fixed animate-pulse"></span>
            </div>
            <div className="flex flex-col">
              <h2 className="font-headline-sm text-headline-sm font-bold text-white">
                ¿Necesitas enviar ahora?
              </h2>
              <span className="font-body-sm text-body-sm text-primary-fixed">
                Tarifas preferenciales con recogida a domicilio inmediata.
              </span>
            </div>
            <div className="flex items-center gap-space-xs pt-space-xs">
              <button
                onClick={() => onNavigate('nuevo-envio')}
                className="flex-1 bg-surface-container-lowest text-primary hover:bg-primary-fixed transition-colors font-label-md text-label-md py-2.5 px-space-md rounded-xl flex items-center justify-center gap-space-2xs shadow-sm font-bold active:scale-[0.98] cursor-pointer"
              >
                <span className="material-symbols-outlined text-base">outgoing_mail</span>
                <span>Crear nuevo envío</span>
              </button>
              <button
                onClick={() => setShowTarifarioModal(true)}
                className="bg-white/15 hover:bg-white/25 text-white transition-colors font-label-md text-label-md py-2.5 px-space-md rounded-xl flex items-center justify-center gap-space-2xs font-bold backdrop-blur-sm active:scale-[0.98] cursor-pointer"
              >
                <span className="material-symbols-outlined text-base">calculate</span>
                <span>Calcular tarifa</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Sección Envíos en curso */}
      <section className="px-space-md pt-space-md pb-space-xs">
        <div className="flex items-center justify-between mb-space-sm">
          <div className="flex items-center gap-space-xs">
            <h2 className="font-headline-sm text-headline-sm text-on-surface font-bold">
              Envíos en curso
            </h2>
            <span className="bg-secondary-container text-on-secondary-container font-label-sm text-label-sm px-2 py-0.5 rounded-full font-bold">
              2
            </span>
          </div>
          <button
            onClick={() => onNavigate('historial')}
            className="font-label-md text-label-md text-primary hover:underline font-bold flex items-center gap-0.5 cursor-pointer"
          >
            Ver todos
            <span className="material-symbols-outlined text-sm">arrow_forward</span>
          </button>
        </div>

        <div className="flex flex-col gap-space-md">
          {/* Tarjeta 1: En Ruta de Entrega (Principal) */}
          <article className="bg-surface-container-lowest rounded-2xl shadow-[0_4px_12px_rgba(15,23,42,0.06)] p-space-lg flex flex-col gap-space-md relative overflow-hidden transition-all hover:shadow-[0_8px_20px_rgba(15,23,42,0.09)] border border-surface-container/60">
            <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-primary"></div>

            {/* Header Tarjeta */}
            <div className="flex items-start justify-between gap-space-xs">
              <div className="flex flex-col">
                <div className="flex items-center gap-space-2xs">
                  <span className="font-label-sm text-label-sm uppercase tracking-wider text-secondary">
                    Guía
                  </span>
                  <span className="font-headline-sm text-headline-sm font-bold text-on-surface tracking-tight">
                    #VX-94821
                  </span>
                </div>
                <span className="font-body-md text-body-md font-semibold text-on-surface flex items-center gap-1.5 mt-0.5">
                  <span className="material-symbols-outlined text-base text-secondary">
                    laptop_mac
                  </span>
                  Laptop Dell XPS 15
                </span>
              </div>

              {/* Status Badge */}
              <span className="inline-flex items-center gap-1.5 bg-tertiary-fixed/40 text-on-tertiary-fixed-variant px-space-sm py-1 rounded-full font-label-sm text-label-sm font-bold">
                <span className="w-2 h-2 rounded-full bg-tertiary-container animate-ping inline-block"></span>
                En ruta de entrega
              </span>
            </div>

            {/* Stepper Visual de 4 Pasos */}
            <div className="flex flex-col gap-space-xs pt-space-2xs">
              <div className="relative flex items-center justify-between">
                <div className="absolute top-1/2 left-0 right-0 -translate-y-1/2 h-1 bg-surface-container z-0"></div>
                <div className="absolute top-1/2 left-0 w-3/4 -translate-y-1/2 h-1 bg-primary z-0"></div>

                {/* Paso 1: Recibido */}
                <div className="relative z-10 flex flex-col items-center">
                  <div className="w-6 h-6 rounded-full bg-tertiary text-on-tertiary flex items-center justify-center text-xs shadow-sm">
                    <span className="material-symbols-outlined text-sm font-bold">check</span>
                  </div>
                </div>

                {/* Paso 2: En camino */}
                <div className="relative z-10 flex flex-col items-center">
                  <div className="w-6 h-6 rounded-full bg-tertiary text-on-tertiary flex items-center justify-center text-xs shadow-sm">
                    <span className="material-symbols-outlined text-sm font-bold">check</span>
                  </div>
                </div>

                {/* Paso 3: En reparto (Activo) */}
                <div className="relative z-10 flex flex-col items-center">
                  <div className="w-7 h-7 rounded-full bg-primary text-on-primary flex items-center justify-center text-xs shadow-[0_0_0_4px_rgba(255,219,206,0.9)] animate-pulse">
                    <span className="material-symbols-outlined text-base">delivery_dining</span>
                  </div>
                </div>

                {/* Paso 4: Entregado */}
                <div className="relative z-10 flex flex-col items-center">
                  <div className="w-6 h-6 rounded-full bg-surface-container-high text-secondary flex items-center justify-center text-xs">
                    <span className="material-symbols-outlined text-xs">flag</span>
                  </div>
                </div>
              </div>

              <div className="flex justify-between font-label-sm text-label-sm text-secondary px-0.5 pt-1">
                <span className="text-tertiary font-semibold">Recibido</span>
                <span className="text-tertiary font-semibold">En camino</span>
                <span className="text-primary font-bold">En reparto</span>
                <span className="text-secondary/60">Entregado</span>
              </div>
            </div>

            {/* Info de Entrega & Courier */}
            <div className="bg-surface-container-low rounded-xl p-space-sm flex flex-col gap-space-xs">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-space-xs">
                  <span className="material-symbols-outlined text-primary text-base">
                    schedule
                  </span>
                  <span className="font-body-sm text-body-sm text-secondary">
                    Hora estimada de llegada:
                  </span>
                </div>
                <span className="font-label-md text-label-md font-bold text-on-surface">
                  Hoy, 14:30 - 15:15
                </span>
              </div>

              <div className="flex items-center justify-between pt-1">
                <div className="flex items-center gap-space-xs">
                  <div className="w-8 h-8 rounded-full bg-primary-fixed flex items-center justify-center text-on-primary-fixed">
                    <span className="material-symbols-outlined text-sm">two_wheeler</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="font-label-md text-label-md text-on-surface font-semibold">
                      Mateo Morales
                    </span>
                    <span className="font-body-sm text-body-sm text-secondary">
                      Repartidor en motocicleta
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-1.5">
                  <a
                    href="tel:+51999888777"
                    className="w-8 h-8 rounded-full bg-surface-container-lowest text-on-surface flex items-center justify-center shadow-sm hover:text-primary transition-colors"
                    title="Llamar"
                  >
                    <span className="material-symbols-outlined text-sm">call</span>
                  </a>
                  <button
                    onClick={onOpenChat}
                    className="w-8 h-8 rounded-full bg-surface-container-lowest text-on-surface flex items-center justify-center shadow-sm hover:text-primary transition-colors cursor-pointer"
                    title="Mensaje"
                  >
                    <span className="material-symbols-outlined text-sm">chat</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Botón Ver en mapa en vivo */}
            <button
              onClick={() => onNavigate('rastreo')}
              className="w-full bg-primary hover:bg-primary-container text-on-primary py-space-sm px-space-md rounded-xl font-label-md text-label-md font-bold flex items-center justify-center gap-space-xs shadow-[0_4px_14px_0_rgba(163,57,0,0.3)] transition-transform active:scale-[0.98] cursor-pointer"
            >
              <span className="material-symbols-outlined text-base">near_me</span>
              <span>Ver en mapa en vivo</span>
              <span className="material-symbols-outlined text-base">arrow_forward</span>
            </button>
          </article>

          {/* Tarjeta 2: En Clasificación */}
          <article className="bg-surface-container-lowest rounded-2xl shadow-[0_2px_8px_rgba(15,23,42,0.05)] p-space-lg flex flex-col gap-space-sm transition-all hover:shadow-[0_6px_16px_rgba(15,23,42,0.08)] border border-surface-container/60">
            {/* Header Tarjeta */}
            <div className="flex items-start justify-between gap-space-xs">
              <div className="flex flex-col">
                <div className="flex items-center gap-space-2xs">
                  <span className="font-label-sm text-label-sm uppercase tracking-wider text-secondary">
                    Guía
                  </span>
                  <span className="font-headline-sm text-headline-sm font-bold text-on-surface tracking-tight">
                    #VX-77302
                  </span>
                </div>
                <span className="font-body-md text-body-md font-semibold text-on-surface flex items-center gap-1.5 mt-0.5">
                  <span className="material-symbols-outlined text-base text-secondary">
                    description
                  </span>
                  Documentos notariales urgentes
                </span>
              </div>

              {/* Status Badge Ámbar */}
              <span className="inline-flex items-center gap-1.5 bg-primary-fixed text-on-primary-fixed px-space-sm py-1 rounded-full font-label-sm text-label-sm font-bold">
                <span className="w-2 h-2 rounded-full bg-primary inline-block"></span>
                En clasificación
              </span>
            </div>

            {/* Ruta Origen a Destino */}
            <div className="bg-surface-container-low rounded-xl p-space-sm flex items-center justify-between">
              <div className="flex items-center gap-space-xs">
                <span className="material-symbols-outlined text-secondary text-sm">trip_origin</span>
                <div className="flex flex-col">
                  <span className="font-label-sm text-label-sm text-secondary">Origen</span>
                  <span className="font-label-md text-label-md text-on-surface font-semibold">
                    Centro Financiero
                  </span>
                </div>
              </div>

              <div className="flex items-center text-secondary">
                <span className="material-symbols-outlined text-base">trending_flat</span>
              </div>

              <div className="flex items-center gap-space-xs">
                <span className="material-symbols-outlined text-primary text-sm">location_on</span>
                <div className="flex flex-col">
                  <span className="font-label-sm text-label-sm text-secondary">Destino</span>
                  <span className="font-label-md text-label-md text-on-surface font-semibold">
                    Miraflores
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between pt-1">
              <span className="font-body-sm text-body-sm text-secondary">
                Salida estimada: Hoy, 16:00
              </span>
              <button
                onClick={() => onNavigate('rastreo')}
                className="font-label-md text-label-md text-primary hover:underline font-bold flex items-center gap-1 cursor-pointer"
              >
                Detalles
                <span className="material-symbols-outlined text-xs">chevron_right</span>
              </button>
            </div>
          </article>
        </div>
      </section>

      {/* Servicios Rápidos */}
      <section className="px-space-md pt-space-md pb-space-lg">
        <div className="flex items-center justify-between mb-space-sm">
          <h2 className="font-headline-sm text-headline-sm text-on-surface font-bold">
            Servicios rápidos
          </h2>
          <span className="font-label-sm text-label-sm text-secondary">Gestión inmediata</span>
        </div>

        <div className="grid grid-cols-2 gap-space-sm">
          {/* Servicio 1 */}
          <button
            onClick={() => onNavigate('nuevo-envio')}
            className="bg-surface-container-lowest p-space-md rounded-2xl shadow-[0_2px_6px_rgba(15,23,42,0.04)] flex flex-col items-start gap-space-xs hover:bg-surface-container-low transition-all text-left group active:scale-[0.98] border border-surface-container/50 cursor-pointer"
          >
            <div className="w-11 h-11 rounded-xl bg-primary-fixed flex items-center justify-center text-primary group-hover:scale-105 transition-transform">
              <span
                className="material-symbols-outlined text-xl"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                bolt
              </span>
            </div>
            <div className="flex flex-col">
              <span className="font-label-lg text-label-lg text-on-surface font-bold">
                Express 60 min
              </span>
              <span className="font-body-sm text-body-sm text-secondary">Envíos ultra rápidos</span>
            </div>
          </button>

          {/* Servicio 2 */}
          <button
            onClick={() => onNavigate('nuevo-envio')}
            className="bg-surface-container-lowest p-space-md rounded-2xl shadow-[0_2px_6px_rgba(15,23,42,0.04)] flex flex-col items-start gap-space-xs hover:bg-surface-container-low transition-all text-left group active:scale-[0.98] border border-surface-container/50 cursor-pointer"
          >
            <div className="w-11 h-11 rounded-xl bg-secondary-container flex items-center justify-center text-secondary group-hover:scale-105 transition-transform">
              <span
                className="material-symbols-outlined text-xl"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                local_shipping
              </span>
            </div>
            <div className="flex flex-col">
              <span className="font-label-lg text-label-lg text-on-surface font-bold">Nacional</span>
              <span className="font-body-sm text-body-sm text-secondary">Toda la cobertura</span>
            </div>
          </button>

          {/* Servicio 3 */}
          <button
            onClick={() => onNavigate('nuevo-envio')}
            className="bg-surface-container-lowest p-space-md rounded-2xl shadow-[0_2px_6px_rgba(15,23,42,0.04)] flex flex-col items-start gap-space-xs hover:bg-surface-container-low transition-all text-left group active:scale-[0.98] border border-surface-container/50 cursor-pointer"
          >
            <div className="w-11 h-11 rounded-xl bg-tertiary-fixed flex items-center justify-center text-tertiary-container group-hover:scale-105 transition-transform">
              <span
                className="material-symbols-outlined text-xl"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                calendar_today
              </span>
            </div>
            <div className="flex flex-col">
              <span className="font-label-lg text-label-lg text-on-surface font-bold">
                Agendar recojo
              </span>
              <span className="font-body-sm text-body-sm text-secondary">A tu conveniencia</span>
            </div>
          </button>

          {/* Servicio 4 */}
          <button
            onClick={() => setShowTarifarioModal(true)}
            className="bg-surface-container-lowest p-space-md rounded-2xl shadow-[0_2px_6px_rgba(15,23,42,0.04)] flex flex-col items-start gap-space-xs hover:bg-surface-container-low transition-all text-left group active:scale-[0.98] border border-surface-container/50 cursor-pointer"
          >
            <div className="w-11 h-11 rounded-xl bg-surface-container-high flex items-center justify-center text-on-surface group-hover:scale-105 transition-transform">
              <span
                className="material-symbols-outlined text-xl"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                calculate
              </span>
            </div>
            <div className="flex flex-col">
              <span className="font-label-lg text-label-lg text-on-surface font-bold">
                Tarifario
              </span>
              <span className="font-body-sm text-body-sm text-secondary">Precios por zona</span>
            </div>
          </button>
        </div>
      </section>

      {/* Tarifario Modal */}
      {showTarifarioModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4 animate-in fade-in duration-150">
          <div className="w-full max-w-sm bg-surface-container-lowest rounded-2xl p-space-lg shadow-2xl flex flex-col gap-space-md">
            <div className="flex items-center justify-between pb-2 border-b border-surface-container-low">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">calculate</span>
                <h3 className="font-headline-sm font-bold text-on-surface">Tarifario de Zonas</h3>
              </div>
              <button
                onClick={() => setShowTarifarioModal(false)}
                className="w-8 h-8 rounded-full bg-surface-container flex items-center justify-center text-secondary"
              >
                <span className="material-symbols-outlined text-sm">close</span>
              </button>
            </div>
            <div className="flex flex-col gap-2 text-xs">
              <div className="flex justify-between p-2 rounded-lg bg-surface-container-low">
                <span className="font-medium text-on-surface">Zona 1 (San Isidro / Miraflores)</span>
                <span className="font-bold text-primary">Desde S/ 9.50</span>
              </div>
              <div className="flex justify-between p-2 rounded-lg bg-surface-container-low">
                <span className="font-medium text-on-surface">Zona 2 (Surco / San Borja / La Molina)</span>
                <span className="font-bold text-primary">Desde S/ 14.00</span>
              </div>
              <div className="flex justify-between p-2 rounded-lg bg-surface-container-low">
                <span className="font-medium text-on-surface">Zona 3 (Lima Norte / Lima Sur)</span>
                <span className="font-bold text-primary">Desde S/ 19.50</span>
              </div>
              <div className="flex justify-between p-2 rounded-lg bg-surface-container-low">
                <span className="font-medium text-on-surface">Envío Express Flash (&lt; 90 min)</span>
                <span className="font-bold text-tertiary">+ S/ 6.50 adicional</span>
              </div>
            </div>
            <button
              onClick={() => {
                setShowTarifarioModal(false);
                onNavigate('nuevo-envio');
              }}
              className="w-full py-2.5 rounded-xl bg-primary text-on-primary font-bold text-xs flex items-center justify-center gap-1 shadow-sm"
            >
              <span>Cotizar mi envío ahora</span>
              <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
