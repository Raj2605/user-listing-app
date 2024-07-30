import React, { useState } from "react";
import "./Filters.css";

//user filter options
const Filters = ({ applyFilters }) => {
  const [gender, setGender] = useState("");
  const [country, setCountry] = useState("");

  //function to call apllyFilter current state values
  const handleApply = () => {
    applyFilters({ gender, country });
  };

  return (
    <div className="filters">
      <select value={gender} onChange={(e) => setGender(e.target.value)}>
        <option value="">Gender</option>
        <option value="Male">Male</option>
        <option value="Female">Female</option>
      </select>
      <select value={country} onChange={(e) => setCountry(e.target.value)}>
        <option value="">Country</option>
        <option value="USA">USA</option>
        <option value="UK">UK</option>
        <option value="Canada">Canada</option>
      </select>
      <button onClick={handleApply}>Apply</button>
    </div>
  );
};

export default Filters;
