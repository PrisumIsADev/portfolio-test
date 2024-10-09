'use client'

import React, { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring, useScroll } from 'framer-motion'
import { FaGithub, FaTwitter, FaLinkedin, FaDev, FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa'

export default function App() {
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
    'what-i-do': 'I specialize in Python, HTMl, CSS, Next JS, Typescript and React.',
    'projects': 'I have worked on many projects, from machine learning algorithms to educational mobile apps.',
    'hire-me': "I am available for simple projects with the languages I have listed."
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
                    A 13 year old passionate full-stack developer dedicated to crafting perfect and efficient Coding projects. With a keen eye for detail and a love for clean code, I transform complex problems into scalable applications.
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
                    <img src="https://rockethosting.xyz/static/p.png" alt="Prisum" className="rounded-lg shadow-lg mb-6" />
                    <div className="flex space-x-4 justify-center">
                      <motion.a href="https://github.com/PrisumDevolopes" className="text-blue-400 hover:text-blue-300 transition-colors" whileHover={{ scale: 1.2 }}><FaGithub size={24} /></motion.a>
                      <motion.a href="https://x.com/PrisumDevelopes" className="text-blue-400 hover:text-blue-300 transition-colors" whileHover={{ scale: 1.2 }}><FaTwitter size={24} /></motion.a>
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
                      Hi, I'm Prisum, a passionate full-stack developer with over 5 years of experience in creating web and mobile applications. I specialize in React, Node.js, and cloud technologies, with a keen interest in AI and machine learning applications in web development.
                    </motion.p>
                    <motion.p 
                      className="text-lg mb-6"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8 }}
                      viewport={{ once: true }}
                    >
                      I love creating clean and maintainable code while ensuring high-quality user experiences. When I'm not coding, I enjoy gaming and contributing to open-source projects.
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
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {[
                    { title: 'Machine Learning Algo', description: 'Built a machine learning algorithm that predicts...', image: '/project1.jpg', tags: ['Python', 'ML'] },
                    { title: 'Educational App', description: 'Developed a mobile app for students...', image: '/project2.jpg', tags: ['React Native', 'Firebase'] },
                    { title: 'Portfolio Website', description: 'Designed and developed my own portfolio...', image: '/project3.jpg', tags: ['React', 'Next.js'] }
                  ].map((project, index) => (
                    <motion.div
                      key={index}
                      className="bg-gray-800 rounded-lg overflow-hidden shadow-lg transform transition duration-300"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.2 }}
                      viewport={{ once: true }}
                    >
                      <img src={project.image} alt={project.title} className="w-full h-48 object-cover" />
                      <div className="p-6">
                        <h3 className="text-2xl font-bold mb-2">{project.title}</h3>
                        <p className="text-gray-400 mb-4">{project.description}</p>
                        <div className="flex space-x-2">
                          {project.tags.map((tag, tagIndex) => (
                            <span key={tagIndex} className="bg-gray-700 text-gray-300 px-2 py-1 rounded-full text-xs">{tag}</span>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
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
                <form className="max-w-lg mx-auto" onSubmit={handleSubmit}>
                  <motion.div
                    className="mb-4"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                  >
                    <label className="block text-gray-400 text-sm font-bold mb-2" htmlFor="name">
                      Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formState.name}
                      onChange={handleChange}
                      className="w-full p-2 text-gray-900 rounded-md"
                      required
                    />
                  </motion.div>
                  <motion.div
                    className="mb-4"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                  >
                    <label className="block text-gray-400 text-sm font-bold mb-2" htmlFor="email">
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formState.email}
                      onChange={handleChange}
                      className="w-full p-2 text-gray-900 rounded-md"
                      required
                    />
                  </motion.div>
                  <motion.div
                    className="mb-6"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                  >
                    <label className="block text-gray-400 text-sm font-bold mb-2" htmlFor="message">
                      Message
                    </label>
                    <textarea
                      name="message"
                      value={formState.message}
                      onChange={handleChange}
                      className="w-full p-2 text-gray-900 rounded-md"
                      required
                    />
                  </motion.div>
                  <motion.div
                    className="text-center"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                  >
                    <button
                      type="submit"
                      className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? 'Submitting...' : 'Submit'}
                    </button>
                    {submitMessage && <p className="text-green-400 mt-4">{submitMessage}</p>}
                  </motion.div>
                </form>
              </section>
            </motion.div>
          </main>
        </>
      )}
    </div>
  )
}
