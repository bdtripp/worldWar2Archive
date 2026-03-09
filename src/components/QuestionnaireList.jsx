import Questionnaire from './Questionnaire.jsx';

export default function QuestionnaireList({ questionnaires }) {
  return (
    <div className="questionnaire_list">
      <p>
        <b>Questionnaires: </b>
      </p>
      {questionnaires.map((questionnaire) => (
        <Questionnaire
          key={questionnaire.QUESTIONNAIRES_identifier}
          questionnaire={questionnaire}
        />
      ))}
    </div>
  );
}
