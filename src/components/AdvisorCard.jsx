import { Star, Plus } from "lucide-react";

const AdvisorCard = ({advisor, isInBoard, onAddToBoard }) => {
    console.log(isInBoard, 'isInBoard')
  return (
    <div className="card text-center">
      <h3 className="text-lg font-bold text-gray-900 mb-1">{advisor.name}</h3>
      <p className="text-sm text-gray-600 mb-4 font-semibold">{advisor.company}</p>
      <p className="text-sm text-gray-600 mb-4 font-medium">{advisor.job_title}</p>
      <div className="flex items-center justify-center gap-2 mb-4">
        <div className="flex gap-0.5">
          {[...Array(5)].map((_, i) => (
            <Star 
              key={i} 
              size={16} 
              className={i < advisor.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}
            />
          ))}
        </div>
        <span className="text-xs text-gray-600">({advisor.rating}/5)</span>
      </div>
      <button
        className={`btn w-full ${isInBoard ? 'btn-secondary' : 'btn-primary'}`}
        onClick={() => !isInBoard && onAddToBoard(advisor)}
        disabled={isInBoard}
      >
        {isInBoard ? (
          <>
            <Star size={16} />
            In My Board
          </>
        ) : (
          <>
            <Plus size={16} />
            Add to Board
          </>
        )}
      </button>
    </div>
  )
}

export default AdvisorCard;