import { useState } from "react";

export default function FormularioContacto({ onAgregar }) {
  // Estados para los valores de cada campo
  const [form, setForm] = useState({
    nombre: "",
    telefono: "",
    correo: "",
    etiqueta: "Personal",
  });

  // Estado de errores por campo
  const [errores, setErrores] = useState({
    nombre: "",
    telefono: "",
    correo: "",
  });

  // Estado "enviando" para controlar el botón mientras se guarda
  const [enviando, setEnviando] = useState(false);

  // Manejador genérico para actualizar los inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  // Función de validación con .trim(), formato de correo y mini reto de teléfono
  const validarFormulario = () => {
    const nuevosErrores = { nombre: "", telefono: "", correo: "" };

    if (!form.nombre.trim()) {
      nuevosErrores.nombre = "El nombre es obligatorio.";
    }

    if (!form.telefono.trim()) {
      nuevosErrores.telefono = "El teléfono es obligatorio.";
    } else if (form.telefono.trim().length < 7) {
      // Mini reto: el teléfono debe tener mínimo 7 caracteres
      nuevosErrores.telefono = "El teléfono debe tener mínimo 7 caracteres.";
    }

    if (!form.correo.trim()) {
      nuevosErrores.correo = "El correo es obligatorio.";
    } else if (!form.correo.includes("@")) {
      nuevosErrores.correo = "El correo debe contener @.";
    }

    setErrores(nuevosErrores);

    // Retorna true solo si ningún campo tiene errores
    return (
      !nuevosErrores.nombre &&
      !nuevosErrores.telefono &&
      !nuevosErrores.correo
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const esValido = validarFormulario();
    if (!esValido) return; // Si hay errores, se detiene

    try {
      setEnviando(true); // Desactiva el botón y cambia el texto a "Guardando..."

      await onAgregar(form); // Envía los datos a la API

      // Limpiar formulario y errores si todo sale bien
      setForm({
        nombre: "",
        telefono: "",
        correo: "",
        etiqueta: "Personal",
      });
      setErrores({ nombre: "", telefono: "", correo: "" });
    } catch (error) {
      console.error("Error al guardar contacto:", error);
    } finally {
      setEnviando(false); // Reactiva el botón pase lo que pase
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Campo Nombre */}
      <div className="space-y-1.5">
        <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400">
          Nombre completo *
        </label>
        <div className="relative group">
          <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-slate-500 group-focus-within:text-blue-500 transition-colors">
            👤
          </span>
          <input
            type="text"
            name="nombre"
            placeholder="Ej. Ana María Gómez"
            value={form.nombre}
            onChange={handleChange}
            className="w-full pl-11 pr-4 py-3 bg-slate-950/60 border border-slate-800 rounded-xl text-sm text-slate-100 placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all shadow-inner"
          />
        </div>
        {errores.nombre && (
          <p className="text-xs text-red-600 mt-1">{errores.nombre}</p>
        )}
      </div>

      {/* Campo Teléfono */}
      <div className="space-y-1.5">
        <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400">
          Teléfono / Celular *
        </label>
        <div className="relative group">
          <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-slate-500 group-focus-within:text-blue-500 transition-colors">
            📞
          </span>
          <input
            type="tel"
            name="telefono"
            placeholder="Ej. 300 123 4567"
            value={form.telefono}
            onChange={handleChange}
            className="w-full pl-11 pr-4 py-3 bg-slate-950/60 border border-slate-800 rounded-xl text-sm text-slate-100 placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all shadow-inner"
          />
        </div>
        {errores.telefono && (
          <p className="text-xs text-red-600 mt-1">{errores.telefono}</p>
        )}
      </div>

      {/* Campo Correo */}
      <div className="space-y-1.5">
        <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400">
          Correo electrónico *
        </label>
        <div className="relative group">
          <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-slate-500 group-focus-within:text-blue-500 transition-colors">
            📧
          </span>
          <input
            type="email"
            name="correo"
            placeholder="Ej. ana.gomez@correo.com"
            value={form.correo}
            onChange={handleChange}
            className="w-full pl-11 pr-4 py-3 bg-slate-950/60 border border-slate-800 rounded-xl text-sm text-slate-100 placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all shadow-inner"
          />
        </div>
        {errores.correo && (
          <p className="text-xs text-red-600 mt-1">{errores.correo}</p>
        )}
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
            name="etiqueta"
            value={form.etiqueta}
            onChange={handleChange}
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

      {/* Botón de Guardar con estado "enviando" */}
      <button
        type="submit"
        disabled={enviando}
        className="w-full mt-2 py-3.5 px-6 bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 text-white font-semibold text-sm rounded-xl shadow-lg shadow-blue-600/30 hover:shadow-blue-600/50 hover:from-blue-500 hover:to-indigo-500 active:scale-[0.98] transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <span>✨</span> {enviando ? "Guardando..." : "Guardar Contacto"}
      </button>
    </form>
  );
}