import {
  cloneElement,
  createContext,
  useContext,
  useState,
  useRef,
} from "react";
import styled, { css } from "styled-components";
import { useOutsideClick } from "../hooks/useOutsideClick";
import { createPortal } from "react-dom";
import { HiXMark } from "react-icons/hi2";
import { calculateModalPosition } from "../utils/helpers";
const StyledModel = styled.div`
  position: fixed;
  background-color: var(--color-grey-0);
  border-radius: var(--border-radius-lg);
  box-shadow: var(--shadow-lg);
  padding: 3.2rem 4rem;
  transition: all 0.5s;
  z-index: 1001;

  /* Default: centered big modal */
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  /* Variant styles */
  ${(props) =>
    props.$variant === "filter" &&
    css`
      width: 320px;
      padding: 2rem;
      border-radius: var(--border-radius-md);
      box-shadow: var(--shadow-md);

      /* Dynamic positioning based on button position */
      top: ${props.$position?.top || "10%"};
      left: ${props.$position?.left || "auto"};
      right: ${props.$position?.right || "10%"};
      transform: ${props.$position?.transform || "none"};
    `}
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: var(--backdrop-color);
  backdrop-filter: blur(4px);
  z-index: 1000;
  transition: all 0.5s;

  ${(props) =>
    props.$variant === "filter" &&
    css`
      background-color: transparent;
      backdrop-filter: none;
      pointer-events: auto;
    `}
`;

const Button = styled.button`
  background: none;
  border: none;
  padding: 0.4rem;
  border-radius: var(--border-radius-sm);
  transform: translateX(0.8rem);
  transition: all 0.2s;
  position: absolute;
  top: 1.2rem;
  right: 1.9rem;

  &:hover {
    background-color: var(--color-grey-100);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    color: var(--color-grey-500);
  }
`;

const ModelContext = createContext();

function Model({ children }) {
  const [openName, setOpenName] = useState("");
  const [buttonPosition, setButtonPosition] = useState(null);

  const close = () => {
    setOpenName("");
    setButtonPosition(null);
  };

  const open = (windowName, buttonElement) => {
    setOpenName(windowName);

    // Calculate position relative to the button
    if (buttonElement) {
      const rect = buttonElement.getBoundingClientRect();
      const position = calculateModalPosition(rect);
      setButtonPosition(position);
    }
  };

  return (
    <ModelContext.Provider
      value={{
        openName,
        close,
        open,
        buttonPosition,
      }}
    >
      {children}
    </ModelContext.Provider>
  );
}

function Open({ children, opens: openWindowName }) {
  const { open } = useContext(ModelContext);
  const buttonRef = useRef(null);

  const handleClick = (e) => {
    // Prevent default and stop propagation if needed
    e?.preventDefault();

    // Use ref first, fallback to currentTarget
    const buttonElement = buttonRef.current || e?.currentTarget;

    if (buttonElement) {
      open(openWindowName, buttonElement);
    } else {
      open(openWindowName, null);
    }
  };

  return cloneElement(children, {
    ref: buttonRef,
    onClick: handleClick,
  });
}
function Window({ children, name, variant }) {
  const { openName, close, buttonPosition } = useContext(ModelContext);
  const ref = useOutsideClick(close);

  if (name !== openName) return null;

  return createPortal(
    <Overlay $variant={variant}>
      <StyledModel ref={ref} $variant={variant} $position={buttonPosition}>
        <Button onClick={close}>
          <HiXMark />
        </Button>
        <div>{cloneElement(children, { onCloseModel: close })}</div>
      </StyledModel>
    </Overlay>,
    document.body
  );
}

Model.Open = Open;
Model.Window = Window;

export default Model;
