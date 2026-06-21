import type { QuizQuestion, ReadinessLevel } from '@/types/assessment';

export const quizQuestions: QuizQuestion[] = [
  {
    id: 1,
    question: 'What is your current trading experience level?',
    options: [
      { text: 'Complete beginner - just getting started', score: 1 },
      { text: 'Some experience - traded for 1-2 years', score: 2 },
      { text: 'Intermediate - 2-5 years of trading', score: 3 },
      { text: 'Experienced - 5+ years with consistent results', score: 4 },
    ],
  },
  {
    id: 2,
    question: 'Do you currently have a documented trading strategy?',
    options: [
      { text: 'No, I trade based on tips and news', score: 1 },
      { text: 'I have a rough idea but nothing written down', score: 2 },
      { text: 'Yes, I have basic entry/exit rules documented', score: 3 },
      { text: 'Yes, fully documented with risk management rules', score: 4 },
    ],
  },
  {
    id: 3,
    question: 'How familiar are you with technical indicators?',
    options: [
      { text: 'Not familiar at all', score: 1 },
      { text: 'Know basic indicators like RSI, MACD', score: 2 },
      { text: 'Comfortable using multiple indicators together', score: 3 },
      { text: 'Expert - can create custom indicator logic', score: 4 },
    ],
  },
  {
    id: 4,
    question: 'What is your primary goal for algo trading?',
    options: [
      { text: 'Just curious to learn more about it', score: 1 },
      { text: 'Want to reduce emotional trading decisions', score: 2 },
      { text: 'Looking to automate a profitable manual strategy', score: 3 },
      { text: 'Scale up trading with multiple strategies', score: 4 },
    ],
  },
  {
    id: 5,
    question: 'What trading capital are you planning to allocate for algo trading?',
    options: [
      { text: 'Less than \u20B91 Lakh', score: 1 },
      { text: '\u20B91-5 Lakhs', score: 2 },
      { text: '\u20B95-25 Lakhs', score: 3 },
      { text: 'More than \u20B925 Lakhs', score: 4 },
    ],
  },
];

export function getReadinessLevel(percentage: number): ReadinessLevel {
  if (percentage >= 80) {
    return {
      level: 'Expert Ready',
      color: 'text-pine',
      bgGradient: 'bg-pine',
      icon: 'Rocket',
      recommendations: [
        "You're well-prepared for advanced algo trading strategies",
        'Consider scaling with multiple automated systems',
        'Focus on portfolio-level risk management',
        'Explore high-frequency or options strategies',
      ],
    };
  } else if (percentage >= 60) {
    return {
      level: 'Well Prepared',
      color: 'text-pine',
      bgGradient: 'bg-pine',
      icon: 'TrendingUp',
      recommendations: [
        'You have a solid foundation for algo trading',
        'Start with automating your existing strategy',
        'Backtest thoroughly before going live',
        'Consider starting with paper trading first',
      ],
    };
  } else if (percentage >= 40) {
    return {
      level: 'Getting There',
      color: 'text-ink',
      bgGradient: 'bg-ink',
      icon: 'Sprout',
      recommendations: [
        'Focus on documenting your trading rules clearly',
        'Learn more about technical indicators',
        'Start with simple automation like alerts',
        'Consider our consultation to build a roadmap',
      ],
    };
  } else {
    return {
      level: 'Just Starting',
      color: 'text-ink',
      bgGradient: 'bg-ink',
      icon: 'GraduationCap',
      recommendations: [
        'Begin with learning trading fundamentals',
        'Paper trade to develop a consistent strategy',
        'Study technical analysis basics',
        'Our team can guide you through the learning process',
      ],
    };
  }
}
