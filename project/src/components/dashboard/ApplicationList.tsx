import React from 'react';
import { format, parseISO } from 'date-fns';
import { Copy, ExternalLink } from 'lucide-react';
import { toast } from 'react-hot-toast';
import type { FormApplication } from '../../types';

interface ApplicationListProps {
  applications: FormApplication[];
}

export function ApplicationList({ applications }: ApplicationListProps) {
  const copyToClipboard = async (url: string) => {
    try {
      await navigator.clipboard.writeText(url);
      toast.success('URL copied to clipboard!');
    } catch (err) {
      toast.error('Failed to copy URL');
    }
  };

  const formatDate = (dateString: string) => {
    try {
      return format(parseISO(dateString), 'MMM d, yyyy');
    } catch (error) {
      console.error('Invalid date:', dateString);
      return 'Invalid date';
    }
  };

  const formatDateTime = (dateString: string) => {
    try {
      return format(parseISO(dateString), 'MMM d, yyyy HH:mm');
    } catch (error) {
      console.error('Invalid date:', dateString);
      return 'Invalid date';
    }
  };

  if (applications.length === 0) {
    return (
      <div className="bg-white shadow-sm rounded-lg p-6 text-center text-gray-500">
        No applications found. Create a new application to get started.
      </div>
    );
  }

  return (
    <div className="bg-white shadow-sm rounded-lg overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Resident Name
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Created Date
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Expiry
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Form Link
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {applications.map((app) => (
              <tr key={app.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{app.residentName}</div>
                  <div className="text-sm text-gray-500">{app.contactNumber}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    app.status === 'completed' 
                      ? 'bg-green-100 text-green-800'
                      : app.status === 'expired'
                      ? 'bg-red-100 text-red-800'
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {app.status.charAt(0).toUpperCase() + app.status.slice(1)}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {formatDate(app.createdAt)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {formatDateTime(app.expiryDate)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => copyToClipboard(app.formLink)}
                      className="text-indigo-600 hover:text-indigo-900"
                      title="Copy URL"
                    >
                      <Copy className="h-4 w-4" />
                    </button>
                    <a
                      href={app.formLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-indigo-600 hover:text-indigo-900"
                      title="Open form"
                    >
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}