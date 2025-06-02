import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import ApperIcon from '../components/ApperIcon'
import BookingCard from '../components/BookingCard'

const Account = () => {
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [activeTab, setActiveTab] = useState('profile')
  const [isLoading, setIsLoading] = useState(false)
  const [showBookingDetails, setShowBookingDetails] = useState(false)
  const [selectedBooking, setSelectedBooking] = useState(null)
  const navigate = useNavigate()

  // User profile state
  const [profile, setProfile] = useState({
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+1 (555) 123-4567',
    dateOfBirth: '1990-05-15',
    avatar: null
  })

  // Settings state
  const [settings, setSettings] = useState({
    emailNotifications: true,
    smsNotifications: false,
    darkMode: false
  })

  // Sample booking data
  const [bookings] = useState([
    {
      id: 'BK001',
      eventName: 'Rock Legends Concert',
      venue: 'Madison Square Garden',
      date: '2024-01-15',
      time: '20:00',
      seats: ['A-15', 'A-16'],
      totalAmount: 178,
      status: 'confirmed',
      bookingDate: '2024-01-01',
      image: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=300&h=200&fit=crop&crop=center'
    },
    {
      id: 'BK002',
      eventName: 'Broadway Musical: Hamilton',
      venue: 'Richard Rodgers Theatre',
      date: '2024-02-20',
      time: '19:30',
      seats: ['B-8', 'B-9'],
      totalAmount: 256,
      status: 'confirmed',
      bookingDate: '2024-01-15',
      image: 'https://images.unsplash.com/photo-1507676184-f7a7dfc8a5d1?w=300&h=200&fit=crop&crop=center'
    },
    {
      id: 'BK003',
      eventName: 'NBA Finals Game 4',
      venue: 'Crypto.com Arena',
      date: '2023-12-10',
      time: '21:00',
      seats: ['Section 101, Row 5, Seat 12'],
      totalAmount: 450,
      status: 'completed',
      bookingDate: '2023-11-15',
      image: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?w=300&h=200&fit=crop&crop=center'
    }
  ])

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [isDarkMode])

  const handleProfileUpdate = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      toast.success('Profile updated successfully!')
    }, 1000)
  }

  const handleSettingChange = (setting, value) => {
    setSettings(prev => ({ ...prev, [setting]: value }))
    toast.info(`${setting.replace(/([A-Z])/g, ' $1').toLowerCase()} ${value ? 'enabled' : 'disabled'}`)
    
    if (setting === 'darkMode') {
      setIsDarkMode(value)
    }
}

  const handleBookingDetails = (booking) => {
    setSelectedBooking(booking)
    setShowBookingDetails(true)
  }

  const handleCloseBookingDetails = () => {
    setShowBookingDetails(false)
    setSelectedBooking(null)
  }

  const handleAvatarUpload = (e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setProfile(prev => ({ ...prev, avatar: e.target.result }))
        toast.success('Avatar updated successfully!')
      }
      reader.readAsDataURL(file)
    }
  }

  const tabs = [
    { id: 'profile', name: 'Profile', icon: 'User' },
    { id: 'settings', name: 'Settings', icon: 'Settings' },
    { id: 'bookings', name: 'My Bookings', icon: 'Ticket' }
  ]

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
              className="flex items-center space-x-3 cursor-pointer"
              onClick={() => navigate('/')}
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
            <div className="flex items-center space-x-4">
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
                onClick={() => navigate('/')}
                className="p-2 rounded-xl bg-surface-100 dark:bg-surface-800 hover:bg-surface-200 dark:hover:bg-surface-700 transition-colors focus-ring"
              >
                <ApperIcon name="Home" className="w-5 h-5 text-surface-700 dark:text-surface-300" />
              </motion.button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-3xl font-bold text-surface-900 dark:text-white mb-8">My Account</h1>
          
          {/* Tab Navigation */}
          <div className="flex space-x-1 bg-surface-200/50 dark:bg-surface-800/50 p-1 rounded-xl mb-8">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                  activeTab === tab.id
                    ? 'bg-white dark:bg-surface-700 text-primary-600 shadow-sm'
                    : 'text-surface-600 dark:text-surface-400 hover:text-surface-900 dark:hover:text-white'
                }`}
              >
                <ApperIcon name={tab.icon} className="w-4 h-4" />
                <span>{tab.name}</span>
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
          >
            {activeTab === 'profile' && (
              <div className="bg-white/60 dark:bg-surface-800/60 backdrop-blur-sm rounded-2xl p-6 border border-surface-200/50 dark:border-surface-700/50">
                <h2 className="text-xl font-semibold text-surface-900 dark:text-white mb-6">Profile Information</h2>
                
                <form onSubmit={handleProfileUpdate} className="space-y-6">
                  {/* Avatar Upload */}
                  <div className="flex items-center space-x-6">
                    <div className="relative">
                      <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary-500 to-secondary-500 flex items-center justify-center overflow-hidden">
                        {profile.avatar ? (
                          <img src={profile.avatar} alt="Avatar" className="w-full h-full object-cover" />
                        ) : (
                          <ApperIcon name="User" className="w-8 h-8 text-white" />
                        )}
                      </div>
                      <label className="absolute -bottom-2 -right-2 w-8 h-8 bg-primary-600 rounded-full flex items-center justify-center cursor-pointer hover:bg-primary-700 transition-colors">
                        <ApperIcon name="Camera" className="w-4 h-4 text-white" />
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleAvatarUpload}
                          className="hidden"
                        />
                      </label>
                    </div>
                    <div>
                      <h3 className="font-medium text-surface-900 dark:text-white">Profile Picture</h3>
                      <p className="text-sm text-surface-600 dark:text-surface-400">Upload a new profile picture</p>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">
                        Full Name
                      </label>
                      <input
                        type="text"
                        value={profile.name}
                        onChange={(e) => setProfile(prev => ({ ...prev, name: e.target.value }))}
                        className="w-full px-4 py-3 rounded-xl border border-surface-300 dark:border-surface-600 bg-white dark:bg-surface-800 text-surface-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">
                        Email Address
                      </label>
                      <input
                        type="email"
                        value={profile.email}
                        onChange={(e) => setProfile(prev => ({ ...prev, email: e.target.value }))}
                        className="w-full px-4 py-3 rounded-xl border border-surface-300 dark:border-surface-600 bg-white dark:bg-surface-800 text-surface-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        value={profile.phone}
                        onChange={(e) => setProfile(prev => ({ ...prev, phone: e.target.value }))}
                        className="w-full px-4 py-3 rounded-xl border border-surface-300 dark:border-surface-600 bg-white dark:bg-surface-800 text-surface-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">
                        Date of Birth
                      </label>
                      <input
                        type="date"
                        value={profile.dateOfBirth}
                        onChange={(e) => setProfile(prev => ({ ...prev, dateOfBirth: e.target.value }))}
                        className="w-full px-4 py-3 rounded-xl border border-surface-300 dark:border-surface-600 bg-white dark:bg-surface-800 text-surface-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      />
                    </div>
                  </div>

                  <motion.button
                    type="submit"
                    disabled={isLoading}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="px-6 py-3 bg-gradient-to-r from-primary-600 to-primary-700 text-white font-semibold rounded-xl hover:from-primary-700 hover:to-primary-800 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isLoading ? 'Updating...' : 'Update Profile'}
                  </motion.button>
                </form>
              </div>
            )}

            {activeTab === 'settings' && (
              <div className="space-y-6">
                <div className="bg-white/60 dark:bg-surface-800/60 backdrop-blur-sm rounded-2xl p-6 border border-surface-200/50 dark:border-surface-700/50">
                  <h2 className="text-xl font-semibold text-surface-900 dark:text-white mb-6">Notification Preferences</h2>
                  
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium text-surface-900 dark:text-white">Email Notifications</h3>
                        <p className="text-sm text-surface-600 dark:text-surface-400">Receive booking confirmations and updates via email</p>
                      </div>
                      <button
                        onClick={() => handleSettingChange('emailNotifications', !settings.emailNotifications)}
                        className={`relative w-12 h-6 rounded-full transition-colors ${
                          settings.emailNotifications ? 'bg-primary-600' : 'bg-surface-300 dark:bg-surface-600'
                        }`}
                      >
                        <div className={`absolute w-5 h-5 bg-white rounded-full top-0.5 transition-transform ${
                          settings.emailNotifications ? 'translate-x-6' : 'translate-x-0.5'
                        }`} />
                      </button>
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium text-surface-900 dark:text-white">SMS Notifications</h3>
                        <p className="text-sm text-surface-600 dark:text-surface-400">Receive event reminders via text message</p>
                      </div>
                      <button
                        onClick={() => handleSettingChange('smsNotifications', !settings.smsNotifications)}
                        className={`relative w-12 h-6 rounded-full transition-colors ${
                          settings.smsNotifications ? 'bg-primary-600' : 'bg-surface-300 dark:bg-surface-600'
                        }`}
                      >
                        <div className={`absolute w-5 h-5 bg-white rounded-full top-0.5 transition-transform ${
                          settings.smsNotifications ? 'translate-x-6' : 'translate-x-0.5'
                        }`} />
                      </button>
                    </div>
                  </div>
                </div>

                <div className="bg-white/60 dark:bg-surface-800/60 backdrop-blur-sm rounded-2xl p-6 border border-surface-200/50 dark:border-surface-700/50">
                  <h2 className="text-xl font-semibold text-surface-900 dark:text-white mb-6">Appearance</h2>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium text-surface-900 dark:text-white">Dark Mode</h3>
                      <p className="text-sm text-surface-600 dark:text-surface-400">Switch between light and dark themes</p>
                    </div>
                    <button
                      onClick={() => handleSettingChange('darkMode', !settings.darkMode)}
                      className={`relative w-12 h-6 rounded-full transition-colors ${
                        settings.darkMode ? 'bg-primary-600' : 'bg-surface-300 dark:bg-surface-600'
                      }`}
                    >
                      <div className={`absolute w-5 h-5 bg-white rounded-full top-0.5 transition-transform ${
                        settings.darkMode ? 'translate-x-6' : 'translate-x-0.5'
                      }`} />
                    </button>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'bookings' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold text-surface-900 dark:text-white">My Bookings</h2>
                  <div className="text-sm text-surface-600 dark:text-surface-400">
                    {bookings.length} total bookings
                  </div>
                </div>
                
{bookings.length > 0 ? (
                  <div className="space-y-4">
                    {bookings.map((booking) => (
                      <BookingCard 
                        key={booking.id} 
                        booking={booking} 
                        onViewDetails={() => handleBookingDetails(booking)}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="bg-white/60 dark:bg-surface-800/60 backdrop-blur-sm rounded-2xl p-12 border border-surface-200/50 dark:border-surface-700/50 text-center">
                    <ApperIcon name="Ticket" className="w-16 h-16 text-surface-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-surface-900 dark:text-white mb-2">No bookings yet</h3>
                    <p className="text-surface-600 dark:text-surface-400 mb-6">Start exploring events and book your first ticket!</p>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => navigate('/')}
                      className="px-6 py-3 bg-gradient-to-r from-primary-600 to-primary-700 text-white font-semibold rounded-xl hover:from-primary-700 hover:to-primary-800 transition-all duration-300"
                    >
                      Browse Events
                    </motion.button>
                  </div>
                )}
              </div>
            )}
</motion.div>
        </motion.div>
      </div>

      {/* Booking Details Modal */}
      {showBookingDetails && selectedBooking && (
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={handleCloseBookingDetails}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-white dark:bg-surface-800 rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
          >
            {/* Modal Header */}
            <div className="sticky top-0 bg-white dark:bg-surface-800 border-b border-surface-200 dark:border-surface-700 p-6 rounded-t-2xl">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-surface-900 dark:text-white">
                  Booking Details
                </h2>
                <button
                  onClick={handleCloseBookingDetails}
                  className="p-2 hover:bg-surface-100 dark:hover:bg-surface-700 rounded-lg transition-colors"
                >
                  <ApperIcon name="X" className="w-6 h-6 text-surface-600 dark:text-surface-400" />
                </button>
              </div>
            </div>

            {/* Modal Content */}
            <div className="p-6 space-y-8">
              {/* Event Information */}
              <div className="flex flex-col lg:flex-row gap-6">
                <div className="lg:w-80 lg:h-48 w-full h-64 rounded-xl overflow-hidden bg-surface-200 dark:bg-surface-700">
                  <img 
                    src={selectedBooking.image} 
                    alt={selectedBooking.eventName}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 space-y-4">
                  <div>
                    <h3 className="text-2xl font-bold text-surface-900 dark:text-white mb-2">
                      {selectedBooking.eventName}
                    </h3>
                    <div className="flex items-center space-x-2 text-surface-600 dark:text-surface-400 mb-4">
                      <ApperIcon name="MapPin" className="w-5 h-5" />
                      <span className="text-lg">{selectedBooking.venue}</span>
                    </div>
                    <span className={`inline-block px-4 py-2 rounded-full text-sm font-medium capitalize ${
                      selectedBooking.status === 'confirmed' 
                        ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
                        : selectedBooking.status === 'cancelled'
                        ? 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
                        : 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400'
                    }`}>
                      {selectedBooking.status}
                    </span>
                  </div>
                </div>
              </div>

              {/* Booking Information Grid */}
              <div className="grid md:grid-cols-2 gap-8">
                {/* Event Details */}
                <div className="space-y-6">
                  <h4 className="text-lg font-semibold text-surface-900 dark:text-white border-b border-surface-200 dark:border-surface-700 pb-2">
                    Event Details
                  </h4>
                  
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <ApperIcon name="Calendar" className="w-5 h-5 text-primary-600" />
                      <div>
                        <p className="text-sm text-surface-600 dark:text-surface-400">Date</p>
                        <p className="font-medium text-surface-900 dark:text-white">
                          {new Date(selectedBooking.date).toLocaleDateString('en-US', {
                            weekday: 'long',
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          })}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-3">
                      <ApperIcon name="Clock" className="w-5 h-5 text-primary-600" />
                      <div>
                        <p className="text-sm text-surface-600 dark:text-surface-400">Time</p>
                        <p className="font-medium text-surface-900 dark:text-white">
                          {selectedBooking.time}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-3">
                      <ApperIcon name="Armchair" className="w-5 h-5 text-primary-600" />
                      <div>
                        <p className="text-sm text-surface-600 dark:text-surface-400">Seats</p>
                        <p className="font-medium text-surface-900 dark:text-white">
                          {selectedBooking.seats.join(', ')}
                        </p>
                        <p className="text-xs text-surface-500 dark:text-surface-400">
                          {selectedBooking.seats.length} seat{selectedBooking.seats.length > 1 ? 's' : ''}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Booking Information */}
                <div className="space-y-6">
                  <h4 className="text-lg font-semibold text-surface-900 dark:text-white border-b border-surface-200 dark:border-surface-700 pb-2">
                    Booking Information
                  </h4>
                  
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <ApperIcon name="Hash" className="w-5 h-5 text-primary-600" />
                      <div>
                        <p className="text-sm text-surface-600 dark:text-surface-400">Booking ID</p>
                        <p className="font-medium text-surface-900 dark:text-white font-mono">
                          {selectedBooking.id}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-3">
                      <ApperIcon name="Calendar" className="w-5 h-5 text-primary-600" />
                      <div>
                        <p className="text-sm text-surface-600 dark:text-surface-400">Booking Date</p>
                        <p className="font-medium text-surface-900 dark:text-white">
                          {new Date(selectedBooking.bookingDate).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          })}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-3">
                      <ApperIcon name="DollarSign" className="w-5 h-5 text-primary-600" />
                      <div>
                        <p className="text-sm text-surface-600 dark:text-surface-400">Total Amount</p>
                        <p className="font-medium text-surface-900 dark:text-white text-lg">
                          ${selectedBooking.totalAmount}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Pricing Breakdown */}
              <div className="bg-surface-50 dark:bg-surface-900/50 rounded-xl p-6">
                <h4 className="text-lg font-semibold text-surface-900 dark:text-white mb-4">
                  Pricing Breakdown
                </h4>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-surface-600 dark:text-surface-400">
                      Ticket Price ({selectedBooking.seats.length} × ${Math.floor(selectedBooking.totalAmount / selectedBooking.seats.length * 0.85)})
                    </span>
                    <span className="font-medium text-surface-900 dark:text-white">
                      ${Math.floor(selectedBooking.totalAmount * 0.85)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-surface-600 dark:text-surface-400">Service Fee</span>
                    <span className="font-medium text-surface-900 dark:text-white">
                      ${Math.floor(selectedBooking.totalAmount * 0.10)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-surface-600 dark:text-surface-400">Processing Fee</span>
                    <span className="font-medium text-surface-900 dark:text-white">
                      ${selectedBooking.totalAmount - Math.floor(selectedBooking.totalAmount * 0.85) - Math.floor(selectedBooking.totalAmount * 0.10)}
                    </span>
                  </div>
                  <div className="border-t border-surface-200 dark:border-surface-700 pt-3">
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-semibold text-surface-900 dark:text-white">Total</span>
                      <span className="text-lg font-bold text-primary-600">${selectedBooking.totalAmount}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 pt-4">
                {selectedBooking.status === 'confirmed' && (
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex-1 px-6 py-3 bg-gradient-to-r from-primary-600 to-primary-700 text-white font-semibold rounded-xl hover:from-primary-700 hover:to-primary-800 transition-all duration-300 flex items-center justify-center space-x-2"
                  >
                    <ApperIcon name="Download" className="w-5 h-5" />
                    <span>Download Ticket</span>
                  </motion.button>
                )}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleCloseBookingDetails}
                  className="flex-1 px-6 py-3 bg-surface-200 dark:bg-surface-700 hover:bg-surface-300 dark:hover:bg-surface-600 text-surface-900 dark:text-white font-semibold rounded-xl transition-all duration-300"
                >
                  Close
                </motion.button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  )
}

export default Account