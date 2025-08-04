import { CheckCircle, Clock, Edit3, Circle } from 'lucide-react';

const GoalCard = ({ goal, onUpdateStatus, onToggleKeyResult }) => {
  const isCompleted = goal.status === 'completed';
  const completedKeyResults = goal.keyResults.filter(kr => kr.completed).length;
  const totalKeyResults = goal.keyResults.length;
  const progress = totalKeyResults.length > 0 ? (completedKeyResults / goal.keyResults.length) * 100 : 0;
  console.log(goal.keyResults);
    return (
      <div className="border border-gray-200 rounded-lg p-4">
        <div className="flex justify-between items-start mb-4">
          <div>
            <span className={`status-badge ${isCompleted ? 'status-completed' : 'status-in-progress'}`}>
              {isCompleted ? 'Completed' : 'In Progress'}
            </span>
          </div>
          <button
            className={`btn ${isCompleted ? 'btn-secondary' : 'btn-success'}`}
            onClick={() => onUpdateStatus(goal.id, isCompleted ? 'in-progress' : 'completed')} >
            {isCompleted ? (
              <>
                <Edit3 size={16} />
                Reopen
              </>
            ) : (
              <>
                <CheckCircle size={16} />
                Complete
              </>
            )}
          </button>
        </div>
  
        <h3 className="text-lg font-semibold text-gray-900 mb-4 leading-relaxed">{goal.objective}</h3>
        
        <div className="flex gap-4 mb-6 text-sm text-gray-600">
          <div className="flex items-center gap-1">
            <Clock size={14} />
            Created: {new Date(goal.createdAt).toLocaleDateString()}
          </div>
        </div>
  
        <div className="mt-4">
          <div className="flex justify-between items-center mb-3">
            <h4 className="font-semibold text-gray-700">Key Results</h4>
            <div className="text-xs text-gray-600">
              {completedKeyResults}/{goal.keyResults.length} completed
            </div>
          </div>
          
          <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden mb-4">
            <div 
              className="h-full bg-green-700 transition-all duration-300" 
              style={{ width: `${progress}%` }}
            ></div>
          </div>
  
          {/* <ul className="space-y-0">
            {goal.keyResults.map((kr, index) => (
              <li key={index} className={`py-2 border-b border-gray-100 last:border-b-0 flex items-start gap-2  ${kr.completed ? 'opacity-70' : ''}`}>
                <button className={`text-sm text-gray-700 leading-relaxed ${kr.completed ? 'line-through' : ''}`}
                onClick={() => onToggleKeyResult(goal.id, keyResult.id)}>
                  {kr.completed ? (
                  <CheckCircle className="w-5 h-5" />
                ) : (
                  <Circle className="w-5 h-5" />
                )}{kr.description}
                </button>
              </li>
            ))}
          </ul> */}

          <div className="space-y-3">
          {goal.keyResults.map((keyResult) => (
            <div key={keyResult.id} className="flex items-start space-x-3">
              <button
                onClick={() => onToggleKeyResult(goal.id, keyResult.id)}
                className={`flex-shrink-0 mt-0.5 transition-colors ${
                  keyResult.completed
                    ? 'text-green-600 hover:text-green-700'
                    : 'text-gray-400 hover:text-gray-600'
                }`}
              >
                {keyResult.completed ? (
                  <CheckCircle className="w-5 h-5" />
                ) : (
                  <Circle className="w-5 h-5" />
                )}
              </button>
              <p className={`text-sm leading-relaxed ${
                keyResult.completed 
                  ? 'text-gray-500 line-through' 
                  : 'text-gray-700'
              }`}>
                {keyResult.description}
              </p>
            </div>
          ))}
        </div>
        </div>
      </div>
  )
}

export default GoalCard;