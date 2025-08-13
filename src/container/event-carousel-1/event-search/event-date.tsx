"use client";

import Select from "react-select";

const options = [
  { value: "square-garden", label: "Sport" },
  { value: "bluenote", label: "Business" },
  { value: "art-district", label: "Music" },
  { value: "louvre-museum", label: "Technology" },
  { value: "central-park", label: "Food" },
];

const customStyle = {
  control: (provided: object) => ({
    ...provided,
    color: "var(--text-color:)",
    border: "none",
    borderRadius: "1rem",
    backgroundColor: "transparent",
    boxShadow: "none",
  }),
  indicatorSeparator: () => ({
    display: "none",
  }),
  dropdownIndicator: () => ({
    display: "none",
  }),
  singleValue: (provided: object) => ({
    ...provided,
    color: "var(--text-color:)",
  }),
  placeholder: (provided: object) => ({
    ...provided,
    color: "var(--text-color:)",
  }),
  input: (provided: object) => ({
    ...provided,
    color: "var(--text-color:)",
  }),
  menu: (provided: object) => ({
    ...provided,
    border: "none",
    borderRadius: "1rem",
    backgroundColor: "transparant",
    padding: "0.5rem",
  }),
  option: (provided: object, state: any) => ({
    ...provided,
    fontFamily: "var(--font-primary)",
    fontSize: "1rem",
    color: "var(--text-color)",
    borderRadius: "1rem",
    backgroundColor: state.isSelected ? "var(--primary-color)" : state.isFocused ? "var(--primary-color)" : "var(--color-surface-1)",
    padding: "0.5rem 1.5rem",
    transition: "all 150ms ease-in",
    "&:active": {
      backgroundColor: "var(--primary-color-variant)",
    },
  }),
  menuList: () => ({}),
};

function EventDate() {
  return (
    <div className="flex items-center">
      <Select options={options} placeholder="Date" className="w-full" styles={customStyle} />
    </div>
  );
}

export default EventDate;
