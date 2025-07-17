
import { QuizResult, Question } from "@/types/quiz";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Trophy, RotateCcw, Target, Clock, Check, X } from "lucide-react";

interface QuizResultsProps {
  result: QuizResult;
  onRestart: () => void;
  userAnswers: number[];
  questions: Question[];
}

export function QuizResults({
  result,
  onRestart,
  userAnswers,
  questions
}: QuizResultsProps) {
  const score = result.correctAnswers * 4; // Each question worth 4 points out of 100
  const percentage = Math.round(result.correctAnswers / result.totalQuestions * 100);
  const minutes = Math.floor(result.timeSpent / 60);
  const seconds = result.timeSpent % 60;

  const getPerformanceMessage = () => {
    if (score >= 90) return "🎉 پیرۆزە! ئەنجامێکی نایابت بەدەست هێناوە!";
    if (score >= 80) return "😊 زۆر باشە! ئەنجامێکی باشت هەیە!";
    if (score >= 70) return "👍 باشە، بەڵام دەتوانیت باشتر بکەیت!";
    if (score >= 60) return "📚 پێویستە زیاتر بخوێنیتەوە بۆ باشترکردن!";
    return "💪 هەوڵبدە دووبارە! دەتوانیت زۆر باشتر بکەیت!";
  };

  const getPerformanceColor = () => {
    if (score >= 80) return "text-quiz-success";
    if (score >= 60) return "text-yellow-600";
    return "text-quiz-danger";
  };

  return (
    <div className="w-full max-w-4xl mx-auto animate-slide-in">
      <Card className="bg-gradient-card shadow-card border-0 p-8 text-center">
        {/* Trophy Icon */}
        <div className="mb-8 flex justify-center">
          <div className="w-24 h-24 rounded-full bg-gradient-primary shadow-3d-medium flex items-center justify-center">
            <Trophy className="w-12 h-12 text-white" />
          </div>
        </div>

        {/* Results Title */}
        <h1 className="text-4xl font-bold text-foreground mb-4">تاقیکردنەوە کۆتایی هات</h1>
        
        <p className={`text-xl font-semibold mb-8 ${getPerformanceColor()}`}>
          {getPerformanceMessage()}
        </p>

        {/* Score Display */}
        <div className="mb-10">
          <div className="bg-gradient-primary rounded-2xl p-8 shadow-3d-strong text-white mb-4">
            <div className="text-6xl font-bold mb-2">
              {score} / 100
            </div>
            <p className="text-xl opacity-95">ئەنجامی کۆتایی</p>
            <p className="text-lg opacity-80 mt-2">
              ({result.correctAnswers} / {result.totalQuestions} وەڵامی ڕاست)
            </p>
          </div>
        </div>

        {/* Detailed Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="flex flex-col items-center p-6 bg-gradient-answer rounded-xl shadow-3d-light">
            <Target className="w-10 h-10 text-primary mb-3" />
            <div className="text-3xl font-bold text-foreground">
              {result.correctAnswers}
            </div>
            <div className="text-base text-muted-foreground font-medium">وەڵامە دروستەکان</div>
          </div>

          <div className="flex flex-col items-center p-6 bg-gradient-answer rounded-xl shadow-3d-light">
            <div className="w-10 h-10 rounded-full bg-destructive/10 flex items-center justify-center mb-3">
              <span className="text-destructive font-bold">✗</span>
            </div>
            <div className="text-3xl font-bold text-foreground">
              {result.totalQuestions - result.correctAnswers}
            </div>
            <div className="text-base text-muted-foreground font-medium">وەڵامە هەڵەکان</div>
          </div>

          <div className="flex flex-col items-center p-6 bg-gradient-answer rounded-xl shadow-3d-light">
            <Clock className="w-10 h-10 text-primary mb-3" />
            <div className="text-3xl font-bold text-foreground">
              {minutes}:{seconds.toString().padStart(2, '0')}
            </div>
            <div className="text-base text-muted-foreground font-medium">کاتی خایەنراو</div>
          </div>
        </div>

        {/* Detailed Answer Report */}
        <div className="mb-10">
          <h2 className="text-2xl font-bold text-foreground mb-6 text-left">ڕاپۆرتی وەڵامەکان</h2>
          <div className="space-y-4 max-h-96 overflow-y-auto">
            {questions.map((question, index) => {
              const userAnswer = userAnswers[index];
              const isCorrect = userAnswer === question.correctAnswer;
              const wasAnswered = userAnswer !== -1 && userAnswer !== undefined;

              return (
                <Card key={question.id} className="p-4 bg-gradient-answer border-0">
                  <div className="flex items-start space-x-4">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      isCorrect ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'
                    }`}>
                      {isCorrect ? <Check className="w-5 h-5" /> : <X className="w-5 h-5" />}
                    </div>
                    
                    <div className="flex-1">
                      <h3 className="font-semibold text-foreground mb-2">
                        پرسیار {index + 1}: {question.title}
                      </h3>
                      
                      <div className="space-y-2 text-lg">
                        {wasAnswered ? (
                          <div className={`p-2 rounded ${
                            isCorrect ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'
                          }`}>
                            <span className="font-medium mx-[9px] px-0 py-0 my-[5px] text-lg">وەڵامی تۆ:</span>
                            {question.options[userAnswer]}
                            {isCorrect ? ' ✓' : ' ✗'}
                          </div>
                        ) : (
                          <div className="p-2 rounded bg-yellow-50 text-yellow-800">
                            <span className="font-medium text-lg">هیچ وەڵامێک نەدراوە</span>
                          </div>
                        )}
                        
                        {!isCorrect && (
                          <div className="p-2 rounded bg-green-50 text-green-800">
                            <span className="font-medium my-[4px] mx-[9px] text-lg">وەڵامی ڕاست:</span>
                            {question.options[question.correctAnswer]}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Restart Button */}
        <Button 
          onClick={onRestart} 
          size="lg" 
          className="w-full md:w-auto px-10 py-4 text-lg bg-gradient-primary hover:shadow-3d-medium transition-all duration-300 transform hover:scale-105"
        >
          <RotateCcw className="w-6 h-6 mr-3" />
          دووبارە تاقی بکەرەوە
        </Button>
      </Card>
    </div>
  );
}
