import { Icon, useDebounce } from "@mossoft/ui-kit";
import { useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";

type Props = {
  onChange: (value: string) => void;
  className?: string;
};

const Search = ({ onChange, className }: Props) => {
  const [value, setValue] = useState<string>("");
  const debouncedSearch = useDebounce(value, 200);

  return (
    <div
      className={twMerge(
        "flex flex-row items-center w-full h-full bg-primary rounded-full pr-3",
        className
      )}
    >
      <input
        className="w-full h-12 pl-4 pr-12 border-2 border-solid border-primary rounded-full focus:outline-none text-gray-700"
        type="text"
        onKeyDown={(e) => e.key === "Enter" && onChange(debouncedSearch)}
        placeholder="Поиск..."
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />

      <div
        onClick={() => onChange(debouncedSearch)}
        className="cursor-pointer px-[4px]"
      >
        <Icon name="search" className="w-6 h-6 !text-white" />
      </div>
    </div>
  );
};

export default Search;
