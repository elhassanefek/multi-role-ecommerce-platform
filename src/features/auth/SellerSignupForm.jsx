import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import Button from "../../ui/Button";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import { useSignup } from "./useSignup";
import styled from "styled-components";

// Email regex: /\S+@\S+\.\S+/

const FormContainer = styled.div`
  max-width: 500px;
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

function SellerSignupForm() {
  const { signup, isSigningUp } = useSignup();
  const { register, formState, getValues, handleSubmit, reset } = useForm();
  const { errors } = formState;

  function onSubmit({
    fullName,
    email,
    password,
    phone,
    businessName,
    businessAddress,
  }) {
    signup(
      {
        name: fullName,
        email,
        password,
        phone,
        businessName,
        businessAddress: businessAddress || "",
        role: "seller",
      },
      {
        onSettled: () => reset(),
      }
    );
  }

  return (
    <FormContainer>
      <FormHeader>
        <h2>Create Seller Account</h2>
        <p>Start your business journey with us</p>
      </FormHeader>

      <Form onSubmit={handleSubmit(onSubmit)}>
        <FormRow label="Full name" error={errors?.fullName?.message}>
          <Input
            type="text"
            id="fullName"
            disabled={isSigningUp}
            {...register("fullName", { required: "This field is required" })}
          />
        </FormRow>

        <FormRow label="Business name" error={errors?.businessName?.message}>
          <Input
            type="text"
            id="businessName"
            disabled={isSigningUp}
            {...register("businessName", {
              required: "This field is required",
            })}
          />
        </FormRow>

        <FormRow label="Email address" error={errors?.email?.message}>
          <Input
            type="email"
            id="email"
            disabled={isSigningUp}
            {...register("email", {
              required: "This field is required",
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: "Please provide a valid email address",
              },
            })}
          />
        </FormRow>

        <FormRow label="Phone number" error={errors?.phone?.message}>
          <Input
            type="tel"
            id="phone"
            disabled={isSigningUp}
            {...register("phone", {
              required: "This field is required",
              //   pattern: {
              //     value: /^[\+]?[1-9][\d]{0,15}$/,
              //     message: "Please provide a valid phone number",
              //   },
            })}
          />
        </FormRow>

        <FormRow
          label="Business address (optional)"
          error={errors?.businessAddress?.message}
        >
          <Input
            type="text"
            id="businessAddress"
            disabled={isSigningUp}
            {...register("businessAddress")}
          />
        </FormRow>

        <FormRow
          label="Password (min 8 characters)"
          error={errors?.password?.message}
        >
          <Input
            type="password"
            id="password"
            disabled={isSigningUp}
            {...register("password", {
              required: "This field is required",
              minLength: {
                value: 8,
                message: "Password needs a minimum of 8 characters",
              },
            })}
          />
        </FormRow>

        <FormRow
          label="Repeat password"
          error={errors?.passwordConfirm?.message}
        >
          <Input
            type="password"
            id="passwordConfirm"
            disabled={isSigningUp}
            {...register("passwordConfirm", {
              required: "This field is required",
              validate: (value) =>
                value === getValues().password || "Passwords need to match",
            })}
          />
        </FormRow>

        <FormRow>
          <Button
            variation="secondary"
            type="reset"
            disabled={isSigningUp}
            onClick={reset}
          >
            Cancel
          </Button>
          <Button disabled={isSigningUp}>
            {isSigningUp ? "Creating account..." : "Start selling"}
          </Button>
        </FormRow>
      </Form>

      <FormFooter>
        <p>
          Already have an account? <Link to="/login/seller">Sign in here</Link>
        </p>
        <p>
          Looking to shop? <Link to="/login/customer">Customer login</Link>
        </p>
      </FormFooter>
    </FormContainer>
  );
}

export default SellerSignupForm;
