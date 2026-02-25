export interface QuizOption {
  text: string;
  score: number;
}

export interface QuizQuestion {
  id: number;
  question: string;
  options: QuizOption[];
}

export interface QuizAnswer {
  optionIndex: number;
  score: number;
}

export interface ReadinessLevel {
  level: string;
  color: string;
  bgGradient: string;
  icon: string;
  recommendations: string[];
}

export interface ConsultationFormData {
  name: string;
  email: string;
  phone?: string;
}
