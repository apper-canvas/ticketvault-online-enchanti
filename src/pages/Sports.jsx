import { useState } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import ApperIcon from '../components/ApperIcon'

const Sports = () => {
const navigate = useNavigate()
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedSport, setSelectedSport] = useState('all')
  const [selectedSportEvent, setSelectedSportEvent] = useState(null)
  const [showDetailsModal, setShowDetailsModal] = useState(false)

  const sports = ['all', 'football', 'basketball', 'baseball', 'soccer', 'hockey', 'tennis']

  const events = [
    {
      id: 1,
      title: "Lakers vs Warriors",
      sport: "basketball",
      teams: { home: "Los Angeles Lakers", away: "Golden State Warriors" },
      date: "March 25, 2024",
      time: "7:30 PM",
      venue: "Crypto.com Arena",
      location: "Los Angeles, CA",
      price: "$125.00",
      image: "https://images.unsplash.com/photo-1546519638-68e109498ffc?w=400&h=300&fit=crop",
      description: "Epic showdown between two legendary teams in the heart of LA."
    },
    {
      id: 2,
      title: "Cowboys vs Giants",
      sport: "football",
      teams: { home: "Dallas Cowboys", away: "New York Giants" },
      date: "March 30, 2024",
      time: "8:20 PM",
      venue: "AT&T Stadium",
      location: "Arlington, TX",
      price: "$89.99",
      image: "https://images.unsplash.com/photo-1560272564-c83b66b1ad12?w=400&h=300&fit=crop",
      description: "NFC East rivalry game under the lights in Dallas."
    },
    {
      id: 3,
      title: "Yankees vs Red Sox",
      sport: "baseball",
      teams: { home: "New York Yankees", away: "Boston Red Sox" },
      date: "April 5, 2024",
      time: "1:05 PM",
      venue: "Yankee Stadium",
      location: "Bronx, NY",
      price: "$65.00",
      image: "https://images.unsplash.com/photo-1566577739112-5180d4bf9390?w=400&h=300&fit=crop",
      description: "Classic American League rivalry at the iconic Yankee Stadium."
    },
    {
      id: 4,
      title: "Inter Miami vs LAFC",
      sport: "soccer",
      teams: { home: "Inter Miami CF", away: "Los Angeles FC" },
      date: "April 12, 2024",
      time: "3:00 PM",
      venue: "DRV PNK Stadium",
      location: "Fort Lauderdale, FL",
      price: "$45.00",
      image: "https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?w=400&h=300&fit=crop",
      description: "MLS regular season match featuring star-studded lineups."
    },
    {
      id: 5,
      title: "Rangers vs Bruins",
      sport: "hockey",
      teams: { home: "New York Rangers", away: "Boston Bruins" },
      date: "April 18, 2024",
      time: "7:00 PM",
      venue: "Madison Square Garden",
      location: "New York, NY",
      price: "$95.00",
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop",
      description: "Original Six matchup at the world's most famous arena."
    },
    {
      id: 6,
      title: "US Open Tennis",
      sport: "tennis",
      teams: { home: "Various Players", away: "Tournament" },
      date: "August 28, 2024",
      time: "11:00 AM",
      venue: "USTA Billie Jean King National Tennis Center",
      location: "Flushing, NY",
      price: "$75.00",
      image: "https://images.unsplash.com/photo-1622279457486-62dcc4a431d6?w=400&h=300&fit=crop",
      description: "Grand Slam tennis action featuring the world's best players."
    }
  ]

  const filteredEvents = events.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.venue.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.teams.home.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.teams.away.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesSport = selectedSport === 'all' || event.sport === selectedSport
    return matchesSearch && matchesSport
  })

