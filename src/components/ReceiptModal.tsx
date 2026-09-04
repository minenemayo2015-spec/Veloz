import React from 'react';

interface ReceiptModalProps {
  shipmentId: string | null;
  onClose: () => void;
  onDownload: () => void;
}

export const ReceiptModal: React.FC<ReceiptModalProps> = ({ shipmentId, onClose, onDownload }) => {
  if (!shipmentId) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-on-background/40 backdrop-blur-sm transition-opacity p-0 sm:p-4">
      <div className="w-full max-w-lg bg-surface-container-lowest rounded-t-3xl sm:rounded-3xl p-space-lg flex flex-col gap-space-md shadow-2xl max-h-[90vh] overflow-y-auto animate-in slide-in-from-bottom duration-200">
        {/* Modal Header */}
        <div className="flex items-center justify-between pb-space-2xs border-b border-surface-container-low">
          <div className="flex items-center gap-space-xs">
            <div className="w-9 h-9 rounded-full bg-tertiary-fixed flex items-center justify-center text-on-tertiary-fixed">
              <span className="material-symbols-outlined text-[20px]">verified</span>
            </div>
            <div>
              <h3 className="font-headline-sm text-headline-sm text-on-surface">
                Comprobante #{shipmentId}
              </h3>
              <p className="font-body-sm text-body-sm text-secondary">
                Acta de entrega certificada con valor legal
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            aria-label="Cerrar modal"
            className="w-9 h-9 rounded-full bg-surface-container hover:bg-surface-container-high flex items-center justify-center text-secondary active:scale-90 transition-all"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Preview Box with Cryptographic Hash */}
        <div className="bg-surface-container-low rounded-2xl p-space-md flex flex-col gap-space-sm border border-surface-container">
          <div className="flex justify-between items-center text-body-sm font-body-sm">
            <span className="text-secondary flex items-center gap-1">
              <span className="material-symbols-outlined text-[15px]">schedule</span> Fecha y Hora exacta
            </span>
            <span className="text-on-surface font-semibold">2024-11-03 16:42:19 UTC-5</span>
          </div>

          <div className="flex justify-between items-center text-body-sm font-body-sm">
            <span className="text-secondary flex items-center gap-1">
              <span className="material-symbols-outlined text-[15px]">security</span> Hash Criptográfico
            </span>
            <span className="text-on-surface font-mono text-[11px] font-medium bg-surface-container px-2 py-0.5 rounded truncate max-w-[170px]">
              e3b0c44298fc1c149afbf4c8
            </span>
          </div>

          <div className="flex justify-between items-center text-body-sm font-body-sm">
            <span className="text-secondary flex items-center gap-1">
              <span className="material-symbols-outlined text-[15px]">two_wheeler</span> Repartidor Velox
            </span>
            <span className="text-on-surface font-semibold">Mateo Morales (ID #V-402)</span>
          </div>

          <div className="flex justify-between items-center text-body-sm font-body-sm">
            <span className="text-secondary flex items-center gap-1">
              <span className="material-symbols-outlined text-[15px]">pin_drop</span> Geolocalización Confirmada
            </span>
            <span className="text-primary font-semibold flex items-center gap-0.5">
              -12.0942, -77.0341 (Miraflores)
            </span>
          </div>

          <div className="flex justify-between items-center text-body-sm font-body-sm">
            <span className="text-secondary flex items-center gap-1">
              <span className="material-symbols-outlined text-[15px]">verified_user</span> Validación Biométrica
            </span>
            <span className="text-tertiary font-bold text-xs bg-tertiary-fixed/40 px-2 py-0.5 rounded">
              OTP 8931 OK
            </span>
          </div>
        </div>

        {/* Digital Signature Card inside Modal */}
        <div className="bg-surface-container rounded-xl p-space-sm flex flex-col gap-space-2xs">
          <div className="flex items-center justify-between">
            <span className="font-label-sm text-label-sm text-secondary font-bold">
              Firma en Pantalla Receptor (Mariana Silva)
            </span>
            <span className="text-[10px] text-tertiary font-semibold flex items-center gap-0.5">
              <span className="material-symbols-outlined text-[12px]">done_all</span> Verificado
            </span>
          </div>
          <div className="bg-surface-container-lowest rounded-lg h-24 flex items-center justify-center relative overflow-hidden border border-surface-container">
            <svg
              className="w-4/5 h-16 text-on-surface"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeWidth="2.5"
              viewBox="0 0 200 60"
            >
              <path d="M 20 45 C 40 15, 60 25, 90 40 C 110 50, 120 20, 150 25 C 170 30, 180 40, 190 35" />
            </svg>
            <span className="absolute bottom-1.5 right-2.5 font-label-sm text-[10px] text-secondary/70">
              Sellado de tiempo TSA #9921
            </span>
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex flex-col gap-space-xs pt-space-xs">
          <button
            onClick={onDownload}
            className="w-full h-12 rounded-xl bg-primary hover:bg-primary-container text-on-primary font-label-lg text-label-lg flex items-center justify-center gap-2 shadow-md active:scale-[0.98] transition-all cursor-pointer font-bold"
          >
            <span className="material-symbols-outlined text-[20px]">download</span>
            Descargar Comprobante Fiscal (Factura/Boleta)
          </button>
          <button
            onClick={onClose}
            className="w-full h-11 rounded-xl bg-surface-container hover:bg-surface-container-high text-secondary font-label-md text-label-md flex items-center justify-center transition-colors cursor-pointer"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
};
