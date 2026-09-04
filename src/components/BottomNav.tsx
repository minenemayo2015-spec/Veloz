import React from 'react';
import { ScreenId } from '../types';

interface BottomNavProps {
  currentScreen: ScreenId;
  onNavigate: (screen: ScreenId) => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({ currentScreen, onNavigate }) => {
  return (
    <nav className="fixed bottom-0 inset-x-0 z-50 pb-safe bg-surface-container-lowest/95 backdrop-blur-xl border-t border-surface-container-low shadow-[0_-4px_16px_rgba(0,0,0,0.06)]">
      <div className="max-w-md mx-auto flex justify-around items-center h-16 px-space-xs">
        {/* Inicio */}
        <button
          onClick={() => onNavigate('inicio')}
          className={`flex flex-col items-center justify-center gap-space-2xs min-w-[64px] min-h-[44px] transition-colors ${
            currentScreen === 'inicio'
              ? 'text-primary font-bold'
              : 'text-secondary hover:text-on-surface'
          }`}
        >
          <span
            className="material-symbols-outlined text-[24px]"
            style={{ fontVariationSettings: currentScreen === 'inicio' ? "'FILL' 1" : "'FILL' 0" }}
          >
            home
          </span>
          <span className="font-label-sm text-label-sm">Inicio</span>
        </button>

        {/* Nuevo Envío (Hero center button) */}
        <button
          onClick={() => onNavigate('nuevo-envio')}
          className="flex flex-col items-center justify-center gap-space-2xs min-w-[64px] min-h-[44px] -mt-5 group"
        >
          <div
            className={`w-12 h-12 rounded-full flex items-center justify-center text-on-primary transition-all duration-200 active:scale-95 ${
              currentScreen === 'nuevo-envio'
                ? 'bg-primary shadow-[0_6px_18px_0_rgba(163,57,0,0.45)] ring-4 ring-primary-fixed'
                : 'bg-primary shadow-[0_4px_14px_0_rgba(163,57,0,0.35)] group-hover:scale-105'
            }`}
          >
            <span className="material-symbols-outlined text-[26px]">add_box</span>
          </div>
          <span
            className={`font-label-sm text-label-sm ${
              currentScreen === 'nuevo-envio'
                ? 'text-primary font-bold'
                : 'text-on-surface-variant font-semibold'
            }`}
          >
            Nuevo Envío
          </span>
        </button>

        {/* Rastreo */}
        <button
          onClick={() => onNavigate('rastreo')}
          className={`flex flex-col items-center justify-center gap-space-2xs min-w-[64px] min-h-[44px] transition-colors relative ${
            currentScreen === 'rastreo'
              ? 'text-primary font-bold'
              : 'text-secondary hover:text-on-surface'
          }`}
        >
          <span
            className="material-symbols-outlined text-[24px]"
            style={{ fontVariationSettings: currentScreen === 'rastreo' ? "'FILL' 1" : "'FILL' 0" }}
          >
            location_on
          </span>
          <span className="font-label-sm text-label-sm">Rastreo</span>
          {/* Subtle live indicator dot */}
          <span className="absolute top-2 right-4 w-2 h-2 rounded-full bg-primary animate-pulse"></span>
        </button>

        {/* Historial */}
        <button
          onClick={() => onNavigate('historial')}
          className={`flex flex-col items-center justify-center gap-space-2xs min-w-[64px] min-h-[44px] transition-colors ${
            currentScreen === 'historial'
              ? 'text-primary font-bold'
              : 'text-secondary hover:text-on-surface'
          }`}
        >
          <span
            className="material-symbols-outlined text-[24px]"
            style={{ fontVariationSettings: currentScreen === 'historial' ? "'FILL' 1" : "'FILL' 0" }}
          >
            history
          </span>
          <span className="font-label-sm text-label-sm">Historial</span>
        </button>
      </div>
    </nav>
  );
};
