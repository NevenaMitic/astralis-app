"use client"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { useState, useTransition } from "react";
import { Button } from "./ui/button";
import { useUser } from "@clerk/nextjs";
import useOwner from "@/lib/useOwner";
import { useRoom } from "@liveblocks/react/suspense";
import { useCollection } from "react-firebase-hooks/firestore";
import { collectionGroup, query, where } from "firebase/firestore";
import { db } from "@/firebase";
import { toast } from "sonner";
import { removeUserFromDocument } from "@/actions/actions";


function ManageUsers() {
    const { user } = useUser();
    const isOwner = useOwner();
    const room = useRoom();
    const [isOpen, setIsOpen] = useState(false);
    const [isPending, startTransition] = useTransition();

    const [usersInRoom] = useCollection(
        user && query(collectionGroup(db, "rooms"), where("roomId", "==", room.id))
    )
    const handleDlelete = (userId: string) => {
        startTransition(async () => {

            if (!user) return;

            const result = await removeUserFromDocument(room.id, userId);
            if ( result?.success ) {
                toast.success("User removed successfuly!");
            } else {
                toast.error("Failed to remove")
            }
        })
    };

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <Button asChild className="bg-gray-200 font-semibold">

                <DialogTrigger>
                    {usersInRoom?.docs.length === 1 ? '1 user' : `${usersInRoom?.docs.length} users`}
                </DialogTrigger>
                
            </Button>
            <DialogContent className="bg-white text-black">
                <DialogHeader>
                    <DialogTitle>Users with Access</DialogTitle>
                    <DialogDescription>
                        Below is a list of users who have access to this document.
                    </DialogDescription>
                </DialogHeader>

                <hr className="my-2" />
                <div className="flex flex-col space-y-2">
                    {usersInRoom?.docs.map((doc) => (
                        <div key={doc.data().userId}
                            className="flex items-center justify-between">
                            <p className="font-light">
                                {doc.data().userId === user?.emailAddresses[0].toString()
                                    ? `You (${doc.data().userId})`
                                    : doc.data().userId}
                            </p>
                            <div className="flex items-center gap-2">
                                <Button variant="outline" disabled>{doc.data().role}</Button>

                                {isOwner &&
                                    doc.data().userId !== user?.emailAddresses[0].toString()
                                    && (
                                        <Button
                                            onClick={() => handleDlelete(doc.data().userId)}
                                            disabled={isPending}
                                            size="sm"
                                        >
                                            {isPending ? "Removing..." : "X"}
                                        </Button>
                                    )}
                            </div>
                        </div>
                    ))}
                </div>
            </DialogContent>
        </Dialog>

    )
}
export default ManageUsers;