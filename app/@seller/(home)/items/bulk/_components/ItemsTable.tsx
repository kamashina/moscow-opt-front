"use client";
import NumberColumnType from "@revolist/revogrid-column-numeral"; // import library
import AppText from "@/src/components/AppText/AppText";
import {
  useCategoriesServiceGetSubCategoryById,
  useFileUploadServiceExportItemsExcel,
  useFileUploadServiceImportItemsExcel,
  useItemServiceCreateItemsBulk,
  useItemServiceGetItemsByIds,
} from "@/src/openapi/queries";
import { useItemsStore } from "@/src/store/items";
import { Exception } from "@/src/types";
import { Button, Icon, Input, Loader, Wrapper } from "@mossoft/ui-kit";
import {
  AfterEditEvent,
  BeforeSaveDataDetails,
  ColumnRegular,
  RevoGrid,
  RevoGridCustomEvent,
  Template,
} from "@revolist/react-datagrid";
import { enqueueSnackbar } from "notistack";
import { ChangeEvent, useEffect, useMemo, useRef } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import HeaderItem from "./HeaderItem";
import ImageEditor from "./ImageEditor";

const isBeforeSaveDataDetails = (
  detail: AfterEditEvent
): detail is BeforeSaveDataDetails => "val" in detail;

const plugin = {
  integer: new NumberColumnType("0,0", (props) => 123),
};

