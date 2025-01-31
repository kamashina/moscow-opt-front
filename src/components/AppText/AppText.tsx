import React, { FC, PropsWithChildren } from "react";
import { twMerge } from "tailwind-merge";

type Props = {
  className?: string;
};

const AppText: FC<PropsWithChildren<Props>> = ({ children, className }) => {
  return (
    <span className={twMerge("text-dark font-medium text-base", className)}>
      {children}
    </span>
  );
};

export default AppText;
