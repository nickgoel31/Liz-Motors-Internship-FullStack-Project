export async function getModulesFromServer(branchId:string) {
    const response = await fetch(`http://localhost:3000/api/get/modules/${branchId}`, {
        method: 'GET',
    })
    const res = await response.json()

    return res
}

export async function getModuleFromServerById(id:string) {
    const response = await fetch(`http://localhost:3000/api/module/${id}`, {
        method: 'GET',
    })
    const res = await response.json()

    return res
}