export type ScreenId = 'inicio' | 'nuevo-envio' | 'rastreo' | 'historial';

export type PackageType = 'doc' | 'small' | 'medium' | 'special';

export type ShippingModeId = 'flash' | 'same_day' | 'scheduled';

export interface ShippingModeOption {
  id: ShippingModeId;
  name: string;
  badge?: string;
  subtext: string;
  price: number;
  baseFee: number;
  insuranceFee: number;
  eta: string;
}

export interface PackageTypeOption {
  id: PackageType;
  title: string;
  weightLimit: string;
  dimensions: string;
  description: string;
  icon: string;
}

export interface ShipmentItem {
  id: string; // e.g. '#VX-94821'
  title: string;
  category: string;
  status: 'en_ruta' | 'clasificacion' | 'entregado' | 'incidencia';
  statusLabel: string;
  etaTime?: string;
  courier?: {
    name: string;
    vehicle: string;
    phone: string;
    avatarUrl: string;
    rating: number;
    deliveriesCount: number;
    licensePlate: string;
  };
  pickupAddress: string;
  deliveryAddress: string;
  recipientName: string;
  deliveryDate?: string;
  proofPhotoUrl?: string;
  hasSignature?: boolean;
  otp?: string;
  rating?: number;
  incidentNote?: string;
  totalPrice?: number;
}
