"use client";
import { useState } from "react";

type Status = "PRONTA" | "BO" | "MECANICO" | "VAZIA";

type Moto = {
  id: number;
  zona: string;
  status: Status;
};

const zonas = ["A", "B", "C", "D", "E"];
const statusColors: Record<Status, string> = {
  PRONTA: "bg-green-500",
  BO: "bg-red-500",
  MECANICO: "bg-yellow-500",
  VAZIA: "bg-gray-300",
};

const motosMock: Moto[] = [
  { id: 1, zona: "A", status: "PRONTA" },
  { id: 2, zona: "C", status: "BO" },
  { id: 3, zona: "C", status: "BO" },
  { id: 4, zona: "E", status: "MECANICO" },

];

export default function MapaPatio() {
  const [filtro, setFiltro] = useState<Status | "TODOS">("TODOS");

  const getMotosPorZona = (zona: string) => {
    const motosZona = motosMock.filter((m) => m.zona === zona);
    const total = 5;
    const preenchidas = [...motosZona];
    while (preenchidas.length < total) {
      preenchidas.push({ id: Date.now() + Math.random(), zona, status: "VAZIA" });
    }
    return preenchidas;
  };

  const renderQuadrado = (moto: Moto, i: number) => {
    if (filtro !== "TODOS" && moto.status !== filtro && moto.status !== "VAZIA") {
      return null;
    }
    return (
      <div
        key={i}
        className={`w-8 h-8 rounded ${statusColors[moto.status]} cursor-pointer transition hover:scale-105`}
        title={moto.status !== "VAZIA" ? `Status: ${moto.status}` : "Vazio"}
      />
    );
  };

  return (
    <div className="max-w-md mx-auto p-4 text-sm font-medium text-gray-800">
      <h2 className="text-sm font-bold">Status:</h2>
      <h3 className="text-lg font-bold text-green-600 mb-2">Pátio - Filial Zona Leste</h3>

      <div className="flex gap-2 mb-3">
        <button
          onClick={() => setFiltro("PRONTA")}
          className={`border px-3 py-1 rounded-full ${
            filtro === "PRONTA" ? "bg-green-500 text-white" : "bg-green-100 text-green-800"
          }`}
        >
          PRONTA
        </button>
        <button
          onClick={() => setFiltro("BO")}
          className={`border px-3 py-1 rounded-full ${
            filtro === "BO" ? "bg-red-500 text-white" : "bg-red-100 text-red-800"
          }`}
        >
          BO
        </button>
        <button
          onClick={() => setFiltro("MECANICO")}
          className={`border px-3 py-1 rounded-full ${
            filtro === "MECANICO" ? "bg-yellow-500 text-white" : "bg-yellow-100 text-yellow-800"
          }`}
        >
          MECANICO
        </button>
      </div>


      <button
        onClick={() => setFiltro("TODOS")}
        className="w-full bg-green-500 hover:bg-green-600 text-white py-2 rounded mb-4 transition"
      >
        Ver todas as mtos no pátio
      </button>

      {zonas.map((zona) => (
        <div key={zona} className="mb-4">
          <p className="mb-2 text-sm">
            <strong>Zona {zona}</strong> - Toque em uma mto para detalhes
          </p>
          <div className="grid grid-cols-5 gap-2">
            {getMotosPorZona(zona).map(renderQuadrado)}
          </div>
        </div>
      ))}

      <footer className="fixed bottom-0 left-0 right-0 bg-white border-t p-2 flex justify-around">
        <div className="text-center text-xs text-gray-700">
          <div>🏠</div>
          <span>Home</span>
        </div>
        <div className="text-center text-xs text-gray-700">
          <div>📝</div>
          <span>Cadastro</span>
        </div>
        <div className="text-center text-xs text-gray-700">
          <div>🏍️</div>
          <span>Motos</span>
        </div>
        <div className="text-center text-green-600 text-xs font-bold">
          <div>🗺️</div>
          <span>Mapa</span>
        </div>
      </footer>
    </div>
  );
}
