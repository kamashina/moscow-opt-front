import AppText from "@/src/components/AppText/AppText";
import { getServerFile } from "@/src/constants";
import { Exception } from "@/src/types";
import { ColumnDataSchemaModel, ColumnTemplateProp } from "@revolist/revogrid";
import { update } from "idb-keyval";
import { enqueueSnackbar } from "notistack";
import { FC } from "react";
import Image from "next/image";

const FILES_LIMIT = 10;

const ImageEditor: FC<
  (ColumnDataSchemaModel | ColumnTemplateProp) & { fields: any }
> = ({ rowIndex, prop, fields }) => {
  //   const { mutateAsync: uploadMedia, isPending: isPendingMedia } =
  //     useFileUploadServiceUploadItemsMedia();

  const handleFileChange = async (files: FileList) => {
    if (!files.length) return;

    const filePaths: string[] = fields[rowIndex][prop] || [];

    if (filePaths.length >= FILES_LIMIT) {
      enqueueSnackbar("Можно загрузить не более 10 файлов!", {
        variant: "warning",
      });
      return;
    }

    const availableSlots = FILES_LIMIT - filePaths.length;
    const selectedFiles = Array.from(files).slice(0, availableSlots);

    try {
      //   const res = await uploadMedia({
      //     formData: { media: selectedFiles },
      //   });
      //   update(rowIndex, {
      //     ...fields[rowIndex],
      //     [prop]: [...filePaths, ...(res?.paths || [])].slice(0, FILES_LIMIT),
      //   });
    } catch (e) {
      enqueueSnackbar((e as Exception).message, { variant: "error" });
    }
  };

  const filePaths: string[] = fields[rowIndex][prop] || [];

  return (
    <label htmlFor={`file-input-${rowIndex}`}>
      {filePaths.length ? (
        <div className="flex flex-row gap-1">
          {filePaths.map((file) => (
            <Image
              key={file}
              src={getServerFile(file)}
              width={30}
              height={30}
              sizes="100%"
              style={{ objectFit: "cover" }}
              alt={file}
            />
          ))}
        </div>
      ) : (
        <>
          <AppText className="cursor-pointer text-primary">Загрузить</AppText>
          <input
            multiple
            hidden
            id={`file-input-${rowIndex}`}
            type="file"
            onChange={(e) => handleFileChange(e.target.files!)}
            disabled={filePaths.length >= 10}
          />
        </>
      )}
    </label>
  );
};
export default ImageEditor;
