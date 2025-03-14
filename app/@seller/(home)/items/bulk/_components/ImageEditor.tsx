"use client";
import { getQueryClient } from "@/src/api/api";
import AppText from "@/src/components/AppText/AppText";
import ModalWindow from "@/src/components/Modal/Modal";
import { getServerFile } from "@/src/constants";
import { useFileUploadServiceUploadItemsMedia } from "@/src/openapi/queries";
import { Exception } from "@/src/types";
import { Icon } from "@mossoft/ui-kit";
import { ColumnDataSchemaModel, ColumnTemplateProp } from "@revolist/revogrid";
import { QueryClientProvider } from "@tanstack/react-query";
import Image from "next/image";
import { enqueueSnackbar } from "notistack";
import { useState } from "react";
import { FieldValues, UseFieldArrayUpdate } from "react-hook-form";

const FILES_LIMIT = 10;

type Props<T extends FieldValues> = {
  fields: any;
  update: UseFieldArrayUpdate<T>;
};

const ImageEditor = <T extends FieldValues>({
  rowIndex,
  prop,
  fields,
  update,
}: (ColumnDataSchemaModel | ColumnTemplateProp) & Props<T>) => {
  const [isOpen, setIsOpen] = useState(false);
  const { mutateAsync: uploadMedia, isPending: isPendingMedia } =
    useFileUploadServiceUploadItemsMedia();
  const filePaths: string[] = fields[rowIndex][prop] || [];

  const [tempFilePaths, setTempFilePaths] = useState<string[]>(filePaths);
  const handleSave = () => {
    update(rowIndex, {
      ...fields[rowIndex],
      [prop]: tempFilePaths,
    });
    setIsOpen(false);
  };
  const handleFileChange = async (files: FileList) => {
    if (!files.length) return;

    if (tempFilePaths.length >= FILES_LIMIT) {
      enqueueSnackbar(`Можно загрузить не более ${FILES_LIMIT} файлов!`, {
        variant: "warning",
      });
      return;
    }

    const selectedFiles = Array.from(files).slice(
      0,
      FILES_LIMIT - tempFilePaths.length
    );

    try {
      const res = await uploadMedia({
        formData: { media: selectedFiles },
      });

      setTempFilePaths(
        [...tempFilePaths, ...(res?.paths || [])].slice(0, FILES_LIMIT)
      );
    } catch (e) {
      enqueueSnackbar((e as Exception).message, { variant: "error" });
    }
  };

  return (
    <>
      <ModalWindow
        isOpen={isOpen}
        handleClose={() => setIsOpen(false)}
        className="lg:max-w-[600px] h-[calc(100vh-300px)] overflow-y-auto"
      >
        <div className="bg-white rounded-2xl p-6 shadow-lg">
          <div className="flex flex-col gap-3">
            <AppText className="text-lg font-semibold">Загрузить медиа</AppText>
            <AppText className="text-sm text-gray-600">
              Вы можете загрузить до 10 файлов — 1 видео (MP4, MOV, до 100MB) и
              до 9 изображений (JPG, PNG, WEBP, до 5MB каждое).
            </AppText>
            <AppText className="text-sm text-gray-600">
              Оптимальные размеры: видео — до 1920x1080, фото — до 3000x3000
              пикселей. Перетащите файлы сюда или выберите вручную.
            </AppText>
          </div>
          <div className="grid grid-cols-4 gap-2 auto-rows-[minmax(120px,_auto)] mt-4">
            {!!tempFilePaths?.length &&
              tempFilePaths?.map((file, index) => (
                <div key={file} className="relative group">
                  <Image
                    src={getServerFile(file)}
                    sizes="100%"
                    width={100}
                    height={150}
                    className="w-full h-auto aspect-[2/3] border border-gray-300 rounded-lg object-cover shadow-sm transition-opacity duration-200 hover:opacity-80"
                    alt={file}
                  />
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      setTempFilePaths(
                        tempFilePaths.filter((_, i) => i !== index)
                      );
                    }}
                    className="absolute top-1 right-1 bg-black/50 text-white rounded-full w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity border border-white"
                  >
                    ×
                  </button>
                </div>
              ))}
            {tempFilePaths.length < FILES_LIMIT && (
              <label htmlFor="file-input" className="cursor-pointer">
                <div className="w-full aspect-[2/3] flex flex-col items-center justify-center border border-dashed border-gray-400 bg-gray-100 rounded-lg hover:bg-gray-200 transition p-4">
                  <Icon name="plus" className="w-10 h-10 text-gray-500" />
                  <span className="text-xs text-gray-500 mt-1">Добавить</span>
                </div>
                <input
                  multiple
                  hidden
                  id="file-input"
                  type="file"
                  accept="image/jpeg, image/png, image/webp, video/mp4, video/quicktime"
                  onChange={(e) => handleFileChange(e.target.files!)}
                />
              </label>
            )}
          </div>
          <div className="mt-4 flex justify-end gap-2">
            <button
              className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400"
              onClick={() => setIsOpen(false)}
            >
              Отмена
            </button>
            <button
              className="px-4 py-2 bg-blue-500 text-primary rounded-lg hover:bg-blue-600"
              onClick={handleSave}
            >
              Сохранить
            </button>
          </div>
        </div>
      </ModalWindow>

      <div onClick={() => setIsOpen(true)}>
        {filePaths.length ? (
          <div className="flex flex-row gap-1 items-center">
            {filePaths?.map((file) => (
              <Image
                key={file}
                src={getServerFile(file)}
                width={30}
                height={30}
                className="w-8 h-8"
                alt={file}
              />
            ))}
          </div>
        ) : (
          <AppText className="cursor-pointer text-primary">Загрузить</AppText>
        )}
      </div>
    </>
  );
};

const ImageEditorWrapper = <T extends FieldValues>(
  props: (ColumnDataSchemaModel | ColumnTemplateProp) & Props<T>
) => {
  const queryClient = getQueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <ImageEditor {...props} />
    </QueryClientProvider>
  );
};

export default ImageEditorWrapper;
