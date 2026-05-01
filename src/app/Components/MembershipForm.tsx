"use client";
import { useRef, useState, useEffect } from "react";

export default function MembershipForm() {
  const [sent, setSent] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const submitted = useRef(false);

  // Reset form after 5 seconds
  useEffect(() => {
    if (sent) {
      const timer = setTimeout(() => {
        setSent(false);
        setIsSubmitting(false);
        submitted.current = false;
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [sent]);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    
    if (submitted.current || isSubmitting) return;
    
    setIsSubmitting(true);
    submitted.current = true;

    const form = event.currentTarget;
    const formData = new FormData(form);

    const membershipData = {
      firstName: formData.get('firstName') as string,
      lastName: formData.get('lastName') as string,
      email: formData.get('email') as string,
      educationalBackground: formData.get('educationalBackground') as string,
      year: formData.get('year') as string,
      reasonToJoin: formData.get('reasonToJoin') as string,
    };

    try {
      const response = await fetch('/api/submit-membership', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(membershipData),
      });

      if (response.ok) {
        console.log('Form submitted successfully');
        setTimeout(() => setSent(true), 300);
      } else {
        console.error('Form submission failed');
        setIsSubmitting(false);
        submitted.current = false;
        alert('Sorry, there was an error submitting your form. Please try again.');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setIsSubmitting(false);
      submitted.current = false;
      alert('Sorry, there was an error submitting your form. Please try again.');
    }
  }

  return (
    <div className="flex flex-col">
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-background flex-grow ">
        <h2 className="relative -top-4 text-[36px] bg-background font-bold text-[#234285] font-kantumruy text-main text-center mb-1.5">
          Membership
        </h2>

        <div className="w-full max-w-xs sm:max-w-sm md:max-w-xl lg:max-w-4xl xl:max-w-5xl mx-auto">
          {!sent ? (
            <>
              <form
                className="text-main text-2xl font-bold"
                onSubmit={handleSubmit}
              >
                <label htmlFor="first-name" className="block text-main font-bold font-bold text-[#234285] mb-1">
                  Name
                </label>

                <div className="grid grid-cols-1 md:grid-cols-2 md:gap-20">
                  <div className="mb-8">
                    <label htmlFor="first-name" className="block font-normal font-bold text-[#234285] mb-2">
                      First Name
                    </label>
                    <input
                      type="text"
                      id="first-name"
                      name="firstName"
                      required
                      className="w-full rounded-sm border-3 border-main/40 bg-background px-3 py-2 outline-none font-normal focus:border-main/60 focus:shadow-[0_0_8px_rgba(35,66,133,0.7)] transition"
                    />
                  </div>

                  <div className="mb-8">
                    <label htmlFor="last-name" className="block font-normal font-bold text-[#234285] mb-2">
                      Last Name
                    </label>
                    <input
                      type="text"
                      id="last-name"
                      name="lastName"
                      required
                      className="w-full rounded-sm border-3 border-main/40 bg-background font-bold text-[#234285] px-3 py-2 outline-none font-normal focus:border-main/60 focus:shadow-[0_0_8px_rgba(35,66,133,0.7)] transition"
                    />
                  </div>
                </div>

                <div className="mb-8">
                  <label htmlFor="email" className="block font-bold font-bold text-[#234285] mb-2">
                    Email <span className="font-normal">(required)</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    className="w-full rounded-sm border-3 border-main/40 bg-background px-3 py-2 outline-none font-normal focus:border-main/60 focus:shadow-[0_0_8px_rgba(35,66,133,0.7)] transition"
                  />
                </div>

                <div className="mb-8">
                  <label htmlFor="education" className="block font-bold mb-2 font-bold text-[#234285]">
                    Educational Background <span className="font-normal">(required)</span>
                  </label>
                  <select
                    id="education"
                    name="educationalBackground"
                    required
                    className="w-full rounded-sm border-3 border-main/40 bg-background font-bold text-[#234285] px-3 py-2 outline-none font-normal focus:border-main/60 focus:shadow-[0_0_8px_rgba(35,66,133,0.7)] transition"
                  >
                    <option value="">Select your educational background</option>
                    <option value="High School">High School</option>
                    <option value="Bachelor&#39;s Degree">Bachelor&#39;s Degree</option>
                    <option value="Master&#39;s Degree">Master&#39;s Degree</option>
                    <option value="PhD">PhD</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div className="mb-8">
                  <label htmlFor="year" className="block font-bold text-[#234285] mb-2">
                    Year in Education <span className="font-normal">(required)</span>
                  </label>
                  <input
                    type="text"
                    id="year"
                    name="year"
                    required
                    placeholder="e.g. 1st year, 2nd year, Senior, Graduate..."
                    className="w-full rounded-sm border-3 border-main/40 bg-background px-3 py-2 outline-none font-normal focus:border-main/60 focus:shadow-[0_0_8px_rgba(35,66,133,0.7)] transition"
                  />
                </div>

                <div className="mb-8">
                  <label htmlFor="rate" className="block font-bold font-bold text-[#234285] mb-2">
                    Why do you want to join QCSA?{" "}
                    <span className="font-normal">(required)</span>
                  </label>
                  <input
                    type="text"
                    id="rate"
                    name="reasonToJoin"
                    required
                    className="w-full rounded-sm border-3 font-bold text-[#234285] border-main/40 bg-background px-3 py-2 outline-none font-normal focus:border-main/60 focus:shadow-[0_0_8px_rgba(35,66,133,0.7)] transition"
                  />
                </div>

                {/* <div className="mb-8">
                  <label htmlFor="institution-name" className="block text-main font-bold mb-1">
                    Institution Name
                  </label>
                  <p className="text-main font-normal mb-2">
                    The most recent institution you attended
                  </p>
                  <input
                    type="text"
                    id="institution-name"
                    name="institutionName"
                    className="w-full rounded-sm bg-[#F8FAFF] border-3 border-main/40 px-3 py-2 outline-none font-normal focus:border-main/60 focus:shadow-[0_0_8px_rgba(35,66,133,0.7)] transition"
                  />
                </div> */}

                <div className="mt-16 flex justify-center">
                  <button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="rounded-sm px-12 py-3 text-white disabled:opacity-50 disabled:cursor-not-allowed"
                    style={{ backgroundColor: '#234285' }}
                  >
                    {isSubmitting ? 'Submitting...' : 'Register'}
                  </button>
                </div>
              </form>
            </>
          ) : (
            <div className="text-center text-main">
              <h3 className="text-3xl font-bold mb-2">Thanks for registering! 🎉</h3>
              <p className="text-lg font-normal">We’ve received your response.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
