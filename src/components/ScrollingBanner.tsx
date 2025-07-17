export function ScrollingBanner() {
  return (
    <div className="w-full bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 overflow-hidden h-10 flex items-center">
      <div className="animate-scroll-ultra-slow whitespace-nowrap text-white font-semibold text-lg flex items-center space-x-24">
        <span className="flex items-center space-x-2">
          <span>🚗</span>
          <span>نوسینگەی شۆفێری شێنێ 07507818115</span>
          <span>🚗</span>
        </span>
        <span className="flex items-center space-x-2">
          <span className="text-lg">🔴🟡🟢</span>
        </span>
        <span className="flex items-center space-x-2">
          <span>🚗</span>
          <span>نوسینگەی شۆفێری شێنێ 07507818115</span>
          <span>🚗</span>
        </span>
        <span className="flex items-center space-x-2">
          <span className="text-lg">🔴🟡🟢</span>
        </span>
        <span className="flex items-center space-x-2">
          <span>🚗</span>
          <span>نوسینگەی شۆفێری شێنێ 07507818115</span>
          <span>🚗</span>
        </span>
      </div>
    </div>
  );
}