'use client';
import Link from "next/link";
import { useState } from "react";

export default function PageLinks() {
    const [active, setActive] = useState('about');
    return (
        <>    
        <Link href="/#about">
            <div onClick={() => setActive('about')} className="pb-2 cursor-pointer flex items-center group"> 
              <div className={`line hidden md:block transition-all duration-300 ease-in-out group-hover:text-white group-hover:w-16 ${active === `about` ? "white w-16" : "w-8"}`}> </div> 
              <div className={`pl-4 hidden md:block transition-all duration-300 ease-in-out group-hover:text-white ${active === "about" ? "white" : ""}`} > ABOUT </div> 
            </div>
          </Link>
          <Link href="/#projects">
            <div onClick={() => setActive('projects')} className="pb-2 cursor-pointer flex items-center group"> 
              <div className={`line hidden md:block transition-all duration-300 ease-in-out group-hover:text-white group-hover:w-16 ${active === `projects` ? "w-16" : "w-8"}`}> </div> 
              <div className={`pl-4 hidden md:block transition-all duration-300 ease-in-out group-hover:text-white ${active === "projects" ? "white" : ""}`}> PROJECTS </div> 
            </div>
          </Link>
          <Link href="#experience">
            <div onClick={() => setActive('experience')} className=" cursor-pointer flex items-center group"> 
              <div className={`line hidden md:block transition-all duration-300 ease-in-out group-hover:text-white group-hover:w-16 ${active === `experience` ? "w-16" : "w-8"}`}> </div> 
              <div className={`pl-4 hidden md:block transition-all duration-300 ease-in-out group-hover:text-white ${active === "experience" ? "white" : ""}`}> EXPERIENCE </div> 
            </div>
          </Link>
        </>
    )
}