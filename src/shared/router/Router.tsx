import { createBrowserRouter } from 'react-router-dom';
import Test from '../../pages/Test';
import Doit from '../../pages/doit/Doit';
import Search from '../../pages/doit/Search';
import NotRegistered from '../../pages/doit/NotRegistered';
import AlreadyRegistered from '../../pages/doit/AlreadyRegistered';
import Request from '../../pages/doit/Request';
import DoitComplete from '../../pages/doit/DoitComplete';
import OnBoarding from '@/pages/onBoarding/OnBoarding';
import SignIn from '@/pages/signIn/SignIn';
import MainMyPage from '@/pages/myPage/MainMyPage';
import ChooseRole from '../components/myPage/ChooseRole';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Test />,
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
    path: '/my',
    element: <MainMyPage />,
  },
  {
    path: '/my/signin',
    element: <ChooseRole />,
  },
]);

export default router;
