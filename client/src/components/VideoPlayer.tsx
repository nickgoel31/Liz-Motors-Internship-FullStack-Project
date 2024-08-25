import { useEffect, useState, useRef, useCallback } from 'react'
import ReactPlayer from 'react-player'
import { UserType } from '../types'


const VideoPlayer = ({ url, moduleId, user, setVideoCompleted, videoCompleted, videoCompletedLocal, setVideoCompletedLocal }: { url: string, moduleId: string, user: UserType,videoCompleted:boolean, setVideoCompleted: (b:boolean) => void, videoCompletedLocal: boolean, setVideoCompletedLocal: (b:boolean) => void }) => {
  // const [progress, setProgress] = useState()
  const [isPlaying, setIsPlaying] = useState(false)
  // const [videoDuration, setVideoDuration] = useState(0)
  const [playedSeconds, setPlayedSeconds] = useState(0)
  const [initialTimeSet, setInitialTimeSet] = useState(false);
  // const [videoCompleted, setVideoCompleted] = useState(user.completedModulesId.includes(moduleId))
  const playerRef = useRef<ReactPlayer>(null)
  const [watchAgain, setWatchAgain] = useState(false)
  
  const isMounted = useRef(false)

  const updateVideoTime = useCallback((time: number) => {
    fetch('https://liz-motors-internship-fullstack-project.onrender.com/api/update/user', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userId: user._id,
        moduleId,
        videoTime: time,
        completed: false,
      }),
    }).then(() => {
      // console.log('Video time updated')
    }).catch((err) => {
      console.log(err);
    });
  }, [user._id, moduleId]);

  useEffect(() => {
    if (!isMounted.current) {
      setVideoCompleted(user.completedModulesId.includes(moduleId));
      if (user.currentModuleVideoTime) {
        setPlayedSeconds(user.currentModuleVideoTime);
        if (playerRef.current) {
          playerRef.current.seekTo(user.currentModuleVideoTime, 'seconds');
        }
      }
      isMounted.current = true;
    }
  }, [moduleId, setVideoCompleted, user.completedModulesId, user.currentModuleVideoTime]);

  useEffect(() => {
    if (videoCompletedLocal) {
      setWatchAgain(false);
    } 
    if (!videoCompleted && playedSeconds > 0) {
      updateVideoTime(playedSeconds);
    }
  }, [videoCompleted, moduleId, playedSeconds, user._id, videoCompletedLocal, updateVideoTime]);

  function handleRewind() {
    if (playerRef.current) {
      const newTime = Math.max(playedSeconds - 10, 0);
      playerRef.current.seekTo(newTime, 'seconds');
      setPlayedSeconds(newTime);
      updateVideoTime(newTime);
    }
  }
  

  function handleEnd() {
    fetch('https://liz-motors-internship-fullstack-project.onrender.com/api/update/user', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userId: user._id,
        moduleId,
        videoTime: playedSeconds,
        completed: true,
      }),
    }).then(() => {
      // console.log('Video completed')
      setVideoCompleted(true)
      setVideoCompletedLocal(true)
    }).catch((err) => {
      console.log(err)
    })
  }

  return (
    <div className='w-full h-full relative'>
      {videoCompleted && !watchAgain && (
        <div className='absolute top-0 z-[100] left-0 w-full h-full flex-col gap-4 bg-black/60 flex items-center justify-center'>
          <p className='text-white text-2xl font-bold'>Video Completed</p>
          <button onClick={() => setWatchAgain(true)}>Watch again</button>
        </div>
      )}
      <ReactPlayer
        ref={playerRef}
        width='100%'
        height='100%'
        url={url}
        controls={false}
        playing={isPlaying}
        onEnded={handleEnd}
        onPlay={() => setIsPlaying(true)}
        onProgress={(state) => {
          if (!initialTimeSet) {
            setInitialTimeSet(true);
          } else {
            setPlayedSeconds(state.playedSeconds);
          }
        }}
        onReady={() => {
          if (playerRef.current && !initialTimeSet) {
            playerRef.current.seekTo(playedSeconds, 'seconds');
            setInitialTimeSet(true);
          }
        }}
      />
      <div className='custom-controls z-[10] space-x-4 absolute top-0 left-0 flex items-center justify-center w-full h-full'>
        <div onClick={() => setIsPlaying(!isPlaying)} className='w-full h-full cursor-pointer bg-black/10 text-center group flex items-center justify-center'>
          <p className='opacity-0 group-hover:opacity-100 text-xl font-bold transition'>
            {isPlaying ? (
              <svg xmlns="http://www.w3.org/2000/svg" width="90" height="90" fill="currentColor" className="bi bi-pause-fill" viewBox="0 0 16 16">
                <path d="M5.5 3.5A1.5 1.5 0 0 1 7 5v6a1.5 1.5 0 0 1-3 0V5a1.5 1.5 0 0 1 1.5-1.5m5 0A1.5 1.5 0 0 1 12 5v6a1.5 1.5 0 0 1-3 0V5a1.5 1.5 0 0 1 1.5-1.5"/>
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" width="90" height="90" fill="currentColor" className="bi bi-play-fill" viewBox="0 0 16 16">
                <path d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393"/>
              </svg>
            )}
          </p>
        </div>
      </div>
      <div 
      onClick={handleRewind} 
      className='absolute bottom-5 cursor-pointer p-3 left-5 z-[10]'>
        <div className='flex items-center gap-3'>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-rewind-fill" viewBox="0 0 16 16">
            <path d="M8.404 7.304a.802.802 0 0 0 0 1.392l6.363 3.692c.52.302 1.233-.043 1.233-.696V4.308c0-.653-.713-.998-1.233-.696z"/>
            <path d="M.404 7.304a.802.802 0 0 0 0 1.392l6.363 3.692c.52.302 1.233-.043 1.233-.696V4.308c0-.653-.713-.998-1.233-.696z"/>
          </svg>
          <p>10s</p>
        </div>
      </div>
      <div className='bg-gray-700 w-full absolute left-0 h-2 z-[1] bottom-0'>
            <div className='h-full bg-gray-300' style={{width: `${(Math.floor(playedSeconds)/Math.floor(Math.floor(playerRef.current?.getDuration() || 0)))*100}%`, transition: `ease 0.1s`}}> 

            </div>
      </div>
      <div 
      
      className='absolute bottom-5 cursor-pointer p-3 right-5 z-[10]'>
        <div className='flex items-center gap-3'>
          
          <p className='text-sm font-semibold'>{Math.floor(playedSeconds)}s : {Math.floor(playerRef.current?.getDuration() || 0)}s</p>
        </div>
      </div>
    </div>
  )
}

export default VideoPlayer
