const API_BASE_URL = import.meta.env.API_BASE_URL || 'https://liz-motors-internship-fullstack-project.onrender.com';

export async function getUserFromServer(){
    const token = localStorage.getItem('token')
    if(!token) return null
    const response = await fetch(`${API_BASE_URL}/api/get/user`, {
        method: 'POST',
        headers:{
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({token})
    })

    const res = await response.json()

    return res.data;
}