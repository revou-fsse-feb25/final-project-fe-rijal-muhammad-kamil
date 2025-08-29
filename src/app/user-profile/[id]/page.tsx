"use client";

import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { useForm } from "@tanstack/react-form";
import Image from "next/image";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Mail, LoaderCircle, UserRoundPen, Phone, Calendar } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { fetchUser } from "@/service/user.api";

export default function UserProfile({ params }: { params: { id: string } }) {
  const { data: session } = useSession();
  const token = session?.access_token;

  const [isEditMode, setIsEditMode] = useState(false);
  const [initialData, setInitialData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm({
    defaultValues: {
      email: "",
      phone_number: "",
      first_name: "",
      last_name: "",
      date_of_birth: "",
      gender: "",
      role: "",
    },
    onSubmit: async ({ value }: any) => {
      try {
        await updateUserMutation.mutateAsync(value);
        setIsEditMode(false);
        setInitialData(value);
      } catch (err: any) {
        toast.error(err.message || "Failed to update profile");
      }
    },
  });

  const fetchUserMutation = useMutation({
    mutationFn: async () => fetchUser({ endpoint: `/users/${params.id}`, method: "GET", token: token }),
    onSuccess: (response: any) => {
      setIsLoading(false);
      if (!response || !response.data) return;
      const data = response.data;
      form.setFieldValue("email", data.email);
      form.setFieldValue("phone_number", data.phone_number);
      form.setFieldValue("first_name", data.first_name);
      form.setFieldValue("last_name", data.last_name);
      form.setFieldValue("date_of_birth", data.date_of_birth);
      form.setFieldValue("gender", data.gender);
      form.setFieldValue("role", data.role);
      setInitialData(data);
    },
    onError: (err: any) => {
      setIsLoading(false);
      toast.error(err.message || "Failed to fetch user");
    },
  });

  const updateUserMutation = useMutation({
    mutationFn: async (data: any) => fetchUser({ endpoint: `/users/${params.id}`, method: "PATCH", data, token }),
    onSuccess: () => toast.success("Profile updated successfully!"),
    onError: (err: any) => toast.error(err.message || "Failed to update profile"),
  });

  const deleteUserMutation = useMutation({
    mutationFn: async () => fetchUser({ endpoint: `/users/${params.id}`, method: "DELETE", token }),
    onSuccess: () => {
      toast.success("Profile deleted successfully!");
      form.reset({
        email: "",
        phone_number: "",
        first_name: "",
        last_name: "",
        date_of_birth: "",
        gender: "",
        role: "",
      });
      setInitialData(null);
      setIsEditMode(false);
    },
    onError: (err: any) => toast.error(err.message || "Failed to delete profile"),
  });

  useEffect(() => {
    setIsLoading(true);
    if (!token || !params.id) {
      setIsLoading(false);
      return;
    }
    fetchUserMutation.mutate();
  }, [params.id, token]);

  const handleCancel = () => {
    if (!initialData) return;

    form.setFieldValue("email", initialData.email);
    form.setFieldValue("phone_number", initialData.phone_number);
    form.setFieldValue("first_name", initialData.first_name);
    form.setFieldValue("last_name", initialData.last_name || "");
    form.setFieldValue("date_of_birth", initialData.date_of_birth);
    form.setFieldValue("gender", initialData.gender);
    form.setFieldValue("role", initialData.role);

    setIsEditMode(false);
  };

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this profile? This action cannot be undone.")) {
      await deleteUserMutation.mutateAsync();
    }
  };

  if (isLoading || fetchUserMutation.isPending) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoaderCircle className="animate-spin" size={48} />
      </div>
    );
  }

  return (
    <div className="min-h-100vh py-18">
      <ToastContainer />
      <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2">
        <div className="flex flex-col justify-center items-center">
          <div className="relative w-md aspect-[1/1]">
            <Image src="/login image.svg" alt="Login image" fill className=" opacity-80" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-center mb-2">TicketEase</h2>
            <p className="font-semibold">Solusi tiket event terpercaya</p>
          </div>
        </div>

        <div className="flex items-center justify-center">
          <div className="w-full max-w-md flex flex-col gap-8 bg-(--color-surface-1) rounded-2xl p-6">
            <div className="relative text-center">
              <h1 className="text-3xl font-bold text-transparent bg-gradient-to-r from-white to-orange-600 bg-clip-text mb-2">User Profile</h1>
              <p className="text-transparent bg-gradient-to-r from-white to-orange-600 bg-clip-text">Manage your profile information</p>
            </div>

            <form
              onSubmit={(e: any) => {
                e.preventDefault();
                e.stopPropagation();
                form.handleSubmit();
              }}
              className="flex flex-col gap-6"
            >
              <form.Field
                name="email"
                validators={{
                  onChangeAsyncDebounceMs: 500,
                  onChangeAsync: async ({ value }) => {
                    if (!value) {
                      return "Email is required";
                    }
                    if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
                      return "Invalid email address";
                    }
                    return undefined;
                  },
                }}
                children={(field: any) => (
                  <div className="flex flex-col gap-2">
                    <div className="flex flex-row justify-between">
                      <label htmlFor="email" className="text-sm font-semibold">
                        Email
                      </label>
                      {field.state.meta.isTouched && !field.state.meta.isValid && <em className="text-sm font-semibold text-red-500">{field.state.meta.errors.join(", ")}</em>}
                    </div>
                    <div className="relative">
                      <input id="email" type="email" placeholder="email" autoComplete="email" value={field.state.value} onChange={(e) => field.handleChange(e.target.value)} disabled={!isEditMode} className="w-full border-2 outline-none rounded-lg bg-(--color-surface-1) px-4 py-2 transition-colors duration-150 focus:border-orange-600" />
                      <Mail className="absolute top-1/2 -translate-y-1/2 right-4" />
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
                name="phone_number"
                validators={{
                  onChangeAsyncDebounceMs: 500,
                  onChangeAsync: async ({ value }) => {
                    if (!value) {
                      return "Phone number is required";
                    }
                    return undefined;
                  },
                }}
                children={(field: any) => (
                  <div className="flex flex-col gap-2">
                    <div className="flex flex-row justify-between">
                      <label htmlFor="phone_number" className="text-sm font-semibold">
                        Phone Number
                      </label>
                      {field.state.meta.isTouched && !field.state.meta.isValid && <em className="text-sm font-semibold text-red-500">{field.state.meta.errors.join(", ")}</em>}
                    </div>
                    <div className="relative">
                      <input id="phone_number" type="tel" placeholder="phone number" value={field.state.value} onChange={(e) => field.handleChange(e.target.value)} disabled={!isEditMode} className="w-full border-2 outline-none rounded-lg bg-(--color-surface-1) px-4 py-2 transition-colors duration-150 ease-in focus:border-orange-600" />
                      <Phone className="absolute top-1/2 -translate-y-1/2 right-4" />
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
                name="first_name"
                validators={{
                  onChangeAsyncDebounceMs: 500,
                  onChangeAsync: async ({ value }) => {
                    if (!value) {
                      return "First name is required";
                    }
                    return undefined;
                  },
                }}
                children={(field: any) => (
                  <div className="flex flex-col gap-2">
                    <div className="flex flex-row justify-between">
                      <label htmlFor="firstName" className="text-sm font-semibold">
                        First Name
                      </label>
                      {field.state.meta.isTouched && !field.state.meta.isValid && <em className="text-sm font-semibold text-red-500">{field.state.meta.errors.join(", ")}</em>}
                    </div>
                    <div className="relative">
                      <input id="firstName" type="text" placeholder="first name" value={field.state.value} onChange={(e) => field.handleChange(e.target.value)} disabled={!isEditMode} className="w-full border-2 outline-none rounded-lg bg-(--color-surface-1) px-4 py-2 transition-colors duration-150 ease-in focus:border-orange-600" />
                      <UserRoundPen className="absolute top-1/2 -translate-y-1/2 right-4" />
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
                name="last_name"
                validators={{
                  onChangeAsyncDebounceMs: 500,
                  onChangeAsync: async ({ value }) => {
                    if (!value) {
                      return "Last name is required";
                    }
                    return undefined;
                  },
                }}
                children={(field: any) => (
                  <div className="flex flex-col gap-2">
                    <div className="flex flex-row justify-between">
                      <label htmlFor="lastName" className="text-sm font-semibold">
                        Last Name
                      </label>
                      {field.state.meta.isTouched && !field.state.meta.isValid && <em className="text-sm font-semibold text-red-500">{field.state.meta.errors.join(", ")}</em>}
                    </div>
                    <div className="relative">
                      <input id="lastName" type="text" placeholder="last name" value={field.state.value} onChange={(e) => field.handleChange(e.target.value)} disabled={!isEditMode} className="w-full border-2 outline-none rounded-lg bg-(--color-surface-1) px-4 py-2 transition-colors duration-150 ease-in focus:border-orange-600" />
                      <UserRoundPen className="absolute top-1/2 -translate-y-1/2 right-4" />
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
                name="date_of_birth"
                validators={{
                  onChangeAsyncDebounceMs: 500,
                  onChangeAsync: async ({ value }) => {
                    if (!value) {
                      return "ate of birth is required";
                    }
                    return undefined;
                  },
                }}
                children={(field: any) => (
                  <div className="flex flex-col gap-2">
                    <div className="flex flex-row justify-between">
                      <label htmlFor="birthDate" className="text-sm font-semibold">
                        Birth Date
                      </label>
                      {field.state.meta.isTouched && !field.state.meta.isValid && <em className="text-sm font-semibold text-red-500">{field.state.meta.errors.join(", ")}</em>}
                    </div>
                    <div className="relative">
                      <input id="birthDate" type="date" placeholder="birth date" value={field.state.value} onChange={(e) => field.handleChange(e.target.value)} disabled={!isEditMode} className="w-full border-2 outline-none rounded-lg bg-(--color-surface-1) px-4 py-2 transition-colors duration-150 ease-in focus:border-orange-600" />
                      <Calendar className="absolute top-1/2 -translate-y-1/2 right-4" />
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
                name="gender"
                validators={{
                  onChangeAsyncDebounceMs: 500,
                  onChangeAsync: async ({ value }) => {
                    if (!value) {
                      return "Gender is required";
                    }
                    return undefined;
                  },
                }}
                children={(field: any) => (
                  <div className="flex flex-col gap-2">
                    <div className="flex flex-row justify-between">
                      <label className="text-sm font-semibold">Gender</label>
                      {field.state.meta.isTouched && !field.state.meta.isValid && <em className="text-sm font-semibold text-red-500">{field.state.meta.errors.join(", ")}</em>}
                    </div>

                    <div className="flex gap-12">
                      <label htmlFor="male" className="flex items-center gap-2 cursor-pointer">
                        <input id="male" type="radio" name="gender" value="MALE" checked={field.state.value === "MALE"} onChange={(e) => field.handleChange(e.target.value)} disabled={!isEditMode} className="accent-orange-600" />
                        <span className="font-semibold">MALE</span>
                      </label>

                      <label htmlFor="female" className="flex items-center gap-2 cursor-pointer">
                        <input id="female" type="radio" name="gender" value="FEMALE" checked={field.state.value === "FEMALE"} onChange={(e) => field.handleChange(e.target.value)} disabled={!isEditMode} className="accent-orange-600" />
                        <span className="font-semibold">FEMALE</span>
                      </label>
                    </div>
                  </div>
                )}
              />

              <form.Field
                name="role"
                validators={{
                  onChangeAsyncDebounceMs: 500,
                  onChangeAsync: async ({ value }) => {
                    if (!value) {
                      return "Role is required";
                    }
                    return undefined;
                  },
                }}
                children={(field: any) => (
                  <div className="flex flex-col gap-2">
                    <div className="flex flex-row justify-between">
                      <label className="text-sm font-semibold">Role</label>
                      {field.state.meta.isTouched && !field.state.meta.isValid && <em className="text-sm font-semibold text-red-500">{field.state.meta.errors.join(", ")}</em>}
                    </div>

                    <div className="flex gap-12">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input type="radio" name="role" value="ATTENDEE" checked={field.state.value === "ATTENDEE"} onChange={(e) => field.handleChange(e.target.value)} disabled={!isEditMode} className="accent-orange-600" />
                        <span className="font-semibold">ATTENDEE</span>
                      </label>

                      <label className="flex items-center gap-2 cursor-pointer">
                        <input type="radio" name="role" value="EVENT ORGANIZER" checked={field.state.value === "EVENT ORGANIZER"} onChange={(e) => field.handleChange(e.target.value)} disabled={!isEditMode} className="accent-orange-600" />
                        <span className="font-semibold">EVENT ORGANIZER</span>
                      </label>
                    </div>
                  </div>
                )}
              />

              <div className="flex gap-4">
                {isEditMode ? (
                  <>
                    <button type="submit" className="font-semibold w-full flex justify-center items-center gap-2  rounded-lg bg-gradient-to-r from-green-500 to-green-600 py-2 px-4">
                      Save
                    </button>
                    <button type="button" onClick={handleCancel} className="font-semibold w-full flex justify-center items-center gap-2 rounded-lg bg-gradient-to-r from-gray-500 to-gray-600 py-2 px-4">
                      Cancel
                    </button>
                  </>
                ) : (
                  <button type="button" onClick={() => setIsEditMode(true)} className="font-semibold w-full flex justify-center items-center gap-2 rounded-lg bg-gradient-to-r from-orange-500 to-orange-600 py-2 px-4">
                    Edit
                  </button>
                )}
                <button type="button" onClick={handleDelete} className="font-semibold w-full flex justify-center items-center gap-2 rounded-lg bg-gradient-to-r from-red-500 to-red-600 py-2 px-4">
                  Delete
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
