import { createBrowserRouter } from 'react-router-dom';
import Test from '../../pages/Test';
import Store from '../../pages/home/StoreList';
import HotStores from '../../pages/home/HotStores';
import RegionFilter from '../../pages/home/RegionFilter';
import Doit from '../../pages/doit/Doit';
import Search from '../../pages/doit/Search';
import SearchMap from '../../pages/home/Search';
import NotRegistered from '../../pages/doit/NotRegistered';
import AlreadyRegistered from '../../pages/doit/AlreadyRegistered';
import Request from '../../pages/doit/Request';
import DoitComplete from '../../pages/doit/DoitComplete';
import OnBoarding from '@/pages/onBoarding/OnBoarding';
import SignIn from '@/pages/signIn/SignIn';
import StoreCheck from '@/pages/add/StoreCheck';
import SearchStore from '@/pages/add/SearchStore';
import AddOption from '@/pages/add/AddOption';
import PreferSelect from '@/pages/onBoarding/PreferSelect';
import CorkageMap from '@/pages/corkagemap/CorkageMap';
import Filter from '../../pages/corkagemap/Filter';
import MainMyPage from '@/pages/myPage/MainMyPage';
import MasterSignUp from '@/pages/myPage/MaterSignUp';
import ModifyInfo from '@/pages/myPage/ModifyInfo';
import Reservation from '@/pages/myPage/Reservation';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Test />,
  },
  {
    path: '/home',
    element: <Store />,
  },
  {
    path: '/searchMap',
    element: <SearchMap />,
  },
  {
    path: '/hotStores',
    element: <HotStores />,
  },
  {
    path: '/regionFilter',
    element: <RegionFilter />,
  },
  {
    path: '/doit',
    element: <Doit />,
  },
  {
    path: '/doit/search',
    element: <Search />,
  },
  {
    path: '/doit/search/request/1',
    element: <NotRegistered />,
  },
  {
    path: '/doit/search/request/2',
    element: <AlreadyRegistered />,
  },
  {
    path: '/doit/request',
    element: <Request />,
  },
  {
    path: '/doit/complete',
    element: <DoitComplete />,
  },
  {
    path: '/onboarding',
    element: <OnBoarding />,
  },
  {
    path: '/signin',
    element: <SignIn />,
  },
  {
    path: '/add/storecheck',
    element: <StoreCheck />,
  },
  {
    path: '/add/search',
    element: <SearchStore />,
  },
  {
    path: '/add/option',
    element: <AddOption />,
  },
  {
    path: '/onboarding/prefer',
    element: <PreferSelect />,
  },
  {
    path: '/corkagemap',
    element: <CorkageMap />,
  },
  {
    path: '/corkagemap/filter',
    element: <Filter />,
  },
  {
    path: '/my',
    element: <MainMyPage />,
  },
  {
    path: '/master/signup',
    element: <MasterSignUp />,
  },
  {
    path: '/my/modify',
    element: <ModifyInfo />,
  },
  {
    path: '/my/reservation',
    element: <Reservation />,
  },
]);

export default router;
