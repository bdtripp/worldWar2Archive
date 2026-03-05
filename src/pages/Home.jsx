import React from 'react';
import { parseFile } from '../utils/csvParser';
import SurveyList from '../components/SurveyList';

export default class Home extends React.Component {
     constructor(props) {
        super(props);
        this.state = {
            surveys: [],
            questionnaires: [],
            loading: true,
            error: null
        };
    }

    componentDidMount() {
        Promise.all([
            parseFile("/data/surveys.csv"),
            parseFile("/data/questionnaires.csv")
        ])
        .then(([surveys, questionnaires]) => {    
            this.setState({ surveys, questionnaires, loading: false });
        })
        .catch((err) => {
            this.setState({ error: err.message, loading: false });
        });
    }
    render() {
        const { surveys, questionnaires, loading, error } = this.state;

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
}


Promise.all([
    parseFile("/data/surveys.csv"),
    parseFile("/data/questionnaires.csv")
]).then(([surveys, questionnaires]) => {    
    return (
    <div>
        <h2>World War II Soldier Surveys</h2>
        <SurveyList surveys={surveys} questionnaires={questionnaires} />
    </div>
    );
}).catch((err) => {
    return (<h1>Error loading data: {err.message}</h1>);
});