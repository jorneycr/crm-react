import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const VerCliente = () => {
  const [cliente, setCliente] = useState({});
  const { id } = useParams();

  useEffect(() => {
    const obtenerClienteApi = async () => {
      try {
        const url = `http://localhost:4000/clientes/${id}`;
        const respuesta = await fetch(url);
        const resultado = await respuesta.json();
        setCliente(resultado);
      } catch (error) {
        console.log(error);
      }
    };
    obtenerClienteApi();
  }, []);

  return (
    <div>
      <h1 className="font-black text-4xl text-blue-900">Ver Cliente</h1>
      <p className="mt-3">Ver informacion del cliente</p>
      <p className="text-4xl text-gray-500">
        <span className=" text-gray-800 uppercase font-bold">Cliente:</span>
        {cliente.nombre}
      </p>
      <p className="text-2xl text-gray-500 mt-10">
        <span className=" text-gray-800 uppercase font-bold">Email:</span>
        {cliente.email}
      </p>
      {cliente.telefono && (
        <p className="text-2xl text-gray-500 mt-4">
          <span className=" text-gray-800 uppercase font-bold">Telefono:</span>
          {cliente.telefono}
        </p>
      )}
      <p className="text-2xl text-gray-500 mt-4">
        <span className=" text-gray-800 uppercase font-bold">Empresa:</span>
        {cliente.empresa}
      </p>
      {cliente.notas && (
        <p className="text-2xl text-gray-500 mt-4">
          <span className=" text-gray-800 uppercase font-bold">Notas:</span>
          {cliente.notas}
        </p>
      )}
    </div>
  );
};

export default VerCliente;
