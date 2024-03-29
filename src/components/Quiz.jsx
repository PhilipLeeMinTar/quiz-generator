import React, { useState } from "react";
import axios from "axios";
import "./Quiz.css";

const Quiz = () => {
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");
  const [isLoading, setIsLoading] = useState(false); // Add loading state
  const HTTP = "/chat";
  const formatMessage =
    " Please give me in JSON format, with fields for 'quiz', 'topic', 'questions', 'question','options', 'answer'.";
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true); // Start Loading
    axios
      .post(`${HTTP}`, { prompt: prompt + formatMessage })
      .then((res) => {
        setResponse(res.data);
        setIsLoading(false); // Stop Loading
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false); // Stop Loading even if there's error
      });
  };

  const handlePrompt = (e) => setPrompt(e.target.value);

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault(); // Prevent inserting a newline
      handleSubmit(e); // Submit the form
    }
  };

  return (
    <div className="container">
      <h1>Quiz Generator App with GPT 3.5</h1>
      <form className="form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="">
            Generate a quiz on any topic! Specify keywords like sub-topics, number of
            questions, difficulty, question type(MCQ, T/F), etc.
          </label>
          <textarea
            rows="3"
            type="text"
            className="shadow-sm"
            placeholder="Enter text"
            value={prompt}
            onChange={handlePrompt}
            onKeyDown={handleKeyPress}
          />
          <button type="submit" className="btn">
            Submit
          </button>
        </div>
      </form>
      {isLoading ? (
        <div className="loading">Waiting for response...</div>
      ) : (
        <div className="container-response">
          {response && response.questions ? (
            <>
              <h1>{response.quiz}</h1>
              <div className="quiz-content">
                {response.questions.map((question, index) => (
                  <div key={index} className="question-block">
                    <h3>
                      Question {index + 1}: {question.question}
                    </h3>
                    {question.options ? (
                      <div className="options">
                        {question.options.map((option, optionIndex) => (
                          <div key={optionIndex} className="option">
                            {option}
                          </div>
                        ))}
                      </div>
                    ) : null}
                    <div className="answer">
                      Answer: <br></br>
                      {question.answer}
                    </div>
                  </div>
                ))}
              </div>
              {/* <pre>{JSON.stringify(response, null, 2)}</pre> */}
            </>
          ) : (
            "Your generated quiz will appear here..."
          )}
        </div>
      )}
    </div>
  );
};

export default Quiz;
