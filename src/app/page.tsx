"use client";
import Link from "next/link";
import Image from "next/image";
import logo from "./assets/icon.png"; 

export default function HomePage() {
  return (
    <section className="flex flex-col items-center text-center">
      <Image src={logo} alt="MotoScan Logo" width={100} height={100} className="mb-4" />
      <h1 className="text-2xl font-bold text-green-600 mb-2">Bem-Vindo ao MotoScan</h1>
      <p className="text-sm text-gray-600 mb-8">Gerencie o status das motos da frota Mottu com agilidade e controle.</p>

      <Link href="/cadastrar" className="bg-green-600 text-white px-6 py-3 rounded-full mb-4 w-64">
        Cadastrar Moto
      </Link>
      <Link href="/motos" className="bg-green-600 text-white px-6 py-3 rounded-full w-64">
        Visualizar Motos
      </Link>
    </section>
  );
}
