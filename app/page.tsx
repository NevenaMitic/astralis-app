import Image from "next/image";
import { ArrowLeftCircle } from "lucide-react";

export default function Home() {
  return (
    <main className="w-screen h-screen relative">
      <div
        className="flex items-center w-full h-full bg-cover bg-center"
        style={{ backgroundImage: "url(/main-bg.webp)" }}
      >
        <div className="pl-20 md:pl-40 pb-56 md:pb-20 flex flex-col gap-5 z-[10] max-w-[900px]">
          <h1 className="text-[50px] text-white font-semibold">
            Unlock the Future of Documents with
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple to-red-500">
              {" "}
              Astralis
            </span>
          </h1>
          <p className="text-gray-200 hidden md:block">
            Astralis isn&apos;t just a tool—it's a revolution in the way you create,
            collaborate, and communicate. Seamlessly edit, translate with AI precision,
            and discuss your work in real-time with ChatGPT. Take your documents to
            new heights.
          </p>
        </div>
      </div>

      <div className="absolute bottom-0 right-0 z-[10]">
        <Image
          src="/horse.png"
          alt="horse"
          height={300}
          width={300}
          unoptimized
          className="absolute right-55 top-40"
        />

        <Image src="/cliff.webp" alt="cliff" width={480} height={480} />
      </div>

      <div className="absolute bottom-0 z-[5] w-full h-auto">
        <Image
          src="/trees.webp"
          alt="trees"
          width={2000}
          height={2000}
          className="w-full h-full"
        />
      </div>
      <div className="absolute top-0  p-4 left-0 z-[10] flex space-x-2 text-white items-center animate-pulse">
        <ArrowLeftCircle className="w-12 h-12" />
        <h1 className="font-bold"> Get started with creating a New Document</h1>

      </div>
      <Image
        src="/stars.png"
        alt="stars"
        height={800}
        width={800}
        unoptimized
        className="absolute top-0 left-0 z-[10]"
      />
    </main>
  );
}
