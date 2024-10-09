'use client'

import React, { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring, useScroll } from 'framer-motion'
import { FaGithub, FaTwitter, FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa'
import Image from 'next/image'

export default function Component() {
  const [isLoading, setIsLoading] = useState(true)
  const cursorX = useMotionValue(-100)
  const cursorY = useMotionValue(-100)
  const springConfig = { damping: 25, stiffness: 700 }
  const cursorXSpring = useSpring(cursorX, springConfig)
  const cursorYSpring = useSpring(cursorY, springConfig)

  const [activeTab, setActiveTab] = useState('what-i-do')
  const [formState, setFormState] = useState({ name: '', email: '', message: '' })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitMessage, setSubmitMessage] = useState('')

  const { scrollYProgress } = useScroll()

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX - 8)
      cursorY.set(e.clientY - 8)
    }
    window.addEventListener('mousemove', moveCursor)
    const timer = setTimeout(() => setIsLoading(false), 2000)
    return () => {
      window.removeEventListener('mousemove', moveCursor)
      clearTimeout(timer)
    }
  }, [cursorX, cursorY])

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const tabContent = {
    'what-i-do': 'I specialize in building robust and scalable web applications using modern technologies. My expertise includes front-end development with React, back-end development with Node.js, and database management with MongoDB and PostgreSQL. I also have experience with cloud services like AWS and containerization with Docker.',
    'projects': 'My portfolio includes a diverse range of projects, from full-stack web applications to mobile apps and AI-powered tools. Check out my Projects section to see detailed case studies of my work, including technologies used and challenges overcome.',
    'hire-me': "I'm available for freelance work and open to full-time opportunities. Whether you need a custom web application, a mobile app, or technical consultation, I'm here to help bring your ideas to life. Let's discuss how we can work together to achieve your goals."
  }

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000))
    setSubmitMessage("Thank you for your message. I'll get back to you soon!")
    setFormState({ name: '', email: '', message: '' })
    setIsSubmitting(false)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormState({ ...formState, [e.target.name]: e.target.value })
  }

  return (
    <div className="bg-black text-white min-h-screen">
      {isLoading ? (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black"
          initial={{ opacity: 1 }}
          animate={{ opacity: 0 }}
          transition={{ duration: 0.5, delay: 1.5 }}
        >
          <motion.div
            className="w-16 h-16 border-t-2 border-blue-400 rounded-full"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          />
        </motion.div>
      ) : (
        <>
          <header className="fixed top-0 left-0 right-0 z-10 bg-black bg-opacity-90 backdrop-blur-sm">
            <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
              <a href="/" className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text">Prisum</a>
              <div className="space-x-6">
                {['home', 'about', 'projects', 'blog', 'contact'].map((section) => (
                  <button
                    key={section}
                    onClick={() => scrollToSection(section)}
                    className="hover:text-blue-400 transition-colors capitalize"
                  >
                    {section}
                  </button>
                ))}
              </div>
            </nav>
          </header>
          <main className="pt-16">
            <motion.div initial="hidden" animate="visible" variants={fadeInUp} className="container mx-auto px-6 py-16">
              {/* Home Section */}
              <section id="home" className="min-h-screen flex items-center">
                <div>
                  <motion.h1 
                    className="text-5xl font-bold mb-4"
                    initial={{ opacity: 0, y: -50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                  >
                    Hi, I'm <span className="bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text">Prisum</span>
                  </motion.h1>
                  <motion.p 
                    className="text-xl mb-8 max-w-2xl"
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                  >
                    A passionate full-stack developer dedicated to crafting elegant, efficient, and user-centric digital solutions. With a keen eye for detail and a love for clean code, I transform complex problems into intuitive and scalable applications.
                  </motion.p>
                  <div className="flex space-x-4 mb-8">
                    {Object.keys(tabContent).map((tab, index) => (
                      <motion.button
                        key={tab}
                        className={`px-6 py-2 rounded-md ${activeTab === tab ? 'bg-blue-600 text-white' : 'bg-gray-800 text-blue-400'}`}
                        onClick={() => setActiveTab(tab)}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                      >
                        {tab.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                      </motion.button>
                    ))}
                  </div>
                  <motion.div
                    key={activeTab}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="bg-gray-800 p-6 rounded-md"
                  >
                    {tabContent[activeTab as keyof typeof tabContent]}
                  </motion.div>
                </div>
              </section>

              {/* About Section */}
              <section id="about" className="py-16">
                <motion.h2 
                  className="text-4xl font-bold mb-8"
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8 }}
                  viewport={{ once: true }}
                >
                  About Me
                </motion.h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                  >
                    <Image src="/placeholder.svg?height=400&width=400" alt="Prisum" width={400} height={400} className="rounded-lg shadow-lg mb-6" />
                    <div className="flex space-x-4 justify-center">
                      <motion.a href="#" className="text-blue-400 hover:text-blue-300 transition-colors" whileHover={{ scale: 1.2 }}><FaGithub size={24} /></motion.a>
                      <motion.a href="#" className="text-blue-400 hover:text-blue-300 transition-colors" whileHover={{ scale: 1.2 }}><FaTwitter size={24} /></motion.a>
                    </div>
                  </motion.div>
                  <div>
                    <motion.p 
                      className="text-lg mb-6"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8 }}
                      viewport={{ once: true }}
                    >
                      I am a dedicated developer with a passion for crafting intuitive web and mobile applications. My journey began with a desire to create solutions that make a positive impact in the world.
                    </motion.p>
                    <motion.p
                      className="text-lg mb-6"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8, delay: 0.2 }}
                      viewport={{ once: true }}
                    >
                      When I’m not coding, you can find me exploring the latest tech trends, hiking in nature, or honing my skills in AI and machine learning.
                    </motion.p>
                    <motion.p
                      className="text-lg mb-6"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8, delay: 0.4 }}
                      viewport={{ once: true }}
                    >
                      I believe in continuous learning and collaboration, and I’m always excited to connect with like-minded individuals and teams.
                    </motion.p>
                  </div>
                </div>
              </section>

              {/* Projects Section */}
              <section id="projects" className="py-16">
                <motion.h2 
                  className="text-4xl font-bold mb-8"
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8 }}
                  viewport={{ once: true }}
                >
                  Projects
                </motion.h2>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                  viewport={{ once: true }}
                  className="grid grid-cols-1 md:grid-cols-2 gap-12"
                >
                  {/* Example Project Card */}
                  <div className="bg-gray-800 p-6 rounded-lg shadow-md">
                    <h3 className="text-xl font-semibold mb-2">Project Title</h3>
                    <p className="text-gray-300">Brief description of the project goes here. Explain the technology used and the problem it solves.</p>
                    <div className="flex space-x-2 mt-4">
                      <a href="#" className="text-blue-400">View Project</a>
                      <span className="text-gray-500">|</span>
                      <a href="#" className="text-blue-400">GitHub Repo</a>
                    </div>
                  </div>
                  {/* Add more project cards as needed */}
                </motion.div>
              </section>

              {/* Contact Section */}
              <section id="contact" className="py-16">
                <motion.h2 
                  className="text-4xl font-bold mb-8"
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8 }}
                  viewport={{ once: true }}
                >
                  Contact Me
                </motion.h2>
                <form onSubmit={handleSubmit} className="bg-gray-800 p-6 rounded-lg">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label htmlFor="name" className="block text-sm mb-1">Name</label>
                      <input
                        type="text"
                        name="name"
                        id="name"
                        required
                        value={formState.name}
                        onChange={handleChange}
                        className="w-full p-2 bg-gray-700 border border-gray-600 rounded"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm mb-1">Email</label>
                      <input
                        type="email"
                        name="email"
                        id="email"
                        required
                        value={formState.email}
                        onChange={handleChange}
                        className="w-full p-2 bg-gray-700 border border-gray-600 rounded"
                      />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-sm mb-1">Message</label>
                    <textarea
                      name="message"
                      id="message"
                      required
                      value={formState.message}
                      onChange={handleChange}
                      className="w-full p-2 bg-gray-700 border border-gray-600 rounded"
                      rows={5}
                    ></textarea>
                  </div>
                  <button 
                    type="submit" 
                    className={`mt-4 px-6 py-2 rounded-md ${isSubmitting ? 'bg-gray-600' : 'bg-blue-600 hover:bg-blue-500'}`} 
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Submitting...' : 'Send Message'}
                  </button>
                  {submitMessage && <p className="mt-2 text-green-500">{submitMessage}</p>}
                </form>
              </section>
            </motion.div>
          </main>
          <footer className="bg-black bg-opacity-90 py-4">
            <div className="container mx-auto px-6 text-center">
              <p className="text-gray-400">© 2024 by Prisum. All rights reserved.</p>
            </div>
          </footer>
        </>
      )}
      <motion.div
        className="fixed left-0 top-0 w-2 h-full bg-blue-
