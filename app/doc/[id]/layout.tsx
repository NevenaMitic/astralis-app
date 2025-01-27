/*import { auth } from "@clerk/nextjs/server";
STARI NACIN
function DocLayout({children, params: {id} }: {children: React.ReactNode, params:{id: string}}) {
    auth().protect();
  return (
    <div>{children}</div>
  )
}
export default DocLayout */

import RoomProvider from "@/components/providers/RoomProvider";
import { auth } from "@clerk/nextjs/server";

async function DocLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const userAuth = await auth();

  if (!userAuth || !userAuth.userId) {
    return <div>Unauthorized access</div>;
  }

  return <RoomProvider roomId={id}>{children}</RoomProvider>;
}

export default DocLayout;

