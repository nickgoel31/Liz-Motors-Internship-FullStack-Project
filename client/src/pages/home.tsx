import { handleLogout } from '../functions/server-actions'
import DashboardElements from '../components/home/dashboardElements'

const Home = () => {
  return (
    <div className='space-y-10'>
      <div className='w-full flex items-center justify-end'>
        <button onClick={handleLogout} className='bg-emerald-600 p-1.5 px-4'>Logout</button>
      </div>
      <DashboardElements />
    </div>
  )
}

export default Home