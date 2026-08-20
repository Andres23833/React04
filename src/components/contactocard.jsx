export default function ContactoCard(props) {
  // Extraemos las propiedades de forma segura para evitar que fallen si alguna llega indefinida
  const { id, nombre, telefono, correo, etiqueta, onEliminar } = props;

  return (
    <div className="bg-slate-900/90 border border-slate-800/80 rounded-2xl p-5 shadow-lg relative flex flex-col justify-between hover:border-slate-700 transition-all group">
      <div>
        {/* Cabecera de la tarjeta */}
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 text-white font-bold flex items-center justify-center text-lg shadow-md shadow-blue-500/20">
            {nombre && typeof nombre === "string" ? nombre.charAt(0).toUpperCase() : "?"}
          </div>
          <div className="overflow-hidden">
            <h3 className="font-semibold text-white text-base truncate">{nombre || "Sin nombre"}</h3>
            <span className="inline-block px-2.5 py-0.5 bg-slate-800 text-slate-300 border border-slate-700/60 rounded-full text-xs font-medium mt-0.5">
              {etiqueta || "Personal"}
            </span>
          </div>
        </div>

        {/* Información de contacto */}
        <div className="space-y-1.5 text-xs text-slate-300 mb-4 bg-slate-950/40 p-3 rounded-xl border border-slate-800/40">
          <p className="flex items-center gap-2 truncate">
            <span className="text-slate-500">📞</span> {telefono || "Sin teléfono"}
          </p>
          <p className="flex items-center gap-2 truncate">
            <span className="text-slate-500">📧</span> {correo || "Sin correo"}
          </p>
        </div>
      </div>

      {/* Botón de eliminar */}
      <div className="flex justify-end pt-2 border-t border-slate-800/60">
        <button
          onClick={() => onEliminar && onEliminar(id)}
          className="px-3 py-1.5 bg-red-500/10 hover:bg-red-500 text-red-400 hover:text-white border border-red-500/20 rounded-lg text-xs font-medium transition-all cursor-pointer flex items-center gap-1.5"
        >
          <span>🗑️</span> Eliminar
        </button>
      </div>
    </div>
  );
}