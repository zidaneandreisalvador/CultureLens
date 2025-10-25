const BASE_URL = "https://culturelens.onrender.com";

interface RegisterData {
  email: string;
  password: string;
  first_name: string;
  last_name: string;
  contact_number?: string;
  user_type?: string;
}

export const registerUser = async (data: RegisterData) => {
  try {
    const response = await fetch(`${BASE_URL}/register.php`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    const result = await response.json();
    return result; // { success: true/false, message: "..." }
  } catch (error) {
    console.error("Registration error:", error);
    return { success: false, message: "Request failed" };
  }
};
