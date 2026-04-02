import { Star, MapPin, DollarSign, Calendar, User } from 'lucide-react'
import { Link } from 'react-router-dom'
import { cn } from '../lib/utils.js'

export function ServiceCard({ service }) {
  const ratingStars = Array(5).fill().map((_, i) => (
    <Star key={i} className={cn("w-4 h-4", i < Math.floor(service.rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300")} />
  ))

  return (
    <div className="group bg-card border rounded-2xl p-6 hover:shadow-xl transition-all hover:-translate-y-2 h-full">
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-xl font-bold line-clamp-2 group-hover:text-primary transition-colors">
          {service.title}
        </h3>
        <div className="flex items-center gap-1 text-yellow-400">
          {ratingStars}
          <span className="text-sm font-medium">({service.reviews})</span>
        </div>
      </div>
      
      <p className="text-muted-foreground mb-4 line-clamp-3 text-sm">{service.description}</p>
      
      <div className="space-y-2 mb-6">
        <div className="flex items-center gap-2 text-sm">
          <DollarSign className="w-4 h-4 text-green-500" />
          <span>${service.price}/hr</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <User className="w-4 h-4" />
          {service.provider_name || 'Verified Provider'}
        </div>
      </div>
      
      <div className="flex gap-3 pt-4 border-t">
        <Link 
          to={`/services/${service.id}`}
          className="flex-1 bg-primary/90 hover:bg-primary text-primary-foreground px-6 py-3 rounded-xl font-semibold text-center transition-all shadow-md hover:shadow-lg"
        >
          View Details
        </Link>
        <button className="px-6 py-3 bg-green-500/90 hover:bg-green-500 text-white rounded-xl font-semibold shadow-md hover:shadow-lg transition-all">
          Book Now
        </button>
      </div>
    </div>
  )
}

