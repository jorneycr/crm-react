import { useEffect, useState } from "react";
const Inicio = () => {
  const [clientes, setCliente] = useState([]);
  useEffect(() => {
    const obtenerClienteAPI = async () => {
      try {
        const url = "http://localhost:4000/clientes";

        const respuesta = await fetch(url);
        const resultado = await respuesta.json();
        setCliente(resultado);
        console.log(resultado);
      } catch (error) {
        console.log(error);
      }
    };
    obtenerClienteAPI();
  }, []);

  return (
    <div>
      <p>Inicio</p>
    </div>
  );
};

export default Inicio;
