"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

import popImg from "../assets/pop.webp";
import sportImg from "../assets/sport-2.webp";
import eImg from "../assets/e-1.webp";

const modelos = [
  { nome: "MOTO POP", img: popImg },
  { nome: "MOTO SPORT", img: sportImg },
  { nome: "MOTO E", img: eImg },
];

export default function CadastrarPage() {
  const [modelo, setModelo] = useState("MOTO POP");
  const [status, setStatus] = useState("PRONTA");
  const [placa, setPlaca] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    await fetch("http://localhost:8080/api/motos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ modelo, status, placa }),
    });

    router.push("/motos");
  };

  const handlePlacaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPlaca(e.target.value.toUpperCase());
  };

  return (
    <section className="max-w-md mx-auto mt-6 p-4 bg-white shadow-lg rounded">
      <h2 className="text-xl font-bold text-center text-green-700 mb-4">
        Cadastro Moto
      </h2>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {/* Placa */}
        <label className="text-sm font-medium text-gray-700">Placa</label>
        <input
          type="text"
          placeholder="ABC1234 ou ABC1D23"
          value={placa}
          onChange={handlePlacaChange}
          className="border p-2 rounded uppercase text-gray-800"
          maxLength={7}
          pattern="[A-Z]{3}[0-9][0-9A-Z][0-9]{2}"
          title="Formato válido: ABC1234 ou ABC1D23"
          required
        />

        {/* Modelo */}
        <label className="text-sm font-medium text-gray-700">Modelo</label>
        <div className="grid grid-cols-3 gap-2">
          {modelos.map((item) => (
            <button
              key={item.nome}
              type="button"
              className={`border rounded p-2 flex flex-col items-center ${
                modelo === item.nome
                  ? "border-green-500 bg-green-50"
                  : "border-gray-300"
              }`}
              onClick={() => setModelo(item.nome)}
            >
              <Image src={item.img} alt={item.nome} width={60} height={60} />
              <span className="text-xs mt-1 text-gray-700 font-medium">
                {item.nome}
              </span>
            </button>
          ))}
        </div>

        {/* Status */}
        <label className="text-sm font-medium text-gray-700">Status</label>
        <div className="flex justify-between gap-2">
          <button
            type="button"
            onClick={() => setStatus("BO")}
            className={`flex-1 p-2 rounded font-bold text-white ${
              status === "BO" ? "bg-red-600" : "bg-red-400"
            }`}
          >
            BO
          </button>
          <button
            type="button"
            onClick={() => setStatus("MECANICO")}
            className={`flex-1 p-2 rounded font-bold text-white ${
              status === "MECANICO" ? "bg-yellow-600" : "bg-yellow-400"
            }`}
          >
            MECÂNICO
          </button>
          <button
            type="button"
            onClick={() => setStatus("PRONTA")}
            className={`flex-1 p-2 rounded font-bold text-white ${
              status === "PRONTA" ? "bg-green-600" : "bg-green-400"
            }`}
          >
            PRONTA
          </button>
        </div>

        {/* Botão */}
        <button
          type="submit"
          className="bg-green-700 text-white p-2 rounded hover:bg-green-800 transition font-bold"
        >
          Salvar
        </button>
      </form>
    </section>
  );
}
