import React, { createContext, useState, useContext } from "react";

const contextoUsuario = createContext();

export const ProviderUsuario = ({ children }) => {
    const [usuario, setUsuario] = useState(null);

    return (
        <contextoUsuario.Provider value={{ usuario, setUsuario }}>
            {children}
        </contextoUsuario.Provider>
    );
};

export const useUser = () => {
    return useContext(contextoUsuario); // ahora sí funciona
};
