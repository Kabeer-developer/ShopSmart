import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { saveShippingAddress } from "../../features/cart/cartSlice";
import { useDispatch, useSelector } from "react-redux";

const Shipping = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { shippingAddress } = useSelector((state) => state.cart);

  const [address, setAddress] = useState(shippingAddress.address || "");
  const [city, setCity] = useState(shippingAddress.city || "");
  const [postalCode, setPostalCode] = useState(shippingAddress.postalCode || "");
  const [country, setCountry] = useState(shippingAddress.country || "");

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(saveShippingAddress({ address, city, postalCode, country }));
    navigate("/checkout/placeorder");
  };

  return (
    <div className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow">
      <h1 className="text-2xl font-bold mb-4">Shipping Details</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          className="border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
        <input
          type="text"
          placeholder="City"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
        <input
          type="text"
          placeholder="Postal Code"
          value={postalCode}
          onChange={(e) => setPostalCode(e.target.value)}
          className="border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
        <input
          type="text"
          placeholder="Country"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
          className="border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white py-2 rounded font-semibold transition-colors"
        >
          Continue
        </button>
      </form>
    </div>
  );
};

export default Shipping;
