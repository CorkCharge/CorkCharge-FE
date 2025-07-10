import { createBrowserRouter } from 'react-router-dom';
import Test from '../../pages/Test';
import Doit from '../../pages/doit/Doit';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Test />,
  },
  {
    path: '/doit',
    element: <Doit />,
  },
]);

export default router;
