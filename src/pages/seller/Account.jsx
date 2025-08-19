import UpdatePasswordForm from "../../features/auth/UpdatePassword";
import UpdateUserDataForm from "../../features/auth/UpdateUserDataForm";
import Heading from "../../ui/Heading";
import Row from "../../ui/Row";

function Account() {
  return (
    <>
      <Heading as="h1">Update your account</Heading>

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
    </>
  );
}

export default Account;
