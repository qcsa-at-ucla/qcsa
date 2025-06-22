

const testimonials = [
    `Excellent guidance and materials. 
    I will use this for self-paced learning going forward. 
    Thank you for making this possible!`,

    `I enjoyed every presenter. 
    The conference overall was very useful and informative.`, 

    `I really like QEC talks about the BB code by MIT, Chiplet Technology with Rigetti, 
    and how to teach quantum device/design.
    In general, the presentation guided us through the topic 
    and left us wondering with research questions.`

];

const stats = [
    { value: '37', label: 'Countries Represented'},
    { value: '103', label: 'In-Person Participants'},
    { value: '~300', label: 'Online Participants'}
];

export default function TestimonialsAndStats(){
    return (
        <section className='flex flex-col items-center text-center w-full p-12'>
            <h2 className='text-4xl font-semibold m-16 text-[#0078d4]'>
                What Our Participants Tell Us 
            </h2>

            <div className='grid gap-8 sm:grid-cols-3 text-center justify-items-center w-full m-6'>
                {testimonials.map((quote, ind) => (
                    <blockquote key = {ind} className='max-w-xl w-full text-2xl p-2'>
                        &ldquo;{quote}&rdquo;
                    </blockquote>
                ))}
            </div>

            <div className='grid gap-8 sm:grid-cols-3 justify-items-center w-full m-6'>
                {stats.map((stat, ind) => (
                    <div key={ind} className='max-w-xl w-full p-4'>
                       <div className='text-8xl font-bold'>{stat.value}</div>
                       <div className='text-2xl text-center'>{stat.label}</div>
                    </div>
                ))}
            </div>

            <h2 className='text-6xl font-semibold m-16 text-[#0078d4] pt-24'>
                See you at QDW2026!!
            </h2>
        </section>
    );
}