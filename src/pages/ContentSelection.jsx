import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import useScrollToTop from '../hooks/useScrollToTop'
import { generateSpecialUrl } from '../utils/urlGenerator'
import Button from '../components/Button'

const ContentSelection = () => {
  useScrollToTop()
  const navigate = useNavigate()
  const location = useLocation()

  const { username, platform, selectedService, userdata, contentType, quantity } = location.state || {}
  const [selectedItems, setSelectedItems] = useState(location.state?.selectedItems || [])

  if (!userdata) {
    navigate('/' + (platform || 'instagram'), { replace: true })
    return null
  }

  const getItems = () => {
    if (contentType === 'post') return userdata.posts || []
    if (contentType === 'story') return userdata.stories || []
    if (contentType === 'highlight') return userdata.highlights || []
    if (contentType === 'reel') return userdata.reels || []
    return []
  }

  const items = getItems()

  const getItemImage = (item) =>
    item.image || item.cover || item.thumbnail || item.display_url || ''

  const getItemTitle = (item) =>
    contentType === 'highlight' ? item.title || '' : ''

  const getItemUrl = (item) => {
    if (item.link) return item.link
    if (contentType === 'story')
      return generateSpecialUrl(platform, username, 'story', item.id)
    if (contentType === 'highlight')
      return generateSpecialUrl(platform, username, 'highlight', item.id)
    if (contentType === 'reel') {
      const sc = item.shortcode || item.code
      return sc ? generateSpecialUrl(platform, username, 'reel', sc) : null
    }
    return null
  }

  const handleCardClick = (item) => {
    setSelectedItems((prev) => {
      const exists = prev.find((s) => s.id === item.id)
      if (exists) {
        return prev.filter((s) => s.id !== item.id)
      } else {
        return [...prev, item]
      }
    })
  }

  const handleProceed = () => {
    if (selectedItems.length === 0) {
      alert('Please select at least one item.')
      return
    }
    navigate('/quantity-pricing', {
      state: {
        username,
        platform,
        selectedService,
        userdata,
        contentType,
        quantity,
        selectedItems
      }
    })
  }

  return (
    <div className="min-h-screen bg-transparent py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Select Content</h1>
          <p className="text-gray-600">Choose the items you want to boost</p>
        </div>

        {items.length === 0 ? (
          <div className="bg-white rounded-xl shadow-lg p-12 text-center">
            <h3 className="text-xl font-bold text-gray-900 mb-2">No items found</h3>
            <p className="text-gray-600">We couldn't find any {contentType}s for this profile.</p>
          </div>
        ) : (
          <div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
              {items.map((item) => {
                const isSelected = selectedItems.some((s) => s.id === item.id)
                return (
                  <div
                    key={item.id}
                    onClick={() => handleCardClick(item)}
                    className={`cursor-pointer rounded-xl overflow-hidden shadow-md border-2 transition-all ${isSelected ? 'border-[#ff1681] scale-105' : 'border-transparent hover:border-gray-300'
                      }`}
                  >
                    <img src={getItemImage(item)} alt="" className="w-full h-48 object-cover" />
                    {getItemTitle(item) && (
                      <div className="p-2 bg-white text-center text-sm font-semibold truncate">
                        {getItemTitle(item)}
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
            <div className="text-center">
              <Button onClick={handleProceed}>Proceed to Quantity & Pricing</Button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default ContentSelection
