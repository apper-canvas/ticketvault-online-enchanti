import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useParams, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import ApperIcon from './ApperIcon'

const MainFeature = () => {
  const { eventId } = useParams()
  const navigate = useNavigate()

  // Booking states
  const [selectedEvent, setSelectedEvent] = useState(null)
  const [selectedSeats, setSelectedSeats] = useState([])
  const [showPayment, setShowPayment] = useState(false)
  const [paymentData, setPaymentData] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    holderName: ''
  })
  const [currentStep, setCurrentStep] = useState('booking')
  const [bookingConfirmed, setBookingConfirmed] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)

  // Sample movies data (same as Movies page for consistency)
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

  // Function to get movie by ID
  const getMovieById = (movieId) => {
    const id = parseInt(movieId)
    return movies.find(movie => movie.id === id)
  }

  // Sample events data (same as Events page for consistency)
// Sample events data
  const events = [
    {
      id: 1,
      title: "Rock Legends Live",
      category: "Concert",
      location: "Madison Square Garden",
      date: "2024-03-15",
      time: "8:00 PM",
      price: 89,
      image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=300&fit=crop",
      totalSeats: 150,
      availableSeats: 47
    },
    {
      id: 2,
      title: "Broadway Show Night",
      category: "Theater",
location: "Richard Rodgers Theatre",
      date: "2024-03-22",
      time: "8:00 PM",
      price: 175,
      image: "https://images.unsplash.com/photo-1507676184212-d03ab07a01bf?w=400&h=300&fit=crop",
      totalSeats: 120,
      availableSeats: 8
    },
    {
      id: 3,
      title: "Comedy Night Live",
      category: "Comedy",
      location: "Comedy Cellar",
      date: "2024-03-20",
      time: "9:00 PM",
      price: 45,
      image: "https://images.unsplash.com/photo-1595147389795-37094173bfd8?w=400&h=300&fit=crop",
      totalSeats: 80,
      availableSeats: 23
    },
    {
      id: 4,
      title: "Jazz Festival Opening",
      category: "Concert",
      location: "Blue Note",
      date: "2024-03-25",
      time: "7:30 PM",
      price: 65,
      image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=300&fit=crop",
      totalSeats: 90,
      availableSeats: 34
    },
    {
      id: 5,
      title: "Tech Conference 2024",
      category: "Conference",
      location: "Jacob Javits Center",
      date: "2024-03-28",
      time: "9:00 AM",
      price: 120,
      image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400&h=300&fit=crop",
      totalSeats: 300,
      availableSeats: 156
    }
  ]

  // Additional state variables
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedLocation, setSelectedLocation] = useState('all')
  const [isBookingMode, setIsBookingMode] = useState(false)
  const [isPaymentMode, setIsPaymentMode] = useState(false)
  const [isProcessingPayment, setIsProcessingPayment] = useState(false)

  // Initialize payment data with proper structure
  const [paymentDataState, setPaymentDataState] = useState({
    paymentMethod: 'card',
    cardholderName: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    email: '',
    phone: '',
    billingAddress: {
      street: '',
      city: '',
      state: '',
      zipCode: ''
    }
  })

  // Update paymentData to use the state
  const paymentDataUpdated = paymentDataState

  // Generate seating chart data
  const generateSeats = (eventId) => {
    const rows = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H']
    const seatsPerRow = 12
    const seats = []
    
    rows.forEach((row, rowIndex) => {
      for (let seatNum = 1; seatNum <= seatsPerRow; seatNum++) {
        const isOccupied = Math.random() < 0.3 // 30% occupied
        const isPremium = rowIndex < 3 // First 3 rows are premium
        const basePrice = events.find(e => e.id === eventId)?.price || 50
        seats.push({
          id: `${row}${seatNum}`,
          row,
          number: seatNum,
          category: isPremium ? 'premium' : 'regular',
          price: isPremium ? basePrice * 1.5 : basePrice,
          isAvailable: !isOccupied,
          isSelected: false
        })
      }
    })
    return seats
  }
