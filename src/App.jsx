import React from "react";
import Weather from "./components/Weather";
import "./App.css";

export default function App() {
  return (
    <div className="app-root">
      <div className="app-container">
        <header className="app-header">
          <h1>🌤️ Live Weather App</h1>
        </header>

        <main>
          <Weather />
        </main>

        <footer className="app-footer">
          <small>Feel the live weather forcasting From @AbhaySharma</small>
        </footer>
      </div>
    </div>
  );
}
