export interface Question {
  id: number;
  title: string;
  image?: string;
  options: string[];
  correctAnswer: number;
}

export interface QuizResult {
  totalQuestions: number;
  correctAnswers: number;
  score: number;
  timeSpent: number;
}

export interface QuizState {
  currentQuestion: number;
  answers: number[];
  timeRemaining: number;
  isCompleted: boolean;
}