const ItemsTable = () => {
  const { mutateAsync: createItemsBulk, isPending: isPendingBulk } =
    useItemServiceCreateItemsBulk();
  const { data: subCategory, isPending: isPendingSchema } =
    useCategoriesServiceGetSubCategoryById({ id: 1 });
  const { mutateAsync: uploadItems, isPending: isPendingImport } =
    useFileUploadServiceImportItemsExcel();
  const { mutateAsync: exportExcel, isPending: isPendingExport } =
    useFileUploadServiceExportItemsExcel();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<{
    rows: Array<{ [key: string]: any }>;
  }>();
  const { replace, fields, update, append } = useFieldArray({
    control,
    name: "rows",
    rules: { maxLength: { value: 10000, message: "Максимум 10000 строк" } },
  });

  const { setSelectedIds, selectedIds } = useItemsStore();
  const { data } = useItemServiceGetItemsByIds({ ids: selectedIds });

  useEffect(() => {
    if (!data?.length) return;
    console.log(data.map((item) => item.tableData));

    replace(data.map((item) => item.tableData));
    console.log(fields);
  }, [data]);

  const addRowsRef = useRef(1);

  const columns: ColumnRegular[] = subCategory?.fieldsSchema?.length
    ? subCategory.fieldsSchema.map((item) => ({
        prop: item.key,
        name: item.key,
        sortable: true,
        size: 250,
        columnType: item.type,
        columnTemplate: Template(HeaderItem),
        cellTemplate:
          item.key === "Медиа"
            ? Template((rest) => ImageEditor({ ...rest, fields }))
            : undefined,
      }))
    : [];

  const emptyRow = columns?.reduce(
    (acc, item) => ({ ...acc, [item.prop]: null }),
    {}
  );

  // useEffect(() => {
  //   if (!columns?.length) return;

  //   replace([emptyRow]);
  // }, [subCategory]);

  const onExportExcel = async () => {
    try {
      const res = await exportExcel({ requestBody: { data: fields } });

      if (!res?.fileData) {
        return enqueueSnackbar("Ошибка: файл не получен", { variant: "error" });
      }

      const blob = new Blob(
        [Uint8Array.from(atob(res.fileData), (c) => c.charCodeAt(0))],
        {
          type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        }
      );

      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = res.fileName || "exported-data.xlsx";
      link.click();
    } catch (e) {
      enqueueSnackbar((e as Exception).message, { variant: "error" });
    }
  };

  const onLoadExcel = async (file: File) => {
    try {
      const res = await uploadItems({ formData: { file }, subCategoryId: 1 });

      replace(res.slice(0, 10000));
    } catch (e) {
      enqueueSnackbar((e as Exception).message, { variant: "error" });
    }
  };

  const handleAddRow = () => {
    if (addRowsRef.current + fields.length > 10000)
      return enqueueSnackbar("Максимум 10000 строк", { variant: "error" });

    Array.from({ length: addRowsRef.current }).forEach(() => {
      append([emptyRow]);
    });
  };

  const handleChangeRow = (e: RevoGridCustomEvent<AfterEditEvent>) => {
    if (isBeforeSaveDataDetails(e.detail) && e.detail?.rowIndex) {
      update(e.detail.rowIndex, {
        ...fields[e.detail.rowIndex],
        [e.detail.prop]: e.detail.val,
      });
      return;
    }

    Object.keys(e.detail.data).map((i) =>
      update(+i, {
        ...fields[+i],
        ...e.detail.data[+i],
      })
    );
  };

  useEffect(() => {
    if (!errors?.rows?.root?.message) return;
    enqueueSnackbar(errors?.rows?.root?.message, { variant: "error" });
  }, [errors?.rows?.root]);

  const onSubmit = async (data: {
    rows: Array<{
      [key: string]: string;
    }>;
  }) => {
    const { rows } = data;

    try {
      const res = await createItemsBulk({
        requestBody: {
          data: rows.map((row) =>
            Object.keys(row).reduce<{ [key: string]: any }>((acc, key) => {
              const type = columns.find((col) => col.prop === key)?.columnType;
              const value =
                (type === "integer" && +row[key]) ||
                (type === "array" && row[key]) ||
                row[key].toString();

              if (value) acc[key] = value;
              return acc;
            }, {})
          ),
        },
        subCategoryId: 1,
      });
    } catch (e) {
      enqueueSnackbar((e as Exception).message, { variant: "error" });
    }
  };

  const memoizedFields = useMemo(
    () =>
      fields.map((item, index) => ({
        ...item,
        ["Номер"]: index + 1,
      })),
    [fields]
  );

  if (!columns?.length || isPendingSchema || isPendingImport) {
    return (
      <div className="mt-20 w-full h-[calc(100vh-300px)]">
        <Loader
          style={{ width: "100px", height: "100px", marginTop: "100px" }}
        />
      </div>
    );
  }

  return (
    <Wrapper className="mt-10 w-full min-h-[calc(100vh-300px)]">
      <div className="flex flex-row justify-between mb-2">
        <div className="px-2 py-1 bg-[#F7F7FA] w-fit rounded-[25px]">
          <AppText>{subCategory?.name}</AppText>
        </div>

        <div className="flex flex-row gap-2">
          <label htmlFor="upload-excel">
            <input
              id="upload-excel"
              type="file"
              accept=".xls,.xlsx"
              className="hidden"
              disabled={isPendingImport}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                onLoadExcel(e.target.files![0])
              }
            />

            <div className="px-2 py-1 bg-primary w-fit rounded-[25px] cursor-pointer hover:opacity-70">
              <AppText className="text-center text-white">Импорт Excel</AppText>
            </div>
          </label>
          <Button
            variant="link"
            onClick={onExportExcel}
            disabled={isPendingExport}
            className="px-2 !py-1 bg-primary w-fit rounded-[25px] cursor-pointer hover:opacity-70"
          >
            <AppText className="text-center text-white">Экспорт Excel</AppText>
          </Button>
        </div>
      </div>

      <div className="h-[calc(100vh-300px)] border-primary border-[1px] rounded-lg">
        <RevoGrid
          columnTypes={plugin}
          source={memoizedFields}
          onAfteredit={handleChangeRow}
          columns={[
            { prop: "Номер", name: "Номер", readonly: true, sortable: true },
            ...columns,
          ]}
          range
          className="h-[calc(100vh-300px)]"
          resize
          theme="compact"
        />
      </div>

      <div className="flex flex-row justify-between items-center mt-2">
        <div className="flex flex-row items-center gap-2">
          <label className="flex flex-row gap-2 items-center">
            <AppText className="text-primary text-sm">Добавить строки</AppText>
            <Input
              type="number"
              onChange={(e) => (addRowsRef.current = +e.target.value)}
              value={addRowsRef.current}
              maxLength={3}
              className="border-none w-[120px] h-[30px]"
            />
          </label>
          <div onClick={handleAddRow} className="flex cursor-pointer">
            <Icon name="plus" className="w-6 h-6 !text-primary" />
          </div>
        </div>
        <Button
          isLoading={isPendingBulk}
          onClick={handleSubmit(onSubmit)}
          variant="link"
          className="bg-primary text-white !py-1 !px-2"
        >
          Сохранить
        </Button>
      </div>
    </Wrapper>
  );
};

export default ItemsTable;
