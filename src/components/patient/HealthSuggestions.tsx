
import React from 'react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle,
  CardFooter 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar,
  Legend
} from 'recharts';
import { 
  Heart, 
  Activity, 
  Droplet, 
  Utensils, 
  Moon, 
  ChevronRight,
  TrendingUp,
  TrendingDown,
  AlertCircle,
  Award
} from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';

// Mock health data
const bloodPressureData = [
  { date: 'Mon', systolic: 120, diastolic: 80 },
  { date: 'Tue', systolic: 122, diastolic: 82 },
  { date: 'Wed', systolic: 119, diastolic: 79 },
  { date: 'Thu', systolic: 121, diastolic: 81 },
  { date: 'Fri', systolic: 118, diastolic: 78 },
  { date: 'Sat', systolic: 117, diastolic: 77 },
  { date: 'Sun', systolic: 120, diastolic: 80 },
];

const bloodSugarData = [
  { date: 'Mon', value: 95 },
  { date: 'Tue', value: 100 },
  { date: 'Wed', value: 92 },
  { date: 'Thu', value: 98 },
  { date: 'Fri', value: 105 },
  { date: 'Sat', value: 99 },
  { date: 'Sun', value: 97 },
];

const sleepData = [
  { day: 'Mon', hours: 7.2 },
  { day: 'Tue', hours: 6.8 },
  { day: 'Wed', hours: 7.5 },
  { day: 'Thu', hours: 6.5 },
  { day: 'Fri', hours: 7.0 },
  { day: 'Sat', hours: 8.2 },
  { day: 'Sun', hours: 7.9 },
];

const healthInsights = [
  {
    id: 1,
    title: 'Blood Pressure',
    value: '120/80 mmHg',
    status: 'normal',
    trend: 'stable',
    recommendation: 'Your blood pressure is within the normal range. Continue with your healthy lifestyle.'
  },
  {
    id: 2,
    title: 'Blood Sugar',
    value: '97 mg/dL',
    status: 'normal',
    trend: 'stable',
    recommendation: 'Your fasting blood sugar levels are normal. Maintain your balanced diet.'
  },
  {
    id: 3,
    title: 'Heart Rate',
    value: '72 bpm',
    status: 'normal',
    trend: 'decreasing',
    recommendation: 'Your resting heart rate has improved. Regular exercise is showing positive effects.'
  },
  {
    id: 4,
    title: 'Sleep',
    value: '7.3 hrs/night',
    status: 'good',
    trend: 'improving',
    recommendation: 'Your sleep duration has improved. Try to maintain a consistent sleep schedule.'
  },
  {
    id: 5,
    title: 'Stress Level',
    value: 'Moderate',
    status: 'moderate',
    trend: 'increasing',
    recommendation: 'Your stress levels have increased slightly. Consider meditation or deep breathing exercises.'
  }
];

const healthRecommendations = [
  {
    id: 1,
    category: 'Diet',
    title: 'Increase Fiber Intake',
    description: 'Based on your recent health data, we recommend increasing your daily fiber intake to improve digestive health.',
    actionItems: [
      'Add more whole grains to your diet',
      'Include legumes in at least one meal per day',
      'Aim for 2-3 servings of fruits daily'
    ],
    severity: 'medium'
  },
  {
    id: 2,
    category: 'Exercise',
    title: 'Cardio Workout Plan',
    description: 'Your heart rate patterns suggest you would benefit from a structured cardio routine.',
    actionItems: [
      '30 minutes of brisk walking 5 days a week',
      'Consider adding swimming or cycling twice a week',
      'Track your heart rate during exercise'
    ],
    severity: 'high'
  },
  {
    id: 3,
    category: 'Sleep',
    title: 'Improve Sleep Quality',
    description: 'Your sleep data shows inconsistent patterns. Improving sleep quality can boost your overall health.',
    actionItems: [
      'Maintain a consistent sleep schedule',
      'Avoid screens 1 hour before bedtime',
      'Keep your bedroom cool and dark'
    ],
    severity: 'medium'
  }
];

const getStatusColor = (status: string) => {
  switch (status) {
    case 'normal':
    case 'good':
      return 'text-green-600';
    case 'moderate':
      return 'text-amber-600';
    case 'high':
    case 'critical':
      return 'text-red-600';
    default:
      return 'text-gray-600';
  }
};

const getTrendIcon = (trend: string) => {
  switch (trend) {
    case 'increasing':
      return <TrendingUp className="h-4 w-4 text-green-600" />;
    case 'decreasing':
      return <TrendingDown className="h-4 w-4 text-red-600" />;
    case 'stable':
    default:
      return <Activity className="h-4 w-4 text-blue-600" />;
  }
};

