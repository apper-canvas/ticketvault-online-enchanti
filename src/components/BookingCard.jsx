import { motion } from 'framer-motion'
import ApperIcon from './ApperIcon'

const BookingCard = ({ booking }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'confirmed':
        return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
      case 'cancelled':
        return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
      case 'completed':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400'
      default:
        return 'bg-surface-100 text-surface-800 dark:bg-surface-700 dark:text-surface-300'
    }
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -2 }}
      className="bg-white/60 dark:bg-surface-800/60 backdrop-blur-sm rounded-2xl p-6 border border-surface-200/50 dark:border-surface-700/50 shadow-soft hover:shadow-card transition-all duration-300"
    >
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Event Image */}
        <div className="lg:w-48 lg:h-32 w-full h-48 rounded-xl overflow-hidden bg-surface-200 dark:bg-surface-700">
          <img 
            src={booking.image} 
            alt={booking.eventName}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Booking Details */}
        <div className="flex-1 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
            <div>
              <h3 className="text-lg font-semibold text-surface-900 dark:text-white">
                {booking.eventName}
              </h3>
              <div className="flex items-center space-x-2 text-surface-600 dark:text-surface-400">
                <ApperIcon name="MapPin" className="w-4 h-4" />
                <span className="text-sm">{booking.venue}</span>
              </div>
            </div>
            <span className={`px-3 py-1 rounded-full text-xs font-medium capitalize ${getStatusColor(booking.status)}`}>
              {booking.status}
            </span>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
            <div className="flex items-center space-x-2">
              <ApperIcon name="Calendar" className="w-4 h-4 text-primary-600" />
              <div>
                <p className="text-surface-600 dark:text-surface-400">Date</p>
                <p className="font-medium text-surface-900 dark:text-white">
                  {formatDate(booking.date)}
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <ApperIcon name="Clock" className="w-4 h-4 text-primary-600" />
              <div>
                <p className="text-surface-600 dark:text-surface-400">Time</p>
                <p className="font-medium text-surface-900 dark:text-white">
                  {booking.time}
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <ApperIcon name="Armchair" className="w-4 h-4 text-primary-600" />
              <div>
                <p className="text-surface-600 dark:text-surface-400">Seats</p>
                <p className="font-medium text-surface-900 dark:text-white">
                  {booking.seats.join(', ')}
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <ApperIcon name="DollarSign" className="w-4 h-4 text-primary-600" />
              <div>
                <p className="text-surface-600 dark:text-surface-400">Total</p>
                <p className="font-medium text-surface-900 dark:text-white">
                  ${booking.totalAmount}
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pt-2 border-t border-surface-200 dark:border-surface-700">
            <div className="text-xs text-surface-500 dark:text-surface-400">
              <span>Booking ID: {booking.id}</span>
              <span className="mx-2">•</span>
              <span>Booked on {formatDate(booking.bookingDate)}</span>
            </div>
            
            <div className="flex space-x-2">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white text-sm font-medium rounded-lg transition-colors"
              >
                View Details
              </motion.button>
              {booking.status === 'confirmed' && (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-4 py-2 bg-surface-200 dark:bg-surface-700 hover:bg-surface-300 dark:hover:bg-surface-600 text-surface-900 dark:text-white text-sm font-medium rounded-lg transition-colors"
                >
                  Download Ticket
                </motion.button>
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default BookingCard