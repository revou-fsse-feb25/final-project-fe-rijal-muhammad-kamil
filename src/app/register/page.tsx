"use client";
import React from "react";
import Image from "next/image";
import { useForm } from "@tanstack/react-form";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Mail, MailOpen, Lock, LockOpen, LoaderCircle, UserRoundPen, Phone, Calendar } from "lucide-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle, faFacebook, faApple, faTiktok } from "@fortawesome/free-brands-svg-icons";

const mockUsers: { id: string; email: string; password: string; name: string }[] = [
  { id: "u_1", email: "user@example.com", password: "password123", name: "Sample User" },
  { id: "u_2", email: "admin@ticketease.io", password: "adminadmin", name: "Admin" },
];

export default function LoginPage() {
  const [isSuccess, setIsSuccess] = React.useState(false);

  const [step, setStep] = React.useState(1);

  const form = useForm({
    defaultValues: {
      email: "",
      phone: { code: "", number: "" },
      firstName: "",
      lastName: "",
      birthDate: "",
      gender: "",
      password: "",
      role: "",
    },
    onSubmit: async ({ value }: any) => {
      console.log("Submit form:", value);
    },
  });

  const checkStepValid = () => {
    if (step === 1) {
      const emailField = form.getFieldMeta("email");
      return emailField?.isValid === true && emailField?.isTouched === true;
    }
    if (step === 2) {
      const phoneField = form.getFieldMeta("phone");
      const firstNameField = form.getFieldMeta("firstName");
      const lastNameField = form.getFieldMeta("lastName");
      const birthDateField = form.getFieldMeta("birthDate");
      const genderField = form.getFieldMeta("gender");
      const passwordField = form.getFieldMeta("password");
      
      return (
        phoneField?.isValid === true && phoneField?.isTouched === true &&
        firstNameField?.isValid === true && firstNameField?.isTouched === true &&
        lastNameField?.isValid === true && lastNameField?.isTouched === true &&
        birthDateField?.isValid === true && birthDateField?.isTouched === true &&
        genderField?.isValid === true && genderField?.isTouched === true &&
        passwordField?.isValid === true && passwordField?.isTouched === true
      );
    }
    if (step === 3) {
      const roleField = form.getFieldMeta("role");
      return roleField?.isValid === true && roleField?.isTouched === true;
    }
    return false;
  };

  const isStepValid = checkStepValid();

// 👇 daftar field yang valid
type FieldName =
  | "email"
  | "firstName"
  | "lastName"
  | "birthDate"
  | "gender"
  | "password"
  | "role"
  | "phone"
  | "phone.number"
  | "phone.code";

// 👇 mapping field per step
const stepFields: Record<number, FieldName[]> = {
  1: ["email"],
  2: ["phone", "firstName", "lastName", "birthDate", "gender", "password"],
  3: ["role"],
};

// 👇 gunakan state `step` yang sudah ada
const currentStep = step;


  return (
    <div className="min-h-100vh">
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
            <div className=" relative text-center">
              <h1 className="text-3xl font-bold text-transparent bg-gradient-to-r from-white to-orange-600 bg-clip-text mb-2">Daftar Akun Baru</h1>
              <p className="text-transparent bg-gradient-to-r from-white to-orange-600 bg-clip-text">Silakan lengkapi data diri Anda untuk mendaftar</p>
            </div>

            <form
              onSubmit={(e: any) => {
                e.preventDefault();
                e.stopPropagation();
                if (step === 3) form.handleSubmit();
                else setStep(step + 1);
              }}
              className="flex flex-col gap-6"
            >
              {step == 1 && (
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
                        <input id="email" type="email" placeholder="email" autoComplete="email" value={field.value} onChange={(e) => field.handleChange(e.target.value)} className="w-full border-2 outline-none rounded-lg bg-(--color-surface-1) px-4 py-2 transition-colors duration-150 focus:border-orange-600" />
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
              )}

              {step == 2 && (
                <>
                  <form.Field
                    name="phone"
                    validators={{
                      onChangeAsyncDebounceMs: 500,
                      onChangeAsync: async ({ value }) => {
                        if (!value || !value.code || !value.number) {
                          return "Phone number lengkap wajib diisi";
                        }
                        return undefined;
                      },
                    }}
                    children={(field: any) => (
                      <div className="flex flex-col gap-2">
                        <div className="flex flex-row justify-between">
                          <label htmlFor="phone" className="text-sm font-semibold">
                            Phone Number
                          </label>
                          {field.state.meta.isTouched && !field.state.meta.isValid && <em className="text-sm font-semibold text-red-500">{field.state.meta.errors.join(", ")}</em>}
                        </div>

                        <div className="flex gap-2">
                          <select value={field.value?.code || ""} onChange={(e) => field.handleChange({ ...field.value, code: e.target.value })} className="border-2 rounded-lg px-2 py-2 bg-(--color-surface-1)">
                            <option value="">Code</option>
                            <option value="62">62</option>
                            <option value="081">081</option>
                            <option value="082">082</option>
                          </select>

                          <div className="relative flex-1">
                            <input id="phone" type="tel" placeholder="Phone number" value={field.value?.number || ""} onChange={(e) => field.handleChange({ ...field.value, number: e.target.value })} className="flex-1 border-2 outline-none rounded-lg px-3 py-2 bg-(--color-surface-1)" />
                            <Phone className="absolute top-1/2 -translate-y-1/2 right-4" />
                            {field.getMeta().isValidating && (
                              <div>
                                <LoaderCircle className="absolute top-1/2 -translate-y-1/2 right-12 animate-spin" />
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    )}
                  />

                  <form.Field
                    name="firstName"
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
                          <input id="firstName" type="text" placeholder="first name" value={field.value} onChange={(e) => field.handleChange(e.target.value)} className="w-full border-2 outline-none rounded-lg bg-(--color-surface-1) px-4 py-2 transition-colors duration-150 focus:border-orange-600" />
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
                    name="lastName"
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
                          <input id="lastName" type="text" placeholder="last name" value={field.value} onChange={(e) => field.handleChange(e.target.value)} className="w-full border-2 outline-none rounded-lg bg-(--color-surface-1) px-4 py-2 transition-colors duration-150 focus:border-orange-600" />
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
                    name="birthDate"
                    validators={{
                      onChangeAsyncDebounceMs: 500,
                      onChangeAsync: async ({ value }) => {
                        if (!value) {
                          return "Birth date is required";
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
                          <input id="birthDate" type="date" placeholder="birth date" value={field.value} onChange={(e) => field.handleChange(e.target.value)} className="w-full border-2 outline-none rounded-lg bg-(--color-surface-1) px-4 py-2 transition-colors duration-150 focus:border-orange-600" />
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

                        <div className="flex gap-6">
                          {/* Radio Male */}
                          <label className="flex items-center gap-2 cursor-pointer">
                            <input type="radio" name="gender" value="male" checked={field.value === "male"} onChange={(e) => field.handleChange(e.target.value)} className="accent-orange-600" />
                            <span>Male</span>
                          </label>

                          {/* Radio Female */}
                          <label className="flex items-center gap-2 cursor-pointer">
                            <input type="radio" name="gender" value="female" checked={field.value === "female"} onChange={(e) => field.handleChange(e.target.value)} className="accent-orange-600" />
                            <span>Female</span>
                          </label>
                        </div>
                      </div>
                    )}
                  />

                  <form.Field
                    name="password"
                    validators={{
                      onChangeAsyncDebounceMs: 500,
                      onChangeAsync: async ({ value }) => {
                        if (!value) {
                          return "Password is required";
                        }
                        return undefined;
                      },
                    }}
                    children={(field: any) => (
                      <div className="flex flex-col gap-2">
                        <div className="flex flex-row justify-between">
                          <label htmlFor="password" className="text-sm font-semibold">
                            Password
                          </label>
                          {field.state.meta.isTouched && !field.state.meta.isValid && <em className="text-sm font-semibold text-red-500">{field.state.meta.errors.join(", ")}</em>}
                        </div>
                        <div className="relative">
                          <input id="password" type="password" placeholder="password" autoComplete="password" value={field.value} onChange={(e) => field.handleChange(e.target.value)} className="w-full border-2 outline-none rounded-lg bg-(--color-surface-1) px-4 py-2 transition-colors duration-150 focus:border-orange-600" />
                          <Lock className="absolute top-1/2 -translate-y-1/2 right-4" />
                          {field.getMeta().isValidating && (
                            <div>
                              <LoaderCircle className="absolute top-1/2 -translate-y-1/2 right-12 animate-spin" />
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  />
                </>
              )}

              {step == 3 && (
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

                      <div className="flex gap-6">
                        {/* Radio Admin */}
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input type="radio" name="role" value="attendee" checked={field.value === "attendee"} onChange={(e) => field.handleChange(e.target.value)} className="accent-orange-600" />
                          <span>Attendee</span>
                        </label>

                        {/* Radio User */}
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input type="radio" name="role" value="eventOrganizer" checked={field.value === "eventOrganizer"} onChange={(e) => field.handleChange(e.target.value)} className="accent-orange-600" />
                          <span>User</span>
                        </label>
                      </div>
                    </div>
                  )}
                />
              )}

              <button 
                type="submit" 
                disabled={!isStepValid}
                className="w-full flex items-center justify-center gap-2 font-semibold rounded-lg bg-gradient-to-r from-orange-500 to-orange-600 disabled:opacity-50 disabled:cursor-not-allowed py-2 px-4 transition-opacity duration-200"
              >
                {step === 3 ? "Submit" : "Next"}
              </button>
            </form>

            <div className="flex flex-col justify-center gap-6 mb-4">
              <span className="text-sm font-semibold text-center">Login lebih cepat dengan</span>
              <ul className="flex justify-center items-center gap-6">
                <li className="border border-white rounded-lg p-2 cursor-pointer">
                  <FontAwesomeIcon icon={faGoogle} />
                </li>
                <li className="border border-white rounded-lg p-2 cursor-pointer">
                  <FontAwesomeIcon icon={faFacebook} />
                </li>
                <li className="border border-white rounded-lg p-2 cursor-pointer">
                  <FontAwesomeIcon icon={faApple} />
                </li>
                <li className="border border-white rounded-lg p-2 cursor-pointer">
                  <FontAwesomeIcon icon={faTiktok} />
                </li>
              </ul>
            </div>

            <div className="text-sm font-semibold flex justify-center mb-2">
              <span>
                Sudah punya akun?{" "}
                <a href="/login" className="text-orange-600 relative after:content-[''] after:w-full after:h-[1px] after:absolute after:bottom-0 after:left-0 after:rounded-full after:bg-orange-600 after:origin-right after:scale-x-0 after:transition-transform after:duration-150 after:ease-in hover:after:scale-x-100 hover:after:origin-left">
                  Masuk di sini!
                </a>
              </span>
            </div>

            <div>
              <p className="text-sm font-semibold text-center">
                Dengan log in, kamu menyetujui{" "}
                <a href="">
                  <span className="text-orange-600">Kebijakan Privasi</span>
                </a>{" "}
                dan{" "}
                <a href="">
                  <span className="text-orange-600">Syarat & Ketentuan</span>
                </a>{" "}
                TicketEase
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
