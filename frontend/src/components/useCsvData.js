import { useEffect, useState } from 'react';
import useCsvToJson from "./useCsvToJson";
import useHookCsvData from "./HookCsvData";

const useCsvData = (input, file) => {
    const [dataState, setDataState] = useState({
        csvData: null,
        isLoading: false,
        error: null
    });

    // Llamada de los hooks de manera condicional no está permitida, entonces los llamamos siempre
    const jsonResults = useCsvToJson(file);
    const hookResults = useHookCsvData();

    // Un efecto para manejar la lógica condicional basada en `input`
    useEffect(() => {
        // Seleccionamos qué conjunto de datos utilizar basado en `input`
        const { csvData, isLoading, error } = input ? jsonResults : hookResults;
        setDataState({ csvData, isLoading, error });
    }, [input, jsonResults, hookResults]); // Dependencias que realmente controlan la re-renderización

    return dataState;
};

export default useCsvData;
