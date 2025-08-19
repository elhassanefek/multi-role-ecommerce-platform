import styled from "styled-components";
import HeaderMenu from "./HeaderMenu";
import UserAvatar from "../features/auth/userAvatar";
import { useUser } from "../features/auth/useUser";
const StyledHeader = styled.header`
  background-color: var(--color-grey-0);
  padding: 1.2rem 4.8rem;
  border-bottom: 1px solid var(--color-grey-100);

  display: flex;
  gap: 2.4rem;
  align-items: center;
  justify-content: flex-end;
`;

function Header() {
  const { user } = useUser();
  return (
    <StyledHeader>
      <UserAvatar key={user?.avatar || user?.name || Date.now()} />
      <HeaderMenu />
    </StyledHeader>
  );
}

export default Header;
