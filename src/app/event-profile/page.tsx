"use client";
import React from "react";
import Image from "next/image";
import { useForm } from "@tanstack/react-form";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { 
  Layers, 
  LoaderCircle, 
  PencilLine, 
  MapPin, 
  Calendar, 
  Clock, 
  Plus, 
  Trash2, 
  Upload, 
  DollarSign, 
  Eye,
  Edit,
  Save,
  X
} from "lucide-react";

// Mock API functions
const fetchEventProfile = async () => {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return {
    id: 1,
    category: "1",
    title: "Tech Conference 2024",
    description: "Annual technology conference featuring the latest innovations and trends in the tech industry.",
    terms: "All attendees must register in advance. No refunds after 48 hours before the event.",
    location: "Jakarta Convention Center",
    image_url: "https://example.com/tech-conference.jpg",
    status: "ACTIVE",
    periods: [
      {
        name: "Day 1",
        start_date: "2024-06-15",
        end_date: "2024-06-15",
        start_time: "09:00",
        end_time: "17:00",
        status: "ACTIVE",
        ticketTypes: [
          {
            category: "1",
            price: "500000",
            discount: "10",
            quota: "100",
            status: "ACTIVE",
          },
        ],
      },
    ],
  };
};

const updateEventProfile = async (data: any) => {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  toast.success("Event profile updated successfully!");
  return { success: true };
};

const deleteEventProfile = async () => {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  toast.success("Event profile deleted successfully!");
  return { success: true };
};

const eventCategories = [
  { id: 1, name: "Music" },
  { id: 2, name: "Sports" },
  { id: 3, name: "Technology" },
  { id: 4, name: "Business" },
  { id: 5, name: "Arts" },
];

const ticketCategories = [
  { id: 1, name: "Regular" },
  { id: 2, name: "VIP" },
  { id: 3, name: "VVIP" },
  { id: 4, name: "Student" },
  { id: 5, name: "Early Bird" },
];

