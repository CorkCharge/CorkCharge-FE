import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { ClipLoader } from 'react-spinners';

import DetailHeader from '@/shared/components/detail/DetailHeader';
import DetailInfoSection from '@/shared/components/detail/DetailInfoSection';
import { fetchRestaurant, type RestaurantInfo } from '@/shared/apis/restaurant/corkageApi';
import useRestaurantStore from '@/shared/store/useRestaurantStore';
import { fetchStoreReviews } from '@/shared/apis/review/review.api';
import { type StoreReviewResponse } from '@/shared/apis/review/review.type';
import useBookmarkStore from '@/shared/store/useBookmarkStore';
// import { getBookmarkGroupDetail, getBookmarkGroups } from '@/shared/apis/bookmark/bookmark.api';

const Info = () => {
  const { id } = useParams<{ id: string }>();
  const restaurantId = Number(id);

  const [restaurant, setRestaurant] = useState<RestaurantInfo>();
  const [reviews, setReviews] = useState<StoreReviewResponse[]>([]);

  const [isLoading, setIsLoading] = useState(true);
  const [fetchFail, setFetchFail] = useState(false);

  const setRestInfo = useRestaurantStore((state) => state.setRestInfo);
  const setReviewCount = useBookmarkStore((state) => state.setReviewCount);
  // const linkRestaurantsToGroup = useBookmarkStore((state) => state.linkRestaurantsToGroup);

  useEffect(() => {
    if (!id) {
      console.error('잘못된 가게 id');
      return;
    }

    // temp();
    getRestaurantInfo();
    getReviews();
  }, [id]);

  // const temp = async () => {
  //   try {
  //     const storesRes = await getBookmarkGroups();
  //     const groupList = storesRes.data.groups;
  //     const groupIds = groupList.map((group) => group.groupId);

  //     await Promise.all(
  //       groupIds.map(async (gId) => {
  //         const res = await getBookmarkGroupDetail(gId, 'LATEST');
  //         const restaurantIds = res.data.restaurants.map((rs) => rs.restaurantId);
  //         if (restaurantIds.length > 0) linkRestaurantsToGroup(restaurantIds, gId);
  //       })
  //     );
  //   } catch (e) {
  //     console.error('저장한 가게 가져오기 실패: ' + e);
  //   }
  // };

  // 가게 정보 가져오기
  const getRestaurantInfo = async () => {
    setIsLoading(true);
    try {
      const res = await fetchRestaurant(restaurantId);
      setRestaurant(res);
      setRestInfo(res);
    } catch (e) {
      setFetchFail(true);
      console.error('가게 정보 가져오기 실패: ' + e);
    } finally {
      setIsLoading(false);
    }
  };

  // 가게 리뷰들 가져오기
  const getReviews = async () => {
    try {
      const res: StoreReviewResponse[] = await fetchStoreReviews(restaurantId);

      // 북마크 카운트 store 저장
      const bookmarkCounts = res.reduce<Record<number, number>>((acc, rev) => {
        acc[rev.reviewId] = rev.bookmarkCount;
        return acc;
      }, {});
      setReviewCount(bookmarkCounts);

      setReviews(res);
    } catch (e) {
      console.error('가게 리뷰 가져오기 실패: ' + e);
    }
  };

  const renderHeader = () => {
    if (fetchFail) {
      return (
        <p className="flex min-h-[100svh] items-center justify-center bg-inherit">
          가게 정보를 불러오는데 실패하였습니다.
        </p>
      );
    }

    if (isLoading) {
      return (
        <div className="flex h-[70svh] w-full items-center justify-center">
          <ClipLoader color="var(--primary)" />
        </div>
      );
    }

    if (!restaurant) {
      return (
        <p className="flex min-h-[100svh] items-center justify-center bg-inherit">
          가게 정보를 불러오는데 실패하였습니다.
        </p>
      );
    }

    return <DetailHeader restaurant={restaurant} />;
  };

  return (
    <div className="flex flex-col items-center">
      <div className="w-full">{renderHeader()}</div>

      {restaurant && <DetailInfoSection restaurant={restaurant} reviews={reviews} />}
    </div>
  );
};

export default Info;
