import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Breadcrums from '../Components/Breadcrums/Breadcrums';
import ProductDisplay from '../Components/ProductDisplay/ProductDisplay';
import DescriptionBox from '../Components/DescriptionBox/DescriptionBox';
import RelatedProducts from '../Components/RelatedProducts/RelatedProducts';
import { ShopContext } from '../Context/ShopContext';

const Product = () => {
  const { productId } = useParams(); // Get ID from URL
  const { products } = useContext(ShopContext); // Access products from context
  const [product, setProduct] = useState(null); // Store selected product

  // Find product when products or productId changes
  useEffect(() => {
    if (products.length > 0) {
      const foundProduct = products.find((item) => item.id === Number(productId));
      setProduct(foundProduct);
    }
  }, [products, productId]);

  // Optional: Show loading text while fetching
  if (!product) {
    return <div style={{ padding: "20px", textAlign: "center" }}>Loading product...</div>;
  }

  return (
    <div>
      <Breadcrums product={product} />
      <ProductDisplay product={product} />
      <DescriptionBox />
      <RelatedProducts id={product.id} category={product.category} />
    </div>
  );
};

export default Product;
