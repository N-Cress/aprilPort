'use client'

import Image from "next/image";
import { FaLinkedinIn } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import { FaRegFilePdf } from "react-icons/fa6";


import { useState, useRef, useEffect } from "react";

export default function Home() {
  const [active, setActive] = useState('about');
  
  const containerRef = useRef(null);
  const overlayRef = useRef(null);

  const mousePos = useRef({ x: 0, y: 0 });
  const currentPos = useRef({ x: 0, y: 0 });
  const animationFrame = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    const overlay = overlayRef.current;

    if (!container || !overlay) return;

    const handleMouseMovement = (e) => {
      const rect = container.getBoundingClientRect();
      const x = e.pageX - rect.left - window.scrollX;
      const y = e.pageY - rect.top - window.scrollY;

      mousePos.current= {x, y}
    
      overlay.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(255, 255, 255, 0.05), transparent 200px)`;
    };

    const handleMouseLeave = () => {
      overlay.style.background = `none`;
    };

    const animate = () => {
      currentPos.current.x += (mousePos.current.x - currentPos.current.x) * 0.2;
      currentPos.current.y += (mousePos.current.y - currentPos.current.y) * 0.2;

      const { x, y } = currentPos.current;
      overlay.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(255, 255, 255, 0.15), transparent 200px)`;

      animationFrame.current = requestAnimationFrame(animate);
    };

    container.addEventListener('mousemove', handleMouseMovement);
    container.addEventListener('mouseleave', handleMouseLeave);
    animationFrame.current = requestAnimationFrame(animate);

    return () => {
      container.removeEventListener('mousemove', handleMouseMovement);
      container.removeEventListener('mouseleave', handleMouseLeave);
      if (animationFrame.current) cancelAnimationFrame(animationFrame.current);
    }
  }, []);

  return (
    <div ref={containerRef} className="flex pt-28 mr-36 overflow-hidden">
      <div ref={overlayRef} className="absolute h-full inset-0 pointer-events-none transition-all duration-200">
      </div>
      <div className=" ml-60  sticky ">
        <div className="text-5xl font-bold white"> Noah Cress </div>
        <div className="pt-2 pb-4 text-xl white"> Front End Engineer </div>
        <div className="pb-18 w-80"> Striving to build user driven, responsive experiences for the web.</div>
        <div>
          <div onClick={() => setActive('about')} className="pb-2 cursor-pointer flex items-center group"> 
            <div className={`line transition-all duration-300 ease-in-out group-hover:text-white group-hover:w-16 ${active === `about` ? "white w-16" : "w-8"}`}> </div> 
            <div className={`pl-4 transition-all duration-300 ease-in-out group-hover:text-white ${active === "about" ? "white" : ""}`} > ABOUT </div> 
          </div>
          <div onClick={() => setActive('experience')} className="pb-2 cursor-pointer flex items-center group"> 
            <div className={`line transition-all duration-300 ease-in-out group-hover:text-white group-hover:w-16 ${active === `experience` ? "w-16" : "w-8"}`}> </div> 
            <div className={`pl-4 transition-all duration-300 ease-in-out group-hover:text-white ${active === "experience" ? "white" : ""}`}> EXPERIENCE </div> 
          </div>
          <div onClick={() => setActive('projects')} className="cursor-pointer flex items-center group"> 
            <div className={`line transition-all duration-300 ease-in-out group-hover:text-white group-hover:w-16 ${active === `projects` ? "w-16" : "w-8"}`}> </div> 
            <div className={`pl-4 transition-all duration-300 ease-in-out group-hover:text-white ${active === "projects" ? "white" : ""}`}> PROJECTS </div> 
          </div>
          <div className="flex pt-80">
            <FaLinkedinIn className="w-8 h-8" />
            <FaGithub className="ml-6 w-8 h-8"/>
            <FaRegFilePdf className="ml-6 w-8 h-8"/>

          </div>
        </div>
      </div>
      <div className=" pl-54 max-w-220">
        <div>
          <div className="pb-4 ">
          I'm a developer who thrives on continuous learning and adapting to new challenges. Whether it’s exploring emerging technologies or refining established practices, I’m driven by curiosity and a desire to grow. I focus on building flexible, accessible interfaces that evolve alongside user needs and industry trends—balancing clean design with resilient, future-ready code.
          </div>
          <div className="pb-4">
          I'm an aspiring front-end developer with a strong interest in accessibility and inclusive design. In my recent work and projects, I've focused on building and refining UI components with accessibility best practices in mind—aiming to create user experiences that are both intuitive and inclusive. I'm eager to contribute to teams that value thoughtful, user-centered development and to continue growing my skills in a collaborative environment.
          </div>
          <div className="pb-4">
          I’ve spent the past year working in IT, where I built a strong foundation in tech and problem-solving. It was a great experience, but over time, I found myself increasingly drawn to web development. I started learning on my own, building small projects and getting hands-on with modern web technologies. Now I’m excited to take the next step and grow as a developer in a professional setting.
          </div>
          <div>
          In my free time, I enjoy reading, hiking, or playing whatever fighting game I'm currently into.
          </div>
        </div>
      </div>
    </div>
  );
}
