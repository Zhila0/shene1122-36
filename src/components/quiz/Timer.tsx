import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
interface TimerProps {
  timeRemaining: number;
  onTimeUp: () => void;
  isPaused?: boolean;
  questionNumber: number;
}
export function Timer({
  timeRemaining,
  onTimeUp,
  isPaused = false,
  questionNumber
}: TimerProps) {
  const [displayTime, setDisplayTime] = useState(60);
  useEffect(() => {
    setDisplayTime(60);
  }, [questionNumber]);
  useEffect(() => {
    if (isPaused || displayTime <= 0) return;
    const timer = setInterval(() => {
      setDisplayTime(prev => {
        if (prev <= 1) {
          onTimeUp();
          return 60;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [displayTime, onTimeUp, isPaused]);
  const progress = displayTime / 60 * 100;
  const circumference = 2 * Math.PI * 40; // radius = 40
  const strokeDashoffset = circumference - progress / 100 * circumference;
  const getTimerColor = () => {
    if (displayTime <= 10) return "timer-danger";
    if (displayTime <= 15) return "timer-orange";
    if (displayTime <= 20) return "timer-orange"; // Changed from timer-warning to timer-orange
    return "timer-normal";
  };
  const colorClass = getTimerColor();
  return <div className="flex flex-col items-center mb-4">
      <div className="relative w-32 h-32">
        {/* Background circle */}
        <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="40" fill="hsl(var(--foreground))" stroke="none" />
          {/* Stable yellow outline */}
          <circle cx="50" cy="50" r="40" fill="transparent" stroke="hsl(45, 93%, 47%)" strokeWidth="8" strokeLinecap="round" />
          {/* Dynamic colored progress */}
          <circle cx="50" cy="50" r="40" fill="transparent" stroke={`hsl(var(--${colorClass}))`} strokeWidth="6" strokeLinecap="round" strokeDasharray={circumference} strokeDashoffset={strokeDashoffset} className={cn("transition-all duration-1000 ease-linear", {
          "animate-pulse": displayTime <= 10
        })} />
        </svg>
        
        {/* Timer text */}
        <div className="absolute inset-0 flex items-center justify-center mx-0">
          <span className="text-6xl font-bold text-white">
            {displayTime}
          </span>
        </div>
      </div>
      
      
    </div>;
}