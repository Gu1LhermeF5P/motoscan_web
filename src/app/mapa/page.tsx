"use client";
import { useState } from "react";

type Status = "PRONTA" | "BO" | "MECANICO";

interface Moto {
  id: number;
  zona: string;
  status: Status;
}

const zonas = ["A", "B", "C", "D", "E"];
const cores: Record<Status, string> = {
  PRONTA: "bg-green-500",
  BO: "bg-red-500",
  MECANICO: "bg-yellow-400",
};

const mockMotos: Moto[] = [
  { id: 1, zona: "A", status: "PRONTA" },
  { id: 2, zona: "C", status: "BO" },
  { id: 3, zona: "C", status: "BO" },
  { id: 4, zona: "E", status: "MECANICO" },
];

export default function MapaMotos() {
  const [motos] = useState<Moto[]>(mockMotos);

  const renderQuadrado = (zona: string, index: number) => {
    const moto = motos.find((m) => m.zona === zona && m.id === index);
    if (moto) {
      return <div key={index} className={`w-8 h-8 ${cores[moto.status]} rounded`} />;
    }
    return <div key={index} className="w-8 h-8 bg-gray-300 rounded" />;
  };

  return (
    <section className="p-4 max-w-sm mx-auto text-sm">
      <p className="font-semibold text-gray-700">Status:</p>
      <h2 className="text-green-600 font-bold text-lg mb-2">Pátio - Filial Zona Leste</h2>

      <div className="flex justify-between gap-2 mb-3">
        <button className="border px-3 py-1 rounded text-xs">PRONTA</button>
        <button className="border px-3 py-1 rounded text-xs">BO</button>
        <button className="border px-3 py-1 rounded text-xs">MECANICO</button>
      </div>

      <button className="bg-green-500 text-white w-full py-2 rounded font-medium mb-5">
        Ver todas as mtos no pátio
      </button>

      {zonas.map((zona) => (
        <div key={zona} className="mb-4">
          <p className="font-semibold mb-2">Zona {zona} - Toque em uma mto para detalhes</p>
          <div className="flex gap-2">
            {[1, 2, 3, 4].map((i) => renderQuadrado(zona, i))}
          </div>
        </div>
      ))}

      <footer className="fixed bottom-0 left-0 right-0 bg-white border-t flex justify-around py-2">
        <span className="text-xs text-center">🏠<br />Home</span>
        <span className="text-xs text-center">➕<br />Cadastro</span>
        <span className="text-xs text-center">🏍️<br />Motos</span>
        <span className="text-xs text-green-600 font-bold">🗺️<br />Mapa</span>
      </footer>
    </section>
  );
}
