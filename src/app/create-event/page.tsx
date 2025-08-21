"use client";
import React from "react";
import Image from "next/image";
import { useForm } from "@tanstack/react-form";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Layers, LoaderCircle, PencilLine, MapPin, Calendar, Clock, Plus, Trash2, Upload, DollarSign, Eye } from "lucide-react";

const createEvent = async (data: any) => {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  toast.success("Event created successfully!");

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

export default function CreateEventPage() {
  const [step, setStep] = React.useState(1);

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
      await createEvent(value);
      console.log("Submit form:", value);
    },
  });

  const addPeriod = () => {
    const currentPeriods = form.getFieldValue("periods") || [];

    form.setFieldValue("periods", [
      ...currentPeriods,
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
    ]);
  };

  const removePeriod = (index: number) => {
    const currentPeriods = form.getFieldValue("periods") || [];

    if (currentPeriods.length > 1) {
      form.setFieldValue(
        "periods",
        currentPeriods.filter((_: any, i: number) => i !== index),
      );
    }
  };

  const addTicketType = (periodIndex: number) => {
    const currentPeriods = form.getFieldValue("periods") || [];
    const updatedPeriods = [...currentPeriods];

    updatedPeriods[periodIndex].ticketTypes.push({
      category: "",
      price: "",
      discount: "",
      quota: "",
      status: "",
    });
    form.setFieldValue("periods", updatedPeriods);
  };

  const removeTicketType = (periodIndex: number, ticketIndex: number) => {
    const currentPeriods = form.getFieldValue("periods") || [];
    const updatedPeriods = [...currentPeriods];

    if (updatedPeriods[periodIndex].ticketTypes.length > 1) {
      updatedPeriods[periodIndex].ticketTypes = updatedPeriods[periodIndex].ticketTypes.filter((_: any, i: number) => i !== ticketIndex);
      form.setFieldValue("periods", updatedPeriods);
    }
  };

  return (
    <div className="min-h-100vh">
      <ToastContainer />

      <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2">
        <div className="flex flex-col justify-center items-center">
          <div className="relative w-md aspect-[1/1]">
            <Image src="/login image.svg" alt="Create Event image" fill className=" opacity-80" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-center mb-2">TicketEase</h2>
            <p className="font-semibold">Solusi tiket event terpercaya</p>
          </div>
        </div>

        <div className="flex items-center justify-center">
          <div className="w-full max-w-md flex flex-col gap-8 bg-(--color-surface-1) rounded-2xl p-6">
            {step === 1 && (
              <div className="relative text-center">
                <h2 className="text-3xl font-bold text-transparent bg-gradient-to-r from-white to-orange-600 bg-clip-text mb-2">Event Information</h2>
                <p className="text-transparent bg-gradient-to-r from-white to-orange-600 bg-clip-text">Fill in the basic information about your event.</p>
              </div>
            )}

            {step === 2 && (
              <div className="relative text-center">
                <h2 className="text-3xl font-bold text-transparent bg-gradient-to-r from-white to-orange-600 bg-clip-text mb-2">Event Periods</h2>
                <p className="text-transparent bg-gradient-to-r from-white to-orange-600 bg-clip-text">Set up the schedule and periods for your event.</p>
              </div>
            )}

            {step === 3 && (
              <div className="relative text-center">
                <h2 className="text-3xl font-bold text-transparent bg-gradient-to-r from-white to-orange-600 bg-clip-text mb-2">Ticket Types</h2>
                <p className="text-transparent bg-gradient-to-r from-white to-orange-600 bg-clip-text">Configure ticket types and pricing for each period.</p>
              </div>
            )}

            <form
              onSubmit={(e: any) => {
                e.preventDefault();
                e.stopPropagation();
                if (step === 3) form.handleSubmit();
                else setStep(step + 1);
              }}
              className="flex flex-col gap-6"
            >
              {step === 1 && (
                <>
                  <form.Field
                    name="category"
                    validators={{
                      onChangeAsyncDebounceMs: 500,
                      onChangeAsync: async ({ value }) => {
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
                          {field.state.meta.isTouched && !field.state.meta.isValid && <em className="text-sm font-semibold text-red-500">{field.state.meta.errors.join(", ")}</em>}
                        </div>
                        <div className="relative">
                          <select id="category" value={field.state.value} onChange={(e) => field.handleChange(e.target.value)} className="w-full border-2 outline-none rounded-lg bg-(--color-surface-1) px-4 py-2 transition-colors duration-150 focus:border-orange-600">
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
                      onChangeAsync: async ({ value }) => {
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
                          {field.state.meta.isTouched && !field.state.meta.isValid && <em className="text-sm font-semibold text-red-500">{field.state.meta.errors.join(", ")}</em>}
                        </div>
                        <div className="relative">
                          <input id="title" type="text" placeholder="Enter title" value={field.state.value} onChange={(e) => field.handleChange(e.target.value)} className="w-full border-2 outline-none rounded-lg bg-(--color-surface-1) px-4 py-2 transition-colors duration-150 focus:border-orange-600" />
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
                      onChangeAsync: async ({ value }) => {
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
                          {field.state.meta.isTouched && !field.state.meta.isValid && <em className="text-sm font-semibold text-red-500">{field.state.meta.errors.join(", ")}</em>}
                        </div>
                        <div className="relative">
                          <textarea id="description" placeholder="Enter description" value={field.state.value} onChange={(e) => field.handleChange(e.target.value)} rows={4} className="w-full border-2 outline-none rounded-lg bg-(--color-surface-1) px-4 py-2 resize-none transition-colors duration-150 focus:border-orange-600 " />
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
                      onChangeAsync: ({ value }) => {
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
                          {field.state.meta.isTouched && !field.state.meta.isValid && <em className="text-sm font-semibold text-red-500">{field.state.meta.errors.join(", ")}</em>}
                        </div>
                        <div className="relative">
                          <textarea id="terms" placeholder="Enter terms and conditions" value={field.state.value} onChange={(e) => field.handleChange(e.target.value)} rows={4} className="w-full border-2 outline-none rounded-lg bg-(--color-surface-1) px-4 py-2 transition-colors duration-150 focus:border-orange-600 resize-none" />
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
                      onChangeAsync: ({ value }) => {
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
                          {field.state.meta.isTouched && !field.state.meta.isValid && <em className="text-sm font-semibold text-red-500">{field.state.meta.errors.join(", ")}</em>}
                        </div>
                        <div className="relative">
                          <input id="location" type="text" placeholder="Enter location" value={field.state.value} onChange={(e) => field.handleChange(e.target.value)} className="w-full border-2 outline-none rounded-lg bg-(--color-surface-1) px-4 py-2 transition-colors duration-150 focus:border-orange-600" />
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
                      onChangeAsync: ({ value }) => {
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
                          {field.state.meta.isTouched && !field.state.meta.isValid && <em className="text-sm font-semibold text-red-500">{field.state.meta.errors.join(", ")}</em>}
                        </div>
                        <div className="relative">
                          <input id="image_url" type="url" placeholder="Enter image URL" value={field.state.value} onChange={(e) => field.handleChange(e.target.value)} className="w-full border-2 outline-none rounded-lg bg-(--color-surface-1) px-4 py-2 transition-colors duration-150 focus:border-orange-600" />
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
                      onChangeAsync: ({ value }) => {
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
                          {field.state.meta.isTouched && !field.state.meta.isValid && <em className="text-sm font-semibold text-red-500">{field.state.meta.errors.join(", ")}</em>}
                        </div>
                        <div className="relative flex gap-4">
                          <label className="flex items-center gap-2 cursor-pointer">
                            <input type="radio" name="status" value="ACTIVE" checked={field.state.value === "ACTIVE"} onChange={(e) => field.handleChange(e.target.value)} className="accent-orange-600" />
                            <span className="font-semibold">ACTIVE</span>
                          </label>
                          <label className="flex items-center gap-2 cursor-pointer">
                            <input type="radio" name="status" value="INACTIVE" checked={field.state.value === "INACTIVE"} onChange={(e) => field.handleChange(e.target.value)} className="accent-orange-600" />
                            <span className="font-semibold">INACTIVE</span>
                          </label>
                          <label className="flex items-center gap-2 cursor-pointer">
                            <input type="radio" name="status" value="COMPLETED" checked={field.state.value === "COMPLETED"} onChange={(e) => field.handleChange(e.target.value)} className="accent-orange-600" />
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
                </>
              )}

              {/* Step 2: Event Periods */}
              {step === 2 && (
                <>
                  <form.Field
                    name="periods"
                    children={(field: any) => (
                      <div className="flex flex-col gap-4">
                        <div className="flex justify-between items-center">
                          <label className="font-semibold">Event Periods</label>
                          <button type="button" onClick={addPeriod} className="text-sm flex items-center gap-2 rounded-lg px-4 py-2 bg-orange-600">
                            <Plus size={16} /> Add Period
                          </button>
                        </div>

                        {(field.state.value || []).map((period: any, periodIndex: number) => (
                          <div key={periodIndex} className="border-2 rounded-lg p-4 space-y-4">
                            <div className="flex justify-between items-center">
                              <h4 className="font-bold">Period {periodIndex + 1}</h4>
                              {(field.state.value || []).length > 1 && (
                                <button type="button" onClick={() => removePeriod(periodIndex)} className="text-red-500 hover:text-red-700">
                                  <Trash2 size={16} />
                                </button>
                              )}
                            </div>

                            <form.Field
                              name={`periods[${periodIndex}].name`}
                              validators={{
                                onChangeAsyncDebounceMs: 500,
                                onChangeAsync: ({ value }) => {
                                  if (!value) {
                                    return "Period name is required";
                                  }
                                  return undefined;
                                },
                              }}
                              children={(periodField: any) => (
                                <div className="flex flex-col gap-2">
                                  <div className="flex flex-row justify-between">
                                    <label htmlFor="period_name" className="text-sm font-semibold">
                                      Period Name
                                    </label>
                                    {periodField.state.meta.isTouched && !periodField.state.meta.isValid && <em className="text-sm font-semibold text-red-500">{periodField.state.meta.errors.join(", ")}</em>}
                                  </div>
                                  <div className="relative">
                                    <input id="period_name" type="text" placeholder="Enter period name" value={periodField.state.value} onChange={(e) => periodField.handleChange(e.target.value)} className="w-full border-2 outline-none rounded-lg bg-(--color-surface-1) px-4 py-2 transition-colors duration-150 focus:border-orange-600" />
                                    <PencilLine className="absolute top-1/2 -translate-y-1/2 right-4" />
                                    {periodField.state.meta.isValidating && (
                                      <div className="absolute top-1/2 -translate-y-1/2 right-12">
                                        <LoaderCircle className="animate-spin" />
                                      </div>
                                    )}
                                  </div>
                                </div>
                              )}
                            />

                            <div className="grid grid-cols-2 gap-4">
                              <form.Field
                                name={`periods[${periodIndex}].start_date`}
                                validators={{
                                  onChangeAsyncDebounceMs: 500,
                                  onChangeAsync: ({ value }) => {
                                    if (!value) {
                                      return "Start date is required";
                                    }
                                    const endDate = form.getFieldValue(`periods[${periodIndex}].end_date`);
                                    if (endDate && value > endDate) {
                                      return "Start date must be before end date";
                                    }
                                    return undefined;
                                  },
                                }}
                                children={(periodField: any) => (
                                  <div className="flex flex-col gap-2">
                                    <div className="flex flex-row justify-between">
                                      <label htmlFor="start_date" className="text-sm font-semibold">
                                        Start Date
                                      </label>
                                      {periodField.state.meta.isTouched && !periodField.state.meta.isValid && <em className="text-sm font-semibold text-red-500">{periodField.state.meta.errors.join(", ")}</em>}
                                    </div>
                                    <div className="relative">
                                      <input id="start_date" type="date" value={periodField.state.value} onChange={(e) => periodField.handleChange(e.target.value)} className="w-full border-2 outline-none rounded-lg bg-(--color-surface-1) px-4 py-2 transition-colors duration-150 focus:border-orange-600" />
                                      <Calendar className="absolute top-1/2 -translate-y-1/2 right-2" />
                                      {periodField.state.meta.isValidating && (
                                        <div className="absolute top-1/2 -translate-y-1/2 right-10">
                                          <LoaderCircle className="animate-spin" />
                                        </div>
                                      )}
                                    </div>
                                  </div>
                                )}
                              />

                              <form.Field
                                name={`periods[${periodIndex}].end_date`}
                                validators={{
                                  onChangeAsyncDebounceMs: 500,
                                  onChangeAsync: ({ value }) => {
                                    if (!value) {
                                      return "End date is required";
                                    }
                                    const startDate = form.getFieldValue(`periods[${periodIndex}].start_date`);
                                    if (startDate && value < startDate) {
                                      return "End date must be after start date";
                                    }
                                    return undefined;
                                  },
                                }}
                                children={(periodField: any) => (
                                  <div className="flex flex-col gap-2">
                                    <div className="flex flex-row justify-between">
                                      <label htmlFor="end_date" className="text-sm font-semibold">
                                        End Date
                                      </label>
                                      {periodField.state.meta.isTouched && !periodField.state.meta.isValid && <em className="text-sm font-semibold text-red-500">{periodField.state.meta.errors.join(", ")}</em>}
                                    </div>
                                    <div className="relative">
                                      <input id="end_date" type="date" value={periodField.state.value} onChange={(e) => periodField.handleChange(e.target.value)} className="w-full border-2 outline-none rounded-lg bg-(--color-surface-1) px-4 py-2 transition-colors duration-150 focus:border-orange-600" />
                                      <Calendar className="absolute top-1/2 -translate-y-1/2 right-2" />
                                      {periodField.state.meta.isValidating && (
                                        <div className="absolute top-1/2 -translate-y-1/2 right-10">
                                          <LoaderCircle className="animate-spin" />
                                        </div>
                                      )}
                                    </div>
                                  </div>
                                )}
                              />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                              <form.Field
                                name={`periods[${periodIndex}].start_time`}
                                validators={{
                                  onChangeAsyncDebounceMs: 500,
                                  onChangeAsync: ({ value }) => {
                                    if (!value) {
                                      return "Start time is required";
                                    }
                                    const endTime = form.getFieldValue(`periods[${periodIndex}].end_time`);
                                    if (endTime && value >= endTime) {
                                      return "Start time must be before end time";
                                    }
                                    return undefined;
                                  },
                                }}
                                children={(periodField: any) => (
                                  <div className="flex flex-col gap-2">
                                    <div className="flex flex-row justify-between">
                                      <label htmlFor="start_time" className="text-sm font-semibold">
                                        Start Time
                                      </label>
                                      {periodField.state.meta.isTouched && !periodField.state.meta.isValid && <em className="text-sm font-semibold text-red-500">{periodField.state.meta.errors.join(", ")}</em>}
                                    </div>
                                    <div className="relative">
                                      <input id="start_time" type="time" value={periodField.state.value} onChange={(e) => periodField.handleChange(e.target.value)} className="w-full border-2 outline-none rounded-lg bg-(--color-surface-1) px-4 py-2 transition-colors duration-150 focus:border-orange-600" />
                                      <Clock className="absolute top-1/2 -translate-y-1/2 right-2" />
                                      {periodField.state.meta.isValidating && (
                                        <div className="absolute top-1/2 -translate-y-1/2 right-10">
                                          <LoaderCircle className="animate-spin" />
                                        </div>
                                      )}
                                    </div>
                                  </div>
                                )}
                              />

                              <form.Field
                                name={`periods[${periodIndex}].end_time`}
                                validators={{
                                  onChangeAsyncDebounceMs: 500,
                                  onChangeAsync: ({ value }) => {
                                    if (!value) {
                                      return "End time is required";
                                    }
                                    const startTime = form.getFieldValue(`periods[${periodIndex}].start_time`);
                                    if (startTime && value <= startTime) {
                                      return "End time must be after start time";
                                    }
                                    return undefined;
                                  },
                                }}
                                children={(periodField: any) => (
                                  <div className="flex flex-col gap-2">
                                    <div className="flex flex-row justify-between">
                                      <label htmlFor="end_time" className="text-sm font-semibold">
                                        End Time
                                      </label>
                                      {periodField.state.meta.isTouched && !periodField.state.meta.isValid && <em className="text-sm font-semibold text-red-500">{periodField.state.meta.errors.join(", ")}</em>}
                                    </div>
                                    <div className="relative">
                                      <input id="end_time" type="time" value={periodField.state.value} onChange={(e) => periodField.handleChange(e.target.value)} className="w-full border-2 outline-none rounded-lg bg-(--color-surface-1) px-4 py-2 transition-colors duration-150 focus:border-orange-600" />
                                      <Clock className="absolute top-1/2 -translate-y-1/2 right-2" />
                                      {periodField.state.meta.isValidating && (
                                        <div className="absolute top-1/2 -translate-y-1/2 right-10">
                                          <LoaderCircle className="animate-spin" />
                                        </div>
                                      )}
                                    </div>
                                  </div>
                                )}
                              />
                            </div>

                            <form.Field
                              name={`periods[${periodIndex}].status`}
                              validators={{
                                onChangeAsyncDebounceMs: 500,
                                onChangeAsync: ({ value }) => {
                                  if (!value) {
                                    return "Period status is required";
                                  }
                                  return undefined;
                                },
                              }}
                              children={(periodField: any) => (
                                <div className="flex flex-col gap-2">
                                  <div className="flex flex-row justify-between">
                                    <label className="text-sm font-semibold">Period Status</label>
                                    {periodField.state.meta.isTouched && !periodField.state.meta.isValid && <em className="text-sm font-semibold text-red-500">{periodField.state.meta.errors.join(", ")}</em>}
                                  </div>
                                  <div className="relative flex gap-4">
                                    <label className="flex items-center gap-2 cursor-pointer">
                                      <input type="radio" name={`period_status_${periodIndex}`} value="UPCOMING" checked={periodField.state.value === "UPCOMING"} onChange={(e) => periodField.handleChange(e.target.value)} className="accent-orange-600" />
                                      <span className="font-semibold">UPCOMING</span>
                                    </label>
                                    <label className="flex items-center gap-2 cursor-pointer">
                                      <input type="radio" name={`period_status_${periodIndex}`} value="ONGOING" checked={periodField.state.value === "ONGOING"} onChange={(e) => periodField.handleChange(e.target.value)} className="accent-orange-600" />
                                      <span className="font-semibold">ONGOING</span>
                                    </label>
                                    <label className="flex items-center gap-2 cursor-pointer">
                                      <input type="radio" name={`period_status_${periodIndex}`} value="COMPLETED" checked={periodField.state.value === "COMPLETED"} onChange={(e) => periodField.handleChange(e.target.value)} className="accent-orange-600" />
                                      <span className="font-semibold">COMPLETED</span>
                                    </label>
                                  </div>
                                </div>
                              )}
                            />
                          </div>
                        ))}
                      </div>
                    )}
                  />
                </>
              )}

              {/* Step 3: Ticket Types */}
              {step === 3 && (
                <>
                  <form.Field
                    name="periods"
                    children={(field: any) => (
                      <div className="flex flex-col gap-6">
                        {(field.state.value || []).map((period: any, periodIndex: number) => (
                          <div key={periodIndex} className="flex flex-col gap-4 p-4">
                            <div className="flex justify-between items-center">
                              <label className="font-bold">Tickets for {period.name || `Period ${periodIndex + 1}`}</label>
                              <button type="button" onClick={() => addTicketType(periodIndex)} className="text-sm flex items-center gap-2 rounded-lg bg-orange-600 px-4 py-2">
                                <Plus size={16} /> Add Ticket
                              </button>
                            </div>

                            {(period.ticketTypes || []).map((ticket: any, ticketIndex: number) => (
                              <div key={ticketIndex} className="border-2 rounded-lg p-4 space-y-4">
                                <div className="flex justify-between items-center">
                                  <h4 className="text-sm font-semibold">Ticket Type {ticketIndex + 1}</h4>
                                  {(period.ticketTypes || []).length > 1 && (
                                    <button type="button" onClick={() => removeTicketType(periodIndex, ticketIndex)} className="text-red-500 hover:text-red-700">
                                      <Trash2 size={16} />
                                    </button>
                                  )}
                                </div>

                                <form.Field
                                  name={`periods[${periodIndex}].ticketTypes[${ticketIndex}].category`}
                                  validators={{
                                    onChangeAsyncDebounceMs: 500,
                                    onChangeAsync: async ({ value }) => {
                                      if (!value) {
                                        return "Category is required";
                                      }
                                      return undefined;
                                    },
                                  }}
                                  children={(ticketField: any) => (
                                    <div className="flex flex-col gap-2">
                                      <div className="flex flex-row justify-between">
                                        <label htmlFor="category" className="text-sm font-semibold">
                                          Category
                                        </label>
                                        {ticketField.state.meta.isTouched && !ticketField.state.meta.isValid && <em className="text-sm font-semibold text-red-500">{ticketField.state.meta.errors.join(", ")}</em>}
                                      </div>
                                      <div className="relative">
                                        <select id="category" value={ticketField.state.value} onChange={(e) => ticketField.handleChange(e.target.value)} className="w-full border-2 outline-none rounded-lg bg-(--color-surface-1) px-3 py-2 text-sm transition-colors duration-150 focus:border-orange-600">
                                          <option value="" disabled>
                                            Select Category
                                          </option>
                                          {ticketCategories.map((cat) => (
                                            <option key={cat.id} value={cat.id}>
                                              {cat.name}
                                            </option>
                                          ))}
                                        </select>
                                        <Layers className="absolute top-1/2 -translate-y-1/2 right-4" />
                                        {ticketField.state.meta.isValidating && (
                                          <div className="absolute top-1/2 -translate-y-1/2 right-12">
                                            <LoaderCircle className="animate-spin" />
                                          </div>
                                        )}
                                      </div>
                                    </div>
                                  )}
                                />

                                <div className="grid grid-cols-2 gap-3">
                                  <form.Field
                                    name={`periods[${periodIndex}].ticketTypes[${ticketIndex}].price`}
                                    validators={{
                                      onChangeAsyncDebounceMs: 500,
                                      onChangeAsync: async ({ value }) => {
                                        if (!value) {
                                          return "Price is required";
                                        }
                                        if (isNaN(Number(value)) || Number(value) < 0) {
                                          return "Price must be a valid number";
                                        }
                                        return undefined;
                                      },
                                    }}
                                    children={(ticketField: any) => (
                                      <div className="flex flex-col gap-2">
                                        <div className="flex flex-row justify-between">
                                          <label htmlFor="price" className="text-sm font-semibold">
                                            Price
                                          </label>
                                          {ticketField.state.meta.isTouched && !ticketField.state.meta.isValid && <em className="text-sm font-semibold text-red-500">{ticketField.state.meta.errors.join(", ")}</em>}
                                        </div>
                                        <div className="relative">
                                          <input id="price" type="number" placeholder="Enter price" value={ticketField.state.value} onChange={(e) => ticketField.handleChange(e.target.value)} className="w-full border-2 outline-none rounded-lg bg-(--color-surface-1) px-3 py-2 text-sm transition-colors duration-150 focus:border-orange-600" />
                                          <DollarSign className="absolute top-1/2 -translate-y-1/2 right-2" />
                                          {ticketField.state.meta.isValidating && (
                                            <div className="absolute top-1/2 -translate-y-1/2 right-10">
                                              <LoaderCircle className="animate-spin" />
                                            </div>
                                          )}
                                        </div>
                                      </div>
                                    )}
                                  />

                                  <form.Field
                                    name={`periods[${periodIndex}].ticketTypes[${ticketIndex}].discount`}
                                    validators={{
                                      onChangeAsyncDebounceMs: 500,
                                      onChangeAsync: async ({ value }) => {
                                        if (isNaN(Number(value)) || Number(value) < 0) {
                                          return "Price must be a valid number";
                                        }
                                        return undefined;
                                      },
                                    }}
                                    children={(ticketField: any) => (
                                      <div className="flex flex-col gap-2">
                                        <div className="flex flex-row justify-between">
                                          <label htmlFor="discount" className="text-sm font-semibold">
                                            Discount
                                          </label>
                                          {ticketField.state.meta.isTouched && !ticketField.state.meta.isValid && <em className="text-sm font-semibold text-red-500">{ticketField.state.meta.errors.join(", ")}</em>}
                                        </div>
                                        <div className="relative">
                                          <input id="discount" type="number" placeholder="Enter discount" value={ticketField.state.value} onChange={(e) => ticketField.handleChange(e.target.value)} className="w-full border-2 outline-none rounded-lg bg-(--color-surface-1) px-3 py-2 text-sm transition-colors duration-150 focus:border-orange-600" />
                                          <DollarSign className="absolute top-1/2 -translate-y-1/2 right-2" />
                                          {ticketField.state.meta.isValidating && (
                                            <div className="absolute top-1/2 -translate-y-1/2 right-10">
                                              <LoaderCircle className="animate-spin" />
                                            </div>
                                          )}
                                        </div>
                                      </div>
                                    )}
                                  />
                                </div>

                                <form.Field
                                  name={`periods[${periodIndex}].ticketTypes[${ticketIndex}].quota`}
                                  validators={{
                                    onChangeAsyncDebounceMs: 500,
                                    onChangeAsync: ({ value }) => {
                                      if (!value) {
                                        return "Quota is required";
                                      }
                                      if (isNaN(Number(value)) || Number(value) < 1) {
                                        return "Quota must be at least 1";
                                      }
                                      return undefined;
                                    },
                                  }}
                                  children={(ticketField: any) => (
                                    <div className="flex flex-col gap-2">
                                      <div className="flex flex-row justify-between">
                                        <label htmlFor="quota" className="text-sm font-semibold">
                                          Quota
                                        </label>
                                        {ticketField.state.meta.isTouched && !ticketField.state.meta.isValid && <em className="text-sm font-semibold text-red-500">{ticketField.state.meta.errors.join(", ")}</em>}
                                      </div>
                                      <div className="relative">
                                        <input id="quota" type="number" placeholder="Enter Quota" value={ticketField.state.value} onChange={(e) => ticketField.handleChange(e.target.value)} className="w-full border-2 outline-none rounded-lg bg-(--color-surface-1) px-3 py-2 text-sm transition-colors duration-150 focus:border-orange-600" />
                                        <Eye className="absolute top-1/2 -translate-y-1/2 right-4" />
                                        {ticketField.state.meta.isValidating && (
                                          <div className="absolute top-1/2 -translate-y-1/2 right-12">
                                            <LoaderCircle className="animate-spin" />
                                          </div>
                                        )}
                                      </div>
                                    </div>
                                  )}
                                />

                                <form.Field
                                  name={`periods[${periodIndex}].ticketTypes[${ticketIndex}].status`}
                                  validators={{
                                    onChangeAsyncDebounceMs: 500,
                                    onChangeAsync: async ({ value }) => {
                                      if (!value) {
                                        return "Ticket status is required";
                                      }
                                      return undefined;
                                    },
                                  }}
                                  children={(ticketField: any) => (
                                    <div className="flex flex-col gap-2">
                                      <div className="flex flex-row justify-between">
                                        <label className="text-sm font-semibold">Ticket Status</label>
                                        {ticketField.state.meta.isTouched && !ticketField.state.meta.isValid && <em className="text-sm font-semibold text-red-500">{ticketField.state.meta.errors.join(", ")}</em>}
                                      </div>
                                      <div className="relative flex gap-4">
                                        <label className="flex items-center gap-2 cursor-pointer">
                                          <input type="radio" name={`ticket_status_${periodIndex}_${ticketIndex}`} value="AVAILABLE" checked={ticketField.state.value === "AVAILABLE"} onChange={(e) => ticketField.handleChange(e.target.value)} onBlur={ticketField.handleBlur} className="accent-orange-600" />
                                          <span className="text-sm font-semibold">AVAILABLE</span>
                                        </label>
                                        <label className="flex items-center gap-2 cursor-pointer">
                                          <input type="radio" name={`ticket_status_${periodIndex}_${ticketIndex}`} value="SOLD OUT" checked={ticketField.state.value === "SOLD OUT"} onChange={(e) => ticketField.handleChange(e.target.value)} onBlur={ticketField.handleBlur} className="accent-orange-600" />
                                          <span className="text-sm font-semibold">SOLD OUT</span>
                                        </label>
                                        {ticketField.state.meta.isValidating && (
                                          <div className="absolute top-1/2 -translate-y-1/2 right-10">
                                            <LoaderCircle className="animate-spin" />
                                          </div>
                                        )}
                                      </div>
                                    </div>
                                  )}
                                />
                              </div>
                            ))}
                          </div>
                        ))}
                      </div>
                    )}
                  />
                </>
              )}

              {/* Navigation Buttons */}
              <div className="flex gap-4">
                {step > 1 && (
                  <button type="button" onClick={() => setStep(step - 1)} className="font-semibold w-full flex items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-gray-500 to-gray-600 py-2 px-4 cursor-pointer">
                    Back
                  </button>
                )}

                <form.Subscribe
                  selector={(state) => {
                    if (step === 1) {
                      const categoryField = state.fieldMeta.category;
                      const titleField = state.fieldMeta.title;
                      const descriptionField = state.fieldMeta.description;
                      const termsField = state.fieldMeta.terms;
                      const locationField = state.fieldMeta.location;
                      const imageField = state.fieldMeta.image_url;
                      const statusField = state.fieldMeta.status;
                      return (
                        categoryField?.isValid === true &&
                        categoryField?.isTouched === true &&
                        titleField?.isValid === true &&
                        titleField?.isTouched === true &&
                        descriptionField?.isValid === true &&
                        descriptionField?.isTouched === true &&
                        termsField?.isValid === true &&
                        termsField?.isTouched === true &&
                        locationField?.isValid === true &&
                        locationField?.isTouched === true &&
                        imageField?.isValid === true &&
                        imageField?.isTouched === true &&
                        statusField?.isValid === true &&
                        statusField?.isTouched === true
                      );
                    }
                    if (step === 2) {
                      const periods = state.values.periods || [];
                      return (
                        periods.length > 0 &&
                        periods.every((period: any) => {
                          return period.name && period.start_date && period.end_date && period.start_time && period.end_time && period.status;
                        })
                      );
                    }
                    if (step === 3) {
                      const periods = state.values.periods || [];
                      return (
                        periods.length > 0 &&
                        periods.every((period: any) => {
                          return (
                            (period.ticketTypes || []).length > 0 &&
                            (period.ticketTypes || []).every((ticket: any) => {
                              return ticket.category_id && ticket.price && ticket.quota && ticket.status;
                            })
                          );
                        })
                      );
                    }
                    return false;
                  }}
                  children={(isValid) => (
                    <button type="submit" disabled={!isValid} className={`font-semibold w-full flex items-center justify-center gap-2 rounded-lg py-2 px-4 ${isValid ? "bg-gradient-to-r from-orange-500 to-orange-600 cursor-pointer" : "bg-gradient-to-r from-gray-500 to-gray-600 cursor-not-allowed"}`}>
                      {step === 3 ? "Create Event" : "Next"}
                    </button>
                  )}
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
