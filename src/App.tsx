/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { ScreenId } from './types';
import { Header } from './components/Header';
import { BottomNav } from './components/BottomNav';
import { HomeScreen } from './views/HomeScreen';
import { NewShipmentScreen } from './views/NewShipmentScreen';
import { TrackingScreen } from './views/TrackingScreen';
import { HistoryScreen } from './views/HistoryScreen';
import { ReceiptModal } from './components/ReceiptModal';
import { ChatModal } from './components/ChatModal';
import { InstallAppModal } from './components/InstallAppModal';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<ScreenId>('inicio');
  const [selectedReceiptId, setSelectedReceiptId] = useState<string | null>(null);
  const [chatOpen, setChatOpen] = useState(false);
  const [installModalOpen, setInstallModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage((curr) => (curr === message ? null : curr));
    }, 3200);
  };

  const handleQuickTrack = (trackingNumber: string) => {
    showToast(`Rastreando guía ${trackingNumber}...`);
    setCurrentScreen('rastreo');
  };

  const handleShipmentCreated = (trackingId: string) => {
    showToast(`¡Envío ${trackingId} registrado con éxito! Motorizado en camino.`);
    setCurrentScreen('rastreo');
  };

  const handleDownloadReceipt = () => {
    showToast(`Descargando comprobante fiscal PDF con firma digital...`);
    setSelectedReceiptId(null);
  };

  return (
    <div className="bg-surface font-body-md text-on-surface flex flex-col min-h-screen selection:bg-primary-fixed selection:text-on-primary-fixed">
      {/* Toast Notification Banner */}
      {toastMessage && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 max-w-sm w-[90%] bg-on-background/90 backdrop-blur-md text-surface py-2.5 px-4 rounded-2xl shadow-xl flex items-center justify-between gap-2 border border-white/10 animate-in fade-in slide-in-from-top-4 duration-200">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-primary text-sm font-bold">
              check_circle
            </span>
            <span className="text-xs font-semibold leading-tight">{toastMessage}</span>
          </div>
          <button
            onClick={() => setToastMessage(null)}
            className="text-surface/70 hover:text-surface p-1"
          >
            <span className="material-symbols-outlined text-xs">close</span>
          </button>
        </div>
      )}

      {/* Screen Switcher Quick Selector (Desktop / Tester convenience bar) */}
      <div className="hidden lg:flex fixed top-3 right-4 z-50 bg-surface-container-lowest/90 backdrop-blur-md px-3 py-1.5 rounded-full border border-surface-container shadow-md text-xs items-center gap-2">
        <span className="text-secondary font-semibold">Pantalla:</span>
        {(['inicio', 'nuevo-envio', 'rastreo', 'historial'] as ScreenId[]).map((scr) => (
          <button
            key={scr}
            onClick={() => setCurrentScreen(scr)}
            className={`px-2.5 py-1 rounded-full text-[11px] font-bold transition-colors ${
              currentScreen === 'scr' || currentScreen === scr
                ? 'bg-primary text-on-primary'
                : 'bg-surface-container hover:bg-surface-container-high text-secondary'
            }`}
          >
            {scr === 'inicio'
              ? '1. Inicio'
              : scr === 'nuevo-envio'
              ? '2. Nuevo Envío'
              : scr === 'rastreo'
              ? '3. Rastreo'
              : '4. Historial'}
          </button>
        ))}
      </div>

      {/* Top Header */}
      <Header
        currentScreen={currentScreen}
        onNavigate={setCurrentScreen}
        onOpenInstallModal={() => setInstallModalOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex flex-col relative w-full pt-16 pb-24 bg-surface min-h-screen">
        {currentScreen === 'inicio' && (
          <HomeScreen
            onNavigate={setCurrentScreen}
            onOpenChat={() => setChatOpen(true)}
            onQuickTrack={handleQuickTrack}
            onOpenInstallModal={() => setInstallModalOpen(true)}
          />
        )}

        {currentScreen === 'nuevo-envio' && (
          <NewShipmentScreen
            onNavigate={setCurrentScreen}
            onShipmentCreated={handleShipmentCreated}
          />
        )}

        {currentScreen === 'rastreo' && (
          <TrackingScreen
            onNavigate={setCurrentScreen}
            onOpenChat={() => setChatOpen(true)}
            onShowToast={showToast}
          />
        )}

        {currentScreen === 'historial' && (
          <HistoryScreen
            onNavigate={setCurrentScreen}
            onOpenReceipt={(id) => setSelectedReceiptId(id)}
            onShowToast={showToast}
          />
        )}
      </main>

      {/* Persistent Bottom Navigation */}
      <BottomNav currentScreen={currentScreen} onNavigate={setCurrentScreen} />

      {/* Detailed Digital Receipt Modal */}
      <ReceiptModal
        shipmentId={selectedReceiptId}
        onClose={() => setSelectedReceiptId(null)}
        onDownload={handleDownloadReceipt}
      />

      {/* Live Courier Chat Modal */}
      <ChatModal isOpen={chatOpen} onClose={() => setChatOpen(false)} />

      {/* Install Mobile PWA / APK Modal */}
      <InstallAppModal
        isOpen={installModalOpen}
        onClose={() => setInstallModalOpen(false)}
        onShowToast={showToast}
      />
    </div>
  );
}
