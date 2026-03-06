import Survey from './Survey.jsx';

export default function SurveyList({ surveys, questionnaires }) {
  return (
    <div className="survey_list">
      {surveys.map(survey => {
        const filteredQuestionnaires = questionnaires.filter(
          questionnaire => questionnaire.QUESTIONNAIRES_survey_identifier === survey.SURVEYS_identifier
        );
        return (
          <Survey 
            key={survey.SURVEYS_identifier} 
            survey={survey} 
            questionnaires={filteredQuestionnaires} 
          />
        );
      })}
    </div>
  );
}