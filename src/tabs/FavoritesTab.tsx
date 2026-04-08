import { menuItems } from '../data/menu'
import { useApp } from '../context/AppContext'
import ItemCard from '../components/ItemCard'

export default function FavoritesTab() {
  const { favorites, addToCart } = useApp()
  const favItems = menuItems.filter(m => favorites.includes(m.id))

  return (
    <div className="pb-4">
      <div className="px-4 pt-4 pb-3">
        <h1 className="text-white text-2xl font-black tracking-tight">Избранное</h1>
      </div>

      {favItems.length === 0 ? (
        <div className="flex flex-col items-center justify-center pt-20 gap-3">
          <span className="text-5xl">💔</span>
          <p className="text-gray-500 text-sm">Нет избранных блюд</p>
          <p className="text-gray-500 text-xs">Нажмите ♥ на карточке товара</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-3 px-4">
          {favItems.map(item => (
            <ItemCard key={item.id} item={item} onClick={() => addToCart(item.id)} />
          ))}
        </div>
      )}
    </div>
  )
}
