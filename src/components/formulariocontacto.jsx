import { useState } from "react";

export default function FormularioContacto({ onAgregar }) {
  const [nombre, setNombre] = useState("");
  const [telefono, setTelefono] = useState("");
  const [correo, setCorreo] = useState("");
  const [etiqueta, setEtiqueta] = useState("Personal");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!nombre.trim() || !telefono.trim() || !correo.trim()) return;

    const nuevoContacto = {
      nombre,
      telefono,
      correo,
      etiqueta,
    };

    onAgregar(nuevoContacto);

    // Limpiar campos
    setNombre("");
    setTelefono("");
    setCorreo("");
    setEtiqueta("Personal");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Campo Nombre */}
      <div className="space-y-1.5">
        <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400">
          Nombre completo
        </label>
        <div className="relative group">
          <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-slate-500 group-focus-within:text-blue-500 transition-colors">
            👤
          </span>
          <input
            type="text"
            placeholder="Ej. Ana María Gómez"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            className="w-full pl-11 pr-4 py-3 bg-slate-950/60 border border-slate-800 rounded-xl text-sm text-slate-100 placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all shadow-inner"
            required
          />
        </div>
      </div>

      {/* Campo Teléfono */}
      <div className="space-y-1.5">
        <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400">
          Teléfono / Celular
        </label>
        <div className="relative group">
          <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-slate-500 group-focus-within:text-blue-500 transition-colors">
            📞
          </span>
          <input
            type="tel"
            placeholder="Ej. 300 123 4567"
            value={telefono}
            onChange={(e) => setTelefono(e.target.value)}
            className="w-full pl-11 pr-4 py-3 bg-slate-950/60 border border-slate-800 rounded-xl text-sm text-slate-100 placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all shadow-inner"
            required
          />
        </div>
      </div>

      {/* Campo Correo */}
      <div className="space-y-1.5">
        <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400">
          Correo electrónico
        </label>
        <div className="relative group">
          <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-slate-500 group-focus-within:text-blue-500 transition-colors">
            📧
          </span>
          <input
            type="email"
            placeholder="Ej. ana.gomez@correo.com"
            value={correo}
            onChange={(e) => setCorreo(e.target.value)}
            className="w-full pl-11 pr-4 py-3 bg-slate-950/60 border border-slate-800 rounded-xl text-sm text-slate-100 placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all shadow-inner"
            required
          />
        </div>
      </div>

      {/* Selector de Etiqueta */}
      <div className="space-y-1.5">
        <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400">
          Categoría / Etiqueta
        </label>
        <div className="relative group">
          <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-slate-500 group-focus-within:text-blue-500 transition-colors">
            🏷️
          </span>
          <select
            value={etiqueta}
            onChange={(e) => setEtiqueta(e.target.value)}
            className="w-full pl-11 pr-4 py-3 bg-slate-950/60 border border-slate-800 rounded-xl text-sm text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all shadow-inner cursor-pointer"
          >
            <option value="Personal" className="bg-slate-900 text-slate-200">Personal</option>
            <option value="Trabajo" className="bg-slate-900 text-slate-200">Trabajo</option>
            <option value="Aprendiz" className="bg-slate-900 text-slate-200">Aprendiz</option>
            <option value="Profesor" className="bg-slate-900 text-slate-200">Profesor</option>
            <option value="Familia" className="bg-slate-900 text-slate-200">Familia</option>
          </select>
        </div>
      </div>

      {/* Botón de Guardar */}
      <button
        type="submit"
        className="w-full mt-2 py-3.5 px-6 bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 text-white font-semibold text-sm rounded-xl shadow-lg shadow-blue-600/30 hover:shadow-blue-600/50 hover:from-blue-500 hover:to-indigo-500 active:scale-[0.98] transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer"
      >
        <span>✨</span> Guardar Contacto
      </button>
    </form>
  );
}