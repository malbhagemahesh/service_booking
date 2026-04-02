import { Link } from 'react-router-dom'
import { HomeIcon, Search, Users } from 'lucide-react'
import { useEffect } from "react"
import API from "../services/api"

export default function Home() {

  useEffect(() => {
    API.get("/health")
      .then((res) => console.log("Backend:", res.data))
      .catch((err) => console.error("Error:", err))
  }, [])

  return (
    <div className="max-w-7xl mx-auto p-8 space-y-12">
      <div className="text-center space-y-6">
        <h1 className="text-5xl md:text-7xl font-bold text-gray-900">
          Find Local Services
        </h1>
        <p className="text-xl md:text-2xl max-w-2xl mx-auto text-gray-500">
          Book trusted professionals for home services, repairs, cleaning and more.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/services" className="px-8 py-4 bg-blue-600 text-white rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all">
            Browse Services
          </Link>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        <div className="text-center p-8 rounded-2xl bg-white border">
          <HomeIcon className="w-16 h-16 mx-auto mb-4 text-blue-600 opacity-75" />
          <h3 className="text-2xl font-bold mb-2">Local Pros</h3>
          <p>Verified service providers in your area</p>
        </div>
        <div className="text-center p-8 rounded-2xl bg-white border">
          <Search className="w-16 h-16 mx-auto mb-4 text-blue-600 opacity-75" />
          <h3 className="text-2xl font-bold mb-2">Easy Booking</h3>
          <p>Select time and book instantly</p>
        </div>
        <div className="text-center p-8 rounded-2xl bg-white border">
          <Users className="w-16 h-16 mx-auto mb-4 text-blue-600 opacity-75" />
          <h3 className="text-2xl font-bold mb-2">Trusted Reviews</h3>
          <p>Real ratings from real customers</p>
        </div>
      </div>
    </div>
  )
}