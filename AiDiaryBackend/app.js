
// // Routes
// // Insert Data in DB
// app.post('/insertDashboardData', async (req, res) => {
//   try {
//     // Hardcoded data
//     const userId = "652f1f9b9e87a2a9f22d60b9"; // replace with the actual user id
//     const objId = new mongoose.Types.ObjectId("652f1f9b9e87a2a9f22d60b9");
//     // Insert into User collection (if the user doesn't exist)
//     const existingUser = await User.findById(objId);
//     if (!existingUser) {
//       const user = new User({
//         _id: objId,
//         username: 'ab',
//         email: '12',
//         password_hash: '12345'
//       });
//       await user.save();
//     }

//     // Insert into Mood collection
//     const moodData = [
//       { day: "Mon", mood: 60, userId },
//       { day: "Tue", mood: 75, userId },
//       { day: "Wed", mood: 65, userId },
//       { day: "Thu", mood: 80, userId },
//       { day: "Fri", mood: 70, userId },
//       { day: "Sat", mood: 85, userId },
//       { day: "Sun", mood: 90, userId },
//     ];
//     await Mood.insertMany(moodData);

//     // Insert into Productivity collection
//     const productivityData = [{
//       userId,
//       name: "Productive",
//       value: "65"
//     },{
//       userId,
//       name: "Procastination",
//       value: "35",
//     }];
//     await Productivity.insertMany(productivityData);
    
//     // Insert into Goal collection
//     const goalData = [
//       { name: "Exercise 3x/week", progress: 66, userId },
//       { name: "Read 20 pages/day", progress: 80, userId },
//       { name: "Meditate 10 min/day", progress: 50, userId },
//     ];
//     await Goal.insertMany(goalData);

//     // Insert into Milestone collection
//     const milestoneData = [
//       { description: "7-day mood improvement streak", userId },
//       { description: "Completed 30 days of journaling", userId },
//       { description: "Achieved 8-hour sleep goal for a week", userId },
//     ];
//     await Milestone.insertMany(milestoneData);

//     res.status(200).send({ message: "Dashboard data inserted successfully!" });
//   } catch (error) {
//     console.error(error);
//     res.status(500).send({ error: error.message });
//   }
// });
// // 1. Create a New User
// app.post('/users', async (req, res) => {
// const { username, email, password_hash } = req.body;
// try {
//   const user = new User({ username, email, password_hash });
//   await user.save();
//   res.status(201).send(user);
// } catch (error) {
//   res.status(400).send({ error: error.message });
// }
// });
// // 1.1 Get User Details
// app.get('/getuser', async (req, res) => {
//   const { userId } = req.body;  // userId is expected to be a string

//   try {
//     // Directly search for the user by _id as a string
//     const user = await User.findOne({ _id: userId });

//     // Check if user was found
//     if (!user) {
//       return res.status(404).send({ error: "User not found" });
//     }

//     console.log(user);
//     res.status(200).send(user);
//   } catch (error) {
//     res.status(400).send({ error: error.message });
//   }
// });


const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/todoApp', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log('Connected to MongoDB...'))
  .catch((error) => console.error('Could not connect to MongoDB...', error));

// Import Models
const User = require('./database/models/User');
const Mood = require("./database/models/Mood");
const Productivity = require("./database/models/Productivity");
const Goal = require("./database/models/Goal");
const Milestone = require("./database/models/Milestone");
const Activity = require("./database/models/Activity");
const JournalEntry = require("./database/models/JournalEntry");

// Initialize Express
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes

// Get Dashboard Data
app.get("/dashboard/:userId", async (req, res) => {
  const { userId } = req.params;

  try {
    const moods = await Mood.find({ userId }).sort({ createdAt: -1 }).limit(7);
    const productivity = await Productivity.find({ userId });
    const goals = await Goal.find({ userId }).sort({ createdAt: -1 }).limit(3);
    const milestones = await Milestone.find({ userId }).sort({ createdAt: -1 }).limit(5);
    const activities = await Activity.find({ userId }).sort({ createdAt: -1 }).limit(3);

    res.json({
      moods,
      productivity,
      goals,
      milestones,
      activities,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch data" });
  }
});

// Add New Journal Entry
app.post("/journal", async (req, res) => {
  const { userId, content } = req.body;

  try {
    // In a real-world scenario, you would process the journal entry with an AI model here
    // For now, we'll simulate the AI processing by adding random data

    // Simulate mood analysis
    const moodScore = Math.floor(Math.random() * 100) + 1;
    const newMood = new Mood({ userId, day: new Date().toLocaleDateString(), mood: moodScore });
    await newMood.save();

    // Simulate productivity analysis
    const productiveScore = Math.floor(Math.random() * 100) + 1;
    const procrastinationScore = 100 - productiveScore;
    await Productivity.updateOne({ userId, name: "Productive" }, { value: productiveScore }, { upsert: true });
    await Productivity.updateOne({ userId, name: "Procrastination" }, { value: procrastinationScore }, { upsert: true });

    // Simulate activity suggestion
    const activityTypes = ["outdoor", "relaxation", "entertainment"];
    const randomType = activityTypes[Math.floor(Math.random() * activityTypes.length)];
    const newActivity = new Activity({ 
      userId, 
      name: `Suggested activity based on your journal`, 
      type: randomType 
    });
    await newActivity.save();

    // Simulate goal generation
    if (Math.random() > 0.7) {  // 30% chance of generating a new goal
      const goalTypes = ["health", "productivity", "personal"];
      const randomGoalType = goalTypes[Math.floor(Math.random() * goalTypes.length)];
      const newGoal = new Goal({
        userId,
        name: `New ${randomGoalType} goal based on your journal`,
        progress: 0
      });
      await newGoal.save();
    }

    // Simulate milestone achievement
    if (Math.random() > 0.8) {  // 20% chance of achieving a milestone
      const newMilestone = new Milestone({
        userId,
        description: "You've achieved a new milestone based on your journal entry!"
      });
      await newMilestone.save();
    }

    // Save the journal entry
    const newJournalEntry = new JournalEntry({
      userId,
      content,
      mood: moodScore,
      sentiment: Math.random() * 2 - 1, // Random sentiment score between -1 and 1
      moodTrigger: ["work", "family", "exercise", "sleep", "food"][Math.floor(Math.random() * 5)],
      happyMoment: ["spending time outdoors", "meeting friends", "accomplishing a task", "learning something new"][Math.floor(Math.random() * 4)],
      gratitude: ["health", "family", "friends", "career", "personal growth"][Math.floor(Math.random() * 5)]
    });
    await newJournalEntry.save();

    res.status(201).json({
      message: "Journal entry processed successfully",
      journalEntry: newJournalEntry
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to process journal entry" });
  }
});

// Get Journal Entries
app.get("/journal/:userId", async (req, res) => {
  const { userId } = req.params;

  try {
    const journalEntries = await JournalEntry.find({ userId }).sort({ createdAt: -1 }).limit(10);
    res.json(journalEntries);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch journal entries" });
  }
});

// Get Mood Trend
app.get("/mood-trend/:userId", async (req, res) => {
  const { userId } = req.params;

  try {
    const moodTrend = await Mood.find({ userId }).sort({ createdAt: -1 }).limit(7);
    res.json(moodTrend);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch mood trend" });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});