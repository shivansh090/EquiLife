for (const goalUpdate of analysis.goalUpdates) {
      if (goalUpdate.progressUpdate !== null || goalUpdate.achieved) {
        // Check if the goal already exists
        const existingGoal = await Goal.findOne({ userId, name: goalUpdate.name });
    
        if (existingGoal) {
          // If the goal exists, update it
          const updatedGoal = await Goal.findOneAndUpdate(
            { userId, name: goalUpdate.name },
            { 
              $set: { 
                progress: goalUpdate.progressUpdate !== null ? goalUpdate.progressUpdate : 100,
                achieved: goalUpdate.achieved
              }
            },
            { new: true }
          );
    
          if (updatedGoal && goalUpdate.achieved) {
            // Create a new milestone for the achieved goal
            const newMilestone = new Milestone({
              userId,
              description: `Achieved goal: ${updatedGoal.name}`
            });
            await newMilestone.save();
          }
        } else {
          // If the goal does not exist, create a new goal
          const newGoal = new Goal({
            userId,
            name: goalUpdate.name,
            progress: goalUpdate.progressUpdate !== null ? goalUpdate.progressUpdate : 100,
            achieved: goalUpdate.achieved
          });
          const savedGoal = await newGoal.save();
    
          if (savedGoal.achieved) {
            // Create a new milestone for the achieved goal
            const newMilestone = new Milestone({
              userId,
              description: `Achieved goal: ${savedGoal.name}`
            });
            await newMilestone.save();
          }
        }
      }
    }