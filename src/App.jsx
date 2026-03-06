import { useState } from "react";
import { useEffect } from "react";
import { parseFile } from './utils/csvParser';
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Responses from "./pages/Responses";

export default function App() {
    const [surveys, setSurveys] = useState([]);
    const [questionnaires, setQuestionnaires] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        Promise.all([
            parseFile("/data/surveys.csv"),
            parseFile("/data/questionnaires.csv")
        ])
        .then(([surveys, questionnaires]) => {    
            setSurveys(surveys);
            setQuestionnaires(questionnaires);
            setLoading(false);
        })
        .catch((err) => {
            setLoading(false);
            setError(err.message);
        });
    }, []);

    const homeElement = (
        <Home 
            surveys={surveys} 
            questionnaires={questionnaires} 
            loading={loading} 
            error={error} 
        />
    );

    const responsesElement = (
        <Responses 
            surveys={surveys} 
            questionnaires={questionnaires} 
            loading={loading} 
            error={error} 
        />
    );

    return (
        <Routes>
            <Route path="/" element={homeElement} />
            <Route path="/responses" element={responsesElement} />
        </Routes>
    );
}