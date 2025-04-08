import React, { useState } from "react";
import "./AddProduct.css";
import upload_area from "../Assets/upload_area.svg";
import { backend_url } from "../../App";

const AddProduct = () => {
  const [image, setImage] = useState(null);
  const [productDetails, setProductDetails] = useState({
    name: "",
    description: "",
    image: "",
    category: "women",
    new_price: "",
    old_price: ""
  });

  const handleAddProduct = async () => {
    if (!image || !productDetails.name || !productDetails.description) {
      alert("Please fill all fields and upload an image.");
      return;
    }

    try {
      // Upload Image
      const formData = new FormData();
      formData.append('product', image);

      const uploadResponse = await fetch(`${backend_url}/upload`, {
        method: 'POST',
        body: formData,
      });
      const uploadResult = await uploadResponse.json();

      if (uploadResult.success) {
        // Save product details
        const productWithImage = {
          ...productDetails,
          image: uploadResult.image_url
        };

        const productResponse = await fetch(`${backend_url}/addproduct`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(productWithImage),
        });

        const productResult = await productResponse.json();

        if (productResult.success) {
          alert("Product Added Successfully!");
          // Reset fields
          setProductDetails({
            name: "",
            description: "",
            image: "",
            category: "women",
            new_price: "",
            old_price: ""
          });
          setImage(null);
        } else {
          alert("Failed to add product.");
        }
      } else {
        alert("Image upload failed.");
      }
    } catch (error) {
      console.error("Error adding product:", error);
      alert("Something went wrong.");
    }
  };

  const handleChange = (e) => {
    setProductDetails({ ...productDetails, [e.target.name]: e.target.value });
  };

  return (
    <div className="addproduct">
      <div className="addproduct-itemfield">
        <p>Product Title</p>
        <input type="text" name="name" value={productDetails.name} onChange={handleChange} placeholder="Type here" />
      </div>
      <div className="addproduct-itemfield">
        <p>Product Description</p>
        <input type="text" name="description" value={productDetails.description} onChange={handleChange} placeholder="Type here" />
      </div>
      <div className="addproduct-price">
        <div className="addproduct-itemfield">
          <p>Price</p>
          <input type="number" name="old_price" value={productDetails.old_price} onChange={handleChange} placeholder="Original Price" />
        </div>
        <div className="addproduct-itemfield">
          <p>Offer Price</p>
          <input type="number" name="new_price" value={productDetails.new_price} onChange={handleChange} placeholder="Discounted Price" />
        </div>
      </div>
      <div className="addproduct-itemfield">
        <p>Product Category</p>
        <select name="category" value={productDetails.category} onChange={handleChange} className="add-product-selector">
          <option value="women">Women</option>
          <option value="men">Men</option>
          <option value="kid">Kid</option>
        </select>
      </div>
      <div className="addproduct-itemfield">
        <p>Product Image</p>
        <label htmlFor="file-input">
          <img
            className="addproduct-thumbnail-img"
            src={image ? URL.createObjectURL(image) : upload_area}
            alt="upload"
          />
        </label>
        <input
          type="file"
          id="file-input"
          name="image"
          accept="image/*"
          hidden
          onChange={(e) => setImage(e.target.files[0])}
        />
      </div>
      <button className="addproduct-btn" onClick={handleAddProduct}>ADD</button>
    </div>
  );
};

export default AddProduct;
