import React, { useEffect, useState } from 'react'
import RoundedProgressBar from '../components/RoundedProgressBar'
import { Link, useParams } from 'react-router-dom'
import VideoPlayer from '../components/VideoPlayer'
import Markdown from 'react-markdown'
import { ModuleType } from '../types'
import { getModuleFromServerById } from '../functions/helpers/getModules'
import useUser from '../hooks/useUser'



const ModulePage = () => {
  const {id} = useParams()
  const [videoCompleted, setVideoCompleted] = React.useState(false)
  const [videoCompletedLocal, setVideoCompletedLocal] = useState(false)
  const [module, setModule] = React.useState<ModuleType|null>(null)
  const {user, modules} = useUser()
  useEffect(() => {
    async function fetchModule(){
      if(!id) return
      const data = await getModuleFromServerById(id)
      setModule(data)
    }
    fetchModule()
  },[id, module])
  if(!id) return <div>Module not found</div>
  return (
    <>
    {module && modules && (
      <>
      {module && user && (module._id === user?.currentModuleId || user?.completedModulesId.includes(module._id) || modules.findIndex(m => m._id === module._id) <= modules.findIndex(m => m._id === user?.currentModuleId)) ? (
        <div className='w-full'>
        <div className='min-h-screen w-full flex flex-col  max-w-screen-lg mx-auto space-y-4 py-10  px-6'>
        <div className='flex items-center justify-between w-full'>
          <div className='heading flex items-center w-full justify-start gap-3'>
            <Link to={`/`} className='p-2 bg-white/0 rounded-md border border-white/10 cursor-pointer text-black dark:text-white transition hover:text-black dark:hover:text-white'>
              <svg xmlns="https://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-chevron-left" viewBox="0 0 16 16">
                <path fill-rule="evenodd" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0"/>
              </svg>
            </Link>
            <div>
              <div className='flex items-center gap-2'>
                <h4 className='font-semibold text-xl'>{module?.title}</h4>
                {/* {user.currentModuleId === module._id && <p className='text-xs font-medium px-3 py-1 rounded-full bg-emerald-500 text-white'>Current Module</p>} */}
                {user.completedModulesId.includes(module._id) && <p className='text-xs font-medium px-3 py-1 rounded-full bg-emerald-500 text-white'>Completed</p>}
              </div>
              <p className='font-medium text-sm opacity-80'>
                Module {module.sequence} of {modules?.length}
              </p>
            </div>
          </div>
          <div className='progress'>
            <RoundedProgressBar progress={Math.floor((user.completedModulesId.length/modules.length)*100)}/>
          </div>
        </div>
        <div className='w-full flex items-center justify-center'>
          <div className='w-full aspect-video bg-neutral-700 rounded-md overflow-hidden '>
            <VideoPlayer moduleId={module._id} url={module.videoUrl} user={user} videoCompletedLocal={videoCompletedLocal} setVideoCompletedLocal={setVideoCompletedLocal} setVideoCompleted={setVideoCompleted} videoCompleted={videoCompleted}/>
          </div>
        </div>
        <div className='w-full space-y-2'>
          <h4 className='font-semibold text-xl'>Content</h4>
  
          <Markdown>{module.mdxContent}</Markdown>
        </div>
  
        
        </div>
        {/* BOTTOM BAR */}
        <div className='w-full flex-col gap-4 py-4 px-14 sticky bottom-0 left-0 z-[101] backdrop-blur-xl border-t shadow-sm border-white/10 bg-black/10 flex md:flex-row items-center justify-between'>
          {module.sequence > 1 ? (
            // If the module is not the first module, show the previous module, we can show previous module using the sequence number
            <a href={`/module/${modules[module.sequence-2]._id}`} className='group flex items-center gap-2 text-black dark:text-white transition hover:text-black dark:hover:text-white'>
            <div className='rounded-full border border-white/50 p-1 opacity-50 group-hover:opacity-100 group-hover:border-white-20 cursor-pointer transition'>
              <svg xmlns="https://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-arrow-left-short" viewBox="0 0 16 16">
                <path fill-rule="evenodd" d="M12 8a.5.5 0 0 1-.5.5H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5a.5.5 0 0 1 .5.5"/>
              </svg>
            </div>
            <p className='text-sm font-semibold'>Previous Module:</p>
            <p className='text-sm font-medium opacity-80'>{modules[module.sequence-2].title}</p>
          </a>
          ):(
            <div></div>
          )}
          {videoCompleted && (
            <>
            {
              module.sequence === modules.length ? (
                <div className='flex items-center gap-2 text-black dark:text-white transition hover:text-black dark:hover:text-white'>
                  <p className='text-sm font-semibold'>You have completed the course</p>
                  <p className='text-sm font-medium opacity-80'>Congratulations!</p>
                </div>
              ):(
                <a href={`/module/${module.sequence < 500 ? modules[module.sequence]._id : modules[module.sequence-1]._id }`} className='group flex items-center gap-2 text-black dark:text-white transition hover:text-black dark:hover:text-white'>
            <p className='text-sm font-semibold'>Next Module:</p>
            <p className='text-sm font-medium opacity-80'>{module.sequence < 500 ? modules[module.sequence].title : modules[module.sequence-1].title }</p>
            <div className='rounded-full border border-white/50 p-1 opacity-50 group-hover:opacity-100 group-hover:border-white-20 cursor-pointer transition'>
            <svg xmlns="https://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-arrow-right-short" viewBox="0 0 16 16">
              <path fill-rule="evenodd" d="M4 8a.5.5 0 0 1 .5-.5h5.793L8.146 5.354a.5.5 0 1 1 .708-.708l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708-.708L10.293 8.5H4.5A.5.5 0 0 1 4 8"/>
            </svg>
            </div>
          </a>
              )
            }
            </>
          )}
          
        </div>
      </div>
      ):(
        <div>
          <h1>Module not found</h1>
        </div>
      )}
      </>
    )}
    </>
  )
}

export default ModulePage