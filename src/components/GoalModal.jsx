import {useState} from 'react'
import { X, Plus, Trash2, Target } from 'lucide-react';

const GoalModal = ({onClose, onSave}) => {
  const [formData, setFormData] = useState({
    objective: '',
    keyResults: ['', '', ''],
  });

  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const validKeyResults = formData.keyResults.filter(kr => kr.trim());
    if (validKeyResults.length === 0) {
      setError('Please enter at least one key result');
      return;
    }

    const goal = {
      objective: formData.objective,
      keyResults: validKeyResults.map((description, index )=> ({
        description,
        completed: false,
        id: `${Date.now()}-${index}`,
      })),
      status: 'in-progress'
    };

    onSave(goal);
    onClose();
  };

  const addKeyResult = () => {
     setFormData({
      ...formData,
      keyResults: [...formData.keyResults, '']
    });
  }

  const updateKeyResult =(index, value)=> {
    const newKeyResults = [...formData.keyResults];
    console.log(newKeyResults)
    newKeyResults[index] = value;
    setFormData({ ...formData, keyResults: newKeyResults });
  }

  const removeKeyResult = (index) => {
    const newKeyResults = formData.keyResults.filter((_, i) => i !== index);
    console.log(newKeyResults)
    setFormData({ ...formData, keyResults: newKeyResults });
  }

  return (
    <div className="fixed inset-0  bg-black/50 flex items-center justify-center p-4 z-50" onClick={onClose}>
      <div className="bg-white rounded-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
        <div className='flex items-center justify-between p-6 border-b border-gray-200'>
          <h3 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
            <Target size={24} />Add New SMART Goal</h3>
          <button className="text-gray-500 hover:text-gray-700 p-1 cursor-pointer" onClick={onClose}
           aria-label="Close modal"> <X size={20} /></button>
        </div>

        <form onSubmit={handleSubmit} className='p-6 '>
          <div className="mb-2">
            <label className="form-label">Objective</label>
            <textarea className="form-textarea"
              placeholder='e.g., Become a recognized technical lead within the engineering team' required
              value={formData.objective}
              onChange={(e)=>setFormData({ ...formData, objective: e.target.value })}
              rows={3}></textarea>
          </div>

          <div className='mb-2'>
            <div className='flex justify-between items-center mb-2'>
              <label className='form-label font-medium'>Key Results</label>
              <button type="button" className='flex items-center font-medium text-cyan-600 cursor-pointer' 
                onClick={addKeyResult}> 
                <Plus size={16} />Add Key Result 
              </button>
            </div>

              {formData.keyResults.map((kr, index) => {
                return (
                  <div key={index} className="flex gap-2 mb-3 items-start">
                    <textarea className="form-textarea flex-1"
                      placeholder={`Key Result ${index + 1}: e.g., Increase user adoption of Feature Y by 25%`}
                      rows={2}
                      value={kr}
                      onChange={(e) => updateKeyResult(index, e.target.value)}>
                     </textarea>
                     {formData.keyResults.length > 1 && (
                      <button
                        type="button"
                        className="btn text-red-500 p-2 min-w-0"
                        onClick={() => removeKeyResult(index)}
                      >
                        <Trash2 size={16} />
                      </button>
                    )}
                  </div>
                )
              })}
          </div>

          <div className="flex gap-4 justify-end mt-6">
            <button type="button" className="btn btn-secondary" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              Create Goal
            </button>
          </div>

          {error && (
            <div className="text-red-600 mb-4 text-sm font-medium mt-2" role="alert">
              {error}
            </div>
          )}
        </form>
      </div>
    </div>
  )
}

export default GoalModal;