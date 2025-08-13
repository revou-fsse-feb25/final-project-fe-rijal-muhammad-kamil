"use client";

import Swal from "sweetalert2";
import { ErrorPopUpProps } from "./interface";

function ErrorPopUp({ title, text, onRetry, isFetching }: ErrorPopUpProps) {
  return Swal.fire({
    title: title,
    text: text,
    icon: "error",
    showConfirmButton: Boolean(onRetry),
    confirmButtonText: "Try Again",
    showCancelButton: true,
    cancelButtonText: "Close",
    allowOutsideClick: !isFetching,
  }).then((res) => {
    if (res.isConfirmed && onRetry) {
      onRetry();
    }
  });
}

export default ErrorPopUp;
