import { Link } from "react-router-dom";

export default function HeroSection() {
  return (
    <section className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white p-12 text-center">
      <h1 className="text-4xl font-bold mb-4">
        Welcome to E-commerce Dashboard
      </h1>
      <p className="text-lg mb-8 max-w-xl mx-auto">
        Manage your store, track sales, and connect with buyers effortlessly.
      </p>
      <div className="space-x-4">
        <Link
          to="/store"
          className="inline-block bg-white text-blue-700 font-semibold px-6 py-3 rounded shadow hover:bg-gray-100 transition"
        >
          Enter a Store
        </Link>
        <Link
          to="/login"
          className="inline-block border border-white text-white font-semibold px-6 py-3 rounded hover:bg-white hover:text-blue-700 transition"
        >
          Seller Dashboard
        </Link>
      </div>
    </section>
  );
}
