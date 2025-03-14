import React from "react";
import ItemsTable from "./_components/ItemsTable";

type Props = {};

const Page = async () => {
  return (
    <div className="w-[calc(100%-80px)] mx-auto">
      <ItemsTable />
    </div>
  );
};

export default Page;
