"use client";
import { Icon } from "@mossoft/ui-kit";
import React from "react";

type Props = {
  name: string;
  className: string;
};

const ClientIcon = ({ ...rest }: Props) => {
  return <Icon {...rest} />;
};

export default ClientIcon;
