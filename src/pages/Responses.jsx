import { useState } from "react";
import { useEffect } from "react";
import { parseFile } from '../utils/csvParser';
import ImageCarousel from '../components/ImageCarousel';

export default function Responses({surveys, questionnaires, responses, questions, loading, error}) {
  const [filteredResponses, setFilteredResponses] = useState([]);
  const [filteredSurvey, setFilteredSurvey] = useState(null);
  const [filteredQuestionnaire, setFilteredQuestionnaire] = useState(null);
  const [filteredImages, setFilteredImages] = useState([]);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const questionnaireId = params.get('questionnaireId');
    const filteredQuestions = questions.filter(question => {
      return question.QUESTIONS_parent_id === questionnaireId;
    });
    const filteredQuestionsIds = filteredQuestions.map(question => question.QUESTIONS_identifier);
    const filteredResponses = responses.filter(response => {
      return (filteredQuestionsIds.indexOf(response.RESPONSES_question_id) > -1);
    });
    console.log(responses);
    const filteredImages = Array.from(new Set(filteredResponses.map(response => response.RESPONSES_image)));
    const filteredQuestionnaire = questionnaires.filter(questionnaire => {
      return questionnaire.QUESTIONNAIRES_identifier === questionnaireId;
    })[0];
    const filteredSurvey = surveys.filter(survey => {
      return survey.SURVEYS_identifier === filteredQuestionnaire.QUESTIONNAIRES_survey_identifier;
    })[0];

    setFilteredResponses(filteredResponses);
    setFilteredSurvey(filteredSurvey);
    setFilteredQuestionnaire(filteredQuestionnaire);
    setFilteredImages(filteredImages);

    // not deleting this for now because may use it in the future. 
    // Also this variable is included in commented out section that logs it to the console

    // const filteredAnswers = answers.filter(answer => {
    //   return (filteredQuestionsIds.indexOf(answer.ANSWER_question_id) > -1);
    // }); 

    // console.log("Filtered Survey: ", filteredSurvey);
    // console.log("Filtered Questionnaire: ", filteredQuestionnaire);
    // console.log("Filtered Questions: ", filteredQuestions);
    // console.log("Filtered Answers: ", filteredAnswers);
    // console.log("Filtered Responses: ", filteredResponses);
    // console.log("Images: ", filteredImages);
  }, [surveys, questionnaires, responses, questions, loading, error]);

  if (error) {
    return <h1>Error loading data: {error}</h1>;
  }

  if (loading) {
    return <h2>Loading World War II Soldier Surveys...</h2>;
  }

  if (!filteredSurvey || !filteredQuestionnaire) {
    return <h2>Loading World War II Soldier Surveys...</h2>;
  }

  if (filteredResponses.length > 0) {
    return (
      <div>
        <h2>World War II Soldier Survey Responses</h2>
        <h3>{filteredSurvey.SURVEYS_topics} ({filteredQuestionnaire.QUESTIONNAIRES_name})</h3>
        <ImageCarousel imgNames = {filteredImages} />
      </div>
    );
  } else {
    return (
      <div>
        <h2>Sorry, there are currently no responses to view for: </h2>
        <h3>{filteredSurvey.SURVEYS_topics} {filteredQuestionnaire.QUESTIONNAIRES_name}</h3>
      </div>
    );
  }
}