import { useState, createContext } from "react";
import {
  calcularMarca,
  obtenerDiferenciaYear,
  calcularPlan,
  formatearDinero,
} from "../helpers";

const CotizadorContext = createContext();

const CotizadorProvider = ({ children }) => {
  const [datos, setDatos] = useState({
    marca: "",
    year: "",
    plan: "",
  });

  const [error, setError] = useState("");
  const [resultado, setResultado] = useState(0);

  const handleChangeDatos = (e) => {
    setDatos({
      ...datos,
      [e.target.name]: e.target.value,
    });
  };

  const cotizarSeguro = () => {
    let resultado = 2000;

    const diferencia = obtenerDiferenciaYear(datos.year);

    resultado -= (diferencia * 3 * resultado) / 100;

    resultado *= calcularMarca(datos.marca);

    resultado *= calcularPlan(datos.plan);

    resultado = resultado.toFixed(2);

    setResultado(resultado);
  };

  return (
    <CotizadorContext.Provider
      value={{
        datos,
        handleChangeDatos,
        error,
        setError,
        cotizarSeguro,
        resultado,
      }}
    >
      {children}
    </CotizadorContext.Provider>
  );
};

export { CotizadorProvider };

export default CotizadorContext;