const [seats, setSeats] = useState([])

  // Initialize booking based on eventId
  useEffect(() => {
    if (eventId) {
      // Check if this is a movie booking
      if (eventId.startsWith('movie-')) {
        const movieId = eventId.replace('movie-', '')
        const movie = getMovieById(movieId)
        if (movie) {
          // Transform movie data to event format for booking system
          const transformedEvent = {
            id: movie.id,
            title: movie.title,
            date: new Date().toLocaleDateString('en-US', { 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            }),
            time: movie.showtimes[0], // Use first showtime
            location: movie.theater,
            category: movie.genre,
            price: parseFloat(movie.price.replace('$', '')),
            image: movie.image,
            description: movie.description,
            isMovie: true,
            totalSeats: 120,
            availableSeats: Math.floor(Math.random() * 50) + 20
          }
          setSelectedEvent(transformedEvent)
          setIsBookingMode(true)
        } else {
          toast.error('Movie not found')
          navigate('/movies')
        }
      } else {
        // Handle regular event booking
        const eventIdNum = parseInt(eventId)
        const event = events.find(e => e.id === eventIdNum)
        if (event) {
          setSelectedEvent(event)
          setIsBookingMode(true)
        } else {
          toast.error('Event not found')
          navigate('/events')
        }
      }
    }
  }, [eventId, navigate])

  useEffect(() => {
    if (selectedEvent) {
      setSeats(generateSeats(selectedEvent.id))
    }
  }, [selectedEvent])

  // Filter events
  const filteredEvents = events.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         event.location.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === 'all' || event.category === selectedCategory
    const matchesLocation = selectedLocation === 'all' || event.location.includes(selectedLocation)
    
    return matchesSearch && matchesCategory && matchesLocation
  })
const handleSeatClick = (seatId) => {
    setSeats(prevSeats => 
      prevSeats.map(seat => 
        seat.id === seatId && seat.isAvailable
          ? { ...seat, isSelected: !seat.isSelected }
          : seat
      )
    )
    
    const seat = seats.find(s => s.id === seatId)
    if (seat && seat.isAvailable) {
      if (seat.isSelected) {
        setSelectedSeats(prev => prev.filter(s => s !== seatId))
      } else {
        setSelectedSeats(prev => [...prev, seatId])
      }
    }
  }
