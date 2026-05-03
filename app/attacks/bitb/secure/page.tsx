import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import BitBSecureClient from "./BitBSecureClient";

export default async function BitBSecurePage() {
  const session = await getServerSession(authOptions);

  return <BitBSecureClient session={session} />;
}
