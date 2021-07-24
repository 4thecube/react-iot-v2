import React, { useState } from "react";

import "./InputField.scss";

const InputField = React.forwardRef((props, ref) => {
  const [value, setValue] = useState(null);
  const handleChange = (event) => {
    setValue({ ...value, [event.name]: event.target.value });
  };
  return (
    <div className="group">
      <input
        required
        className="input-field"
        {...props}
        ref={ref}
        onChange={handleChange}
      />
      {props.label ? (
        <label className={`${value ? "shrink" : ""} form-input-label`}>
          {props.label}
        </label>
      ) : null}{" "}
    </div>
  );
});

export default InputField;
