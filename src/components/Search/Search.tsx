import { useMeilisearchServiceSearch } from "@/src/openapi/queries";
import { SearchEntityResponse, SuggestionType } from "@/src/openapi/requests";
import { Icon, useDebounce } from "@mossoft/ui-kit";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useQueryState } from "nuqs";
import { useEffect, useMemo, useRef, useState } from "react";
import { twMerge } from "tailwind-merge";
import AppText from "../AppText/AppText";

type Props = {
  className?: string;
};

const OPTIONS: Record<
  SuggestionType,
  { path: string; icon: string; label: string }
> = {
  card: { path: "/catalog", icon: "search", label: "" },
  subCategory: {
    path: "/categories/sub",
    icon: "subCategory",
    label: "Подкатегория",
  },
  category: { path: "/categories", icon: "category", label: "Категория" },
  shop: { path: "/shops", icon: "shop", label: "Магазин" },
};

const Search = ({ className }: Props) => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [value, setValue] = useQueryState("search");
  const debouncedSearch = useDebounce(value ?? "", 200);
  const [cachedResults, setCachedResults] = useState<SearchEntityResponse[]>(
    []
  );
  const inputRef = useRef<HTMLInputElement>(null);

  const { data, isFetching } = useMeilisearchServiceSearch(
    { query: debouncedSearch },
    undefined,
    { enabled: debouncedSearch.length > 2 }
  );

  useEffect(() => {
    if (data) setCachedResults(data);
  }, [data]);

  const displayedResults = useMemo(
    () => (isFetching ? cachedResults : data ?? []),
    [data]
  );

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

  const handleSearch = (e: React.KeyboardEvent | React.MouseEvent) => {
    if (!value) return;
    const href = `/catalog?search=${value}`;

    if ((e as React.KeyboardEvent).key === "Enter") router.push(href);

    router.push(href);
    setIsOpen(false);
  };

  return (
    <div
      ref={inputRef}
      className={twMerge(
        "flex flex-row items-center relative w-full h-full bg-primary rounded-full pr-3",
        className
      )}
    >
      <div className="relative w-full">
        <input
          ref={inputRef}
          className="w-full h-12 pl-4 pr-12 border-2 border-primary rounded-full focus:outline-none text-gray-700 shadow-sm"
          type="text"
          onKeyDown={(e) =>
            e.key === "Enter" && router.push(`/catalog?search=${value}`)
          }
          placeholder="Поиск..."
          onFocus={() => setIsOpen(true)}
          value={value || ""}
          onChange={(e) => setValue(e.target.value || null)}
        />
      </div>

      {isOpen && displayedResults.length ? (
        <ul className="absolute z-10 w-full bg-white rounded-3xl top-14 px-2 py-[10px]">
          {displayedResults?.map((item) => (
            <Link
              key={item.id}
              href={{
                pathname: OPTIONS[item.suggestionType].path,
                query: {
                  search: item.name,
                },
              }}
              className="rounded-2xl p-[5px] hover:bg-light flex flex-row items-center"
            >
              <div className="p-[5px] bg-primary-light rounded-[10px]">
                <Icon
                  name={OPTIONS[item.suggestionType].icon}
                  className="w-5 h-5 !text-primary"
                />
              </div>
              <div className="flex px-[10px] py-[5px] flex-col justify-start items-start">
                <AppText className="hover:border-primary font-normal text-base">
                  {item.name}
                </AppText>
                <AppText className="font-light text-xs text-light-gray">
                  {OPTIONS[item.suggestionType].label}
                </AppText>
              </div>
            </Link>
          ))}
        </ul>
      ) : (
        <></>
      )}
      <div onClick={handleSearch} className="cursor-pointer px-[4px]">
        <Icon name="search" className="w-6 h-6 !text-white" />
      </div>
    </div>
  );
};

export default Search;
