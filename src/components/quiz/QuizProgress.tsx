import { cn } from "@/lib/utils";
interface QuizProgressProps {
  totalQuestions: number;
  currentQuestion: number;
  answeredQuestions: number[];
}
export function QuizProgress({
  totalQuestions,
  currentQuestion,
  answeredQuestions
}: QuizProgressProps) {
  const circles = Array.from({
    length: totalQuestions
  }, (_, index) => index + 1);
  return <div className="flex flex-col items-center mb-8">
      
      <div className="grid grid-cols-5 gap-3">
        {circles.map(questionNum => {
        const isAnswered = answeredQuestions.includes(questionNum - 1);
        const isCurrent = currentQuestion === questionNum - 1;
        const formattedNum = questionNum < 10 ? `0${questionNum}` : questionNum.toString();
        return <div key={questionNum} className={cn("w-12 h-12 rounded-full flex items-center justify-center font-bold transition-all duration-300", {
          "bg-gray-500 text-white border-2 border-gray-400": isAnswered,
          "bg-red-500 text-white ring-4 ring-red-500/20": isCurrent && !isAnswered,
          "bg-gray-100 text-white border-2 border-gray-200": !isAnswered && !isCurrent
        })} style={{ fontSize: '20px' }}>
              {formattedNum}
            </div>;
      })}
      </div>
    </div>;
}