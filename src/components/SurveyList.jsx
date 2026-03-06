import React from 'react';
import Survey from './Survey.jsx';

export default class SurveyList extends React.Component {
  render() {
    
    const surveys = this.props.surveys.map(survey => {
      var questionnaires = this.props.questionnaires.filter(questionnaire => {
        if (questionnaire.QUESTIONNAIRES_survey_identifier == survey.SURVEYS_identifier) {
          return questionnaire;
        }
      });
      
      return (
        <Survey key={survey.SURVEYS_identifier} survey={survey} questionnaires={questionnaires} />
      );
    });
    
    return <div className="survey_list">{surveys}</div>
  }
}