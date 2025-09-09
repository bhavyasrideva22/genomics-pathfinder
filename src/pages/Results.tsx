import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { RadarChart } from '@/components/RadarChart';
import { AssessmentResults } from '@/types/assessment';
import { 
  CheckCircle, 
  AlertCircle, 
  XCircle, 
  Download, 
  ArrowLeft,
  TrendingUp,
  BookOpen,
  Users,
  Target
} from 'lucide-react';

export const Results = () => {
  const navigate = useNavigate();
  const [results, setResults] = useState<AssessmentResults | null>(null);

  useEffect(() => {
    const savedResults = localStorage.getItem('assessmentResults');
    if (savedResults) {
      setResults(JSON.parse(savedResults));
    } else {
      navigate('/');
    }
  }, [navigate]);

  if (!results) {
    return <div>Loading...</div>;
  }

  const getRecommendationIcon = () => {
    switch (results.recommendation) {
      case 'yes': return <CheckCircle className="w-6 h-6 text-green-600" />;
      case 'maybe': return <AlertCircle className="w-6 h-6 text-yellow-600" />;
      case 'no': return <XCircle className="w-6 h-6 text-red-600" />;
    }
  };

  const getRecommendationText = () => {
    switch (results.recommendation) {
      case 'yes': return 'Highly Recommended';
      case 'maybe': return 'Potential Fit with Development';
      case 'no': return 'Consider Alternative Paths';
    }
  };

  const getRecommendationColor = () => {
    switch (results.recommendation) {
      case 'yes': return 'bg-green-100 text-green-800 border-green-200';
      case 'maybe': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'no': return 'bg-red-100 text-red-800 border-red-200';
    }
  };

  const wiscarData = [
    { dimension: 'Will', score: Math.round(results.wiscarScores.will) },
    { dimension: 'Interest', score: Math.round(results.wiscarScores.interest) },
    { dimension: 'Skill', score: Math.round(results.wiscarScores.skill) },
    { dimension: 'Cognitive', score: Math.round(results.wiscarScores.cognitive) },
    { dimension: 'Ability', score: Math.round(results.wiscarScores.ability) },
    { dimension: 'Real-World', score: Math.round(results.wiscarScores.realWorld) }
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-foreground mb-2">
              Your Assessment Results
            </h1>
            <p className="text-xl text-muted-foreground">
              Genomics Data Analyst Career Readiness
            </p>
          </div>

          {/* Overall Score Card */}
          <Card className="p-8 mb-8 shadow-elegant bg-gradient-card text-center">
            <div className="flex items-center justify-center space-x-3 mb-4">
              {getRecommendationIcon()}
              <h2 className="text-2xl font-semibold text-foreground">
                Overall Assessment Score
              </h2>
            </div>
            
            <div className="text-6xl font-bold text-primary mb-4">
              {Math.round(results.overallScore)}
            </div>
            
            <Badge className={`text-lg px-4 py-2 ${getRecommendationColor()}`}>
              {getRecommendationText()}
            </Badge>

            <div className="mt-6 max-w-2xl mx-auto">
              <Progress value={results.overallScore} className="h-4" />
            </div>
          </Card>

          {/* Detailed Scores */}
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            {/* Section Scores */}
            <Card className="p-6 shadow-card">
              <h3 className="text-xl font-semibold mb-6 flex items-center">
                <TrendingUp className="w-5 h-5 mr-2 text-primary" />
                Section Scores
              </h3>
              
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium">Psychological Fit</span>
                    <span className="text-lg font-semibold text-primary">
                      {Math.round(results.psychologicalFit)}
                    </span>
                  </div>
                  <Progress value={results.psychologicalFit} className="h-3" />
                </div>

                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium">Technical Readiness</span>
                    <span className="text-lg font-semibold text-primary">
                      {Math.round(results.technicalReadiness)}
                    </span>
                  </div>
                  <Progress value={results.technicalReadiness} className="h-3" />
                </div>
              </div>
            </Card>

            {/* WISCAR Radar Chart */}
            <Card className="p-6 shadow-card">
              <h3 className="text-xl font-semibold mb-4 flex items-center">
                <Target className="w-5 h-5 mr-2 text-primary" />
                WISCAR Analysis
              </h3>
              <RadarChart data={wiscarData} />
            </Card>
          </div>

          {/* Insights & Next Steps */}
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            {/* Insights */}
            <Card className="p-6 shadow-card">
              <h3 className="text-xl font-semibold mb-4 flex items-center">
                <BookOpen className="w-5 h-5 mr-2 text-primary" />
                Key Insights
              </h3>
              <ul className="space-y-3">
                {results.insights.map((insight, index) => (
                  <li key={index} className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <span className="text-muted-foreground">{insight}</span>
                  </li>
                ))}
              </ul>
            </Card>

            {/* Next Steps */}
            <Card className="p-6 shadow-card">
              <h3 className="text-xl font-semibold mb-4 flex items-center">
                <Users className="w-5 h-5 mr-2 text-primary" />
                Recommended Next Steps
              </h3>
              <ol className="space-y-3">
                {results.nextSteps.map((step, index) => (
                  <li key={index} className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-semibold mt-0.5 flex-shrink-0">
                      {index + 1}
                    </div>
                    <span className="text-muted-foreground">{step}</span>
                  </li>
                ))}
              </ol>
            </Card>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              variant="outline"
              onClick={() => navigate('/')}
              className="flex items-center space-x-2"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Take Assessment Again</span>
            </Button>
            
            <Button
              onClick={() => window.print()}
              className="bg-gradient-hero text-primary-foreground shadow-elegant flex items-center space-x-2"
            >
              <Download className="w-4 h-4" />
              <span>Download Results</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};