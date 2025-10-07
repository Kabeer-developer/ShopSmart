function CartItem({ item, onRemove, onQuantityChange }) {
  return (
    <div className="flex items-center justify-between border-b py-4">
      <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded" />
      <div className="flex-1 ml-4">
        <h3 className="font-semibold">{item.name}</h3>
        <p className="text-gray-600">${item.price}</p>
        <div className="mt-2 flex items-center space-x-2">
          <input
            type="number"
            min="1"
            value={item.quantity}
            onChange={(e) => onQuantityChange(item._id, e.target.value)}
            className="w-16 border rounded px-2 py-1"
          />
          <button
            onClick={() => onRemove(item._id)}
            className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
          >
            Remove
          </button>
        </div>
      </div>
    </div>
  );
}

export default CartItem;
