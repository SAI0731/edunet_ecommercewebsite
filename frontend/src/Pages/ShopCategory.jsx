import React, { useEffect, useState } from "react";
import "./CSS/ShopCategory.css";
import dropdown_icon from '../Components/Assets/dropdown_icon.png';
import Item from "../Components/Item/Item";
import { Link } from "react-router-dom";

const ShopCategory = ({ banner, category }) => {
  const [allProducts, setAllProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [sortOrder, setSortOrder] = useState('asc');
  const [selectedSize, setSelectedSize] = useState('All');
  const [loading, setLoading] = useState(true);

  const sizes = ['All', 'Small', 'Medium', 'Large'];

  useEffect(() => {
    const fetchInfo = async () => {
      try {
        const res = await fetch('http://localhost:4000/allproducts');
        const data = await res.json();
        setAllProducts(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching products:", error);
        setLoading(false);
      }
    };
    fetchInfo();
  }, []);

  useEffect(() => {
    let filtered = allProducts.filter(item => item.category === category);
    if (selectedSize !== 'All') {
      filtered = filtered.filter(item => item.size === selectedSize);
    }
    if (sortOrder === 'asc') {
      filtered.sort((a, b) => a.new_price - b.new_price);
    } else {
      filtered.sort((a, b) => b.new_price - a.new_price);
    }
    setFilteredProducts(filtered);
  }, [allProducts, sortOrder, selectedSize, category]);

  return (
    <div className="shopcategory">
      <img src={banner} className="shopcategory-banner" alt="category-banner" />

      <div className="shopcategory-filters">
        <div className="shopcategory-sort">
          Sort by 
          <select value={sortOrder} onChange={(e) => setSortOrder(e.target.value)}>
            <option value="asc">Price: Low to High</option>
            <option value="desc">Price: High to Low</option>
          </select>
          <img src={dropdown_icon} alt="dropdown icon" />
        </div>

        <div className="shopcategory-filter">
          Filter by Size
          <select value={selectedSize} onChange={(e) => setSelectedSize(e.target.value)}>
            {sizes.map(size => (
              <option key={size} value={size}>{size}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="shopcategory-products">
        {loading ? (
          <p>Loading products...</p>
        ) : (
          filteredProducts.map((item) => (
            <Item
              key={item.id}
              id={item.id}
              name={item.name}
              image={item.image}
              new_price={item.new_price}
              old_price={item.old_price}
            />
          ))
        )}
      </div>

      <div className="shopcategory-loadmore">
        <Link to='/' style={{ textDecoration: 'none' }}>Explore More</Link>
      </div>
    </div>
  );
};

export default ShopCategory;
