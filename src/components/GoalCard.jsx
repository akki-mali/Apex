import { CheckCircle, Clock, Circle } from 'lucide-react';

const GoalCard = ({ goal, onToggleKeyResult, onSubmitGoal }) => {
  const isCompleted = goal.status === 'completed';
  const isSubmitted = goal.status === 'submitted';
  const completedKeyResults = goal.keyResults.filter(kr => kr.completed).length;
  const totalKeyResults = goal.keyResults.length;
  const progress = totalKeyResults > 0 ? (completedKeyResults / totalKeyResults) * 100 : 0;

    return (
      <div className={`rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow 
        duration-200 p-4 relative h-full flex flex-col ${isSubmitted ? 'bg-gray-100': 'bg-white'}`}>
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-semibold text-gray-900 leading-relaxed">{goal.objective}</h3>
          <div>
            <span className={`status-badge ${isSubmitted ? 'status-completed' : isCompleted ? 'status-completed' : 'status-in-progress'}`}>
              {isSubmitted ? 'Submitted' : isCompleted ? 'Completed' : 'In Progress'}
            </span>
          </div>
         
        </div>
  
        <div className="flex gap-4 text-sm text-gray-600">
          <div className="flex items-center gap-1 font-medium">
            <Clock size={14} />
            {isSubmitted ? (
              <>Submitted: {new Date(goal.submittedAt).toLocaleDateString()}</>
            ) : (
              <>Created: {new Date(goal.createdAt).toLocaleDateString()}</>
            )}
          </div>
        </div>
  
        <div className="mt-3 flex-grow">
          <div className="flex justify-between items-center mb-3">
            <h4 className="text-sm font-medium text-gray-700">Progress</h4>
            <div className="text-xs text-gray-600">
              {completedKeyResults}/{goal.keyResults.length} completed
            </div>
          </div>
          
          <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden mb-3">
            <div 
              className="h-full bg-green-700 transition-all duration-300" 
              style={{ width: `${progress}%` }}
            ></div>
          </div>

          <div className="space-y-3">
            <h4 className="text-sm font-medium text-gray-700">Key Results</h4>
              {goal.keyResults.map((keyResult) => (
                <div key={keyResult.id} className="flex items-start space-x-3">
                  <button aria-label="confirm"
                    onClick={() => !isSubmitted && onToggleKeyResult(goal.id, keyResult.id)}
                    className={`cursor-pointer flex-shrink-0 mt-0.5 transition-colors ${
                      isSubmitted 
                        ? 'cursor-default'
                        : keyResult.completed
                        ? 'text-green-600 hover:text-green-700'
                        : 'text-gray-400 hover:text-gray-600'
                    }`}
                    disabled={isSubmitted}
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
        <div className='mt-auto pt-4'>
          {!isSubmitted && (
          <button
            className={`float-right btn ${isCompleted ? 'btn-primary' : 'btn-primary opacity-50 cursor-not-allowed!'} ${!isCompleted ? '' : ''}`}
            onClick={() => onSubmitGoal(goal.id)}
            disabled={!isCompleted}>
            Submit
          </button>
          )}
        </div>
      </div>
  )
}

export default GoalCard;