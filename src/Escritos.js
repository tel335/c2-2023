import React from 'react';

function Escritos({ valor, onChange, placeholder }) {
  return (
    <input
      type="text"
      value={valor}
      onChange={onChange}
      placeholder={placeholder}
    />
  );
}

export default Escritos;