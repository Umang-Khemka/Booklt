import { useNavigate, useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function ConfirmPage() {
  const navigate = useNavigate();
  const location = useLocation();

  const query = new URLSearchParams(location.search);
  const refId = query.get("ref") || "N/A";

  return (
    <div>
      <Navbar/>
    <div className="flex flex-col items-center justify-center min-h-screen bg-white">
      <div className="bg-green-100 p-6 rounded-full mb-4">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-12 w-12 text-green-600"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
        </svg>
      </div>
      <h1 className="text-2xl font-semibold text-gray-800">Booking Confirmed</h1>
      <p className="text-gray-600 mt-2">Ref ID: {refId}</p>

      <button
        onClick={() => navigate("/")}
        className="mt-6 px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-md text-sm font-medium"
      >
        Back to Home
      </button>
    </div>
    </div>
  );
}
