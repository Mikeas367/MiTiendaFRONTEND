import React from 'react';

const ProductFilter = ({ onFilter }) => {
  const handleChange = (event) => {
    onFilter(event.target.value);
  };

  return (
    <div className="form-group">
      <label>Buscar productos:</label>
      <input
        type="text"
        className="form-control"
        placeholder="Buscar por nombre"
        onChange={handleChange}
      />
    </div>
  );
};

export default ProductFilter;
