export interface UserProfile {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  school: string;
  rating?: number;
  reviews?: number;
  isHelper: boolean;
}

export interface MoveRequest {
  id: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  title: string;
  description: string;
  location: {
    address: string;
    lat: number;
    lng: number;
  };
  date: string;
  time: string;
  price: number;
  isHourly: boolean;
  estimatedHours?: number;
  status: 'open' | 'assigned' | 'completed';
  helperId?: string;
  createdAt: string;
}

export interface Review {
  id: string;
  fromUserId: string;
  toUserId: string;
  rating: number;
  comment: string;
  date: string;
}

export type MapLocation = {
  lat: number;
  lng: number;
};

export interface MapMarker {
  id: string;
  position: MapLocation;
  title: string;
  price: number;
}