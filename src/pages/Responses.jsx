import { useEffect } from "react";

export default function Responses() {

    useEffect(() => {
        Promise.all([
            parseFile("data/surveys.csv"),
            parseFile("data/questionnaires.csv"),
            parseFile("data/responses.csv"),
            parseFile("data/questions.csv"),
            // parseFile("data/answers.csv") see comment below on var filteredAnswers
        ])
        .then(([surveys, questionnaires, responses, questions/*, answers*/]) => { // see comment below
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
        })
        .catch((err) => {
            root.render(<h1>Error loading data: {err.message}</h1>);
        });
    }, []);
}