import { Link } from 'react-router-dom';

export default function Questionnaire({ questionnaire }) {
  return (
    <div className="questionnaire">
      <Link
        to={`/responses?questionnaireId=${questionnaire.QUESTIONNAIRES_identifier}`}
      >
        {questionnaire.QUESTIONNAIRES_name || 'No Name'}
      </Link>
    </div>
  );
}
