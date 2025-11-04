"use client";
import MainWebsiteFooter from "../Components/mainWebsiteFooter";
import MainWebsiteHeader from "../Components/mainWebsiteHeader";
import MembershipForm from "../Components/MembershipForm";
import TextAndPhoto from "../Components/TextAndPhoto";
import { motion } from 'framer-motion';

export default function JoinUs() {
    return (
      <div>
        <MainWebsiteHeader/>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <TextAndPhoto
              title='Join Us'
              description='Sign up and become a QCSA Member today! Get invited to our upcoming events, stay posted for career opportunities and keep up to date with the quantum community in and around Los Angeles! There is no membership fee or application process required to join.'
              imageSrc='/images/join-us.png'
              imageAlt='join us img'/>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <MembershipForm/>
        </motion.div>
        <MainWebsiteFooter/>
       </div>

    
    );
  }