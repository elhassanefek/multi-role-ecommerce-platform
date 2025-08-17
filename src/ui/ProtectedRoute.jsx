import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useUser } from "../features/auth/useUser";
import { useEffect } from "react";

const FullPage = styled.div`
  height: 100vh;
  background-color: var(--color-grey-50);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const LoadingSpinner = styled.div`
  width: 40px;
  height: 40px;
  border: 4px solid var(--color-grey-200);
  border-top: 4px solid var(--color-primary-600);
  border-radius: 50%;
  animation: spin 1s linear infinite;

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

function ProtectedRoute({ children }) {
  const navigate = useNavigate();
  const { isAuthenticated, loading } = useUser();

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      navigate("/login", { replace: true });
    }
  }, [isAuthenticated, loading, navigate]);

  // Show loading screen while checking authentication
  if (loading) {
    return (
      <FullPage>
        <LoadingSpinner />
      </FullPage>
    );
  }

  // Return null if not authenticated (redirect is handled in useEffect)
  if (!isAuthenticated) {
    return null;
  }

  // Render protected content
  return children;
}

export default ProtectedRoute;
