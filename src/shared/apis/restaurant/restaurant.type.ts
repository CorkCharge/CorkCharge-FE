export interface NearRestaurantResponse {
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
