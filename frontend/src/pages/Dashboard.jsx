import { useAuth } from '../context/AuthContext.jsx'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { Button } from '../components/Button.jsx'
import { CalendarDays, UserCheck } from 'lucide-react'
import { cn } from '../lib/utils.js'

const api = axios.create({ baseURL: '/api' })

export default function Dashboard() {
  const { user } = useAuth()

  const { data: bookings = [] } = useQuery({
    queryKey: ['my-bookings'],
    queryFn: () => api.get('/bookings/my').then(res => res.data),
    placeholderData: [
      {
        id: '1',
        service_id: '1',
        date_time: new Date().toISOString(),
        status: 'pending'
      }
    ]
  })

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground mt-1">Welcome back, {user?.username}</p>
        </div>
        <div className="flex gap-3">
          <Button variant="success">
            <UserCheck className="w-4 h-4 mr-2" />
            Profile
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-card p-8 rounded-3xl border">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <CalendarDays className="w-8 h-8 text-primary" />
            Upcoming Bookings
          </h2>
          <div className="space-y-4">
            {bookings.map((booking) => (
              <div key={booking.id} className="flex justify-between items-center p-4 bg-accent rounded-2xl">
                <div>
                  <p className="font-semibold">Service #{booking.id.slice(-4)}</p>
                  <p className="text-sm text-muted-foreground">{new Date(booking.date_time).toLocaleString()}</p>
                  <span className={cn('inline-block px-3 py-1 rounded-full text-xs font-medium mt-1',
                    booking.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                    booking.status === 'confirmed' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                  )}>
                    {booking.status}
                  </span>
                </div>
                <Button size="sm" variant="ghost">Cancel</Button>
              </div>
            ))}
            {bookings.length === 0 && (
              <p className="text-center text-muted-foreground py-12">No upcoming bookings</p>
            )}
          </div>
        </div>

        <div className="bg-gradient-to-br from-primary/5 to-blue-500/5 p-8 rounded-3xl border">
          <h2 className="text-2xl font-bold mb-6">Quick Stats</h2>
          <div className="grid grid-cols-2 gap-6">
            <div className="text-center p-6 bg-white/50 rounded-2xl backdrop-blur-sm">
              <div className="text-3xl font-bold text-primary">0</div>
              <div className="text-sm text-muted-foreground uppercase tracking-wide">Bookings</div>
            </div>
            <div className="text-center p-6 bg-white/50 rounded-2xl backdrop-blur-sm">
              <div className="text-3xl font-bold text-primary">$0</div>
              <div className="text-sm text-muted-foreground uppercase tracking-wide">Spent</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