const handleBookNow = (event) => {
    toast.success(`Redirecting to booking for ${event.title}!`)
    navigate(`/booking/${event.id}`)
  }

  const handleViewDetails = (event) => {
    setSelectedSportEvent(event)
    setShowDetailsModal(true)
  }

  const closeDetailsModal = () => {
    setShowDetailsModal(false)
    setSelectedSportEvent(null)
  }

  const formatEventId = (eventId) => {
    return `sports-${eventId}`
  }

  const handleQuickBook = (event) => {
    toast.success(`Quick booking for ${event.title}!`)
    navigate(`/booking/${formatEventId(event.id)}`)
    closeDetailsModal()
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
                <p className="text-xs text-surface-600 dark:text-surface-400 hidden sm:block">Sports</p>
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
            Sports Events
          </h1>
          <p className="text-lg text-surface-600 dark:text-surface-300 max-w-2xl mx-auto">
            Catch all the action live! Book tickets for your favorite teams and sports
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
                  placeholder="Search teams, venues, or events..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-surface-300 dark:border-surface-600 rounded-xl bg-white/50 dark:bg-surface-800/50 backdrop-blur-sm focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                />
              </div>
            </div>

            {/* Sport Filter */}
            <div className="md:w-48">
              <select
                value={selectedSport}
                onChange={(e) => setSelectedSport(e.target.value)}
                className="w-full px-4 py-3 border border-surface-300 dark:border-surface-600 rounded-xl bg-white/50 dark:bg-surface-800/50 backdrop-blur-sm focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
              >
                {sports.map(sport => (
                  <option key={sport} value={sport}>
                    {sport === 'all' ? 'All Sports' : sport.charAt(0).toUpperCase() + sport.slice(1)}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </motion.div>

        {/* Events Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {filteredEvents.map((event, index) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -10, scale: 1.02 }}
              className="glass-card overflow-hidden group cursor-pointer"
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={event.image}
                  alt={event.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-surface-900/80 via-transparent to-transparent" />
                <div className="absolute top-4 right-4">
                  <span className="px-3 py-1 bg-primary-500 text-white text-sm font-medium rounded-full capitalize">
                    {event.sport}
                  </span>
                </div>
              </div>

              <div className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-xl font-bold text-surface-900 dark:text-white group-hover:text-primary-600 transition-colors">
                    {event.title}
                  </h3>
                  <span className="text-xl font-bold text-primary-600">
                    {event.price}
                  </span>
                </div>

                <p className="text-surface-600 dark:text-surface-300 mb-4 text-sm">
                  {event.description}
                </p>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-sm text-surface-600 dark:text-surface-300">
                    <ApperIcon name="Calendar" className="w-4 h-4 mr-2" />
                    {event.date} at {event.time}
                  </div>
                  <div className="flex items-center text-sm text-surface-600 dark:text-surface-300">
                    <ApperIcon name="MapPin" className="w-4 h-4 mr-2" />
                    {event.venue}
                  </div>
                  <div className="flex items-center text-sm text-surface-600 dark:text-surface-300">
                    <ApperIcon name="Navigation" className="w-4 h-4 mr-2" />
                    {event.location}
                  </div>
                </div>

                {event.teams.away !== "Tournament" && (
                  <div className="mb-4 p-3 bg-surface-100 dark:bg-surface-700 rounded-lg">
                    <div className="text-xs font-medium text-surface-500 dark:text-surface-400 mb-1">Matchup</div>
                    <div className="text-sm font-medium text-surface-700 dark:text-surface-300">
                      {event.teams.home} vs {event.teams.away}
                    </div>
                  </div>
                )}

                <div className="flex gap-3">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleBookNow(event)}
                    className="flex-1 px-4 py-2 bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 text-white font-semibold rounded-lg transition-all duration-300 focus-ring text-sm"
                  >
                    Book Tickets
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleViewDetails(event)}
                    className="px-4 py-2 border border-surface-300 dark:border-surface-600 text-surface-700 dark:text-surface-300 hover:bg-surface-100 dark:hover:bg-surface-700 rounded-lg transition-all duration-300 focus-ring text-sm"
                  >
                    Details
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {filteredEvents.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <ApperIcon name="Trophy" className="w-16 h-16 text-surface-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-surface-600 dark:text-surface-300 mb-2">
              No events found
            </h3>
            <p className="text-surface-500 dark:text-surface-400">
              Try adjusting your search terms or sport filter
            </p>
          </motion.div>
        )}
</div>

      {/* Sports Event Details Modal */}
      {showDetailsModal && selectedSportEvent && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-surface-900/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={closeDetailsModal}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 50 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-white dark:bg-surface-800 rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
          >
            {/* Modal Header */}
            <div className="relative">
              <img
                src={selectedSportEvent.image}
                alt={selectedSportEvent.title}
                className="w-full h-64 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-surface-900/80 via-transparent to-transparent" />
              
              <button
                onClick={closeDetailsModal}
                className="absolute top-4 right-4 w-10 h-10 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full flex items-center justify-center text-white transition-all"
              >
                <ApperIcon name="X" className="w-5 h-5" />
              </button>

              <div className="absolute bottom-4 left-6 right-6">
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-3 py-1 bg-primary-500 text-white text-sm font-medium rounded-full capitalize">
                    {selectedSportEvent.sport}
                  </span>
                  <span className="px-3 py-1 bg-surface-900/70 text-white text-sm font-medium rounded-full">
                    {selectedSportEvent.price}
                  </span>
                </div>
                <h2 className="text-3xl font-bold text-white mb-2">{selectedSportEvent.title}</h2>
                <div className="flex items-center text-white/90 text-sm">
                  <ApperIcon name="Calendar" className="w-4 h-4 mr-2" />
                  {selectedSportEvent.date} at {selectedSportEvent.time}
                </div>
              </div>
            </div>

            {/* Modal Content */}
            <div className="p-6 space-y-6">
              {/* Game Information */}
              <div>
                <h3 className="text-xl font-bold text-surface-900 dark:text-white mb-4">Game Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-surface-50 dark:bg-surface-700 rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-semibold text-surface-900 dark:text-white">Home Team</h4>
                        <p className="text-surface-600 dark:text-surface-300">{selectedSportEvent.teams.home}</p>
                      </div>
                      <div className="text-2xl">🏠</div>
                    </div>
                  </div>
                  <div className="bg-surface-50 dark:bg-surface-700 rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-semibold text-surface-900 dark:text-white">Away Team</h4>
                        <p className="text-surface-600 dark:text-surface-300">{selectedSportEvent.teams.away}</p>
                      </div>
                      <div className="text-2xl">✈️</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Venue Details */}
              <div>
                <h3 className="text-xl font-bold text-surface-900 dark:text-white mb-4">Venue Details</h3>
                <div className="bg-surface-50 dark:bg-surface-700 rounded-lg p-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <div className="flex items-center text-surface-600 dark:text-surface-300 mb-2">
                        <ApperIcon name="MapPin" className="w-4 h-4 mr-2 text-primary-500" />
                        <span className="font-medium text-surface-900 dark:text-white">{selectedSportEvent.venue}</span>
                      </div>
                      <div className="flex items-center text-surface-600 dark:text-surface-300">
                        <ApperIcon name="Navigation" className="w-4 h-4 mr-2 text-primary-500" />
                        <span>{selectedSportEvent.location}</span>
                      </div>
                    </div>
                    <div>
                      <div className="flex items-center text-surface-600 dark:text-surface-300 mb-2">
                        <ApperIcon name="Users" className="w-4 h-4 mr-2 text-primary-500" />
                        <span>Capacity: 50,000+ seats</span>
                      </div>
                      <div className="flex items-center text-surface-600 dark:text-surface-300">
                        <ApperIcon name="Wifi" className="w-4 h-4 mr-2 text-primary-500" />
                        <span>Free WiFi Available</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Game Statistics */}
              <div>
                <h3 className="text-xl font-bold text-surface-900 dark:text-white mb-4">Season Statistics</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center bg-surface-50 dark:bg-surface-700 rounded-lg p-3">
                    <div className="text-2xl font-bold text-primary-600">{selectedSportEvent.teams.home.split(' ').length > 2 ? '12' : '8'}</div>
                    <div className="text-sm text-surface-600 dark:text-surface-300">Home Wins</div>
                  </div>
                  <div className="text-center bg-surface-50 dark:bg-surface-700 rounded-lg p-3">
                    <div className="text-2xl font-bold text-secondary-600">{selectedSportEvent.teams.away.split(' ').length > 2 ? '9' : '11'}</div>
                    <div className="text-sm text-surface-600 dark:text-surface-300">Away Wins</div>
                  </div>
                  <div className="text-center bg-surface-50 dark:bg-surface-700 rounded-lg p-3">
                    <div className="text-2xl font-bold text-accent">85%</div>
                    <div className="text-sm text-surface-600 dark:text-surface-300">Home Advantage</div>
                  </div>
                  <div className="text-center bg-surface-50 dark:bg-surface-700 rounded-lg p-3">
                    <div className="text-2xl font-bold text-yellow-600">4.2</div>
                    <div className="text-sm text-surface-600 dark:text-surface-300">Avg Rating</div>
                  </div>
                </div>
              </div>

              {/* Weather & Conditions (for outdoor sports) */}
              {(selectedSportEvent.sport === 'football' || selectedSportEvent.sport === 'baseball' || selectedSportEvent.sport === 'soccer') && (
                <div>
                  <h3 className="text-xl font-bold text-surface-900 dark:text-white mb-4">Game Day Conditions</h3>
                  <div className="bg-surface-50 dark:bg-surface-700 rounded-lg p-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="flex items-center">
                        <div className="text-2xl mr-3">☀️</div>
                        <div>
                          <div className="font-medium text-surface-900 dark:text-white">Weather</div>
                          <div className="text-surface-600 dark:text-surface-300">Partly Cloudy, 72°F</div>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <div className="text-2xl mr-3">💨</div>
                        <div>
                          <div className="font-medium text-surface-900 dark:text-white">Wind</div>
                          <div className="text-surface-600 dark:text-surface-300">5 mph NW</div>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <div className="text-2xl mr-3">💧</div>
                        <div>
                          <div className="font-medium text-surface-900 dark:text-white">Precipitation</div>
                          <div className="text-surface-600 dark:text-surface-300">0% chance</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Ticket Information */}
              <div>
                <h3 className="text-xl font-bold text-surface-900 dark:text-white mb-4">Ticket Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-surface-50 dark:bg-surface-700 rounded-lg p-4">
                    <div className="text-lg font-bold text-surface-900 dark:text-white mb-2">General Admission</div>
                    <div className="text-2xl font-bold text-primary-600 mb-2">{selectedSportEvent.price}</div>
                    <div className="text-sm text-surface-600 dark:text-surface-300">Upper level seating</div>
                  </div>
                  <div className="bg-surface-50 dark:bg-surface-700 rounded-lg p-4">
                    <div className="text-lg font-bold text-surface-900 dark:text-white mb-2">Premium</div>
                    <div className="text-2xl font-bold text-primary-600 mb-2">${Math.round(parseFloat(selectedSportEvent.price.replace('$', '')) * 1.5)}</div>
                    <div className="text-sm text-surface-600 dark:text-surface-300">Lower level, great views</div>
                  </div>
                  <div className="bg-surface-50 dark:bg-surface-700 rounded-lg p-4">
                    <div className="text-lg font-bold text-surface-900 dark:text-white mb-2">VIP</div>
                    <div className="text-2xl font-bold text-primary-600 mb-2">${Math.round(parseFloat(selectedSportEvent.price.replace('$', '')) * 2.5)}</div>
                    <div className="text-sm text-surface-600 dark:text-surface-300">Field level, premium access</div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4 pt-4 border-t border-surface-200 dark:border-surface-700">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleQuickBook(selectedSportEvent)}
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 text-white font-semibold rounded-lg transition-all duration-300 focus-ring"
                >
                  Book Tickets Now
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={closeDetailsModal}
                  className="px-6 py-3 border border-surface-300 dark:border-surface-600 text-surface-700 dark:text-surface-300 hover:bg-surface-100 dark:hover:bg-surface-700 rounded-lg transition-all duration-300 focus-ring"
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

export default Sports