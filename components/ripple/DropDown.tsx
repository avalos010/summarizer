import React from "react";

const Dropdown = ({ options, onSelect, title }: DropdownProps) => {
  return (
    <div className="dropdown">
      <label className="btn btn-solid-primary my-2" tabIndex={0}>
        {title}
      </label>
      <div className="dropdown-menu">
        {options.map((option) => (
          <a
            className="dropdown-item text-sm"
            key={option.value}
            onClick={() => onSelect(option.value)}
          >
            {option.label}
          </a>
        ))}
      </div>
    </div>
  );
};

export default Dropdown;

interface DropdownProps {
  options: { label: string; value: string | number }[];
  onSelect: (value: string | number) => void;
  title: string;
}
