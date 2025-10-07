import { Link } from "react-router-dom";

const Unauthorized = () => {
  return (
    <div className="flex flex-col items-center justify-center h-[70vh] text-center">
      <h1 className="text-5xl font-bold text-yellow-500 mb-4">Access Denied</h1>
      <p className="text-lg mb-6">
        You do not have permission to view this page.
      </p>
      <Link
        to="/"
        className="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700 transition"
      >
        Back to Home
      </Link>
    </div>
  );
};

export default Unauthorized;
