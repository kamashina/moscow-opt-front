"use client";
import { useState } from "react";
import AppText from "@/src/components/AppText/AppText";
import { FieldErrors } from "react-hook-form";

const ErrorMessage = ({
  errors,
}: {
  errors: FieldErrors<{ rows: Array<Record<string, { message: string }>> }>;
}) => {
  const [isVisible, setIsVisible] = useState(false);

  if (!errors?.rows || !Array.isArray(errors.rows)) return null;

  const errorMap = new Map<string, string>();
  console.log(errors);

  errors.rows.forEach((row) => {
    Object.keys(row).forEach((key) => {
      if (!errorMap.has(key)) {
        errorMap.set(key, row[key]?.message || "Неизвестная ошибка");
      }
    });
  });

  return (
    <div className="relative inline-block">
      <div
        className="cursor-pointer"
        onMouseEnter={() => setIsVisible(true)}
        onMouseLeave={() => setIsVisible(false)}
      >
        <a className="flex flex-row items-center justify-start h-full w-full gap-1">
          <AppText className="border-[1px] rounded-full p-2  flex items-center justify-center text-sm border-danger w-4 h-4 text-danger">
            i
          </AppText>
        </a>
      </div>

      {isVisible && (
        <div className="absolute bg-white bottom-6 right-0 text-red-700 rounded-lg p-2 shadow-lg w-max min-w-[150px] z-50">
          {Array.from(errorMap.entries()).map(
            ([errorKey, errorMessage], index) => (
              <div key={index}>
                <AppText className="text-sm text-danger">
                  Поле "{errorKey}": {errorMessage}
                </AppText>
              </div>
            )
          )}
        </div>
      )}
    </div>
  );
};

export default ErrorMessage;