const updatePaymentData = (field, value) => {
    if (field.includes('.')) {
      const [parent, child] = field.split('.')
      setPaymentDataState(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value
        }
      }))
    } else {
      setPaymentDataState(prev => ({
        ...prev,
        [field]: value
      }))
    }
  }

  const validatePaymentData = () => {
    if (paymentDataUpdated.paymentMethod === 'card') {
      if (!paymentDataUpdated.cardholderName.trim()) {
        toast.error('Please enter cardholder name')
        return false
      }
      if (!paymentDataUpdated.cardNumber.replace(/\s/g, '')) {
        toast.error('Please enter card number')
        return false
      }
      if (!paymentDataUpdated.expiryDate) {
        toast.error('Please enter expiry date')
        return false
      }
      if (!paymentDataUpdated.cvv) {
        toast.error('Please enter CVV')
        return false
      }
    }
    
    if (!paymentDataUpdated.email.trim()) {
      toast.error('Please enter email address')
      return false
    }
    if (!paymentDataUpdated.phone.trim()) {
      toast.error('Please enter phone number')
      return false
    }
    if (!paymentDataUpdated.billingAddress.street.trim()) {
      toast.error('Please enter street address')
return false
    }
    if (!paymentDataUpdated.billingAddress.city.trim()) {
      toast.error('Please enter city')
      return false
    }
    if (!paymentDataUpdated.billingAddress.state.trim()) {
      toast.error('Please enter state')
      return false
    }
    if (!paymentDataUpdated.billingAddress.zipCode.trim()) {
      toast.error('Please enter ZIP code')
      return false
    }
    
    return true
  }

  const handleBackToEvents = () => {
    if (selectedEvent?.isMovie) {
      navigate('/movies')
    } else {
      navigate('/events')
    }
  }
  const handlePayment = async () => {
    if (!validatePaymentData()) {
      return
    }

    setIsProcessingPayment(true)
    
    try {
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      const totalAmount = selectedSeats.reduce((total, seatId) => {
        const seat = seats.find(s => s.id === seatId)
        return total + (seat ? seat.price : 0)
      }, 0) + 7.49
      
      toast.success(`Payment successful! Total: $${totalAmount.toFixed(2)} for ${selectedSeats.length} seat(s)`)
      
      // Reset all states
setSelectedSeats([])
      setSelectedEvent(null)
      setIsBookingMode(false)
      setIsPaymentMode(false)
      setPaymentDataState({
        paymentMethod: 'card',
        cardholderName: '',
        cardNumber: '',
        expiryDate: '',
        cvv: '',
        email: '',
        phone: '',
        billingAddress: {
          street: '',
          city: '',
          state: '',
          zipCode: ''
        }
      })
      
    } catch (error) {
      toast.error('Payment failed. Please try again.')
    } finally {
setIsProcessingPayment(false)
    }
  }

  const handleBooking = () => {
    if (selectedSeats.length === 0) {
      toast.error('Please select at least one seat')
      return
    }
    
    setIsPaymentMode(true)
  }

  const handleInitialBooking = () => {
    if (selectedSeats.length === 0) {
      toast.error('Please select at least one seat')
      return
}
    
    const totalAmount = selectedSeats.reduce((total, seatId) => {
      const seat = seats.find(s => s.id === seatId)
      return total + (seat ? seat.price : 0)
    }, 0)
    
    toast.success(`Booking confirmed! Total: $${totalAmount.toFixed(2)} for ${selectedSeats.length} seat(s)`)
    setSelectedSeats([])
    setSelectedEvent(null)
    setIsBookingMode(false)
  }
  const categories = ['all', 'Concert', 'Theater', 'Sports', 'Comedy', 'Conference']
  const locations = ['all', 'Manhattan', 'Brooklyn', 'Queens']

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Search and Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="mb-8"
      >
        <div className="glass-card p-6 sm:p-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-surface-900 dark:text-white mb-6 text-center">
            Discover Amazing Events
          </h2>
          
          {/* Search Bar */}
          <div className="relative mb-6">
            <ApperIcon name="Search" className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-surface-400" />
            <input
              type="text"
              placeholder="Search events, venues, or artists..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-4 bg-white/50 dark:bg-surface-800/50 border border-surface-200 dark:border-surface-700 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-300 text-surface-900 dark:text-white placeholder-surface-500"
            />
          </div>

          {/* Filters */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Category Filter */}
            <div>
              <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">
                Category
              </label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-4 py-3 bg-white/50 dark:bg-surface-800/50 border border-surface-200 dark:border-surface-700 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-300 text-surface-900 dark:text-white"
              >
                {categories.map(category => (
                  <option key={category} value={category}>
                    {category === 'all' ? 'All Categories' : category}
                  </option>
                ))}
              </select>
            </div>

            {/* Location Filter */}
            <div>
              <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">
                Location
              </label>
              <select
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
                className="w-full px-4 py-3 bg-white/50 dark:bg-surface-800/50 border border-surface-200 dark:border-surface-700 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-300 text-surface-900 dark:text-white"
              >
                {locations.map(location => (
                  <option key={location} value={location}>
                    {location === 'all' ? 'All Locations' : location}
                  </option>
                ))}
              </select>
            </div>

            {/* Quick Actions */}
            <div className="flex items-end">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  setSearchQuery('')
                  setSelectedCategory('all')
                  setSelectedLocation('all')
                }}
                className="w-full px-4 py-3 bg-surface-100 dark:bg-surface-700 hover:bg-surface-200 dark:hover:bg-surface-600 text-surface-700 dark:text-surface-300 font-medium rounded-xl transition-all duration-300 focus-ring"
              >
                Clear Filters
</motion.button>
            </div>
          </div>
        </div>
      </motion.div>

