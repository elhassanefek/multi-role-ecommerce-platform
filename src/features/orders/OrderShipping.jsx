function OrderShipping({ address }) {
  return (
    <div>
      <h3 className="font-semibold mb-2">Shipping Address</h3>
      <div className="text-gray-700">
        <p>{address.street}</p>
        <p>
          {address.city}, {address.country}
        </p>
        <p>Phone: {address.phone}</p>
      </div>
    </div>
  );
}

export default OrderShipping;
