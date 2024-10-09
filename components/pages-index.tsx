'use client'

import React, { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import { FaGithub, FaTwitter, FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa'
import Image from 'next/image'
import Head from 'next/head'

export default function Home() {
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

  // ... rest of the component code remains unchanged
}
