import NaverMap from '@/shared/components/navermap/NaverMap';
import TopBarMap from '@/shared/components/topbar/TopBarMap';

const CorkageMap = () => {
  return (
    <main>
      <div className="absolute left-0 top-[6.57%] z-10">
        <TopBarMap searchDisabled={false} />
      </div>
      <NaverMap />
    </main>
  );
};

export default CorkageMap;
