
import { Link } from 'react-router-dom'
import { ModuleType } from '../types'
import useUser from '../hooks/useUser'

const ModuleCard = ({module}:{module:ModuleType}) => {
    const {user} = useUser()

  return (
    <div className='bg-white dark:bg-neutral-950 rounded-lg shadow-md p-6 px-8'>
                <div className='flex flex-col gap-4 justify-between items-center h-full'>
                    <div>
                        <h3 className='font-semibold text-lg'>{module.title}</h3>
                        <p className='text-sm text-gray-500 line-clamp-2'>{module.mdxContent}</p>
                    </div>
                    {user?.currentModuleId === module._id ? (
                      <Link to={`/module/${module._id}`} className='bg-green-500 w-full text-center text-white text-sm px-4 py-2 font-medium rounded-md cursor-pointer'>Start</Link>
                    ):user?.completedModulesId.includes(module._id) ? (
                      <Link to={`/module/${module._id}`} className='bg-green-500 w-full text-center text-white text-sm px-4 py-2 font-medium rounded-md cursor-pointer'>View again</Link>
                    ):(
                      <p className='text-sm font-medium'>Complete the previous module first!</p>
                    )}
                </div>
            </div>
  )
}

export default ModuleCard