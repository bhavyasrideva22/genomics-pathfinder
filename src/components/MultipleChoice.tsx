import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface MultipleChoiceProps {
  question: string;
  options: string[];
  value: string | null;
  onChange: (value: string) => void;
}

export const MultipleChoice = ({ question, options, value, onChange }: MultipleChoiceProps) => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium text-foreground">{question}</h3>
      
      <div className="space-y-3">
        {options.map((option, index) => (
          <Button
            key={index}
            variant={value === option ? "default" : "outline"}
            className={cn(
              "w-full justify-start h-auto p-4 text-left",
              value === option && "bg-primary text-primary-foreground shadow-elegant"
            )}
            onClick={() => onChange(option)}
          >
            <div className="flex items-center space-x-3">
              <div className={cn(
                "w-4 h-4 rounded-full border-2",
                value === option 
                  ? "bg-primary-foreground border-primary-foreground" 
                  : "border-muted-foreground"
              )} />
              <span>{option}</span>
            </div>
          </Button>
        ))}
      </div>
    </div>
  );
};