import SurveyList from '../components/SurveyList';

export default function Home({surveys, questionnaires, loading, error}) {
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