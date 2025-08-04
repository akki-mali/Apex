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

  updateGoalStatus(goalId, status) {
    const goals = this.getGoals();
    const goalIndex = goals.findIndex(g => g.id === goalId);
    
    if (goalIndex !== -1) {
      goals[goalIndex].status = status;
      goals[goalIndex].updatedAt = new Date().toISOString();
      
      if (status === 'completed') {
        goals[goalIndex].completedAt = new Date().toISOString();
        // Mark all key results as completed
        goals[goalIndex].keyResults = goals[goalIndex].keyResults.map(kr => ({
          ...kr,
          completed: true
        }));
      } else {
        // Mark all key results as incomplete when reopening
        goals[goalIndex].keyResults = goals[goalIndex].keyResults.map(kr => ({
          ...kr,
          completed: false
        }));
        delete goals[goalIndex].completedAt;
      }
      
      localStorage.setItem(this.storageKey, JSON.stringify(goals));
    }
  }

  updateKeyResult(goalId, keyResultId) {
    const goals = this.getGoals();
    const goalIndex = goals.findIndex(g => g.id === goalId);
    
    if (goalIndex !== -1) {
      const keyResultIndex = goals[goalIndex].keyResults.findIndex(kr => kr.id === keyResultId);
      if (keyResultIndex !== -1) {
        goals[goalIndex].keyResults[keyResultIndex].completed = !goals[goalIndex].keyResults[keyResultIndex].completed;
        localStorage.setItem(this.storageKey, JSON.stringify(goals));
      }
    }
  }

  deleteGoal(goalId) {
    const goals = this.getGoals();
    const filteredGoals = goals.filter(g => g.id !== goalId);
    localStorage.setItem(this.storageKey, JSON.stringify(filteredGoals));
  }
}

export const goalService = new GoalService();