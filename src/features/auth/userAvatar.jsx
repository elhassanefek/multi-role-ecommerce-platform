import styled from "styled-components";
import { useUser } from "./useUser";
import { useState, useEffect } from "react";

const StyledUserAvatar = styled.div`
  display: flex;
  gap: 1.2rem;
  align-items: center;
  font-weight: 500;
  font-size: 1.4rem;
  color: var(--color-grey-600);
`;

const Avatar = styled.img`
  display: block;
  width: 4rem;
  width: 3.6rem;
  aspect-ratio: 1;
  object-fit: cover;
  object-position: center;
  border-radius: 50%;
  outline: 2px solid var(--color-grey-100);
`;

function UserAvatar() {
  const { user } = useUser();

  // const [avatarKey, setAvatarKey] = useState(0);

  // useEffect(() => {
  //   setAvatarKey((prev) => prev + 1);
  // }, [user?.avatar, user?.name]);

  const { name, avatar } = user;

  return (
    <StyledUserAvatar>
      <Avatar
        // key={avatarKey}
        src={avatar || "default-user.jpg"}
        alt={`Avatar of ${name}`}
      />
      <span>{name}</span>
    </StyledUserAvatar>
  );
}

export default UserAvatar;
