"use client"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import * as Y from "yjs";
import { FormEvent, useState, useTransition } from "react";
import { Button } from "./ui/button";
import { toast } from "sonner";
import { Input } from "./ui/input";
import { BotIcon, MessageCircleCode } from "lucide-react";
import Markdown from "react-markdown";

function ChatToDocument({ doc }: { doc: Y.Doc }) {
    const [isOpen, setIsOpen] = useState(false);
    const [summary, SetSummary] = useState("");
    const [question, SetQuestion] = useState("");
    const [input, setInput] = useState("");
    const [isPending, startTransition] = useTransition();

    const handleAskQuestion = async (e: FormEvent) => {
        e.preventDefault();

        if (!process.env.NEXT_PUBLIC_BASE_URL) {
            toast.error("This feature requires a valid API key. Please upgrade to use it.");
            return;
        }

        SetQuestion(input);

        startTransition(async () => {
            const documentData = doc.get("document-store").toJSON();

            try {
                const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/chatToDocument`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ documentData, question: input }),
                });

                if (!res.ok) {
                    toast.error("This feature is currently unavailable.");
                    return;
                }

                const { message } = await res.json();
                setInput("");
                SetSummary(message);
                toast.success("Success!");
            } catch {
                toast.error("Failed to fetch response.");
            }
        });
    };

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <Button asChild className="bg-blue-300">
                <DialogTrigger>
                    <MessageCircleCode className="mr-2" />
                    Chat to Document
                </DialogTrigger>
            </Button>

            <DialogContent className="bg-white text-black">
                <DialogHeader>
                    <div className="text-start">
                        <DialogTitle className="text-xl font-bold text-gray-800">
                            Chat to the Document!
                        </DialogTitle>
                        <p className="text-sm text-red-500 mt-2">
                        This feature is currently unavailable as it requires a paid subscription to ChatGPT.
                        </p>
                    </div>
                    <DialogDescription className="text-gray-600">
                        Ask a question and chat with the document using AI.
                    </DialogDescription>
                    <hr className="mt-5" />
                    {question && <p className="mt-5 text-gray-500">Q: {question} </p>}
                </DialogHeader>

                {summary && (
                    <div className="flex flex-col items-start max-h-96 overflow-y-scroll gap-2 bg-gray-100">
                        <div className="flex">
                            <BotIcon className="w-10 flex-shrink-0" />
                            <p className="font-bold">
                                GPT {isPending ? "is thinking..." : "Says:"}
                            </p>
                        </div>
                        <div>{isPending ? "Thinking..." : <Markdown>{summary}</Markdown>}</div>
                    </div>
                )}
                <form onSubmit={handleAskQuestion} className="flex gap-2 ">
                    <Input
                        type="text"
                        placeholder="i.e. what is this about?"
                        className="w-full"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                    />
                    <Button type="submit" disabled={!input || isPending} className="bg-gray-700 text-white">
                        {isPending ? "Asking..." : "Ask"}
                    </Button>
                </form>
            </DialogContent>
        </Dialog>

    )
}
export default ChatToDocument;