"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import AppText from "../AppText/AppText";
import { Icon } from "@mossoft/ui-kit";

type Option<T> = {
  value?: T;
  label: string;
  iconName?: string;
  onClick?: () => void;
};

type Props<T extends string | number | readonly string[] | undefined> = {
  options: Option<T>[];
  value?: T;
  label: string;
  className?: string;
  onChange?: (value: T) => void;
};

const Select = <T extends string | number | readonly string[] | undefined>({
  options,
  value,
  className,
  label,
  onChange,
}: Props<T>) => {
  const selectRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleClick = useCallback(() => {
    setIsOpen(!isOpen);
  }, [isOpen]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        selectRef.current &&
        !selectRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={selectRef}>
      <div
        className="relative bg-primary cursor-pointer p-2 hover:opacity-70 rounded-lg"
        onClick={handleClick}
      >
        <AppText className="text-white">{label}</AppText>
      </div>
      {isOpen && (
        <ul className="top-12 bg-white shadow-lg absolute z-10 p-2 rounded-md gap-2 flex flex-col">
          {options.map((option) => (
            <li
              key={option.label}
              onClick={() =>
                option?.onClick?.()
                  ? onChange?.(option?.value!)
                  : option.onClick?.()
              }
              className="cursor-pointer hover:bg-primary-light px-2 py-1 rounded-lg flex flex-row gap-2 items-center"
              value={option.value}
            >
              {option.iconName && (
                <Icon
                  name={option.iconName}
                  className="w-4 h-4 !text-primary"
                />
              )}
              <AppText className="whitespace-nowrap"> {option.label}</AppText>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Select;
