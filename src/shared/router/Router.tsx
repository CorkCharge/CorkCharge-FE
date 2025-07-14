import { createBrowserRouter } from 'react-router-dom';
import Test from '../../pages/Test';
import Doit from '../../pages/doit/Doit';
import Search from '../../pages/doit/Search';

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
]);

export default router;
