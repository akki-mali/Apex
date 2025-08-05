import { useState } from "react";
import { Users } from "lucide-react";
import AdvisorCard from "./AdvisorCard";

const AdvisorsSection = ({advisors, myBoard, onAddToBoard}) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredAdvisors = advisors.filter(advisor => advisor.name.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-2 mb-6">
        <h2 className="text-3xl font-semibold text-gray-900 flex items-center gap-3 lg:mb-0 mb-4">
          <Users size={28} />
          World-Class Advisors
        </h2>
        <div className="">
          <input
            type="text"
            className="form-input w-full max-w-2xl "
            placeholder="Search advisors by name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div> 
      <div className="text-sm text-gray-600 mb-6">
        Showing {filteredAdvisors.length} of {advisors.length} advisors
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredAdvisors.map((advisor) => (
          <AdvisorCard 
            key={advisor.id} 
            advisor={advisor}
            isInBoard={myBoard.some(a => a.id === advisor.id)}
            onAddToBoard={onAddToBoard}
          />
        ))}
      </div>
     
      
    </>
  )
}

export default AdvisorsSection;