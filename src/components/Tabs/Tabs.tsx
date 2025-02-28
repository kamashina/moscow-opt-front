import React from "react";
import {
  ControllerFieldState,
  ControllerRenderProps,
  FieldPath,
  FieldValues,
} from "react-hook-form";
import AppText from "../AppText/AppText";
import { motion } from "framer-motion";
import { ErrorText } from "@mossoft/ui-kit";

type Option<T> = {
  value: T;
  label: string;
};

type Props<
  T,
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>
> = {
  options: Option<T>[];
  label: string;
  disabled?: boolean;
  field?: ControllerRenderProps<TFieldValues, TName>;
  fieldState?: ControllerFieldState;
};

const Tabs = <
  T,
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>
>({
  label,
  options,
  field,
  disabled,
  fieldState,
}: Props<T, TFieldValues, TName>) => {
  const isError = fieldState?.error && Object.keys(fieldState?.error)?.length;
  return (
    <label className="relative">
      {label}

      <div className="grid grid-cols-2 gap-2">
        {options.map((item) => (
          <motion.div
            onClick={() => !disabled && field?.onChange(item.value)}
            className={`${
              isError ? "border-danger" : "border-primary"
            } h-[45px] border-[1px] border-solid rounded-[20px] flex items-center cursor-pointer`}
            key={item.label}
            initial={{ scale: 1 }}
            whileTap={{ scale: 0.95 }}
            animate={{
              backgroundColor: item.value === field?.value ? "#14A2B8" : "#fff",
              color: item.value === field?.value ? "#fff" : "#000",
            }}
            transition={{ duration: 0.2 }}
          >
            <AppText
              className={`${
                item.value === field?.value && "text-white"
              } m-auto`}
            >
              {item.label}
            </AppText>
          </motion.div>
        ))}
      </div>
      <div className="absolute w-full items-center flex justify-center flex-row">
        {isError && <ErrorText error={fieldState?.error} />}
      </div>
    </label>
  );
};

export default Tabs;
