export interface QuizQuestion {
  question: string;
  options: string[];
  values: number[];
  category: string;
}

export interface QuizResult {
  score: number;
  percentage: number;
  tier: string;
  message: string;
  recommendation: string;
  nextSteps: string[];
  badgeColor: 'red' | 'orange' | 'green';
}

export interface WaitlistFormData {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  subject: string;
  grade: string;
  school: string;
  newsletter: boolean;
  community: boolean;
  complianceScore?: number;
  complianceTier?: string;
  timestamp?: string;
}
