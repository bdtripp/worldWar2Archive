import React from 'react';
import Questionnaire from './Questionnaire.jsx';

export default class QuestionnaireList extends React.Component {
  render() {
    const questionnaires = this.props.questionnaires.map(questionnaire => <Questionnaire key={questionnaire.QUESTIONNAIRES_identifier} questionnaire={questionnaire} />);
    return (
      <div className="questionnaire_list">
       <p><b>Questionnaires: </b></p>
       {questionnaires}
      </div>
    )
  }
}