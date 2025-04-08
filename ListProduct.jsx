import React, { useEffect, useState } from "react";
import "./ListProduct.css";
import cross_icon from "../Assets/cross_icon.png";
import { backend_url, currency } from "../../App";

const ListProduct = () => {
  const [allProducts, setAllProducts] = useState([]);

  const fetchProducts = async () => {
    try {
      const response = await fetch(`${backend_url}/allproducts`);
      const data = await response.json();
      setAllProducts(data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const removeProduct = async (id) => {
    try {
      await fetch(`${backend_url}/removeproduct`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      });
      fetchProducts(); // refresh list after deletion
    } catch (error) {
      console.error("Error removing product:", error);
    }
  };

  return (
    <div className="listproduct">
      <h2>All Products</h2>

      <div className="listproduct-format-main">
        <p>Image</p>
        <p>Title</p>
        <p>Old Price</p>
        <p>New Price</p>
        <p>Category</p>
        <p>Remove</p>
      </div>

      <div className="listproduct-allproducts">
        {allProducts.map((product, index) => (
          <div key={index}>
            <div className="listproduct-format-main listproduct-format">
              <img
                className="listproduct-product-icon"
                src={`${backend_url}${product.image}`}
                alt={product.name}
              />
              <p className="cartitems-product-title">{product.name}</p>
              <p>{currency}{product.old_price}</p>
              <p>{currency}{product.new_price}</p>
              <p>{product.category}</p>
              <img
                className="listproduct-remove-icon"
                src={cross_icon}
                alt="Remove"
                title="Remove Product"
                onClick={() => removeProduct(product.id)}
              />
            </div>
            <hr />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ListProduct;
