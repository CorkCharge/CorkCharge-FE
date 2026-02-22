import { useNavigate } from 'react-router-dom';

import Header from '@/shared/components/common/Header';
import { useMasterStores } from '@/shared/queries/user/useMasterStores';
import MyStoreItem from '@/shared/components/myPage/MyStoreItem';

const MasterStoreList = () => {
  const navigate = useNavigate();

  const { data: stores } = useMasterStores();

  const renderStores = () =>
    stores?.map((store) => <MyStoreItem key={store.restaurantId} store={store} />);

  return (
    <div className="px-4">
      <Header title="내 가게 목록" type="back" backFn={() => navigate(-1)} />
      <div className="flex flex-col gap-6">{renderStores()}</div>
    </div>
  );
};
export default MasterStoreList;