{/* Event Booking Interface */}
      <AnimatePresence mode="wait">
        {!isBookingMode ? (
          <motion.div
            key="events-grid"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
          >
{filteredEvents.map((event, index) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="glass-card overflow-hidden group cursor-pointer hover:shadow-neon transition-all duration-300"
                onClick={() => {
                  setSelectedEvent(event)
                  setIsBookingMode(true)
                }}
              >
                <div className="relative">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={(e) => {
                      e.stopPropagation()
                      handleBackToEvents()
                    }}
                    className="absolute top-4 left-4 z-10 flex items-center space-x-2 px-3 py-2 bg-white/90 dark:bg-surface-800/90 backdrop-blur-sm border border-surface-300 dark:border-surface-600 text-surface-700 dark:text-surface-300 hover:bg-surface-100 dark:hover:bg-surface-700 rounded-lg transition-all duration-300 focus-ring"
                  >
                    <ApperIcon name="ArrowLeft" className="w-4 h-4" />
                    <span className="text-sm">Back</span>
                  </motion.button>
                </div>
                {/* Event Image */}
                <div className="relative h-48 sm:h-56 overflow-hidden">
                  <img
                    src={event.image}
                    alt={event.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-primary-500 text-white text-xs font-semibold rounded-full">
                      {event.category}
                    </span>
                  </div>
                  <div className="absolute top-4 right-4">
                    <span className="px-3 py-1 bg-surface-900/70 text-white text-xs font-semibold rounded-full">
                      ${event.price}
                    </span>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-surface-900/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>

                {/* Event Details */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-surface-900 dark:text-white mb-2 group-hover:text-primary-600 transition-colors">
                    {event.title}
                  </h3>
                  
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center text-surface-600 dark:text-surface-400">
                      <ApperIcon name="MapPin" className="w-4 h-4 mr-2 text-primary-500" />
                      <span className="text-sm">{event.location}</span>
                    </div>
                    <div className="flex items-center text-surface-600 dark:text-surface-400">
                      <ApperIcon name="Calendar" className="w-4 h-4 mr-2 text-primary-500" />
                      <span className="text-sm">{event.date} at {event.time}</span>
                    </div>
                  </div>

                  {/* Availability */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className={`w-3 h-3 rounded-full mr-2 ${
                        event.availableSeats > 20 ? 'bg-accent' : 
                        event.availableSeats > 5 ? 'bg-yellow-500' : 'bg-red-500'
                      }`}></div>
                      <span className="text-sm text-surface-600 dark:text-surface-400">
                        {event.availableSeats} seats left
                      </span>
                    </div>
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      className="flex items-center text-primary-600 font-medium"
                    >
                      <span className="text-sm mr-1">Book Now</span>
                      <ApperIcon name="ArrowRight" className="w-4 h-4" />
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        ) : !isPaymentMode ? (
          /* Seat Selection Interface */
          <motion.div
            key="seat-selection"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.5 }}
            className="glass-card p-6 sm:p-8"
          >
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
              <div>
                <h3 className="text-2xl sm:text-3xl font-bold text-surface-900 dark:text-white mb-2">
                  {selectedEvent?.title}
                </h3>
                <div className="flex flex-wrap gap-4 text-surface-600 dark:text-surface-400">
                  <div className="flex items-center">
                    <ApperIcon name="MapPin" className="w-4 h-4 mr-1" />
                    <span className="text-sm">{selectedEvent?.location}</span>
                  </div>
                  <div className="flex items-center">
                    <ApperIcon name="Calendar" className="w-4 h-4 mr-1" />
                    <span className="text-sm">{selectedEvent?.date} at {selectedEvent?.time}</span>
                  </div>
                </div>
</div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleBackToEvents}
                className="mt-4 sm:mt-0 px-4 py-2 bg-surface-100 dark:bg-surface-700 hover:bg-surface-200 dark:hover:bg-surface-600 text-surface-700 dark:text-surface-300 rounded-xl transition-colors focus-ring"
              >
                {selectedEvent?.isMovie ? 'Back to Movies' : 'Back to Events'}
              </motion.button>
            </div>

            {/* Seat Legend */}
            <div className="flex flex-wrap gap-6 mb-8 p-4 bg-surface-50 dark:bg-surface-800/50 rounded-xl">
              <div className="flex items-center">
                <div className="seat-available mr-2"></div>
                <span className="text-sm text-surface-600 dark:text-surface-400">Available</span>
              </div>
              <div className="flex items-center">
                <div className="seat-selected mr-2"></div>
                <span className="text-sm text-surface-600 dark:text-surface-400">Selected</span>
              </div>
              <div className="flex items-center">
                <div className="seat-occupied mr-2"></div>
                <span className="text-sm text-surface-600 dark:text-surface-400">Occupied</span>
              </div>
              <div className="flex items-center">
                <div className="premium-seat-available mr-2"></div>
                <span className="text-sm text-surface-600 dark:text-surface-400">Premium</span>
              </div>
            </div>

            {/* Stage */}
            <div className="text-center mb-8">
              <div className="inline-block px-8 py-3 bg-gradient-to-r from-primary-500 to-secondary-500 text-white font-semibold rounded-2xl shadow-soft">
                🎭 STAGE 🎭
              </div>
            </div>

            {/* Seating Chart */}
            <div className="grid gap-3 mb-8 max-w-4xl mx-auto">
              {['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'].map(row => (
                <div key={row} className="flex items-center justify-center gap-1 sm:gap-2">
                  <div className="w-8 flex items-center justify-center">
                    <span className="text-sm font-semibold text-surface-600 dark:text-surface-400">
                      {row}
                    </span>
                  </div>
                  <div className="flex gap-1">
                    {Array.from({ length: 12 }, (_, i) => {
                      const seatId = `${row}${i + 1}`
                      const seat = seats.find(s => s.id === seatId)
                      if (!seat) return null

                      const seatClass = seat.category === 'premium'
                        ? seat.isSelected
                          ? 'premium-seat-selected'
                          : seat.isAvailable
                          ? 'premium-seat-available'
                          : 'seat-occupied'
                        : seat.isSelected
                        ? 'seat-selected'
                        : seat.isAvailable
                        ? 'seat-available'
                        : 'seat-occupied'

                      return (
                        <motion.div
                          key={seatId}
                          whileHover={seat.isAvailable ? { scale: 1.1 } : {}}
                          whileTap={seat.isAvailable ? { scale: 0.9 } : {}}
                          className={seatClass}
                          onClick={() => handleSeatClick(seatId)}
                          title={`Seat ${seatId} - $${seat.price} ${seat.category === 'premium' ? '(Premium)' : ''}`}
                        >
                          {i + 1}
                        </motion.div>
                      )
                    })}
                  </div>
                  <div className="w-8 flex items-center justify-center">
                    <span className="text-sm font-semibold text-surface-600 dark:text-surface-400">
                      {row}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Booking Summary */}
            {selectedSeats.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-gradient-to-r from-primary-50 to-secondary-50 dark:from-primary-900/20 dark:to-secondary-900/20 p-6 rounded-xl border border-primary-200 dark:border-primary-800"
              >
                <h4 className="text-lg font-semibold text-surface-900 dark:text-white mb-4">
                  Booking Summary
                </h4>
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-surface-700 dark:text-surface-300">
                    <span>Selected Seats:</span>
                    <span className="font-medium">{selectedSeats.join(', ')}</span>
                  </div>
                  <div className="flex justify-between text-surface-700 dark:text-surface-300">
                    <span>Number of Tickets:</span>
                    <span className="font-medium">{selectedSeats.length}</span>
                  </div>
                  <div className="flex justify-between text-lg font-semibold text-surface-900 dark:text-white border-t border-surface-200 dark:border-surface-700 pt-2">
                    <span>Total Amount:</span>
                    <span>
                      ${selectedSeats.reduce((total, seatId) => {
                        const seat = seats.find(s => s.id === seatId)
return total + (seat ? seat.price : 0)
                      }, 0).toFixed(2)}
                    </span>
                  </div>
                </div>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleBooking}
                  className="w-full px-6 py-4 bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 text-white font-semibold rounded-xl shadow-soft transition-all duration-300 hover:shadow-neon focus-ring"
                >
                  Proceed to Payment
                </motion.button>
              </motion.div>
            )}
          </motion.div>
        ) : (
          /* Payment Interface */
          <motion.div
            key="payment-form"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.5 }}
            className="glass-card p-6 sm:p-8"
          >
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
              <div>
                <h3 className="text-2xl sm:text-3xl font-bold text-surface-900 dark:text-white mb-2">
                  Complete Your Payment
                </h3>
                <div className="flex flex-wrap gap-4 text-surface-600 dark:text-surface-400">
                  <div className="flex items-center">
                    <span className="text-sm">{selectedEvent?.title}</span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-sm">Seats: {selectedSeats.join(', ')}</span>
                  </div>
                </div>
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsPaymentMode(false)}
                className="mt-4 sm:mt-0 px-4 py-2 bg-surface-100 dark:bg-surface-700 hover:bg-surface-200 dark:hover:bg-surface-600 text-surface-700 dark:text-surface-300 rounded-xl transition-colors focus-ring"
              >
                Back to Seats
              </motion.button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Payment Form */}
              <div className="lg:col-span-2 space-y-6">
                {/* Payment Method Selection */}
                <div>
                  <h4 className="text-lg font-semibold text-surface-900 dark:text-white mb-4">Payment Method</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {[
                      { id: 'card', label: 'Credit Card', icon: '💳' },
                      { id: 'paypal', label: 'PayPal', icon: '🅿️' },
{ id: 'apple', label: 'Apple Pay', icon: '🍎' }
                    ].map(method => (
                      <motion.button
                        key={method.id}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => updatePaymentData('paymentMethod', method.id)}
                        className={`p-4 border-2 rounded-xl transition-all duration-300 ${
                          paymentDataUpdated.paymentMethod === method.id
                            ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20'
                            : 'border-surface-200 dark:border-surface-700 hover:border-primary-300'
                        }`}
                      >
                        <div className="text-2xl mb-2">{method.icon}</div>
                        <div className="text-sm font-medium text-surface-900 dark:text-white">{method.label}</div>
                      </motion.button>
                    ))}
                  </div>
                </div>

