import { createBrowserRouter } from 'react-router-dom';
import Test from '../../pages/Test';
import Doit from '../../pages/doit/Doit';
import Search from '../../pages/doit/Search';
import NotRegistered from '../../pages/doit/NotRegistered';
import AlreadyRegistered from '../../pages/doit/AlreadyRegistered';
import Request from '../../pages/doit/Request';
import DoitComplete from '../../pages/doit/DoitComplete';

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
]);

export default router;
