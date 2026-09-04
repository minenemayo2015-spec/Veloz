import React, { useState } from 'react';
import { PackageType, ShippingModeId, ScreenId } from '../types';
import { PACKAGE_TYPES, SHIPPING_MODES } from '../data/shipments';

interface NewShipmentScreenProps {
  onNavigate: (screen: ScreenId) => void;
  onShipmentCreated?: (trackingId: string) => void;
}

export const NewShipmentScreen: React.FC<NewShipmentScreenProps> = ({
  onNavigate,
  onShipmentCreated,
}) => {
  const [selectedPackage, setSelectedPackage] = useState<PackageType>('small');
  const [selectedMode, setSelectedMode] = useState<ShippingModeId>('flash');

  // Form states
  const [originAddress, setOriginAddress] = useState('Av. Las Camelias 450, San Isidro');
  const [originDistrict, setOriginDistrict] = useState('San Isidro');
  const [originApt, setOriginApt] = useState('Of. 602 (Piso 6)');
  const [originContact, setOriginContact] = useState('Carlos M. (+51 987 654 321)');

  const [destAddress, setDestAddress] = useState('Calle Los Pinos 182, Miraflores');
  const [destDistrict, setDestDistrict] = useState('Miraflores');
  const [destInstructions, setDestInstructions] = useState(
    'Dejar en recepción con vigilante de turno'
  );

  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showGuideModal, setShowGuideModal] = useState(false);

  // Invert origin and destination
  const handleInvertRoute = () => {
    const tempAddr = originAddress;
    const tempDist = originDistrict;
    setOriginAddress(destAddress);
    setOriginDistrict(destDistrict);
    setDestAddress(tempAddr);
    setDestDistrict(tempDist);
  };

  const currentModeOption =
    SHIPPING_MODES.find((m) => m.id === selectedMode) || SHIPPING_MODES[0];

  const igv = (currentModeOption.price * 0.18 / 1.18).toFixed(2);

  const handleConfirmOrder = () => {
    setShowConfirmModal(false);
    if (onShipmentCreated) {
      onShipmentCreated('VX-94821');
    }
    onNavigate('rastreo');
  };

  return (
    <div className="flex flex-col w-full max-w-xl mx-auto px-space-md pt-space-xs pb-space-lg gap-space-lg">
      {/* Progress and Step Header */}
      <div className="flex flex-col gap-space-2xs">
        <div className="flex items-center justify-between">
          <span className="font-label-sm text-label-sm text-primary uppercase tracking-widest font-bold">
            Paso 1 de 3
          </span>
          <span className="font-label-md text-label-md text-secondary">33% completado</span>
        </div>
        <div className="w-full bg-surface-container h-1.5 rounded-full overflow-hidden">
          <div
            className="bg-primary h-full rounded-full transition-all duration-300"
            style={{ width: '33%' }}
          ></div>
        </div>
        <div className="flex items-baseline justify-between mt-space-2xs">
          <h1 className="font-headline-md text-headline-md text-on-surface font-bold">
            Detalles del Paquete y Ruta
          </h1>
          <button
            onClick={() => setShowGuideModal(true)}
            className="text-secondary text-xs flex items-center gap-0.5 hover:text-on-surface transition-colors cursor-pointer"
            type="button"
          >
            <span className="material-symbols-outlined text-base">help</span>
            <span className="font-label-sm text-label-sm">Guía</span>
          </button>
        </div>
      </div>

      {/* Tipo de paquete */}
      <section className="flex flex-col gap-space-sm">
        <div className="flex items-center justify-between">
          <h2 className="font-label-lg text-label-lg text-on-surface flex items-center gap-1.5 font-bold">
            <span className="material-symbols-outlined text-primary text-xl">inventory_2</span>
            Tipo de paquete
          </h2>
          <span className="font-body-sm text-body-sm text-secondary">Selecciona uno</span>
        </div>

        <div className="grid grid-cols-2 gap-space-sm" id="package-selector">
          {PACKAGE_TYPES.map((pkg) => {
            const isSelected = selectedPackage === pkg.id;
            return (
              <div
                key={pkg.id}
                onClick={() => setSelectedPackage(pkg.id)}
                className={`package-option relative p-space-md rounded-2xl flex flex-col justify-between cursor-pointer transition-all duration-200 border ${
                  isSelected
                    ? 'bg-primary-fixed/30 ring-2 ring-primary shadow-md border-primary/20'
                    : 'bg-surface-container-lowest shadow-sm hover:bg-surface-container-low border-surface-container/60'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors ${
                      isSelected
                        ? 'bg-primary text-on-primary shadow-sm'
                        : 'bg-surface-container text-secondary'
                    }`}
                  >
                    <span className="material-symbols-outlined text-2xl">{pkg.icon}</span>
                  </div>
                  <div
                    className={`check-icon w-5 h-5 rounded-full flex items-center justify-center text-xs transition-colors ${
                      isSelected
                        ? 'bg-primary text-on-primary'
                        : 'bg-surface-container text-transparent'
                    }`}
                  >
                    <span className="material-symbols-outlined text-sm">check</span>
                  </div>
                </div>

                <div className="mt-space-sm">
                  <p className="font-headline-sm text-headline-sm text-on-surface font-bold">
                    {pkg.title}
                  </p>
                  <p
                    className={`font-label-sm text-label-sm mt-0.5 ${
                      isSelected ? 'text-primary font-bold' : 'text-secondary'
                    }`}
                  >
                    {pkg.weightLimit}
                  </p>
                  <p className="font-body-sm text-body-sm text-secondary mt-1">
                    {pkg.dimensions}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Puntos de recojo y entrega */}
      <section className="flex flex-col gap-space-sm">
        <div className="flex items-center justify-between">
          <h2 className="font-label-lg text-label-lg text-on-surface flex items-center gap-1.5 font-bold">
            <span className="material-symbols-outlined text-primary text-xl">alt_route</span>
            Puntos de recojo y entrega
          </h2>
          <button
            onClick={handleInvertRoute}
            className="text-primary font-label-sm text-label-sm hover:underline flex items-center gap-1 cursor-pointer font-bold"
            type="button"
          >
            <span className="material-symbols-outlined text-base">swap_vert</span>
            Invertir
          </button>
        </div>

        <div className="bg-surface-container-lowest p-space-lg rounded-2xl shadow-sm flex flex-col gap-space-lg relative overflow-hidden border border-surface-container/60">
          {/* Punto A • Recojo */}
          <div className="flex gap-space-md relative">
            <div className="flex flex-col items-center pt-1.5">
              <div className="w-4 h-4 rounded-full bg-tertiary-container text-on-tertiary-container flex items-center justify-center shadow-sm z-10 ring-4 ring-tertiary-container/20">
                <div className="w-1.5 h-1.5 rounded-full bg-on-tertiary-container"></div>
              </div>
              <div className="w-0.5 grow my-1 border-l-2 border-dashed border-secondary/30"></div>
            </div>

            <div className="flex-1 flex flex-col gap-space-xs">
              <div className="flex items-center justify-between">
                <span className="font-label-sm text-label-sm text-tertiary-container tracking-wider uppercase flex items-center gap-1 font-bold">
                  Punto A • Recojo
                </span>
                <span className="font-label-sm text-label-sm text-secondary">
                  {originDistrict}
                </span>
              </div>
              <div className="flex flex-col gap-1.5">
                <div className="relative flex items-center">
                  <span className="material-symbols-outlined absolute left-3 text-secondary text-lg">
                    trip_origin
                  </span>
                  <input
                    className="w-full bg-surface-container-low text-on-surface font-body-md text-body-md pl-10 pr-3 py-2.5 rounded-xl outline-none focus:bg-surface-container-lowest focus:ring-2 focus:ring-primary transition-all"
                    type="text"
                    value={originAddress}
                    onChange={(e) => setOriginAddress(e.target.value)}
                  />
                </div>
                <div className="grid grid-cols-2 gap-space-xs">
                  <input
                    className="w-full bg-surface-container-low text-on-surface font-body-sm text-body-sm px-3 py-2 rounded-lg outline-none focus:bg-surface-container-lowest focus:ring-1 focus:ring-primary transition-all"
                    placeholder="Piso / Dpto"
                    type="text"
                    value={originApt}
                    onChange={(e) => setOriginApt(e.target.value)}
                  />
                  <input
                    className="w-full bg-surface-container-low text-on-surface font-body-sm text-body-sm px-3 py-2 rounded-lg outline-none focus:bg-surface-container-lowest focus:ring-1 focus:ring-primary transition-all"
                    placeholder="Nombre contacto"
                    type="text"
                    value={originContact}
                    onChange={(e) => setOriginContact(e.target.value)}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Punto B • Destino */}
          <div className="flex gap-space-md relative">
            <div className="flex flex-col items-center pt-1.5">
              <div className="w-4 h-4 rounded-full bg-primary text-on-primary flex items-center justify-center shadow-sm z-10 ring-4 ring-primary/20">
                <div className="w-1.5 h-1.5 rounded-full bg-on-primary"></div>
              </div>
            </div>

            <div className="flex-1 flex flex-col gap-space-xs">
              <div className="flex items-center justify-between">
                <span className="font-label-sm text-label-sm text-primary tracking-wider uppercase flex items-center gap-1 font-bold">
                  Punto B • Destino
                </span>
                <span className="font-label-sm text-label-sm text-secondary">
                  {destDistrict}
                </span>
              </div>
              <div className="flex flex-col gap-1.5">
                <div className="relative flex items-center">
                  <span className="material-symbols-outlined absolute left-3 text-secondary text-lg">
                    location_on
                  </span>
                  <input
                    className="w-full bg-surface-container-low text-on-surface font-body-md text-body-md pl-10 pr-3 py-2.5 rounded-xl outline-none focus:bg-surface-container-lowest focus:ring-2 focus:ring-primary transition-all"
                    type="text"
                    value={destAddress}
                    onChange={(e) => setDestAddress(e.target.value)}
                  />
                </div>
                <input
                  className="w-full bg-surface-container-low text-on-surface font-body-sm text-body-sm px-3 py-2 rounded-lg outline-none focus:bg-surface-container-lowest focus:ring-1 focus:ring-primary transition-all"
                  placeholder="Instrucciones de entrega"
                  type="text"
                  value={destInstructions}
                  onChange={(e) => setDestInstructions(e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* Distancia y Tiempo */}
          <div className="flex items-center justify-between pt-2 border-t border-surface-container-low">
            <div className="flex items-center gap-1.5 text-secondary">
              <span className="material-symbols-outlined text-base">straighten</span>
              <span className="font-body-sm text-body-sm">
                Distancia estimada: <strong className="text-on-surface font-medium">4.8 km</strong>
              </span>
            </div>
            <span className="bg-surface-container-low text-on-surface-variant font-label-sm text-label-sm px-2.5 py-1 rounded-full font-semibold">
              ~18 min de viaje
            </span>
          </div>
        </div>
      </section>

      {/* Modalidad de entrega */}
      <section className="flex flex-col gap-space-sm">
        <div className="flex items-center justify-between">
          <h2 className="font-label-lg text-label-lg text-on-surface flex items-center gap-1.5 font-bold">
            <span className="material-symbols-outlined text-primary text-xl">speed</span>
            Modalidad de entrega
          </h2>
          <span className="font-label-sm text-label-sm text-primary font-bold">Recomendado</span>
        </div>

        <div className="flex flex-col gap-space-xs" id="shipping-modes">
          {SHIPPING_MODES.map((mode) => {
            const isSelected = selectedMode === mode.id;
            return (
              <label
                key={mode.id}
                onClick={() => setSelectedMode(mode.id)}
                className={`shipping-option flex items-center justify-between p-space-md rounded-xl cursor-pointer transition-all duration-200 border ${
                  isSelected
                    ? 'bg-primary-fixed/20 ring-2 ring-primary border-primary/20 shadow-sm'
                    : 'bg-surface-container-lowest shadow-sm hover:bg-surface-container-low border-surface-container/60'
                }`}
              >
                <div className="flex items-center gap-space-md">
                  <div
                    className={`w-5 h-5 rounded-full flex items-center justify-center transition-colors ${
                      isSelected ? 'bg-primary' : 'bg-surface-container'
                    }`}
                  >
                    <div
                      className={`w-2 h-2 rounded-full transition-colors ${
                        isSelected ? 'bg-on-primary' : 'bg-transparent'
                      }`}
                    ></div>
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="font-headline-sm text-headline-sm text-on-surface font-bold">
                        {mode.name}
                      </span>
                      {mode.badge && (
                        <span
                          className={`px-1.5 py-0.5 rounded font-label-sm text-label-sm font-bold leading-none ${
                            isSelected
                              ? 'bg-primary text-on-primary'
                              : 'text-secondary font-semibold bg-surface-container-low'
                          }`}
                        >
                          {mode.badge}
                        </span>
                      )}
                    </div>
                    <p className="font-body-sm text-body-sm text-secondary">{mode.subtext}</p>
                  </div>
                </div>
                <span
                  className={`font-headline-sm text-headline-sm font-bold ${
                    isSelected ? 'text-primary' : 'text-on-surface'
                  }`}
                >
                  S/ {mode.price.toFixed(2)}
                </span>
              </label>
            );
          })}
        </div>
      </section>

      {/* Desglose de tarifa */}
      <div className="bg-surface-container-lowest p-space-lg rounded-2xl shadow-sm flex flex-col gap-space-md border border-surface-container/60">
        <div className="flex items-center justify-between pb-space-xs border-b border-surface-container-low">
          <h3 className="font-label-lg text-label-lg text-on-surface font-bold">
            Desglose de tarifa
          </h3>
          <div className="flex items-center gap-1 text-tertiary font-label-sm text-label-sm font-semibold">
            <span className="material-symbols-outlined text-base">verified_user</span>
            Protección básica incluida
          </div>
        </div>

        <div className="flex flex-col gap-space-xs font-body-sm text-body-sm">
          <div className="flex justify-between text-secondary">
            <span>Tarifa base de entrega</span>
            <span className="text-on-surface font-medium" id="base-fee">
              S/ {currentModeOption.baseFee.toFixed(2)}
            </span>
          </div>
          <div className="flex justify-between text-secondary">
            <span>Seguro de paquete (cobertura hasta S/ 350)</span>
            <span className="text-on-surface font-medium" id="insurance-fee">
              S/ {currentModeOption.insuranceFee.toFixed(2)}
            </span>
          </div>
          <div className="flex justify-between text-secondary">
            <span>IGV (18% incluido)</span>
            <span className="text-on-surface font-medium">S/ {igv}</span>
          </div>
        </div>

        <div className="pt-space-xs border-t border-surface-container-low flex items-center justify-between">
          <div>
            <span className="font-body-sm text-body-sm text-secondary block">Total estimado</span>
            <span
              className="font-headline-lg text-headline-lg text-primary font-bold leading-tight"
              id="total-price"
            >
              S/ {currentModeOption.price.toFixed(2)}
            </span>
          </div>
          <div className="text-right">
            <span className="inline-flex items-center gap-1 text-tertiary-container bg-tertiary-fixed/40 px-2.5 py-1 rounded-full text-xs font-bold">
              <span className="material-symbols-outlined text-sm">schedule</span>
              Llegada estimada: {currentModeOption.eta}
            </span>
          </div>
        </div>

        <button
          onClick={() => setShowConfirmModal(true)}
          className="w-full h-12 bg-primary hover:bg-primary-container text-on-primary font-label-lg text-label-lg rounded-xl shadow-md flex items-center justify-center gap-2 active:scale-[0.99] transition-all cursor-pointer font-bold"
          type="button"
        >
          <span>Continuar a Confirmación y Pago</span>
          <span className="material-symbols-outlined text-lg">arrow_forward</span>
        </button>

        <p className="text-center font-body-sm text-body-sm text-secondary text-xs">
          Al continuar aceptas los términos de servicio de Velox Courier.
        </p>
      </div>

      {/* Modal de Confirmación y Pago */}
      {showConfirmModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4 animate-in fade-in duration-150">
          <div className="w-full max-w-md bg-surface-container-lowest rounded-3xl p-space-lg shadow-2xl flex flex-col gap-space-md">
            <div className="flex items-center justify-between pb-2 border-b border-surface-container-low">
              <div className="flex items-center gap-2">
                <div className="w-9 h-9 rounded-full bg-primary-fixed flex items-center justify-center text-primary">
                  <span className="material-symbols-outlined text-lg">credit_card</span>
                </div>
                <div>
                  <h3 className="font-headline-sm font-bold text-on-surface">Confirmar Envío</h3>
                  <p className="text-xs text-secondary">Paso 2 de 3 • Pago y Despacho</p>
                </div>
              </div>
              <button
                onClick={() => setShowConfirmModal(false)}
                className="w-8 h-8 rounded-full bg-surface-container flex items-center justify-center text-secondary"
              >
                <span className="material-symbols-outlined text-sm">close</span>
              </button>
            </div>

            <div className="bg-surface-container-low rounded-2xl p-space-sm flex flex-col gap-2 text-xs">
              <div className="flex justify-between">
                <span className="text-secondary">Paquete:</span>
                <span className="font-bold text-on-surface capitalize">
                  {PACKAGE_TYPES.find((p) => p.id === selectedPackage)?.title}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-secondary">Modalidad:</span>
                <span className="font-bold text-primary">{currentModeOption.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-secondary">Ruta:</span>
                <span className="font-medium text-on-surface truncate max-w-[200px]">
                  {originDistrict} → {destDistrict}
                </span>
              </div>
              <div className="flex justify-between pt-1 border-t border-surface-container">
                <span className="font-bold text-on-surface">Monto Total:</span>
                <span className="font-bold text-primary text-sm">
                  S/ {currentModeOption.price.toFixed(2)}
                </span>
              </div>
            </div>

            {/* Simulated Payment Methods */}
            <div className="flex flex-col gap-2">
              <span className="font-label-sm text-secondary font-bold">MÉTODO DE PAGO</span>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  className="p-2.5 rounded-xl border-2 border-primary bg-primary-fixed/20 text-xs font-bold text-primary flex items-center justify-center gap-1.5"
                >
                  <span className="material-symbols-outlined text-sm">account_balance_wallet</span>
                  Saldo Velox
                </button>
                <button
                  type="button"
                  className="p-2.5 rounded-xl border border-surface-container bg-surface-container-lowest text-xs font-semibold text-secondary flex items-center justify-center gap-1.5 hover:bg-surface-container-low"
                >
                  <span className="material-symbols-outlined text-sm">qr_code_2</span>
                  Yape / Plin
                </button>
              </div>
            </div>

            <button
              onClick={handleConfirmOrder}
              className="w-full h-12 bg-primary hover:bg-primary-container text-on-primary font-bold rounded-xl shadow-md flex items-center justify-center gap-2 active:scale-95 transition-all cursor-pointer"
            >
              <span>Autorizar y Solicitar Mensajero</span>
              <span className="material-symbols-outlined text-base">check</span>
            </button>
          </div>
        </div>
      )}

      {/* Guide Modal */}
      {showGuideModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4 animate-in fade-in duration-150">
          <div className="w-full max-w-sm bg-surface-container-lowest rounded-2xl p-space-lg shadow-2xl flex flex-col gap-space-md">
            <div className="flex items-center justify-between pb-2 border-b border-surface-container-low">
              <h3 className="font-headline-sm font-bold text-on-surface">Guía de Envíos Velox</h3>
              <button
                onClick={() => setShowGuideModal(false)}
                className="w-8 h-8 rounded-full bg-surface-container flex items-center justify-center text-secondary"
              >
                <span className="material-symbols-outlined text-sm">close</span>
              </button>
            </div>
            <div className="flex flex-col gap-2 text-xs text-secondary">
              <p>
                <strong className="text-on-surface">1. Empaque seguro:</strong> Asegúrate de que el contenido esté bien protegido con burbuja o cartón si es frágil.
              </p>
              <p>
                <strong className="text-on-surface">2. Tiempo de espera:</strong> El motorizado se asigna en 2-4 minutos y arriba al punto de recojo en ~15 minutos.
              </p>
              <p>
                <strong className="text-on-surface">3. Código de entrega:</strong> Tu destinatario deberá validar el código PIN de 4 dígitos o firmar en pantalla.
              </p>
            </div>
            <button
              onClick={() => setShowGuideModal(false)}
              className="w-full py-2.5 bg-primary text-on-primary rounded-xl font-bold text-xs"
            >
              Entendido
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
