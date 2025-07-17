import { useState, useEffect } from "react";
import { questions } from "@/data/questions";
import { imageQuestions } from "@/data/imageQuestions";
import { QuizState, QuizResult } from "@/types/quiz";
import { QuizProgress } from "./quiz/QuizProgress";
import { Timer } from "./quiz/Timer";
import { QuestionCard } from "./quiz/QuestionCard";
import { QuizResults } from "./quiz/QuizResults";
import { DemoCodePopup } from "./DemoCodePopup";
import { ResultPopup } from "./quiz/ResultPopup";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import trafficLightLogo from "@/assets/traffic-light-logo.avif";
import { ScrollingBanner } from "./ScrollingBanner";
export function Quiz() {
  const [hasStarted, setHasStarted] = useState(false);
  const [showCodePopup, setShowCodePopup] = useState(false);
  const [quizType, setQuizType] = useState<"111" | "222" | null>(null);
  const [quizState, setQuizState] = useState<QuizState>({
    currentQuestion: 0,
    answers: [],
    timeRemaining: 60,
    isCompleted: false
  });
  const [startTime, setStartTime] = useState<number | null>(null);
  const [questionStartTime, setQuestionStartTime] = useState(Date.now());
  const [showResultPopup, setShowResultPopup] = useState(false);

  // Get current questions based on quiz type
  const currentQuestions = quizType === "222" ? imageQuestions : questions;

  // Reset timer when question changes
  useEffect(() => {
    if (!quizState.isCompleted) {
      setQuizState(prev => ({
        ...prev,
        timeRemaining: 60
      }));
      setQuestionStartTime(Date.now());
    }
  }, [quizState.currentQuestion, quizState.isCompleted]);
  const handleAnswer = (answerIndex: number) => {
    const newAnswers = [...quizState.answers];
    newAnswers[quizState.currentQuestion] = answerIndex;
    if (quizState.currentQuestion < currentQuestions.length - 1) {
      // Move to next question
      setQuizState(prev => ({
        ...prev,
        answers: newAnswers,
        currentQuestion: prev.currentQuestion + 1
      }));
    } else {
      // Quiz completed
      setQuizState(prev => ({
        ...prev,
        answers: newAnswers,
        isCompleted: true
      }));
      // Show result popup after a brief delay
      setTimeout(() => {
        setShowResultPopup(true);
      }, 500);
    }
  };
  const handleTimeUp = () => {
    // Auto-advance to next question or complete quiz if time runs out
    handleAnswer(-1); // -1 indicates no answer selected
  };
  const calculateResults = (): QuizResult => {
    const correctAnswers = quizState.answers.reduce((count, answer, index) => {
      return answer === currentQuestions[index].correctAnswer ? count + 1 : count;
    }, 0);
    const timeSpent = startTime ? Math.floor((Date.now() - startTime) / 1000) : 0;
    return {
      totalQuestions: currentQuestions.length,
      correctAnswers,
      score: Math.round(correctAnswers / currentQuestions.length * 100),
      timeSpent
    };
  };
  const restartQuiz = () => {
    setHasStarted(false);
    setQuizType(null);
    setStartTime(null);
    setQuizState({
      currentQuestion: 0,
      answers: [],
      timeRemaining: 60,
      isCompleted: false
    });
  };
  const startQuiz = () => {
    setShowCodePopup(true);
  };
  const handleCodeSubmit = (code: string) => {
    setShowCodePopup(false);
    if (code === "111") {
      setQuizType("111");
      setHasStarted(true);
      setStartTime(Date.now()); // Set start time when quiz actually starts
    } else if (code === "222") {
      setQuizType("222");
      setHasStarted(true);
      setStartTime(Date.now()); // Set start time when quiz actually starts
    }
    // TODO: Handle 333 code for advanced level
  };
  const getAnsweredQuestions = () => {
    return quizState.answers.map((_, index) => index).filter(index => index < quizState.currentQuestion);
  };
  if (quizState.isCompleted) {
    return <div className="min-h-screen bg-white">
        <ScrollingBanner />
        {/* Header with Traffic Light Logo - positioned in top-left corner */}
        <div className="absolute top-12 left-4 z-10">
          <div className="flex items-center space-x-2">
            <img src={trafficLightLogo} alt="Traffic Light Quiz" className="w-8 h-8 object-contain" />
            <h1 className="text-lg font-bold text-foreground">تاقیکردنەوەی تیۆری</h1>
          </div>
        </div>
        
        <div className="px-4 pt-16">
          <QuizResults result={calculateResults()} onRestart={restartQuiz} userAnswers={quizState.answers} questions={currentQuestions} />
        </div>
        
        <ResultPopup score={calculateResults().score} isOpen={showResultPopup} onClose={() => setShowResultPopup(false)} />
      </div>;
  }

  // Show start screen if not started
  if (!hasStarted) {
    return <div className="min-h-screen bg-white">
        <ScrollingBanner />
        {/* Header with Traffic Light Logo - positioned in top-left corner */}
        <div className="absolute top-12 left-4 z-10">
          <div className="flex items-center space-x-2">
            <img src={trafficLightLogo} alt="Traffic Light Quiz" className="w-8 h-8 object-contain" />
            <h1 className="text-lg font-bold text-foreground">تاقیکردنەوەی تیۆری</h1>
          </div>
        </div>

        <div className="max-w-5xl mx-auto px-6 pt-8">
          <div className="bg-white p-16 text-center flex flex-col min-h-[80vh]">
            <div className="flex-1">
              <h2 className="text-6xl font-bold text-foreground mb-8">بەخێربێیت</h2>
              <div className="bg-gradient-primary/10 rounded-xl p-12 mb-8">
                <div className="space-y-8 text-right">
                  <div className="flex items-center space-x-6 justify-end">
                    <span className="text-foreground text-3xl font-medium">بۆ وەڵامدانەوەی هەر پرسیارێک یەک خولەک کاتت هەیە</span>
                    <div className="w-4 h-4 bg-primary rounded-full shadow-lg"></div>
                  </div>
                  <div className="flex items-center space-x-6 justify-end">
                    <span className="text-foreground text-3xl font-medium">تەنها یەک جار کلیک بکە لە وەڵامی دروست</span>
                    <div className="w-4 h-4 bg-primary rounded-full shadow-lg"></div>
                  </div>
                  <div className="flex items-center space-x-6 justify-end">
                    <span className="text-foreground text-3xl font-medium">لە کۆتاییدا ڕاستەوخۆ ئەنجام وەرئەگریتەوە</span>
                    <div className="w-4 h-4 bg-primary rounded-full shadow-lg"></div>
                  </div>
                </div>
              </div>
            </div>
            
            <button onClick={startQuiz} className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 
                         text-white font-bold py-8 px-20 rounded-2xl text-3xl
                         shadow-[0_10px_30px_rgba(34,197,94,0.4)] hover:shadow-[0_15px_40px_rgba(34,197,94,0.6)]
                         transform hover:scale-105 transition-all duration-300
                         border-2 border-green-400/50 hover:border-green-300
                         relative overflow-hidden
                         before:absolute before:inset-0 before:bg-gradient-to-r before:from-white/20 before:to-transparent before:opacity-0 hover:before:opacity-100 before:transition-opacity">
              دەست پێکردن
            </button>
          </div>
        </div>
        
        <DemoCodePopup isOpen={showCodePopup} onCodeSubmit={handleCodeSubmit} />
      </div>;
  }
  const currentQuestion = currentQuestions[quizState.currentQuestion];
  return <div className="min-h-screen bg-white">
      <ScrollingBanner />
      
      {/* Header - only show for non-image questions */}
      {quizType !== "222" && (
        <div className="absolute top-12 left-4 z-10">
          <div className="flex items-center space-x-2">
            <img src={trafficLightLogo} alt="Traffic Light Quiz" className="w-8 h-8 object-contain" />
            <h1 className="text-lg font-bold text-foreground">تاقیکردنەوەی تیۆری</h1>
          </div>
        </div>
      )}

      <div className="w-full px-6 pt-14">
        {/* Main content: Timer + Progress and Question side by side */}
        <div className={cn("flex flex-col lg:flex-row gap-6", {
        "-mt-8": quizType === "222", // Much more negative margin to attach to banner
        "mt-4": quizType !== "222"
      })}>
          {/* Left side: Timer and Progress Circles */}
          <div className={cn("flex-shrink-0", {
            "lg:w-1/4": quizType !== "111",
            "lg:w-1/5": quizType === "111" // Smaller width for type 111 to give more space to answers
          })}>
            <div className={cn("bg-white mx-0 my-0", {
              "p-2": quizType === "222", // Smaller padding for image questions
              "p-4": quizType !== "222"
            })}>
              {/* Timer */}
              <div className={cn({
                "mb-3": quizType === "222", // Smaller margin for image questions
                "mb-6": quizType !== "222"
              })}>
                <Timer timeRemaining={quizState.timeRemaining} onTimeUp={handleTimeUp} questionNumber={quizState.currentQuestion} />
              </div>
              
              {/* Progress Circles */}
              <QuizProgress totalQuestions={currentQuestions.length} currentQuestion={quizState.currentQuestion} answeredQuestions={getAnsweredQuestions()} />
            </div>
          </div>

          {/* Right side: Question */}
          <div className={cn("flex-1", {
            "lg:w-3/4": quizType !== "111",
            "lg:w-4/5": quizType === "111" // More space for type 111 answers
          })}>
            <div className={cn("bg-white", {
              "p-3": quizType === "222", // Smaller padding for image questions
              "p-6": quizType !== "222"
            })}>
              <QuestionCard question={currentQuestion} questionNumber={quizState.currentQuestion} onAnswer={handleAnswer} quizType={quizType} />
            </div>
          </div>
        </div>
      </div>
    </div>;
}