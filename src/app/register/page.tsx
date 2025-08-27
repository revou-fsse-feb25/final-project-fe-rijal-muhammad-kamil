"use client";
import { useState } from "react";
import Image from "next/image";
import { useForm } from "@tanstack/react-form";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Mail, LoaderCircle, UserRoundPen, Phone, Calendar, Lock } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { fetchUser } from "@/service/user.api";
import { RegisterPayload } from "@/app/register/interface";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [errorEmail, setErrorEmail] = useState("");
  const [errorPhone, setErrorPhone] = useState("");
  const [errorFirstName, setErrorFirstName] = useState("");
  const [errorLastName, setErrorLastName] = useState("");
  const [errorBirthDate, setErrorBirthDate] = useState("");
  const [errorGender, setErrorGender] = useState("");
  const [errorPassword, setErrorPassword] = useState("");
  const [errorRole, setErrorRole] = useState("");

  const router = useRouter();
  const [isSuccess, setSuccess] = useState(false);
  const [step, setStep] = useState(1);

  const registerMutation = useMutation({
    mutationFn: (payload: RegisterPayload) => fetchUser({ endpoint: "user/register", method: "POST", data: payload }),
    onSuccess: () => {
      setSuccess(true);
      toast.success("Registrasi berhasil!");
      form.reset();
      router.push("/login");
    },
    onError: (err: any) => {
      if (err.type === "CLIENT_ERROR" && Array.isArray(err.message)) {
        setErrorEmail("");
        setErrorPassword("");
        setErrorPhone("");
        setErrorFirstName("");
        setErrorLastName("");
        setErrorBirthDate("");
        setErrorGender("");
        setErrorRole("");

        const fieldMap: Record<string, (msg: string) => void> = {
          email: setErrorEmail,
          password: setErrorPassword,
          phone: setErrorPhone,
          first: setErrorFirstName,
          last: setErrorLastName,
          birth: setErrorBirthDate,
          gender: setErrorGender,
          role: setErrorRole,
        };

        err.message.forEach((msg: string) => {
          for (const key in fieldMap) {
            if (msg.toLowerCase().includes(key)) fieldMap[key](msg);
          }
        });
      } else {
        toast.error(err.message || "Terjadi kesalahan");
      }
    },
  });

  const form = useForm({
    defaultValues: {
      email: "",
      phone_number: { code: "", number: "" },
      first_name: "",
      last_name: "",
      date_of_birth: "",
      gender: "",
      password: "",
      role: "",
    },
    onSubmit: async ({ value }: any) => {
      const payload = {
        email: value.email,
        phone_number: `${value.phone_number.code}${value.phone_number.number}`,
        first_name: value.first_name,
        last_name: value.last_name,
        date_of_birth: value.date_of_birth,
        gender: value.gender,
        password: value.password,
        role: value.role,
      };
      console.log("Payload siap dikirim:", payload);
      registerMutation.mutate(payload);
    },
  });

  return (
    <div className="min-h-100vh py-10">
      {isSuccess ? (
        <div className="relative text-center">
          <h2 className="text-3xl font-bold text-transparent bg-gradient-to-r from-white to-orange-600 bg-clip-text mb-2">Success</h2>
          <p className="text-transparent bg-gradient-to-r from-white to-orange-600 bg-clip-text">Your registration is successful!</p>
        </div>
      ) : (
        <div className="">
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
                {step === 1 && (
                  <div className="relative text-center">
                    <h2 className="text-3xl font-bold text-transparent bg-gradient-to-r from-white to-orange-600 bg-clip-text mb-2">Enter Your Email</h2>
                    <p className="text-transparent bg-gradient-to-r from-white to-orange-600 bg-clip-text">We'll use this email to keep your account secure and send important updates.</p>
                  </div>
                )}

                {step === 2 && (
                  <div className="relative text-center">
                    <h2 className="text-3xl font-bold text-transparent bg-gradient-to-r from-white to-orange-600 bg-clip-text mb-2">Complete Your Profile</h2>
                    <p className="text-transparent bg-gradient-to-r from-white to-orange-600 bg-clip-text">Help us get to know you better by completing your profile.</p>
                  </div>
                )}

                {step === 3 && (
                  <div className="relative text-center">
                    <h2 className="text-3xl font-bold text-transparent bg-gradient-to-r from-white to-orange-600 bg-clip-text mb-2">Choose Your Role</h2>
                    <p className="text-transparent bg-gradient-to-r from-white to-orange-600 bg-clip-text">Select your role to get started as an Attendee or organize your own events.</p>
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
                            {field.getMeta().isValidating ||
                              (registerMutation.isPending && (
                                <div>
                                  <LoaderCircle className="absolute top-1/2 -translate-y-1/2 right-12 animate-spin" />
                                </div>
                              ))}
                          </div>
                          {errorEmail && <em className="text-sm font-semibold text-red-500">{errorEmail}</em>}
                        </div>
                      )}
                    />
                  )}

                  {step == 2 && (
                    <>
                      <form.Field
                        name="phone_number"
                        validators={{
                          onChangeAsyncDebounceMs: 500,
                          onChangeAsync: async ({ value }) => {
                            if (!value || !value.code || !value.number) {
                              return "Full phone number is required";
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

                            <div className="flex gap-2 ">
                              <select value={field.state.value?.code || ""} onChange={(e) => field.handleChange({ ...field.state.value, code: e.target.value })} className="border-2 rounded-lg bg-(--color-surface-1) p-2">
                                <option value="" disabled selected>
                                  Code
                                </option>
                                <option value="+62" selected>
                                  +62
                                </option>
                                <option value="+1">+1</option>
                                <option value="+44">+44</option>
                              </select>

                              <div className="w-full relative">
                                <input id="phone" type="tel" placeholder="phone number" value={field.state.value?.number || ""} onChange={(e) => field.handleChange({ ...field.state.value, number: e.target.value })} className="w-full border-2 outline-none rounded-lg bg-(--color-surface-1) px-4 py-2 transition-colors duration-150 focus:border-orange-600" />
                                <Phone className="absolute top-1/2 -translate-y-1/2 right-4" />
                                {field.getMeta().isValidating ||
                                  (registerMutation.isPending && (
                                    <div>
                                      <LoaderCircle className="absolute top-1/2 -translate-y-1/2 right-12 animate-spin" />
                                    </div>
                                  ))}
                              </div>
                            </div>
                            {errorPhone && <em className="text-sm font-semibold text-red-500">{errorPhone}</em>}
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
                              <input id="firstName" type="text" placeholder="first name" value={field.value} onChange={(e) => field.handleChange(e.target.value)} className="w-full border-2 outline-none rounded-lg bg-(--color-surface-1) px-4 py-2 transition-colors duration-150 focus:border-orange-600" />
                              <UserRoundPen className="absolute top-1/2 -translate-y-1/2 right-4" />
                              {field.getMeta().isValidating ||
                                (registerMutation.isPending && (
                                  <div>
                                    <LoaderCircle className="absolute top-1/2 -translate-y-1/2 right-12 animate-spin" />
                                  </div>
                                ))}
                            </div>
                            {errorFirstName && <em className="text-sm font-semibold text-red-500">{errorFirstName}</em>}
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
                              <input id="lastName" type="text" placeholder="last name" value={field.value} onChange={(e) => field.handleChange(e.target.value)} className="w-full border-2 outline-none rounded-lg bg-(--color-surface-1) px-4 py-2 transition-colors duration-150 focus:border-orange-600" />
                              <UserRoundPen className="absolute top-1/2 -translate-y-1/2 right-4" />
                              {field.getMeta().isValidating ||
                                (registerMutation.isPending && (
                                  <div>
                                    <LoaderCircle className="absolute top-1/2 -translate-y-1/2 right-12 animate-spin" />
                                  </div>
                                ))}
                            </div>
                            {errorLastName && <em className="text-sm font-semibold text-red-500">{errorLastName}</em>}
                          </div>
                        )}
                      />

                      <form.Field
                        name="date_of_birth"
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
                              {field.getMeta().isValidating ||
                                (registerMutation.isPending && (
                                  <div>
                                    <LoaderCircle className="absolute top-1/2 -translate-y-1/2 right-12 animate-spin" />
                                  </div>
                                ))}
                            </div>
                            {errorBirthDate && <em className="text-sm font-semibold text-red-500">{errorBirthDate}</em>}
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
                                <input id="male" type="radio" name="gender" value="MALE" checked={field.state.value === "MALE"} onChange={(e) => field.handleChange(e.target.value)} className="accent-orange-600" />
                                <span className="font-semibold">MALE</span>
                              </label>

                              <label htmlFor="female" className="flex items-center gap-2 cursor-pointer">
                                <input id="female" type="radio" name="gender" value="FEMALE" checked={field.state.value === "FEMALE"} onChange={(e) => field.handleChange(e.target.value)} className="accent-orange-600" />
                                <span className="font-semibold">FEMALE</span>
                              </label>
                            </div>
                            {errorGender && <em className="text-sm font-semibold text-red-500">{errorGender}</em>}
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
                              {field.getMeta().isValidating ||
                                (registerMutation.isPending && (
                                  <div>
                                    <LoaderCircle className="absolute top-1/2 -translate-y-1/2 right-12 animate-spin" />
                                  </div>
                                ))}
                            </div>
                            {errorPassword && <em className="text-sm font-semibold text-red-500">{errorPassword}</em>}
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

                          <div className="flex gap-12">
                            <label className="flex items-center gap-2 cursor-pointer">
                              <input type="radio" name="role" value="ATTENDEE" checked={field.state.value === "ATTENDEE"} onChange={(e) => field.handleChange(e.target.value)} className="accent-orange-600" />
                              <span className="font-semibold">ATTENDEE</span>
                            </label>

                            <label className="flex items-center gap-2 cursor-pointer">
                              <input type="radio" name="role" value="EVENT ORGANIZER" checked={field.state.value === "EVENT ORGANIZER"} onChange={(e) => field.handleChange(e.target.value)} className="accent-orange-600" />
                              <span className="font-semibold">EVENT ORGANIZER</span>
                            </label>
                          </div>
                          {errorRole && <em className="text-sm font-semibold text-red-500">{errorRole}</em>}
                        </div>
                      )}
                    />
                  )}

                  <div className="flex gap-4">
                    {step > 1 && (
                      <button type="button" onClick={() => setStep(step - 1)} className="font-semibold flex-1 flex justify-center items-center gap-2 rounded-lg bg-gradient-to-r from-gray-500 to-gray-600 px-4 py-2">
                        Prev
                      </button>
                    )}

                    <form.Subscribe
                      selector={(state) => {
                        if (step === 1) {
                          const emailField = state.fieldMeta.email;
                          return emailField?.isValid === true && emailField?.isTouched === true;
                        }
                        if (step === 2) {
                          const phoneField = state.fieldMeta.phone_number;
                          const firstNameField = state.fieldMeta.first_name;
                          const lastNameField = state.fieldMeta.last_name;
                          const birthDateField = state.fieldMeta.date_of_birth;
                          const genderField = state.fieldMeta.gender;
                          const passwordField = state.fieldMeta.password;
                          return phoneField?.isValid === true && phoneField?.isTouched === true && firstNameField?.isValid === true && firstNameField?.isTouched === true && lastNameField?.isValid === true && lastNameField?.isTouched === true && birthDateField?.isValid === true && birthDateField?.isTouched === true && genderField?.isValid === true && genderField?.isTouched === true && passwordField?.isValid === true && passwordField?.isTouched === true;
                        }
                        if (step === 3) {
                          const roleField = state.fieldMeta.role;
                          return roleField?.isValid === true && roleField?.isTouched === true;
                        }
                        return false;
                      }}
                      children={(isStepValid) => (
                        <button type="submit" disabled={!isStepValid} className={`${step > 1 ? "flex-1" : "w-full"} font-semibold flex justify-center items-center gap-2 rounded-lg bg-gradient-to-r from-orange-500 to-orange-600 disabled:opacity-50 disabled:cursor-not-allowed min-h-10vh py-2 transition-opacity duration-150 ease-in`}>
                          {step === 3 ? registerMutation.isPending ? <LoaderCircle className="animate-spin" /> : "Submit" : "Next"}
                        </button>
                      )}
                    />
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
