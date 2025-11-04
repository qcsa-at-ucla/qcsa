"use client";

import { motion } from "framer-motion";
import JoinHackathon from "../Components/JoinHackathon";
import MainWebsiteFooter from "../Components/mainWebsiteFooter";
import MainWebsiteHeader from "../Components/mainWebsiteHeader";
import OurTeam from "../Components/OurTeam";

export default function QHackathon(){
    return(
        <>
            <MainWebsiteHeader/>
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.6 }}
            >
                <OurTeam/>
            </motion.div>
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.6 }}
            >
                <JoinHackathon/>
            </motion.div>
            <MainWebsiteFooter/>
        </>
    );
}