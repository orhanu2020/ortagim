import prisma from "../lib/db";
import { unstable_noStore as noStore } from "next/cache";
import Batch from "./Batch";

async function getData() {
  noStore();
  const data = await prisma.user.findMany({
    select: {
      id: true,
      firstName: true,
    },
  });

  return data || [];
}

export async function Navbar() {
  const data = await getData();

  return (
    <nav className="w-full border-b">
      {" "}
      <Batch data={data}></Batch>
    </nav>
  );
}
