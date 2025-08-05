import { Star, Trash2, MessageCircle, Calendar } from 'lucide-react';

const BoardAdvisorCard = ({advisor, onRemove}) =>{
  return (
    <div className="card">
      <div className="flex justify-between items-start mb-4">
        <div className="">
            <h3 className="text-lg font-bold text-gray-900 mb-4">{advisor.name}</h3>
            <p className="text-sm text-gray-600 mb-2 font-semibold">{advisor.company}</p>
            <p className="text-sm text-gray-600 mb-4 font-medium">{advisor.job_title}</p>
        </div>
        <button
          className="btn text-red-500 p-2 min-w-0"
          onClick={onRemove}
          title="Remove from board">
          <Trash2 size={16} />
        </button>
      </div>

      <div className="flex items-center gap-2 mb-4">
        <div className="flex gap-0.5">
          {[...Array(5)].map((_, i) => (
            <Star 
              key={i} 
              size={14} 
              className={i < advisor.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}
            />
          ))}
        </div>
        <span className="text-xs text-gray-600">({advisor.rating}/5)</span>
      </div>

      <div className="flex gap-3">
        <button className="btn btn-primary">
          <MessageCircle size={16} />
          Message
        </button>
        <button className="btn btn-secondary flex-1">
          <Calendar size={16} />
          Schedule
        </button>
      </div>
    </div>
  )
}

export default BoardAdvisorCard