"use client";
import { useTransition } from "react";
import { Button } from "./ui/button"
import { useRouter } from "next/navigation";
import { createNewDocument } from "@/actions/actions";

function NewDocumentButton() {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handleCreateNewDocument = () => {
    startTransition(async () => {
      const result = await createNewDocument();
      
      if (result?.docId) {  
        router.push(`/doc/${result.docId}`);
      } else {
        console.error("Failed to create document.");
      }
    });
  };

  return <Button 
  className="border-2 border-blue text-white  font-bold p-6 rounded-lg shadow-glow hover:shadow-neon"
  onClick={handleCreateNewDocument} 
  disabled={isPending}>
    {isPending ? "Creating..." : "New Document"}
    </Button>;
  
}
export default NewDocumentButton