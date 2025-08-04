import React,  {useEffect, useState} from 'react';
import Navigation from '../components/Navigation';
import GoalsSection from '../components/GoalsSection'; 
import { goalService } from '../services/goalService'; // Import goalService to manage goals

const App = () => {
  const [activeTab, setActiveTab] = useState('goals');
  const [goals, setGoals] = useState([]);

  useEffect(() => {
     setGoals(goalService.getGoals());
  },[])

  const addGoal = (goal) => {
    const newGoal = goalService.addGoal(goal);
    setGoals(goalService.getGoals());
  };

const updateKeyResultStatus = (goalId, keyResultId) => {
    goalService.updateKeyResultStatus(goalId, keyResultId);
    setGoals(goalService.getGoals());
  };

  const submitGoal = (goalId) => {
    goalService.submitGoal(goalId);
    setGoals(goalService.getGoals());
  };

  return (
    <div className='min-h-screen bg-gray-50'>
      <header className='bg-cyan-700 text-white py-18 text-center shadow-lg'>
        <h1 className='font-bold text-4xl mb-2'>Achiever's Dashboard</h1>
        <p className='text-lg opacity-90 max-w-2xl mx-auto'>Manage your SMART goals and connect with world-class advisors</p>
      </header>

      <Navigation activeTab={activeTab} setActiveTab={setActiveTab}/>

      <main className='mx-auto max-w-6xl py-8 px-4'> 
        {activeTab === 'goals' && (
         <GoalsSection goals={goals} onAddGoal={addGoal} onUpdateKeyResultStatus={updateKeyResultStatus} onSubmitGoal={submitGoal}/>
        )}

      {activeTab === 'advisors' && (
        <div className='p-8'>
          <h2 className='text-2xl font-semibold mb-4'>Advisors</h2>
          <p className='text-gray-700'>Connect with world-class advisors.</p> 
          </div>
      )}

      {activeTab === 'boards' && (
        <div className='p-8'>
          <h2 className='text-2xl font-semibold mb-4'>Boards</h2>
          <p className='text-gray-700'>Manage your boards.</p> 
          </div>
      )}
      </main>
    
    </div>
  )
}

export default App;