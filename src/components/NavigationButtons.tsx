import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface NavigationButtonsProps {
  onPrevious?: () => void;
  onNext?: () => void;
  onComplete?: () => void;
  canProceed: boolean;
  isLastStep: boolean;
  isFirstStep: boolean;
}

export const NavigationButtons = ({
  onPrevious,
  onNext,
  onComplete,
  canProceed,
  isLastStep,
  isFirstStep
}: NavigationButtonsProps) => {
  return (
    <div className="flex justify-between items-center mt-8">
      {!isFirstStep ? (
        <Button 
          variant="outline" 
          onClick={onPrevious}
          className="flex items-center space-x-2"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Previous</span>
        </Button>
      ) : (
        <div />
      )}

      {isLastStep ? (
        <Button 
          onClick={onComplete}
          disabled={!canProceed}
          className="bg-gradient-hero text-primary-foreground shadow-elegant flex items-center space-x-2"
        >
          <span>Complete Assessment</span>
          <ChevronRight className="w-4 h-4" />
        </Button>
      ) : (
        <Button 
          onClick={onNext}
          disabled={!canProceed}
          className="bg-gradient-hero text-primary-foreground shadow-elegant flex items-center space-x-2"
        >
          <span>Next</span>
          <ChevronRight className="w-4 h-4" />
        </Button>
      )}
    </div>
  );
};