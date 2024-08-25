const API_BASE_URL = import.meta.env.API_BASE_URL || '';

export async function getBranchFromServer(branchId:string) {
    const response = await fetch(`${API_BASE_URL}/api/branch/${branchId}`, {
        method: 'GET',
    })
    const res = await response.json()

    return res
}