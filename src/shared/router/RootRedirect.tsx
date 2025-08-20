import { Navigate } from 'react-router-dom';
import useAuthStore from '../store/useAuthStore';

export function RootRedirect() {
  const { user } = useAuthStore();

  return user === null ? <Navigate to="/onboarding" replace /> : <Navigate to="/home" replace />;
}
