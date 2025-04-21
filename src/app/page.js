'use client'

import Image from "next/image";
import { FaLinkedinIn } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import { FaRegFilePdf } from "react-icons/fa6";
import { FaLink } from "react-icons/fa";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";

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
      const x = e.clientX;
      const y = e.clientY;

      mousePos.current= {x, y}
    

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
    <div ref={containerRef} id="about" className="flex pt-28 mr-36 ">
      <div ref={overlayRef} className="fixed z-[-1] inset-0 pointer-events-none transition-all duration-200">
      </div>
      <div className=" ml-60 sticky top-28  h-full">
        <div className="text-5xl font-bold white"> Noah Cress </div>
        <div className="pt-2 pb-4 text-xl white"> Front End Engineer </div>
        <div className="pb-18 w-80"> Striving to build user driven, responsive experiences for the web.</div>
        <div>
          <Link href="/#about">
            <div onClick={() => setActive('about')} className="pb-2 cursor-pointer flex items-center group"> 
              <div className={`line transition-all duration-300 ease-in-out group-hover:text-white group-hover:w-16 ${active === `about` ? "white w-16" : "w-8"}`}> </div> 
              <div className={`pl-4 transition-all duration-300 ease-in-out group-hover:text-white ${active === "about" ? "white" : ""}`} > ABOUT </div> 
            </div>
          </Link>
          <Link href="/#projects">
            <div onClick={() => setActive('projects')} className="pb-2 cursor-pointer flex items-center group"> 
              <div className={`line transition-all duration-300 ease-in-out group-hover:text-white group-hover:w-16 ${active === `projects` ? "w-16" : "w-8"}`}> </div> 
              <div className={`pl-4 transition-all duration-300 ease-in-out group-hover:text-white ${active === "projects" ? "white" : ""}`}> PROJECTS </div> 
            </div>
          </Link>
          <Link href="#experience">
            <div onClick={() => setActive('experience')} className=" cursor-pointer flex items-center group"> 
              <div className={`line transition-all duration-300 ease-in-out group-hover:text-white group-hover:w-16 ${active === `experience` ? "w-16" : "w-8"}`}> </div> 
              <div className={`pl-4 transition-all duration-300 ease-in-out group-hover:text-white ${active === "experience" ? "white" : ""}`}> EXPERIENCE </div> 
            </div>
          </Link>
          <div className="flex pt-80">
            <Link target="_blank" href="https://www.linkedin.com/in/noah-c-47046795/"> <FaLinkedinIn className="w-8 h-8" /> </Link>
            <Link target="_blank" href="https://github.com/N-Cress"> <FaGithub className="ml-6 w-8 h-8"/> </Link>
            <Link target="_blank" href="/Noah-Resume-April.pdf"> <FaRegFilePdf className="ml-6 w-8 h-8"/> </Link>

          </div>
        </div>
      </div>
      <div  className=" pl-54 max-w-220">
        <div >
          <div className="pb-4 ">
          I&apos;m a developer who thrives on continuous learning and adapting to new challenges. Whether it’s exploring emerging technologies or refining established practices, I’m driven by curiosity and a desire to grow. I focus on building flexible, accessible interfaces that evolve alongside user needs and industry trends—balancing clean design with resilient, future-ready code.
          </div>
          <div className="pb-4">
          I&apos;m an aspiring front-end developer with a strong interest in accessibility and inclusive design. In my recent work and projects, I&apos;ve focused on building and refining UI components with accessibility best practices in mind—aiming to create user experiences that are both intuitive and inclusive. I&apos;m eager to contribute to teams that value thoughtful, user-centered development and to continue growing my skills in a collaborative environment.
          </div>
          <div className="pb-4">
          I’ve spent the past year working in IT, where I built a strong foundation in tech and problem-solving. It was a great experience, but over time, I found myself increasingly drawn to web development. I started learning on my own, building small projects and getting hands-on with modern web technologies. Now I’m excited to take the next step and grow as a developer in a professional setting.
          </div>
          <div>
          In my free time, I enjoy reading, hiking, or playing whatever fighting game I&apos;m currently into.
          </div>
        </div>
        <div id="projects">
          <Link target="_blank" href="https://noah-internship-2rt6b6pmr-snoklkls-projects.vercel.app/">  
            <div className="flex mt-20 p-4 items-center group item-hover-effect">
                <div className="max-w-50h-full  pr-10">
                  <Image src="/virtInternFullScreen.png" width={500} height={500} alt="Ultraverse Image" />
                </div>
                <div className="">
                  <div className="white flex group-hover:!text-blue-400"> Ultraverse  <FaLink className="transition-all duration-300 ease-in-out ml-1 pl-1  group-hover:scale-125"/> </div>
                  <div> Took a static page that was using filler data and replaced that by processing data from an API to dynamically display information. Created an interactive UI by adding animations, transitions, and carousels.</div>
                </div>
            </div>
          </Link>
          <Link target="_blank" href="https://flix-clone-snowy.vercel.app/">
            <div className="flex mt-5 p-4 items-center group item-hover-effect">
                <div className="max-w-50 h-full pr-10">
                  <Image src="/netflixCloneFullScreen.png" width={500} height={500} alt="Netflix Clone Image" />
                </div>
                <div className="">
                  <div className="white flex group-hover:!text-blue-400"> Netflix Clone  <FaLink className="transition-all duration-300 ease-in-out ml-1 pl-1  group-hover:scale-125"/> </div>
                  <div> Uses TMDB&apos;s API to iterate through results to display in a fashion meant to mimic Netflix&apos;s homepage. Has sign in and sign up pages that uses Firebase for authentication.</div>
                </div>
            </div>
          </Link>
          <Link target="_blank" href="https://n-cress.github.io/ytclone/"> 
            <div className="flex mt-5 p-4 items-center group item-hover-effect">
                <div className="max-w-50 h-full pr-10">
                  <Image src="/ytCloneFullScreen.png" width={500} height={500} alt="Youtube Clone Image" />
                </div>
                <div className="">
                  <div className="white flex group-hover:!text-blue-400"> Youtube Clone - Landing <FaLink className="transition-all duration-300 ease-in-out ml-1 pl-1  group-hover:scale-125"/> </div>
                  <div> Mimic the layout that is used for the Youtube landing page. Includes a scrolling top bar and side menu that can be collapsed.</div>
                </div>
            </div>
          </Link>
          <Link target="_blank" href="https://week6-reactfinal-movieapi.vercel.app/"> 
            <div className="flex mt-5 p-4 mb-20 items-center group item-hover-effect">
                <div className="max-w-50 h-full pr-10">
                  <Image src="/independentMovieApiFullScreen.png" width={600} height={500} alt="Ultraverse Image" />
                </div>
                <div className="">
                  <div className="white flex group-hover:!text-blue-400"> Movie API Search  <FaLink className="transition-all duration-300 ease-in-out ml-1 pl-1  group-hover:scale-125"/> </div>
                  <div> Search page that uses results from OMDB&apos;s API to display movie results based on inputed query, which can then be sorted from oldest to newest. Each result can be clicked on for further information also pulled from OMDB. </div>
                </div>
            </div>
          </Link>
        </div>
        <Link target="_blank" href="https://www.adcompsystems.com/">     
          <div id="experience" className="flex p-4 group item-hover-effect mb-12">
            <div className="mr-6 w-100">
              NOV 2022 - DEC 2023
            </div>
            <div>
              <div className="white flex group-hover:!text-blue-400"> Technical Support Representative - AdComp Systems <FaLink className="transition-all duration-300 ease-in-out ml-1 pl-1  group-hover:scale-125"/> </div>
              <div> 
                Identified, recorded, and escalated technical issues, helping customers and ensuring satistifaction by working to get problems resolved.
              </div>
            </div>
          </div>
        </Link>
        <div className="text-sm text-center mb-8">
          Built within Visual Studio Code, using NextJS and TailwindCSS.
        </div>
      </div>
    </div>
  );
}
