import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Productlist = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    const response = await axios.get("http://localhost:5000/products");
    setProducts(response.data);
  };

  const deleteProduct = async (productId) => {
    await axios.delete(`http://localhost:5000/products/${productId}`);
    getProducts();
  };

  return (
    <div>
      <h1 className="title">Products</h1>
      <h2 className="subtitle">Daftar Products</h2>
      <Link to={"/products/add"} className="button is-primary mb-2">Tambah Baru</Link>
      <table className="table is-striped is-fullwidth">
        <thead>
          <tr>
            <th>No</th>
            <th>Nama</th>
            <th>Harga</th>
            <th>Dibuat Oleh</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((products, index) => (
            <tr key={products.uuid}>
              <td>{index + 1}</td>
              <td>{products.name}</td>
              <td>{products.price}</td>
              <td>{products.user.name}</td>
              <td>
                <Link
                  to={`/products/edit/${products.uuid}`}
                  className="button is-small is-info"
                >
                  Edit
                </Link>
                <button
                  onClick={() => deleteProduct(products.uuid)}
                  className="button is-small is-danger"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Productlist;
