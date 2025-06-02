import { useState } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import ApperIcon from '../components/ApperIcon'

const Concerts = () => {
  const navigate = useNavigate()
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedGenre, setSelectedGenre] = useState('all')
  const [showDetails, setShowDetails] = useState(false)
  const [selectedConcert, setSelectedConcert] = useState(null)
  const genres = ['all', 'rock', 'pop', 'hip-hop', 'country', 'electronic', 'jazz', 'classical']

  const concerts = [
    {
      id: 1,
      title: "Taylor Swift - The Eras Tour",
      artist: "Taylor Swift",
      genre: "pop",
      date: "July 15, 2024",
      time: "7:00 PM",
      venue: "MetLife Stadium",
      location: "East Rutherford, NJ",
      price: "$149.99",
      image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=300&fit=crop",
      description: "A spectacular journey through all musical eras of Taylor Swift's career."
    },
    {
      id: 2,
      title: "The Weeknd - After Hours Tour",
      artist: "The Weeknd",
      genre: "pop",
      date: "August 3, 2024",
      time: "8:30 PM",
      venue: "Madison Square Garden",
      location: "New York, NY",
      price: "$129.00",
      image: "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=400&h=300&fit=crop",
      description: "An unforgettable night with chart-topping hits and stunning visuals."
    },
    {
      id: 3,
      title: "Foo Fighters World Tour",
      artist: "Foo Fighters",
      genre: "rock",
      date: "September 12, 2024",
      time: "7:30 PM",
      venue: "Fenway Park",
      location: "Boston, MA",
      price: "$89.99",
      image: "https://images.unsplash.com/photo-1506157786151-b8491531f063?w=400&h=300&fit=crop",
      description: "High-energy rock performance by one of the greatest bands of all time."
    },
    {
      id: 4,
      title: "Drake - Nothing Was The Same Tour",
      artist: "Drake",
      genre: "hip-hop",
      date: "October 20, 2024",
      time: "8:00 PM",
      venue: "American Airlines Center",
      location: "Dallas, TX",
      price: "$119.99",
      image: "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=400&h=300&fit=crop",
      description: "The ultimate hip-hop experience with special guests and surprises."
    },
    {
      id: 5,
      title: "Calvin Harris Live",
      artist: "Calvin Harris",
      genre: "electronic",
      date: "November 8, 2024",
      time: "9:00 PM",
      venue: "Red Rocks Amphitheatre",
      location: "Morrison, CO",
      price: "$95.00",
      image: "https://images.unsplash.com/photo-1571266028243-d220c2dcbc4e?w=400&h=300&fit=crop",
      description: "Electronic music magic under the stars at the iconic Red Rocks."
    },
    {
      id: 6,
      title: "Chris Stapleton Country Night",
      artist: "Chris Stapleton",
      genre: "country",
      date: "December 1, 2024",
      time: "7:00 PM",
      venue: "Grand Ole Opry House",
      location: "Nashville, TN",
      price: "$75.00",
      image: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=400&h=300&fit=crop",
      description: "Authentic country music in the heart of Nashville's music scene."
    }
  ]

  const filteredConcerts = concerts.filter(concert => {
    const matchesSearch = concert.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         concert.artist.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         concert.venue.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesGenre = selectedGenre === 'all' || concert.genre === selectedGenre
    return matchesSearch && matchesGenre
  })

