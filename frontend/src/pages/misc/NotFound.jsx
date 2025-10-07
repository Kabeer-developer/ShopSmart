import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center h-[70vh] text-center">
      <h1 className="text-6xl font-bold text-red-500 mb-4">404</h1>
      <p className="text-xl mb-6">Oops! The page you are looking for does not exist.</p>
      <Link
        to="/"
        className="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700 transition"
      >
        Go Back Home
      </Link>
    </div>
  );
};

export default NotFound;
