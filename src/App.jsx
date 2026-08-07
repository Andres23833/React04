import { useState, useEffect } from "react";
import ContactoCard from "./components/contactocard";
import FormularioContacto from "./components/FormularioContacto";

function App() {
  const [buscar, setBuscar] = useState("");
  const [contactoAEliminar, setContactoAEliminar] = useState(null);

  // Carga inicial desde LocalStorage
  const [contactos, setContactos] = useState(() => {
    const contactosGuardados = localStorage.getItem("contactos");
    return contactosGuardados ? JSON.parse(contactosGuardados) : [];
  });

  // Persistencia automática
  useEffect(() => {
    localStorage.setItem("contactos", JSON.stringify(contactos));
  }, [contactos]);

  // Función para agregar contacto
  const agregarContacto = (nuevoContacto) => {
    setContactos((prev) => [...prev, nuevoContacto]);
  };

  // Solicitar eliminación (abre el modal)
  const solicitarEliminar = (contacto) => {
    setContactoAEliminar(contacto);
  };

  // Confirmar eliminación
  const confirmarEliminar = () => {
    if (contactoAEliminar) {
      setContactos((prev) => prev.filter((c) => c.correo !== contactoAEliminar.correo));
      setContactoAEliminar(null);
    }
  };

  const contactosFiltrados = contactos.filter((contacto) =>
    contacto.nombre.toLowerCase().includes(buscar.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-blue-500 selection:text-white">
      
      {/* 1. HEADER / ENCABEZADO */}
      <header className="border-b border-slate-800 bg-slate-900/60 backdrop-blur-md sticky top-0 z-30 px-6 py-4 shadow-sm">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-500 flex items-center justify-center shadow-lg shadow-blue-500/30">
              <span className="text-xl">📒</span>
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tight text-white">Agenda ADSO</h1>
              <p className="text-xs text-slate-400">Sistema Profesional de Gestión de Contactos</p>
            </div>
          </div>

          {/* BARRA DE BÚSQUEDA SUPERIOR */}
          <div className="relative w-full sm:w-80">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-slate-400">
              🔍
            </span>
            <input
              type="text"
              placeholder="Buscar por nombre..."
              value={buscar}
              onChange={(e) => setBuscar(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-slate-800/80 border border-slate-700/80 rounded-xl text-sm text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all shadow-inner"
            />
          </div>
        </div>
      </header>

      {/* 2. CONTENIDO PRINCIPAL (Diseño asimétrico: Formulario grande a la izquierda) */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Columna Izquierda: Formulario (Ocupa 5 de 12 columnas para que sea más amplio y cómodo) */}
          <section className="lg:col-span-5 bg-slate-900/80 border border-slate-800/80 rounded-2xl p-6 sm:p-8 shadow-xl backdrop-blur-sm sticky top-24">
            <div className="mb-6 pb-4 border-b border-slate-800">
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <span>✨</span> Nuevo Contacto
              </h2>
              <p className="text-xs text-slate-400 mt-1">
                Completa los datos del formulario para guardarlo automáticamente en el sistema.
              </p>
            </div>
            <FormularioContacto agregarContacto={agregarContacto} />
          </section>

          {/* Columna Derecha: Directorio / Tarjetas (Ocupa 7 de 12 columnas) */}
          <section className="lg:col-span-7 flex flex-col gap-6">
            <div className="flex justify-between items-center bg-slate-900/40 p-4 rounded-xl border border-slate-800/60">
              <h2 className="text-base font-semibold text-slate-200">Directorio Registrado</h2>
              <span className="px-3 py-1 bg-blue-500/10 text-blue-400 border border-blue-500/20 text-xs font-semibold rounded-full">
                {contactosFiltrados.length} {contactosFiltrados.length === 1 ? 'contacto' : 'contactos'}
              </span>
            </div>

            {/* Listado o Estado Vacío */}
            {contactosFiltrados.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {contactosFiltrados.map((contacto) => (
                  <ContactoCard
                    key={contacto.correo}
                    contacto={contacto}
                    onEliminar={solicitarEliminar}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-16 bg-slate-900/30 border border-dashed border-slate-800 rounded-2xl p-8 flex flex-col items-center justify-center">
                <div className="w-16 h-16 bg-slate-800/60 rounded-2xl flex items-center justify-center text-2xl mb-3 text-slate-500">
                  📭
                </div>
                <h3 className="text-slate-300 font-medium text-sm">No se encontraron contactos</h3>
                <p className="text-slate-500 text-xs mt-1 max-w-xs">
                  {buscar ? "No hay coincidencias con tu búsqueda actual." : "Agrega tu primer contacto usando el formulario de la izquierda."}
                </p>
              </div>
            )}
          </section>

        </div>
      </main>

      {/* 3. MODAL DE ELIMINACIÓN ELEGANTE (Tailwind) */}
      {contactoAEliminar && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 max-w-md w-full shadow-2xl text-center transform transition-all scale-100">
            <div className="w-14 h-14 bg-red-500/10 border border-red-500/20 rounded-2xl flex items-center justify-center text-2xl mx-auto mb-4 text-red-400">
              ⚠️
            </div>
            <h3 className="text-lg font-bold text-white mb-2">¿Estás seguro de eliminar?</h3>
            <p className="text-sm text-slate-400 mb-6 leading-relaxed">
              Vas a eliminar los datos de <span className="text-blue-400 font-medium">{contactoAEliminar.nombre}</span>. Esta acción no se puede deshacer.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setContactoAEliminar(null)}
                className="flex-1 py-2.5 px-4 rounded-xl border border-slate-700 bg-slate-800 text-slate-200 text-sm font-semibold hover:bg-slate-700 transition-colors cursor-pointer"
              >
                Cancelar
              </button>
              <button
                onClick={confirmarEliminar}
                className="flex-1 py-2.5 px-4 rounded-xl bg-gradient-to-r from-red-600 to-rose-600 text-white text-sm font-semibold hover:from-red-500 hover:to-rose-500 shadow-lg shadow-red-600/30 transition-all cursor-pointer"
              >
                Sí, eliminar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* FOOTER */}
      <footer className="border-t border-slate-800/80 bg-slate-900/40 py-4 text-center text-xs text-slate-500 mt-auto">
        Agenda ADSO • Desarrollado con ReactJS y TailwindCSS
      </footer>
    </div>
  );
}

export default App;