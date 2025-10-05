import type { Metadata } from "next";
import { SITE_URL } from "@/constants/site";
import Link from "next/link";

export const metadata: Metadata = {
  alternates: {
    canonical: SITE_URL,
  },
  title: "JAM Video Editor",
  description: "Professional video editing made simple",
};

export default async function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-black">
      <div className="text-center space-y-8">
        <h1 className="text-6xl md:text-8xl font-bold">
          <span className="text-red-600">JAM</span>{" "}
          <span className="text-white">Video Editor</span>
        </h1>
        <Link
          href="/projects"
          className="inline-block bg-red-600 hover:bg-red-700 text-white font-bold text-xl px-12 py-4 rounded-lg transition-colors duration-200"
        >
          Enter
        </Link>
      </div>
    </div>
  );
}
