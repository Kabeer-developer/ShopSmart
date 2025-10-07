import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../../features/products/productsSlice";
import Loader from "../../components/Loader";

const ManageProducts = () => {
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector((state) => state.products);

  const [editingProduct, setEditingProduct] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    price: 0,
    category: "",
    stock: 0,
    description: "",
    image: "",
  });

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleEdit = (product) => {
    setEditingProduct(product._id);
    setFormData({ ...product });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingProduct) {
      dispatch(updateProduct({ id: editingProduct, data: formData }));
    } else {
      dispatch(createProduct(formData));
    }
    setEditingProduct(null);
    setFormData({
      name: "",
      price: 0,
      category: "",
      stock: 0,
      description: "",
      image: "",
    });
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure to delete this product?")) {
      dispatch(deleteProduct(id));
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Manage Products</h1>

      <form onSubmit={handleSubmit} className="mb-6 bg-white p-4 rounded shadow">
        <h2 className="font-semibold mb-2">{editingProduct ? "Edit Product" : "Add Product"}</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            className="border rounded px-3 py-2"
            required
          />
          <input
            type="number"
            name="price"
            placeholder="Price"
            value={formData.price}
            onChange={handleChange}
            className="border rounded px-3 py-2"
            required
          />
          <input
            type="text"
            name="category"
            placeholder="Category"
            value={formData.category}
            onChange={handleChange}
            className="border rounded px-3 py-2"
          />
          <input
            type="number"
            name="stock"
            placeholder="Stock"
            value={formData.stock}
            onChange={handleChange}
            className="border rounded px-3 py-2"
          />
          <input
            type="text"
            name="image"
            placeholder="Image URL"
            value={formData.image}
            onChange={handleChange}
            className="border rounded px-3 py-2"
          />
          <textarea
            name="description"
            placeholder="Description"
            value={formData.description}
            onChange={handleChange}
            className="border rounded px-3 py-2 col-span-1 md:col-span-3"
          />
        </div>
        <button type="submit" className="bg-blue-600 text-white mt-2 px-4 py-2 rounded hover:bg-blue-700">
          {editingProduct ? "Update Product" : "Add Product"}
        </button>
      </form>

      {loading ? (
        <Loader />
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <table className="min-w-full bg-white shadow rounded-lg">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Price</th>
              <th className="px-4 py-2">Stock</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p) => (
              <tr key={p._id} className="border-b">
                <td className="px-4 py-2">{p.name}</td>
                <td className="px-4 py-2">${p.price.toFixed(2)}</td>
                <td className="px-4 py-2">{p.stock}</td>
                <td className="px-4 py-2">
                  <button
                    onClick={() => handleEdit(p)}
                    className="text-yellow-500 hover:text-yellow-700 mr-2"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(p._id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ManageProducts;
