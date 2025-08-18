import { useState } from "react";
import { Link } from "react-router-dom";
import Form from "../../ui/Form";
import { useLogin } from "./useLogin";
import FormRowVertical from "../../ui/FormRowVertical";
import Input from "../../ui/Input";
import Button from "../../ui/Button";
import styled from "styled-components";

const FormContainer = styled.div`
  max-width: 400px;
  margin: 2rem auto;
  padding: 2rem;
  background: var(--color-grey-0);
  border-radius: var(--border-radius-md);
  box-shadow: var(--shadow-md);
`;

const FormHeader = styled.div`
  text-align: center;
  margin-bottom: 2rem;

  h2 {
    color: var(--color-grey-800);
    margin-bottom: 0.5rem;
  }

  p {
    color: var(--color-grey-600);
    font-size: 0.9rem;
  }
`;

const FormFooter = styled.div`
  text-align: center;
  margin-top: 1.5rem;

  p {
    color: var(--color-grey-600);
    font-size: 0.9rem;
    margin: 0.5rem 0;
  }

  a {
    color: var(--color-brand-600);
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
`;

function SellerLoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { login, isLoggingIn } = useLogin();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email || !password) return;

    login(
      { email, password, role: "seller" },
      {
        onSuccess: () => {
          setEmail("");
          setPassword("");
        },
      }
    );
  };

  return (
    <FormContainer>
      <FormHeader>
        <h2>Seller Login</h2>
        <p>Access your store management dashboard</p>
      </FormHeader>

      <Form onSubmit={handleSubmit}>
        <FormRowVertical label="Email address">
          <Input
            type="email"
            id="email"
            autoComplete="username"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={isLoggingIn}
            required
          />
        </FormRowVertical>

        <FormRowVertical label="Password">
          <Input
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={isLoggingIn}
            required
          />
        </FormRowVertical>

        <Button $size="large" disabled={isLoggingIn || !email || !password}>
          {isLoggingIn ? "Signing in..." : "Access Dashboard"}
        </Button>
      </Form>

      <FormFooter>
        <p>
          Dont have a seller account?{" "}
          <Link to="/signup/seller">Create seller account</Link>
        </p>
        <p>
          Looking to shop? <Link to="/login/customer">Customer login</Link>
        </p>
      </FormFooter>
    </FormContainer>
  );
}

export default SellerLoginForm;
