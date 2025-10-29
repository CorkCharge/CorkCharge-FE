import { Navigate } from 'react-router-dom';
// import useAuthStore from '../store/useAuthStore';

export function RootRedirect() {
  // const { user } = useAuthStore();

  return <Navigate to="/signin" replace />;
}
