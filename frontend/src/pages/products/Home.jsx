import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../../features/products/productsSlice";
import ProductCard from "../../components/ProductCard";
import Loader from "../../components/Loader";

const Home = () => {
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">All Products</h1>
      {loading && <Loader />}
      {error && <p className="text-red-500">{error}</p>}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products &&
          products.map((product) => <ProductCard key={product._id} product={product} />)}
      </div>
    </div>
  );
};

export default Home;
