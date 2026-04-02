import { useState, useEffect } from 'react'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { ServiceCard } from '../components/ServiceCard.jsx'
import { FilterIcon, Search } from 'lucide-react'
import { cn } from '../lib/utils.js'

const api = axios.create({
  baseURL: '/api',
})

export default function Services() {
  const [filters, setFilters] = useState({ category: '', priceMax: '' })
  const [search, setSearch] = useState('')

  const { data: services = [], isLoading } = useQuery({
    queryKey: ['services', filters, search],
    queryFn: () => api.get('/services').then(res => res.data),
  })

  return (
    <div className="max-w-7xl mx-auto p-8 space-y-8">
      <div className="flex flex-col lg:flex-row gap-6">
        <div className="lg:w-64 space-y-4 p-6 bg-card rounded-2xl border">
          <h2 className="text-2xl font-bold">Filters</h2>
          <div>
            <label className="block text-sm font-medium mb-2">Category</label>
            <select 
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-primary"
              onChange={(e) => setFilters({...filters, category: e.target.value})}
            >
              <option>All</option>
              <option>Plumbing</option>
              <option>Electrician</option>
              <option>Cleaning</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Max Price</label>
            <input 
              type="number"
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-primary"
              placeholder="$100"
              onChange={(e) => setFilters({...filters, priceMax: e.target.value})}
            />
          </div>
        </div>

        <div className="flex-1 space-y-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground w-5 h-5" />
              <input
                type="text"
                placeholder="Search services..."
                className="w-full pl-12 pr-4 py-3 border rounded-xl bg-card focus:ring-2 focus:ring-primary"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <button className="px-6 py-3 bg-primary/10 hover:bg-primary/20 text-primary rounded-xl font-medium whitespace-nowrap">
              <FilterIcon className="w-5 h-5 inline mr-2" />
              Filters
            </button>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array(6).fill().map((_, i) => (
                <div key={i} className="animate-pulse bg-card p-6 rounded-2xl h-64" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {services.map((service) => (
                <ServiceCard key={service.id} service={service} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

