"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface Moto {
  id: number;
  modelo: string;
  status: string;
  placa: string;
}

export default function ListaMotos() {
  const [motos, setMotos] = useState<Moto[]>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchMotos = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/motos`);
        if (!res.ok) throw new Error("Erro ao buscar motos");
        const data = await res.json();
        setMotos(data.content); 
      } catch (error) {
        console.error("Erro ao carregar motos:", error);
      }
    };

    fetchMotos();
  }, []);

  const handleClick = (id: number) => {
    router.push(`/motos/${id}`);
  };

  return (
    <section className="max-w-2xl mx-auto mt-6 p-4 bg-white shadow rounded">
      <h2 className="text-xl font-bold text-green-700 mb-4 text-center">
        Lista de Motos
      </h2>

      {motos.length === 0 ? (
        <p className="text-gray-600 text-center">Nenhuma moto cadastrada.</p>
      ) : (
        <ul className="flex flex-col gap-3">
          {motos.map((moto) => (
            <li
              key={moto.id}
              onClick={() => handleClick(moto.id)}
              className="p-3 rounded border hover:bg-gray-100 cursor-pointer"
            >
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">
                    {moto.modelo}
                  </h3>
                  <p className="text-sm text-gray-600">Placa: {moto.placa}</p>
                </div>
                <span
                  className={`text-sm font-bold px-3 py-1 rounded ${
                    moto.status === "PRONTA"
                      ? "bg-green-200 text-green-800"
                      : moto.status === "BO"
                      ? "bg-red-200 text-red-800"
                      : "bg-yellow-200 text-yellow-800"
                  }`}
                >
                  {moto.status}
                </span>
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
