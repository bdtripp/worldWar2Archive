import $ from 'jquery'; 
import ReactDOM from 'react-dom/client';
import SurveyList from './SurveyList.jsx';
import ImageCarousel from './ImageCarousel.jsx';
import * as csv from 'jquery-csv';

$(
  function() {
    var surveys;
    var questionnaires;
    var responses;
    var questions;
    var answers;
    
    if (window.location.pathname === "/") {
      $.when(
        $.get("data/surveys.csv", data => {
          surveys = csv.toObjects(data);
          console.log("Surveys: ", surveys);
        }), 
        $.get("data/questionnaires.csv", data => {
          questionnaires = csv.toObjects(data);
          console.log("Questionnaires: ", questionnaires);
        })
      ).done(showSurveys);
    }
    
    if (window.location.pathname.includes("responses.html")) {
      $.when(
        $.get("data/surveys.csv", data => {
          surveys = csv.toObjects(data);
          console.log("Surveys: ", surveys);
        }), 
        $.get("data/questionnaires.csv", data => {
          questionnaires = csv.toObjects(data);
          console.log("Questionnaires: ", questionnaires);
        }),
        $.get("data/responses.csv", data => {
          responses = csv.toObjects(data);
          console.log("Responses: ", responses);
        }),
        $.get("data/questions.csv", data => {
          questions = csv.toObjects(data);
          console.log("Questions: ", questions);
        }),
        $.get("data/answers.csv", data => {
          answers = csv.toObjects(data);
          console.log("Answers: ", answers);
        })
      ).done(showResponses);
    }
    
    function showSurveys() {
      const container = document.getElementById('root');
      const root = ReactDOM.createRoot(container);
      root.render(
        <div>
          <h2>World War II Soldier Surveys</h2>
          <SurveyList surveys={surveys} questionnaires={questionnaires} />
        </div>
      );
    }
    
    function showResponses() {
      var params = new URLSearchParams(location.search);
      var questionnaireId = params.get('questionnaireId');

      var filteredQuestions = questions.filter(question => {
        if (question.QUESTIONS_parent_id == questionnaireId) {
          return true;
        }
      });

      var filteredQuestionsIds = filteredQuestions.map(question => question.QUESTIONS_identifier);

      var filteredResponses = responses.filter(response => {
        return (filteredQuestionsIds.indexOf(response.RESPONSES_question_id) > -1);
      });

      var filteredImages = Array.from(new Set(filteredResponses.map(response => response.RESPONSES_image)));

      var filteredAnswers = answers.filter(answer => {
        return (filteredQuestionsIds.indexOf(answer.ANSWER_question_id) > -1);
      });

      var filteredQuestionnaire = questionnaires.filter(questionnaire => {
        if (questionnaire.QUESTIONNAIRES_identifier == questionnaireId) {
          return true;
        }
      })[0];

      var filteredSurvey = surveys.filter(survey => {
        if (survey.SURVEYS_identifier == filteredQuestionnaire.QUESTIONNAIRES_survey_identifier) {
          return true;
        }
      })[0];

      console.log("Filtered Survey: ", filteredSurvey);
      console.log("Filtered Questionnaire: ", filteredQuestionnaire);
      console.log("Filtered Questions: ", filteredQuestions);
      console.log("Filtered Answers: ", filteredAnswers);
      console.log("Filtered Responses: ", filteredResponses);
      console.log("Images: ", filteredImages);
      
      if (filteredResponses.length > 0) {
        const container = document.getElementById('root');
        const root = ReactDOM.createRoot(container);
        root.render(
          <div>
            <h2>World War II Soldier Survey Responses</h2>
            <h3>{filteredSurvey.SURVEYS_topics} ({filteredQuestionnaire.QUESTIONNAIRES_name})</h3>
            <ImageCarousel imgNames = {filteredImages} />
          </div>
        );
      } else {
        const container = document.getElementById('root');
        const root = ReactDOM.createRoot(container);
        root.render(
          <div>
            <h2>Sorry, there are currently no responses to view for: </h2>
            <h3>{filteredSurvey.SURVEYS_topics} {filteredQuestionnaire.QUESTIONNAIRES_name}</h3>
          </div>
        );
      }
    }
  }
)

