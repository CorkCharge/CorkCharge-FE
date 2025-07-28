import { createBrowserRouter } from 'react-router-dom';
import Test from '../../pages/Test';
import Store from '../../pages/home/StoreList';
import Search from '../../pages/home/Search';
import HotStores from '../../pages/home/HotStores';
import RegionFilter from '../../pages/home/RegionFilter';

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
    path: '/search',
    element: <Search />,
  },
  {
    path: '/hotStores',
    element: <HotStores />,
  },
  {
    path: '/RegionFilter',
    element: <RegionFilter />,
  },
]);

export default router;
