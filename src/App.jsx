import "./App.css";
import { useState, useEffect } from "react";
import ContactoCard from "./components/contactocard";
import FormularioContacto from "./components/FormularioContacto";

function App() {
  const [buscar, setBuscar] = useState("");

  // 1. Carga inicial desde LocalStorage
  const [contactos, setContactos] = useState(() => {
    const contactosGuardados = localStorage.getItem("contactos");
    return contactosGuardados ? JSON.parse(contactosGuardados) : [];
  });

  // 2. Persistencia automática cada vez que cambia el estado
  useEffect(() => {
    localStorage.setItem("contactos", JSON.stringify(contactos));
  }, [contactos]);

  // Función para agregar contacto
  const agregarContacto = (nuevoContacto) => {
    setContactos((prev) => [...prev, nuevoContacto]);
  };

  // 3. Función para eliminar contacto por correo
  const eliminarContacto = (correo) => {
    setContactos((prev) => prev.filter((c) => c.correo !== correo));
  };

  const contactosFiltrados = contactos.filter((contacto) =>
    contacto.nombre.toLowerCase().includes(buscar.toLowerCase())
  );

  return (
    <div className="contenedor">
      <header className="encabezado">
        <h1>📒 Agenda ADSO</h1>
        <p className="subtitulo">
          Lista de contactos realizados con React y LocalStorage
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
            contactosFiltrados.map((contacto) => (
              <ContactoCard
                key={contacto.correo}
                contacto={contacto}
                onEliminar={eliminarContacto}
              />
            ))
          ) : (
            <p className="mensaje">No se encontraron contactos.</p>
          )}
        </section>
      </div>
    </div>
  );
}

export default App;