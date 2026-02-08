import { SyncLoader } from 'react-spinners';
import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

import apiClient from '@/shared/apis/apiClient';
import useAuthStore from '@/shared/store/useAuthStore';
import { fetchMyReviews, fetchMyTips } from '@/shared/apis/bookmark/bookmarkApi';
import useBookmarkStore from '@/shared/store/useBookmarkStore';
import { type MyReviewResponse, type MyTipsResponse } from '@/shared/apis/bookmark/bookmarks.type';
import { getBookmarkGroupDetail, getBookmarkGroups } from '@/shared/apis/bookmark/bookmark.api';

function NaverCallback() {
  const [params] = useSearchParams();
  const navigate = useNavigate();

  const { login } = useAuthStore();
  const setSelectedTips = useBookmarkStore((state) => state.setSelectedTips);
  // const setSelectedStores = useBookmarkStore((state) => state.setSelectedStores);
  const setSelectedReviews = useBookmarkStore((state) => state.setSelectedReviews);
  const linkRestaurantsToGroup = useBookmarkStore((state) => state.linkRestaurantsToGroup);

  useEffect(() => {
    loginProcess();
  }, []);

  const loginProcess = async () => {
    const code = params.get('code');
    const state = params.get('state');
    let loginOk;
    let loginResponse;

    // 로그인 시도
    try {
      loginResponse = await apiClient.get('/oauth/naver/login', { params: { code, state } });
      loginOk = login(loginResponse.data.data);
    } catch (e) {
      console.error('로그인 실패 : ' + e);
      alert('로그인에 실패하였습니다. 잠시 후 다시 시도해주세요');
      navigate('/signin');
      return;
    }

    // 내가 저장한 팁들 가져오기
    try {
      const tipsRes = await fetchMyTips();
      setSelectedTips(tipsRes.map((res: MyTipsResponse) => res.tipId));
    } catch (e) {
      console.error('저장한 팁 가져오기 실패: ' + e);
      navigate('/signin');
    }

    // 내가 저장한 가게들 가져오기
    try {
      const storesRes = await getBookmarkGroups();
      const groupList = storesRes.data.groups;
      const groupIds = groupList.map((group) => group.groupId);

      await Promise.all(
        groupIds.map(async (gId) => {
          const res = await getBookmarkGroupDetail(gId, 'LATEST');
          const restaurantIds = res.data.restaurants.map((rs) => rs.restaurantId);
          linkRestaurantsToGroup(restaurantIds, gId);
        })
      );
    } catch (e) {
      console.error('저장한 가게 가져오기 실패: ' + e);
      navigate('/signin');
    }

    // 내가 저장한 리뷰들 가져오기
    try {
      const reviewsRes = await fetchMyReviews();
      setSelectedReviews(reviewsRes.map((res: MyReviewResponse) => res.reviewId));
    } catch (e) {
      console.error('저장한 리뷰 가져오기 실패: ' + e);
      navigate('/signin');
    }

    if (loginOk) {
      if (loginResponse?.data.data.role) navigate('/home');
      else navigate('/my/role');
    }

    // return true;
  };

  return (
    <div className="flex h-screen items-center justify-center">
      <SyncLoader color={'var(--primary)'} />
    </div>
  );
}

export default NaverCallback;
