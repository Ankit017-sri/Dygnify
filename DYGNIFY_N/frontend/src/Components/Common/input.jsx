import React from "react";

const Input = ({ name, label, error, ...rest }) => {
  return (
    <div className="form-group">
      <label
        htmlFor={name}
        style={{ marginTop: "10px", fontSize: 18, fontFamily: "serif" }}
      >
        {label}
      </label>

      <input
        style={{ width: "40%", marginTop: "10px" }}
        {...rest}
        name={name}
        id={name}
        className="form-control"
      />

      {error && (
        <div
          className="alert alert-danger"
          style={{
            width: "40%",
          }}
        >
          {error}
        </div>
      )}
    </div>
  );
};

export default Input;
