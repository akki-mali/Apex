class GoalService {
  constructor() {
    this.storageKey = 'achiever_goals';
  }

  getGoals() {
    const stored = localStorage.getItem(this.storageKey);
    return stored ? JSON.parse(stored) : [];
  }

  addGoal(goalData) {
    const goals = this.getGoals();
    const newGoal = {
      id: Date.now().toString(),
      ...goalData,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    goals.push(newGoal);
    localStorage.setItem(this.storageKey, JSON.stringify(goals));
    return newGoal;
  }



  updateKeyResultStatus(goalId, keyResultId) {
    const goals = this.getGoals();
    const goalIndex = goals.findIndex(g => g.id === goalId);
    
    if (goalIndex !== -1) {
      const keyResultIndex = goals[goalIndex].keyResults.findIndex(kr => kr.id === keyResultId);
      if (keyResultIndex !== -1) {
        // Toggle the completion status of the key result
        goals[goalIndex].keyResults[keyResultIndex].completed = !goals[goalIndex].keyResults[keyResultIndex].completed;
        goals[goalIndex].updatedAt = new Date().toISOString();
        
        // Check if all key results are completed
        const allCompleted = goals[goalIndex].keyResults.every(kr => kr.completed);
        
        // Update goal status based on key results completion
        if (allCompleted && goals[goalIndex].status !== 'completed') {
          goals[goalIndex].status = 'completed';
          goals[goalIndex].completedAt = new Date().toISOString();
        } else if (!allCompleted && goals[goalIndex].status === 'completed') {
          goals[goalIndex].status = 'in-progress';
          delete goals[goalIndex].completedAt;
        }
        
        localStorage.setItem(this.storageKey, JSON.stringify(goals));
      }
    }
  }

  submitGoal(goalId) {
    const goals = this.getGoals();
    const goalIndex = goals.findIndex(g => g.id === goalId);
    
    if (goalIndex !== -1) {
      goals[goalIndex].status = 'submitted';
      goals[goalIndex].submittedAt = new Date().toISOString();
      goals[goalIndex].updatedAt = new Date().toISOString();
      localStorage.setItem(this.storageKey, JSON.stringify(goals));
    }
  }

  deleteGoal(goalId) {
    const goals = this.getGoals();
    const filteredGoals = goals.filter(g => g.id !== goalId);
    localStorage.setItem(this.storageKey, JSON.stringify(filteredGoals));
  }
}

export const goalService = new GoalService();