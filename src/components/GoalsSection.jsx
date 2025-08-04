import React, {useState} from 'react';
import { Plus, Target} from 'lucide-react';
import GoalModal from './GoalModal';
import GoalCard from './GoalCard';

const GoalsSection = ({goals, onAddGoal, onUpdateGoalStatus, onUpdateKeyResultStatus}) => {
  const [showModal, setShowModal] = useState(false);

  console.log(goals.length)

  const inProgressGoals = goals.filter(goal => goal.status === 'in-progress');
  const completedGoals = goals.filter(goal => goal.status === 'completed');

  
  return (
    <div>
      <div className='flex justify-between items-center mb-8'>
        <h2 className='font-semibold text-3xl text-gray-900 flex items-center gap-3'>
          <Target size={28} />My SMART Goals
        </h2>
        <button className='text-white bg-linear-to-r from-cyan-500 to-blue-500 px-4 py-2 text-base rounded-md cursor-pointer flex items-center hover:bg-gradient-to-l from-cyan-500 to-blue-500 transition-colors duration-300'
          onClick={() => setShowModal(true)}>
          <Plus size={18} /> 
          Add New Goal</button>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-3 gap-4 mb-8'>
        <div className="bg-white p-6 rounded-xl text-center shadow-sm border border-gray-200">
          <div className="text-2xl font-bold ">{inProgressGoals.length}</div>
          <div className="text-sm text-gray-600 uppercase">In Progress</div>
        </div>
        <div className="bg-white p-6 rounded-xl text-center shadow-sm border border-gray-200">
          <div className="text-2xl font-bold">{completedGoals.length}</div>
          <div className="text-sm text-gray-600 uppercase">Completed</div>
        </div>
        <div className="bg-white p-6 rounded-xl text-center shadow-sm border border-gray-200">
          <div className="text-2xl font-bold ">{goals.length}</div> 
          <div className="text-sm text-gray-600 uppercase">Total Goals</div>
        </div>
      </div>

     {goals.length === 0 ? (
      <div className='text-center py-12 text-gray-500 border border-gray-200 rounded-lg'>
        <h3 className='text-lg font-medium mt-4 mb-2'>No goals yet</h3>
         <p>Start by adding your first SMART goal to begin your journey</p>
      </div>): (
        <div className="space-y-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
          {goals.map(goal => (
            <GoalCard 
              key={goal.id} 
              goal={goal} 
              onUpdateStatus={onUpdateGoalStatus}
              onToggleKeyResult={onUpdateKeyResultStatus}
            />
          ))}
        </div>
      )
    }
      {showModal && (
        <GoalModal onClose={()=> setShowModal(false)} onSave={onAddGoal}/>
      )}
    </div>
  )
}

export default GoalsSection;