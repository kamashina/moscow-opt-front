import * as yup from "yup";

export const bulkSchema = yup.object().shape({
  rows: yup
    .array()
    .of(
      yup
        .object()
        .shape({
          Артикул: yup.string().required("Обязательное поле"),
          Бренд: yup.string().nullable().required("Обязательное поле"),
          Группа: yup.string().required("Обязательное поле"),
          "Страна производства": yup.string().required("Обязательное поле"),
          "Дропшиппинг?": yup
            .string()
            .nullable()
            .transform((value) =>
              value && typeof value === "string"
                ? value.toLowerCase().trim()
                : null
            )
            .oneOf(["да", null], "Допустимые значения: 'Да' или пустое поле"),

          Коробка: yup
            .string()
            .transform((value) => (value === "" ? null : value))
            .matches(/^\d+$/, "Формат: число (например, 5)")
            .nullable(),

          "Кастомный короб": yup
            .string()
            .transform((value) => (value === "" ? null : value))
            .matches(
              /^([a-zA-Zа-яА-Я0-9]+-\d+)$/,
              "Формат: string-число (например, custom-10 или 40-1)"
            )
            .nullable(),

          "Емкость аккумулятора(А/ч)": yup.number().nullable(),
          "Кол-во на складе": yup
            .number()
            .nullable()
            .min(0, "Не может быть отрицательным"),
          "Максимальная скидка, %": yup
            .number()
            .nullable()
            .min(0, "Скидка не может быть отрицательной")
            .max(100, "Скидка не может быть больше 100%"),
          Цена: yup
            .number()
            .typeError("Цена должна быть числом")
            .positive("Цена должна быть положительной")
            .required("Обязательное поле"),
          Тип: yup.string().required("Обязательное поле"),
          Медиа: yup
            .array()
            .min(1, "Должен быть хотя бы один медиафайл")
            .required("Обязательное поле"),
        })
        .test(
          "at-least-one-field-filled",
          "Хотя бы одно из полей 'Дропшиппинг?', 'Коробка' или 'Кастомный короб' должно быть заполнено",
          (obj) => {
            const hasValue = (val: any) =>
              val !== null && val !== undefined && val !== "";
            return (
              hasValue(obj["Дропшиппинг?"]) ||
              hasValue(obj["Коробка"]) ||
              hasValue(obj["Кастомный короб"])
            );
          }
        )
        .test(
          "all-string-fields-max-length",
          "Все текстовые поля должны быть не длиннее 50 символов",
          (obj) => {
            return Object.values(obj || {}).every(
              (value) => typeof value !== "string" || value.length <= 50
            );
          }
        )
    )
    .max(10000, "Максимум 10000 строк"),
}) as yup.ObjectSchema<{ rows: Record<string, any>[] }>;
