'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Nav() {
  const pathname = usePathname();

  const linkStyle = (path: string) =>
    `transition hover:text-blue-400 ${pathname === path ? "text-blue-400 font-semibold" : ""}`;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/70 backdrop-blur border-b border-gray-800 flex items-center justify-center py-4 space-x-6">
      <Link href="/" className={linkStyle("/")}>Inicio</Link>
      <Link href="/labs" className={linkStyle("/labs")}>Trabajos</Link>
      <Link href="/tasks" className={linkStyle("/tasks")}>Proyectos</Link>
      <Link href="/about" className={linkStyle("/about")}>Sobre mí</Link>
      <Link href="/easter-eggs" className="text-white hover:text-blue-400">Easter Eggs</Link>
    </nav>
  );
}