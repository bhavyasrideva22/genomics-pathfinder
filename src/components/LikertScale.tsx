import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface LikertScaleProps {
  question: string;
  value: number | null;
  onChange: (value: number) => void;
  labels?: string[];
}

export const LikertScale = ({ question, value, onChange, labels }: LikertScaleProps) => {
  const defaultLabels = [
    'Strongly Disagree',
    'Disagree', 
    'Neutral',
    'Agree',
    'Strongly Agree'
  ];

  const scaleLabels = labels || defaultLabels;

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium text-foreground">{question}</h3>
      
      <div className="space-y-3">
        {scaleLabels.map((label, index) => (
          <Button
            key={index}
            variant={value === index + 1 ? "default" : "outline"}
            className={cn(
              "w-full justify-start h-auto p-4 text-left",
              value === index + 1 && "bg-primary text-primary-foreground shadow-elegant"
            )}
            onClick={() => onChange(index + 1)}
          >
            <div className="flex items-center space-x-3">
              <div className={cn(
                "w-4 h-4 rounded-full border-2",
                value === index + 1 
                  ? "bg-primary-foreground border-primary-foreground" 
                  : "border-muted-foreground"
              )} />
              <div>
                <div className="font-medium">{label}</div>
                <div className="text-sm text-muted-foreground">
                  ({index + 1}/5)
                </div>
              </div>
            </div>
          </Button>
        ))}
      </div>
    </div>
  );
};