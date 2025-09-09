import { Question } from '@/types/assessment';

export const questions: Question[] = [
  // Psychometric Section - Interest Scale
  {
    id: 'p1',
    type: 'likert',
    question: 'How excited are you about uncovering insights from genetic data that could lead to medical breakthroughs?',
    section: 'psychometric',
    category: 'interest',
    weight: 1.2
  },
  {
    id: 'p2',
    type: 'likert',
    question: 'I find the idea of working with DNA sequencing data fascinating and intellectually stimulating.',
    section: 'psychometric',
    category: 'interest',
    weight: 1.0
  },
  {
    id: 'p3',
    type: 'likert',
    question: 'I enjoy spending hours analyzing complex datasets to find meaningful patterns.',
    section: 'psychometric',
    category: 'personality',
    weight: 1.1
  },
  {
    id: 'p4',
    type: 'likert',
    question: 'I am comfortable working with sensitive genetic information while maintaining strict ethical standards.',
    section: 'psychometric',
    category: 'personality',
    weight: 1.3
  },
  {
    id: 'p5',
    type: 'multiple-choice',
    question: 'What motivates you most about working in genomics?',
    options: [
      'Contributing to scientific discovery and human health',
      'Working with cutting-edge technology and data',
      'High salary potential and job security',
      'Prestige and recognition in the field'
    ],
    section: 'psychometric',
    category: 'motivation',
    weight: 1.2
  },

  // Technical Section
  {
    id: 't1',
    type: 'multiple-choice',
    question: 'Which of the following best describes a SNP (Single Nucleotide Polymorphism)?',
    options: [
      'A variation in a single nucleotide at the same position in DNA among individuals',
      'A type of protein found in cell nuclei',
      'A method for sequencing DNA',
      'A statistical test for genetic associations'
    ],
    section: 'technical',
    category: 'biology-knowledge',
    weight: 1.0
  },
  {
    id: 't2',
    type: 'multiple-choice',
    question: 'In Python, which library is most commonly used for data manipulation in genomics?',
    options: [
      'pandas',
      'matplotlib',
      'requests',
      'django'
    ],
    section: 'technical',
    category: 'programming',
    weight: 1.1
  },
  {
    id: 't3',
    type: 'multiple-choice',
    question: 'What is the purpose of adjusting for multiple comparisons (e.g., FDR correction) in genomics studies?',
    options: [
      'To control the rate of false positive discoveries when testing many hypotheses',
      'To increase the statistical power of the analysis',
      'To reduce the computational time required',
      'To improve the quality of DNA sequencing'
    ],
    section: 'technical',
    category: 'statistics',
    weight: 1.2
  },
  {
    id: 't4',
    type: 'multiple-choice',
    question: 'Which file format is standard for storing DNA sequence alignment data?',
    options: [
      'SAM/BAM',
      'JPEG',
      'CSV',
      'PDF'
    ],
    section: 'technical',
    category: 'technical-knowledge',
    weight: 1.0
  },

  // WISCAR Framework
  {
    id: 'w1',
    type: 'likert',
    question: 'I have a strong drive to persist through challenging problems, even when progress is slow.',
    section: 'wiscar',
    category: 'will',
    weight: 1.0
  },
  {
    id: 'w2',
    type: 'likert',
    question: 'I am genuinely curious about how genetic variations influence human traits and diseases.',
    section: 'wiscar',
    category: 'interest',
    weight: 1.1
  },
  {
    id: 'w3',
    type: 'likert',
    question: 'I have solid programming skills and feel comfortable learning new technical tools.',
    section: 'wiscar',
    category: 'skill',
    weight: 1.2
  },
  {
    id: 'w4',
    type: 'likert',
    question: 'I excel at logical reasoning and can easily spot patterns in complex data.',
    section: 'wiscar',
    category: 'cognitive',
    weight: 1.1
  },
  {
    id: 'w5',
    type: 'likert',
    question: 'I actively seek feedback and adapt quickly when learning new concepts or skills.',
    section: 'wiscar',
    category: 'ability',
    weight: 1.0
  },
  {
    id: 'w6',
    type: 'multiple-choice',
    question: 'How comfortable would you be working in a lab environment analyzing genomic samples daily?',
    options: [
      'Very comfortable - I enjoy detailed, precision-oriented work',
      'Somewhat comfortable - I could adapt to this environment',
      'Neutral - I have no strong preference',
      'Somewhat uncomfortable - I prefer more variety in my work',
      'Very uncomfortable - This environment does not suit me'
    ],
    section: 'wiscar',
    category: 'real-world',
    weight: 1.1
  }
];

export const getSectionQuestions = (section: string) => {
  return questions.filter(q => q.section === section);
};

export const getTotalQuestions = () => questions.length;