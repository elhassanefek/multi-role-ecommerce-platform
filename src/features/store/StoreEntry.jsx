import { useState } from "react";
import { useNavigate } from "react-router-dom";

function StoreEntry() {
  const [storeId, setStoreId] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (storeId.trim()) {
      navigate(`/store/${storeId}`);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20 p-4">
      <h1 className="text-2xl font-bold mb-4">Welcome to Our Stores</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter store name or ID"
          value={storeId}
          onChange={(e) => setStoreId(e.target.value)}
          className="border p-2 w-full rounded"
        />
        <button
          type="submit"
          className="mt-4 bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
        >
          Go to Store
        </button>
      </form>
    </div>
  );
}

export default StoreEntry;
