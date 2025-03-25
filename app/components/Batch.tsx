import React from "react";
import AddBatch from "./AddBatch";
import { SelectGroup } from "./SelectGroup";

interface User {
  id: string;
  firstName: string;
}

const Batch = ({ data }: { data: User[] }) => {
  return (
    <>
      <AddBatch />
      <div className="w-full flex justify-center px-4 py-2">
        <SelectGroup data={data} />
        {/* <SearchModalCompnent /> */}
        {/* <UserNav /> */}
      </div>
    </>
  );
};

export default Batch;
