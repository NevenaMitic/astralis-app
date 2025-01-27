"use client";
import { FormEvent, useEffect, useState, useTransition } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "@/firebase";
import { useDocumentData } from "react-firebase-hooks/firestore";
import Editor from "./Editor";
import useOwner from "@/lib/useOwner";
import DeleteDocument from "./DeleteDocument";
import InviteUser from "./InviteUser";
import ManageUsers from "./ManageUsers";
import Avatars from "./Avatars";

function Document({ id }: { id: string }) {
    if (!id) {
        return <p>Error: Missing document ID.</p>;
    }

    const [data, loading, error] = useDocumentData(doc(db, "documents", id));
    const [input, setInput] = useState("");
    const [isUpdating, startTransition] = useTransition();
    const isOwner = useOwner();

    useEffect(() => {
        if (data) {
            setInput(data.title);
        }
    }, [data]);

    const updateTitle = async (e: FormEvent) => {
        e.preventDefault();

        if (input.trim()) {
            startTransition(async () => {
                await updateDoc(doc(db, "documents", id), {
                    title: input,
                });
            });
        }
    };

    if (error) {
        return <p>Error: {error.message}</p>;
    }

    return (
        <div className="flex-1 h-full bg-white p-5">
            <div className="flex max-w-6xl mx-auto justify-between pb-5">

                <form onSubmit={updateTitle}
                    className="flex flex-col font-medium sm:flex-row sm:space-x-2 space-y-4 sm:space-y-0 flex-1">
                    <Input
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                    />
                    <div className="flex flex-row gap-2">
                        <Button
                            disabled={isUpdating}
                            type="submit"
                            className="bg-purple1 flex-1"
                        >
                            {isUpdating ? "Updating..." : "Update"}
                        </Button>
                        {isOwner && (
                            <>
                                <InviteUser />
                                <DeleteDocument />
                            </>
                        )}
                    </div>
                </form>
            </div>
            <div className="flex max-w-6xl mx-auto justify-between items-center mb-5 gap-2">
                <ManageUsers />
                <Avatars />

            </div>
            <hr className="pb-10" />
            <Editor />
        </div>
    );
}

export default Document;