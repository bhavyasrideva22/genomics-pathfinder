import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Dna, 
  BarChart3, 
  Brain, 
  Target, 
  Clock, 
  Users,
  ChevronRight,
  CheckCircle
} from 'lucide-react';

const Index = () => {
  const navigate = useNavigate();

  const handleStartAssessment = () => {
    navigate('/assessment');
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative py-20 px-4 text-center">
        <div className="container mx-auto max-w-6xl">
          <div className="mb-8">
            <Badge className="mb-4 bg-scientific text-scientific-foreground">
              Career Assessment Platform
            </Badge>
            <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6 animate-fade-in">
              Should I Become a{' '}
              <span className="bg-gradient-hero bg-clip-text text-transparent">
                Genomics Data Analyst?
              </span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8 animate-slide-up">
              Discover if you're suited for this cutting-edge career through our comprehensive 
              psychological, technical, and aptitude assessment. Get personalized insights and 
              actionable next steps.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Button
              onClick={handleStartAssessment}
              size="lg"
              className="bg-gradient-hero text-primary-foreground shadow-elegant text-lg px-8 py-4 h-auto"
            >
              <Target className="w-5 h-5 mr-2" />
              Start Assessment
              <ChevronRight className="w-5 h-5 ml-2" />
            </Button>
            
            <Button variant="outline" size="lg" className="text-lg px-8 py-4 h-auto">
              <Clock className="w-5 h-5 mr-2" />
              15-20 Minutes
            </Button>
          </div>

          {/* What You'll Discover */}
          <div className="grid md:grid-cols-3 gap-6 mb-16">
            <Card className="p-6 shadow-card bg-gradient-card">
              <div className="text-center">
                <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                  <Brain className="w-6 h-6 text-primary-foreground" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Psychological Fit</h3>
                <p className="text-muted-foreground">
                  Assess your personality traits, interests, and motivation for genomics work
                </p>
              </div>
            </Card>

            <Card className="p-6 shadow-card bg-gradient-card">
              <div className="text-center">
                <div className="w-12 h-12 bg-genomics rounded-full flex items-center justify-center mx-auto mb-4">
                  <BarChart3 className="w-6 h-6 text-genomics-foreground" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Technical Readiness</h3>
                <p className="text-muted-foreground">
                  Evaluate your current skills in programming, statistics, and biology
                </p>
              </div>
            </Card>

            <Card className="p-6 shadow-card bg-gradient-card">
              <div className="text-center">
                <div className="w-12 h-12 bg-accent rounded-full flex items-center justify-center mx-auto mb-4">
                  <Dna className="w-6 h-6 text-accent-foreground" />
                </div>
                <h3 className="text-xl font-semibold mb-3">WISCAR Analysis</h3>
                <p className="text-muted-foreground">
                  Comprehensive framework measuring Will, Interest, Skill, Cognitive ability, and more
                </p>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Assessment Overview */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              What Is a Genomics Data Analyst?
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Professionals who process, analyze, and interpret genetic and genomic data 
              to generate insights for research, diagnostic, or therapeutic applications.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <Card className="p-6 shadow-card">
              <h3 className="text-xl font-semibold mb-4 flex items-center">
                <Users className="w-5 h-5 mr-2 text-primary" />
                Typical Career Paths
              </h3>
              <ul className="space-y-3">
                {[
                  'Genomics Data Analyst',
                  'Bioinformatics Data Scientist', 
                  'Clinical Genomics Specialist',
                  'Computational Biologist',
                  'Medical/Biotech Research Analyst'
                ].map((career, index) => (
                  <li key={index} className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <span>{career}</span>
                  </li>
                ))}
              </ul>
            </Card>

            <Card className="p-6 shadow-card">
              <h3 className="text-xl font-semibold mb-4 flex items-center">
                <Target className="w-5 h-5 mr-2 text-primary" />
                Key Success Traits
              </h3>
              <ul className="space-y-3">
                {[
                  'Strong analytical thinking',
                  'Attention to detail',
                  'Programming proficiency',
                  'Biological insight',
                  'Ethical awareness'
                ].map((trait, index) => (
                  <li key={index} className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <span>{trait}</span>
                  </li>
                ))}
              </ul>
            </Card>
          </div>

          <div className="text-center">
            <Button
              onClick={handleStartAssessment}
              size="lg"
              className="bg-gradient-hero text-primary-foreground shadow-elegant text-lg px-8 py-4 h-auto"
            >
              Begin Your Assessment Journey
              <ChevronRight className="w-5 h-5 ml-2" />
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
