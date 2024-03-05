import React, { useEffect } from "react";
import Swal from "sweetalert2";

interface SweetAlertProviderProps {
  children: React.ReactNode;
}

const SweetAlertProvider: React.FC<SweetAlertProviderProps> = ({
  children,
}) => {
  useEffect(() => {
    const originalAlert = window.alert;
    const originalPrompt = window.prompt;

    window.alert = (message: string) => {
      return new Promise<void>((resolve) => {
        Swal.fire({
          title: message,
          icon: "info",
          confirmButtonText: "확인",
          background: "#333",
          color: "#fff",
        }).then(() => resolve());
      });
    };

    window.confirm = async (message: string) => {
      const { isConfirmed } = await Swal.fire({
        title: message,
        icon: "question",
        showCancelButton: true,
        confirmButtonText: "확인",
        cancelButtonText: "취소",
        background: "#333",
        color: "#fff",
      });
      return isConfirmed;
    };

    window.prompt = (message: string, defaultValue?: string) => {
      return new Promise<string | null>((resolve) => {
        Swal.fire({
          title: message,
          input: "text",
          inputValue: defaultValue,
          showCancelButton: true,
          confirmButtonText: "확인",
          cancelButtonText: "취소",
          background: "#333",
          color: "#fff",
        }).then((result) => resolve(result.value));
      });
    };

    return () => {
      window.alert = originalAlert;
      window.prompt = originalPrompt;
    };
  }, []);

  return <React.Fragment>{children}</React.Fragment>;
};

export default SweetAlertProvider;
