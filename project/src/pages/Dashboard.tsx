import React from 'react';
import { toast } from 'react-hot-toast';
import { TriggerForm } from '../components/dashboard/TriggerForm';
import { ApplicationList } from '../components/dashboard/ApplicationList';
import { useApplications } from '../services/applications/hooks';

export function Dashboard() {
  const { applications, loading, error, refresh } = useApplications();
  const [showTriggerForm, setShowTriggerForm] = React.useState(false);

  React.useEffect(() => {
    if (error) {
      toast.error('Failed to load applications');
    }
  }, [error]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="md:flex md:items-center md:justify-between">
        <div className="flex-1 min-w-0">
          <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
            Application Forms
          </h2>
        </div>
        <div className="mt-4 flex md:mt-0 md:ml-4">
          <button
            onClick={() => setShowTriggerForm(true)}
            className="ml-3 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            New Application
          </button>
        </div>
      </div>

      {showTriggerForm ? (
        <TriggerForm
          onSuccess={() => {
            setShowTriggerForm(false);
            refresh();
          }}
          onCancel={() => setShowTriggerForm(false)}
        />
      ) : (
        <ApplicationList applications={applications} />
      )}
    </div>
  );
}