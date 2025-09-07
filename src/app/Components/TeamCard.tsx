
type TeamProps = {
    title: string;
    subtitle: string;
    members: string;
    linkUrl: string;
}
export default function TeamCard({title, subtitle, members, linkUrl}: TeamProps) {
  return (
    <div className= 'relative w-full h-full max-w-sm mx-auto text-center text-main'>
        <img
        src="/images/team-card-background.png"
        alt={title}
        className="block w-full h-auto"
      />
      
      <div className="absolute inset-0 flex h-full flex-col justify-begin p-10 py-20">
        <div>
            <h2 className="text-2xl ">{title}</h2>
            <h2 className="text-2xl mt-2">{subtitle}</h2>
        </div>

        <div className='mt-auto px-6'>
            <h3 className='font-bold'>Team Members:</h3>
            <p className=" mt-1">{members}</p>
        </div>

        <div className = 'mt-auto px-6'>
            <h3 className='font-bold'>Project Link:</h3>
            <a href={linkUrl} className="underline break-all ">
            {linkUrl}
            </a>
        </div>

      </div>
    </div>
  )
}
