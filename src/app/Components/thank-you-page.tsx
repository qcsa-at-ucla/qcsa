'use client';

import React, { useState } from 'react';
import { submitToGoogleForm } from '../utils/googleFormSubmission';

export default function ThankYouPage() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    educationalBackground: '',
    experienceRating: '',
    institutionName: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage('');

    try {
      const success = await submitToGoogleForm(formData);
      
      if (success) {
        setSubmitMessage('Thank you! Your registration has been submitted successfully.');
        
        // Reset form
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          educationalBackground: '',
          experienceRating: '',
          institutionName: ''
        });
      } else {
        setSubmitMessage('There was an error submitting your form. Please try again.');
      }

    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitMessage('There was an error submitting your form. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-normal text-blue-600 mb-2">
            Join to become one of them.
          </h1>
          <h2 className="text-3xl md:text-4xl font-normal text-blue-600">
            See you at QDW2026!!
          </h2>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name Section */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Name <span className="text-gray-500">(required)</span>
            </label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs text-gray-600 mb-1">First Name</label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  placeholder='Enter your first name'
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-600 mb-1">Last Name</label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  placeholder='Enter your last name'
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email <span className="text-gray-500">(required)</span>
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              placeholder='Enter your email address'
              onChange={handleInputChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Educational Background */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Educational Background <span className="text-gray-500">(required)</span>
            </label>
            <select
              name="educationalBackground"
              value={formData.educationalBackground}
              onChange={handleInputChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
            >
              <option value="">Select an option</option>
              <option value="high-school">High School</option>              
              <option value="bachelor">Bachelor&apos;s Degree</option>
              <option value="master">Master&apos;s Degree</option>
              <option value="phd">PhD</option>
              <option value="other">Other</option>
            </select>
          </div>

          {/* Experience Rating */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Rate your experience in superconducting quick design: <span className="text-gray-500">(required)</span>
            </label>
            <select
              name="experienceRating"
              value={formData.experienceRating}
              onChange={handleInputChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
            >
              <option value="">Select an option</option>
              <option value="beginner">Beginner</option>
              <option value="intermediate">Intermediate</option>
              <option value="advanced">Advanced</option>
              <option value="expert">Expert</option>
            </select>
          </div>

          {/* Institution Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Institution Name
            </label>        
             <p className="text-xs text-gray-500 mb-2">The most recent institution you attended</p>
            <input
              type="text"
              name="institutionName"
              value={formData.institutionName}
              onChange={handleInputChange}
              placeholder="Enter your institution name"
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>          
          {/* Submit Message */}
          {submitMessage && (
            <div className={`text-center p-4 rounded-md ${
              submitMessage.includes('successfully') 
                ? 'bg-green-100 text-green-700 border border-green-300' 
                : 'bg-red-100 text-red-700 border border-red-300'
            }`}>
              {submitMessage}
            </div>
          )}

          {/* Submit Button */}
          <div className="flex justify-center pt-2">
            <button
              type="submit"
              disabled={isSubmitting}
              className={`font-medium py-3 px-8 rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                isSubmitting
                  ? 'bg-gray-400 cursor-not-allowed text-white'
                  : 'bg-blue-600 hover:bg-blue-700 text-white'
              }`}
            >
              {isSubmitting ? 'Submitting...' : 'Submit'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );


}
