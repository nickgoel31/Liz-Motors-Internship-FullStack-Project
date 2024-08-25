export async function getBranchFromServer(branchId:string) {
    const response = await fetch(`http://localhost:3000/api/branch/${branchId}`, {
        method: 'GET',
    })
    const res = await response.json()

    return res
}