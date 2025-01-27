"use client";
import { db } from "@/firebase";
import { doc } from "firebase/firestore";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useDocumentData } from "react-firebase-hooks/firestore";

function SideBarOption({href, id}: {
    href: string;
    id:string;
}) {
    const [data, loading, error] = useDocumentData(doc(db, "documents", id));
    const pathname = usePathname();
    const isActive = href.includes(pathname) && pathname !== "/";

    if (!data) return null;
  return (
    <Link href={href}
    className={`border p-2 rounded-md ${isActive ? "bg-darkPurple font-bold border-purple" : "border-pink"}`}>
        <p className="truncate text-white">{data.title}</p>
    </Link>
  )
}
export default SideBarOption