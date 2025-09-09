import { ReactNode } from 'react';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

interface AssessmentLayoutProps {
  children: ReactNode;
  currentStep: number;
  totalSteps: number;
  title: string;
}

export const AssessmentLayout = ({ children, currentStep, totalSteps, title }: AssessmentLayoutProps) => {
  const progressPercentage = (currentStep / totalSteps) * 100;

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">
              Genomics Data Analyst Assessment
            </h1>
            <p className="text-muted-foreground">
              Discover if this cutting-edge career path is right for you
            </p>
          </div>

          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-muted-foreground">
                Step {currentStep} of {totalSteps}
              </span>
              <span className="text-sm text-muted-foreground">
                {Math.round(progressPercentage)}% Complete
              </span>
            </div>
            <Progress value={progressPercentage} className="h-2" />
          </div>

          {/* Current Section Title */}
          <Card className="p-6 mb-6 shadow-card bg-gradient-card">
            <h2 className="text-2xl font-semibold text-center text-foreground">
              {title}
            </h2>
          </Card>

          {/* Content */}
          <div className="animate-fade-in">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};