{/* Credit Card Form */}
                {paymentDataUpdated.paymentMethod === 'card' && (
                  <div className="space-y-4">
                    <h4 className="text-lg font-semibold text-surface-900 dark:text-white">Card Information</h4>
                    
                    <div>
                      <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">
                        Cardholder Name *
                      </label>
                      <input
                        type="text"
                        value={paymentDataUpdated.cardholderName}
                        onChange={(e) => updatePaymentData('cardholderName', e.target.value)}
                        className="w-full px-4 py-3 bg-white/50 dark:bg-surface-800/50 border border-surface-200 dark:border-surface-700 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-300"
                        placeholder="John Doe"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">
                        Card Number *
                      </label>
<input
                        type="text"
                        value={paymentDataUpdated.cardNumber}
                        onChange={(e) => updatePaymentData('cardNumber', e.target.value.replace(/\D/g, '').replace(/(\d{4})(?=\d)/g, '$1 '))}
                        className="w-full px-4 py-3 bg-white/50 dark:bg-surface-800/50 border border-surface-200 dark:border-surface-700 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-300"
                        placeholder="1234 5678 9012 3456"
                        maxLength="19"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">
                          Expiry Date *
                        </label>
                        <input
                          type="text"
                          value={paymentDataUpdated.expiryDate}
                          onChange={(e) => updatePaymentData('expiryDate', e.target.value.replace(/\D/g, '').replace(/(\d{2})(?=\d)/, '$1/'))}
                          className="w-full px-4 py-3 bg-white/50 dark:bg-surface-800/50 border border-surface-200 dark:border-surface-700 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-300"
                          placeholder="MM/YY"
                          maxLength="5"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">
                          CVV *
                        </label>
                        <input
                          type="text"
                          value={paymentDataUpdated.cvv}
                          onChange={(e) => updatePaymentData('cvv', e.target.value.replace(/\D/g, ''))}
                          className="w-full px-4 py-3 bg-white/50 dark:bg-surface-800/50 border border-surface-200 dark:border-surface-700 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-300"
                          placeholder="123"
                          maxLength="4"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* Contact Information */}
                <div className="space-y-4">
                  <h4 className="text-lg font-semibold text-surface-900 dark:text-white">Contact Information</h4>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">
                        Email Address *
                      </label>
<input
                        type="email"
                        value={paymentDataUpdated.email}
                        onChange={(e) => updatePaymentData('email', e.target.value)}
                        className="w-full px-4 py-3 bg-white/50 dark:bg-surface-800/50 border border-surface-200 dark:border-surface-700 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-300"
                        placeholder="john@example.com"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        value={paymentDataUpdated.phone}
                        onChange={(e) => updatePaymentData('phone', e.target.value)}
                        className="w-full px-4 py-3 bg-white/50 dark:bg-surface-800/50 border border-surface-200 dark:border-surface-700 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-300"
                        placeholder="+1 (555) 123-4567"
                      />
                    </div>
                  </div>
                </div>

                {/* Billing Address */}
                <div className="space-y-4">
                  <h4 className="text-lg font-semibold text-surface-900 dark:text-white">Billing Address</h4>
                  
                  <div>
                    <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">
                      Street Address *
                    </label>
<input
                      type="text"
                      value={paymentDataUpdated.billingAddress.street}
                      onChange={(e) => updatePaymentData('billingAddress.street', e.target.value)}
                      className="w-full px-4 py-3 bg-white/50 dark:bg-surface-800/50 border border-surface-200 dark:border-surface-700 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-300"
                      placeholder="123 Main Street"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">
                        City *
                      </label>
                      <input
                        type="text"
                        value={paymentDataUpdated.billingAddress.city}
                        onChange={(e) => updatePaymentData('billingAddress.city', e.target.value)}
                        className="w-full px-4 py-3 bg-white/50 dark:bg-surface-800/50 border border-surface-200 dark:border-surface-700 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-300"
                        placeholder="New York"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">
                        State *
                      </label>
                      <input
                        type="text"
                        value={paymentDataUpdated.billingAddress.state}
                        onChange={(e) => updatePaymentData('billingAddress.state', e.target.value)}
                        className="w-full px-4 py-3 bg-white/50 dark:bg-surface-800/50 border border-surface-200 dark:border-surface-700 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-300"
                        placeholder="NY"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">
                        ZIP Code *
                      </label>
                      <input
                        type="text"
                        value={paymentDataUpdated.billingAddress.zipCode}
                        onChange={(e) => updatePaymentData('billingAddress.zipCode', e.target.value)}
                        className="w-full px-4 py-3 bg-white/50 dark:bg-surface-800/50 border border-surface-200 dark:border-surface-700 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-300"
                        placeholder="10001"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Order Summary */}
              <div className="lg:col-span-1">
                <div className="sticky top-6">
                  <div className="bg-gradient-to-br from-primary-50 to-secondary-50 dark:from-primary-900/20 dark:to-secondary-900/20 p-6 rounded-xl border border-primary-200 dark:border-primary-800">
                    <h4 className="text-lg font-semibold text-surface-900 dark:text-white mb-4">Order Summary</h4>
                    
                    <div className="space-y-3 mb-4">
                      <div className="flex justify-between text-surface-700 dark:text-surface-300">
                        <span>Event:</span>
                        <span className="font-medium text-right ml-2">{selectedEvent?.title}</span>
                      </div>
                      <div className="flex justify-between text-surface-700 dark:text-surface-300">
                        <span>Date:</span>
                        <span className="font-medium">{selectedEvent?.date}</span>
                      </div>
                      <div className="flex justify-between text-surface-700 dark:text-surface-300">
                        <span>Seats:</span>
                        <span className="font-medium">{selectedSeats.join(', ')}</span>
                      </div>
                      <div className="flex justify-between text-surface-700 dark:text-surface-300">
                        <span>Tickets:</span>
                        <span className="font-medium">{selectedSeats.length}x</span>
                      </div>
                      
                      <div className="border-t border-surface-200 dark:border-surface-700 pt-3">
                        <div className="flex justify-between text-surface-700 dark:text-surface-300 mb-2">
                          <span>Subtotal:</span>
                          <span className="font-medium">
                            ${selectedSeats.reduce((total, seatId) => {
                              const seat = seats.find(s => s.id === seatId)
                              return total + (seat ? seat.price : 0)
                            }, 0).toFixed(2)}
                          </span>
                        </div>
                        <div className="flex justify-between text-surface-700 dark:text-surface-300 mb-2">
                          <span>Service Fee:</span>
                          <span className="font-medium">$4.99</span>
                        </div>
                        <div className="flex justify-between text-surface-700 dark:text-surface-300 mb-3">
                          <span>Processing Fee:</span>
                          <span className="font-medium">$2.50</span>
                        </div>
                        <div className="flex justify-between text-lg font-bold text-surface-900 dark:text-white border-t border-surface-200 dark:border-surface-700 pt-3">
                          <span>Total:</span>
                          <span>
                            ${(selectedSeats.reduce((total, seatId) => {
                              const seat = seats.find(s => s.id === seatId)
                              return total + (seat ? seat.price : 0)
                            }, 0) + 7.49).toFixed(2)}
                          </span>
                        </div>
                      </div>
                    </div>

                    <motion.button
                      whileHover={{ scale: isProcessingPayment ? 1 : 1.02 }}
                      whileTap={{ scale: isProcessingPayment ? 1 : 0.98 }}
                      onClick={handlePayment}
                      disabled={isProcessingPayment}
                      className={`w-full px-6 py-4 bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 text-white font-semibold rounded-xl shadow-soft transition-all duration-300 hover:shadow-neon focus-ring ${
                        isProcessingPayment ? 'opacity-75 cursor-not-allowed' : ''
                      }`}
                    >
                      {isProcessingPayment ? (
                        <div className="flex items-center justify-center">
                          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                          Processing Payment...
                        </div>
                      ) : (
                        'Complete Payment'
                      )}
                    </motion.button>

<div className="mt-4 text-xs text-surface-500 dark:text-surface-400 text-center">
                      🔒 Your payment information is secure and encrypted
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
export default MainFeature