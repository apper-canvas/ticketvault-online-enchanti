import { useState } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import ApperIcon from '../components/ApperIcon'

const Events = () => {
  const navigate = useNavigate()
const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [selectedLocation, setSelectedLocation] = useState('')
  const [showEventDetails, setShowEventDetails] = useState(false)
  const [selectedEvent, setSelectedEvent] = useState(null)
  const categories = ['All', 'Movies', 'Sports', 'Concerts', 'Theater']
  
  const sampleEvents = [
    {
      id: 1,
      title: 'Avengers: Endgame',
      category: 'Movies',
      location: 'AMC Theater, NYC',
      date: '2024-02-15',
      time: '7:30 PM',
      price: 25,
      image: 'https://images.unsplash.com/photo-1489599904472-1c4e853bae42?w=400&h=300&fit=crop',
      rating: 4.8
    },
    {
      id: 2,
      title: 'NBA Finals Game 7',
      category: 'Sports',
      location: 'Madison Square Garden',
      date: '2024-02-18',
      time: '8:00 PM',
      price: 150,
      image: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?w=400&h=300&fit=crop',
      rating: 4.9
    },
    {
      id: 3,
      title: 'Taylor Swift Concert',
      category: 'Concerts',
      location: 'MetLife Stadium',
      date: '2024-02-20',
      time: '7:00 PM',
      price: 89,
      image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=300&fit=crop',
      rating: 4.7
    },
    {
      id: 4,
      title: 'The Lion King',
      category: 'Theater',
      location: 'Broadway Theater',
      date: '2024-02-22',
      time: '8:00 PM',
      price: 75,
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop',
      rating: 4.6
    },
    {
      id: 5,
      title: 'Spider-Man: No Way Home',
      category: 'Movies',
      location: 'Regal Cinema, LA',
      date: '2024-02-25',
      time: '6:45 PM',
      price: 22,
      image: 'https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=400&h=300&fit=crop',
      rating: 4.5
    },
    {
      id: 6,
      title: 'LA Lakers vs Warriors',
      category: 'Sports',
      location: 'Staples Center',
      date: '2024-02-28',
      time: '7:30 PM',
      price: 120,
      image: 'https://images.unsplash.com/photo-1574623452334-1e0ac2b3ccb4?w=400&h=300&fit=crop',
      rating: 4.4
    }
  ]

  const filteredEvents = sampleEvents.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.location.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === 'All' || event.category === selectedCategory
    const matchesLocation = !selectedLocation || event.location.toLowerCase().includes(selectedLocation.toLowerCase())
    
return matchesSearch && matchesCategory && matchesLocation
})

const handleBookEvent = (event) => {
  toast.success(`Opening booking for ${event.title}...`, {
    position: "top-right",
    autoClose: 2000,
  })
  // Navigate to dedicated booking page with event ID
  setTimeout(() => {
    navigate(`/booking/${event.id}`)
  }, 500)
}

