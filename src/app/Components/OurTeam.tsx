import TeamCard from "./TeamCard";

export default function OurTeam() {
  return (
    <section className = 'px-12'>
        <h2 className= 'text-center py-12' >Our Team - QuBruin</h2>
        <div className=' grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'>
            <TeamCard title='Winner of QuEra Track,' 
                    subtitle = 'YQuantum 2025'
                    members = 'Zhuoyang Ye, Mu Niu, Victor Yu, Hanyu Wang, Haochen Wang'
                    linkUrl='https://github.com/yezhuoyang/2025YaleQHack'></TeamCard>

            <TeamCard title='Grand Prize 3rd Place,' 
                            subtitle = 'YQuantum 2024'
                            members = 'John Zhuoyang Ye, Qiyu Liu, Manvi Agrawal, Changsoo Kim, Haochen Wang'
                            linkUrl='https://github.com/QuBruin/DynamicCircuit'></TeamCard>

            <TeamCard title='Winner of Quandela,' 
                            subtitle = 'MIT Hackathon 2024'
                            members = 'John Zhuoyang Ye, Yarin Heffes, Roberto Negrin'
                            linkUrl='https://github.com/yezhuoyang/MIT2024QHackthon'></TeamCard>
        </div>

    </section>
  )
}
