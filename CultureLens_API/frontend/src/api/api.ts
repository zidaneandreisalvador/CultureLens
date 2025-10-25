// src/api/api.ts
const BASE_URL = 'https://culturelens.onrender.com'; // your Render backend

export async function registerUser(data: any) {
  const res = await fetch(`${BASE_URL}/register.php`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  return res.json();
}

export async function loginUser(data: any) {
  const res = await fetch(`${BASE_URL}/login.php`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  return res.json();
}
