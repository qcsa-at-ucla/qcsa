
export default function MembershipForm() {
  return (
  <div className="flex flex-col">
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-[#F3F8FF] flex-grow">
      <h2 className="relative -top-4 text-[36px] font-bold text-main text-center mb-1.5">Membership</h2>

        <div className="w-full max-w-xs sm:max-w-sm md:max-w-xl lg:max-w-4xl xl:max-w-5xl mx-auto">

          <form className='text-main text-2xl font-bold'>
              {/*Name */}
              <label
                  htmlFor="name"
                  className="block text-main font-bold mb-1"
                >
                  Name
                </label>

              <div className='grid grid-cols-1 md:grid-cols-2 md:gap-20'>
                {/*First Name */}
                <div className="mb-8">
                  <label 
                    htmlFor='first-name'
                    className='block font-normal mb-2'> 
                      First Name
                  </label>

                  <input
                    type='text'
                    id='first-name'
                    name='first-name'
                    className="w-full rounded-sm 
                    border-3 border-main/40 
                    bg-[#F8FAFF] px-3 py-2 outline-none font-normal
                    focus:border-main/60 focus:shadow-[0_0_8px_rgba(35,66,133,0.7)]
                    transition"
                  />
                </div>

                {/*Last Name */}
                <div className="mb-8">
                  <label 
                    htmlFor='last-name'
                    className='block font-normal mb-2'> 
                      Last Name
                  </label>

                  <input
                    type='text'
                    id='last-name'
                    name='last-name'
                    className="w-full rounded-sm 
                    border-3 border-main/40 
                    bg-[#F8FAFF] px-3 py-2 outline-none font-normal
                    focus:border-main/60 focus:shadow-[0_0_8px_rgba(35,66,133,0.7)]
                    transition"
                  />
                </div>

              </div>

              {/*Email*/}

              <div className="mb-8">
                <label htmlFor='email' className='block font-bold mb-2'>Email <span className='font-normal'>(required)</span></label>
                
                <input
                    type='text'
                    id='email'
                    name='email'
                    className="w-full rounded-sm 
                    border-3 border-main/40 
                    bg-[#F8FAFF] px-3 py-2 outline-none font-normal
                    focus:border-main/60 focus:shadow-[0_0_8px_rgba(35,66,133,0.7)]
                    transition"
                />
              </div>

              {/*Educational Background*/}

              <div className="mb-8">
                <label htmlFor='education' className='block font-bold mb-2'>Educational Background <span className='font-normal'>(required)</span></label>
                
                <input
                    type='text'
                    id='education'
                    name='education'
                    className="w-full rounded-sm 
                    border-3 border-main/40 
                    bg-[#F8FAFF] px-3 py-2 outline-none font-normal
                    focus:border-main/60 focus:shadow-[0_0_8px_rgba(35,66,133,0.7)]
                    transition"
                />
              </div>

              {/*Experience*/}

              <div className="mb-8">
                <label htmlFor='rate' className='block font-bold mb-2'>Rate your experience in superconducting quick design <span className='font-normal'>(required)</span></label>
                
                <input
                    type='text'
                    id='rate'
                    name='rate'
                    className="w-full rounded-sm 
                    border-3 border-main/40 
                    bg-[#F8FAFF] px-3 py-2 outline-none font-normal
                    focus:border-main/60 focus:shadow-[0_0_8px_rgba(35,66,133,0.7)]
                    transition"
                />
              </div>          

              {/*Institution*/}    
              <div className="mb-8">
                <label
                  htmlFor="institution-name"
                  className="block text-main font-bold mb-1"
                >
                  Institution Name
                </label>
                <p className="text-main font-normal mb-2">
                  The most recent institution you attended
                </p>
                <input
                  type="text"
                  id= 'institution-name'
                  name='institution-name'
                  className="w-full rounded-sm bg-[#F8FAFF]
                            border-3 border-main/40 
                            px-3 py-2 outline-none font-normal
                            focus:border-main/60 focus:shadow-[0_0_8px_rgba(35,66,133,0.7)]
                            transition"
                />
              </div>
              <div className='mt-16 flex justify-center' >
                <button
                  type = 'submit'
                  className='rounded-sm px-12 py-3 bg-main text-white'
                >Register</button>
              </div>
          </form>
        </div>
      </section>
    </div>
  )
}
