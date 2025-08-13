"use client";

import Select from "react-select";
import { Layers } from "lucide-react";

function EventCategory() {
  const options = [
    { value: "square-garden", label: "Square Garden, New York" },
    { value: "bluenote", label: "BlueNote, New York" },
    { value: "art-district", label: "Art District, Berlin" },
    { value: "louvre-museum", label: "Louvre Museum, Paris" },
    { value: "central-park", label: "Central Park, New York" },
  ];

  const customStyle = {
    control: (provided: object) => ({
      ...provided,
      color: "var(--text-color)",
      border: "none",
      borderRadius: "0.5rem",
      backgroundColor: "transparant",
      boxShadow: "none",
    }),
    singleValue: (provided: object) => ({
      ...provided,
      color: "var(--text-color)",
    }),
    placeholder: (provided: object) => ({
      ...provided,
      color: "var(--text-color)",
    }),
    input: (provided: object) => ({
      ...provided,
      color: "var(--text-color)",
    }),
    menu: (provided: object) => ({
      ...provided,
      border: "none",
      borderRadius: "0.5rem",
      backgroundColor: "var(--color-surface-1)",
      padding: "0.5rem",
    }),
    option: (provided: object, state: any) => ({
      ...provided,
      fontFamily: "var(--font-primary)",
      fontSize: "1rem",
      color: state.isSelected ? "var(--text-color-variant-2)" : state.isFocused ? "var(--text-color-variant-2)" : "",
      border: "none",
      borderRadius: "0.5rem",
      backgroundColor: state.isSelected ? "var(--text-color)" : state.isFocused ? "var(--text-color)" : "var(--color-surface-1)",
      cursor: "pointer",
      transition: "all 150ms ease-in",
      "&:active": {
        backgroundColor: "var(--text-color-variant-1)",
      },
    }),
    menuList: () => ({}),
  };

  return (
    <div className="flex items-center">
      <Layers color="#f54a00" />
      <Select options={options} placeholder="Event Category" className="w-full" styles={customStyle} />
    </div>
  );
}

export default EventCategory;
