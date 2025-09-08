import JoinHackathon from "../Components/JoinHackathon";
import MainWebsiteFooter from "../Components/mainWebsiteFooter";
import MainWebsiteHeader from "../Components/mainWebsiteHeader";
import OurTeam from "../Components/OurTeam";

export default function QHackathon(){
    return(
        <>
            <MainWebsiteHeader/>
            <OurTeam/>
            <JoinHackathon/>
            <MainWebsiteFooter/>
        </>
    );
}