import { useState, useEffect } from "react";
import FormularioContacto from "./components/FormularioContacto";
import ContactoCard from "./components/ContactoCard";
import "./App.css";

// URL base de la API para los contactos (usando el puerto 3002 verificado)
const API = "http://localhost:3002/contactos";

export default function App() {
  const [contactos, setContactos] = useState([]);
  const [buscar, setBuscar] = useState("");

  // GET – Cargar contactos desde la API cuando el componente se monta
  useEffect(() => {
    fetch(API)
      .then((res) => res.json())
      .then((data) => setContactos(data))
      .catch((err) => console.error("Error al cargar contactos:", err));
  }, []);

  // POST – Agregar un nuevo contacto a la API
  const agregarContacto = (nuevoContacto) => {
    fetch(API, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(nuevoContacto),
    })
      .then((res) => res.json())
      .then((contactoCreado) => {
        setContactos((prev) => [...prev, contactoCreado]);
      })
      .catch((err) => console.error("Error al agregar contacto:", err));
  };

  // DELETE – Eliminar un contacto por su ID en la API
  const eliminarContacto = (id) => {
    fetch(`${API}/${id}`, { method: "DELETE" })
      .then(() => {
        setContactos((prev) => prev.filter((c) => c.id !== id));
      })
      .catch((err) => console.error("Error al eliminar contacto:", err));
  };

  // Filtrar contactos según el texto de búsqueda de forma segura
  const contactosFiltrados = contactos.filter((c) =>
    c.nombre?.toLowerCase().includes(buscar.toLowerCase())
  );

  return (
    <main className="app-container">
      <h1 className="app-title">Agenda ADSO - API REST</h1>

      {/* Barra de búsqueda */}
      <div className="campo-busqueda" style={{ marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="Buscar contacto por nombre..."
          value={buscar}
          onChange={(e) => setBuscar(e.target.value)}
          style={{ width: "100%", padding: "10px", borderRadius: "8px", border: "1px solid var(--borde)" }}
        />
      </div>

      {/* Formulario para agregar */}
      <FormularioContacto onAgregar={agregarContacto} />

      {/* Lista de tarjetas filtradas */}
      <div className="lista-contactos" style={{ marginTop: "20px" }}>
        {contactosFiltrados.map((c) => (
          <ContactoCard
            key={c.id}
            {...c}
            onEliminar={() => eliminarContacto(c.id)}
          />
        ))}
      </div>
    </main>
  );
}