import React from 'react';
import { useForm } from 'react-hook-form';
import { FormField } from '../FormField';
import { triggerForm } from '../../services/formTrigger';
import type { FormTrigger } from '../../types';

interface TriggerFormProps {
  onSuccess: () => void;
  onCancel: () => void;
}

export function TriggerForm({ onSuccess, onCancel }: TriggerFormProps) {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormTrigger>();
  const [error, setError] = React.useState<string>();

  const onSubmit = async (data: FormTrigger) => {
    try {
      setError(undefined);
      await triggerForm(data);
      onSuccess();
    } catch (err) {
      setError('Failed to send form invitation. Please try again.');
    }
  };

  return (
    <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
      <div className="sm:flex sm:items-start">
        <div className="mt-3 text-center sm:mt-0 sm:text-left w-full">
          <h3 className="text-lg leading-6 font-medium text-gray-900">
            Send Form Invitation
          </h3>
          <div className="mt-2">
            <p className="text-sm text-gray-500">
              Enter the resident's details to send them a form invitation via SMS.
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="mt-4 space-y-4">
            <FormField
              label="Full Name"
              {...register('fullName', { required: 'Full name is required' })}
              error={errors.fullName?.message}
              required
            />

            <FormField
              label="Contact Number"
              {...register('contactNumber', {
                required: 'Contact number is required',
                pattern: {
                  value: /^\+?[\d\s-]+$/,
                  message: 'Invalid phone number'
                }
              })}
              error={errors.contactNumber?.message}
              required
            />

            {error && (
              <div className="text-sm text-red-600">{error}</div>
            )}

            <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:ml-3 sm:w-auto sm:text-sm disabled:opacity-50"
              >
                {isSubmitting ? 'Sending...' : 'Send Invitation'}
              </button>
              <button
                type="button"
                onClick={onCancel}
                className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:w-auto sm:text-sm"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}