const handleBookNow = (concert) => {
    toast.success(`Navigating to booking for ${concert.title}!`)
    navigate(`/booking/${concert.id}`)
  }

  const handleViewDetails = (concert) => {
    setSelectedConcert(concert)
    setShowDetails(true)
  }

  const handleCloseDetails = () => {
    setShowDetails(false)
    setSelectedConcert(null)
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Escape' && showDetails) {
      handleCloseDetails()
    }
  }

  // Add keyboard event listener
  useState(() => {
    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [showDetails])
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
            <motion.button
              whileHover={{ scale: 1.05 }}
              onClick={() => navigate('/')}
              className="flex items-center space-x-3"
            >
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-xl flex items-center justify-center shadow-soft">
                <ApperIcon name="Ticket" className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl sm:text-2xl font-bold gradient-text">TicketVault</h1>
                <p className="text-xs text-surface-600 dark:text-surface-400 hidden sm:block">Concerts</p>
              </div>
            </motion.button>

            <div className="flex items-center space-x-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                onClick={() => navigate('/')}
                className="px-4 py-2 text-surface-700 dark:text-surface-300 hover:text-primary-600 font-medium transition-colors focus-ring"
              >
                Back to Home
              </motion.button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Title */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl sm:text-5xl font-bold gradient-text mb-4">
            Concert Tickets
          </h1>
          <p className="text-lg text-surface-600 dark:text-surface-300 max-w-2xl mx-auto">
            Experience live music like never before. Book tickets for the hottest concerts and festivals
          </p>
        </motion.div>

        {/* Search and Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="glass-card p-6 mb-8"
        >
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="flex-1">
              <div className="relative">
                <ApperIcon name="Search" className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-surface-400" />
                <input
                  type="text"
                  placeholder="Search artists, concerts, or venues..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-surface-300 dark:border-surface-600 rounded-xl bg-white/50 dark:bg-surface-800/50 backdrop-blur-sm focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                />
              </div>
            </div>

            {/* Genre Filter */}
            <div className="md:w-48">
              <select
                value={selectedGenre}
                onChange={(e) => setSelectedGenre(e.target.value)}
                className="w-full px-4 py-3 border border-surface-300 dark:border-surface-600 rounded-xl bg-white/50 dark:bg-surface-800/50 backdrop-blur-sm focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
              >
                {genres.map(genre => (
                  <option key={genre} value={genre}>
                    {genre === 'all' ? 'All Genres' : genre.charAt(0).toUpperCase() + genre.slice(1)}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </motion.div>

        {/* Concerts Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {filteredConcerts.map((concert, index) => (
            <motion.div
              key={concert.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -10, scale: 1.02 }}
              className="glass-card overflow-hidden group cursor-pointer"
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={concert.image}
                  alt={concert.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-surface-900/80 via-transparent to-transparent" />
                <div className="absolute top-4 right-4">
                  <span className="px-3 py-1 bg-primary-500 text-white text-sm font-medium rounded-full capitalize">
                    {concert.genre}
                  </span>
                </div>
              </div>

              <div className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="text-lg font-bold text-surface-900 dark:text-white group-hover:text-primary-600 transition-colors mb-1">
                      {concert.artist}
                    </h3>
                    <p className="text-sm text-surface-600 dark:text-surface-300">{concert.title}</p>
                  </div>
                  <span className="text-xl font-bold text-primary-600">
                    {concert.price}
                  </span>
                </div>

                <p className="text-surface-600 dark:text-surface-300 mb-4 text-sm">
                  {concert.description}
                </p>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-sm text-surface-600 dark:text-surface-300">
                    <ApperIcon name="Calendar" className="w-4 h-4 mr-2" />
                    {concert.date} at {concert.time}
                  </div>
                  <div className="flex items-center text-sm text-surface-600 dark:text-surface-300">
                    <ApperIcon name="MapPin" className="w-4 h-4 mr-2" />
                    {concert.venue}
                  </div>
                  <div className="flex items-center text-sm text-surface-600 dark:text-surface-300">
                    <ApperIcon name="Navigation" className="w-4 h-4 mr-2" />
                    {concert.location}
                  </div>
                  <div className="flex items-center text-sm text-surface-600 dark:text-surface-300">
                    <ApperIcon name="Music" className="w-4 h-4 mr-2" />
                    {concert.genre.charAt(0).toUpperCase() + concert.genre.slice(1)}
                  </div>
                </div>

                <div className="flex gap-3">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleBookNow(concert)}
                    className="flex-1 px-4 py-2 bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 text-white font-semibold rounded-lg transition-all duration-300 focus-ring text-sm"
                  >
                    Book Tickets
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleViewDetails(concert)}
                    className="px-4 py-2 border border-surface-300 dark:border-surface-600 text-surface-700 dark:text-surface-300 hover:bg-surface-100 dark:hover:bg-surface-700 rounded-lg transition-all duration-300 focus-ring text-sm"
                  >
                    Details
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {filteredConcerts.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <ApperIcon name="Music" className="w-16 h-16 text-surface-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-surface-600 dark:text-surface-300 mb-2">
              No concerts found
            </h3>
            <p className="text-surface-500 dark:text-surface-400">
              Try adjusting your search terms or genre filter
            </p>
          </motion.div>
)}
      </div>

      {/* Concert Details Modal */}
      {showDetails && selectedConcert && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-surface-900/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={handleCloseDetails}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: "spring", damping: 20, stiffness: 300 }}
            className="bg-white dark:bg-surface-800 rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="relative">
              <img
                src={selectedConcert.image}
                alt={selectedConcert.title}
                className="w-full h-64 object-cover rounded-t-2xl"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-surface-900/80 via-transparent to-transparent rounded-t-2xl" />
              <button
                onClick={handleCloseDetails}
                className="absolute top-4 right-4 p-2 bg-surface-900/50 backdrop-blur-sm rounded-full text-white hover:bg-surface-900/70 transition-colors focus:outline-none focus:ring-2 focus:ring-white/50"
                aria-label="Close modal"
              >
                <ApperIcon name="X" className="w-5 h-5" />
              </button>
              <div className="absolute bottom-6 left-6 right-6">
                <span className="inline-block px-3 py-1 bg-primary-500 text-white text-sm font-medium rounded-full capitalize mb-3">
                  {selectedConcert.genre}
                </span>
                <h2 className="text-3xl font-bold text-white mb-2">{selectedConcert.artist}</h2>
                <p className="text-xl text-surface-200">{selectedConcert.title}</p>
              </div>
            </div>

            {/* Modal Content */}
            <div className="p-8">
              {/* Concert Info Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                <div>
                  <h3 className="text-xl font-bold text-surface-900 dark:text-surface-100 mb-4">Concert Details</h3>
                  <div className="space-y-3">
                    <div className="flex items-center text-surface-700 dark:text-surface-300">
                      <ApperIcon name="Calendar" className="w-5 h-5 mr-3 text-primary-600" />
                      <span>{selectedConcert.date} at {selectedConcert.time}</span>
                    </div>
                    <div className="flex items-center text-surface-700 dark:text-surface-300">
                      <ApperIcon name="MapPin" className="w-5 h-5 mr-3 text-primary-600" />
                      <span>{selectedConcert.venue}</span>
                    </div>
                    <div className="flex items-center text-surface-700 dark:text-surface-300">
                      <ApperIcon name="Navigation" className="w-5 h-5 mr-3 text-primary-600" />
                      <span>{selectedConcert.location}</span>
                    </div>
                    <div className="flex items-center text-surface-700 dark:text-surface-300">
                      <ApperIcon name="Music" className="w-5 h-5 mr-3 text-primary-600" />
                      <span>{selectedConcert.genre.charAt(0).toUpperCase() + selectedConcert.genre.slice(1)} Music</span>
                    </div>
                    <div className="flex items-center text-surface-700 dark:text-surface-300">
                      <ApperIcon name="Clock" className="w-5 h-5 mr-3 text-primary-600" />
                      <span>Approximately 2.5 hours (including intermission)</span>
                    </div>
                    <div className="flex items-center text-surface-700 dark:text-surface-300">
                      <ApperIcon name="Users" className="w-5 h-5 mr-3 text-primary-600" />
                      <span>All ages welcome</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-surface-900 dark:text-surface-100 mb-4">Venue Information</h3>
                  <div className="space-y-3 text-surface-700 dark:text-surface-300">
                    <p><strong className="text-surface-900 dark:text-surface-100">Capacity:</strong> 20,000 seats</p>
                    <p><strong className="text-surface-900 dark:text-surface-100">Parking:</strong> Available on-site ($25)</p>
                    <p><strong className="text-surface-900 dark:text-surface-100">Food & Drinks:</strong> Multiple concession stands</p>
                    <p><strong className="text-surface-900 dark:text-surface-100">Accessibility:</strong> Wheelchair accessible seating available</p>
                    <p><strong className="text-surface-900 dark:text-surface-100">Bag Policy:</strong> Small bags and purses allowed</p>
                  </div>
                </div>
              </div>

              {/* Artist Bio */}
              <div className="mb-8">
                <h3 className="text-xl font-bold text-surface-900 dark:text-surface-100 mb-4">About the Artist</h3>
                <p className="text-surface-700 dark:text-surface-300 leading-relaxed">
                  {selectedConcert.description} This highly anticipated tour promises to deliver an unforgettable 
                  experience with stunning visual effects, incredible live performances, and all your favorite hits. 
                  Don't miss this opportunity to see one of today's most celebrated artists perform live!
                </p>
              </div>

              {/* Setlist Preview */}
              <div className="mb-8">
                <h3 className="text-xl font-bold text-surface-900 dark:text-surface-100 mb-4">Expected Setlist Preview</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-surface-50 dark:bg-surface-700 rounded-lg p-4">
                    <h4 className="font-semibold text-surface-900 dark:text-surface-100 mb-2">Popular Hits</h4>
                    <ul className="text-sm text-surface-700 dark:text-surface-300 space-y-1">
                      <li>• Greatest Hit #1</li>
                      <li>• Chart Topper</li>
                      <li>• Fan Favorite</li>
                      <li>• Latest Single</li>
                    </ul>
                  </div>
                  <div className="bg-surface-50 dark:bg-surface-700 rounded-lg p-4">
                    <h4 className="font-semibold text-surface-900 dark:text-surface-100 mb-2">Special Features</h4>
                    <ul className="text-sm text-surface-700 dark:text-surface-300 space-y-1">
                      <li>• Opening act performance</li>
                      <li>• Special guest appearances</li>
                      <li>• Interactive light show</li>
                      <li>• Encore performance</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Ticket Information */}
              <div className="mb-8">
                <h3 className="text-xl font-bold text-surface-900 dark:text-surface-100 mb-4">Ticket Information</h3>
                <div className="bg-primary-50 dark:bg-primary-900/20 border border-primary-200 dark:border-primary-700 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-semibold text-surface-900 dark:text-surface-100">Starting Price</span>
                    <span className="text-2xl font-bold text-primary-600">{selectedConcert.price}</span>
                  </div>
                  <p className="text-sm text-surface-600 dark:text-surface-400 mb-4">
                    Prices vary by seating section. VIP packages and premium seating available.
                  </p>
                  <ul className="text-sm text-surface-700 dark:text-surface-300 space-y-1">
                    <li>• General Admission: {selectedConcert.price}</li>
                    <li>• Reserved Seating: Starting at ${parseInt(selectedConcert.price.replace('$', '')) + 30}.99</li>
                    <li>• VIP Package: Starting at ${parseInt(selectedConcert.price.replace('$', '')) + 80}.99</li>
                  </ul>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    handleCloseDetails()
                    handleBookNow(selectedConcert)
                  }}
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 text-white font-semibold rounded-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
                >
                  Book Tickets Now
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleCloseDetails}
                  className="px-6 py-3 border border-surface-300 dark:border-surface-600 text-surface-700 dark:text-surface-300 hover:bg-surface-100 dark:hover:bg-surface-700 rounded-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-surface-500 focus:ring-offset-2"
                >
                  Close
                </motion.button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  )
}

export default Concerts