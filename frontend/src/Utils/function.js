import axios from "axios";

// this fun used to submit th formdata
export const handleSubmit = async (formData, url, redirectTo = "/") => {
  try {
    const res = await axios.post(url, formData);
    const { token } = res.data;

    localStorage.setItem("token", token);
    window.location.href = redirectTo;
  } catch (err) {
    console.error(err);
    alert(err.response?.data?.message || "Authentication failed.");
  }
};

// this fun used to handle change in
// formdata when filling the form(e.g when login, singup ...)
export const handleChange = (e, formData, setFormData) => {
  const { name, value } = e.target;
  setFormData((prev) => ({ ...prev, [name]: value }));
};
