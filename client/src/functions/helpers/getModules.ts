const API_BASE_URL = import.meta.env.API_BASE_URL || '';

export async function getModulesFromServer(branchId:string) {
    const response = await fetch(`${API_BASE_URL}/api/get/modules/${branchId}`, {
        method: 'GET',
    })
    const res = await response.json()

    return res
}

export async function getModuleFromServerById(id:string) {
    const response = await fetch(`${API_BASE_URL}/api/module/${id}`, {
        method: 'GET',
    })
    const res = await response.json()

    return res
}