const getSeverityBadge = (severity: string) => {
  switch (severity) {
    case 'high':
      return <Badge variant="destructive">High Priority</Badge>;
    case 'medium':
      return <Badge variant="default">Recommended</Badge>;
    case 'low':
    default:
      return <Badge variant="outline">Suggestion</Badge>;
  }
};

const getCategoryIcon = (category: string) => {
  switch (category) {
    case 'Diet':
      return <Utensils className="h-5 w-5" />;
    case 'Exercise':
      return <Activity className="h-5 w-5" />;
    case 'Sleep':
      return <Moon className="h-5 w-5" />;
    default:
      return <Heart className="h-5 w-5" />;
  }
};

const HealthSuggestions = () => {
  const { toast } = useToast();
  
  const handleViewDetails = (title: string) => {
    toast({
      title: "Health Insight",
      description: `Viewing detailed information for ${title}`,
    });
  };
  
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Award className="mr-2 h-5 w-5 text-amber-500" />
            AI Health Insights
          </CardTitle>
          <CardDescription>
            Personalized health insights based on your medical data
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {healthInsights.map(insight => (
              <Card key={insight.id} className="overflow-hidden bg-gray-50 border-none">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-medium">{insight.title}</h3>
                    <div className="flex items-center gap-2">
                      {getTrendIcon(insight.trend)}
                      <span className={getStatusColor(insight.status)}>
                        {insight.value}
                      </span>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">{insight.recommendation}</p>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="text-xs flex items-center p-0 h-auto"
                    onClick={() => handleViewDetails(insight.title)}
                  >
                    View Details
                    <ChevronRight className="ml-1 h-3 w-3" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Heart className="mr-2 h-5 w-5 text-red-500" />
            Health Trends
          </CardTitle>
          <CardDescription>
            Weekly overview of your key health metrics
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Blood Pressure</CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="h-[200px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={bloodPressureData} margin={{ top: 5, right: 5, bottom: 5, left: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" />
                      <YAxis domain={[70, 130]} />
                      <Tooltip />
                      <Line type="monotone" dataKey="systolic" stroke="#ef4444" name="Systolic" />
                      <Line type="monotone" dataKey="diastolic" stroke="#3b82f6" name="Diastolic" />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Blood Sugar</CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="h-[200px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={bloodSugarData} margin={{ top: 5, right: 5, bottom: 5, left: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" />
                      <YAxis domain={[80, 120]} />
                      <Tooltip />
                      <Line type="monotone" dataKey="value" stroke="#10b981" name="Blood Sugar" />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Sleep Duration</CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="h-[200px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={sleepData} margin={{ top: 5, right: 5, bottom: 5, left: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="day" />
                      <YAxis domain={[0, 10]} />
                      <Tooltip />
                      <Bar dataKey="hours" fill="#8884d8" name="Hours" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Daily Activity</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Steps</span>
                    <span className="text-sm font-medium">8,243 / 10,000</span>
                  </div>
                  <Progress value={82} className="h-2" />
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Active Minutes</span>
                    <span className="text-sm font-medium">42 / 60</span>
                  </div>
                  <Progress value={70} className="h-2" />
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Calories Burned</span>
                    <span className="text-sm font-medium">1,850 / 2,200</span>
                  </div>
                  <Progress value={84} className="h-2" />
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Water Intake</span>
                    <span className="text-sm font-medium">1.8L / 2.5L</span>
                  </div>
                  <Progress value={72} className="h-2" />
                </div>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <AlertCircle className="mr-2 h-5 w-5 text-blue-500" />
            Personalized Recommendations
          </CardTitle>
          <CardDescription>
            AI-powered health suggestions tailored to your needs
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {healthRecommendations.map(recommendation => (
              <Card key={recommendation.id}>
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center">
                        {getCategoryIcon(recommendation.category)}
                      </div>
                      <div>
                        <CardTitle className="text-lg">{recommendation.title}</CardTitle>
                        <CardDescription>{recommendation.category}</CardDescription>
                      </div>
                    </div>
                    <div>{getSeverityBadge(recommendation.severity)}</div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">{recommendation.description}</p>
                  <ul className="space-y-2">
                    {recommendation.actionItems.map((item, index) => (
                      <li key={index} className="flex items-start">
                        <span className="h-5 w-5 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-xs mr-2 mt-0.5">
                          {index + 1}
                        </span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button 
                    variant="outline" 
                    className="w-full"
                    onClick={() => toast({
                      title: "Action Taken",
                      description: `You've saved the recommendation for ${recommendation.title}`,
                    })}
                  >
                    Save to Health Plan
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default HealthSuggestions;
