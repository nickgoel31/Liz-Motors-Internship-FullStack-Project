import ProgressBar from '../ProgressBar';
import VideoList from '../VideoList';
import useUser from '../../hooks/useUser';

const DashboardElements = () => {
    const { user, modules } = useUser(); // Directly destructure from the hook

    if (!user || !modules) return null; // Return null until data is available

    return (
        <>
            <ProgressBar progress={Math.floor((user.completedModulesId.length/modules.length)*100)} />
            <VideoList modules={modules} />
        </>
    );
};

export default DashboardElements;
