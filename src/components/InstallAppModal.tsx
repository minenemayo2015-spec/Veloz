import React, { useState } from 'react';
import { usePWAInstall } from '../hooks/usePWAInstall';

interface InstallAppModalProps {
  isOpen: boolean;
  onClose: () => void;
  onShowToast: (msg: string) => void;
}

export const InstallAppModal: React.FC<InstallAppModalProps> = ({
  isOpen,
  onClose,
  onShowToast,
}) => {
  const { isInstalled, canPromptDirectly, triggerInstall } = usePWAInstall();
  const [activeMethod, setActiveMethod] = useState<'pwa' | 'apk' | 'capacitor'>('pwa');
  const [copiedUrl, setCopiedUrl] = useState(false);

  if (!isOpen) return null;

  // Use current window origin or fallback to shared app url
  const appUrl =
    typeof window !== 'undefined' && window.location.href.includes('http')
      ? window.location.origin
      : 'https://ais-pre-ftnwsmgjc24dxltkwwmtxb-164401922920.us-west2.run.app';

  const pwaBuilderUrl = `https://www.pwabuilder.com/reportcard?url=${encodeURIComponent(appUrl)}`;

  const handleCopyUrl = () => {
    navigator.clipboard?.writeText(appUrl);
    setCopiedUrl(true);
    onShowToast('¡Enlace de la app copiado al portapapeles!');
    setTimeout(() => setCopiedUrl(false), 2500);
  };

  const handleInstallClick = async () => {
    if (canPromptDirectly) {
      const success = await triggerInstall();
      if (success) {
        onShowToast('¡Instalando Velox Courier en tu dispositivo!');
        onClose();
      }
    } else {
      onShowToast('Abre el menú de tu navegador (⋮) y selecciona "Instalar aplicación"');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="w-full max-w-md bg-surface-container-lowest rounded-3xl p-space-lg shadow-2xl flex flex-col gap-space-md border border-surface-container/80 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between pb-2 border-b border-surface-container-low">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-primary flex items-center justify-center text-on-primary shadow-md">
              <span className="material-symbols-outlined text-2xl">install_mobile</span>
            </div>
            <div>
              <h3 className="font-headline-sm font-bold text-on-surface">
                Instalar en tu Teléfono
              </h3>
              <p className="text-xs text-secondary">
                PWA Nativa o archivo APK para Android
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-surface-container flex items-center justify-center text-secondary hover:text-on-surface transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-base">close</span>
          </button>
        </div>

        {/* Status Pill */}
        {isInstalled ? (
          <div className="p-3 bg-tertiary-fixed/30 text-on-tertiary-fixed-variant rounded-2xl flex items-center gap-2 text-xs font-bold">
            <span className="material-symbols-outlined text-lg">verified</span>
            <span>¡La aplicación ya se encuentra instalada en este dispositivo!</span>
          </div>
        ) : null}

        {/* Method Selector Tabs */}
        <div className="grid grid-cols-3 gap-1 bg-surface-container-low p-1 rounded-2xl">
          <button
            onClick={() => setActiveMethod('pwa')}
            className={`py-2 px-1 rounded-xl text-xs font-bold transition-all ${
              activeMethod === 'pwa'
                ? 'bg-primary text-on-primary shadow-sm'
                : 'text-secondary hover:text-on-surface'
            }`}
          >
            1. PWA Directa
          </button>
          <button
            onClick={() => setActiveMethod('apk')}
            className={`py-2 px-1 rounded-xl text-xs font-bold transition-all ${
              activeMethod === 'apk'
                ? 'bg-primary text-on-primary shadow-sm'
                : 'text-secondary hover:text-on-surface'
            }`}
          >
            2. Generar APK
          </button>
          <button
            onClick={() => setActiveMethod('capacitor')}
            className={`py-2 px-1 rounded-xl text-xs font-bold transition-all ${
              activeMethod === 'capacitor'
                ? 'bg-primary text-on-primary shadow-sm'
                : 'text-secondary hover:text-on-surface'
            }`}
          >
            3. Android Studio
          </button>
        </div>

        {/* TAB 1: PWA Directa (El método estándar oficial para instalar la app) */}
        {activeMethod === 'pwa' && (
          <div className="flex flex-col gap-space-sm animate-in fade-in duration-150">
            <div className="bg-primary-fixed/20 border border-primary/20 rounded-2xl p-space-sm flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-primary text-lg">recommend</span>
                <span className="font-bold text-xs text-primary uppercase tracking-wider">
                  Método Más Rápido (Sin instalar APK manual)
                </span>
              </div>
              <p className="text-xs text-on-surface leading-relaxed">
                Puedes instalar <strong>Velox Courier</strong> directamente en la pantalla de inicio de tu teléfono Android como una aplicación completa:
              </p>
              <ul className="text-xs text-secondary space-y-1 pl-4 list-disc">
                <li>Se abre en pantalla completa sin barra de navegación.</li>
                <li>Icono en tu cajón de aplicaciones y escritorio.</li>
                <li>No requiere activar "orígenes desconocidos".</li>
                <li>Soporte sin conexión y actualizaciones automáticas instantáneas.</li>
              </ul>
            </div>

            {canPromptDirectly ? (
              <button
                onClick={handleInstallClick}
                className="w-full h-12 bg-primary hover:bg-primary-container text-on-primary font-bold rounded-xl shadow-md flex items-center justify-center gap-2 active:scale-95 transition-all cursor-pointer text-sm"
              >
                <span className="material-symbols-outlined text-lg">download</span>
                <span>Instalar Velox Courier en mi Teléfono</span>
              </button>
            ) : (
              <div className="bg-surface-container-low rounded-2xl p-space-sm flex flex-col gap-2.5">
                <span className="font-bold text-xs text-on-surface">
                  Cómo instalar desde tu móvil (Chrome en Android):
                </span>
                <div className="flex items-start gap-2.5 text-xs text-secondary">
                  <span className="w-5 h-5 rounded-full bg-primary text-on-primary flex items-center justify-center font-bold text-[11px] shrink-0 mt-0.5">
                    1
                  </span>
                  <span>
                    Abre la app en el navegador <strong>Google Chrome</strong> de tu teléfono.
                  </span>
                </div>
                <div className="flex items-start gap-2.5 text-xs text-secondary">
                  <span className="w-5 h-5 rounded-full bg-primary text-on-primary flex items-center justify-center font-bold text-[11px] shrink-0 mt-0.5">
                    2
                  </span>
                  <span>
                    Toca el botón de <strong>menú de 3 puntos (⋮)</strong> en la esquina superior derecha.
                  </span>
                </div>
                <div className="flex items-start gap-2.5 text-xs text-secondary">
                  <span className="w-5 h-5 rounded-full bg-primary text-on-primary flex items-center justify-center font-bold text-[11px] shrink-0 mt-0.5">
                    3
                  </span>
                  <span>
                    Selecciona <strong>"Instalar aplicación"</strong> o <strong>"Añadir a la pantalla de inicio"</strong>.
                  </span>
                </div>
              </div>
            )}

            <div className="flex items-center gap-2 bg-surface-container-low p-2.5 rounded-xl text-xs">
              <span className="text-secondary truncate flex-1">{appUrl}</span>
              <button
                onClick={handleCopyUrl}
                className="px-2.5 py-1 bg-surface-container-lowest text-primary font-bold rounded-lg border border-surface-container text-xs flex items-center gap-1 hover:bg-surface-container cursor-pointer"
              >
                <span className="material-symbols-outlined text-sm">
                  {copiedUrl ? 'check' : 'content_copy'}
                </span>
                {copiedUrl ? 'Copiado' : 'Copiar URL'}
              </button>
            </div>
          </div>
        )}

        {/* TAB 2: Generar APK mediante PWABuilder */}
        {activeMethod === 'apk' && (
          <div className="flex flex-col gap-space-sm animate-in fade-in duration-150">
            <div className="bg-surface-container-low rounded-2xl p-space-sm flex flex-col gap-2">
              <span className="font-bold text-xs text-on-surface flex items-center gap-1.5">
                <span className="material-symbols-outlined text-primary text-base">android</span>
                Generar paquete APK o AAB para Android
              </span>
              <p className="text-xs text-secondary leading-relaxed">
                Gracias a que Velox Courier cuenta con el <strong>Web App Manifest y Service Worker</strong> configurados, puedes generar un archivo <code>.apk</code> descargable en 30 segundos mediante <strong>PWABuilder</strong> (herramienta oficial impulsada por Microsoft y la comunidad web de Google).
              </p>
            </div>

            <div className="bg-surface-container-low rounded-2xl p-space-sm flex flex-col gap-2">
              <span className="text-xs font-bold text-on-surface">Instrucciones para descargar el APK:</span>
              <ol className="text-xs text-secondary space-y-1.5 list-decimal pl-4">
                <li>Haz clic en el botón de abajo para abrir PWABuilder.</li>
                <li>Verás la calificación perfecta de la app (Manifest, Service Worker, Seguridad).</li>
                <li>Toca en <strong>"Package for Android"</strong>.</li>
                <li>Descarga el archivo <strong>.apk</strong> generado e instálalo directamente en tu teléfono.</li>
              </ol>
            </div>

            <a
              href={pwaBuilderUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full h-12 bg-primary hover:bg-primary-container text-on-primary font-bold rounded-xl shadow-md flex items-center justify-center gap-2 active:scale-95 transition-all text-sm cursor-pointer"
            >
              <span className="material-symbols-outlined text-lg">open_in_new</span>
              <span>Generar APK en PWABuilder</span>
            </a>
          </div>
        )}

        {/* TAB 3: Compilar con Capacitor / Android Studio */}
        {activeMethod === 'capacitor' && (
          <div className="flex flex-col gap-space-sm animate-in fade-in duration-150">
            <div className="bg-surface-container-low rounded-2xl p-space-sm flex flex-col gap-2">
              <span className="font-bold text-xs text-on-surface flex items-center gap-1.5">
                <span className="material-symbols-outlined text-primary text-base">code</span>
                Compilar APK nativo con Android Studio
              </span>
              <p className="text-xs text-secondary leading-relaxed">
                Si deseas compilar tu propio APK nativo firmado o publicarlo en Google Play Store con tu cuenta de desarrollador:
              </p>
            </div>

            <div className="bg-surface-container-lowest border border-surface-container rounded-2xl p-3 font-mono text-[11px] text-on-surface flex flex-col gap-1.5">
              <span className="text-secondary font-sans font-bold text-xs">Pasos en terminal:</span>
              <div className="bg-surface-container-low p-2 rounded-lg select-all">
                # 1. Exporta el código en ZIP desde Ajustes<br/>
                # 2. En tu computadora ejecuta:<br/>
                npm install<br/>
                npm run build<br/>
                npx cap add android<br/>
                npx cap open android
              </div>
              <span className="text-secondary font-sans text-xs">
                Luego en Android Studio haz clic en <strong>Build &gt; Build Bundle(s) / APK(s) &gt; Build APK(s)</strong>.
              </span>
            </div>
          </div>
        )}

        {/* Close Button */}
        <button
          onClick={onClose}
          className="w-full py-2.5 rounded-xl bg-surface-container hover:bg-surface-container-high text-on-surface font-bold text-xs transition-colors cursor-pointer"
        >
          Cerrar
        </button>
      </div>
    </div>
  );
};
