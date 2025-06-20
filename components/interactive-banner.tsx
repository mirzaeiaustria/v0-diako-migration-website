"use client"

import { motion, useInView } from "framer-motion"
import { useRef, useState } from "react"
import { Phone, Mail, Globe, MessageSquare, Instagram, Linkedin, ArrowLeft, Star, Award, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { socialMediaLinks, contactInfo } from "@/lib/comprehensive-immigration-data"

export function InteractiveBanner() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [isHovered, setIsHovered] = useState(false)

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
        staggerChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  }

  const overlayVariants = {
    hidden: { opacity: 0, backdropFilter: "blur(0px)" },
    visible: {
      opacity: 1,
      backdropFilter: "blur(4px)",
      transition: { duration: 0.3 },
    },
  }

  const socialLinks = [
    { icon: MessageSquare, label: "تلگرام", href: socialMediaLinks.telegram, color: "bg-blue-500" },
    { icon: Instagram, label: "اینستاگرام", href: socialMediaLinks.instagram.main, color: "bg-pink-500" },
    { icon: Linkedin, label: "لینکدین", href: socialMediaLinks.linkedin, color: "bg-blue-700" },
  ]

  const contactInfoItems = [
    { icon: Phone, text: contactInfo.phone, href: `tel:${contactInfo.phone.replace(/-/g, "")}` },
    { icon: Mail, text: contactInfo.email, href: `mailto:${contactInfo.email}` },
    { icon: Globe, text: contactInfo.website, href: `https://${contactInfo.website}` },
  ]

  const achievements = [
    { icon: Users, text: "بیش از 5000 مشتری موفق", color: "text-blue-400" },
    { icon: Award, text: "20+ سال تجربه", color: "text-yellow-400" },
    { icon: Star, text: "نرخ موفقیت 95%", color: "text-green-400" },
  ]

  return (
    <section className="relative w-full overflow-hidden" ref={ref}>
      <motion.div
        className="relative w-full h-[200px] md:h-[300px] lg:h-[400px] cursor-pointer"
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
      >
        {/* Background Image with Parallax Effect */}
        <motion.div
          className="absolute inset-0"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <img
            src="/images/diaco-banner.jpg"
            alt="هلدینگ مهاجرتی دیاکو - با بیش از 20 سال تجربه موفق"
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-transparent to-black/20"></div>
        </motion.div>

        {/* Animated Overlay */}
        <motion.div
          className="absolute inset-0 bg-black/40"
          variants={overlayVariants}
          initial="hidden"
          animate={isHovered ? "visible" : "hidden"}
        />

        {/* Floating Particles Animation */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-white/20 rounded-full"
              animate={{
                x: [0, 100, 0],
                y: [0, -50, 0],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: 4 + i,
                repeat: Number.POSITIVE_INFINITY,
                delay: i * 0.5,
              }}
              style={{
                left: `${20 + i * 15}%`,
                top: `${30 + i * 10}%`,
              }}
            />
          ))}
        </div>

        {/* Main Content Overlay */}
        <motion.div
          className="absolute inset-0 flex items-center justify-between px-4 md:px-8 lg:px-12"
          variants={containerVariants}
        >
          {/* Left Side - Company Info */}
          <motion.div className="flex-1" variants={itemVariants}>
            <motion.div
              className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 md:p-6 border border-white/20 max-w-md"
              whileHover={{ scale: 1.02, backgroundColor: "rgba(255,255,255,0.15)" }}
              transition={{ duration: 0.3 }}
            >
              <motion.h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-2" variants={itemVariants}>
                هلدینگ مهاجرتی دیاکو
              </motion.h1>
              <motion.p className="text-white/90 text-sm md:text-base mb-4" variants={itemVariants}>
                با بیش از 20 سال تجربه موفق در زمینه مهاجرت
              </motion.p>

              {/* Achievements */}
              <motion.div className="space-y-2 mb-4" variants={itemVariants}>
                {achievements.map((achievement, index) => (
                  <motion.div
                    key={index}
                    className="flex items-center space-x-2 space-x-reverse"
                    whileHover={{ x: 5 }}
                    transition={{ duration: 0.2 }}
                  >
                    <achievement.icon className={`w-4 h-4 ${achievement.color}`} />
                    <span className="text-white/90 text-sm">{achievement.text}</span>
                  </motion.div>
                ))}
              </motion.div>

              {/* Contact Buttons */}
              <motion.div className="flex flex-wrap gap-2" variants={itemVariants}>
                {contactInfoItems.slice(0, 2).map((contact, index) => (
                  <motion.a
                    key={index}
                    href={contact.href}
                    className="flex items-center space-x-1 space-x-reverse bg-white/20 hover:bg-white/30 text-white px-3 py-1 rounded-lg text-xs transition-all duration-300"
                    whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.3)" }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <contact.icon className="w-3 h-3" />
                    <span>{contact.text}</span>
                  </motion.a>
                ))}
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Right Side - Interactive Elements */}
          <motion.div className="hidden lg:flex flex-col items-end space-y-4" variants={itemVariants}>
            {/* Social Media Links */}
            <motion.div className="flex space-x-2 space-x-reverse">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-10 h-10 ${social.color} rounded-full flex items-center justify-center text-white shadow-lg`}
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.9 }}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <social.icon className="w-5 h-5" />
                </motion.a>
              ))}
            </motion.div>

            {/* Call to Action */}
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                className="bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-bold px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                size="lg"
                asChild
              >
                <a href="https://calendly.com/diaco-holding/15min" target="_blank" rel="noopener noreferrer">
                  مشاوره رایگان
                  <ArrowLeft className="w-4 h-4 mr-2" />
                </a>
              </Button>
            </motion.div>

            {/* Certification Badges */}
            <motion.div className="flex space-x-2 space-x-reverse">
              <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                مجوز رسمی
              </Badge>
              <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                ISO 9001
              </Badge>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Bottom Gradient */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-black/30 to-transparent"
          variants={itemVariants}
        />

        {/* Hover Overlay with Additional Info */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          variants={overlayVariants}
          initial="hidden"
          animate={isHovered ? "visible" : "hidden"}
        >
          <motion.div
            className="bg-white/95 backdrop-blur-sm rounded-2xl p-6 max-w-md mx-4 shadow-2xl"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={isHovered ? { scale: 1, opacity: 1 } : { scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <h3 className="text-xl font-bold text-gray-900 mb-4 text-center">آماده شروع مسیر مهاجرت هستید؟</h3>
            <div className="grid grid-cols-1 gap-3">
              {contactInfoItems.map((contact, index) => (
                <motion.a
                  key={index}
                  href={contact.href}
                  className="flex items-center space-x-3 space-x-reverse p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                  whileHover={{ x: 5 }}
                  transition={{ duration: 0.2 }}
                >
                  <contact.icon className="w-5 h-5 text-blue-600" />
                  <span className="text-gray-800">{contact.text}</span>
                </motion.a>
              ))}
            </div>
            <motion.div className="mt-4 text-center" whileHover={{ scale: 1.05 }}>
              <Button className="w-full bg-gradient-to-r from-blue-600 to-teal-600 text-white" asChild>
                <a href="https://calendly.com/diaco-holding/15min" target="_blank" rel="noopener noreferrer">
                  شروع مشاوره رایگان
                </a>
              </Button>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Corner Decorations */}
        <motion.div
          className="absolute top-4 left-4 w-16 h-16 border-l-2 border-t-2 border-white/30"
          variants={itemVariants}
        />
        <motion.div
          className="absolute bottom-4 right-4 w-16 h-16 border-r-2 border-b-2 border-white/30"
          variants={itemVariants}
        />
      </motion.div>
    </section>
  )
}
