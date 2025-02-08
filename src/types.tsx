import { ParserBuilder } from "nuqs";
import { RegisterUserDto } from "./openapi/requests";

export type ModalQueryParams = {
  type: ParserBuilder<
    Partial<
      | "update_category"
      | "create_category"
      | "add_fields"
      | "update_fields"
      | string
    >
  >;
  id?: ParserBuilder<number>;
};

export type Exception = {
  message: string;
  error: string;
  status: number;
};

export type PageParams = {
  params: { id: string };
};

export type RolesAccess = "cloud_access" | "bi_access";
export type Pages = "" | "create" | "users";
export type BoxTypes = "box_single" | "box_characteristics";
export type RegisterForm = RegisterUserDto & { password_confirmation: string };
