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
  const [error, setError] = useState(""); 
  const [mensajeExito, setMensajeExito] = useState(""); 
  const [cargando, setCargando] = useState(false);

  // Estados de la paginación
  const [paginaActual, setPaginaActual] = useState(1);
  const [contactosPorPagina] = useState(3);

  // GET – Cargar contactos desde la API
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

  // POST – Agregar un nuevo contacto
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

      setMensajeExito("¡Contacto guardado correctamente!");
      setTimeout(() => setMensajeExito(""), 4000);
    } catch (err) {
      console.error("Error al agregar contacto:", err);
      setError("No se pudo guardar el contacto en el servidor.");
      throw err;
    }
  };

  // DELETE – Eliminar un contacto por su ID
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

  // Filtrar contactos
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

  // Ordenar alfabéticamente
  const contactosOrdenados = [...contactosFiltrados].sort((a, b) => {
    const nombreA = (a.nombre || "").toLowerCase();
    const nombreB = (b.nombre || "").toLowerCase();

    if (nombreA < nombreB) return ordenAsc ? -1 : 1;
    if (nombreA > nombreB) return ordenAsc ? 1 : -1;
    return 0;
  });

  // Lógica de Paginación
  const totalPaginas = Math.ceil(contactosOrdenados.length / contactosPorPagina);
  const indiceInicio = (paginaActual - 1) * contactosPorPagina;
  const indiceFin = indiceInicio + contactosPorPagina;
  const contactosPaginados = contactosOrdenados.slice(indiceInicio, indiceFin);

  const cambiarPagina = (nuevaPagina) => {
    if (nuevaPagina >= 1 && nuevaPagina <= totalPaginas) {
      setPaginaActual(nuevaPagina);
    }
  };

  return (
    <main className="app-container" style={{ maxWidth: "1200px", margin: "0 auto", padding: "20px" }}>
      <h1 className="app-title" style={{ gridColumn: "1 / -1", marginBottom: "20px" }}>Agenda ADSO v8</h1>

      {/* Banners globales de alerta */}
      {error && (
        <div style={{ gridColumn: "1 / -1", backgroundColor: "#fee2e2", border: "1px solid #f87171", borderRadius: "12px", padding: "12px 16px", marginBottom: "20px" }}>
          <p style={{ color: "#b91c1c", fontSize: "14px", fontWeight: "500", margin: 0 }}>{error}</p>
        </div>
      )}

      {mensajeExito && (
        <div style={{ gridColumn: "1 / -1", backgroundColor: "#d1fae5", border: "1px solid #34d399", borderRadius: "12px", padding: "12px 16px", marginBottom: "20px" }}>
          <p style={{ color: "#065f46", fontSize: "14px", fontWeight: "500", margin: 0 }}>{mensajeExito}</p>
        </div>
      )}

      {/* Contenedor principal en dos columnas */}
      <div style={{ display: "grid", gridTemplateColumns: "380px 1fr", gap: "30px", alignItems: "start" }}>
        
        {/* Columna Izquierda: Formulario con fondo más visible y elegante */}
        <aside style={{ background: "rgba(30, 41, 59, 0.7)", padding: "24px", borderRadius: "14px", border: "1px solid rgba(255, 255, 255, 0.15)", boxShadow: "0 4px 20px rgba(0,0,0,0.3)" }}>
          <h3 style={{ marginTop: 0, marginBottom: "15px", fontSize: "18px", color: "#f8fafc" }}>Nuevo Contacto</h3>
          <FormularioContacto onAgregar={agregarContacto} />
        </aside>

        {/* Columna Derecha: Búsqueda, Controles, Tarjetas y Paginación */}
        <section style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          
          {/* Barra de búsqueda con fondo claro y texto visible */}
          <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
            <input
              type="text"
              placeholder="Buscar por nombre, correo o etiqueta..."
              value={buscar}
              onChange={(e) => {
                setBuscar(e.target.value);
                setPaginaActual(1);
              }}
              style={{ 
                flex: 1, 
                padding: "12px 16px", 
                borderRadius: "10px", 
                border: "1px solid rgba(255, 255, 255, 0.3)", 
                background: "rgba(30, 41, 59, 0.8)", 
                color: "#ffffff",
                fontSize: "15px",
                outline: "none"
              }}
            />
            <button
              type="button"
              onClick={() => setOrdenAsc((prev) => !prev)}
              style={{ padding: "12px 18px", borderRadius: "10px", border: "1px solid rgba(255, 255, 255, 0.2)", cursor: "pointer", fontWeight: "500", background: "rgba(30, 41, 59, 0.9)", color: "#ffffff", whiteSpace: "nowrap" }}
            >
              {ordenAsc ? "🔤 Ordenar Z-A" : "🔤 Ordenar A-Z"}
            </button>
          </div>

          {/* Lista de contactos */}
          <div className="lista-contactos" style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
            {cargando && <p style={{ color: "#94a3b8" }}>Cargando contactos...</p>}
            {!cargando && contactosOrdenados.length === 0 && (
              <p style={{ color: "#94a3b8", textAlign: "center", padding: "20px" }}>No se encontraron contactos.</p>
            )}
            
            {contactosPaginados.map((c) => (
              <ContactoCard
                key={c.id}
                {...c}
                onEliminar={() => eliminarContacto(c.id)}
              />
            ))}
          </div>

          {/* Controles de Paginación */}
          {totalPaginas > 1 && (
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "10px", marginTop: "10px" }}>
              <button
                onClick={() => cambiarPagina(paginaActual - 1)}
                disabled={paginaActual === 1}
                style={{ padding: "8px 14px", borderRadius: "8px", border: "1px solid rgba(255, 255, 255, 0.2)", cursor: paginaActual === 1 ? "not-allowed" : "pointer", opacity: paginaActual === 1 ? 0.4 : 1, background: "rgba(30, 41, 59, 0.6)", color: "#fff" }}
              >
                ← Anterior
              </button>
              
              {Array.from({ length: totalPaginas }, (_, index) => {
                const numeroPagina = index + 1;
                const esActiva = numeroPagina === paginaActual;
                return (
                  <button
                    key={numeroPagina}
                    onClick={() => cambiarPagina(numeroPagina)}
                    style={{
                      width: "36px",
                      height: "36px",
                      borderRadius: "8px",
                      border: "1px solid rgba(255, 255, 255, 0.2)",
                      background: esActiva ? "#7c3aed" : "rgba(30, 41, 59, 0.6)",
                      color: "#fff",
                      cursor: "pointer",
                      fontWeight: "600"
                    }}
                  >
                    {numeroPagina}
                  </button>
                );
              })}

              <button
                onClick={() => cambiarPagina(paginaActual + 1)}
                disabled={paginaActual === totalPaginas}
                style={{ padding: "8px 14px", borderRadius: "8px", border: "1px solid rgba(255, 255, 255, 0.2)", cursor: paginaActual === totalPaginas ? "not-allowed" : "pointer", opacity: paginaActual === totalPaginas ? 0.4 : 1, background: "rgba(30, 41, 59, 0.6)", color: "#fff" }}
              >
                Siguiente →
              </button>
            </div>
          )}

        </section>

      </div>
    </main>
  );
}