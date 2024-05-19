import Center from "@/components/Center";
import Sidebar from "@/components/Sidebar";
import { getSession } from "next-auth/react";

export default function Home() {
  return (
    <>
      <main className="flex scrollbar-hide">
        <Sidebar />
        <Center />
      </main>
    </>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession(context);
  return {
    props: {
      session,
    },
  }
}
