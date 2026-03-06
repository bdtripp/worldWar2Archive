import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from "react-router-dom";
import App from './App.jsx'
import './assets/css/wwii.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
        <App />
    </BrowserRouter>
  </React.StrictMode>,
)


/////////////// Delete everything below this ///////////////////////

import ReactDOM from 'react-dom/client';
import SurveyList from './SurveyList.jsx';
import ImageCarousel from './ImageCarousel.jsx';
import Papa from 'papaparse';

const root = ReactDOM.createRoot(document.getElementById('root'));

const parseFile = (url) => {
  return new Promise((resolve, reject) => {
    Papa.parse(url, {
      download: true,
      header: true,
      complete: (results) => resolve(results.data),
      error: (err => reject(err))
    });
  });
} 

if (window.location.pathname === "/") {
  Promise.all([
    parseFile("/data/surveys.csv"),
    parseFile("/data/questionnaires.csv")
  ]).then(([surveys, questionnaires]) => {    
    root.render(
      <div>
        <h2>World War II Soldier Surveys</h2>
        <SurveyList surveys={surveys} questionnaires={questionnaires} />
      </div>
    )
  }).catch((err) => {
      root.render(<h1>Error loading data: {err.message}</h1>);
  });
}

if (window.location.pathname.includes("responses.html")) {
  Promise.all([
    parseFile("data/surveys.csv"),
    parseFile("data/questionnaires.csv"),
    parseFile("data/responses.csv"),
    parseFile("data/questions.csv"),
    // parseFile("data/answers.csv") see comment below on var filteredAnswers
  ]).then(([surveys, questionnaires, responses, questions/*, answers*/]) => { // see comment below
    var params = new URLSearchParams(location.search);
    var questionnaireId = params.get('questionnaireId');

    var filteredQuestions = questions.filter(question => {
      return question.QUESTIONS_parent_id == questionnaireId;
    });

    var filteredQuestionsIds = filteredQuestions.map(question => question.QUESTIONS_identifier);

    var filteredResponses = responses.filter(response => {
      return (filteredQuestionsIds.indexOf(response.RESPONSES_question_id) > -1);
    });

    var filteredImages = Array.from(new Set(filteredResponses.map(response => response.RESPONSES_image)));

    var filteredQuestionnaire = questionnaires.filter(questionnaire => {
      return questionnaire.QUESTIONNAIRES_identifier == questionnaireId;
    })[0];

    var filteredSurvey = surveys.filter(survey => {
      return survey.SURVEYS_identifier == filteredQuestionnaire.QUESTIONNAIRES_survey_identifier;
    })[0];

    // not deleting this for now because may use it in the future. 
    // Also this variable is included in commented out section that logs it to the console

    // var filteredAnswers = answers.filter(answer => {
    //   return (filteredQuestionsIds.indexOf(answer.ANSWER_question_id) > -1);
    // }); 

    // console.log("Filtered Survey: ", filteredSurvey);
    // console.log("Filtered Questionnaire: ", filteredQuestionnaire);
    // console.log("Filtered Questions: ", filteredQuestions);
    // console.log("Filtered Answers: ", filteredAnswers);
    // console.log("Filtered Responses: ", filteredResponses);
    // console.log("Images: ", filteredImages);
    
    if (filteredResponses.length > 0) {
      root.render(
        <div>
          <h2>World War II Soldier Survey Responses</h2>
          <h3>{filteredSurvey.SURVEYS_topics} ({filteredQuestionnaire.QUESTIONNAIRES_name})</h3>
          <ImageCarousel imgNames = {filteredImages} />
        </div>
      );
    } else {
      root.render(
        <div>
          <h2>Sorry, there are currently no responses to view for: </h2>
          <h3>{filteredSurvey.SURVEYS_topics} {filteredQuestionnaire.QUESTIONNAIRES_name}</h3>
        </div>
      );
    }
  }).catch((err) => {
    root.render(<h1>Error loading data: {err.message}</h1>);
  });
}


////////////////////////////////////////


