"use client";
import { ErrorText } from "@mossoft/ui-kit";
import { FC } from "react";
import { FieldError } from "react-hook-form";
import "react-quill-new/dist/quill.snow.css";
import AppText from "../AppText/AppText";
import dynamic from "next/dynamic";

const ReactQuill = dynamic(() => import("react-quill-new"), {
  ssr: false,
});

type Props = {
  readOnly?: boolean;
  value?: string;
  onChange?: (value: string) => void;
  error?: FieldError;
  label: string;
  className?: string;
};

const modules = {
  toolbar: [
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    ["bold", "italic", "underline"],
    [{ font: [] }],
    ["clean"],
    [{ align: ["right", "center", "justify"] }],
  ],
};

const formats = [
  "header",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "link",
  "color",
  "background",
  "align",
  "size",
  "font",
];

const TextEditor: FC<Props> = ({
  value,
  onChange,
  error,
  readOnly = false,
  label,
}) => {
  return (
    <div className="h-[220px]">
      <AppText>{label}</AppText>

      <ReactQuill
        readOnly={readOnly}
        value={value}
        theme="snow"
        onChange={onChange}
        formats={formats}
        modules={modules}
        placeholder="Текст..."
      />

      <ErrorText error={error} />
    </div>
  );
};

export default TextEditor;
