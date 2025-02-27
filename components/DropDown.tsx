"use client";

import Select from "react-select";
import { useEffect, useState } from "react";
const Dropdown = ({ options, onSelect, title, ...props }: DropdownProps) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    //fixes hydration error with react-select
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <div>
      <label className="block mb-2 text-sm font-medium">{title}</label>
      <Select
        className="basic-single text-black"
        classNamePrefix="select"
        defaultValue={options[0]}
        isLoading={options.length === 0}
        options={options}
        onChange={(option) => onSelect(option!.value)}
        {...props}
      />
    </div>
  );
};

export default Dropdown;

interface DropdownProps {
  options: { label: string; value: string | number }[];
  onSelect: (value: string | number) => void;
  title: string;
}
