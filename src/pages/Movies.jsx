import { useState } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import ApperIcon from '../components/ApperIcon'

const Movies = () => {
  const navigate = useNavigate()
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedGenre, setSelectedGenre] = useState('all')

  const genres = ['all', 'action', 'comedy', 'drama', 'horror', 'sci-fi', 'romance']

  const movies = [
    {
      id: 1,
      title: "Guardians of the Galaxy Vol. 3",
      genre: "action",
      rating: "PG-13",
      duration: "2h 30m",
      theater: "AMC Empire 25",
      showtimes: ["2:00 PM", "5:30 PM", "9:00 PM"],
      price: "$15.99",
      image: "https://images.unsplash.com/photo-1489599316546-1cf6b2da2c95?w=400&h=600&fit=crop",
      description: "The legendary Star-Lord and his team embark on their final adventure."
    },
    {
      id: 2,
      title: "The Little Mermaid",
      genre: "romance",
      rating: "PG",
      duration: "2h 15m",
      theater: "Regal Cinemas",
      showtimes: ["1:30 PM", "4:45 PM", "8:15 PM"],
      price: "$14.99",
      image: "https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=400&h=600&fit=crop",
      description: "A young mermaid makes a deal with a sea witch to walk on land."
    },
    {
      id: 3,
      title: "Scream VI",
      genre: "horror",
      rating: "R",
      duration: "2h 3m",
      theater: "Cinemark XD",
      showtimes: ["3:15 PM", "6:45 PM", "10:30 PM"],
      price: "$16.99",
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=600&fit=crop",
      description: "The Ghostface killer returns to terrorize a new generation."
    },
    {
      id: 4,
      title: "John Wick: Chapter 4",
      genre: "action",
      rating: "R",
      duration: "2h 49m",
      theater: "IMAX Theater",
      showtimes: ["1:00 PM", "5:00 PM", "9:30 PM"],
      price: "$19.99",
      image: "https://images.unsplash.com/photo-1606041008023-472dfb5e530f?w=400&h=600&fit=crop",
      description: "John Wick faces his most deadly adversaries yet."
    },
    {
      id: 5,
      title: "Spider-Man: Across the Spider-Verse",
      genre: "action",
      rating: "PG",
      duration: "2h 20m",
      theater: "Dolby Cinema",
      showtimes: ["2:30 PM", "6:00 PM", "9:45 PM"],
      price: "$17.99",
      image: "https://images.unsplash.com/photo-1635805737707-575885ab0820?w=400&h=600&fit=crop",
      description: "Miles Morales journeys across the multiverse."
    },
    {
      id: 6,
      title: "The Super Mario Bros. Movie",
      genre: "comedy",
      rating: "PG",
      duration: "1h 32m",
      theater: "AMC Theater",
      showtimes: ["12:00 PM", "3:30 PM", "7:00 PM"],
      price: "$13.99",
      image: "https://images.unsplash.com/photo-1604659989175-ef2d01a0fdc6?w=400&h=600&fit=crop",
      description: "Mario and Luigi embark on a magical adventure."
    }
  ]

  const filteredMovies = movies.filter(movie => {
    const matchesSearch = movie.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         movie.theater.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesGenre = selectedGenre === 'all' || movie.genre === selectedGenre
    return matchesSearch && matchesGenre
  })

  const handleBookNow = (movie) => {
    toast.success(`Booking initiated for ${movie.title}!`)
  }

  const handleViewDetails = (movie) => {
    toast.info(`Viewing details for ${movie.title}`)
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
                <p className="text-xs text-surface-600 dark:text-surface-400 hidden sm:block">Movies</p>
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
            Movie Tickets
          </h1>
          <p className="text-lg text-surface-600 dark:text-surface-300 max-w-2xl mx-auto">
            Discover the latest movies, check showtimes, and book your perfect seats
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
                  placeholder="Search movies or theaters..."
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

        {/* Movies Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {filteredMovies.map((movie, index) => (
            <motion.div
              key={movie.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -10, scale: 1.02 }}
              className="glass-card overflow-hidden group cursor-pointer"
            >
              <div className="relative h-80 overflow-hidden">
                <img
                  src={movie.image}
                  alt={movie.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-surface-900/80 via-transparent to-transparent" />
                <div className="absolute top-4 right-4">
                  <span className="px-3 py-1 bg-primary-500 text-white text-sm font-medium rounded-full">
                    {movie.rating}
                  </span>
                </div>
              </div>

              <div className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-xl font-bold text-surface-900 dark:text-white group-hover:text-primary-600 transition-colors">
                    {movie.title}
                  </h3>
                  <span className="text-xl font-bold text-primary-600">
                    {movie.price}
                  </span>
                </div>

                <p className="text-surface-600 dark:text-surface-300 mb-4 text-sm">
                  {movie.description}
                </p>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-sm text-surface-600 dark:text-surface-300">
                    <ApperIcon name="Clock" className="w-4 h-4 mr-2" />
                    {movie.duration}
                  </div>
                  <div className="flex items-center text-sm text-surface-600 dark:text-surface-300">
                    <ApperIcon name="MapPin" className="w-4 h-4 mr-2" />
                    {movie.theater}
                  </div>
                  <div className="flex items-center text-sm text-surface-600 dark:text-surface-300">
                    <ApperIcon name="Tag" className="w-4 h-4 mr-2" />
                    {movie.genre.charAt(0).toUpperCase() + movie.genre.slice(1)}
                  </div>
                </div>

                <div className="mb-4">
                  <p className="text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">Showtimes:</p>
                  <div className="flex flex-wrap gap-2">
                    {movie.showtimes.map((time, idx) => (
                      <span key={idx} className="px-2 py-1 bg-surface-100 dark:bg-surface-700 text-surface-700 dark:text-surface-300 text-xs rounded-lg">
                        {time}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex gap-3">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleBookNow(movie)}
                    className="flex-1 px-4 py-2 bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 text-white font-semibold rounded-lg transition-all duration-300 focus-ring text-sm"
                  >
                    Book Now
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleViewDetails(movie)}
                    className="px-4 py-2 border border-surface-300 dark:border-surface-600 text-surface-700 dark:text-surface-300 hover:bg-surface-100 dark:hover:bg-surface-700 rounded-lg transition-all duration-300 focus-ring text-sm"
                  >
                    Details
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {filteredMovies.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <ApperIcon name="Film" className="w-16 h-16 text-surface-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-surface-600 dark:text-surface-300 mb-2">
              No movies found
            </h3>
            <p className="text-surface-500 dark:text-surface-400">
              Try adjusting your search terms or filters
            </p>
          </motion.div>
        )}
      </div>
    </div>
  )
}

export default Movies