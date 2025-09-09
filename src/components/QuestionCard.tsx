import { ReactNode } from 'react';
import { Card } from '@/components/ui/card';

interface QuestionCardProps {
  children: ReactNode;
  questionNumber?: number;
  totalQuestions?: number;
}

export const QuestionCard = ({ children, questionNumber, totalQuestions }: QuestionCardProps) => {
  return (
    <Card className="p-6 mb-6 shadow-card bg-gradient-card border border-border">
      {questionNumber && totalQuestions && (
        <div className="flex justify-between items-center mb-4">
          <div className="text-sm text-muted-foreground">
            Question {questionNumber} of {totalQuestions}
          </div>
        </div>
      )}
      <div className="space-y-4">
        {children}
      </div>
    </Card>
  );
};