"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";

type Status = "PRONTA" | "MECANICO" | "BO";

interface Moto {
  id: number;
  placa: string;
  modelo: string;
  status: Status;
}

const mockMotos: Moto[] = [
  { id: 1, placa: "ABC1234", modelo: "MOTO POP", status: "PRONTA" },
  { id: 2, placa: "XYZ5678", modelo: "MOTO SPORT", status: "MECANICO" },
  { id: 3, placa: "DEF9876", modelo: "MOTO E", status: "BO" },
];

const statusColors: Record<Status, string> = {
  PRONTA: "bg-green-100 text-green-800",
  MECANICO: "bg-yellow-100 text-yellow-800",
  BO: "bg-red-100 text-red-800",
};

export default function ListaMotos() {
  const [motos, setMotos] = useState<Moto[]>(mockMotos);
  const router = useRouter();

  return (
    <section className="max-w-2xl mx-auto p-4">
      <h2 className="text-xl font-bold mb-4 text-gray-800">Motos Cadastradas</h2>
      <ul className="flex flex-col gap-4">
        {motos.map((moto) => (
          <li
            key={moto.id}
            onClick={() => router.push(`/motos/${moto.id}`)}
            className="bg-white p-4 rounded shadow cursor-pointer hover:bg-gray-50 transition"
          >
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">{moto.modelo}</h3>
                <p className="text-sm text-gray-700">Placa: {moto.placa}</p>
              </div>
              <span
                className={`text-sm px-3 py-1 rounded-full font-medium ${
                  statusColors[moto.status]
                }`}
              >
                {moto.status}
              </span>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
