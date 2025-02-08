import { ErrorText, Icon, useDebounce } from "@mossoft/ui-kit";
import {
  InputHTMLAttributes,
  ReactNode,
  useEffect,
  useRef,
  useState,
} from "react";
import { ControllerRenderProps, FieldError } from "react-hook-form";
import { twMerge } from "tailwind-merge";
import AppText from "../AppText/AppText";

type InputAttributes = InputHTMLAttributes<HTMLInputElement>;

type Options<T> = {
  label: string;
  value: T;
  icon?: string;
};

type Props<T> = {
  options: Options<T>[];
  field?: ControllerRenderProps<any, any>;
  className?: string;
  parentClassName?: string;
  listClassname?: string;
  onChange: (value: T | null) => void;
  value: T | undefined | null;
  placeholder?: string;
  onSearch: (value: string) => void;
  error?: FieldError | undefined;
  trigger?: ReactNode;
} & Omit<InputAttributes, "value">;

const SelectSearch = <T,>({
  options,
  field,
  onChange,
  className,
  value,
  parentClassName,
  onSearch,
  listClassname,
  trigger,
  error,
  ...inputProps
}: Props<T>) => {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 100);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    onSearch(debouncedSearch);
  }, [debouncedSearch]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        inputRef.current &&
        !inputRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (val: T) => {
    field?.onChange(val === value ? null : val);
    setIsOpen(false);
  };

  const sortedAndFilteredOptions = options.filter((option) =>
    option.label.toLowerCase().includes(debouncedSearch.toLowerCase())
  );

  return (
    <div ref={inputRef} className="relative">
      <div className="relativeh-fit w-full cursor-pointer relative">
        <input
          //   ref={inputRef}
          className={twMerge(
            `border-[1px] border-primary border-solid w-full p-2 h-[45px] rounded-[20px] focus:outline-none cursor-pointer`,
            className
          )}
          onFocus={() => setIsOpen(true)}
          //   {...inputProps}
          onChange={(e) => setSearch(e.target.value)}
          value={search}
        />
        <Icon
          name="arrow-down"
          className="h-6 w-3 right-4 absolute top-0 bottom-0 my-auto cursor-pointer pointer-events-none !text-primary"
        />
      </div>

      {isOpen && (
        <div className="absolute mt-2 top-19 z-10 w-full py-2 max-h-60 px-2 bg-white shadow-[1px_1px_11px_0_rgb(174_178_191)] rounded-[20px] overflow-auto scrollbar-none">
          <ul className="flex flex-col gap-1">
            {sortedAndFilteredOptions.length ? (
              sortedAndFilteredOptions?.map((option) => (
                <li
                  onClick={() => handleSelect(option.value)}
                  key={+option.value}
                  className="rounded-[12px] px-2 py-2 cursor-pointer h-[40px] hover:bg-primary-light"
                >
                  <AppText className="text-left text-base text-dark-gray">
                    {option.label}
                  </AppText>
                </li>
              ))
            ) : (
              <AppText className="mx-auto h-[40px] text-light-gray text-base">
                Ничего не найдено
              </AppText>
            )}
          </ul>
        </div>
      )}
      <ErrorText error={error} />
    </div>
  );
};

export default SelectSearch;
