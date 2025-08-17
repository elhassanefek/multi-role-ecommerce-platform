export function formatCurrency(value) {
  return new Intl.NumberFormat("en", {
    style: "currency",
    currency: "usd",
  }).format(value);
}
export const getCurrentTimestamp = () => {
  const now = new Date();
  return now.toISOString().split(".")[0] + "Z";
};

export function getTotalPrice(products) {
  return products?.reduce((acc, product) => {
    return acc + product.price * (product.quantity || 1);
  }, 0);
}
export function convertIsoToDateAndTimeInputs(isoString) {
  if (!isoString) return { date: "", time: "" };

  const dateObj = new Date(isoString);

  const year = dateObj.getFullYear();
  const month = String(dateObj.getMonth() + 1).padStart(2, "0");
  const day = String(dateObj.getDate()).padStart(2, "0");

  const hours = String(dateObj.getHours()).padStart(2, "0");
  const minutes = String(dateObj.getMinutes()).padStart(2, "0");

  return {
    date: `${year}-${month}-${day}`, // For <input type="date" />
    time: `${hours}:${minutes}`, // For <input type="time" />
  };
}

// Helper function to calculate modal position
export function calculateModalPosition(buttonRect) {
  const modalWidth = 320; // Width of filter modal
  const modalHeight = 400; // Estimated height of filter modal
  const spacing = 8; // Gap between button and modal

  const viewportWidth = window.innerWidth;
  const viewportHeight = window.innerHeight;

  let position = {
    top: `${buttonRect.bottom + spacing}px`,
    left: `${buttonRect.left}px`,
    right: "auto",
    transform: "none",
  };

  // Check if modal would overflow to the right
  if (buttonRect.left + modalWidth > viewportWidth) {
    position.left = "auto";
    position.right = `${viewportWidth - buttonRect.right}px`;
  }

  // Check if modal would overflow at the bottom
  if (buttonRect.bottom + modalHeight + spacing > viewportHeight) {
    position.top = `${buttonRect.top - modalHeight - spacing}px`;
  }

  // Ensure modal doesn't go off-screen on the left
  if (buttonRect.left < 0) {
    position.left = "10px";
    position.right = "auto";
  }

  return position;
}
