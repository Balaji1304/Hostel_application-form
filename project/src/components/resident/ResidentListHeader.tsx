import React from 'react';
import { UserPlus } from 'lucide-react';

interface ResidentListHeaderProps {
  onAddNew: () => void;
}

export function ResidentListHeader({ onAddNew }: ResidentListHeaderProps) {
  return (
    <div className="px-4 py-5 sm:px-6 flex justify-between items-center">
      <h3 className="text-lg leading-6 font-medium text-gray-900">Residents</h3>
      <button
        onClick={onAddNew}
        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
      >
        <UserPlus className="h-4 w-4 mr-2" />
        Add New Resident
      </button>
    </div>
  );
}