import styled from "styled-components";
import LoginForm from "../features/auth/LoginForm";
import Heading from "../ui/Heading";
const LoginLayout = styled.main`
  min-height: 100vh;
  display: grid;
  grid-template-columns: 50rem;
  align-content: center;
  justify-content: center;
  gap: 3.2rem;
  background-color: var(--color-grey-50);
`;

function Login() {
  return (
    <LoginLayout>
      <Heading as="h4">Log in to your account</Heading>
      <LoginForm />
    </LoginLayout>
  );
}

export default Login;
