import { NavLink } from "react-router-dom";
import { useUser } from "../../features/auth/useUser"; // Adjust path as needed

function PageNav() {
  const { user, isAuthenticated, loading, logout } = useUser();

  const handleLogout = () => {
    logout();
  };

  // Show loading state while checking authentication
  if (loading) {
    return (
      <nav className="bg-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <div className="text-2xl font-bold text-blue-600">Vendora</div>
            </div>
            <div className="animate-pulse flex space-x-4">
              <div className="h-4 bg-gray-200 rounded w-20"></div>
              <div className="h-4 bg-gray-200 rounded w-16"></div>
            </div>
          </div>
        </div>
      </nav>
    );
  }

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          {/* Logo/Brand */}
          <div className="flex items-center">
            <NavLink
              to="/"
              className="text-2xl font-bold text-blue-600 hover:text-blue-700"
            >
              Vendora
            </NavLink>
          </div>

          {/* Horizontal navbar links */}
          <div className="flex flex-row items-center gap-6">
            {/* Common links for all users */}
            <NavLink
              to="/store"
              className={({ isActive }) =>
                `px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive
                    ? "text-blue-600 bg-blue-50"
                    : "text-gray-700 hover:text-blue-600 hover:bg-gray-50"
                }`
              }
            >
              Browse Store
            </NavLink>

            {!isAuthenticated ? (
              /* Not logged in */
              <>
                <div className="relative group">
                  <button className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-blue-600 flex items-center">
                    Login
                    <svg
                      className="ml-1 h-4 w-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </button>
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-2 z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                    <NavLink
                      to="/login/customer"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Customer Login
                    </NavLink>
                    <NavLink
                      to="/login/seller"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Seller Login
                    </NavLink>
                  </div>
                </div>
                <div className="relative group">
                  <button className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700 transition-colors flex items-center">
                    Sign Up
                    <svg
                      className="ml-1 h-4 w-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </button>
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-2 z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                    <NavLink
                      to="/signup/customer"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Customer Sign Up
                    </NavLink>
                    <NavLink
                      to="/signup/seller"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Seller Sign Up
                    </NavLink>
                  </div>
                </div>
              </>
            ) : user.role === "customer" ? (
              /* Customer logged in */
              <>
                <NavLink
                  to="/cart"
                  className={({ isActive }) =>
                    `px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      isActive
                        ? "text-blue-600 bg-blue-50"
                        : "text-gray-700 hover:text-blue-600 hover:bg-gray-50"
                    }`
                  }
                >
                  Cart
                </NavLink>
                <NavLink
                  to="/orders"
                  className={({ isActive }) =>
                    `px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      isActive
                        ? "text-blue-600 bg-blue-50"
                        : "text-gray-700 hover:text-blue-600 hover:bg-gray-50"
                    }`
                  }
                >
                  My Orders
                </NavLink>
                <NavLink
                  to="/profile"
                  className={({ isActive }) =>
                    `px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      isActive
                        ? "text-blue-600 bg-blue-50"
                        : "text-gray-700 hover:text-blue-600 hover:bg-gray-50"
                    }`
                  }
                >
                  Profile
                </NavLink>
                <button
                  onClick={handleLogout}
                  className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors"
                >
                  Logout
                </button>
              </>
            ) : user.role === "seller" ? (
              /* Seller logged in */
              <>
                <NavLink
                  to="/seller/dashboard"
                  className={({ isActive }) =>
                    `px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      isActive
                        ? "text-blue-600 bg-blue-50"
                        : "text-gray-700 hover:text-blue-600 hover:bg-gray-50"
                    }`
                  }
                >
                  Dashboard
                </NavLink>
                <NavLink
                  to="/seller/products"
                  className={({ isActive }) =>
                    `px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      isActive
                        ? "text-blue-600 bg-blue-50"
                        : "text-gray-700 hover:text-blue-600 hover:bg-gray-50"
                    }`
                  }
                >
                  My Products
                </NavLink>
                <NavLink
                  to="/seller/orders"
                  className={({ isActive }) =>
                    `px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      isActive
                        ? "text-blue-600 bg-blue-50"
                        : "text-gray-700 hover:text-blue-600 hover:bg-gray-50"
                    }`
                  }
                >
                  Orders
                </NavLink>
                <NavLink
                  to="/seller/profile"
                  className={({ isActive }) =>
                    `px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      isActive
                        ? "text-blue-600 bg-blue-50"
                        : "text-gray-700 hover:text-blue-600 hover:bg-gray-50"
                    }`
                  }
                >
                  Profile
                </NavLink>
                <button
                  onClick={handleLogout}
                  className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors"
                >
                  Logout
                </button>
              </>
            ) : (
              /* Unknown role or admin - fallback */
              <>
                <NavLink
                  to="/profile"
                  className={({ isActive }) =>
                    `px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      isActive
                        ? "text-blue-600 bg-blue-50"
                        : "text-gray-700 hover:text-blue-600 hover:bg-gray-50"
                    }`
                  }
                >
                  Profile
                </NavLink>
                <button
                  onClick={handleLogout}
                  className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors"
                >
                  Logout
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default PageNav;
