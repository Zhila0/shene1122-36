import { useState } from "react";
import { cn } from "@/lib/utils";
import { Question } from "@/types/quiz";

interface QuestionCardProps {
  question: Question;
  questionNumber: number;
  onAnswer: (answerIndex: number) => void;
  quizType?: "111" | "222" | null;
}

export function QuestionCard({
  question,
  questionNumber,
  onAnswer,
  quizType
}: QuestionCardProps) {
  const [hoveredOption, setHoveredOption] = useState<number | null>(null);

  const handleOptionClick = (optionIndex: number) => {
    onAnswer(optionIndex);
  };

  // Check if question is Kurdish (contains Kurdish characters)
  const isKurdish = /[\u0600-\u06FF]/.test(question.title) || question.options.some(option => /[\u0600-\u06FF]/.test(option));

  // Calculate the maximum text length to determine box size
  const maxTextLength = Math.max(...question.options.map(option => option.length));
  const getBoxWidth = () => {
    if (quizType === "222") return "w-full"; // Full width for image questions
    
    // For type 111 questions, use adaptive WIDTH based on text length - left aligned
    if (maxTextLength > 100) return "w-full"; // Very long text - full width
    if (maxTextLength > 60) return "w-5/6"; // Long text - 83% width, left aligned
    if (maxTextLength > 30) return "w-3/4"; // Medium text - 75% width, left aligned
    return "w-2/3"; // Short text - 67% width, left aligned
  };
  
  const getBoxPadding = () => {
    if (quizType === "222") return "px-5 py-4"; // 20% bigger for image questions
    return "px-3 py-3"; // Consistent padding for type 111
  };

  return (
    <div className="w-full animate-slide-in">
      {/* Question Header */}
      <div className={cn({
        "mb-4": quizType === "222", // Smaller margin for image questions
        "mb-6": quizType !== "222"
      })}>
        <div className={cn("bg-gradient-primary rounded-xl text-white relative overflow-hidden", {
          "text-right": isKurdish,
          "p-5": quizType === "222", // 20% bigger for image questions  
          "p-6": quizType !== "222"
        }, "shadow-[0_8px_32px_rgba(0,0,0,0.12)] border border-white/10 backdrop-blur-sm",
        "before:absolute before:inset-0 before:bg-gradient-to-br before:from-white/20 before:to-transparent before:opacity-50",
        "after:absolute after:inset-0 after:bg-gradient-to-t after:from-black/10 after:to-transparent")}>
          <p className={cn("relative z-10 leading-relaxed opacity-95 font-medium", {
            "text-4xl": quizType === "222", // Bigger text for image questions  
            "text-3xl": quizType !== "222"
          })}>
            {question.title}
          </p>
        </div>
      </div>

      {/* Question Image */}
      {question.image && (
        <div className={cn("max-w-2xl mx-auto", {
          "mb-4": quizType === "222", // Smaller margin for image questions
          "mb-8": quizType !== "222"
        })}>
          <div className="bg-white rounded-xl p-3 shadow-3d-medium">
            <img 
              src={question.image} 
              alt="Quiz question image" 
              className={cn("w-full h-auto rounded-lg object-contain", {
                "max-h-64": quizType === "222", // Smaller image for better fit
                "max-h-96": quizType !== "222"
              })}
              onError={(e) => {
                e.currentTarget.style.display = 'none';
              }}
            />
          </div>
        </div>
      )}

      {/* Answer Options */}
      <div className={cn({
        // Type 111: Position answers at absolute right where Kurdish question title begins
        "flex flex-col items-end": quizType === "111", // Right alignment for Kurdish RTL text
        // Type 222: Center for image questions
        "max-w-4xl mx-auto": quizType === "222"
      })}>
        <div className={cn({
          "space-y-3": quizType === "222", // Tighter spacing for image questions
          "space-y-4": quizType !== "222"
        })}>
          {question.options.map((option, index) => (
            <button 
              key={index} 
              onClick={() => handleOptionClick(index)} 
              onMouseEnter={() => setHoveredOption(index)} 
              onMouseLeave={() => setHoveredOption(null)} 
              className={cn("rounded-xl transition-all duration-300 focus:outline-none transform-gpu bg-gradient-answer", getBoxWidth(), getBoxPadding(), {
                "shadow-answer-hover scale-105 bg-gradient-to-r from-blue-500 to-purple-600 text-white": hoveredOption === index,
                "shadow-answer-box hover:shadow-3d-light": hoveredOption !== index,
                "text-right": isKurdish,
                "text-left": !isKurdish
              })}
            >
              <div className={cn("flex items-center space-x-4", {
                "flex-row-reverse space-x-reverse": isKurdish
              })}>
                <div className={cn("rounded-full flex items-center justify-center text-base font-bold transition-all duration-300", {
                  "bg-white text-primary shadow-3d-light": hoveredOption === index,
                  "bg-primary/10 text-primary": hoveredOption !== index,
                  "w-8 h-8": quizType === "222", // Smaller circle for image questions
                  "w-10 h-10": quizType !== "222"
                })}>
                  {String.fromCharCode(65 + index)}
                </div>
                <span className={cn("font-medium transition-colors duration-300", {
                  "text-white": hoveredOption === index,
                  "text-foreground": hoveredOption !== index,
                  "text-xl": quizType === "222", // Standard size for image questions
                  "text-lg": quizType !== "222" // Standard size for regular questions
                })}>
                  {option}
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}