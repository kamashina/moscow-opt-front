import { InputHTMLAttributes, useEffect, useRef, useState } from "react";
import { ErrorText, Icon, Loader, useDebounce } from "@mossoft/ui-kit";
import { FieldError } from "react-hook-form";
import { twMerge } from "tailwind-merge";
import AppText from "../AppText/AppText";

type Option<T> = {
  label: string;
  value: T;
  icon?: string;
};

type Props<T> = {
  options: Option<T>[];
  onSelectOption?: (value: any) => void;
  className?: string;
  onChange: (value: T | null) => void;
  value: T | undefined | null;
  placeholder?: string;
  label: string;
  isLoading: boolean;
  onSearch: (value: string) => void;
  error?: FieldError | undefined;
} & InputHTMLAttributes<HTMLInputElement>;

const SelectSearch = <T,>({
  options,
  isLoading,
  label,
  onChange,
  className,
  value,
  onSelectOption,
  onSearch,
  error,
  disabled,
  ...inputProps
}: Props<T>) => {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");

  const debouncedSearch = useDebounce(search, 300);
  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    onSearch(debouncedSearch);
  }, [debouncedSearch]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (option: Option<T>) => {
    const { label, value, icon, ...rest } = option;
    // onChange(option.value === value ? null : option.value);
    onSelectOption?.(rest);
    setSearch(label);
    setIsOpen(false);
  };

  return (
    <div className="relative w-full" ref={dropdownRef}>
      <label className="block">{label}</label>
      <div className="relative w-full">
        <input
          className={twMerge(
            `${isOpen ? "border-[2px]" : "border-[1px]"} ${
              disabled
                ? "bg-primary-light cursor-not-allowed"
                : "cursor-pointer"
            } border-primary border-solid w-full p-2 h-[45px] rounded-[20px] focus:outline-none`,
            className
          )}
          ref={inputRef}
          onFocus={() => setIsOpen(true)}
          onChange={(e) => setSearch(e.target.value)}
          value={search}
          disabled={disabled}
          {...inputProps}
        />
        <Icon
          name="arrow-down"
          className="h-6 w-3 right-4 absolute top-0 bottom-0 my-auto cursor-pointer pointer-events-none !text-primary"
        />
      </div>

      {isOpen && (
        <div className="absolute mt-2 top-19 z-50 w-full py-2 max-h-60 px-2 bg-white shadow-[1px_1px_11px_0_rgb(174_178_191)] rounded-[20px] overflow-auto scrollbar-none">
          <ul className="flex flex-col gap-1">
            {options.length && !isLoading ? (
              options.map((option, i) => (
                <li
                  onMouseDown={(e) => {
                    e.preventDefault();
                    handleSelect(option);
                  }}
                  key={i}
                  className="rounded-[12px] p-2 cursor-pointer h-[40px] hover:bg-primary-light"
                >
                  <AppText className="text-left text-base text-dark-gray">
                    {option.label}
                  </AppText>
                </li>
              ))
            ) : isLoading ? (
              <div className="h-[40px] mx-auto items-center flex">
                <Loader />
              </div>
            ) : (
              <div className="h-[40px] mx-auto items-center flex">
                <AppText className="text-light-gray text-base">
                  Ничего не найдено
                </AppText>
              </div>
            )}
          </ul>
        </div>
      )}

      {error && Object.keys(error)?.length && (
        <div className="absolute w-full items-center flex justify-center flex-row">
          <ErrorText error={error} />
        </div>
      )}
    </div>
  );
};

export default SelectSearch;
