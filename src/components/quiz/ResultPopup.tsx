import { useEffect } from "react";
import { X } from "lucide-react";

interface ResultPopupProps {
  score: number;
  isOpen: boolean;
  onClose: () => void;
}

export function ResultPopup({ score, isOpen, onClose }: ResultPopupProps) {
  const isPassed = score >= 80;

  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        onClose();
      }, 1700);
      return () => clearTimeout(timer);
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-8 text-center relative max-w-md mx-4">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
        >
          <X size={20} />
        </button>
        
        {isPassed ? (
          <div className="space-y-4">
            <div className="text-6xl">😊</div>
            <div className="text-3xl font-bold text-green-600">دەرچوو</div>
            <div className="text-lg text-gray-600">پیرۆزە لە تاقیکردنەوەکە دەرچوویت</div>
            <div className="text-8xl">🎉</div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="text-6xl">😢</div>
            <div className="text-2xl font-bold text-red-600">دووبارە هەوڵبدەرەوە</div>
          </div>
        )}
      </div>
    </div>
  );
}