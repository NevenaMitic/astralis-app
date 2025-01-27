"use client"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { useState, useTransition } from "react";
import { Button } from "./ui/button";
import { DialogClose } from "@radix-ui/react-dialog";
import { usePathname, useRouter } from "next/navigation";
import { deleteDocument } from "@/actions/actions";
import { toast } from "sonner";

function DeleteDocument() {
    const [isOpen, setIsOpen] = useState(false);
    const [isPending, startTransition] = useTransition();
    const pathname = usePathname();
    const router = useRouter();

    const handleDelete = async () => {
        const roomId = pathname.split("/").pop();
        if (!roomId) return;

        startTransition(async () => {
            const reuslt = await deleteDocument(roomId);

            if ( reuslt?.success ) {
                setIsOpen(false);
                router.replace("/");
                toast.success("Room Deleted Successfully");
            }else {
                toast.error("Failed to delete");
            }
        })
    };

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <Button asChild className="bg-purple3">
             <DialogTrigger>Delete</DialogTrigger>
            </Button>
            <DialogContent className="bg-white text-black">
                <DialogHeader>
                    <DialogTitle>Are you sure?</DialogTitle>
                    <DialogDescription>
                        This will delete the doocument and all its content, removing all users from the document.
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter className="sm:justify-end gap-2">
                    <Button
                    type="button"
                    className="bg-purple"
                    onClick={handleDelete}
                    disabled={isPending}
                    >
                        {isPending ? "Deleting..." : "Delete"}
                    </Button>
                    <DialogClose asChild>
                        <Button type="button">
                            Close
                        </Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>

    )
}
export default DeleteDocument