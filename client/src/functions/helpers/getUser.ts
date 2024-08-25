export async function getUserFromServer(){
    const token = localStorage.getItem('token')
    if(!token) return null
    const response = await fetch('http://localhost:3000/api/get/user', {
        method: 'POST',
        headers:{
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({token})
    })

    const res = await response.json()

    return res.data;
}