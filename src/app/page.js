'use client'

import Image from "next/image";
import { FaLinkedinIn } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import { FaRegFilePdf } from "react-icons/fa6";
import { FaLink } from "react-icons/fa";
import { IoMdMail } from "react-icons/io";


import validator from "validator";
import Link from "next/link";
import BackgroundEffect from "./components/backgroundEffect";
import PageLinks from "./components/pageLinks";
import { useEffect, useState } from 'react'
import AOS from 'aos'
import 'aos/dist/aos.css'
import emailjs from '@emailjs/browser';

export default function Home() {
  const [modal, setModal] = useState(false);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState('');

  const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
  const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
  const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;


  function sanitizeInput(input) {
    if (typeof input !== 'string') return '';

    let sanitized = input.replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '');
    sanitized = sanitized.replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '');
  
    sanitized = sanitized.replace(/<\/?[^>]+(>|$)/g, '');
  
    sanitized = sanitized.replace(/[<>]/g, '');
    sanitized = sanitized.trim();
  
    return sanitized;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    if (message.length > 1000) {
      setError("Message too long. Please keep it under 1000 characters.");
      setLoading(false);
      return;
    }
    if (!validator.isEmail(email)) {
      setError("Please enter a valid email.");
      setLoading(false);
      return;
    }


    const sanitizedMessage1st = sanitizeInput(message);
    const sanitizedMessage2nd = validator.escape(sanitizedMessage1st);
    const sanitizedName = sanitizeInput(name);
    const sanitizedEmail = sanitizeInput(email);
    try {
      const result = await emailjs.send(
        serviceId, 
        templateId,
        {
          from_name: sanitizedName,
          from_email: sanitizedEmail,
          message: sanitizedMessage2nd
        },
        publicKey
      );
      console.log(result.text);
      setSent(true);
      setName('');
      setEmail('');
      setMessage('');
    } catch (err) {
      console.error(err);
      setError('Failed to send. Please try again.');
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    AOS.init({
      once: false,  
      duration: 800,  
      easing: 'ease-out',  
      offset: 100,  
    });
  }, [])

  return (
    <div id="about" className="flex flex-col items-start ml-4 mr-2 sm:ml-12 sm:mr-12 md:items-start md:flex-row md:justify-around md:ml-2 md:mr-2 pt-8 sm:pt-14 md:pt-28">
      <BackgroundEffect />
      {modal && (
        <div data-aos="fade-right" className="fixed bottom-8 right-0 opacity-0 p-4 w-100 md:mt-0 h-100 md:bottom-2 md:right-0  md:h-100 md:w-100 flex items-center justify-center z-100"> 
          <form onSubmit={handleSubmit} className="bg-[#0F172A] opacity-90 h-full w-full flex flex-col items-center rounded-3xl border-1 border-black shadow-lg shadow-black ">
          
            <div className="pt-4 text-3xl flex justify-between w-full pl-16 pr-4 white"> 
              <div> Connect with me!</div>
              <div onClick={() => setModal(false)} className="cursor-pointer text-sm"> X</div>
            </div>
            
            <div className="flex flex-col w-full items-center pt-4 pl-5 pr-5 "> 
              <input  onChange={(e) => setName(e.target.value)}
                      required 
                      placeholder="Name"
                      className="focus:outline pt-2 border-b-2 pl-2 placeholder-grey rounded-sm text-white border-white focus:border-blue-400 w-full"/>
              <input  onChange={(e) => setEmail(e.target.value)}
                      placeholder="Email"
                      required 
                      type="email"
                      className="border-b-2 pl-2 pt-2 mt-2  border-white placeholder-grey text-white w-full focus:outline focus:border-blue-400"/>
              <textarea onChange={(e) => setMessage(e.target.value)}
                        required 
                        placeholder="Message"
                        className="resize-none mt-2 border-b-2 pl-2 h-24 placeholder-grey text-white text-start border-b-white  w-full focus:outline focus:border-blue-400"/>
              {error && <p className="mt-1 text-red-500">{error}</p>}
              {sent && <p className="mt-1 text-green-500"> Thank you for your message</p>}
              <button 
              type="submit"
              disabled={loading || sent}
              className={` bg-blue-400 text-white pl-8 pr-8 pt-2 pb-2 rounded-2xl ${error || sent ? "mt-4" : "mt-12"} ${loading || sent ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}> {loading ? "Sending..." : "Send Message"} </button>
            </div>
            
          </form>
        </div>
      )}
      {!modal && (
        <div onClick={() => setModal(true)}className="z-50 group fixed border-black border-2 bg-white p-4 rounded-3xl bottom-8 right-8 cursor-pointer">
        <IoMdMail className="group-hover:!text-blue-400 w-8 h-8 cursor-pointer" />
        </div>
      )}

      <div data-aos="fade-down" className="fate-in-section pl-4 md:pl-4 relative z-20 pointer-events-auto md:sticky md:top-28 h-full ">
        <div  className="text-5xl font-bold white"> Noah Cress </div>
        <div className="pt-2 pb-4 text-xl white"> Front End Engineer </div>
        <div className="md:pb-18 w-80"> Striving to build user driven, responsive experiences for the web.</div>
        <div>
          <PageLinks />
          <div className="relative z-20 flex pt-4 pb-12 md:pb-0 md:pt-80">
            <Link target="_blank" href="https://www.linkedin.com/in/noah-c-47046795/"> <FaLinkedinIn className="z-1000 relative icon-blue-hover w-8 h-8" /> </Link>
            <Link target="_blank" href="https://github.com/N-Cress"> <FaGithub className="icon-blue-hover ml-6 w-8 h-8"/> </Link>
            <Link target="_blank" href="/Noah-Resume-April.pdf"> <FaRegFilePdf className="icon-blue-hover ml-6 w-8 h-8"/> </Link>
          </div>
        </div>
      </div>
      <div  className="w-full z-20 md:max-w-100 lg:max-w-160 xl:max-w-220">
        <div data-aos="fade-left" className="pl-4 text-sm md:text-base">
          <div className="pb-4 ">
          I&apos;m a developer who thrives on continuous learning and adapting to new challenges. Whether it’s exploring emerging technologies or refining established practices, I’m driven by curiosity and a desire to grow. I focus on building flexible, accessible interfaces that evolve alongside user needs and industry trends—balancing clean design with resilient, future-ready code.
          </div>
          <div className="pb-4">
          I&apos;m an aspiring front-end developer with a strong interest in accessibility and inclusive design. In my recent work and projects, I&apos;ve focused on building and refining UI components with accessibility best practices in mind—aiming to create user experiences that are both intuitive and inclusive. I&apos;m eager to contribute to teams that value thoughtful, user-centered development and to continue growing my skills in a collaborative environment.
          </div>
          <div className="pb-4">
          I&apos;ve spent the past year working in IT, where I built a strong foundation in tech and problem-solving. It was a great experience, but over time, I found myself increasingly drawn to web development. I started learning on my own, building small projects and getting hands-on with modern web technologies. Now I’m excited to take the next step and grow as a developer in a professional setting.
          </div>
          <div>
          In my free time, I enjoy reading, hiking, or playing whatever fighting game I&apos;m currently into.
          </div>
        </div>
        <div id="projects" className="" >
        <hr data-aos="fade-in" className="border-gray-400 mt-10" />
          <Link target="_blank" href="https://noah-internship-2rt6b6pmr-snoklkls-projects.vercel.app/">  
            <div data-aos="fade-up" className="relative z-20 flex flex-col xs:flex-row mt-10 xs:mt-10 p-4 mr-4 items-start group item-hover-effect ">
                <div className="xs:min-w-50 xs:max-w-50 h-full  xs:pr-10">
                  <Image src="/virtInternFullScreen.png" width={500} height={500} alt="Ultraverse Image" />
                </div>
                <div className="flex flex-col items-center xs:items-start">
                  <div className="white flex pt-4 xs:pt-0 group-hover:!text-blue-400"> Ultraverse  <FaLink className="hidden sm:block transition-all duration-300 ease-in-out ml-1 pl-1  group-hover:scale-125"/> </div>
                  <div className="text-sm md:text-base"> Took a static page that was using filler data and replaced that by processing data from an API to dynamically display information. Created an interactive UI by adding animations, transitions, and carousels.</div>
                </div>
            </div>
          </Link>
          <Link target="_blank" href="https://flix-clone-snowy.vercel.app/">
            <div data-aos="fade-up" className="relative z-20 flex flex-col xs:flex-row mt-5 p-4 items-center group item-hover-effect">
                <div className="xs:min-w-50 xs:max-w-50  h-full xs:pr-10">
                  <Image src="/netflixCloneFullScreen.png" width={500} height={500} alt="Netflix Clone Image" />
                </div>
                <div className="flex flex-col items-center xs:items-start">
                  <div className="white flex pt-4 xs:pt-0 group-hover:!text-blue-400"> Netflix Clone  <FaLink className="hidden sm:block transition-all duration-300 ease-in-out ml-1 pl-1  group-hover:scale-125"/> </div>
                  <div className="text-sm md:text-base"> Uses TMDB&apos;s API to iterate through results to display in a fashion meant to mimic Netflix&apos;s homepage. Has sign in and sign up pages that uses Firebase for authentication.</div>
                </div>
            </div>
          </Link>
          <Link target="_blank" href="https://n-cress.github.io/ytclone/"> 
            <div data-aos="fade-up" className="relative z-20 flex flex-col xs:flex-row mt-5 p-4 items-center group item-hover-effect">
                <div className="xs:min-w-50 xs:max-w-50  h-full xs:pr-10">
                  <Image src="/ytCloneFullScreen.png" width={500} height={500} alt="Youtube Clone Image" />
                </div>
                <div className="flex flex-col items-center xs:items-start">
                  <div className="white flex pt-4 xs:pt-0 group-hover:!text-blue-400"> Youtube Clone - Landing <FaLink className="hidden sm:block transition-all duration-300 ease-in-out ml-1 pl-1  group-hover:scale-125"/> </div>
                  <div className="text-sm md:text-base"> Mimic the layout that is used for the Youtube landing page. Includes a scrolling top bar and side menu that can be collapsed.</div>
                </div>
            </div>
          </Link>
          <Link target="_blank" href="https://week6-reactfinal-movieapi.vercel.app/"> 
            <div data-aos="fade-up" className="relative z-20 flex flex-col xs:flex-row mt-5 p-4 mb-10 items-center group item-hover-effect">
                <div className="xs:min-w-50 xs:max-w-50  h-full xs:pr-10">
                  <Image src="/independentMovieApiFullScreen.png" width={600} height={500} alt="Ultraverse Image" />
                </div>
                <div className="flex flex-col items-center xs:items-start">
                  <div className="white flex pt-4 xs:pt-0 group-hover:!text-blue-400"> Movie API Search  <FaLink className="hidden sm:block transition-all duration-300 ease-in-out ml-1 pl-1  group-hover:scale-125"/> </div>
                  <div className="text-sm md:text-base"> Search page that uses results from OMDB&apos;s API to display movie results based on inputed query, which can then be sorted from oldest to newest. Each result can be clicked on for further information also pulled from OMDB. </div>
                </div>
            </div>
          </Link>
        </div>
        <hr class="border-gray-400 mb-10" data-aos="fade-in"/>
        <Link target="_blank" href="https://www.adcompsystems.com/">     
          <div data-aos="fade-up" id="experience" className="relative items-center z-20 pointer-events-auto flex p-4 group item-hover-effect mb-12">
            <div className="mr-6 text-xs w-100">
              NOV 2022 - DEC 2023
            </div>
            <div>
              <div className="white flex group-hover:!text-blue-400"> Tech Support Representative <FaLink className="hidden sm:block transition-all duration-300 ease-in-out ml-1 pl-1  group-hover:scale-125"/> </div>
              <div className="text-sm md:text-base"> 
                Identified, recorded, and escalated technical issues, helping customers and ensuring satistifaction by working to get problems resolved.
              </div>
            </div>
          </div>
        </Link>
        <div className="text-sm text-center mb-8">
          Built within Visual Studio Code, using NextJS and TailwindCSS. Deployed with Vercel.
        </div>
      </div>
      
    </div>
  );
}
