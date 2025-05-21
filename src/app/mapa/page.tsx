"use client";
import { useEffect, useState } from "react";

interface Moto {
  id: number;
  modelo: string;
  status: string;
}

export default function MapaPage() {
  const [motos, setMotos] = useState<Moto[]>([]);

  useEffect(() => {
    fetch("http://localhost:8080/api/motos")
      .then((res) => res.json())
      .then(setMotos);
  }, []);

  const zonas = {
    PRONTA: motos.filter((m) => m.status === "PRONTA"),
    MECANICO: motos.filter((m) => m.status === "MECANICO"),
    BO: motos.filter((m) => m.status === "BO"),
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Mapa por Zonas</h2>
      {Object.entries(zonas).map(([status, lista]) => (
        <div key={status} className="mb-6">
          <h3 className="font-semibold text-lg mb-2">{status}</h3>
          <ul className="list-disc ml-6">
            {lista.map((moto) => (
              <li key={moto.id}>{moto.modelo}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
