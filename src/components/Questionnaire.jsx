import React from 'react';
import { Link } from "react-router-dom";

export default class Questionnaire extends React.Component {
  render() {
    var questionnaire = this.props.questionnaire;
    
    return (
      <div className="questionnaire">
        <Link to={`/responses?questionnaireId=${questionnaire.QUESTIONNAIRES_identifier}`}>
          {questionnaire.QUESTIONNAIRES_name || "No Name"}
        </Link>
      </div>
    )
  }
}