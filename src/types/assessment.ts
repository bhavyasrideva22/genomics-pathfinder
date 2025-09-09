export interface AssessmentAnswer {
  questionId: string;
  value: number | string;
  section: string;
}

export interface AssessmentResults {
  psychologicalFit: number;
  technicalReadiness: number;
  wiscarScores: {
    will: number;
    interest: number;
    skill: number;
    cognitive: number;
    ability: number;
    realWorld: number;
  };
  overallScore: number;
  recommendation: 'yes' | 'maybe' | 'no';
  insights: string[];
  nextSteps: string[];
}

export interface Question {
  id: string;
  type: 'likert' | 'multiple-choice' | 'scenario';
  question: string;
  options?: string[];
  section: 'psychometric' | 'technical' | 'wiscar';
  category: string;
  weight: number;
}