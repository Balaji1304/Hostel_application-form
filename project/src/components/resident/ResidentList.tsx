import React from 'react';
import { ResidentListHeader } from './ResidentListHeader';
import { ResidentListItem } from './ResidentListItem';
import type { Resident } from '../../types';

interface ResidentListProps {
  residents: Resident[];
  onStatusChange: (id: string, status: 'pending' | 'completed') => void;
  onAddNew: () => void;
}

export function ResidentList({ residents, onStatusChange, onAddNew }: ResidentListProps) {
  return (
    <div className="bg-white shadow overflow-hidden sm:rounded-md">
      <ResidentListHeader onAddNew={onAddNew} />
      <ul className="divide-y divide-gray-200">
        {residents.map((resident) => (
          <ResidentListItem
            key={resident.id}
            resident={resident}
            onStatusChange={onStatusChange}
          />
        ))}
      </ul>
    </div>
  );
}