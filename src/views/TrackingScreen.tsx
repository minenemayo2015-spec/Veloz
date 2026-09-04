import React, { useState } from 'react';
import { ScreenId } from '../types';
import { ASSETS } from '../data/shipments';

interface TrackingScreenProps {
  onNavigate: (screen: ScreenId) => void;
  onOpenChat: () => void;
  onShowToast: (message: string) => void;
}

export const TrackingScreen: React.FC<TrackingScreenProps> = ({
  onNavigate,
  onOpenChat,
  onShowToast,
}) => {
  const [isTimelineCollapsed, setIsTimelineCollapsed] = useState(false);
  const [mapZoom, setMapZoom] = useState<'normal' | 'zoomed'>('normal');
  const [copiedPin, setCopiedPin] = useState(false);
  const [showSupportModal, setShowSupportModal] = useState(false);

  const handleCopyPin = () => {
    navigator.clipboard?.writeText('8492');
    setCopiedPin(true);
    onShowToast('¡Código PIN 8492 copiado al portapapeles!');
    setTimeout(() => setCopiedPin(false), 2500);
  };

  return (
    <div className="flex flex-col w-full relative max-w-xl mx-auto">
      {/* Top Tracking Bar & Status Overlay */}
      <div className="px-space-md pt-space-xs pb-space-sm flex flex-col gap-space-xs z-20">
        <div className="flex items-center justify-between gap-space-xs">
          <button
            onClick={() => onNavigate('inicio')}
            aria-label="Volver atrás"
            className="w-10 h-10 rounded-full bg-surface-container-lowest shadow-md flex items-center justify-center text-on-surface hover:bg-surface-container transition-colors active:scale-95 cursor-pointer"
          >
            <span className="material-symbols-outlined text-headline-sm">arrow_back</span>
          </button>

          <div className="flex-1 flex items-center justify-center">
            <div className="bg-surface-container-lowest/95 shadow-md px-space-md py-space-xs rounded-full flex items-center gap-space-xs border border-surface-container/60">
              <span className="font-label-sm text-label-sm text-primary font-bold">#VX-94821</span>
              <span className="w-1 h-1 rounded-full bg-outline-variant"></span>
              <div className="flex items-center gap-1.5">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                </span>
                <span className="font-label-sm text-label-sm text-on-surface font-bold">
                  En Reparto • 18 min
                </span>
              </div>
            </div>
          </div>

          <button
            onClick={() => setShowSupportModal(true)}
            aria-label="Ayuda y Soporte"
            className="w-10 h-10 rounded-full bg-surface-container-lowest shadow-md flex items-center justify-center text-on-surface-variant hover:text-on-surface transition-colors active:scale-95 cursor-pointer"
          >
            <span className="material-symbols-outlined text-headline-sm">support_agent</span>
          </button>
        </div>

        {/* Distance & Stop indicator banner */}
        <div className="self-center bg-surface-container-highest/90 backdrop-blur-md px-space-md py-1 rounded-full flex items-center gap-space-xs shadow-sm">
          <span
            className="material-symbols-outlined text-label-md text-primary"
            style={{ fontVariationSettings: "'FILL' 1" }}
          >
            near_me
          </span>
          <span className="font-label-sm text-label-sm text-on-surface font-semibold">
            1.8 km restantes • 3 paradas previas
          </span>
        </div>
      </div>

      {/* Interactive Stylized Live Map Canvas */}
      <div className="relative w-full h-[330px] overflow-hidden bg-surface-container-low select-none rounded-2xl shadow-inner mx-0 border-y border-surface-container">
        {/* Stylized Vector Map Background (Streets & Blocks) */}
        <svg
          className={`absolute inset-0 w-full h-full text-surface-dim transition-transform duration-500 ${
            mapZoom === 'zoomed' ? 'scale-125' : 'scale-100'
          }`}
          preserveAspectRatio="xMidYMid slice"
          viewBox="0 0 400 320"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <pattern height="80" id="streetGrid" patternUnits="userSpaceOnUse" width="80">
              <rect fill="#eff4ff" height="80" width="80" />
              <rect fill="#e5eeff" height="72" opacity="0.75" rx="8" width="72" x="0" y="0" />
            </pattern>
            <filter height="140%" id="glow" width="140%" x="-20%" y="-20%">
              <feDropShadow
                dx="0"
                dy="2"
                floodColor="#a33900"
                floodOpacity="0.4"
                stdDeviation="3"
              />
            </filter>
          </defs>

          {/* District layout */}
          <rect fill="url(#streetGrid)" height="100%" width="100%" />

          {/* Major thoroughfares */}
          <path
            d="M-20,160 L420,150"
            fill="none"
            stroke="#d3e4fe"
            strokeLinecap="round"
            strokeWidth="16"
          />
          <path
            d="M120,-20 L130,340"
            fill="none"
            stroke="#d3e4fe"
            strokeLinecap="round"
            strokeWidth="14"
          />
          <path
            d="M280,-20 L270,340"
            fill="none"
            stroke="#d3e4fe"
            strokeLinecap="round"
            strokeWidth="18"
          />

          {/* Transit route track with gradient aesthetic */}
          {/* Path already traveled */}
          <path
            d="M 40,80 Q 90,95 125,155 T 180,180"
            fill="none"
            stroke="#ffb599"
            strokeDasharray="6,4"
            strokeLinecap="round"
            strokeWidth="5"
          />

          {/* Active route line to destination */}
          <path
            d="M 180,180 Q 220,195 260,160 T 320,105"
            fill="none"
            filter="url(#glow)"
            id="routePath"
            stroke="#a33900"
            strokeLinecap="round"
            strokeWidth="5"
          />
        </svg>

        {/* Map Elements: Courier Marker with Radar Pulse */}
        <div
          onClick={() => {
            onShowToast('Mateo se encuentra a 1.8 km en su ruta activa.');
          }}
          className="absolute left-[170px] top-[170px] -translate-x-1/2 -translate-y-1/2 flex items-center justify-center z-10 cursor-pointer group"
          title="Ver posición de Mateo Morales"
        >
          <div className="absolute w-14 h-14 rounded-full bg-primary/25 animate-ping pointer-events-none"></div>
          <div className="relative w-10 h-10 rounded-full bg-primary text-on-primary flex items-center justify-center shadow-lg shadow-primary/40 transform transition-transform group-hover:scale-110">
            <span
              className="material-symbols-outlined text-headline-sm -rotate-45"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              two_wheeler
            </span>
          </div>
          <div className="absolute -bottom-6 bg-inverse-surface text-inverse-on-surface px-2 py-0.5 rounded text-[10px] font-label-sm whitespace-nowrap shadow-sm font-semibold">
            Mateo • En moto
          </div>
        </div>

        {/* Map Elements: Destination Pin (Home) */}
        <div className="absolute left-[320px] top-[105px] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center z-10 pointer-events-none">
          <div className="bg-surface-container-lowest text-on-surface px-2 py-0.5 rounded-full shadow-md text-label-sm font-bold flex items-center gap-1 mb-1">
            <span className="w-1.5 h-1.5 rounded-full bg-tertiary"></span>
            14:45
          </div>
          <div className="w-9 h-9 rounded-full bg-tertiary text-on-tertiary flex items-center justify-center shadow-lg shadow-tertiary/40">
            <span
              className="material-symbols-outlined text-body-lg"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              home
            </span>
          </div>
          <div className="w-2.5 h-1 rounded-full bg-on-surface/20 mt-0.5"></div>
        </div>

        {/* Map Control Buttons */}
        <div className="absolute bottom-3 right-space-md flex flex-col gap-1.5 z-10">
          <button
            onClick={() => onShowToast('Centrado en la ubicación actual de tu entrega.')}
            aria-label="Centrar en mi pedido"
            className="w-8 h-8 rounded-lg bg-surface-container-lowest shadow-md flex items-center justify-center text-on-surface hover:bg-surface-container transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-body-lg">my_location</span>
          </button>
          <button
            onClick={() => {
              setMapZoom(mapZoom === 'normal' ? 'zoomed' : 'normal');
              onShowToast(mapZoom === 'normal' ? 'Vista ampliada activada' : 'Vista estándar');
            }}
            aria-label="Ver ruta completa"
            className="w-8 h-8 rounded-lg bg-surface-container-lowest shadow-md flex items-center justify-center text-on-surface hover:bg-surface-container transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-body-lg">layers</span>
          </button>
        </div>
      </div>

      {/* Bottom Sheet / Package Status Details */}
      <div className="px-space-md -mt-4 z-20 flex flex-col gap-space-md pb-space-lg">
        <div className="bg-surface-container-lowest rounded-3xl shadow-xl p-space-lg flex flex-col gap-space-md border border-surface-container/60">
          {/* Pull Bar Indicator */}
          <div className="w-10 h-1 rounded-full bg-secondary-fixed-dim self-center -mt-1"></div>

          {/* Live Delivery Progress Headline */}
          <div className="flex items-start justify-between gap-space-xs">
            <div>
              <span className="font-label-sm text-label-sm text-primary uppercase tracking-wider font-bold">
                Entrega en camino
              </span>
              <h2 className="font-headline-sm text-headline-sm text-on-surface mt-0.5 font-bold">
                Tu pedido está a 4 cuadras
              </h2>
              <p className="font-body-sm text-body-sm text-secondary mt-0.5">
                Llegada estimada hoy entre 14:40 - 14:50
              </p>
            </div>
            <div className="w-12 h-12 rounded-xl bg-primary-fixed flex items-center justify-center text-primary shrink-0 shadow-sm">
              <span
                className="material-symbols-outlined text-headline-md"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                local_shipping
              </span>
            </div>
          </div>

          {/* Secure Verification Delivery PIN */}
          <div className="bg-surface-container-low rounded-2xl p-space-sm flex items-center justify-between gap-space-sm border border-surface-container">
            <div className="flex flex-col">
              <span className="font-label-sm text-label-sm text-secondary font-bold tracking-wider">
                CÓDIGO PIN DE RECEPCIÓN
              </span>
              <span className="font-body-sm text-body-sm text-secondary">
                Muestra este código al repartidor
              </span>
            </div>
            <div className="flex items-center gap-1.5 bg-surface-container-lowest px-space-sm py-1.5 rounded-xl shadow-sm border border-surface-container">
              <span className="font-headline-sm text-headline-sm text-primary font-bold tracking-widest">
                8 4 9 2
              </span>
              <button
                onClick={handleCopyPin}
                className="text-secondary hover:text-primary transition-colors ml-1 p-1 rounded-md hover:bg-surface-container cursor-pointer"
                title="Copiar código PIN"
              >
                <span className="material-symbols-outlined text-body-md">
                  {copiedPin ? 'check' : 'content_copy'}
                </span>
              </button>
            </div>
          </div>

          {/* Courier Profile Card */}
          <div className="bg-surface-container rounded-2xl p-space-sm flex items-center justify-between gap-space-xs">
            <div className="flex items-center gap-space-sm min-w-0">
              <div className="relative w-12 h-12 rounded-full overflow-hidden shrink-0 shadow-sm ring-2 ring-surface">
                <img
                  className="w-full h-full object-cover"
                  src={ASSETS.courierMateo}
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = ASSETS.courierMateoRemote;
                  }}
                  alt="Mateo Morales"
                />
                <span className="absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full bg-tertiary border-2 border-surface-container-lowest"></span>
              </div>
              <div className="flex flex-col min-w-0">
                <div className="flex items-center gap-1">
                  <span className="font-label-lg text-label-lg text-on-surface truncate font-bold">
                    Mateo Morales
                  </span>
                  <span
                    className="material-symbols-outlined text-[15px] text-primary"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    verified
                  </span>
                </div>
                <div className="flex items-center gap-1 text-secondary">
                  <span
                    className="material-symbols-outlined text-[15px] text-primary"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    star
                  </span>
                  <span className="font-label-sm text-label-sm font-semibold text-on-surface">
                    4.9
                  </span>
                  <span className="font-body-sm text-body-sm text-secondary">(420 entregas)</span>
                </div>
                <span className="font-body-sm text-body-sm text-on-surface-variant truncate">
                  Honda Cargo Roja • 4821-VX
                </span>
              </div>
            </div>

            {/* Quick Contact Actions */}
            <div className="flex items-center gap-2 shrink-0">
              <a
                aria-label="Llamar a Mateo"
                className="w-10 h-10 rounded-full bg-tertiary-container text-on-tertiary-container flex items-center justify-center hover:opacity-90 active:scale-95 transition-all shadow-sm"
                href="tel:+51999888777"
                title="Llamar"
              >
                <span
                  className="material-symbols-outlined text-body-lg"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  phone
                </span>
              </a>
              <button
                onClick={onOpenChat}
                aria-label="Enviar mensaje a Mateo"
                className="w-10 h-10 rounded-full bg-primary text-on-primary flex items-center justify-center hover:bg-primary-container active:scale-95 transition-all shadow-sm cursor-pointer"
                title="Chatear con Mateo"
              >
                <span className="material-symbols-outlined text-body-lg">chat</span>
              </button>
            </div>
          </div>

          {/* Expandable Milestones / Timeline */}
          <div className="flex flex-col gap-space-xs pt-1">
            <button
              onClick={() => setIsTimelineCollapsed(!isTimelineCollapsed)}
              className="flex items-center justify-between text-on-surface font-label-md text-label-md py-1 w-full text-left group cursor-pointer"
              id="toggleTimelineBtn"
            >
              <span className="flex items-center gap-1.5 font-bold">
                <span className="material-symbols-outlined text-body-lg text-primary">route</span>
                Historial de ruta del paquete
              </span>
              <span
                className={`material-symbols-outlined text-secondary transition-transform duration-200 ${
                  isTimelineCollapsed ? '-rotate-90' : 'rotate-0'
                }`}
              >
                expand_more
              </span>
            </button>

            {/* Vertical Timeline List */}
            {!isTimelineCollapsed && (
              <div className="flex flex-col gap-0 pt-space-xs" id="timelineContent">
                {/* Step 1: Delivered (Future) */}
                <div className="flex gap-space-sm pb-space-sm relative">
                  <div className="flex flex-col items-center">
                    <div className="w-6 h-6 rounded-full bg-surface-container flex items-center justify-center text-secondary z-10">
                      <span className="material-symbols-outlined text-[14px]">flag</span>
                    </div>
                    <div className="w-0.5 flex-1 bg-surface-container mt-1"></div>
                  </div>
                  <div className="flex flex-col pb-1">
                    <div className="flex items-baseline gap-2">
                      <span className="font-label-md text-label-md text-secondary font-semibold">
                        14:45
                      </span>
                      <span className="font-label-sm text-label-sm text-secondary">(Estimado)</span>
                    </div>
                    <p className="font-body-md text-body-md text-secondary">
                      Entrega en domicilio del destinatario
                    </p>
                  </div>
                </div>

                {/* Step 2: Active Courier in transit */}
                <div className="flex gap-space-sm pb-space-sm relative">
                  <div className="flex flex-col items-center">
                    <div className="w-6 h-6 rounded-full bg-primary text-on-primary flex items-center justify-center z-10 ring-4 ring-primary-fixed">
                      <span className="w-2 h-2 rounded-full bg-surface-container-lowest animate-ping"></span>
                    </div>
                    <div className="w-0.5 flex-1 bg-tertiary mt-1"></div>
                  </div>
                  <div className="flex flex-col pb-1">
                    <div className="flex items-baseline gap-2">
                      <span className="font-label-md text-label-md text-primary font-bold">
                        14:15
                      </span>
                      <span className="bg-primary-fixed text-on-primary-fixed-variant text-[10px] font-label-sm px-1.5 py-0.5 rounded font-bold">
                        EN CURSO
                      </span>
                    </div>
                    <p className="font-body-md text-body-md text-on-surface font-medium">
                      Mensajero en camino hacia tu dirección
                    </p>
                    <span className="font-body-sm text-body-sm text-secondary">
                      Asignado a Mateo Morales
                    </span>
                  </div>
                </div>

                {/* Step 3: Hub Processed */}
                <div className="flex gap-space-sm pb-space-sm relative">
                  <div className="flex flex-col items-center">
                    <div className="w-6 h-6 rounded-full bg-tertiary text-on-tertiary flex items-center justify-center z-10">
                      <span className="material-symbols-outlined text-[14px]">check</span>
                    </div>
                    <div className="w-0.5 flex-1 bg-tertiary mt-1"></div>
                  </div>
                  <div className="flex flex-col pb-1">
                    <span className="font-label-md text-label-md text-on-surface font-semibold">
                      13:10
                    </span>
                    <p className="font-body-md text-body-md text-on-surface">
                      Procesado en Centro Logístico Central
                    </p>
                    <span className="font-body-sm text-body-sm text-secondary">
                      Clasificación automatizada completa
                    </span>
                  </div>
                </div>

                {/* Step 4: Picked up */}
                <div className="flex gap-space-sm relative">
                  <div className="flex flex-col items-center">
                    <div className="w-6 h-6 rounded-full bg-tertiary text-on-tertiary flex items-center justify-center z-10">
                      <span className="material-symbols-outlined text-[14px]">check</span>
                    </div>
                  </div>
                  <div className="flex flex-col">
                    <span className="font-label-md text-label-md text-on-surface font-semibold">
                      11:30
                    </span>
                    <p className="font-body-md text-body-md text-on-surface">
                      Paquete recolectado en almacén San Isidro
                    </p>
                    <span className="font-body-sm text-body-sm text-secondary">
                      Comprobante de despacho emitido
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Delivery Instructions Hint */}
          <div className="flex items-center gap-space-xs p-space-xs bg-surface-container-low rounded-xl text-secondary border border-surface-container">
            <span className="material-symbols-outlined text-headline-sm text-primary">
              notifications_active
            </span>
            <p className="font-body-sm text-body-sm text-on-surface">
              Te avisaremos con una alerta sonora cuando Mateo esté a 100 metros.
            </p>
          </div>
        </div>
      </div>

      {/* Support Modal */}
      {showSupportModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4 animate-in fade-in duration-150">
          <div className="w-full max-w-sm bg-surface-container-lowest rounded-2xl p-space-lg shadow-2xl flex flex-col gap-space-md">
            <div className="flex items-center justify-between pb-2 border-b border-surface-container-low">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">support_agent</span>
                <h3 className="font-headline-sm font-bold text-on-surface">Central de Ayuda</h3>
              </div>
              <button
                onClick={() => setShowSupportModal(false)}
                className="w-8 h-8 rounded-full bg-surface-container flex items-center justify-center text-secondary"
              >
                <span className="material-symbols-outlined text-sm">close</span>
              </button>
            </div>
            <p className="text-xs text-secondary">
              ¿Tienes algún inconveniente con el envío #VX-94821? Nuestro equipo de operaciones está activo 24/7.
            </p>
            <div className="flex flex-col gap-2">
              <a
                href="tel:+51180083569"
                className="py-2.5 px-3 rounded-xl bg-surface-container-low text-xs font-bold text-on-surface flex items-center justify-between hover:bg-surface-container"
              >
                <span className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-sm text-primary">call</span>
                  Línea Telefónica Directa
                </span>
                <span className="text-primary font-bold">0800-83569</span>
              </a>
              <button
                onClick={() => {
                  setShowSupportModal(false);
                  onOpenChat();
                }}
                className="py-2.5 px-3 rounded-xl bg-primary text-on-primary text-xs font-bold flex items-center justify-center gap-2"
              >
                <span className="material-symbols-outlined text-sm">chat</span>
                Chatear con el mensajero
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
