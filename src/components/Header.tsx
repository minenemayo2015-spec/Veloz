import React, { useState } from 'react';
import { ScreenId } from '../types';
import { ASSETS } from '../data/shipments';

interface HeaderProps {
  currentScreen: ScreenId;
  onNavigate?: (screen: ScreenId) => void;
  onOpenInstallModal?: () => void;
}

const SCREEN_TITLES: Record<ScreenId, string> = {
  inicio: 'Inicio',
  'nuevo-envio': 'Nuevo Envío',
  rastreo: 'Rastreo',
  historial: 'Historial',
};

export const Header: React.FC<HeaderProps> = ({ currentScreen, onNavigate, onOpenInstallModal }) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

  return (
    <header className="fixed top-0 inset-x-0 z-50 bg-surface/85 backdrop-blur-xl pt-safe shadow-[0_1px_8px_rgba(0,0,0,0.04)] border-b border-surface-container-low">
      <div className="max-w-md mx-auto h-16 px-space-md flex items-center justify-between">
        {/* Brand logo & screen title */}
        <button
          onClick={() => onNavigate && onNavigate('inicio')}
          className="flex items-center gap-space-xs text-left group focus:outline-none"
        >
          <img
            src={ASSETS.logo}
            onError={(e) => {
              // Fallback to remote url
              (e.target as HTMLImageElement).src = ASSETS.logoRemote;
            }}
            alt="Velox Courier Logo"
            className="h-8 w-auto object-contain transition-transform group-hover:scale-105"
          />
          <div className="flex flex-col">
            <span className="font-headline-sm text-headline-sm text-on-surface leading-none tracking-tight">
              Velox
            </span>
            <span className="font-label-sm text-label-sm text-primary tracking-wider uppercase font-bold">
              {SCREEN_TITLES[currentScreen]}
            </span>
          </div>
        </button>

        {/* Right side icons */}
        <div className="flex items-center gap-1.5 relative">
          {/* Install / APK button */}
          {onOpenInstallModal && (
            <button
              onClick={onOpenInstallModal}
              title="Instalar en teléfono o generar APK"
              className="flex items-center gap-1 px-2.5 py-1.5 rounded-full bg-primary-fixed text-primary text-xs font-bold hover:bg-primary hover:text-on-primary transition-all shadow-sm active:scale-95 cursor-pointer"
            >
              <span className="material-symbols-outlined text-base">install_mobile</span>
              <span className="hidden sm:inline">Instalar App</span>
            </button>
          )}

          {/* Notification button */}
          <button
            onClick={() => {
              setShowNotifications(!showNotifications);
              setShowProfile(false);
            }}
            aria-label="Ver notificaciones"
            className="w-11 h-11 relative rounded-full flex items-center justify-center text-on-surface-variant hover:text-on-surface hover:bg-surface-container-low transition-colors"
          >
            <span className="material-symbols-outlined">notifications</span>
            <span className="absolute top-2.5 right-2.5 w-2 h-2 rounded-full bg-primary ring-2 ring-surface"></span>
          </button>

          {/* Profile Avatar */}
          <button
            onClick={() => {
              setShowProfile(!showProfile);
              setShowNotifications(false);
            }}
            aria-label="Perfil de usuario"
            className="w-10 h-10 flex items-center justify-center rounded-full ring-2 ring-primary/20 hover:ring-primary transition-all overflow-hidden"
          >
            <img
              src={ASSETS.avatar}
              onError={(e) => {
                (e.target as HTMLImageElement).src = ASSETS.avatarRemote;
              }}
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </button>

          {/* Notifications Dropdown */}
          {showNotifications && (
            <div className="absolute right-0 top-14 w-72 bg-surface-container-lowest rounded-2xl shadow-xl border border-surface-container p-space-sm z-50 animate-in fade-in zoom-in-95 duration-150">
              <div className="flex items-center justify-between pb-2 border-b border-surface-container-low">
                <span className="font-label-md font-bold text-on-surface">Notificaciones</span>
                <span className="text-[11px] bg-primary-fixed text-on-primary-fixed px-1.5 py-0.5 rounded-full font-bold">2 nuevas</span>
              </div>
              <div className="flex flex-col gap-2 pt-2">
                <div 
                  onClick={() => {
                    setShowNotifications(false);
                    onNavigate && onNavigate('rastreo');
                  }}
                  className="p-2 rounded-xl bg-surface-container-low hover:bg-surface-container cursor-pointer transition-colors"
                >
                  <div className="flex items-center gap-1.5 text-xs text-primary font-bold">
                    <span className="material-symbols-outlined text-sm">delivery_dining</span>
                    <span>Guía #VX-94821</span>
                  </div>
                  <p className="text-xs text-on-surface font-medium mt-0.5">Mateo está a 4 cuadras de tu domicilio.</p>
                  <span className="text-[10px] text-secondary">Hace 3 min</span>
                </div>
                <div 
                  onClick={() => {
                    setShowNotifications(false);
                    onNavigate && onNavigate('historial');
                  }}
                  className="p-2 rounded-xl hover:bg-surface-container-low cursor-pointer transition-colors"
                >
                  <div className="flex items-center gap-1.5 text-xs text-tertiary font-bold">
                    <span className="material-symbols-outlined text-sm">check_circle</span>
                    <span>Guía #VX-93108 entregada</span>
                  </div>
                  <p className="text-xs text-on-surface mt-0.5">Mariana Silva firmó el comprobante con OTP 8931.</p>
                  <span className="text-[10px] text-secondary">Ayer 16:42</span>
                </div>
              </div>
            </div>
          )}

          {/* Profile Dropdown */}
          {showProfile && (
            <div className="absolute right-0 top-14 w-64 bg-surface-container-lowest rounded-2xl shadow-xl border border-surface-container p-space-md z-50 animate-in fade-in zoom-in-95 duration-150">
              <div className="flex items-center gap-space-xs pb-3 border-b border-surface-container-low">
                <img
                  src={ASSETS.avatar}
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = ASSETS.avatarRemote;
                  }}
                  alt="Carlos M."
                  className="w-11 h-11 rounded-full object-cover"
                />
                <div className="flex flex-col">
                  <span className="font-headline-sm text-sm font-bold text-on-surface">Carlos Mendoza</span>
                  <span className="text-xs text-secondary">carlos.m@empresa.pe</span>
                  <span className="text-[10px] text-primary font-bold uppercase mt-0.5">Cuenta Corporativa Gold</span>
                </div>
              </div>
              <div className="flex flex-col gap-1 pt-2 text-sm text-on-surface">
                <div className="flex items-center justify-between py-1.5 px-2 rounded-lg hover:bg-surface-container-low">
                  <span className="text-xs text-secondary">Saldo Prepago:</span>
                  <span className="font-bold text-primary text-xs">S/ 240.50</span>
                </div>
                <button
                  onClick={() => {
                    setShowProfile(false);
                    onNavigate && onNavigate('historial');
                  }}
                  className="flex items-center gap-2 py-1.5 px-2 rounded-lg hover:bg-surface-container-low text-xs font-medium text-left"
                >
                  <span className="material-symbols-outlined text-sm text-secondary">receipt</span>
                  Mis Facturas y Comprobantes
                </button>
                <button
                  onClick={() => setShowProfile(false)}
                  className="flex items-center gap-2 py-1.5 px-2 rounded-lg hover:bg-surface-container-low text-xs font-medium text-left text-secondary"
                >
                  <span className="material-symbols-outlined text-sm">settings</span>
                  Preferencias de Envío
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
