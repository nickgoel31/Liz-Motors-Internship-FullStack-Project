import { useEffect, useState, useCallback } from 'react';
import { getModulesFromServer } from '../functions/helpers/getModules';
import { getBranchFromServer } from '../functions/helpers/getBranch';
import { getUserFromServer } from '../functions/helpers/getUser';
import { ModuleType, UserType } from '../types';

const useUser = () => {
    const [user, setUser] = useState<UserType | null>(null);
    const [modules, setModules] = useState<ModuleType[] | null>(null);
    const [branch, setBranch] = useState<{name:string, description?:string} | null>(null);

    const fetchUserData = useCallback(async () => {
        try {
            const userDB = await getUserFromServer();
            setUser(userDB);

            if (userDB) {
                const modulesDB:ModuleType[] = await getModulesFromServer(userDB.branchId);
                if(!modulesDB) return
                
                setModules(modulesDB.sort((m1, m2) => m1.sequence - m2.sequence));
                const branchDB = await getBranchFromServer(userDB.branchId);
                setBranch(branchDB);
            }
        } catch (error) {
            console.error("Error fetching user data:", error);
        }
    }, []);

    useEffect(() => {
        fetchUserData();
    }, [fetchUserData]);

    return { user, modules, branch };
};

export default useUser;
