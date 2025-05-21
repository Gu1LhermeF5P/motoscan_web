"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

interface Moto {
  id: number;
  modelo: string;
  status: string;
}

export default function ListaMotos() {
  const [motos, setMotos] = useState<Moto[]>([]);

  useEffect(() => {
    fetch("http://localhost:8080/api/motos")
      .then((res) => res.json())
      .then(setMotos);
  }, []);

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold">Motos Cadastradas</h2>
      {motos.map((moto) => (
        <Link key={moto.id} href={`/motos/${moto.id}`} className="block p-4 border rounded hover:shadow">
          <div className="font-semibold">{moto.modelo}</div>
          <div className={`text-sm ${moto.status === "BO" ? "text-red-600" : moto.status === "MECANICO" ? "text-yellow-600" : "text-green-600"}`}>
            {moto.status}
          </div>
        </Link>
      ))}
    </div>
  );
}
