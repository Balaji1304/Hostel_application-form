import React from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { FormField } from '../form/FormField';
import { triggerForm } from '../../services/formTrigger';
import type { FormTrigger } from '../../types';

interface TriggerFormProps {
  onSuccess: () => void;
  onCancel: () => void;
}

export function TriggerForm({ onSuccess, onCancel }: TriggerFormProps) {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormTrigger>();
  
  const onSubmit = async (data: FormTrigger) => {
    try {
      await triggerForm(data);
      toast.success('Form invitation sent successfully!');
      onSuccess();
    } catch (err) {
      toast.error('Failed to send form invitation. Please try again.');
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-medium text-gray-900">
            Send Form Invitation
          </h3>
          <p className="mt-1 text-sm text-gray-500">
            Enter the resident's details to send them a form invitation via SMS.
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
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
                message: 'Invalid phone number format'
              }
            })}
            placeholder="+91XXXXXXXXXX"
            error={errors.contactNumber?.message}
            required
          />

          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={onCancel}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
            >
              {isSubmitting ? 'Sending...' : 'Send Invitation'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}