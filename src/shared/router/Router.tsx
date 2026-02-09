import { createBrowserRouter } from 'react-router-dom';
import Store from '../../pages/home/StoreList';
import HotStores from '../../pages/home/HotStores';
import RegionFilter from '../../pages/home/RegionFilter';
import Doit from '@/pages/doit/Doit';
import DoitList from '@/pages/doit/DoitList';
import Search from '../../pages/doit/Search';
import SearchMap from '@/pages/search/SearchMap';
import NotRegistered from '../../pages/doit/NotRegistered';
import AlreadyRegistered from '../../pages/doit/AlreadyRegistered';
import Request from '../../pages/doit/Request';
import DoitComplete from '../../pages/doit/DoitComplete';
// import OnBoarding from '@/pages/onBoarding/OnBoarding';
import SignIn from '@/pages/signIn/SignIn';
import StoreCheck from '@/pages/add/StoreCheck';
import SearchStore from '@/pages/add/SearchStore';
import AddOption from '@/pages/add/AddOption';
import PreferSelect from '@/pages/onBoarding/PreferSelect';
import CorkageMap from '@/pages/corkagemap/CorkageMap';
import Filter from '../../pages/corkagemap/Filter';
import Info from '@/pages/detail/Info';
import Review from '@/shared/components/detail/Review';
import MainMyPage from '@/pages/myPage/MainMyPage';
import MasterSignUp from '@/pages/myPage/MasterSignUp';
import ModifyInfo from '@/pages/myPage/ModifyInfo';
import Reservation from '@/pages/myPage/Reservation';
import MyReview from '@/pages/myPage/MyReview';
import Contact from '@/pages/myPage/Contact';
import FilterResult from '@/pages/corkagemap/FilterResult';
import Notification from '@/pages/notification/Notification';
import Tip from '@/pages/home/Tip';
import CorkStores from '@/pages/home/CorkStores';
import Keep from '@/pages/keep/Keep';
import NaverCallback from '@/pages/signIn/NaverCallback';
import ReservateDrink from '@/pages/reservation/ReservateDrink';
import MainLayout from '../components/layout/Layout';
import SearchMapResult from '@/pages/search/SearchMapResult';
import ChooseRole from '../components/myPage/ChooseRole';
import { RootRedirect } from './RootRedirect';
import Toc from '@/pages/myPage/Toc';
import ExamplePage from '@/pages/ExamplePage';
import ExamplePage2 from '@/pages/ExamplePage2';
import NotiPost from '../components/notification/NotiPost';
import NewStores from '@/pages/home/NewStores';
import CorkageReview from '@/pages/home/CorkageReview';
import DoitRequest from '@/pages/doit/DoitRequest';
import CategoryStores from '@/pages/home/CategoryStores';
import NearbyStores from '@/pages/home/NearbyStores';
import RoleSelectionComplete from '@/pages/myPage/RoleSelectionComplete';
import RequestList from '@/pages/myPage/RequestList';

const router = createBrowserRouter([
  // {
  //   path: '/',
  //   element: <Test />,
  // },
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <RootRedirect />,
      },
      {
        path: 'home',
        element: <Store />,
      },
      {
        path: 'corkScore',
        element: <CorkStores />,
      },
      {
        path: 'searchMap',
        element: <SearchMap />,
      },
      {
        path: 'searchMap/result',
        element: <SearchMapResult />,
      },
      {
        path: 'hot-stores',
        element: <HotStores />,
      },
      {
        path: 'region-filter',
        element: <RegionFilter />,
      },
      {
        path: 'doit',
        element: <Doit />,
      },
      {
        path: 'doit/list',
        element: <DoitList />,
      },
      {
        path: 'doit/request',
        element: <DoitRequest />,
      },
      {
        path: 'doit/search',
        element: <Search />,
      },
      {
        path: 'doit/search/request/1',
        element: <NotRegistered />,
      },
      {
        path: 'doit/search/request/2',
        element: <AlreadyRegistered />,
      },
      {
        path: 'doit/request/:restaurantId',
        element: <Request />,
      },
      {
        path: 'doit/complete',
        element: <DoitComplete />,
      },
      // {
      //   path: 'onboarding',
      //   element: <OnBoarding />,
      // },
      {
        path: 'signin',
        element: <SignIn />,
      },
      {
        path: 'add/storecheck/:restaurantId',
        element: <StoreCheck />,
      },
      {
        path: 'add/search',
        element: <SearchStore />,
      },
      {
        path: 'add/option',
        element: <AddOption />,
      },
      {
        path: 'onboarding/prefer',
        element: <PreferSelect />,
      },
      {
        path: 'corkagemap',
        element: <CorkageMap />,
      },
      {
        path: 'corkagemap/filter',
        element: <Filter />,
      },
      {
        path: 'detail-info/:id',
        element: <Info />,
      },
      {
        path: 'review',
        element: <Review />,
      },
      {
        path: 'my',
        element: <MainMyPage />,
      },
      {
        path: 'my/role',
        element: <ChooseRole />,
      },
      {
        path: 'my/role/complete',
        element: <RoleSelectionComplete />,
      },
      {
        path: 'master/signup',
        element: <MasterSignUp />,
      },
      {
        path: 'my/modify',
        element: <ModifyInfo />,
      },
      {
        path: 'my/reservation',
        element: <Reservation />,
      },
      {
        path: 'my/review',
        element: <MyReview />,
      },
      {
        path: 'my/contact',
        element: <Contact />,
      },
      {
        path: 'my/request-list',
        element: <RequestList />,
      },
      {
        path: 'my/toc',
        element: <Toc />,
      },
      {
        path: 'corkagemap/filter/result',
        element: <FilterResult />,
      },
      {
        path: 'notification',
        element: <Notification />,
      },
      {
        path: 'notification/:id',
        element: <NotiPost />,
      },
      {
        path: 'tip-article/:id',
        element: <Tip />,
      },
      {
        path: 'keep',
        element: <Keep />,
      },
      {
        path: 'signin/callback',
        element: <NaverCallback />,
      },
      {
        path: 'reservate',
        element: <ReservateDrink />,
      },
      {
        path: 'new-stores',
        element: <NewStores />,
      },
      {
        path: 'category-stores',
        element: <CategoryStores />,
      },
      {
        path: 'nearby-stores',
        element: <NearbyStores />,
      },
      {
        path: 'corkage-review',
        element: <CorkageReview />,
      },
      {
        path: 'example',
        element: <ExamplePage />,
      },
      {
        path: 'example2',
        element: <ExamplePage2 />,
      },
    ],
  },
]);

export default router;
