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
  const [fieldErrors, setFieldErrors] = useState<{[key: string]: string}>({});

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear field error when user starts typing
    if (fieldErrors[name]) {
      setFieldErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Client-side validation
    const errors: string[] = [];
    const newFieldErrors: {[key: string]: string} = {};
    
    if (!formData.firstName.trim()) {
      errors.push('First name is required');
      newFieldErrors.firstName = 'First name is required';
    }
    
    if (!formData.lastName.trim()) {
      errors.push('Last name is required');
      newFieldErrors.lastName = 'Last name is required';
    }
    
    if (!formData.email.trim()) {
      errors.push('Email is required');
      newFieldErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.push('Please enter a valid email address');
      newFieldErrors.email = 'Please enter a valid email address';
    }
    
    if (!formData.educationalBackground) {
      errors.push('Educational background is required');
      newFieldErrors.educationalBackground = 'Educational background is required';
    }
    
    if (!formData.experienceRating) {
      errors.push('Experience rating is required');
      newFieldErrors.experienceRating = 'Experience rating is required';
    }
    
    if (errors.length > 0) {
      setFieldErrors(newFieldErrors);
      setSubmitMessage(`Please fix the following errors: ${errors.join(', ')}`);
      // Focus on first error field
      const firstErrorField = Object.keys(newFieldErrors)[0];
      const firstErrorElement = document.getElementById(firstErrorField);
      if (firstErrorElement) {
        firstErrorElement.focus();
      }
      return;
    }
    
    // Clear any previous errors
    setFieldErrors({});
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
    <main className="min-h-screen bg-gray-100 py-6 sm:py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        {/* Header */}     
        <header className="text-center mb-6 sm:mb-8">
            <h1 className='text-2xl sm:text-3xl md:text-4xl font-kantumruy m-8 sm:m-16 text-[#0078d4]'>
                QDW 2026 Pre-registration
            </h1>   
          <p className="text-lg sm:text-xl md:text-2xl font-normal text-[#234285] px-2">
            You may <strong>pre-register</strong> below to indicate your interest and receive an email notifying you when registration opens.
          </p>
        </header>

        {/* Form */}
        <form 
          onSubmit={handleSubmit} 
          className="space-y-6"
          aria-labelledby="registration-heading"
          noValidate
        >
          <div className="sr-only">
            <h2 id="registration-heading">Pre-registration Form</h2>
          </div>
          
          {/* Name Section */}
          <fieldset>
            <legend className="block text-sm font-kantumruy text-[#234285] mb-2">
              Name <span className="font-kantumruy text-red-600" aria-label="required">*</span>
            </legend>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="firstName" className="block text-xs font-kantumruy text-[#234285] mb-1">
                  First Name
                </label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  placeholder='Enter your first name'
                  onChange={handleInputChange}
                  required
                  aria-required="true"
                  aria-describedby={fieldErrors.firstName ? "firstName-error" : undefined}
                  aria-invalid={!!fieldErrors.firstName}
                  className={`w-full px-3 py-2 font-kantumruy text-[#234285] border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                    fieldErrors.firstName ? 'border-red-500 bg-red-50' : 'border-gray-300'
                  }`}
                />
                {fieldErrors.firstName && (
                  <p id="firstName-error" className="mt-1 text-sm text-red-600" role="alert">
                    {fieldErrors.firstName}
                  </p>
                )}
              </div>
              <div>
                <label htmlFor="lastName" className="block text-xs font-kantumruy text-[#234285] mb-1">
                  Last Name
                </label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  placeholder='Enter your last name'
                  onChange={handleInputChange}
                  required
                  aria-required="true"
                  aria-describedby={fieldErrors.lastName ? "lastName-error" : undefined}
                  aria-invalid={!!fieldErrors.lastName}
                  className={`w-full px-3 py-2 border font-kantumruy text-[#234285] rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                    fieldErrors.lastName ? 'border-red-500 bg-red-50' : 'border-gray-300'
                  }`}
                />
                {fieldErrors.lastName && (
                  <p id="lastName-error" className="mt-1 text-sm text-red-600" role="alert">
                    {fieldErrors.lastName}
                  </p>
                )}
              </div>
            </div>
          </fieldset>

          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-kantumruy text-[#234285] mb-2">
              Email <span className="font-kantumruy text-red-600" aria-label="required">*</span>
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              placeholder='Enter your email address'
              onChange={handleInputChange}
              required
              aria-required="true"
              aria-describedby={fieldErrors.email ? "email-error" : undefined}
              aria-invalid={!!fieldErrors.email}
              className={`w-full px-3 py-2 font-kantumruy text-[#234285] border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                fieldErrors.email ? 'border-red-500 bg-red-50' : 'border-gray-300'
              }`}
            />
            {fieldErrors.email && (
              <p id="email-error" className="mt-1 text-sm text-red-600" role="alert">
                {fieldErrors.email}
              </p>
            )}
          </div>

          {/* Educational Background */}
          <div>
            <label htmlFor="educationalBackground" className="block text-sm font-kantumruy text-[#234285] mb-2">
              Educational Background <span className="font-kantumruy text-red-600" aria-label="required">*</span>
            </label>
            <select
              id="educationalBackground"
              name="educationalBackground"
              value={formData.educationalBackground}
              onChange={handleInputChange}
              required
              aria-required="true"
              aria-describedby={fieldErrors.educationalBackground ? "education-error" : undefined}
              aria-invalid={!!fieldErrors.educationalBackground}
              className={`w-full px-3 py-2 font-kantumruy text-[#234285] border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white transition-colors ${
                fieldErrors.educationalBackground ? 'border-red-500 bg-red-50' : 'border-gray-300'
              }`}
            >
              <option value="">Select an option</option>
              <option value="high-school">High School</option>              
              <option value="bachelor">Bachelor&apos;s Degree</option>
              <option value="master">Master&apos;s Degree</option>
              <option value="phd">PhD</option>
              <option value="other">Other</option>
            </select>
            {fieldErrors.educationalBackground && (
              <p id="education-error" className="mt-1 text-sm text-red-600" role="alert">
                {fieldErrors.educationalBackground}
              </p>
            )}
          </div>

          {/* Experience Rating */}
          <div>
            <label htmlFor="experienceRating" className="block text-sm font-kantumruy text-[#234285] mb-2">
              Rate your experience in superconducting quick design: <span className="font-kantumruy text-red-600" aria-label="required">*</span>
            </label>
            <select
              id="experienceRating"
              name="experienceRating"
              value={formData.experienceRating}
              onChange={handleInputChange}
              required
              aria-required="true"
              aria-describedby={fieldErrors.experienceRating ? "experience-error" : undefined}
              aria-invalid={!!fieldErrors.experienceRating}
              className={`w-full px-3 py-2 font-kantumruy text-[#234285] border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white transition-colors ${
                fieldErrors.experienceRating ? 'border-red-500 bg-red-50' : 'border-gray-300'
              }`}
            >
              <option value="">Select an option</option>
              <option value="beginner">Beginner</option>
              <option value="intermediate">Intermediate</option>
              <option value="advanced">Advanced</option>
              <option value="expert">Expert</option>
            </select>
            {fieldErrors.experienceRating && (
              <p id="experience-error" className="mt-1 text-sm text-red-600" role="alert">
                {fieldErrors.experienceRating}
              </p>
            )}
          </div>

          {/* Institution Name */}
          <div>
            <label htmlFor="institutionName" className="block text-sm font-kantumruy text-[#234285] mb-2">
              Institution Name
            </label>
            <p className="text-xs font-kantumruy text-[#234285] mb-2">The most recent institution you attended</p>
            <input
              type="text"
              id="institutionName"
              name="institutionName"
              value={formData.institutionName}
              onChange={handleInputChange}
              placeholder="Enter your institution name"
              className="w-full px-3 py-2 font-kantumruy text-[#234285] border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
            />
          </div>          
          {/* Submit Message */}
          {submitMessage && (
            <div 
              className={`text-center p-4 rounded-md font-kantumruy ${
                submitMessage.includes('successfully') 
                  ? 'bg-green-100 text-green-800 border border-green-300' 
                  : 'bg-red-100 text-red-800 border border-red-300'
              }`}
              role="alert"
              aria-live="polite"
              aria-atomic="true"
            >
              {submitMessage}
            </div>
          )}

          {/* Submit Button */}
          <div className="flex justify-center pt-2">
            <button
              type="submit"
              disabled={isSubmitting}
              aria-describedby={isSubmitting ? "submitting-status" : undefined}
              className={`font-kantumruy py-3 px-6 sm:px-8 text-base sm:text-lg rounded-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 min-w-[120px] ${
                isSubmitting
                  ? 'bg-gray-400 cursor-not-allowed text-gray-700'
                  : 'bg-[#234285] hover:bg-blue-700 text-white hover:shadow-lg transform hover:-translate-y-0.5'
              }`}
            >
              {isSubmitting ? (
                <>
                  <span className="sr-only" id="submitting-status">Form is being submitted</span>
                  <span aria-hidden="true">Submitting...</span>
                </>
              ) : (
                'Submit'
              )}
            </button>
          </div>
        </form>
      </div>
    </main>
  );


}