import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { ClipLoader } from 'react-spinners';

import { useGetGroupList } from '@/shared/queries/bookmark/useGetGroupList';
import { GROUP_ICONS } from '@/shared/constants/groupMarker';
import StoreCard from './StoreCard';

import arrow from '@/shared/assets/selectArrow.svg';
import { useGetGroupItems } from '@/shared/queries/bookmark/useGetGroupItems';

const RESTAURANT_ORDER_BY = {
  LATEST: '최신순',
  REVIEW_COUNT_DESC: '리뷰많은순',
  RATING_DESC: '리뷰높은순',
};
type RestaurantOrderKey = keyof typeof RESTAURANT_ORDER_BY;

function MyStoreList() {
  const [isOrderDrop, setIsOrderDrop] = useState(false);
  const [orderBy, setOrderBy] = useState<RestaurantOrderKey>('LATEST');
  const [isGroupDrop, setIsGroupDrop] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState('');
  const [howManyStore, setHowManyStore] = useState(0); // 특정 그룹 안의 매장 수
  const [selectedGpIcon, setSelectedGpIcon] = useState('');
  const [selectedGpId, setSelectedGpId] = useState<number>();

  const { data } = useGetGroupList();
  const groups = data?.groups;
  const { data: groupItemsResponse, isLoading } = useGetGroupItems(selectedGpId, orderBy);
  const groupItems = groupItemsResponse?.restaurants;

  useEffect(() => {
    if (!groups || groups.length < 1) return;
    setSelectedGroup(groups[0].name);
    setHowManyStore(groups[0].storeCount);
    setSelectedGpIcon(groups[0].color);
    setSelectedGpId(groups[0].groupId);
  }, [groups]);

  // 드롭 다운에서 그룹 선택 시
  const handleGroupClick = (gName: string, storeCount: number, gColor: string, gId: number) => {
    setSelectedGroup(gName);
    setIsGroupDrop(false);
    setHowManyStore(storeCount);
    setSelectedGpIcon(gColor);
    setSelectedGpId(gId);
  };

  const renderStoreCards = () =>
    groupItems?.map((rest) => (
      <StoreCard key={rest.restaurantId} restaurant={rest} groupMarker={selectedGpIcon} />
    ));

  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <span className="font-medium text-[var(--gray-6)]">{howManyStore}개 매장</span>
        <div className="flex gap-2">
          <div className="relative z-[2] rounded-full bg-[var(--gray-1)] px-3 py-2 text-sm font-medium text-[var(--gray-6)]">
            <div
              className="flex cursor-pointer items-center text-nowrap"
              onClick={() => setIsGroupDrop((prev) => !prev)}
            >
              <span className="flex max-w-[150px] items-center gap-1 text-center">
                <img src={GROUP_ICONS[selectedGpIcon]} className="size-6" />
                {selectedGroup}
              </span>
              <img src={arrow} className="ml-2" />
            </div>

            <AnimatePresence>
              {isGroupDrop && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className={`absolute right-0 top-[130%] rounded-2xl bg-white px-3 py-2 shadow-lg`}
                >
                  <ul className="whitespace-nowrap text-center text-sm font-medium">
                    {groups?.map((g) => (
                      <li
                        key={g.groupId}
                        className={`flex cursor-pointer items-center gap-1 border-b px-2 py-1 ${selectedGroup === g.name ? 'text-[var(--primary)]' : 'text-[var(--gray-5)]'}`}
                        onClick={() => {
                          handleGroupClick(g.name, g.storeCount, g.color, g.groupId);
                        }}
                      >
                        <img src={GROUP_ICONS[g.color]} className="size-6" />
                        {g.name}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="relative z-[2] h-full rounded-full bg-[var(--gray-1)] px-3 py-2 text-sm font-medium text-[var(--gray-6)]">
            <div
              className="flex cursor-pointer items-center text-nowrap"
              onClick={() => setIsOrderDrop((prev) => !prev)}
            >
              <span className="w-[65px] text-center">{RESTAURANT_ORDER_BY[orderBy]}</span>
              <img src={arrow} className="ml-2" />
            </div>

            <AnimatePresence>
              {isOrderDrop && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className={`absolute right-0 top-[130%] rounded-2xl bg-white px-3 py-2 shadow-lg`}
                >
                  <ul className="whitespace-nowrap text-center text-sm font-medium">
                    {(Object.keys(RESTAURANT_ORDER_BY) as RestaurantOrderKey[]).map((ord, idx) => (
                      <li
                        key={idx}
                        className={`cursor-pointer border-b px-2 py-1 ${orderBy === ord ? 'text-[var(--primary)]' : 'text-[var(--gray-5)]'}`}
                        onClick={() => {
                          setOrderBy(ord);
                          setIsOrderDrop(false);
                        }}
                      >
                        {RESTAURANT_ORDER_BY[ord]}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {isLoading && (
        <div className="w-full py-10 text-center">
          <ClipLoader color="var(--primary)" />
        </div>
      )}
      <div className="mt-2 flex flex-col gap-6">{renderStoreCards()}</div>
    </div>
  );
}

export default MyStoreList;
