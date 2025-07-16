import { createBrowserRouter } from 'react-router-dom';
import Test from '@/pages/Test';
import OnBoarding from '@/pages/onBoarding/OnBoarding';
import SignIn from '@/pages/signIn/SignIn';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Test />,
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
    path: '/prefer',
    element: <SignIn />,
  },
]);

export default router;