const handleViewDetails = (event) => {
  setSelectedEvent(event)
  setShowEventDetails(true)
}
  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { 
      weekday: 'short', 
      month: 'short', 
      day: 'numeric' 
    })
  }

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
              onClick={() => navigate('/')}
              className="flex items-center space-x-3 cursor-pointer"
            >
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-xl flex items-center justify-center shadow-soft">
                <ApperIcon name="Ticket" className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl sm:text-2xl font-bold gradient-text">TicketVault</h1>
                <p className="text-xs text-surface-600 dark:text-surface-400 hidden sm:block">Premium Event Booking</p>
              </div>
            </motion.div>

            {/* Back Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/')}
              className="flex items-center space-x-2 px-4 py-2 bg-surface-100 dark:bg-surface-800 hover:bg-surface-200 dark:hover:bg-surface-700 rounded-xl transition-colors focus-ring"
            >
              <ApperIcon name="ArrowLeft" className="w-4 h-4 text-surface-700 dark:text-surface-300" />
              <span className="text-surface-700 dark:text-surface-300 font-medium">Back to Home</span>
            </motion.button>
          </div>
        </div>
      </motion.header>

      {/* Search Section */}
      <motion.section 
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="py-8 sm:py-12"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-surface-900 dark:text-white mb-4">
              Discover Amazing <span className="gradient-text">Events</span>
            </h1>
            <p className="text-lg text-surface-600 dark:text-surface-300 max-w-2xl mx-auto">
              Find the perfect event for you. From blockbuster movies to live concerts, we have it all.
            </p>
          </div>

          {/* Search Controls */}
          <div className="glass-card p-6 rounded-2xl mb-8">
            <div className="grid md:grid-cols-3 gap-4">
              {/* Location Search */}
              <div className="relative">
                <ApperIcon name="MapPin" className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-surface-400" />
                <input
                  type="text"
                  placeholder="Enter city or venue"
                  value={selectedLocation}
                  onChange={(e) => setSelectedLocation(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-white dark:bg-surface-800 border border-surface-200 dark:border-surface-700 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                />
              </div>

              {/* Event Search */}
              <div className="relative">
                <ApperIcon name="Search" className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-surface-400" />
                <input
                  type="text"
                  placeholder="Search events..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-white dark:bg-surface-800 border border-surface-200 dark:border-surface-700 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                />
              </div>

              {/* Search Button */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="px-6 py-3 bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 text-white font-semibold rounded-xl shadow-soft transition-all duration-300 focus-ring"
              >
                <div className="flex items-center justify-center space-x-2">
                  <ApperIcon name="Search" className="w-5 h-5" />
                  <span>Search Events</span>
                </div>
              </motion.button>
            </div>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap gap-3 justify-center mb-8">
            {categories.map((category) => (
              <motion.button
                key={category}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 focus-ring ${
                  selectedCategory === category
                    ? 'bg-gradient-to-r from-primary-600 to-primary-700 text-white shadow-soft'
                    : 'bg-white/80 dark:bg-surface-800/80 text-surface-700 dark:text-surface-300 hover:bg-white dark:hover:bg-surface-800'
                }`}
              >
                {category}
              </motion.button>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Events Grid */}
      <motion.section 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="pb-12 sm:pb-20"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-surface-900 dark:text-white">
              {filteredEvents.length} Events Found
            </h2>
            <div className="flex items-center space-x-2 text-surface-600 dark:text-surface-400">
              <ApperIcon name="Filter" className="w-5 h-5" />
              <span className="text-sm font-medium">Sort by: Popularity</span>
            </div>
          </div>

          {filteredEvents.length === 0 ? (
            <div className="text-center py-16">
              <ApperIcon name="SearchX" className="w-16 h-16 text-surface-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-surface-700 dark:text-surface-300 mb-2">No Events Found</h3>
              <p className="text-surface-600 dark:text-surface-400">Try adjusting your search criteria or browse all events.</p>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {filteredEvents.map((event, index) => (
                <motion.div
                  key={event.id}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ y: -5, scale: 1.02 }}
                  className="glass-card overflow-hidden group cursor-pointer"
                >
                  <div className="relative">
                    <img
                      src={event.image}
                      alt={event.title}
                      className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute top-3 right-3 bg-white/90 dark:bg-surface-800/90 backdrop-blur-sm px-2 py-1 rounded-full">
                      <div className="flex items-center space-x-1">
                        <ApperIcon name="Star" className="w-3 h-3 text-yellow-500 fill-current" />
                        <span className="text-xs font-medium text-surface-700 dark:text-surface-300">{event.rating}</span>
                      </div>
                    </div>
                    <div className="absolute top-3 left-3 bg-primary-600 text-white px-3 py-1 rounded-full text-xs font-medium">
                      {event.category}
                    </div>
                  </div>

                  <div className="p-6">
                    <h3 className="text-xl font-bold text-surface-900 dark:text-white mb-2 group-hover:text-primary-600 transition-colors">
                      {event.title}
                    </h3>
                    
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center space-x-2 text-surface-600 dark:text-surface-400">
                        <ApperIcon name="MapPin" className="w-4 h-4" />
                        <span className="text-sm">{event.location}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-surface-600 dark:text-surface-400">
                        <ApperIcon name="Calendar" className="w-4 h-4" />
                        <span className="text-sm">{formatDate(event.date)} • {event.time}</span>
                      </div>
                    </div>
<div className="flex items-center justify-between mb-4">
                      <div>
                        <span className="text-2xl font-bold text-primary-600">${event.price}</span>
                        <span className="text-surface-500 dark:text-surface-400 text-sm ml-1">per ticket</span>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleViewDetails(event)}
                        className="flex-1 px-4 py-2 bg-surface-100 dark:bg-surface-800 hover:bg-surface-200 dark:hover:bg-surface-700 text-surface-700 dark:text-surface-300 font-medium rounded-lg transition-all duration-300 focus-ring"
                      >
                        Details
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleBookEvent(event)}
                        className="flex-1 px-4 py-2 bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 text-white font-semibold rounded-lg shadow-soft transition-all duration-300 focus-ring"
                      >
                        Book Now
                      </motion.button>
</div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
</motion.section>

      {/* Event Details Modal */}
      {showEventDetails && selectedEvent && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setShowEventDetails(false)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-white dark:bg-surface-900 rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
          >
            {/* Modal Header */}
            <div className="relative">
              <img
                src={selectedEvent.image}
                alt={selectedEvent.title}
                className="w-full h-64 object-cover rounded-t-2xl"
              />
              <div className="absolute top-4 right-4 bg-white/90 dark:bg-surface-800/90 backdrop-blur-sm rounded-full p-2">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setShowEventDetails(false)}
                  className="text-surface-600 dark:text-surface-400 hover:text-surface-800 dark:hover:text-surface-200"
                >
                  <ApperIcon name="X" className="w-5 h-5" />
                </motion.button>
              </div>
              <div className="absolute top-4 left-4 bg-primary-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                {selectedEvent.category}
              </div>
              <div className="absolute bottom-4 right-4 bg-white/90 dark:bg-surface-800/90 backdrop-blur-sm px-3 py-1 rounded-full">
                <div className="flex items-center space-x-1">
                  <ApperIcon name="Star" className="w-4 h-4 text-yellow-500 fill-current" />
                  <span className="text-sm font-medium text-surface-700 dark:text-surface-300">{selectedEvent.rating}</span>
                </div>
              </div>
            </div>

            {/* Modal Content */}
            <div className="p-6">
              <div className="mb-6">
                <h2 className="text-3xl font-bold text-surface-900 dark:text-white mb-2">
                  {selectedEvent.title}
                </h2>
                <p className="text-surface-600 dark:text-surface-400 leading-relaxed">
                  Experience the best in {selectedEvent.category.toLowerCase()} entertainment. This highly-rated event promises an unforgettable experience with world-class production values and exceptional performances.
                </p>
              </div>

              {/* Event Details Grid */}
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-10 h-10 bg-primary-100 dark:bg-primary-900/30 rounded-lg flex items-center justify-center flex-shrink-0">
                      <ApperIcon name="MapPin" className="w-5 h-5 text-primary-600 dark:text-primary-400" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-surface-900 dark:text-white">Venue</h4>
                      <p className="text-surface-600 dark:text-surface-400">{selectedEvent.location}</p>
                      <p className="text-sm text-surface-500 dark:text-surface-500">Premium seating available</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <div className="w-10 h-10 bg-secondary-100 dark:bg-secondary-900/30 rounded-lg flex items-center justify-center flex-shrink-0">
                      <ApperIcon name="Calendar" className="w-5 h-5 text-secondary-600 dark:text-secondary-400" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-surface-900 dark:text-white">Date & Time</h4>
                      <p className="text-surface-600 dark:text-surface-400">{formatDate(selectedEvent.date)}</p>
                      <p className="text-sm text-surface-500 dark:text-surface-500">{selectedEvent.time}</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-10 h-10 bg-success-100 dark:bg-success-900/30 rounded-lg flex items-center justify-center flex-shrink-0">
                      <ApperIcon name="DollarSign" className="w-5 h-5 text-success-600 dark:text-success-400" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-surface-900 dark:text-white">Pricing</h4>
                      <p className="text-2xl font-bold text-primary-600">${selectedEvent.price}</p>
                      <p className="text-sm text-surface-500 dark:text-surface-500">Starting price per ticket</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <div className="w-10 h-10 bg-warning-100 dark:bg-warning-900/30 rounded-lg flex items-center justify-center flex-shrink-0">
                      <ApperIcon name="Users" className="w-5 h-5 text-warning-600 dark:text-warning-400" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-surface-900 dark:text-white">Availability</h4>
                      <p className="text-surface-600 dark:text-surface-400">Limited seats remaining</p>
                      <p className="text-sm text-surface-500 dark:text-surface-500">Book now to secure your spot</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Features */}
              <div className="mb-6">
                <h4 className="font-semibold text-surface-900 dark:text-white mb-3">Event Features</h4>
                <div className="grid grid-cols-2 gap-3">
                  <div className="flex items-center space-x-2">
                    <ApperIcon name="Wifi" className="w-4 h-4 text-primary-600" />
                    <span className="text-sm text-surface-600 dark:text-surface-400">Free WiFi</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <ApperIcon name="Car" className="w-4 h-4 text-primary-600" />
                    <span className="text-sm text-surface-600 dark:text-surface-400">Parking Available</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <ApperIcon name="Coffee" className="w-4 h-4 text-primary-600" />
                    <span className="text-sm text-surface-600 dark:text-surface-400">Refreshments</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <ApperIcon name="Shield" className="w-4 h-4 text-primary-600" />
                    <span className="text-sm text-surface-600 dark:text-surface-400">Secure Venue</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setShowEventDetails(false)}
                  className="flex-1 px-6 py-3 bg-surface-100 dark:bg-surface-800 hover:bg-surface-200 dark:hover:bg-surface-700 text-surface-700 dark:text-surface-300 font-medium rounded-xl transition-all duration-300 focus-ring"
                >
                  Close
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    setShowEventDetails(false)
                    handleBookEvent(selectedEvent)
                  }}
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 text-white font-semibold rounded-xl shadow-soft transition-all duration-300 focus-ring"
                >
                  Book Now
                </motion.button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  )
}

export default Events