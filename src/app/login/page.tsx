"use client";

import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { authUser, AuthError } from "@/service/auth.api";
import { signIn } from "next-auth/react";
import { useForm } from "@tanstack/react-form";
import { toast, ToastContainer } from "react-toastify";
import Image from "next/image";
import "react-toastify/dist/ReactToastify.css";
import { LoaderCircle, Mail, MailOpen, Lock, LockOpen } from "lucide-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle, faFacebook, faApple, faTiktok } from "@fortawesome/free-brands-svg-icons";

export default function LoginPage() {
  const [isSuccess, setIsSuccess] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const mutation = useMutation({
    mutationFn: ({ email, password }: { email: string; password: string }) => authUser({ email, password }),
    onSuccess: async (data) => {
      const token = data.data.access_token;
      const user = data.data.user;

      await signIn("credentials", {
        token,
        user: JSON.stringify(user),
        redirect: true,
      });
      setIsSuccess(true);
      toast.success(`Selamat datang, ${user.email}!`);
    },
    onError: (err: any) => {
      if (err instanceof AuthError) {
        if (err.type === "INVALID_CREDENTIALS" || err.type === "UNAUTHORIZED" || err.type === "FORBIDDEN") {
          const msg = Array.isArray(err.message) ? err.message.join(", ") : err.message;
          setEmailError(msg);
          setPasswordError(msg);
        }
      } else {
        const msg = Array.isArray(err.message) ? err.message.join(", ") : err.message;
        toast.error(msg);
      }
    },
  });

  const form = useForm({
    defaultValues: { email: "", password: "" },
    onSubmit: ({ value }: any) => {
      setEmailError("");
      setPasswordError("");
      mutation.mutate({ email: value.email, password: value.password });
    },
  });

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
              <h1 className="text-3xl font-bold text-transparent bg-gradient-to-r from-white to-orange-600 bg-clip-text mb-2">Masuk ke Akun</h1>
              <p className="text-transparent bg-gradient-to-r from-white to-orange-600 bg-clip-text">Silakan masuk menggunakan email dan password Anda</p>
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
                      return "Email must not be empty";
                    }
                    if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
                      return "Email is not valid";
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
                      {isSuccess ? <MailOpen className="absolute top-1/2 -translate-y-1/2 right-4" /> : <Mail className="absolute top-1/2 -translate-y-1/2 right-4" />}
                      {field.getMeta().isValidating && (
                        <div>
                          <LoaderCircle className="absolute top-1/2 -translate-y-1/2 right-12 animate-spin" />
                        </div>
                      )}
                    </div>
                    {emailError && <em className="text-sm font-semibold text-red-500">{emailError}</em>}
                  </div>
                )}
              />

              <form.Field
                name="password"
                validators={{
                  onChangeAsyncDebounceMs: 500,
                  onChangeAsync: async ({ value }) => {
                    if (!value) {
                      return "Password must not be empty";
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
                      <input id="password" type="password" placeholder="password" autoComplete="current-password" value={field.value} onChange={(e) => field.handleChange(e.target.value)} className="w-full border-2 outline-none rounded-lg bg-(--color-surface-1) px-4 py-2 transition-colors duration-150 focus:border-orange-600" />
                      {isSuccess ? <LockOpen className="absolute top-1/2 -translate-y-1/2 right-4" /> : <Lock className="absolute top-1/2 -translate-y-1/2 right-4" />}
                      {field.getMeta().isValidating && (
                        <div>
                          <LoaderCircle className="absolute top-1/2 -translate-y-1/2 right-12 animate-spin" />
                        </div>
                      )}
                    </div>
                    {passwordError && <em className="text-sm font-semibold text-red-500">{passwordError}</em>}
                  </div>
                )}
              />

              <form.Subscribe
                selector={(state) => ({
                  values: state.values as any,
                  errors: state.errorMap as any,
                  isSubmitting: state.isSubmitting as any,
                })}
              >
                {({ values, isSubmitting }) => {
                  const emailMeta = form.getFieldMeta("email");
                  const passwordMeta = form.getFieldMeta("password");
                  const isFormValid = emailMeta?.isValid && passwordMeta?.isValid;

                  return (
                    <button type="submit" disabled={!isFormValid} className="w-full flex items-center justify-center gap-2 font-semibold rounded-lg bg-gradient-to-r from-orange-500 to-orange-600 disabled:opacity-50 disabled:cursor-not-allowed py-2 px-4 transition-opacity duration-200">
                      {isSubmitting ? <LoaderCircle className="animate-spin" /> : "Masuk"}
                    </button>
                  );
                }}
              </form.Subscribe>
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
                Belum punya akun?{" "}
                <a href="/register" className="text-orange-600 relative after:content-[''] after:w-full after:h-[1px] after:absolute after:bottom-0 after:left-0 after:rounded-full after:bg-orange-600 after:origin-right after:scale-x-0 after:transition-transform after:duration-150 after:ease-in hover:after:scale-x-100 hover:after:origin-left">
                  Daftar, yuk!
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
