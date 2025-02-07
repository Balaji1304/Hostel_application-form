import React from 'react';
import { format } from 'date-fns';
import { CheckCircle, Clock, UserPlus } from 'lucide-react';
import { Resident } from '../types';

interface ResidentListProps {
  residents: Resident[];
  onStatusChange: (id: string, status: 'pending' | 'completed') => void;
  onAddNew: () => void;
}

export function ResidentList({ residents, onStatusChange, onAddNew }: ResidentListProps) {
  return (
    <div className="bg-white shadow overflow-hidden sm:rounded-md">
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
      <ul className="divide-y divide-gray-200">
        {residents.map((resident) => (
          <li key={resident.id}>
            <div className="px-4 py-4 sm:px-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <p className="text-sm font-medium text-indigo-600 truncate">
                    {resident.fullName}
                  </p>
                  <div className="ml-2">
                    {resident.applicationStatus === 'completed' ? (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        <CheckCircle className="h-3 w-3 mr-1" />
                        Completed
                      </span>
                    ) : (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                        <Clock className="h-3 w-3 mr-1" />
                        Pending
                      </span>
                    )}
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <p className="text-sm text-gray-500">
                    {format(new Date(resident.submissionDate), 'MMM d, yyyy')}
                  </p>
                  <select
                    value={resident.applicationStatus}
                    onChange={(e) => 
                      onStatusChange(
                        resident.id,
                        e.target.value as 'pending' | 'completed'
                      )
                    }
                    className="text-sm rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  >
                    <option value="pending">Pending</option>
                    <option value="completed">Completed</option>
                  </select>
                </div>
              </div>
              <div className="mt-2 sm:flex sm:justify-between">
                <div className="sm:flex">
                  <p className="flex items-center text-sm text-gray-500">
                    {resident.contactNumber}
                  </p>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}