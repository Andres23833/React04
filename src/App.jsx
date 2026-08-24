import { useState, useEffect } from "react";
import FormularioContacto from "./components/FormularioContacto";
import ContactoCard from "./components/ContactoCard";
import "./App.css";

// URL base de la API para los contactos
const API = "http://localhost:3002/contactos";

export default function App() {
  const [contactos, setContactos] = useState([]);
  const [buscar, setBuscar] = useState("");
  const [error, setError] = useState(""); // Banner de error global (API)
  const [mensajeExito, setMensajeExito] = useState(""); // Mini reto: mensaje verde de éxito
  const [cargando, setCargando] = useState(false);

  // GET – Cargar contactos desde la API con manejo de errores amigable
  const cargarContactos = async () => {
    try {
      setCargando(true);
      setError("");
      const res = await fetch(API);
      if (!res.ok) throw new Error("Error en el servidor");
      const data = await res.json();
      setContactos(data);
    } catch (err) {
      console.error("Error al cargar contactos:", err);
      setError("No se pudieron cargar los contactos. Verifica que el servidor esté encendido e intenta de nuevo.");
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    cargarContactos();
  }, []);

  // POST – Agregar un nuevo contacto a la API
  const agregarContacto = async (nuevoContacto) => {
    try {
      setError("");
      setMensajeExito("");

      const res = await fetch(API, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(nuevoContacto),
      });

      if (!res.ok) throw new Error("No se pudo guardar el contacto");

      const contactoCreado = await res.json();
      setContactos((prev) => [...prev, contactoCreado]);

      // Mini reto: Mensaje de éxito verde
      setMensajeExito("¡Contacto guardado correctamente!");
      setTimeout(() => setMensajeExito(""), 4000); // Se oculta a los 4 segundos
    } catch (err) {
      console.error("Error al agregar contacto:", err);
      setError("No se pudo guardar el contacto en el servidor.");
      throw err;
    }
  };

  // DELETE – Eliminar un contacto por su ID en la API
  const eliminarContacto = (id) => {
    fetch(`${API}/${id}`, { method: "DELETE" })
      .then((res) => {
        if (!res.ok) throw new Error("No se pudo eliminar");
        setContactos((prev) => prev.filter((c) => c.id !== id));
      })
      .catch((err) => {
        console.error("Error al eliminar contacto:", err);
        setError("No se pudo eliminar el contacto.");
      });
  };

  // Filtrar contactos según el texto de búsqueda de forma segura
  const contactosFiltrados = contactos.filter((c) =>
    c.nombre?.toLowerCase().includes(buscar.toLowerCase())
  );

  return (
    <main className="app-container">
      <h1 className="app-title">Agenda ADSO v6</h1>

      {/* Banner de error global (Rojo) */}
      {error && (
        <div style={{ backgroundColor: "#fee2e2", border: "1px solid #f87171", borderRadius: "12px", padding: "12px 16px", marginBottom: "20px" }}>
          <p style={{ color: "#b91c1c", fontSize: "14px", fontWeight: "500", margin: 0 }}>{error}</p>
        </div>
      )}

      {/* Mini reto: Banner de éxito (Verde) */}
      {mensajeExito && (
        <div style={{ backgroundColor: "#d1fae5", border: "1px solid #34d399", borderRadius: "12px", padding: "12px 16px", marginBottom: "20px" }}>
          <p style={{ color: "#065f46", fontSize: "14px", fontWeight: "500", margin: 0 }}>{mensajeExito}</p>
        </div>
      )}

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
        {cargando && <p style={{ color: "#94a3b8" }}>Cargando contactos...</p>}
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