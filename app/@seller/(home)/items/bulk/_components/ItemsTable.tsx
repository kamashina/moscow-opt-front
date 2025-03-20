"use client";
import { getQueryClient } from "@/src/api/api";
import AppText from "@/src/components/AppText/AppText";
import {
  useCategoriesServiceGetSubCategoriesByIds,
  useFileUploadServiceExportItemsExcel,
  useFileUploadServiceImportItemsExcel,
  useItemServiceCreateItemsBulk,
  useItemServiceEditItemsBulk,
  useItemServiceGetItemsByIds,
  useItemServiceGetItemsByMyShopKey,
} from "@/src/openapi/queries";
import { SubCategoryResponse } from "@/src/openapi/requests";
import { useItemsStore } from "@/src/store/items";
import { Exception } from "@/src/types";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Icon, Input, Loader, Wrapper } from "@mossoft/ui-kit";
import {
  AfterEditEvent,
  BeforeSaveDataDetails,
  ColumnRegular,
  RevoGrid,
  RevoGridCustomEvent,
  Template,
} from "@revolist/react-datagrid";
import NumberColumnType from "@revolist/revogrid-column-numeral";
import { useRouter } from "next/navigation";
import { enqueueSnackbar } from "notistack";
import { ChangeEvent, useEffect, useMemo, useRef, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { bulkSchema } from "../_helpers/yupSchema";
import ErrorMessage from "./ErrorIndicator";
import HeaderItem from "./HeaderItem";
import ImageEditorWrapper from "./ImageEditor";

const isBeforeSaveDataDetails = (
  detail: AfterEditEvent
): detail is BeforeSaveDataDetails => "val" in detail;

const plugin = {
  integer: new NumberColumnType("0,0"),
};

const errorStyles = `
  .error-row {
    background-color: rgba(255, 0, 0, 0.15) !important; /* Красный фон с прозрачностью */
    z-index: 1; /* Поднимаем строку над остальными */
  }
`;

const ItemsTable = () => {
  const router = useRouter();
  const queryClient = getQueryClient();

  const addRowsRef = useRef(1);
  const { selectedIds, type, setSelectedIds, selectedSubCategoryIds } =
    useItemsStore();

  const { mutateAsync: updateItemsBulk, isPending: isPendingEditBulk } =
    useItemServiceEditItemsBulk({
      onSuccess: async () => {
        await queryClient.invalidateQueries({
          queryKey: [useItemServiceGetItemsByMyShopKey],
        });
      },
    });

  const { mutateAsync: createItemsBulk, isPending: isPendingBulk } =
    useItemServiceCreateItemsBulk({
      onSuccess: async () => {
        await queryClient.invalidateQueries({
          queryKey: [useItemServiceGetItemsByMyShopKey],
        });
      },
    });
  const { data: subCategories, isPending: isPendingSchema } =
    useCategoriesServiceGetSubCategoriesByIds(
      { ids: selectedSubCategoryIds! },
      undefined,
      { enabled: !!selectedSubCategoryIds?.length }
    );
  const { mutateAsync: uploadItems, isPending: isPendingImport } =
    useFileUploadServiceImportItemsExcel();
  const { mutateAsync: exportExcel, isPending: isPendingExport } =
    useFileUploadServiceExportItemsExcel();
  const { data } = useItemServiceGetItemsByIds(
    { ids: selectedIds },
    undefined,
    { enabled: !!selectedIds.length }
  );

  const [subCategory, setSubCategory] = useState<SubCategoryResponse | null>(
    subCategories?.[0] || null
  );

  useEffect(() => {
    setSubCategory(subCategories?.[0] || null);
  }, [subCategories]);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<{
    rows: Array<{ [key: string]: any }>;
  }>({
    mode: "onSubmit",
    resolver: yupResolver(bulkSchema),
  });

  const { replace, fields, update, append } = useFieldArray({
    control,
    name: "rows",
    rules: {
      maxLength: { value: 10000, message: "Максимум 10000 строк" },
    },
    keyName: "customId",
  });

  const columns: ColumnRegular[] =
    subCategory?.fieldsSchema?.map((item) => ({
      prop: item.key,
      name: item.key,
      sortable: true,
      size: 250,
      columnType: item.type,
      columnTemplate: Template(HeaderItem),
      ...(item.key === "Медиа" && {
        cellTemplate: Template((rest) =>
          ImageEditorWrapper({ ...rest, fields, update })
        ),
      }),
    })) || [];

  useEffect(() => {
    if (!columns?.length) return;
    if (!data?.length) {
      replace([
        columns?.reduce((acc, item) => ({ ...acc, [item.prop]: null }), {}),
      ]);
      return;
    }
    replace(data.map((item) => ({ id: item.id, ...item.tableData })));
    return () => {
      replace([
        columns?.reduce((acc, item) => ({ ...acc, [item.prop]: null }), {}),
      ]);
    };
  }, [data, selectedIds, subCategory?.fieldsSchema]);

  useEffect(() => {
    const blockExit = (event: Event) => {
      event.preventDefault();
      window.history.pushState(null, "", window.location.href);
    };

    window.addEventListener("beforeunload", blockExit);
    window.addEventListener("popstate", blockExit);
    window.history.pushState(null, "", window.location.href);

    return () => {
      window.removeEventListener("beforeunload", blockExit);
      window.removeEventListener("popstate", blockExit);
    };
  }, []);

  const onExportExcel = async () => {
    try {
      const transformedData = fields.map(({ customId, ...item }) => {
        return Object.fromEntries(
          Object.entries(item).map(([key, value]) => [
            key,
            Array.isArray(value) ? value.join(", ") : value,
          ])
        );
      });

      const res = await exportExcel({ requestBody: { data: transformedData } });

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
      const res = await uploadItems({
        formData: { file },
        subCategoryId: subCategory?.id!,
      });

      const transformedData = res.slice(0, 10000).map(({ Медиа, ...item }) => ({
        ...item,
        ...(typeof Медиа === "string" &&
          Медиа.trim() && { Медиа: Медиа.split(", ") }),
      }));

      replace(transformedData);
    } catch (e) {
      enqueueSnackbar((e as Exception).message, { variant: "error" });
    }
  };

  const handleAddRow = () => {
    if (addRowsRef.current + fields.length > 10000)
      return enqueueSnackbar("Максимум 10000 строк", { variant: "error" });

    Array.from({ length: addRowsRef.current }).forEach(() => {
      append([
        columns?.reduce((acc, item) => ({ ...acc, [item.prop]: null }), {}),
      ]);
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

    Object.keys(e.detail.data).map((key) => {
      update(+key, {
        ...fields[+key],
        ...e.detail.data[+key],
      });
    });
  };

  useEffect(() => {
    if (errors?.rows?.root?.message) {
      enqueueSnackbar(errors.rows.root.message, { variant: "error" });
      return;
    }
  }, [errors?.rows?.root?.message]);

  const onSubmit = async (data: {
    rows: Array<{
      [key: string]: string;
    }>;
  }) => {
    const rows = data.rows
      .map(({ customId, myRowClass, ...rest }) => rest)
      .map((row) =>
        Object.keys(row).reduce<{ [key: string]: any }>((acc, key) => {
          const type = columns.find((col) => col.prop === key)?.columnType;
          const value =
            (type === "integer" && +row[key]) ||
            (type === "array" && row[key]) ||
            row[key]?.toString();

          if (value) acc[key] = value;
          return acc;
        }, {})
      );

    try {
      if (type === "edit") {
        const res = await updateItemsBulk({
          requestBody: { data: rows.map(({ Номер, isValid, ...row }) => row) },
          subCategoryId: subCategory?.id!,
        });
        setSelectedIds([], "edit");
        router.push("/items");
        return;
      }
      const res = await createItemsBulk({
        requestBody: {
          data: rows.map(({ Номер, isValid, ...row }) => row),
        },
        subCategoryId: subCategory?.id!,
      });
      router.push("/items");
    } catch (e) {
      enqueueSnackbar((e as Exception).message, {
        variant: "error",
      });
    }
  };

  const memoizedFields = useMemo(
    () =>
      fields.map((item, index) => ({
        ...item,
        ["Номер"]: index + 1,
        myRowClass: errors?.rows?.[index] ? "error-row" : "",
      })),
    [fields, errors, update]
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
  console.log(subCategory?.name);

  return (
    <Wrapper className="mt-10 w-full min-h-[calc(100vh-300px)]">
      <div className="flex flex-row justify-between mb-2">
        <div className="flex flex-row items-center justify-center gap-2">
          <div className="overflow-x-auto flex flex-row gap-2 max-w-[600px]">
            {subCategories?.map((item) => (
              <div
                key={item.id}
                onClick={() => setSubCategory(item)}
                className={`px-2 py-1 bg-[#F7F7FA] cursor-pointer hover:opacity-70 w-fit rounded-[25px] ${
                  subCategory?.id === item.id ? "bg-primary text-white" : ""
                }`}
              >
                <AppText
                  className={`${
                    subCategory?.id === item.id ? "text-white" : ""
                  }`}
                >
                  {item.name}
                </AppText>
              </div>
            ))}
          </div>
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
        <style>{errorStyles}</style>
        <RevoGrid
          key={JSON.stringify(errors?.rows)}
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
          rowClass="myRowClass"
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
        <div className="flex flex-row gap-2 items-center">
          <ErrorMessage errors={errors} />
          <Button
            isLoading={isPendingBulk || isPendingEditBulk}
            onClick={handleSubmit(onSubmit)}
            variant="link"
            className="bg-primary text-white !py-1 !px-2"
          >
            Сохранить
          </Button>
        </div>
      </div>
    </Wrapper>
  );
};

export default ItemsTable;
