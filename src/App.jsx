import "./App.css";
import { useState } from "react";
import ContactoCard from "./components/contactocard";
import FormularioContacto from "./components/FormularioContacto";

function App() {
  const [buscar, setBuscar] = useState("");
  const [contactos, setContactos] = useState([
    {
      nombre: "Andrés Taborda",
      telefono: "3001234567",
      correo: "andres@gmail.com",
      etiqueta: "Estudiante",
    },
    {
      nombre: "María González",
      telefono: "3019876543",
      correo: "maria@gmail.com",
      etiqueta: "Amiga",
    },
    {
      nombre: "Carlos Ramírez",
      telefono: "3025559988",
      correo: "carlos@gmail.com",
      etiqueta: "Cliente",
    },
    {
      nombre: "Juan Pérez",
      telefono: "3201112233",
      correo: "juan@gmail.com",
      etiqueta: "Instructor",
    },
  ]);

  const agregarContacto = (nuevoContacto) => {
    setContactos([...contactos, nuevoContacto]);
  };

  const contactosFiltrados = contactos.filter((contacto) =>
    contacto.nombre.toLowerCase().includes(buscar.toLowerCase())
  );

  return (
    <div className="contenedor">

      <header className="encabezado">
        <h1>📒 Agenda ADSO</h1>
        <p className="subtitulo">
          Lista de contactos realizados con React
        </p>
      </header>

      <div className="barra-busqueda">
        <input
          type="text"
          placeholder="Buscar contacto..."
          value={buscar}
          onChange={(e) => setBuscar(e.target.value)}
          className="buscador"
        />
      </div>

      <div className="contenido">

        <aside className="lado-izquierdo">
          <FormularioContacto agregarContacto={agregarContacto} />
        </aside>

        <section className="lado-derecho">

          <h2>Directorio de Contactos</h2>

          {contactosFiltrados.length > 0 ? (
            contactosFiltrados.map((contacto, index) => (
              <ContactoCard
                key={index}
                contacto={contacto}
              />
            ))
          ) : (
            <p className="mensaje">
              No se encontraron contactos.
            </p>
          )}

        </section>

      </div>

    </div>
  );
}

export default App;