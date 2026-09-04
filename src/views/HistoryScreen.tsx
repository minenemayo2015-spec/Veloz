import React, { useState, useMemo } from 'react';
import { ScreenId, ShipmentItem } from '../types';
import { INITIAL_SHIPMENTS, ASSETS } from '../data/shipments';

interface HistoryScreenProps {
  onNavigate: (screen: ScreenId) => void;
  onOpenReceipt: (shipmentId: string) => void;
  onShowToast: (message: string) => void;
}

type TabFilter = 'all' | 'delivered' | 'ongoing' | 'issues';

export const HistoryScreen: React.FC<HistoryScreenProps> = ({
  onNavigate,
  onOpenReceipt,
  onShowToast,
}) => {
  const [activeTab, setActiveTab] = useState<TabFilter>('delivered');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterDrawerOpen, setFilterDrawerOpen] = useState(false);

  // Filter logic
  const filteredShipments = useMemo(() => {
    return INITIAL_SHIPMENTS.filter((item) => {
      // Tab filter
      if (activeTab === 'delivered' && item.status !== 'entregado') return false;
      if (activeTab === 'ongoing' && item.status !== 'en_ruta' && item.status !== 'clasificacion') return false;
      if (activeTab === 'issues' && item.status !== 'incidencia') return false;

      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesId = item.id.toLowerCase().includes(q);
        const matchesTitle = item.title.toLowerCase().includes(q);
        const matchesRecipient = item.recipientName.toLowerCase().includes(q);
        if (!matchesId && !matchesTitle && !matchesRecipient) return false;
      }
      return true;
    });
  }, [activeTab, searchQuery]);

  const handleDownloadConsolidated = () => {
    onShowToast('Generando y descargando paquete consolidado ZIP con 24 facturas...');
  };

  return (
    <div className="flex flex-col w-full max-w-xl mx-auto">
      {/* Top Title & Search */}
      <div className="px-space-md pt-space-md pb-space-xs flex flex-col gap-space-sm">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-headline-lg text-headline-lg text-on-surface font-bold">
              Mis Envíos
            </h1>
            <p className="font-body-sm text-body-sm text-secondary">
              Registro histórico y comprobantes digitales
            </p>
          </div>
          <div className="w-10 h-10 rounded-full bg-secondary-container flex items-center justify-center text-on-secondary-container shadow-sm">
            <span className="material-symbols-outlined text-[22px]">receipt_long</span>
          </div>
        </div>

        {/* Search & Filter Bar */}
        <div className="flex items-center gap-space-xs mt-space-2xs">
          <div className="flex-1 relative flex items-center">
            <span className="material-symbols-outlined absolute left-3 text-secondary text-[20px] pointer-events-none">
              search
            </span>
            <input
              className="w-full h-11 pl-10 pr-4 bg-surface-container-lowest rounded-xl text-body-md font-body-md text-on-surface placeholder:text-secondary shadow-sm outline-none transition-shadow focus:shadow-[0_0_0_2px_rgba(163,57,0,0.25)] border border-surface-container/60"
              id="searchInput"
              placeholder="Buscar por guía o destinatario..."
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <button
            onClick={() => setFilterDrawerOpen(!filterDrawerOpen)}
            className="h-11 w-11 shrink-0 bg-surface-container-lowest hover:bg-surface-container rounded-xl flex items-center justify-center text-secondary shadow-sm active:scale-95 transition-all border border-surface-container/60 cursor-pointer"
            id="filterBtn"
            title="Filtros avanzados"
          >
            <span className="material-symbols-outlined text-[20px]">tune</span>
          </button>
        </div>

        {/* Segmented Tabs */}
        <div className="flex items-center gap-space-2xs overflow-x-auto py-space-2xs no-scrollbar">
          <button
            onClick={() => setActiveTab('all')}
            className={`tab-pill shrink-0 px-space-md py-2 rounded-full font-label-md text-label-md transition-all cursor-pointer ${
              activeTab === 'all'
                ? 'bg-primary text-on-primary shadow-sm font-bold'
                : 'bg-surface-container text-secondary hover:text-on-surface'
            }`}
          >
            Todos (28)
          </button>
          <button
            onClick={() => setActiveTab('delivered')}
            className={`tab-pill shrink-0 px-space-md py-2 rounded-full font-label-md text-label-md transition-all cursor-pointer ${
              activeTab === 'delivered'
                ? 'bg-primary text-on-primary shadow-sm font-bold'
                : 'bg-surface-container text-secondary hover:text-on-surface'
            }`}
          >
            Entregados (24)
          </button>
          <button
            onClick={() => setActiveTab('ongoing')}
            className={`tab-pill shrink-0 px-space-md py-2 rounded-full font-label-md text-label-md transition-all cursor-pointer ${
              activeTab === 'ongoing'
                ? 'bg-primary text-on-primary shadow-sm font-bold'
                : 'bg-surface-container text-secondary hover:text-on-surface'
            }`}
          >
            En Curso (2)
          </button>
          <button
            onClick={() => setActiveTab('issues')}
            className={`tab-pill shrink-0 px-space-md py-2 rounded-full font-label-md text-label-md transition-all cursor-pointer ${
              activeTab === 'issues'
                ? 'bg-primary text-on-primary shadow-sm font-bold'
                : 'bg-surface-container text-secondary hover:text-on-surface'
            }`}
          >
            Incidencias (2)
          </button>
        </div>
      </div>

      {/* Content Stream */}
      <div className="px-space-md flex flex-col gap-space-xl mt-space-xs pb-space-lg">
        {/* Section: Esta Semana */}
        {(activeTab === 'all' || activeTab === 'delivered') && (
          <div className="flex flex-col gap-space-sm">
            <div className="flex items-center justify-between">
              <span className="font-label-md text-label-md text-secondary uppercase tracking-wider font-bold">
                Esta Semana
              </span>
              <span className="font-body-sm text-body-sm text-secondary">2 envíos</span>
            </div>

            {/* Tarjeta 1: #VX-93108 (Con foto y firma) */}
            <div className="bg-surface-container-lowest rounded-2xl p-space-md shadow-sm flex flex-col gap-space-md transition-transform duration-200 border border-surface-container/60">
              <div className="flex items-start justify-between gap-space-xs">
                <div className="flex items-center gap-space-xs min-w-0">
                  <div className="w-10 h-10 rounded-xl bg-primary-fixed flex items-center justify-center text-primary shrink-0">
                    <span className="material-symbols-outlined text-[22px]">package_2</span>
                  </div>
                  <div className="min-w-0 flex flex-col">
                    <span className="font-headline-sm text-headline-sm text-on-surface truncate font-bold">
                      #VX-93108
                    </span>
                    <span className="font-body-sm text-body-sm text-secondary truncate">
                      Caja Mediana (Ropa y calzado)
                    </span>
                  </div>
                </div>
                <span className="inline-flex items-center gap-1 px-space-xs py-1 rounded-full bg-tertiary-fixed text-on-tertiary-fixed font-label-sm text-label-sm font-bold shrink-0">
                  <span className="material-symbols-outlined text-[14px]">check_circle</span>
                  Entregado con éxito
                </span>
              </div>

              {/* Meta Details */}
              <div className="bg-surface-container-low rounded-xl p-space-sm flex flex-col gap-space-xs border border-surface-container/50">
                <div className="flex items-center justify-between text-body-sm font-body-sm">
                  <span className="text-secondary flex items-center gap-1">
                    <span className="material-symbols-outlined text-[16px]">schedule</span> Entregado
                  </span>
                  <span className="text-on-surface font-semibold">Ayer, 16:42</span>
                </div>
                <div className="flex items-center justify-between text-body-sm font-body-sm">
                  <span className="text-secondary flex items-center gap-1">
                    <span className="material-symbols-outlined text-[16px]">person_check</span> Receptor
                  </span>
                  <span className="text-on-surface font-semibold">Mariana Silva</span>
                </div>
              </div>

              {/* Visual Proof Preview */}
              <div className="flex items-center gap-space-sm">
                <div
                  onClick={() => onOpenReceipt('VX-93108')}
                  className="relative w-20 h-20 rounded-xl overflow-hidden shadow-sm shrink-0 bg-surface-container cursor-pointer group"
                >
                  <img
                    className="w-full h-full object-cover transition-transform group-hover:scale-110"
                    src={ASSETS.deliveryProof}
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = ASSETS.deliveryProofRemote;
                    }}
                    alt="Prueba de entrega fotográfica"
                  />
                  <div className="absolute bottom-1 right-1 bg-on-background/70 backdrop-blur-sm rounded-md px-1 py-0.5 text-white text-[10px] font-semibold flex items-center gap-0.5">
                    <span className="material-symbols-outlined text-[10px]">photo_camera</span> Foto
                  </div>
                </div>

                <div className="flex-1 bg-surface-container-low rounded-xl p-space-xs flex flex-col justify-center gap-1 h-20 border border-surface-container/50">
                  <div className="flex items-center justify-between">
                    <span className="font-label-sm text-label-sm text-secondary font-bold">
                      Firma Electrónica
                    </span>
                    <span className="font-label-sm text-label-sm text-tertiary flex items-center gap-0.5 font-bold">
                      <span className="material-symbols-outlined text-[12px]">verified</span> OTP 8931
                    </span>
                  </div>
                  {/* Minimal signature vector stroke simulation */}
                  <svg
                    className="w-full h-8 text-on-surface-variant"
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeWidth="1.8"
                    viewBox="0 0 160 32"
                  >
                    <path d="M 10 24 C 20 8, 30 14, 45 22 C 55 28, 60 12, 75 16 C 85 20, 95 26, 110 18 C 120 12, 130 25, 150 20" />
                  </svg>
                </div>
              </div>

              {/* Action Row */}
              <div className="flex items-center gap-space-xs pt-space-2xs">
                <button
                  className="flex-1 h-11 rounded-xl bg-surface-container hover:bg-surface-container-high text-on-surface font-label-md text-label-md flex items-center justify-center gap-1.5 transition-colors active:scale-[0.98] cursor-pointer font-bold"
                  onClick={() => onOpenReceipt('VX-93108')}
                >
                  <span className="material-symbols-outlined text-[18px]">picture_as_pdf</span>
                  Ver Recibo PDF
                </button>
                <button
                  onClick={() => onNavigate('nuevo-envio')}
                  className="flex-1 h-11 rounded-xl bg-primary text-on-primary font-label-md text-label-md flex items-center justify-center gap-1.5 shadow-sm hover:bg-primary-container transition-colors active:scale-[0.98] cursor-pointer font-bold"
                >
                  <span className="material-symbols-outlined text-[18px]">cached</span>
                  Volver a Enviar
                </button>
              </div>
            </div>

            {/* Tarjeta 2: #VX-91043 */}
            <div className="bg-surface-container-lowest rounded-2xl p-space-md shadow-sm flex flex-col gap-space-md transition-transform duration-200 border border-surface-container/60">
              <div className="flex items-start justify-between gap-space-xs">
                <div className="flex items-center gap-space-xs min-w-0">
                  <div className="w-10 h-10 rounded-xl bg-secondary-container flex items-center justify-center text-secondary shrink-0">
                    <span className="material-symbols-outlined text-[22px]">description</span>
                  </div>
                  <div className="min-w-0 flex flex-col">
                    <span className="font-headline-sm text-headline-sm text-on-surface truncate font-bold">
                      #VX-91043
                    </span>
                    <span className="font-body-sm text-body-sm text-secondary truncate">
                      Documentos Legales
                    </span>
                  </div>
                </div>
                <span className="inline-flex items-center gap-1 px-space-xs py-1 rounded-full bg-tertiary-fixed text-on-tertiary-fixed font-label-sm text-label-sm font-bold shrink-0">
                  <span className="material-symbols-outlined text-[14px]">check</span>
                  Entregado
                </span>
              </div>

              <div className="bg-surface-container-low rounded-xl p-space-sm flex flex-col gap-space-xs border border-surface-container/50">
                <div className="flex items-center justify-between text-body-sm font-body-sm">
                  <span className="text-secondary flex items-center gap-1">
                    <span className="material-symbols-outlined text-[16px]">schedule</span> Fecha
                  </span>
                  <span className="text-on-surface font-semibold">Martes, 11:20</span>
                </div>
                <div className="flex items-center justify-between text-body-sm font-body-sm">
                  <span className="text-secondary flex items-center gap-1">
                    <span className="material-symbols-outlined text-[16px]">apartment</span> Receptor
                  </span>
                  <span className="text-on-surface font-semibold truncate">
                    Notaría Rodríguez (Mesa de Entrada)
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between py-1 px-space-xs">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-tertiary"></span>
                  <span className="font-body-sm text-body-sm text-secondary">
                    Firma digital registrada con sellado de tiempo
                  </span>
                </div>
                <button
                  className="font-label-md text-label-md text-primary flex items-center gap-0.5 active:opacity-75 font-bold cursor-pointer"
                  onClick={() => onOpenReceipt('VX-91043')}
                >
                  Detalles <span className="material-symbols-outlined text-[16px]">chevron_right</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Section: En Curso (si está seleccionada la pestaña o todos) */}
        {(activeTab === 'all' || activeTab === 'ongoing') && (
          <div className="flex flex-col gap-space-sm">
            <div className="flex items-center justify-between">
              <span className="font-label-md text-label-md text-secondary uppercase tracking-wider font-bold">
                Actualmente En Curso
              </span>
              <span className="font-body-sm text-body-sm text-secondary">2 envíos</span>
            </div>

            {/* Tarjeta En Ruta */}
            <div className="bg-surface-container-lowest rounded-2xl p-space-md shadow-sm flex flex-col gap-space-sm border border-primary/30">
              <div className="flex items-start justify-between">
                <div>
                  <span className="font-headline-sm font-bold text-on-surface">#VX-94821</span>
                  <p className="text-xs text-secondary">Laptop Dell XPS 15</p>
                </div>
                <span className="px-2 py-1 bg-tertiary-fixed/30 text-on-tertiary-fixed-variant text-xs font-bold rounded-full">
                  En reparto • 18 min
                </span>
              </div>
              <div className="flex justify-between items-center pt-2 border-t border-surface-container-low">
                <span className="text-xs text-secondary">Mateo Morales (Honda Roja)</span>
                <button
                  onClick={() => onNavigate('rastreo')}
                  className="text-primary text-xs font-bold flex items-center gap-1"
                >
                  Ver en mapa en vivo <span className="material-symbols-outlined text-sm">arrow_forward</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Section: Octubre 2024 */}
        {(activeTab === 'all' || activeTab === 'delivered' || activeTab === 'issues') && (
          <div className="flex flex-col gap-space-sm">
            <div className="flex items-center justify-between">
              <span className="font-label-md text-label-md text-secondary uppercase tracking-wider font-bold">
                Octubre 2024
              </span>
              <span className="font-body-sm text-body-sm text-secondary">2 envíos</span>
            </div>

            {/* Tarjeta 3: #VX-88492 */}
            {(activeTab === 'all' || activeTab === 'delivered') && (
              <div className="bg-surface-container-lowest rounded-2xl p-space-md shadow-sm flex flex-col gap-space-md transition-transform duration-200 border border-surface-container/60">
                <div className="flex items-start justify-between gap-space-xs">
                  <div className="flex items-center gap-space-xs min-w-0">
                    <div className="w-10 h-10 rounded-xl bg-primary-fixed-dim flex items-center justify-center text-primary shrink-0">
                      <span className="material-symbols-outlined text-[22px]">devices</span>
                    </div>
                    <div className="min-w-0 flex flex-col">
                      <span className="font-headline-sm text-headline-sm text-on-surface truncate font-bold">
                        #VX-88492
                      </span>
                      <span className="font-body-sm text-body-sm text-secondary truncate">
                        Paquete Frágil (Dispositivo electrónico)
                      </span>
                    </div>
                  </div>
                  <span className="inline-flex items-center gap-1 px-space-xs py-1 rounded-full bg-tertiary-fixed text-on-tertiary-fixed font-label-sm text-label-sm font-bold shrink-0">
                    <span className="material-symbols-outlined text-[14px]">done_all</span> 28 Oct
                  </span>
                </div>

                <div className="flex items-center justify-between bg-surface-container-low rounded-xl px-space-md py-space-sm border border-surface-container/50">
                  <div className="flex flex-col">
                    <span className="font-label-sm text-label-sm text-secondary font-bold">
                      Tu Calificación
                    </span>
                    <span className="font-body-md text-body-md font-semibold text-on-surface">
                      Excelente servicio
                    </span>
                  </div>
                  <div className="flex items-center gap-0.5 text-primary">
                    <span className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                    <span className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                    <span className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                    <span className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                    <span className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                  </div>
                </div>

                <div className="flex items-center gap-space-xs">
                  <button
                    className="flex-1 h-10 rounded-xl bg-surface-container hover:bg-surface-container-high text-on-surface font-label-md text-label-md flex items-center justify-center gap-1.5 transition-colors cursor-pointer font-bold"
                    onClick={() => onOpenReceipt('VX-88492')}
                  >
                    <span className="material-symbols-outlined text-[18px]">receipt</span> Comprobante
                  </button>
                  <button
                    onClick={() => onNavigate('nuevo-envio')}
                    className="flex-1 h-10 rounded-xl bg-surface-container hover:bg-surface-container-high text-on-surface font-label-md text-label-md flex items-center justify-center gap-1.5 transition-colors cursor-pointer font-bold"
                  >
                    <span className="material-symbols-outlined text-[18px]">refresh</span> Repetir
                  </button>
                </div>
              </div>
            )}

            {/* Tarjeta 4: #VX-87110 (Incidencia resuelta) */}
            {(activeTab === 'all' || activeTab === 'issues') && (
              <div className="bg-surface-container-lowest rounded-2xl p-space-md shadow-sm flex flex-col gap-space-md transition-transform duration-200 border border-surface-container/60">
                <div className="flex items-start justify-between gap-space-xs">
                  <div className="flex items-center gap-space-xs min-w-0">
                    <div className="w-10 h-10 rounded-xl bg-surface-container-high flex items-center justify-center text-on-surface-variant shrink-0">
                      <span className="material-symbols-outlined text-[22px]">build</span>
                    </div>
                    <div className="min-w-0 flex flex-col">
                      <span className="font-headline-sm text-headline-sm text-on-surface truncate font-bold">
                        #VX-87110
                      </span>
                      <span className="font-body-sm text-body-sm text-secondary truncate">
                        Repuesto Automotriz
                      </span>
                    </div>
                  </div>
                  <span className="inline-flex items-center gap-1 px-space-xs py-1 rounded-full bg-surface-container text-secondary font-label-sm text-label-sm font-bold shrink-0">
                    15 Oct
                  </span>
                </div>

                {/* Incidencia resuelta chip */}
                <div className="bg-secondary-container/50 rounded-xl p-space-sm flex items-start gap-space-xs border border-secondary/20">
                  <span className="material-symbols-outlined text-secondary text-[18px] shrink-0 mt-0.5">
                    notification_important
                  </span>
                  <div className="flex flex-col">
                    <span className="font-label-sm text-label-sm font-semibold text-on-secondary-fixed font-bold">
                      Receptor Ausente en 1er intento
                    </span>
                    <span className="font-body-sm text-body-sm text-on-secondary-container">
                      Reprogramado con éxito y entregado en 2da visita.
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between text-body-sm font-body-sm text-secondary px-space-2xs">
                  <span>Receptor: Juan Carlos M.</span>
                  <button
                    className="font-label-md text-label-md text-primary flex items-center gap-1 font-bold cursor-pointer"
                    onClick={() => onOpenReceipt('VX-87110')}
                  >
                    Ver acta <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Comprobante Destacado Banner Card */}
        <div className="bg-gradient-to-br from-primary via-primary-container to-primary-fixed-dim rounded-2xl p-space-md text-on-primary shadow-lg relative overflow-hidden mb-space-sm">
          <div className="absolute -right-6 -bottom-6 w-32 h-32 rounded-full bg-surface-container-lowest/10 pointer-events-none"></div>
          <div className="relative z-10 flex flex-col gap-space-sm">
            <div className="flex items-center justify-between">
              <span className="inline-flex items-center gap-1 px-space-xs py-0.5 rounded-full bg-on-primary/20 backdrop-blur-sm text-on-primary font-label-sm text-label-sm font-bold">
                <span className="material-symbols-outlined text-[14px]">verified_user</span> Sello Criptográfico TSA
              </span>
              <span className="font-label-sm text-label-sm opacity-90 font-semibold">RFC / RUT Válido</span>
            </div>

            <div>
              <h2 className="font-headline-md text-headline-md leading-tight text-on-primary font-bold">
                Comprobantes Fiscales y Actas
              </h2>
              <p className="font-body-sm text-body-sm text-on-primary/90 mt-1">
                Descarga boletas, facturas electrónicas y manifiestos de recepción con validez legal tributaria en un solo clic.
              </p>
            </div>

            <div className="pt-space-2xs">
              <button
                onClick={handleDownloadConsolidated}
                className="w-full h-11 rounded-xl bg-surface-container-lowest text-primary font-label-lg text-label-lg flex items-center justify-center gap-2 shadow-sm active:scale-[0.98] transition-transform font-bold cursor-pointer hover:bg-primary-fixed"
              >
                <span className="material-symbols-outlined text-[18px]">download</span>
                Descargar Facturas Consolidadas
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
