"use client";

import { twMerge } from "tailwind-merge";

type Option<T> = {
  value: T;
  label: string;
};

type Props<T extends string | number | readonly string[] | undefined> = {
  options: Option<T>[];
  value: T;
  className?: string;
  onChange: (value: string) => void;
};

const Select = <T extends string | number | readonly string[] | undefined>({
  options,
  value,
  className,
  onChange,
}: Props<T>) => {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className={twMerge(className, "p-2 bg-primary text-white rounded w-fit")}
    >
      {options.map((option) => (
        <option key={option.label} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
};

export default Select;
