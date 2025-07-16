import { createBrowserRouter } from 'react-router-dom';
import Test from '../../pages/Test';
import Doit from '../../pages/doit/Doit';
import Search from '../../pages/doit/Search';
import NotRegistered from '../../pages/doit/NotRegistered';

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
    path: '/doit/search/request1',
    element: <NotRegistered />,
  },
]);

export default router;
