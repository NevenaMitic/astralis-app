"use client"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { FormEvent, useState, useTransition } from "react";
import { Button } from "./ui/button";
import { usePathname } from "next/navigation";
import { inviteUserToDocument } from "@/actions/actions";
import { toast } from "sonner";
import { Input } from "./ui/input";

function InviteUser() {
    const [isOpen, setIsOpen] = useState(false);
    const [email, setEmail] = useState("");
    const [isPending, startTransition] = useTransition();
    const pathname = usePathname();

    const handleInvite = async (e: FormEvent) => {
        e.preventDefault();

        const roomId = pathname.split("/").pop();
        if (!roomId) return;

        startTransition(async () => {
            const reuslt = await inviteUserToDocument(roomId, email);

            if ( reuslt?.success ) {
                setIsOpen(false);
                setEmail('');
                toast.success("User Added to Room successfuly!");
            }else {
                toast.error("Failed to add user to room");
            }
        })
    };

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <Button asChild className="bg-purple2">
             <DialogTrigger>Invite</DialogTrigger>
            </Button>
            <DialogContent className="bg-white text-black">
                <DialogHeader>
                    <DialogTitle>Invite a user to collaborate!</DialogTitle>
                    <DialogDescription>
                        Enter the email address of the user you want to invite.
                    </DialogDescription>
                </DialogHeader>
               <form onSubmit={handleInvite} className="flex gap-2 ">
                <Input 
                type="email"
                placeholder="Email"
                className="w-full"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                />
                <Button type="submit" disabled={!email || isPending} className="bg-gray-700 text-white">
                    {isPending ? "Inviting..." : "Invite"}
                </Button>
               </form>
            </DialogContent>
        </Dialog>

    )
}
export default InviteUser;