"use client";

import Select from "react-select";
import { CalendarDays } from "lucide-react";

function EventDate() {
  const options = [
    { value: "square-garden", label: "Square Garden, New York" },
    { value: "bluenote", label: "BlueNote, New York" },
    { value: "art-district", label: "Art District, Berlin" },
    { value: "louvre-museum", label: "Louvre Museum, Paris" },
    { value: "central-park", label: "Central Park, New York" },
  ];

  const customStyle = {
    control: (provided: object, state: any) => ({
      ...provided,
      color: state.isSelected ? "#ffffff" : "#ffffff",
      border: "none",
      borderRadius: "8px",
      backgroundColor: "transparant",
      boxShadow: state.isFocused ? "none" : "none",
    }),
    singleValue: (provided: object, state: any) => ({
      ...provided,
      color: state.isSelected ? "none" : "#ffffff",
    }),
    placeholder: (provided: object) => ({
      ...provided,
      color: "#ffffff",
    }),
    input: (provided: object) => ({
      ...provided,
      color: "#ffffff",
    }),
    menu: (provided: object) => ({
      ...provided,
      color: "#ffffff",
      border: "none",
      borderRadius: "8px",
      backgroundColor: "rgb(25, 25, 25)",
      padding: "8px",
    }),
    option: (provided: object, state: any) => ({
      ...provided,
      color: state.isSelected ? "#000000" : "",
      border: "none",
      borderRadius: "8px",
      backgroundColor: state.isSelected ? "#ffffff" : "",
      cursor: "pointer",
      transition: "all 150ms ease-in",
      "&:hover": {
        color: "#000000",
        backgroundColor: "#ffffff",
      },
    }),
    menuList: () => ({}),
  };

  return (
    <div className="flex items-center">
      <CalendarDays color="#ff6900" />
      <Select options={options} placeholder="Pick a date" className="w-full" styles={customStyle} />
    </div>
  );
}

export default EventDate;
