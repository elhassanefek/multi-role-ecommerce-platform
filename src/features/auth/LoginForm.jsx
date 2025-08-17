import { useState } from "react";
import Form from "../../ui/Form";
import { useLogin } from "./useLogin";
import FormRowVertical from "../../ui/FormRowVertical";
import Input from "../../ui/Input";
import Button from "../../ui/Button";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { login, isLoggingIn } = useLogin();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email || !password) return;

    login(
      { email, password },
      {
        onSuccess: () => {
          setEmail("");
          setPassword("");
        },
      }
    );
  };

  return (
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
        {isLoggingIn ? "Logging in..." : "Log in"}
      </Button>
    </Form>
  );
}

export default LoginForm;
