import { useEffect } from 'react'
import { X } from 'lucide-react'
import { cn } from '../lib/utils.js'

export function Modal({ isOpen, onClose, title, children }) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
      <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm transition-opacity" onClick={onClose} />
        
        <div className="relative bg-card rounded-2xl text-left overflow-hidden shadow-2xl transform transition-all sm:my-8 sm:max-w-lg sm:w-full sm:max-w-2xl">
          <div className="bg-card px-6 py-4 border-b">
            <div className="flex justify-between items-center">
              <h3 id="modal-title" className="text-lg font-bold">
                {title}
              </h3>
              <button
                type="button"
                className="text-gray-400 hover:text-gray-600"
                onClick={onClose}
              >
                <X className="h-6 w-6" />
              </button>
            </div>
          </div>
          
          <div className="px-6 py-8 sm:px-8 sm:py-12">
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}

