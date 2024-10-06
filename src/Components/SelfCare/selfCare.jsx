import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { AlertCircle, PhoneCall, Globe } from 'lucide-react';

const resources = [
  { activity: "Meditation", description: "Take 5 minutes to meditate.", category: "Relaxation" },
  { activity: "Exercise", description: "Go for a 30-minute walk.", category: "Physical" },
  { activity: "Reading", description: "Read a book or listen to an audiobook.", category: "Mental" },
  { activity: "Journaling", description: "Write down your thoughts and feelings.", category: "Emotional" },
  { activity: "Deep Breathing", description: "Practice deep breathing exercises for 5 minutes.", category: "Relaxation" },
  { activity: "Yoga", description: "Do a 15-minute yoga session.", category: "Physical" },
  { activity: "Gratitude List", description: "Write down three things you're grateful for.", category: "Emotional" },
  { activity: "Nature Walk", description: "Take a walk in nature and observe your surroundings.", category: "Physical" },
  { activity: "Mindful Eating", description: "Eat a meal slowly and mindfully.", category: "Mental" },
  { activity: "Creative Expression", description: "Engage in a creative activity like drawing or writing.", category: "Mental" },
];

const emergencyResources = [
  { name: "National Suicide Prevention Lifeline", phone: "1-800-273-8255", website: "https://suicidepreventionlifeline.org/" },
  { name: "Crisis Text Line", phone: "Text HOME to 741741", website: "https://www.crisistextline.org/" },
  { name: "SAMHSA National Helpline", phone: "1-800-662-4357", website: "https://www.samhsa.gov/find-help/national-helpline" },
];

function SelfCareResources() {
  const [filter, setFilter] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', ...new Set(resources.map(resource => resource.category))];

  const filteredResources = resources.filter(resource => 
    (selectedCategory === 'All' || resource.category === selectedCategory) &&
    (resource.activity.toLowerCase().includes(filter.toLowerCase()) || 
     resource.description.toLowerCase().includes(filter.toLowerCase()))
  );

  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <h1 className="text-3xl font-bold mb-6">Self-Care Resources</h1>
      
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="text-2xl">Self-Care Activities</CardTitle>
          <CardDescription>Explore various activities to improve your well-being</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2 mb-4">
            {categories.map(category => (
              <Badge 
                key={category} 
                variant={selectedCategory === category ? "destructive" : "outline"}
                className="cursor-pointer"
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </Badge>
            ))}
          </div>
          <Input
            type="text"
            placeholder="Search activities..."
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="mb-4"
          />
          <ScrollArea className="h-[400px] pr-4">
            {filteredResources.map((resource, index) => (
              <Card key={index} className="mb-4">
                <CardHeader>
                  <CardTitle>{resource.activity}</CardTitle>
                  <Badge>{resource.category}</Badge>
                </CardHeader>
                <CardContent>
                  <p>{resource.description}</p>
                  <Button className="mt-2" variant="outline">Try Now</Button>
                </CardContent>
              </Card>
            ))}
          </ScrollArea>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-2xl flex items-center">
            <AlertCircle className="mr-2 text-red-500" />
            Emergency Resources
          </CardTitle>
          <CardDescription>If you need immediate help, please contact these resources</CardDescription>
        </CardHeader>
        <CardContent>
          {emergencyResources.map((resource, index) => (
            <div key={index} className="mb-4 last:mb-0">
              <h3 className="font-semibold text-lg">{resource.name}</h3>
              <p className="flex items-center mt-1">
                <PhoneCall className="mr-2" size={16} />
                {resource.phone}
              </p>
              <p className="flex items-center mt-1">
                <Globe className="mr-2" size={16} />
                <a href={resource.website} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                  Visit Website
                </a>
              </p>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}

export default SelfCareResources;