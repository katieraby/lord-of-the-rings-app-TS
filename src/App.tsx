import "./App.css";
import React from "react";
import Header from "./components/Header";
import QuoteGenerator from "./components/QuoteGenerator";

const App = () => {
  return (
    <main className="main-container">
      <Header />
      <QuoteGenerator />
    </main>
  );
};

export default App;
