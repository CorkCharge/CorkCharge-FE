import Header from '@/shared/components/corkagemap/list/Header';
import RestaurantBox from '@/shared/components/corkagemap/list/RestaurantBox';

const RestaurantsList = () => {
  return (
    <main className="relative flex min-h-screen flex-col items-center">
      <Header />
      <div className="overflow-y-auto pb-[120px] pt-[48px]">
        <RestaurantBox />
        <RestaurantBox />
        <RestaurantBox />
        <RestaurantBox />
        <RestaurantBox />
        <RestaurantBox />
      </div>
    </main>
  );
};

export default RestaurantsList;
