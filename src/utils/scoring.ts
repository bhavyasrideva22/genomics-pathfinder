import { AssessmentAnswer, AssessmentResults } from '@/types/assessment';
import { questions } from '@/data/questions';

export const calculateResults = (answers: AssessmentAnswer[]): AssessmentResults => {
  // Convert answers to a map for easier lookup
  const answerMap = new Map(answers.map(a => [a.questionId, a.value]));

  // Calculate section scores
  const psychologicalFit = calculateSectionScore(answerMap, 'psychometric');
  const technicalReadiness = calculateSectionScore(answerMap, 'technical');
  
  // Calculate WISCAR scores
  const wiscarScores = {
    will: calculateCategoryScore(answerMap, 'will'),
    interest: calculateCategoryScore(answerMap, 'interest'),
    skill: calculateCategoryScore(answerMap, 'skill'),
    cognitive: calculateCategoryScore(answerMap, 'cognitive'),
    ability: calculateCategoryScore(answerMap, 'ability'),
    realWorld: calculateCategoryScore(answerMap, 'real-world')
  };

  // Calculate overall score
  const overallScore = (
    psychologicalFit * 0.3 + 
    technicalReadiness * 0.4 + 
    (Object.values(wiscarScores).reduce((sum, score) => sum + score, 0) / 6) * 0.3
  );

  // Determine recommendation
  let recommendation: 'yes' | 'maybe' | 'no' = 'no';
  if (overallScore >= 75) recommendation = 'yes';
  else if (overallScore >= 50) recommendation = 'maybe';

  // Generate insights and next steps
  const insights = generateInsights(psychologicalFit, technicalReadiness, wiscarScores, overallScore);
  const nextSteps = generateNextSteps(recommendation, psychologicalFit, technicalReadiness);

  return {
    psychologicalFit,
    technicalReadiness,
    wiscarScores,
    overallScore,
    recommendation,
    insights,
    nextSteps
  };
};

const calculateSectionScore = (answerMap: Map<string, number | string>, section: string): number => {
  const sectionQuestions = questions.filter(q => q.section === section);
  let totalWeightedScore = 0;
  let totalWeight = 0;

  sectionQuestions.forEach(question => {
    const answer = answerMap.get(question.id);
    if (answer !== undefined) {
      let score = 0;
      if (typeof answer === 'number') {
        score = (answer / 5) * 100; // Convert 1-5 scale to 0-100
      } else {
        // Handle multiple choice scoring
        score = getMultipleChoiceScore(question.id, answer as string);
      }
      totalWeightedScore += score * question.weight;
      totalWeight += question.weight;
    }
  });

  return totalWeight > 0 ? totalWeightedScore / totalWeight : 0;
};

const calculateCategoryScore = (answerMap: Map<string, number | string>, category: string): number => {
  const categoryQuestions = questions.filter(q => q.category === category);
  let totalWeightedScore = 0;
  let totalWeight = 0;

  categoryQuestions.forEach(question => {
    const answer = answerMap.get(question.id);
    if (answer !== undefined) {
      let score = 0;
      if (typeof answer === 'number') {
        score = (answer / 5) * 100;
      } else {
        score = getMultipleChoiceScore(question.id, answer as string);
      }
      totalWeightedScore += score * question.weight;
      totalWeight += question.weight;
    }
  });

  return totalWeight > 0 ? totalWeightedScore / totalWeight : 0;
};

const getMultipleChoiceScore = (questionId: string, answer: string): number => {
  // Define scoring for specific multiple choice questions
  const scoringRules: Record<string, Record<string, number>> = {
    'p5': {
      'Contributing to scientific discovery and human health': 100,
      'Working with cutting-edge technology and data': 85,
      'High salary potential and job security': 50,
      'Prestige and recognition in the field': 30
    },
    't1': {
      'A variation in a single nucleotide at the same position in DNA among individuals': 100,
      'A type of protein found in cell nuclei': 0,
      'A method for sequencing DNA': 25,
      'A statistical test for genetic associations': 25
    },
    't2': {
      'pandas': 100,
      'matplotlib': 50,
      'requests': 25,
      'django': 0
    },
    't3': {
      'To control the rate of false positive discoveries when testing many hypotheses': 100,
      'To increase the statistical power of the analysis': 25,
      'To reduce the computational time required': 0,
      'To improve the quality of DNA sequencing': 0
    },
    't4': {
      'SAM/BAM': 100,
      'JPEG': 0,
      'CSV': 25,
      'PDF': 0
    },
    'w6': {
      'Very comfortable - I enjoy detailed, precision-oriented work': 100,
      'Somewhat comfortable - I could adapt to this environment': 75,
      'Neutral - I have no strong preference': 50,
      'Somewhat uncomfortable - I prefer more variety in my work': 25,
      'Very uncomfortable - This environment does not suit me': 0
    }
  };

  return scoringRules[questionId]?.[answer] ?? 50; // Default to neutral score
};

const generateInsights = (
  psychological: number, 
  technical: number, 
  wiscar: any, 
  overall: number
): string[] => {
  const insights = [];

  if (psychological >= 80) {
    insights.push("Your passion for genomics and strong personality fit make you an excellent candidate for this field.");
  } else if (psychological >= 60) {
    insights.push("You show good interest in genomics, with some areas to strengthen your psychological readiness.");
  } else {
    insights.push("Consider exploring your motivations and interest in genomics more deeply before committing to this path.");
  }

  if (technical >= 80) {
    insights.push("Your technical foundation is strong and ready for advanced genomics work.");
  } else if (technical >= 60) {
    insights.push("Your technical skills are developing well, with targeted learning needed in specific areas.");
  } else {
    insights.push("Focus on building foundational technical skills in programming, statistics, and biology.");
  }

  if (wiscar.interest >= 80 && wiscar.cognitive >= 80) {
    insights.push("Your combination of genuine interest and strong analytical thinking is ideal for genomics data analysis.");
  }

  return insights;
};

const generateNextSteps = (
  recommendation: 'yes' | 'maybe' | 'no',
  psychological: number,
  technical: number
): string[] => {
  const steps = [];

  if (recommendation === 'yes') {
    steps.push("Start building a portfolio with genomics projects using real datasets");
    steps.push("Explore advanced courses in bioinformatics and statistical genomics");
    steps.push("Seek internships or research opportunities in genomics labs");
    steps.push("Connect with professionals in the field through networking events");
  } else if (recommendation === 'maybe') {
    if (technical < 60) {
      steps.push("Strengthen programming skills in Python and R");
      steps.push("Take courses in statistics and biostatistics");
      steps.push("Learn about Linux/Unix command line tools used in bioinformatics");
    }
    if (psychological < 60) {
      steps.push("Shadow a genomics data analyst to understand daily responsibilities");
      steps.push("Participate in genomics workshops or conferences");
      steps.push("Read research papers in genomics to gauge your sustained interest");
    }
    steps.push("Complete online genomics courses to test your commitment");
  } else {
    steps.push("Consider related fields like general data science or healthcare analytics");
    steps.push("Explore laboratory-focused roles in genomics or clinical diagnostics");
    steps.push("Build foundational skills before reassessing this career path");
  }

  return steps;
};