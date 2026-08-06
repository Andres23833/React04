import "./contactocard.css";

function ContactoCard({ contacto, onEliminar }) {
  return (
    <div className="card" style={{ position: "relative" }}>
      <div className="avatar">
        {contacto.nombre.charAt(0)}
      </div>

      <div className="info">
        <h2>{contacto.nombre}</h2>
        <p><strong>📞</strong> {contacto.telefono}</p>
        <p><strong>📧</strong> {contacto.correo}</p>

        <span className="etiqueta">
          {contacto.etiqueta}
        </span>
      </div>

      {/* Botón para activar la función de eliminar */}
      <button 
        onClick={() => onEliminar(contacto.correo)}
        style={{
          position: "absolute",
          top: "20px",
          right: "20px",
          background: "#dc2626",
          color: "white",
          border: "none",
          padding: "6px 12px",
          borderRadius: "6px",
          cursor: "pointer",
          fontSize: "0.8rem",
          fontWeight: "bold"
        }}
      >
        Eliminar
      </button>
    </div>
  );
}

export default ContactoCard;