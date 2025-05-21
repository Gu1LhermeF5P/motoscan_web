"use client";
import Link from "next/link";
import { Home, PlusCircle, Bike, MapPin } from "lucide-react";

export function BottomNav() {
  const navItems = [
    { href: "/", label: "Home", icon: <Home size={20} /> },
    { href: "/cadastrar", label: "Cadastrar", icon: <PlusCircle size={20} /> },
    { href: "/motos", label: "Motos", icon: <Bike size={20} /> },
    { href: "/mapa", label: "Mapa", icon: <MapPin size={20} /> },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-md flex justify-around py-2 z-50">
      {navItems.map((item) => (
        <Link key={item.href} href={item.href} className="flex flex-col items-center text-gray-700">
          {item.icon}
          <span className="text-xs">{item.label}</span>
        </Link>
      ))}
    </nav>
  );
}
