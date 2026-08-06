// components/FormularioContacto.jsx
import { useState } from "react";

function FormularioContacto({ agregarContacto }) {
  const [nombre, setNombre] = useState("");
  const [telefono, setTelefono] = useState("");
  const [correo, setCorreo] = useState("");
  const [etiqueta, setEtiqueta] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    agregarContacto({ nombre, telefono, correo, etiqueta });
    setNombre("");
    setTelefono("");
    setCorreo("");
    setEtiqueta("");
  };

  return (
    <form onSubmit={handleSubmit} className="formulario-contacto">
      <h2>Agregar Contacto</h2>
      <input
        type="text"
        placeholder="Nombre"
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Teléfono"
        value={telefono}
        onChange={(e) => setTelefono(e.target.value)}
        required
      />
      <input
        type="email"
        placeholder="Correo Electrónico"
        value={correo}
        onChange={(e) => setCorreo(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Etiqueta"
        value={etiqueta}
        onChange={(e) => setEtiqueta(e.target.value)}
      />
      <button type="submit">Agregar contacto</button>
    </form>
  );
}

export default FormularioContacto;
