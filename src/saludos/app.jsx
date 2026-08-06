import { useState } from "react";
import "./App.css";

function App() {

  const [nombre, setNombre] = useState("");
  const [mensaje, setMensaje] = useState("");

  const saludar = () => {

    if (nombre.trim() === "") {
      setMensaje("⚠️ Escribe tu nombre");
      return;
    }

    setMensaje(`👋 ¡Hola ${nombre}! Bienvenido a React.`);
  };

  return (

    <div className="container">

      <div className="card">

        <img
          src="https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg"
          alt="React"
          className="logo"
        />

        <h1>Saludo con React</h1>

        <p>Ingresa tu nombre para recibir un saludo.</p>

        <input
          type="text"
          placeholder="Tu nombre..."
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
        />

        <button onClick={saludar}>
          Saludar
        </button>

        {mensaje && (
          <div className="mensaje">
            {mensaje}
          </div>
        )}

      </div>

    </div>

  );
}

export default App;