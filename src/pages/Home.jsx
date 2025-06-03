import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import MainFeature from '../components/MainFeature'
import ApperIcon from '../components/ApperIcon'
const Home = () => {
  const navigate = useNavigate()
  const [isDarkMode, setIsDarkMode] = useState(false)

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [isDarkMode])

  return (
    <div className="min-h-screen bg-gradient-to-br from-surface-50 via-primary-50/30 to-secondary-50/20 dark:from-surface-900 dark:via-surface-800 dark:to-surface-900">
      {/* Header */}
      <motion.header 
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative bg-white/80 dark:bg-surface-900/80 backdrop-blur-lg border-b border-surface-200/50 dark:border-surface-700/50 sticky top-0 z-50"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20">
            {/* Logo */}
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="flex items-center space-x-3"
            >
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-xl flex items-center justify-center shadow-soft">
                <ApperIcon name="Ticket" className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl sm:text-2xl font-bold gradient-text">TicketVault</h1>
                <p className="text-xs text-surface-600 dark:text-surface-400 hidden sm:block">Premium Event Booking</p>
              </div>
            </motion.div>

            {/* Navigation */}
<nav className="hidden md:flex items-center space-x-8">
              <motion.button 
                whileHover={{ y: -2 }}
                onClick={() => navigate('/events')}
                className="text-surface-700 dark:text-surface-300 hover:text-primary-600 font-medium transition-colors focus-ring"
              >
                Events
              </motion.button>
<motion.button
                whileHover={{ y: -2 }}
                onClick={() => navigate('/movies')}
                className="text-surface-700 dark:text-surface-300 hover:text-primary-600 font-medium transition-colors focus-ring"
              >
                Movies
              </motion.button>
              <motion.button 
                whileHover={{ y: -2 }}
                onClick={() => navigate('/sports')}
                className="text-surface-700 dark:text-surface-300 hover:text-primary-600 font-medium transition-colors focus-ring"
              >
                Sports
              </motion.button>
              <motion.button 
                whileHover={{ y: -2 }}
                onClick={() => navigate('/concerts')}
                className="text-surface-700 dark:text-surface-300 hover:text-primary-600 font-medium transition-colors focus-ring"
              >
                Concerts
              </motion.button>
            </nav>

{/* Account & Dark Mode Toggle & Mobile Menu */}
            <div className="flex items-center space-x-3">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => navigate('/account')}
                className="p-2 rounded-xl bg-surface-100 dark:bg-surface-800 hover:bg-surface-200 dark:hover:bg-surface-700 transition-colors focus-ring"
              >
                <ApperIcon name="User" className="w-5 h-5 text-surface-700 dark:text-surface-300" />
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsDarkMode(!isDarkMode)}
                className="p-2 rounded-xl bg-surface-100 dark:bg-surface-800 hover:bg-surface-200 dark:hover:bg-surface-700 transition-colors focus-ring"
              >
                <ApperIcon 
                  name={isDarkMode ? "Sun" : "Moon"} 
                  className="w-5 h-5 text-surface-700 dark:text-surface-300" 
                />
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="md:hidden p-2 rounded-xl bg-surface-100 dark:bg-surface-800 hover:bg-surface-200 dark:hover:bg-surface-700 transition-colors focus-ring"
              >
                <ApperIcon name="Menu" className="w-5 h-5 text-surface-700 dark:text-surface-300" />
              </motion.button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Hero Section */}
      <motion.section 
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.2 }}
        className="relative py-12 sm:py-20 lg:py-32 overflow-hidden"
      >
        {/* Background Elements */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-primary-400/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-secondary-400/20 rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Hero Content */}
            <div className="text-center lg:text-left">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
              >
                <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-surface-900 dark:text-white leading-tight mb-6">
                  Book Your 
                  <span className="gradient-text block sm:inline sm:ml-3">
                    Perfect Event
                  </span>
                </h2>
                <p className="text-lg sm:text-xl text-surface-600 dark:text-surface-300 mb-8 max-w-2xl mx-auto lg:mx-0">
                  Discover amazing events, select your perfect seats, and secure your tickets in seconds. 
                  The future of event booking is here.
                </p>
              </motion.div>

              {/* Feature Badges */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="flex flex-wrap gap-4 justify-center lg:justify-start mb-8"
              >
                {[
                  { icon: "Zap", text: "Instant Booking" },
                  { icon: "Shield", text: "Secure Payment" },
                  { icon: "MapPin", text: "Live Seat Map" }
                ].map((feature, index) => (
                  <div key={index} className="flex items-center space-x-2 bg-white/60 dark:bg-surface-800/60 backdrop-blur-sm px-4 py-2 rounded-xl border border-surface-200/50 dark:border-surface-700/50">
                    <ApperIcon name={feature.icon} className="w-4 h-4 text-primary-600" />
                    <span className="text-sm font-medium text-surface-700 dark:text-surface-300">{feature.text}</span>
                  </div>
                ))}
              </motion.div>

              {/* CTA Buttons */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.7 }}
className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
              >
                <motion.button
                  whileHover={{ scale: 1.05, boxShadow: "0 10px 30px rgba(99, 102, 241, 0.3)" }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => navigate('/events')}
                  className="px-8 py-4 bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 text-white font-semibold rounded-xl shadow-soft transition-all duration-300 focus-ring"
                >
                  Start Booking Now
                </motion.button>
<motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => navigate('/events')}
                  className="px-8 py-4 bg-white/80 dark:bg-surface-800/80 backdrop-blur-sm text-surface-900 dark:text-white font-semibold rounded-xl border border-surface-200 dark:border-surface-700 hover:bg-white dark:hover:bg-surface-800 transition-all duration-300 focus-ring"
                >
                  Explore Events
                </motion.button>
              </motion.div>
            </div>

            {/* Hero Image/Illustration */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.4 }}
              className="relative"
            >
              <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                <img 
                  src="https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=600&h=400&fit=crop&crop=center" 
                  alt="Concert venue with amazing lighting"
                  className="w-full h-64 sm:h-80 lg:h-96 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-surface-900/60 via-transparent to-transparent"></div>
                <div className="absolute bottom-6 left-6 right-6">
                  <div className="glass-card p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-white font-semibold">Rock Concert</h3>
                        <p className="text-white/80 text-sm">Madison Square Garden</p>
                      </div>
                      <div className="text-right">
                        <p className="text-white font-bold">$89</p>
                        <p className="text-white/80 text-sm">Available</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Main Feature Section */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.8 }}
        className="py-12 sm:py-20"
      >
        <MainFeature />
      </motion.section>
    </div>
  )
}

export default Home