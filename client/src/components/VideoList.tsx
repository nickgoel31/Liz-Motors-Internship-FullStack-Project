
import ModuleCard from './ModuleCard'
import { ModuleType } from '../types'

const VideoList = ({modules}:{modules:ModuleType[]}) => {
  return (
    <div className='space-y-4'>
        <div className=''>
            <h3 className='font-semibold text-2xl'>Complete the following modules!</h3>
        </div>

        <div className='w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-5'>
            {/* Module Card */}
            {modules.sort((module, module2) => module.sequence - module2.sequence).map((module, index) => (
              <ModuleCard key={index} module={module}/>
            ))}
        </div>
    </div>
  )
}

export default VideoList