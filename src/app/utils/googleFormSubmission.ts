// Utility for submitting to Google Forms with fallback methods

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  educationalBackground: string;
  experienceRating: string;
  institutionName: string;
}

async function triggerMailchimpSync(formData: FormData): Promise<void> {
  try {
    console.log('Triggering automatic Mailchimp sync for:', formData.email);
    
    // Wait 2 seconds for Google Sheets to update with the new form submission
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Call the sync API endpoint
    const response = await fetch('/api/sync-to-mailchimp', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    if (response.ok) {
      const result = await response.json();
      console.log('Mailchimp sync completed:', result);
    } else {
      console.error('Mailchimp sync failed:', response.status, response.statusText);
    }
  } catch (error) {
    console.error('Error triggering Mailchimp sync:', error);
    // Don't throw error here - we don't want to fail the form submission
    // if the Mailchimp sync fails
  }
}

export async function submitToGoogleForm(formData: FormData): Promise<boolean> {
  const GOOGLE_FORM_URL = process.env.NEXT_PUBLIC_GOOGLE_FORM_URL;
  
  if (!GOOGLE_FORM_URL) {
    throw new Error('Google Form URL not configured');
  }

  // Map form values to Google Forms expected values
  const mapEducationValue = (value: string): string => {
    const mapping: { [key: string]: string } = {
      'high-school': 'High School',
      'bachelor': "Bachelor's Degree",
      'master': "Master's Degree", 
      'phd': 'PhD',
      'other': 'Other'
    };
    return mapping[value] || value;
  };

  const mapExperienceValue = (value: string): string => {
    const mapping: { [key: string]: string } = {
      'beginner': 'Beginner',
      'intermediate': 'Intermediate',
      'advanced': 'Advanced',
      'expert': 'Expert'
    };
    return mapping[value] || value;
  };

  // Convert viewform URL to formResponse URL if needed
  const formResponseUrl = GOOGLE_FORM_URL.replace('/viewform', '/formResponse');
  // Use fetch with no-cors mode (most reliable approach for Google Forms)
  try {
    // Build the URL with parameters
    const params = new URLSearchParams();
    
    if (process.env.NEXT_PUBLIC_GOOGLE_FORM_FIRST_NAME) {
      params.append(process.env.NEXT_PUBLIC_GOOGLE_FORM_FIRST_NAME, formData.firstName);
    }
    if (process.env.NEXT_PUBLIC_GOOGLE_FORM_LAST_NAME) {
      params.append(process.env.NEXT_PUBLIC_GOOGLE_FORM_LAST_NAME, formData.lastName);
    }
    if (process.env.NEXT_PUBLIC_GOOGLE_FORM_EMAIL) {
      params.append(process.env.NEXT_PUBLIC_GOOGLE_FORM_EMAIL, formData.email);
    }    if (process.env.NEXT_PUBLIC_GOOGLE_FORM_EDUCATION) {
      params.append(process.env.NEXT_PUBLIC_GOOGLE_FORM_EDUCATION, mapEducationValue(formData.educationalBackground));
    }
    if (process.env.NEXT_PUBLIC_GOOGLE_FORM_EXPERIENCE) {
      params.append(process.env.NEXT_PUBLIC_GOOGLE_FORM_EXPERIENCE, mapExperienceValue(formData.experienceRating));
    }if (process.env.NEXT_PUBLIC_GOOGLE_FORM_INSTITUTION) {
      params.append(process.env.NEXT_PUBLIC_GOOGLE_FORM_INSTITUTION, formData.institutionName);
    }

    // Add required submit parameter
    params.append('submit', 'Submit');

    const submitUrl = `${formResponseUrl}?${params.toString()}`;

    console.log('Submitting to URL:', submitUrl);    // Method 1: Try POST with form data in body
    try {
      const formDataToSubmit = new FormData();
      
      if (process.env.NEXT_PUBLIC_GOOGLE_FORM_FIRST_NAME) {
        formDataToSubmit.append(process.env.NEXT_PUBLIC_GOOGLE_FORM_FIRST_NAME, formData.firstName);
      }
      if (process.env.NEXT_PUBLIC_GOOGLE_FORM_LAST_NAME) {
        formDataToSubmit.append(process.env.NEXT_PUBLIC_GOOGLE_FORM_LAST_NAME, formData.lastName);
      }
      if (process.env.NEXT_PUBLIC_GOOGLE_FORM_EMAIL) {
        formDataToSubmit.append(process.env.NEXT_PUBLIC_GOOGLE_FORM_EMAIL, formData.email);
      }      if (process.env.NEXT_PUBLIC_GOOGLE_FORM_EDUCATION) {
        formDataToSubmit.append(process.env.NEXT_PUBLIC_GOOGLE_FORM_EDUCATION, mapEducationValue(formData.educationalBackground));
      }
      if (process.env.NEXT_PUBLIC_GOOGLE_FORM_EXPERIENCE) {
        formDataToSubmit.append(process.env.NEXT_PUBLIC_GOOGLE_FORM_EXPERIENCE, mapExperienceValue(formData.experienceRating));
      }
      if (process.env.NEXT_PUBLIC_GOOGLE_FORM_INSTITUTION) {
        formDataToSubmit.append(process.env.NEXT_PUBLIC_GOOGLE_FORM_INSTITUTION, formData.institutionName);
      }

      await fetch(formResponseUrl, {
        method: 'POST',
        mode: 'no-cors',
        body: formDataToSubmit
      });      
      console.log('Form submitted successfully via fetch');
      
      // Automatically sync to Mailchimp after successful form submission
      await triggerMailchimpSync(formData);
      
      return true;
    } catch (fetchError) {
      console.log('Fetch method failed, trying image method:', fetchError);
      
      // Method 2: Use image tag approach (works around CORS)
      return new Promise((resolve) => {
        const img = new Image();
          img.onload = () => {
          console.log('Form submitted successfully via image method');
          
          // Automatically sync to Mailchimp after successful form submission
          triggerMailchimpSync(formData).finally(() => {
            resolve(true);
          });
        };
          img.onerror = () => {
          console.log('Image method completed (this is expected for form submission)');
          // Even if the image "fails" to load, the form submission likely succeeded
          // because Google Forms returns a response that can't be displayed as an image
          
          // Automatically sync to Mailchimp after successful form submission
          triggerMailchimpSync(formData).finally(() => {
            resolve(true);
          });
        };
        
        // Set the src to trigger the request
        img.src = submitUrl;
        
        // Fallback timeout
        setTimeout(() => {
          console.log('Form submission timeout - assuming success');
          resolve(true);
        }, 3000);
      });
    }
  } catch (error) {
    console.error('Form submission failed:', error);
    return false;
  }
}
