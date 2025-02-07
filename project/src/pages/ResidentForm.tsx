import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { FormField } from '../components/FormField';
import { submitResidentForm } from '../services/resident';
import type { ResidentForm as ResidentFormType } from '../types';

export function ResidentForm() {
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm<ResidentFormType>();
  const [submitting, setSubmitting] = React.useState(false);

  const onSubmit = async (data: ResidentFormType) => {
    try {
      setSubmitting(true);
      await submitResidentForm(data);
      navigate('/dashboard');
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div className="md:grid md:grid-cols-3 md:gap-6">
        <div className="md:col-span-1">
          <div className="px-4 sm:px-0">
            <h3 className="text-lg font-medium leading-6 text-gray-900">
              Resident Information
            </h3>
            <p className="mt-1 text-sm text-gray-600">
              Please fill in all the required information for the new resident.
            </p>
          </div>
        </div>

        <div className="mt-5 md:mt-0 md:col-span-2">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="shadow overflow-hidden sm:rounded-md">
              <div className="px-4 py-5 bg-white sm:p-6">
                <div className="grid grid-cols-6 gap-6">
                  <div className="col-span-6 sm:col-span-4">
                    <FormField
                      label="Full Name"
                      {...register('fullName', { required: 'Full name is required' })}
                      error={errors.fullName?.message}
                      required
                    />
                  </div>

                  <div className="col-span-6 sm:col-span-3">
                    <FormField
                      label="Date of Birth"
                      type="date"
                      {...register('dob', { required: 'Date of birth is required' })}
                      error={errors.dob?.message}
                      required
                    />
                  </div>

                  <div className="col-span-6 sm:col-span-3">
                    <FormField
                      label="Age"
                      type="number"
                      {...register('age', { 
                        required: 'Age is required',
                        min: { value: 16, message: 'Minimum age is 16' },
                        max: { value: 35, message: 'Maximum age is 35' }
                      })}
                      error={errors.age?.message}
                      required
                    />
                  </div>

                  <div className="col-span-6 sm:col-span-3">
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
                  </div>

                  <div className="col-span-6 sm:col-span-3">
                    <FormField
                      label="Email"
                      type="email"
                      {...register('email', { 
                        required: 'Email is required',
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                          message: 'Invalid email address'
                        }
                      })}
                      error={errors.email?.message}
                      required
                    />
                  </div>

                  <div className="col-span-6 sm:col-span-3">
                    <FormField
                      label="Nationality"
                      {...register('nationality', { required: 'Nationality is required' })}
                      error={errors.nationality?.message}
                      required
                    />
                  </div>

                  <div className="col-span-6 sm:col-span-3">
                    <FormField
                      label="Religion"
                      {...register('religion', { required: 'Religion is required' })}
                      error={errors.religion?.message}
                      required
                    />
                  </div>

                  <div className="col-span-6">
                    <FormField
                      label="Permanent Address"
                      {...register('permanentAddress', { required: 'Permanent address is required' })}
                      error={errors.permanentAddress?.message}
                      required
                    />
                  </div>

                  <div className="col-span-6">
                    <FormField
                      label="Current Address"
                      {...register('currentAddress', { required: 'Current address is required' })}
                      error={errors.currentAddress?.message}
                      required
                    />
                  </div>

                  <div className="col-span-6 border-t pt-6">
                    <h4 className="text-lg font-medium text-gray-900 mb-4">
                      Emergency Contact
                    </h4>
                    <div className="grid grid-cols-6 gap-6">
                      <div className="col-span-6 sm:col-span-4">
                        <FormField
                          label="Name"
                          {...register('emergencyContact.name', { required: 'Emergency contact name is required' })}
                          error={errors.emergencyContact?.name?.message}
                          required
                        />
                      </div>
                      <div className="col-span-6 sm:col-span-3">
                        <FormField
                          label="Relation"
                          {...register('emergencyContact.relation', { required: 'Relation is required' })}
                          error={errors.emergencyContact?.relation?.message}
                          required
                        />
                      </div>
                      <div className="col-span-6 sm:col-span-3">
                        <FormField
                          label="Phone"
                          {...register('emergencyContact.phone', { 
                            required: 'Emergency contact phone is required',
                            pattern: {
                              value: /^\+?[\d\s-]+$/,
                              message: 'Invalid phone number'
                            }
                          })}
                          error={errors.emergencyContact?.phone?.message}
                          required
                        />
                      </div>
                    </div>
                  </div>

                  <div className="col-span-6 border-t pt-6">
                    <h4 className="text-lg font-medium text-gray-900 mb-4">
                      Parent/Guardian Information
                    </h4>
                    <div className="grid grid-cols-6 gap-6">
                      <div className="col-span-6 sm:col-span-4">
                        <FormField
                          label="Name"
                          {...register('guardian.name', { required: 'Guardian name is required' })}
                          error={errors.guardian?.name?.message}
                          required
                        />
                      </div>
                      <div className="col-span-6 sm:col-span-3">
                        <FormField
                          label="Relation"
                          {...register('guardian.relation', { required: 'Relation is required' })}
                          error={errors.guardian?.relation?.message}
                          required
                        />
                      </div>
                      <div className="col-span-6 sm:col-span-3">
                        <FormField
                          label="Phone"
                          {...register('guardian.phone', { 
                            required: 'Guardian phone is required',
                            pattern: {
                              value: /^\+?[\d\s-]+$/,
                              message: 'Invalid phone number'
                            }
                          })}
                          error={errors.guardian?.phone?.message}
                          required
                        />
                      </div>
                      <div className="col-span-6">
                        <FormField
                          label="Address"
                          {...register('guardian.address', { required: 'Guardian address is required' })}
                          error={errors.guardian?.address?.message}
                          required
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                <button
                  type="button"
                  onClick={() => navigate('/dashboard')}
                  className="mr-3 inline-flex justify-center py-2 px-4 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
                >
                  {submitting ? 'Submitting...' : 'Submit'}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}