import React from "react";
import QuestionReducer from "./Reducers/QuestionReducer";
import QuestionService from "../services/QuestionService";

let initialState = {
  questions: [],
};

export const QuestionContext = React.createContext(initialState);
export const QuestionProvider = ({ children }) => {
  const [myState, setMyState] = React.useState({
    questions:[]
  });

  // React.useEffect(()=>{
  //   console.log("***- USEEFFECT-  -- QuestionContext***");
  //   QuestionService.allQuestions().then((data)=>{
  //     setMyState({
  //       questions:data
  //     })
  //     dispatch({
  //       type: "ALL_QUESTION",
  //       payload:data,
  //     });
  // })
  // },[])



  const [state, dispatch] = React.useReducer(QuestionReducer, myState);

  // Distpatches(Actions)
  function addQuestion(questionObject) {
    QuestionService.addQuestion(questionObject).then((data)=>{
      dispatch({
        type: "ADD_QUESTION",
        payload:data["data"],
      });
  })}

  function deleteQuestion(questionID) {
    QuestionService.deleteQuestion(questionID).then((data)=>{
      dispatch({
        type: "DELETE_QUESTION",
        payload: questionID,
      });
  })}
   
  

  function allQuestions() {
    console.log("***- allQuestions-  -- QuestionContext***");
   
    
  }

  React.useEffect(() => {
    allQuestions((data) => {
      setMyState({
        questions: data,
      });
    });
  }, []);

  return (
    <QuestionContext.Provider
      value={{
        questions: state.questions,
        deleteQuestion,
        addQuestion,
        allQuestions,
      }}
    >
      {children}
    </QuestionContext.Provider>
  );
};
