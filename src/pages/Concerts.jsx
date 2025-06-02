import { useState } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import ApperIcon from '../components/ApperIcon'

const Concerts = () => {
  const navigate = useNavigate()
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedGenre, setSelectedGenre] = useState('all')

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
    toast.success(`Booking tickets for ${concert.title}!`)
  }

  const handleViewDetails = (concert) => {
    toast.info(`Viewing details for ${concert.title}`)
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
    </div>
  )
}

export default Concerts