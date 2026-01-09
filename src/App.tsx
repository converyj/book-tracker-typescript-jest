import React from "react";
import "./reset.css";
import "./App.css";
import Router from "./components/Router";

const App: React.FC = () => {
    return (
        <div className="container">
            <Router />
        </div>
    );
};

export default App;
