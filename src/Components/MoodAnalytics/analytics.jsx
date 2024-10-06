import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import ApexCharts from 'react-apexcharts';

// Hardcoded data
const moodHistory = [
  { day: "Monday", mood: "Happy" },
  { day: "Tuesday", mood: "Sad" },
  { day: "Wednesday", mood: "Neutral" },
  { day: "Thursday", mood: "Happy" },
  { day: "Friday", mood: "Stressed" },
];

// Mood to numeric value mapping
const moodValues = {
  "Happy": 5,
  "Neutral": 3,
  "Sad": 1,
  "Stressed": 2
};

function Analytics() {
  const [timeRange, setTimeRange] = useState('week');

  // Prepare data for ApexCharts
  const chartData = {
    options: {
      chart: {
        id: "mood-history"
      },
      xaxis: {
        categories: moodHistory.map(entry => entry.day)
      },
      yaxis: {
        min: 0,
        max: 5,
        labels: {
          formatter: function (value) {
            return Object.keys(moodValues).find(key => moodValues[key] === value) || '';
          }
        }
      },
      colors: ['#8884d8'],
      stroke: {
        curve: 'smooth'
      },
      markers: {
        size: 6
      }
    },
    series: [
      {
        name: "Mood",
        data: moodHistory.map(entry => moodValues[entry.mood])
      }
    ]
  };

  return (
    <div className="container mx-auto p-4 max-w-3xl">
      <h1 className="text-2xl font-bold mb-4">Mood History</h1>
      
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Your Mood Trends</CardTitle>
          <CardDescription>Visualize your mood patterns over time</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-4">
            <Select value={timeRange} onValueChange={setTimeRange}>
              <SelectTrigger>
                <SelectValue placeholder="Select time range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="week">Past Week</SelectItem>
                <SelectItem value="month">Past Month</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <ApexCharts
            options={chartData.options}
            series={chartData.series}
            type="line"
            height={350}
          />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Mood Summary</CardTitle>
          <CardDescription>Your mood entries for the past week</CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            {moodHistory.map((entry, index) => (
              <li key={index} className="flex justify-between items-center">
                <span>{entry.day}</span>
                <span className="font-semibold">{entry.mood}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}

export default Analytics;