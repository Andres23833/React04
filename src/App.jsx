import { useState, useEffect } from "react";
import FormularioContacto from "./components/FormularioContacto";
import ContactoCard from "./components/ContactoCard";
import "./App.css";

// URL base de la API para los contactos
const API = "http://localhost:3002/contactos";

export default function App() {
  const [contactos, setContactos] = useState([]);
  const [buscar, setBuscar] = useState("");
  const [ordenAsc, setOrdenAsc] = useState(true); // true = A-Z, false = Z-A
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

  // Filtrar contactos según el texto de búsqueda (nombre, correo o etiqueta de forma segura)
  const contactosFiltrados = contactos.filter((c) => {
    const termino = buscar.toLowerCase();
    const nombre = (c.nombre || "").toLowerCase();
    const correo = (c.correo || "").toLowerCase();
    const etiqueta = (c.etiqueta || "").toLowerCase();

    return (
      nombre.includes(termino) ||
      correo.includes(termino) ||
      etiqueta.includes(termino)
    );
  });

  // Ordenar alfabéticamente (A-Z / Z-A) sobre una copia del arreglo filtrado
  const contactosOrdenados = [...contactosFiltrados].sort((a, b) => {
    const nombreA = (a.nombre || "").toLowerCase();
    const nombreB = (b.nombre || "").toLowerCase();

    if (nombreA < nombreB) return ordenAsc ? -1 : 1;
    if (nombreA > nombreB) return ordenAsc ? 1 : -1;
    return 0;
  });

  return (
    <main className="app-container">
      <h1 className="app-title">Agenda ADSO v8</h1>

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

      {/* Barra de búsqueda y Botón de Ordenamiento */}
      <div className="flex flex-col md:flex-row md:items-center gap-3" style={{ marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="Buscar por nombre, correo o etiqueta..."
          value={buscar}
          onChange={(e) => setBuscar(e.target.value)}
          style={{ flex: 1, padding: "10px", borderRadius: "8px", border: "1px solid var(--borde)" }}
        />
        <button
          type="button"
          onClick={() => setOrdenAsc((prev) => !prev)}
          style={{ padding: "10px 16px", borderRadius: "8px", border: "1px solid var(--borde)", cursor: "pointer", fontWeight: "500", background: "rgba(255,255,255,0.05)" }}
        >
          {ordenAsc ? "🔤 Ordenar Z-A" : "🔤 Ordenar A-Z"}
        </button>
      </div>

      {/* Formulario para agregar */}
      <FormularioContacto onAgregar={agregarContacto} />

      {/* Lista de tarjetas filtradas y ordenadas */}
      <div className="lista-contactos" style={{ marginTop: "20px" }}>
        {cargando && <p style={{ color: "#94a3b8" }}>Cargando contactos...</p>}
        {!cargando && contactosOrdenados.length === 0 && (
          <p style={{ color: "#94a3b8", textAlign: "center", padding: "20px" }}>No se encontraron contactos.</p>
        )}
        {contactosOrdenados.map((c) => (
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