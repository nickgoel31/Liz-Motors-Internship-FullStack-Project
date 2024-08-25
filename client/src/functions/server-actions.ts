const API_BASE_URL = import.meta.env.API_BASE_URL || '';

export type LoginData = {
    email: string
    password: string
}

export type RegisterData = {
    email: string
    password: string
    confirmPassword: string
}

export async function handleRegister(data: RegisterData) {
    if(data.password !== data.confirmPassword){
        throw new Error('Passwords do not match')
    }
  return await fetch(`${API_BASE_URL}/api/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({email: data.email, password: data.password, role:'employee'})
  })
}

export async function handleLogin(data: LoginData){
    //do something related to login
    const response = await fetch(`${API_BASE_URL}/api/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    const res:{data:string, message:string} = await response.json()
    localStorage.setItem('token', res.data)
    window.location.href = '/'

    return res.message
}

export async function handleLogout(){
    localStorage.removeItem('token')
    window.location.href = '/login'
}