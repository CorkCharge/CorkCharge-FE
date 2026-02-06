export interface RestaurantResponse {
  restaurantId: number;
  restaurantName: string;
  address: string;
  rating: number;
  reviewCount: number;
  corkagePrice: string;
  corkageOptions: string[];
  distance: number; // km 기준
  mainImageUrls: string;
  openingHours: string;
  bookmarkCount: number;
}

export interface StoreCard {
  restaurantId: number;
  restaurantName: string;
  rating: number;
  reviewCount: number;
  corkagePrice: string;
  mainImageUrls: string;
}

export interface RestaurantScrapResponse extends RestaurantResponse {
  scrap: boolean;
}

export interface RestaurantSearchResponse {
  restaurantId: number;
  name: string;
  rating: number;
  reviewCount: number;
  openingHours: string;
  corkagePrice: string;
  corkageOptions: string[];
  imageUrls: string[];
  scrap: false;
  latitude: number;
  longitude: number;
}

// export interface HomeStoreResponse {
//   nearbyCard: StoreCard;
//   recommendCard: StoreCard;
// }
