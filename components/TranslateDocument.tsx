"use client"
import * as Y from "yjs";
import { Button } from "./ui/button";
import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { DialogHeader } from "./ui/dialog";
import { FormEvent, useState, useTransition } from "react";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { BotIcon, LanguagesIcon } from "lucide-react";
import { toast } from "sonner";
import Markdown from "react-markdown";

type Language =
    | "english"
    | "spanish"
    | "portuguese"
    | "french"
    | "german"
    | "arabic"
    | "japanese"
    | "korean"
    | "rusian"
    | "croatian"
    | "turkish";
const languages: Language[] = [
    "english", "spanish", "portuguese", "french", "german", "arabic", "japanese", "korean", "rusian", "croatian", "turkish"
];

function TranslateDocument({ doc }: { doc: Y.Doc }) {
    const [isOpen, setIsOpen] = useState(false);
    const [summary, SetSummary] = useState("");
    const [question] = useState("");
    const [language, setLanguage] = useState<string>("");
    const [isPending, startTransition] = useTransition();

    const handleAskQuestion = async (e: FormEvent) => {
        e.preventDefault();
        startTransition(async () => {
            const documentData = doc.get("document-store").toJSON();
            const res = await fetch(
                `${process.env.NEXT_PUBLIC_BASE_URL}/translateDocument`,{
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        documentData,
                        targetLang: language,
                    }),
                }
            );
            if (res.ok) {
                const { translated_text } = await res.json();
                SetSummary(translated_text);
                toast.success("Translated Summary Successfuly!")
            }
        });
    };

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>

            <Button asChild className="bg-blue-300">
                <DialogTrigger>
                    <LanguagesIcon/> Translate
                </DialogTrigger>
            </Button>

            <DialogContent className="bg-white text-black">
                
                <DialogHeader>
                    <DialogTitle>Translate the Document </DialogTitle>
                    <DialogDescription>
                        Select a language and AI will translate the document for you!
                    </DialogDescription>

                    <hr className="mt-5"/>
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
                    <Select
                        value={language}
                        onValueChange={(value) => setLanguage(value)}
                        >
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select a Language" />
                        </SelectTrigger>

                        <SelectContent className="absolute mt-1 lg:max-h-60 bg-white text-black border border-gray-300 rounded-md shadow-lg w-full">
                            {languages.map((language) => (
                                <SelectItem key={language} value={language}>
                                    {language.charAt(0).toUpperCase() + language.slice(1)}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>

                    <Button type="submit" disabled={!language || isPending} className="bg-gray-700 text-white">
                        {isPending ? "Translating..." : "Translate"}
                    </Button>

                </form>
            </DialogContent>
        </Dialog>
    )
}
export default TranslateDocument