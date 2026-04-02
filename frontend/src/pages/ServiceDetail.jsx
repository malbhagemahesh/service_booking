import { useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { Button } from '../components/Button.jsx'
import { Star, MapPin, DollarSign, Phone, Clock, User } from 'lucide-react'
import { Modal } from '../components/Modal.jsx'
import { useState } from 'react'
import { useAuth } from '../context/AuthContext.jsx'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { format } from 'date-fns'

const api = axios.create({ baseURL: '/api' })

export default function ServiceDetail() {
  const { id } = useParams()
  const { user } = useAuth()
  const [showBookingModal, setShowBookingModal] = useState(false)
  const [selectedDate, setSelectedDate] = useState(new Date())

  const { data: service, isLoading } = useQuery({
    queryKey: ['service', id],
    queryFn: () => api.get(`/services/${id}`).then(res => res.data),
  })

  const handleBook = async () => {
    if (!user) {
      // Redirect to login
      window.location.href = '/login'
      return
    }
    setShowBookingModal(true)
  }

  const confirmBooking = async () => {
    try {
      await api.post('/bookings', {
        service_id: id,
        date_time: selectedDate.toISOString()
      })
      alert('Booking created!')
      setShowBookingModal(false)
    } catch (error) {
      alert('Booking failed')
    }
  }

  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>
  }

  if (!service) {
    return <div className="min-h-screen flex items-center justify-center">Service not found</div>
  }

  const ratingStars = Array(5).fill().map((_, i) => (
    <Star key={i} className={i < 4 ? "fill-yellow-400 text-yellow-400" : "text-gray-300"} />
  ))

  return (
    <div className="max-w-6xl mx-auto p-8 space-y-12">
      <div className="grid lg:grid-cols-2 gap-12 items-start">
        <div>
          <div className="bg-gradient-to-r from-primary/10 to-blue-500/10 p-8 rounded-3xl">
            <h1 className="text-4xl font-bold mb-6">{service.title}</h1>
            <div className="flex items-center gap-2 mb-6">
              {ratingStars}
              <span className="ml-2 font-semibold">(4.8)</span>
            </div>
            <div className="space-y-4 mb-8">
              <div className="flex items-center gap-2">
                <DollarSign className="w-5 h-5 text-green-500" />
                <span className="text-2xl font-bold">${service.price}/hour</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Clock className="w-5 h-5" />
                <span>2-3 hours typical</span>
              </div>
            </div>
            <Button onClick={handleBook} className="w-full text-lg py-6 shadow-xl hover:shadow-2xl">
              Book Now
            </Button>
          </div>
        </div>

        <div className="space-y-6">
          <section>
            <h3 className="text-2xl font-bold mb-4">Description</h3>
            <p className="text-lg leading-relaxed">{service.description}</p>
          </section>

          <section>
            <h3 className="text-2xl font-bold mb-4">Provider</h3>
            <div className="flex items-center gap-4 p-6 bg-card rounded-2xl">
              <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center">
                <User className="w-8 h-8 text-primary" />
              </div>
              <div>
                <h4 className="font-bold text-xl">John Doe</h4>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <MapPin className="w-4 h-4" />
                  <span>Your City</span>
                </div>
                <Button variant="ghost" size="sm" className="mt-2">
                  <Phone className="w-4 h-4 mr-1" />
                  Call Provider
                </Button>
              </div>
            </div>
          </section>
        </div>
      </div>

      <Modal isOpen={showBookingModal} onClose={() => setShowBookingModal(false)} title="Book Service">
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-3">Select Date & Time</label>
            <DatePicker
              selected={selectedDate}
              onChange={setSelectedDate}
              showTimeSelect
              dateFormat="Pp"
              className="w-full p-4 border rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent"
              minDate={new Date()}
            />
          </div>
          <div className="grid grid-cols-2 gap-4 pt-4">
            <Button variant="ghost" onClick={() => setShowBookingModal(false)}>
              Cancel
            </Button>
            <Button onClick={confirmBooking} className="bg-green-500 hover:bg-green-600">
              Confirm Booking (${service.price})
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  )
}