// Component untuk Ticket Types
const TicketTypes = ({ form, isEditing }: { form: any; isEditing: boolean }) => {
  const addTicketType = (periodIndex: number) => {
    const currentPeriods = form.getFieldValue("periods") || [];
    const updatedPeriods = [...currentPeriods];
    const newTicketType = {
      category: "",
      price: "",
      discount: "",
      quota: "",
      status: "",
    };
    updatedPeriods[periodIndex].ticketTypes.push(newTicketType);
    form.setFieldValue("periods", updatedPeriods);
  };

  const removeTicketType = (periodIndex: number, ticketIndex: number) => {
    const currentPeriods = form.getFieldValue("periods") || [];
    const updatedPeriods = [...currentPeriods];
    updatedPeriods[periodIndex].ticketTypes = updatedPeriods[periodIndex].ticketTypes.filter(
      (_: any, i: number) => i !== ticketIndex
    );
    form.setFieldValue("periods", updatedPeriods);
  };

  return (
    <div className="bg-(--color-surface-1) rounded-2xl p-6 space-y-6">
      <h3 className="text-xl font-bold text-transparent bg-gradient-to-r from-white to-orange-600 bg-clip-text">
        Ticket Types
      </h3>

      <form.Field
        name="periods"
        children={(field: any) => (
          <div className="space-y-6">
            {field.state.value?.map((period: any, periodIndex: number) => (
              <div key={periodIndex} className="border-2 border-gray-600 rounded-lg p-4 space-y-4">
                <div className="flex justify-between items-center">
                  <h4 className="font-semibold text-lg text-orange-400">
                    {period.name || `Period ${periodIndex + 1}`} - Ticket Types
                  </h4>
                  {isEditing && (
                    <button
                      type="button"
                      onClick={() => addTicketType(periodIndex)}
                      className="flex items-center gap-2 rounded-lg px-3 py-1 bg-green-600 hover:bg-green-700 transition-colors font-semibold text-sm"
                    >
                      <Plus size={14} /> Add Ticket
                    </button>
                  )}
                </div>

                <div className="space-y-3">
                  {period.ticketTypes?.map((ticket: any, ticketIndex: number) => (
                    <div key={ticketIndex} className="border border-gray-700 rounded-lg p-3 space-y-3">
                      <div className="flex justify-between items-center">
                        <h6 className="font-medium text-sm">Ticket {ticketIndex + 1}</h6>
                        {isEditing && period.ticketTypes.length > 1 && (
                          <button
                            type="button"
                            onClick={() => removeTicketType(periodIndex, ticketIndex)}
                            className="flex items-center gap-1 rounded px-2 py-1 bg-red-600 hover:bg-red-700 transition-colors font-semibold text-xs"
                          >
                            <Trash2 size={12} /> Remove
                          </button>
                        )}
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <form.Field
                          name={`periods[${periodIndex}].ticketTypes[${ticketIndex}].category`}
                          validators={{
                            onChangeAsyncDebounceMs: 500,
                            onChangeAsync: ({ value }: any) => {
                              if (!value) return "Category is required";
                              return undefined;
                            },
                          }}
                          children={(categoryField: any) => (
                            <div className="flex flex-col gap-1">
                              <div className="flex flex-row justify-between">
                                <label className="text-xs font-semibold">Category</label>
                                {categoryField.state.meta.isTouched && !categoryField.state.meta.isValid && (
                                  <em className="text-xs font-semibold text-red-500">
                                    {categoryField.state.meta.errors.join(", ")}
                                  </em>
                                )}
                              </div>
                              <div className="relative">
                                <select
                                  value={categoryField.state.value}
                                  onChange={(e) => categoryField.handleChange(e.target.value)}
                                  disabled={!isEditing}
                                  className={`w-full border-2 outline-none rounded-lg bg-(--color-surface-1) px-3 py-2 text-sm transition-colors duration-150 focus:border-orange-600 ${
                                    !isEditing ? "opacity-60 cursor-not-allowed" : ""
                                  }`}
                                >
                                  <option value="" disabled>
                                    Select Category
                                  </option>
                                  {ticketCategories.map((cat) => (
                                    <option key={cat.id} value={cat.id}>
                                      {cat.name}
                                    </option>
                                  ))}
                                </select>
                                <Layers className="absolute top-1/2 -translate-y-1/2 right-3" size={16} />
                              </div>
                            </div>
                          )}
                        />

                        <form.Field
                          name={`periods[${periodIndex}].ticketTypes[${ticketIndex}].price`}
                          validators={{
                            onChangeAsyncDebounceMs: 500,
                            onChangeAsync: ({ value }: any) => {
                              if (!value) return "Price is required";
                              if (isNaN(Number(value))) return "Price must be a number";
                              return undefined;
                            },
                          }}
                          children={(priceField: any) => (
                            <div className="flex flex-col gap-1">
                              <div className="flex flex-row justify-between">
                                <label className="text-xs font-semibold">Price</label>
                                {priceField.state.meta.isTouched && !priceField.state.meta.isValid && (
                                  <em className="text-xs font-semibold text-red-500">
                                    {priceField.state.meta.errors.join(", ")}
                                  </em>
                                )}
                              </div>
                              <div className="relative">
                                <input
                                  type="number"
                                  placeholder="Enter price"
                                  value={priceField.state.value}
                                  onChange={(e) => priceField.handleChange(e.target.value)}
                                  disabled={!isEditing}
                                  className={`w-full border-2 outline-none rounded-lg bg-(--color-surface-1) px-3 py-2 text-sm transition-colors duration-150 focus:border-orange-600 ${
                                    !isEditing ? "opacity-60 cursor-not-allowed" : ""
                                  }`}
                                />
                                <DollarSign className="absolute top-1/2 -translate-y-1/2 right-3" size={16} />
                              </div>
                            </div>
                          )}
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <form.Field
                          name={`periods[${periodIndex}].ticketTypes[${ticketIndex}].discount`}
                          validators={{
                            onChangeAsyncDebounceMs: 500,
                            onChangeAsync: ({ value }: any) => {
                              if (value && isNaN(Number(value))) return "Discount must be a number";
                              if (value && (Number(value) < 0 || Number(value) > 100)) return "Discount must be between 0-100";
                              return undefined;
                            },
                          }}
                          children={(discountField: any) => (
                            <div className="flex flex-col gap-1">
                              <div className="flex flex-row justify-between">
                                <label className="text-xs font-semibold">Discount (%)</label>
                                {discountField.state.meta.isTouched && !discountField.state.meta.isValid && (
                                  <em className="text-xs font-semibold text-red-500">
                                    {discountField.state.meta.errors.join(", ")}
                                  </em>
                                )}
                              </div>
                              <div className="relative">
                                <input
                                  type="number"
                                  placeholder="Enter discount"
                                  value={discountField.state.value}
                                  onChange={(e) => discountField.handleChange(e.target.value)}
                                  disabled={!isEditing}
                                  min="0"
                                  max="100"
                                  className={`w-full border-2 outline-none rounded-lg bg-(--color-surface-1) px-3 py-2 text-sm transition-colors duration-150 focus:border-orange-600 ${
                                    !isEditing ? "opacity-60 cursor-not-allowed" : ""
                                  }`}
                                />
                                <DollarSign className="absolute top-1/2 -translate-y-1/2 right-3" size={16} />
                              </div>
                            </div>
                          )}
                        />

                        <form.Field
                          name={`periods[${periodIndex}].ticketTypes[${ticketIndex}].quota`}
                          validators={{
                            onChangeAsyncDebounceMs: 500,
                            onChangeAsync: ({ value }: any) => {
                              if (!value) return "Quota is required";
                              if (isNaN(Number(value))) return "Quota must be a number";
                              return undefined;
                            },
                          }}
                          children={(quotaField: any) => (
                            <div className="flex flex-col gap-1">
                              <div className="flex flex-row justify-between">
                                <label className="text-xs font-semibold">Quota</label>
                                {quotaField.state.meta.isTouched && !quotaField.state.meta.isValid && (
                                  <em className="text-xs font-semibold text-red-500">
                                    {quotaField.state.meta.errors.join(", ")}
                                  </em>
                                )}
                              </div>
                              <div className="relative">
                                <input
                                  type="number"
                                  placeholder="Enter quota"
                                  value={quotaField.state.value}
                                  onChange={(e) => quotaField.handleChange(e.target.value)}
                                  disabled={!isEditing}
                                  className={`w-full border-2 outline-none rounded-lg bg-(--color-surface-1) px-3 py-2 text-sm transition-colors duration-150 focus:border-orange-600 ${
                                    !isEditing ? "opacity-60 cursor-not-allowed" : ""
                                  }`}
                                />
                                <PencilLine className="absolute top-1/2 -translate-y-1/2 right-3" size={16} />
                              </div>
                            </div>
                          )}
                        />
                      </div>

                      <form.Field
                        name={`periods[${periodIndex}].ticketTypes[${ticketIndex}].status`}
                        validators={{
                          onChangeAsyncDebounceMs: 500,
                          onChangeAsync: ({ value }: any) => {
                            if (!value) return "Status is required";
                            return undefined;
                          },
                        }}
                        children={(statusField: any) => (
                          <div className="flex flex-col gap-1">
                            <div className="flex flex-row justify-between">
                              <label className="text-xs font-semibold">Status</label>
                              {statusField.state.meta.isTouched && !statusField.state.meta.isValid && (
                                <em className="text-xs font-semibold text-red-500">
                                  {statusField.state.meta.errors.join(", ")}
                                </em>
                              )}
                            </div>
                            <div className="flex gap-3">
                              <label className="flex items-center gap-1 cursor-pointer">
                                <input
                                  type="radio"
                                  name={`ticket-status-${periodIndex}-${ticketIndex}`}
                                  value="ACTIVE"
                                  checked={statusField.state.value === "ACTIVE"}
                                  onChange={(e) => statusField.handleChange(e.target.value)}
                                  disabled={!isEditing}
                                  className="accent-orange-600"
                                />
                                <span className="font-semibold text-xs">ACTIVE</span>
                              </label>
                              <label className="flex items-center gap-1 cursor-pointer">
                                <input
                                  type="radio"
                                  name={`ticket-status-${periodIndex}-${ticketIndex}`}
                                  value="INACTIVE"
                                  checked={statusField.state.value === "INACTIVE"}
                                  onChange={(e) => statusField.handleChange(e.target.value)}
                                  disabled={!isEditing}
                                  className="accent-orange-600"
                                />
                                <span className="font-semibold text-xs">INACTIVE</span>
                              </label>
                            </div>
                          </div>
                        )}
                      />
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      />
    </div>
  );
};

// Component untuk Event Periods
const EventPeriods = ({ form, isEditing }: { form: any; isEditing: boolean }) => {
  const addPeriod = () => {
    const currentPeriods = form.getFieldValue("periods") || [];
    const newPeriod = {
      name: "",
      start_date: "",
      end_date: "",
      start_time: "",
      end_time: "",
      status: "",
      ticketTypes: [
        {
          category: "",
          price: "",
          discount: "",
          quota: "",
          status: "",
        },
      ],
    };
    form.setFieldValue("periods", [...currentPeriods, newPeriod]);
  };

  const removePeriod = (index: number) => {
    const currentPeriods = form.getFieldValue("periods") || [];
    const updatedPeriods = currentPeriods.filter((_: any, i: number) => i !== index);
    form.setFieldValue("periods", updatedPeriods);
  };

  return (
    <div className="bg-(--color-surface-1) rounded-2xl p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-bold text-transparent bg-gradient-to-r from-white to-orange-600 bg-clip-text">
          Event Periods
        </h3>
        {isEditing && (
          <button
            type="button"
            onClick={addPeriod}
            className="flex items-center gap-2 rounded-lg px-4 py-2 bg-orange-600 hover:bg-orange-700 transition-colors font-semibold"
          >
            <Plus size={16} /> Add Period
          </button>
        )}
      </div>

      <form.Field
        name="periods"
        children={(field: any) => (
          <div className="space-y-4">
            {field.state.value?.map((period: any, periodIndex: number) => (
              <div key={periodIndex} className="border-2 border-gray-600 rounded-lg p-4 space-y-4">
                <div className="flex justify-between items-center">
                  <h4 className="font-semibold text-lg">Period {periodIndex + 1}</h4>
                  {isEditing && field.state.value.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removePeriod(periodIndex)}
                      className="flex items-center gap-2 rounded-lg px-3 py-1 bg-red-600 hover:bg-red-700 transition-colors font-semibold text-sm"
                    >
                      <Trash2 size={14} /> Remove
                    </button>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <form.Field
                    name={`periods[${periodIndex}].name`}
                    validators={{
                      onChangeAsyncDebounceMs: 500,
                      onChangeAsync: ({ value }: any) => {
                        if (!value) return "Period name is required";
                        return undefined;
                      },
                    }}
                    children={(nameField: any) => (
                      <div className="flex flex-col gap-2">
                        <div className="flex flex-row justify-between">
                          <label className="text-sm font-semibold">Period Name</label>
                          {nameField.state.meta.isTouched && !nameField.state.meta.isValid && (
                            <em className="text-sm font-semibold text-red-500">
                              {nameField.state.meta.errors.join(", ")}
                            </em>
                          )}
                        </div>
                        <div className="relative">
                          <input
                            type="text"
                            placeholder="Enter period name"
                            value={nameField.state.value}
                            onChange={(e) => nameField.handleChange(e.target.value)}
                            disabled={!isEditing}
                            className={`w-full border-2 outline-none rounded-lg bg-(--color-surface-1) px-4 py-2 transition-colors duration-150 focus:border-orange-600 ${
                              !isEditing ? "opacity-60 cursor-not-allowed" : ""
                            }`}
                          />
                          <PencilLine className="absolute top-1/2 -translate-y-1/2 right-4" />
                        </div>
                      </div>
                    )}
                  />

                  <form.Field
                    name={`periods[${periodIndex}].status`}
                    validators={{
                      onChangeAsyncDebounceMs: 500,
                      onChangeAsync: ({ value }: any) => {
                        if (!value) return "Status is required";
                        return undefined;
                      },
                    }}
                    children={(statusField: any) => (
                      <div className="flex flex-col gap-2">
                        <div className="flex flex-row justify-between">
                          <label className="text-sm font-semibold">Status</label>
                          {statusField.state.meta.isTouched && !statusField.state.meta.isValid && (
                            <em className="text-sm font-semibold text-red-500">
                              {statusField.state.meta.errors.join(", ")}
                            </em>
                          )}
                        </div>
                        <div className="flex gap-4">
                          <label className="flex items-center gap-2 cursor-pointer">
                            <input
                              type="radio"
                              name={`period-status-${periodIndex}`}
                              value="ACTIVE"
                              checked={statusField.state.value === "ACTIVE"}
                              onChange={(e) => statusField.handleChange(e.target.value)}
                              disabled={!isEditing}
                              className="accent-orange-600"
                            />
                            <span className="font-semibold text-sm">ACTIVE</span>
                          </label>
                          <label className="flex items-center gap-2 cursor-pointer">
                            <input
                              type="radio"
                              name={`period-status-${periodIndex}`}
                              value="INACTIVE"
                              checked={statusField.state.value === "INACTIVE"}
                              onChange={(e) => statusField.handleChange(e.target.value)}
                              disabled={!isEditing}
                              className="accent-orange-600"
                            />
                            <span className="font-semibold text-sm">INACTIVE</span>
                          </label>
                        </div>
                      </div>
                    )}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <form.Field
                    name={`periods[${periodIndex}].start_date`}
                    validators={{
                      onChangeAsyncDebounceMs: 500,
                      onChangeAsync: ({ value }: any) => {
                        if (!value) return "Start date is required";
                        return undefined;
                      },
                    }}
                    children={(startDateField: any) => (
                      <div className="flex flex-col gap-2">
                        <div className="flex flex-row justify-between">
                          <label className="text-sm font-semibold">Start Date</label>
                          {startDateField.state.meta.isTouched && !startDateField.state.meta.isValid && (
                            <em className="text-sm font-semibold text-red-500">
                              {startDateField.state.meta.errors.join(", ")}
                            </em>
                          )}
                        </div>
                        <div className="relative">
                          <input
                            type="date"
                            value={startDateField.state.value}
                            onChange={(e) => startDateField.handleChange(e.target.value)}
                            disabled={!isEditing}
                            className={`w-full border-2 outline-none rounded-lg bg-(--color-surface-1) px-4 py-2 transition-colors duration-150 focus:border-orange-600 ${
                              !isEditing ? "opacity-60 cursor-not-allowed" : ""
                            }`}
                          />
                          <Calendar className="absolute top-1/2 -translate-y-1/2 right-4" />
                        </div>
                      </div>
                    )}
                  />

                  <form.Field
                    name={`periods[${periodIndex}].end_date`}
                    validators={{
                      onChangeAsyncDebounceMs: 500,
                      onChangeAsync: ({ value }: any) => {
                        if (!value) return "End date is required";
                        return undefined;
                      },
                    }}
                    children={(endDateField: any) => (
                      <div className="flex flex-col gap-2">
                        <div className="flex flex-row justify-between">
                          <label className="text-sm font-semibold">End Date</label>
                          {endDateField.state.meta.isTouched && !endDateField.state.meta.isValid && (
                            <em className="text-sm font-semibold text-red-500">
                              {endDateField.state.meta.errors.join(", ")}
                            </em>
                          )}
                        </div>
                        <div className="relative">
                          <input
                            type="date"
                            value={endDateField.state.value}
                            onChange={(e) => endDateField.handleChange(e.target.value)}
                            disabled={!isEditing}
                            className={`w-full border-2 outline-none rounded-lg bg-(--color-surface-1) px-4 py-2 transition-colors duration-150 focus:border-orange-600 ${
                              !isEditing ? "opacity-60 cursor-not-allowed" : ""
                            }`}
                          />
                          <Calendar className="absolute top-1/2 -translate-y-1/2 right-4" />
                        </div>
                      </div>
                    )}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <form.Field
                    name={`periods[${periodIndex}].start_time`}
                    validators={{
                      onChangeAsyncDebounceMs: 500,
                      onChangeAsync: ({ value }: any) => {
                        if (!value) return "Start time is required";
                        return undefined;
                      },
                    }}
                    children={(startTimeField: any) => (
                      <div className="flex flex-col gap-2">
                        <div className="flex flex-row justify-between">
                          <label className="text-sm font-semibold">Start Time</label>
                          {startTimeField.state.meta.isTouched && !startTimeField.state.meta.isValid && (
                            <em className="text-sm font-semibold text-red-500">
                              {startTimeField.state.meta.errors.join(", ")}
                            </em>
                          )}
                        </div>
                        <div className="relative">
                          <input
                            type="time"
                            value={startTimeField.state.value}
                            onChange={(e) => startTimeField.handleChange(e.target.value)}
                            disabled={!isEditing}
                            className={`w-full border-2 outline-none rounded-lg bg-(--color-surface-1) px-4 py-2 transition-colors duration-150 focus:border-orange-600 ${
                              !isEditing ? "opacity-60 cursor-not-allowed" : ""
                            }`}
                          />
                          <Clock className="absolute top-1/2 -translate-y-1/2 right-4" />
                        </div>
                      </div>
                    )}
                  />

                  <form.Field
                    name={`periods[${periodIndex}].end_time`}
                    validators={{
                      onChangeAsyncDebounceMs: 500,
                      onChangeAsync: ({ value }: any) => {
                        if (!value) return "End time is required";
                        return undefined;
                      },
                    }}
                    children={(endTimeField: any) => (
                      <div className="flex flex-col gap-2">
                        <div className="flex flex-row justify-between">
                          <label className="text-sm font-semibold">End Time</label>
                          {endTimeField.state.meta.isTouched && !endTimeField.state.meta.isValid && (
                            <em className="text-sm font-semibold text-red-500">
                              {endTimeField.state.meta.errors.join(", ")}
                            </em>
                          )}
                        </div>
                        <div className="relative">
                          <input
                            type="time"
                            value={endTimeField.state.value}
                            onChange={(e) => endTimeField.handleChange(e.target.value)}
                            disabled={!isEditing}
                            className={`w-full border-2 outline-none rounded-lg bg-(--color-surface-1) px-4 py-2 transition-colors duration-150 focus:border-orange-600 ${
                              !isEditing ? "opacity-60 cursor-not-allowed" : ""
                            }`}
                          />
                          <Clock className="absolute top-1/2 -translate-y-1/2 right-4" />
                         </div>
                       </div>
                     )}
                   />
                 </div>


               </div>
             ))}
           </div>
         )}
       />
     </div>
   );
 };

// Component untuk Basic Information
const BasicInformation = ({ form, isEditing }: { form: any; isEditing: boolean }) => {
  return (
    <div className="bg-(--color-surface-1) rounded-2xl p-6 space-y-6">
      <h3 className="text-xl font-bold text-transparent bg-gradient-to-r from-white to-orange-600 bg-clip-text">
        Basic Information
      </h3>
      
      <form.Field
        name="category"
        validators={{
          onChangeAsyncDebounceMs: 500,
          onChangeAsync: async ({ value }: any) => {
            if (!value) {
              return "Category is required";
            }
            return undefined;
          },
        }}
        children={(field: any) => (
          <div className="flex flex-col gap-2">
            <div className="flex flex-row justify-between">
              <label htmlFor="category" className="text-sm font-semibold">
                Category
              </label>
              {field.state.meta.isTouched && !field.state.meta.isValid && (
                <em className="text-sm font-semibold text-red-500">
                  {field.state.meta.errors.join(", ")}
                </em>
              )}
            </div>
            <div className="relative">
              <select
                id="category"
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
                disabled={!isEditing}
                className={`w-full border-2 outline-none rounded-lg bg-(--color-surface-1) px-4 py-2 transition-colors duration-150 focus:border-orange-600 ${
                  !isEditing ? "opacity-60 cursor-not-allowed" : ""
                }`}
              >
                <option value="" disabled>
                  Select Category
                </option>
                {eventCategories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
              <Layers className="absolute top-1/2 -translate-y-1/2 right-4" />
              {field.getMeta().isValidating && (
                <div>
                  <LoaderCircle className="absolute top-1/2 -translate-y-1/2 right-12 animate-spin" />
                </div>
              )}
            </div>
          </div>
        )}
      />

      <form.Field
        name="title"
        validators={{
          onChangeAsyncDebounceMs: 500,
          onChangeAsync: async ({ value }: any) => {
            if (!value) {
              return "Title is required";
            }
            return undefined;
          },
        }}
        children={(field: any) => (
          <div className="flex flex-col gap-2">
            <div className="flex flex-row justify-between">
              <label htmlFor="title" className="text-sm font-semibold">
                Title
              </label>
              {field.state.meta.isTouched && !field.state.meta.isValid && (
                <em className="text-sm font-semibold text-red-500">
                  {field.state.meta.errors.join(", ")}
                </em>
              )}
            </div>
            <div className="relative">
              <input
                id="title"
                type="text"
                placeholder="Enter title"
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
                disabled={!isEditing}
                className={`w-full border-2 outline-none rounded-lg bg-(--color-surface-1) px-4 py-2 transition-colors duration-150 focus:border-orange-600 ${
                  !isEditing ? "opacity-60 cursor-not-allowed" : ""
                }`}
              />
              <PencilLine className="absolute top-1/2 -translate-y-1/2 right-4" />
              {field.getMeta().isValidating && (
                <div>
                  <LoaderCircle className="absolute top-1/2 -translate-y-1/2 right-12 animate-spin" />
                </div>
              )}
            </div>
          </div>
        )}
      />

      <form.Field
        name="description"
        validators={{
          onChangeAsyncDebounceMs: 500,
          onChangeAsync: async ({ value }: any) => {
            if (!value) {
              return "Description is required";
            }
            return undefined;
          },
        }}
        children={(field: any) => (
          <div className="flex flex-col gap-2">
            <div className="flex flex-row justify-between">
              <label htmlFor="description" className="text-sm font-semibold">
                Description
              </label>
              {field.state.meta.isTouched && !field.state.meta.isValid && (
                <em className="text-sm font-semibold text-red-500">
                  {field.state.meta.errors.join(", ")}
                </em>
              )}
            </div>
            <div className="relative">
              <textarea
                id="description"
                placeholder="Enter description"
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
                rows={4}
                disabled={!isEditing}
                className={`w-full border-2 outline-none rounded-lg bg-(--color-surface-1) px-4 py-2 resize-none transition-colors duration-150 focus:border-orange-600 ${
                  !isEditing ? "opacity-60 cursor-not-allowed" : ""
                }`}
              />
              <PencilLine className="absolute top-2 right-4" />
              {field.getMeta().isValidating && (
                <div>
                  <LoaderCircle className="absolute top-2 right-12 animate-spin" />
                </div>
              )}
            </div>
          </div>
        )}
      />

      <form.Field
        name="terms"
        validators={{
          onChangeAsyncDebounceMs: 500,
          onChangeAsync: ({ value }: any) => {
            if (!value) {
              return "Terms and conditions are required";
            }
            return undefined;
          },
        }}
        children={(field: any) => (
          <div className="flex flex-col gap-2">
            <div className="flex flex-row justify-between">
              <label htmlFor="terms" className="text-sm font-semibold">
                Terms & Conditions
              </label>
              {field.state.meta.isTouched && !field.state.meta.isValid && (
                <em className="text-sm font-semibold text-red-500">
                  {field.state.meta.errors.join(", ")}
                </em>
              )}
            </div>
            <div className="relative">
              <textarea
                id="terms"
                placeholder="Enter terms and conditions"
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
                rows={4}
                disabled={!isEditing}
                className={`w-full border-2 outline-none rounded-lg bg-(--color-surface-1) px-4 py-2 transition-colors duration-150 focus:border-orange-600 resize-none ${
                  !isEditing ? "opacity-60 cursor-not-allowed" : ""
                }`}
              />
              <PencilLine className="absolute top-2 right-4" />
              {field.getMeta().isValidating && (
                <div>
                  <LoaderCircle className="absolute top-2 right-12 animate-spin" />
                </div>
              )}
            </div>
          </div>
        )}
      />

      <form.Field
        name="location"
        validators={{
          onChangeAsyncDebounceMs: 500,
          onChangeAsync: ({ value }: any) => {
            if (!value) {
              return "Location is required";
            }
            return undefined;
          },
        }}
        children={(field: any) => (
          <div className="flex flex-col gap-2">
            <div className="flex flex-row justify-between">
              <label htmlFor="location" className="text-sm font-semibold">
                Location
              </label>
              {field.state.meta.isTouched && !field.state.meta.isValid && (
                <em className="text-sm font-semibold text-red-500">
                  {field.state.meta.errors.join(", ")}
                </em>
              )}
            </div>
            <div className="relative">
              <input
                id="location"
                type="text"
                placeholder="Enter location"
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
                disabled={!isEditing}
                className={`w-full border-2 outline-none rounded-lg bg-(--color-surface-1) px-4 py-2 transition-colors duration-150 focus:border-orange-600 ${
                  !isEditing ? "opacity-60 cursor-not-allowed" : ""
                }`}
              />
              <MapPin className="absolute top-1/2 -translate-y-1/2 right-4" />
              {field.getMeta().isValidating && (
                <div>
                  <LoaderCircle className="absolute top-1/2 -translate-y-1/2 right-12 animate-spin" />
                </div>
              )}
            </div>
          </div>
        )}
      />

      <form.Field
        name="image_url"
        validators={{
          onChangeAsyncDebounceMs: 500,
          onChangeAsync: ({ value }: any) => {
            if (!value) return "Image URL is required";
            return undefined;
          },
        }}
        children={(field: any) => (
          <div className="flex flex-col gap-2">
            <div className="flex flex-row justify-between">
              <label htmlFor="image_url" className="text-sm font-semibold">
                Image URL
              </label>
              {field.state.meta.isTouched && !field.state.meta.isValid && (
                <em className="text-sm font-semibold text-red-500">
                  {field.state.meta.errors.join(", ")}
                </em>
              )}
            </div>
            <div className="relative">
              <input
                id="image_url"
                type="url"
                placeholder="Enter image URL"
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
                disabled={!isEditing}
                className={`w-full border-2 outline-none rounded-lg bg-(--color-surface-1) px-4 py-2 transition-colors duration-150 focus:border-orange-600 ${
                  !isEditing ? "opacity-60 cursor-not-allowed" : ""
                }`}
              />
              <Upload className="absolute top-1/2 -translate-y-1/2 right-4" />
              {field.getMeta().isValidating && (
                <div>
                  <LoaderCircle className="absolute top-1/2 -translate-y-1/2 right-12 animate-spin" />
                </div>
              )}
            </div>
          </div>
        )}
      />

      <form.Field
        name="status"
        validators={{
          onChangeAsyncDebounceMs: 500,
          onChangeAsync: ({ value }: any) => {
            if (!value) {
              return "Status is required";
            }
            return undefined;
          },
        }}
        children={(field: any) => (
          <div className="flex flex-col gap-2">
            <div className="flex flex-row justify-between">
              <label className="text-sm font-semibold">Status</label>
              {field.state.meta.isTouched && !field.state.meta.isValid && (
                <em className="text-sm font-semibold text-red-500">
                  {field.state.meta.errors.join(", ")}
                </em>
              )}
            </div>
            <div className="relative flex gap-4">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="status"
                  value="ACTIVE"
                  checked={field.state.value === "ACTIVE"}
                  onChange={(e) => field.handleChange(e.target.value)}
                  disabled={!isEditing}
                  className="accent-orange-600"
                />
                <span className="font-semibold">ACTIVE</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="status"
                  value="INACTIVE"
                  checked={field.state.value === "INACTIVE"}
                  onChange={(e) => field.handleChange(e.target.value)}
                  disabled={!isEditing}
                  className="accent-orange-600"
                />
                <span className="font-semibold">INACTIVE</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="status"
                  value="COMPLETED"
                  checked={field.state.value === "COMPLETED"}
                  onChange={(e) => field.handleChange(e.target.value)}
                  disabled={!isEditing}
                  className="accent-orange-600"
                />
                <span className="font-semibold">COMPLETED</span>
              </label>
              {field.getMeta().isValidating && (
                <div>
                  <LoaderCircle className="absolute top-1/2 -translate-y-1/2 right-4 animate-spin" />
                </div>
              )}
            </div>
          </div>
        )}
      />
    </div>
  );
};

export default function EventProfilePage() {
  const [isLoading, setIsLoading] = React.useState(true);
  const [isEditing, setIsEditing] = React.useState(false);
  const [isDeleted, setIsDeleted] = React.useState(false);
  const [originalData, setOriginalData] = React.useState<any>(null);

  const form = useForm({
    defaultValues: {
      category: "",
      title: "",
      description: "",
      terms: "",
      location: "",
      image_url: "",
      status: "",
      periods: [
        {
          name: "",
          start_date: "",
          end_date: "",
          start_time: "",
          end_time: "",
          status: "",
          ticketTypes: [
            {
              category: "",
              price: "",
              discount: "",
              quota: "",
              status: "",
            },
          ],
        },
      ],
    },
    onSubmit: async ({ value }: any) => {
      await updateEventProfile(value);
      setOriginalData(value);
      setIsEditing(false);
      console.log("Updated form:", value);
    },
  });

  // Fetch data saat komponen pertama kali dimuat
  React.useEffect(() => {
    const loadEventProfile = async () => {
      try {
        const data = await fetchEventProfile();
        setOriginalData(data);
        
        // Set form values
        form.setFieldValue("category", data.category);
        form.setFieldValue("title", data.title);
        form.setFieldValue("description", data.description);
        form.setFieldValue("terms", data.terms);
        form.setFieldValue("location", data.location);
        form.setFieldValue("image_url", data.image_url);
        form.setFieldValue("status", data.status);
        form.setFieldValue("periods", data.periods);
        
        setIsLoading(false);
      } catch (error) {
        console.error("Error loading event profile:", error);
        setIsLoading(false);
      }
    };

    loadEventProfile();
  }, []);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    if (originalData) {
      // Reset form ke data original
      form.setFieldValue("category", originalData.category);
      form.setFieldValue("title", originalData.title);
      form.setFieldValue("description", originalData.description);
      form.setFieldValue("terms", originalData.terms);
      form.setFieldValue("location", originalData.location);
      form.setFieldValue("image_url", originalData.image_url);
      form.setFieldValue("status", originalData.status);
      form.setFieldValue("periods", originalData.periods);
    }
    setIsEditing(false);
  };

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this event profile?")) {
      await deleteEventProfile();
      setIsDeleted(true);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <LoaderCircle className="animate-spin" size={48} />
          <p className="text-lg font-semibold">Loading event profile...</p>
        </div>
      </div>
    );
  }

  if (isDeleted) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-green-600 mb-4">
            Event Profile Deleted Successfully
          </h2>
          <p className="text-gray-600">
            The event profile has been permanently removed.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <ToastContainer />

      <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2">
        <div className="flex flex-col justify-center items-center">
          <div className="relative w-md aspect-[1/1]">
            <Image
              src="/login image.svg"
              alt="Event Profile image"
              fill
              className="opacity-80"
            />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-center mb-2">TicketEase</h2>
            <p className="font-semibold">Solusi tiket event terpercaya</p>
          </div>
        </div>

        <div className="flex items-start justify-center py-8">
          <div className="w-full max-w-4xl flex flex-col gap-6">
            {/* Header */}
            <div className="bg-(--color-surface-1) rounded-2xl p-6">
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-3xl font-bold text-transparent bg-gradient-to-r from-white to-orange-600 bg-clip-text mb-2">
                    Event Profile
                  </h2>
                  <p className="text-transparent bg-gradient-to-r from-white to-orange-600 bg-clip-text">
                    {isEditing
                      ? "Edit your event information below."
                      : "View and manage your event details."}
                  </p>
                </div>
                <div className="flex gap-3">
                  {!isEditing ? (
                    <>
                      <button
                        onClick={handleEdit}
                        className="flex items-center gap-2 rounded-lg px-4 py-2 bg-blue-600 hover:bg-blue-700 transition-colors font-semibold"
                      >
                        <Edit size={16} /> Edit
                      </button>
                      <button
                        onClick={handleDelete}
                        className="flex items-center gap-2 rounded-lg px-4 py-2 bg-red-600 hover:bg-red-700 transition-colors font-semibold"
                      >
                        <Trash2 size={16} /> Delete
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={handleCancel}
                        className="flex items-center gap-2 rounded-lg px-4 py-2 bg-gray-600 hover:bg-gray-700 transition-colors font-semibold"
                      >
                        <X size={16} /> Cancel
                      </button>
                      <button
                        onClick={() => form.handleSubmit()}
                        className="flex items-center gap-2 rounded-lg px-4 py-2 bg-green-600 hover:bg-green-700 transition-colors font-semibold"
                      >
                        <Save size={16} /> Save
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* Form Sections */}
            <form
              onSubmit={(e: any) => {
                e.preventDefault();
                e.stopPropagation();
                form.handleSubmit();
              }}
              className="flex flex-col gap-6"
            >
              {/* Basic Information */}
              <BasicInformation form={form} isEditing={isEditing} />

              {/* Event Periods */}
              <EventPeriods form={form} isEditing={isEditing} />
              <TicketTypes form={form} isEditing={isEditing} />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}