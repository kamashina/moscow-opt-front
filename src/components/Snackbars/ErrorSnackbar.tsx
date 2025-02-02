import React, { forwardRef } from "react";

import { SnackbarContent, CustomContentProps } from "notistack";

interface CustomSnackbarProps extends CustomContentProps {
  type: "success" | "info" | "error";
}

const ErrorSnackbar = forwardRef<HTMLDivElement, CustomSnackbarProps>(
  (props, ref) => {
    const {
      id,
      message,
      type,
      anchorOrigin,
      hideIconVariant,
      autoHideDuration,
      iconVariant,
      persist,
      ...other
    } = props;

    return (
      <SnackbarContent
        ref={ref}
        role="alert"
        {...other}
        style={{ position: "inherit" }}
        className="rounded-r-[10px] rounded-l-[10px] py-[10px] px-5 !bg-danger !bottom-0"
      >
        <div className="flex gap-4 items-center">
          <p className="text-base lg:text-xl text-white font-normal">
            {message}
          </p>
        </div>
      </SnackbarContent>
    );
  }
);

ErrorSnackbar.displayName = "ErrorSnackbar";

export default ErrorSnackbar;
