export async function getModulesFromServer(branchId:string) {
    const response = await fetch(`https://liz-motors-internship-fullstack-project.onrender.com/api/get/modules/${branchId}`, {
        method: 'GET',
    })
    const res = await response.json()

    return res
}

export async function getModuleFromServerById(id:string) {
    const response = await fetch(`https://liz-motors-internship-fullstack-project.onrender.com/api/module/${id}`, {
        method: 'GET',
    })
    const res = await response.json()

    return res
}