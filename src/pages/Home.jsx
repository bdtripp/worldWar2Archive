import { useState } from "react";
import { useEffect } from "react";
import { parseFile } from '../utils/csvParser';
import SurveyList from '../components/SurveyList';

export default function Home() {
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

    if (error) {
        return <h1>Error loading data: {error}</h1>;
    }

    if (loading) {
        return <h2>Loading World War II Soldier Surveys...</h2>;
    }

    return (
        <div>
            <h2>World War II Soldier Surveys</h2>
            <SurveyList surveys={surveys} questionnaires={questionnaires} />
        </div>
    );
}