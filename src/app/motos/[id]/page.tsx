"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

interface Moto {
  id: number;
  modelo: string;
  status: string;
}

export default function DetalhesMoto() {
  const { id } = useParams();
  const router = useRouter();
  const [moto, setMoto] = useState<Moto | null>(null);
  const [modelo, setModelo] = useState("");
  const [status, setStatus] = useState("");

  useEffect(() => {
    fetch(`http://localhost:8080/api/motos/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setMoto(data);
        setModelo(data.modelo);
        setStatus(data.status);
      });
  }, [id]);

  const handleUpdate = async () => {
    await fetch(`http://localhost:8080/api/motos/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ modelo, status }),
    });
    alert("Moto atualizada com sucesso!");
  };

  const handleDelete = async () => {
    await fetch(`http://localhost:8080/api/motos/${id}`, {
      method: "DELETE",
    });
    router.push("/motos");
  };

  if (!moto) return <p>Carregando...</p>;

  return (
    <div className="max-w-md mx-auto bg-white p-4 rounded shadow">
      <h2 className="text-xl font-bold text-green-600 mb-4">Editar Moto</h2>

      <label className="block mb-2 font-semibold">Modelo</label>
      <input
        type="text"
        value={modelo}
        onChange={(e) => setModelo(e.target.value)}
        className="w-full border p-2 rounded mb-4"
      />

      <label className="block mb-2 font-semibold">Status</label>
      <select
        value={status}
        onChange={(e) => setStatus(e.target.value)}
        className="w-full border p-2 rounded mb-4"
      >
        <option value="PRONTA">Pronta para alugar</option>
        <option value="MECANICO">Falha Mecânica</option>
        <option value="BO">BO - Roubada</option>
      </select>

      <div className="flex gap-4">
        <button
          onClick={handleUpdate}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Atualizar
        </button>
        <button
          onClick={handleDelete}
          className="bg-red-600 text-white px-4 py-2 rounded"
        >
          Deletar
        </button>
      </div>
    </div>
  );
}
