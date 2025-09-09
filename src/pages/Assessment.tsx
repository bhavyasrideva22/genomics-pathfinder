import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AssessmentLayout } from '@/components/AssessmentLayout';
import { QuestionCard } from '@/components/QuestionCard';
import { LikertScale } from '@/components/LikertScale';
import { MultipleChoice } from '@/components/MultipleChoice';
import { NavigationButtons } from '@/components/NavigationButtons';
import { questions, getSectionQuestions, getTotalQuestions } from '@/data/questions';
import { AssessmentAnswer } from '@/types/assessment';
import { calculateResults } from '@/utils/scoring';

export const Assessment = () => {
  const navigate = useNavigate();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<AssessmentAnswer[]>([]);

  const currentQuestion = questions[currentQuestionIndex];
  const totalQuestions = getTotalQuestions();

  // Get current section info
  const getSectionInfo = () => {
    if (currentQuestionIndex < 5) return { name: 'Psychological Fit Assessment', step: 1 };
    if (currentQuestionIndex < 9) return { name: 'Technical Knowledge & Aptitude', step: 2 };
    return { name: 'WISCAR Framework Analysis', step: 3 };
  };

  const sectionInfo = getSectionInfo();

  const getCurrentAnswer = () => {
    return answers.find(a => a.questionId === currentQuestion.id)?.value ?? null;
  };

  const handleAnswer = (value: number | string) => {
    const newAnswer: AssessmentAnswer = {
      questionId: currentQuestion.id,
      value,
      section: currentQuestion.section
    };

    setAnswers(prev => {
      const filtered = prev.filter(a => a.questionId !== currentQuestion.id);
      return [...filtered, newAnswer];
    });
  };

  const handleNext = () => {
    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  };

  const handleComplete = () => {
    const results = calculateResults(answers);
    
    // Store results in localStorage for the results page
    localStorage.setItem('assessmentResults', JSON.stringify(results));
    localStorage.setItem('assessmentAnswers', JSON.stringify(answers));
    
    navigate('/results');
  };

  const canProceed = getCurrentAnswer() !== null;
  const isFirstStep = currentQuestionIndex === 0;
  const isLastStep = currentQuestionIndex === totalQuestions - 1;

  return (
    <AssessmentLayout
      currentStep={sectionInfo.step}
      totalSteps={3}
      title={sectionInfo.name}
    >
      <QuestionCard
        questionNumber={currentQuestionIndex + 1}
        totalQuestions={totalQuestions}
      >
        {currentQuestion.type === 'likert' ? (
          <LikertScale
            question={currentQuestion.question}
            value={getCurrentAnswer() as number | null}
            onChange={handleAnswer}
          />
        ) : (
          <MultipleChoice
            question={currentQuestion.question}
            options={currentQuestion.options || []}
            value={getCurrentAnswer() as string | null}
            onChange={handleAnswer}
          />
        )}
      </QuestionCard>

      <NavigationButtons
        onPrevious={handlePrevious}
        onNext={handleNext}
        onComplete={handleComplete}
        canProceed={canProceed}
        isFirstStep={isFirstStep}
        isLastStep={isLastStep}
      />
    </AssessmentLayout>
  );
};