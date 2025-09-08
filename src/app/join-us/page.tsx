import MainWebsiteFooter from "../Components/MainWebsiteFooter";
import MembershipForm from "../Components/MembershipForm";
import TextAndPhoto from "../Components/TextAndPhoto";

export default function JoinUs() {
    return (
      <div>
        <TextAndPhoto
            title='Join Us'
            description='Sign up and become a QCSA Member today! Get invited to our upcoming events, stay posted for career opportunities and keep up to date with the quantum community in and around Los Angeles! There is no membership fee or application process required to join.'
            imageSrc='/images/join-us.png'
            imageAlt='join us img'/>
        <MembershipForm/>
        <MainWebsiteFooter/>
       </div>

    
    );
  }