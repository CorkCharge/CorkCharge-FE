import { createBrowserRouter } from 'react-router-dom';
import Test from '../../pages/Test';
import OnBoarding from '../../pages/onBoarding/OnBoarding';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Test />,
  },
  {
    path: '/onboarding',
    element: <OnBoarding />,
  },
]);

export default router;
