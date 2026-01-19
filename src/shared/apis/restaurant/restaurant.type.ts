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
}

export interface StoreCard {
  restaurantId: number;
  restaurantName: string;
  rating: number;
  reviewCount: number;
  corkagePrice: string;
  mainImageUrls: string;
}
// export interface HomeStoreResponse {
//   nearbyCard: StoreCard;
//   recommendCard: StoreCard;
// }
