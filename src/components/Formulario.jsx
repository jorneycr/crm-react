import React from "react";
import { Formik, Form, Field } from "formik";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import Alerta from "./Alerta";
import Spinner from "./Spinner";

const Formulario = ({ cliente, cargando }) => {
  const navigate = useNavigate();

  const nuevoClienteShema = Yup.object().shape({
    nombre: Yup.string()
      .min(3, "Nombre es muy corto")
      .max(20, "Nombre es muy largo")
      .required("Nombre del Cliente Requerido"),
    empresa: Yup.string().required("Nombre de la empresa Requerido"),
    email: Yup.string()
      .email("Email no es valido")
      .required("Email es Requerido"),
    telefono: Yup.number()
      .integer("Numero debe ser entero")
      .positive("Numero debe ser positivo")
      .typeError("Numero no valido"),
  });

  const handleSubmit = async (values) => {
    try {
      const url = "http://localhost:4000/clientes";
      const respuesta = await fetch(url, {
        method: "POST",
        body: JSON.stringify(values),
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log(respuesta);
      const resultado = await respuesta.json();
      console.log(resultado);
      navigate("/clientes");
    } catch (error) {
      console.log(error);
    }
  };

  return cargando ? (
    <Spinner />
  ) : (
    <div className="bg-white mt-10 px-5 py-5 rounded-md shadow-md md:w-3/4 mx-auto">
      <h1 className="text-gray-600 font-bold text-xl uppercase  text-center">
        {cliente?.nombre ? "Editar Cliente" : "Agregar Cliente"}
      </h1>
      <Formik
        initialValues={{
          nombre: cliente?.nombre ?? "",
          empresa: cliente?.empresa ?? "",
          email: cliente?.email ?? "",
          telefono: cliente?.telefono ?? "",
          notas: cliente?.notas ?? "",
        }}
        enableReinitialize={true}
        validationSchema={nuevoClienteShema}
        onSubmit={async (values, { resetForm }) => {
          await handleSubmit(values);
          resetForm();
        }}
      >
        {({ errors, touched }) => {
          return (
            <Form className="mt-10">
              <div className="mb-4">
                <label htmlFor="nombre" className="text-gray-800">
                  Nombre
                </label>
                <Field
                  type="text"
                  id="nombre"
                  className="mt-2 block w-full p-3 bg-gray-50"
                  placeholder="Nombre del Cliente"
                  name="nombre"
                />
                {errors.nombre && touched.nombre ? (
                  <Alerta>{errors.nombre}</Alerta>
                ) : null}
              </div>
              <div className="mb-4">
                <label htmlFor="empresa" className="text-gray-800">
                  Empresa
                </label>
                <Field
                  type="text"
                  id="empresa"
                  className="mt-2 block w-full p-3 bg-gray-50"
                  placeholder="Empresa del Cliente"
                  name="empresa"
                />
                {errors.empresa && touched.empresa ? (
                  <Alerta>{errors.empresa}</Alerta>
                ) : null}
              </div>
              <div className="mb-4">
                <label htmlFor="email" className="text-gray-800">
                  Email
                </label>
                <Field
                  type="email"
                  id="email"
                  className="mt-2 block w-full p-3 bg-gray-50"
                  placeholder="Email del Cliente"
                  name="email"
                />
                {errors.email && touched.email ? (
                  <Alerta>{errors.email}</Alerta>
                ) : null}
              </div>
              <div className="mb-4">
                <label htmlFor="telefono" className="text-gray-800">
                  Telefono
                </label>
                <Field
                  type="tel"
                  id="telefono"
                  className="mt-2 block w-full p-3 bg-gray-50"
                  placeholder="Telefono del Cliente"
                  name="telefono"
                />
                {errors.telefono && touched.telefono ? (
                  <Alerta>{errors.telefono}</Alerta>
                ) : null}
              </div>
              <div className="mb-4">
                <label htmlFor="notas" className="text-gray-800">
                  Notas
                </label>
                <Field
                  as="textarea"
                  type="text"
                  id="notas"
                  className="mt-2 block w-full p-3 bg-gray-50 h-40"
                  placeholder="Notas del Cliente"
                  name="notas"
                />
              </div>
              <input
                type="submit"
                value={cliente?.nombre ? "Editar Cliente" : "Agregar Cliente"}
                className="mt-5 w-full bg-blue-800 text-white p-3 uppercase font-bold text-lg"
              />
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};
Formulario.defaultProps = {
  cliente: {},
  cargando: false,
};
export default Formulario;
