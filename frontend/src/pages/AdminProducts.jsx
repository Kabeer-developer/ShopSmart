import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchProducts,
  createNewProduct,
  editProduct,
  removeProduct,
  clearProductState,
} from "../redux/slices/productSlice";

const AdminProducts = () => {
  const dispatch = useDispatch();
  const { products, loading, error, success } = useSelector((state) => state.products);

  const [editing, setEditing] = useState(null); // product id or null
  const [form, setForm] = useState({ name: "", price: 0, description: "", image: "", category: "" });

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  useEffect(() => {
    if (success) {
      dispatch(clearProductState());
      setEditing(null);
      setForm({ name: "", price: 0, description: "", image: "", category: "" });
      dispatch(fetchProducts());
    }
  }, [success, dispatch]);

  const startEdit = (p) => {
    setEditing(p._id);
    setForm({ name: p.name, price: p.price, description: p.description || "", image: p.image || "", category: p.category || "" });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editing) {
      dispatch(editProduct({ id: editing, productData: form }));
    } else {
      dispatch(createNewProduct(form));
    }
  };

  const handleDelete = (id) => {
    if (!window.confirm("Delete this product?")) return;
    dispatch(removeProduct(id));
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Admin: Products</h1>

      <div className="mb-6 border rounded p-4">
        <h2 className="font-semibold mb-2">{editing ? "Edit Product" : "Create Product"}</h2>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <input required placeholder="Name" value={form.name} onChange={(e) => setForm({...form, name: e.target.value})} className="border p-2 rounded" />
          <input required type="number" placeholder="Price" value={form.price} onChange={(e) => setForm({...form, price: Number(e.target.value)})} className="border p-2 rounded" />
          <input placeholder="Category" value={form.category} onChange={(e) => setForm({...form, category: e.target.value})} className="border p-2 rounded" />
          <input placeholder="Image URL" value={form.image} onChange={(e) => setForm({...form, image: e.target.value})} className="border p-2 rounded" />
          <textarea placeholder="Description" value={form.description} onChange={(e) => setForm({...form, description: e.target.value})} className="border p-2 rounded md:col-span-2" />
          <div className="md:col-span-2 flex gap-2">
            <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">{editing ? "Update" : "Create"}</button>
            {editing && <button type="button" onClick={() => { setEditing(null); setForm({ name: "", price: 0, description: "", image: "", category: "" }); }} className="px-4 py-2 border rounded">Cancel</button>}
          </div>
        </form>
      </div>

      <div>
        <h2 className="font-semibold mb-3">Products List</h2>
        {loading && <p>Loading...</p>}
        {error && <p className="text-red-500">{error}</p>}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {products.map((p) => (
            <div key={p._id} className="border p-4 rounded flex justify-between items-start">
              <div>
                <h3 className="font-semibold">{p.name}</h3>
                <p className="text-sm text-gray-500">₹{p.price} • {p.category || "General"}</p>
              </div>
              <div className="flex gap-2">
                <button onClick={() => startEdit(p)} className="px-3 py-1 border rounded">Edit</button>
                <button onClick={() => handleDelete(p._id)} className="px-3 py-1 bg-red-600 text-white rounded">Delete</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminProducts;
