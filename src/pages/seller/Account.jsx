import styled from "styled-components";
import UpdatePasswordForm from "../../features/auth/UpdatePassword";
import UpdateUserDataForm from "../../features/auth/UpdateUserDataForm";
import Heading from "../../ui/Heading";
import Row from "../../ui/Row";

const FormWrapper = styled.div`
  width: 118rem;
  margin: 0 auto;
`;

function Account() {
  return (
    <>
      <Heading as="h1">Update your account</Heading>
      <FormWrapper>
        <Row>
          <div>
            <UpdateUserDataForm />
          </div>
        </Row>

        <Row>
          <div>
            <UpdatePasswordForm />
          </div>
        </Row>
      </FormWrapper>
    </>
  );
}

export default Account;
