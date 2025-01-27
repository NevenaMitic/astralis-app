/*'use client';
import Document from "@/components/Document";

function DocumentPage({
  params: {id},
}: {
    params: {
        id: string;
    };
}) {
  return <div className="flex flex-col flex-1 min-h-screen">
    <Document id={id} />
  </div>
};
export default DocumentPage;*/

'use client';

import { use } from "react";
import Document from "@/components/Document";

function DocumentPage({
  params,
}: {
  params: Promise<{
    id: string;
  }>;
}) {
  const { id } = use(params); 

  if (!id) {
    return <p>Error: Missing document ID.</p>;
  }

  return (
    <div className="flex flex-col p-5 flex-1 min-h-screen">
      <Document id={id} />
    </div>
  );
}

export default DocumentPage;
