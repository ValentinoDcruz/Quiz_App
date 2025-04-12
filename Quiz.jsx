import React, { useState, useEffect } from "react";
import "./Quiz.css";

const Quiz = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQn, setCurrentQn] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState(null);
  const [userAnswers, setUserAnswers] = useState([]);
  const [timer, setTimer] = useState(15);
  const [showResult, setShowResult] = useState(false);
  const [showAnswer, setShowAnswer] = useState(false);

  const staticQuestions = [
    {
      question: "What is the capital of France?",
      options: ["Paris", "London", "Rome", "Berlin"],
      answer: "Paris",
    },
    {
      question: "Who developed the theory of relativity?",
      options: ["Isaac Newton", "Albert Einstein", "Nikola Tesla", "Galileo"],
      answer: "Albert Einstein",
    },
    {
      question: "What is the largest planet in our solar system?",
      options: ["Earth", "Mars", "Jupiter", "Saturn"],
      answer: "Jupiter",
    },
    {
      question: "Which country is known as the Land of the Rising Sun?",
      options: ["China", "Japan", "South Korea", "Thailand"],
      answer: "Japan",
    },
    {
      question: "Who painted the Mona Lisa?",
      options: ["Vincent van Gogh", "Leonardo da Vinci", "Pablo Picasso", "Claude Monet"],
      answer: "Leonardo da Vinci",
    },
    {
      question: "In which year did the Titanic sink?",
      options: ["1912", "1905", "1898", "1920"],
      answer: "1912",
    },
    {
      question: "Which is the longest river in the world?",
      options: ["Amazon River", "Nile River", "Yangtze River", "Ganges River"],
      answer: "Amazon River",
    },
    {
      question: "What is the chemical symbol for gold?",
      options: ["Au", "Ag", "Pb", "Fe"],
      answer: "Au",
    },
    {
      question: "Who was the first president of the United States?",
      options: ["George Washington", "Abraham Lincoln", "Thomas Jefferson", "John Adams"],
      answer: "George Washington",
    },
    {
      question: "Which element has the atomic number 1?",
      options: ["Helium", "Oxygen", "Hydrogen", "Carbon"],
      answer: "Hydrogen",
    },
    {
      question: "What is the tallest mountain in the world?",
      options: ["Mount Kilimanjaro", "Mount Everest", "Mount Fuji", "K2"],
      answer: "Mount Everest",
    },
    {
      question: "Which animal is known as the King of the Jungle?",
      options: ["Lion", "Elephant", "Tiger", "Giraffe"],
      answer: "Lion",
    },
    {
      question: "In which year did World War I begin?",
      options: ["1914", "1910", "1899", "1920"],
      answer: "1914",
    },
    {
      question: "What is the smallest country in the world?",
      options: ["Vatican City", "Monaco", "Nauru", "San Marino"],
      answer: "Vatican City",
    },
    {
      question: "What is the longest running animated TV series?",
      options: ["The Simpsons", "Family Guy", "South Park", "SpongeBob SquarePants"],
      answer: "The Simpsons",
    },
    {
      question: "Who discovered penicillin?",
      options: ["Marie Curie", "Albert Einstein", "Alexander Fleming", "Isaac Newton"],
      answer: "Alexander Fleming",
    },
    {
      question: "Which planet is closest to the sun?",
      options: ["Mercury", "Venus", "Earth", "Mars"],
      answer: "Mercury",
    },
    {
      question: "What is the currency of Japan?",
      options: ["Yuan", "Won", "Yen", "Ringgit"],
      answer: "Yen",
    },
    {
      question: "What is the main ingredient in guacamole?",
      options: ["Tomato", "Avocado", "Onion", "Chili"],
      answer: "Avocado",
    },
    {
      question: "Which ocean is the largest?",
      options: ["Atlantic", "Pacific", "Indian", "Arctic"],
      answer: "Pacific",
    },
    {
      question: "Which famous scientist developed the laws of motion?",
      options: ["Albert Einstein", "Isaac Newton", "Galileo Galilei", "Nikola Tesla"],
      answer: "Isaac Newton",
    },
    {
      question: "What is the capital city of Australia?",
      options: ["Sydney", "Melbourne", "Canberra", "Brisbane"],
      answer: "Canberra",
    }
  ];

  // Shuffle the questions and pick 5 random ones
  const getRandomQuestions = () => {
    const shuffled = staticQuestions.sort(() => Math.random() - 0.5);
    return shuffled.slice(0, 5);
  };

  // Initialize the quiz with 5 random questions
  useEffect(() => {
    setQuestions(getRandomQuestions());
  }, []);

  // Timer logic
  useEffect(() => {
    if (questions.length === 0) return;
    const countdown = setInterval(() => {
      setTimer((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    if (timer === 0 && !showAnswer) {
      handleAutoNext();
    }
    return () => clearInterval(countdown);
  }, [timer, showAnswer, questions]);

  const handleOptionClick = (option) => {
    if (showAnswer) return; // Prevent double submissions
  
    setSelected(option);
    setShowAnswer(true);
    const correct = option === questions[currentQn].answer;
    if (correct) setScore((prev) => prev + 1);
  
    setUserAnswers((prevAnswers) => [
      ...prevAnswers,
      { ...questions[currentQn], selectedAnswer: option },
    ]);
  
    setTimeout(() => {
      handleNext();
    }, 1500);
  };
  
    

  const handleAutoNext = () => {
    if (showAnswer) return; // Prevent double submissions
  
    setUserAnswers((prevAnswers) => [
      ...prevAnswers,
      { ...questions[currentQn], selectedAnswer: "No Answer" },
    ]);
    setShowAnswer(true);
    setTimeout(() => {
      handleNext();
    }, 1500);
  };
  

  const handleNext = () => {
    setSelected(null);
    setTimer(15);
    setShowAnswer(false);
    if (currentQn + 1 < questions.length) {
      setCurrentQn(currentQn + 1);
    } else {
      localStorage.setItem("lastScore", score);
      setShowResult(true);
    }
  };

  const handleRestart = () => {
    // Restart the quiz with a new set of 5 random questions
    setQuestions(getRandomQuestions());
    setScore(0);
    setCurrentQn(0);
    setUserAnswers([]);
    setTimer(15);
    setShowResult(false);
    setShowAnswer(false);
  };

  if (questions.length === 0) {
    return <div className="quiz-box">Loading Questions...</div>;
  }

  if (showResult) {
    return (
      <div className="quiz-box">
        <h2>Quiz Completed!</h2>
        <p>Your Score: {score} / {questions.length}</p>

        <ul className="review-list">
          {userAnswers.map((item, index) => (
            <li key={index}>
              <strong>Q{index + 1}:</strong> {item.question}
              <br />
              ✅ Correct: <b>{item.answer}</b>
              <br />
              📝 You answered:{" "}
              <span
                className={item.selectedAnswer === item.answer ? "correct" : "wrong"}
              >
                {item.selectedAnswer}
              </span>
            </li>
          ))}
        </ul>
        <button onClick={handleRestart}>Restart Quiz</button>
      </div>
    );
  }

  return (
    <div className="quiz-box">
      <div className="progress-bar">
        <div
          className="progress"
          style={{
            width: `${((currentQn + 1) / questions.length) * 100}%`,
          }}
        ></div>
      </div>

      <h2>
        Q{currentQn + 1}: {questions[currentQn].question}
      </h2>
      <ul>
        {questions[currentQn].options.map((opt, idx) => {
          const isCorrect = opt === questions[currentQn].answer;
          const isSelected = selected === opt;
          const isWrongSelected = showAnswer && isSelected && !isCorrect;

          return (
            <li
              key={idx}
              className={
                showAnswer
                  ? isCorrect
                    ? "correct"
                    : isWrongSelected
                    ? "wrong"
                    : ""
                  : isSelected
                  ? "selected"
                  : ""
              }
              onClick={() => !showAnswer && handleOptionClick(opt)}
            >
              {opt}
            </li>
          );
        })}
      </ul>

      <div className="footer">
        <p>Timer: {timer}s</p>
      </div>
    </div>
  );
};

export default Quiz;
