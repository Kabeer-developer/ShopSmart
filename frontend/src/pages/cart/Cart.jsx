import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import CartItem from "../../components/CartItem";
import { removeFromCart, updateQuantity } from "../../features/cart/cartSlice";

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { cartItems } = useSelector((state) => state.cart);

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.qty,
    0
  );

  const handleCheckout = () => {
    navigate("/checkout/shipping");
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Your Cart</h1>
      {cartItems.length === 0 ? (
        <p>
          Your cart is empty. <Link className="text-blue-600" to="/">Go back</Link>
        </p>
      ) : (
        <div className="flex flex-col md:flex-row gap-6">
          {/* Cart Items */}
          <div className="md:w-2/3 flex flex-col gap-4">
            {cartItems.map((item) => (
              <CartItem
                key={item.productId}
                item={item}
                updateQuantity={(qty) => dispatch(updateQuantity({ productId: item.productId, qty }))}
                removeItem={() => dispatch(removeFromCart(item.productId))}
              />
            ))}
          </div>

          {/* Order Summary */}
          <div className="md:w-1/3 border p-4 rounded-lg shadow bg-white">
            <h2 className="text-xl font-bold mb-4">Order Summary</h2>
            <p className="mb-2">Subtotal ({cartItems.length} items): <span className="font-semibold">${subtotal.toFixed(2)}</span></p>
            <button
              onClick={handleCheckout}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded font-semibold transition-colors"
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
