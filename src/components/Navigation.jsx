import React from 'react';

const Navigation = ({activeTab, setActiveTab}) => {

  const tabs = [
    {id: 'goals', label: 'My Goals'},
    {id: 'advisors', label: 'Advisors'},
    {id: "boards", label: "Boards"}
  ]

  return (
    <nav className='bg-white border-b border-gray-200 shadow-sm'>
      <div className='flex items-center justify-center px-4'>
      {tabs.map((tab) => {
        return (
            <button key={tab.id} id={tab.id} onClick={()=>setActiveTab(tab.id)}
            className={`px-8 py-4 border-none bg-none cursor-pointer flex items-center gap-2 font-medium text-gray-600 border-b-3 border-transparent transition-all duration-200  ${
                activeTab === tab.id ? ' active: bg-cyan-100 text-cyan-700' : 'hover:bg-gray-50'
              }`}
            >{tab.label}</button>
        )
      })}
      </div>
    </nav>
  );
}

export default Navigation;