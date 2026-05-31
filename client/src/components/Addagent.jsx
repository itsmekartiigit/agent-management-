import { useState } from "react";
import { toast } from "react-toastify";

function AddAgent({ getAgents }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    password: "",
    confirmPassword: "", 
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  // Validate mobile number (10 digits)
  const isValidMobile = (mobile) => {
    return /^[0-9]{10}$/.test(mobile);
  };

  // Validate email format
  const isValidEmail = (email) => {
    return email && email.includes("@") && email.includes(".");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Client-side validation (matches backend validation)
    if (!formData.name.trim()) {
      toast.error("Agent name is required");
      return;
    }

    if (!isValidEmail(formData.email)) {
      toast.error("Please enter a valid email address");
      return;
    }

    if (!isValidMobile(formData.mobile)) {
      toast.error("Mobile number must be 10 digits");
      return;
    }

    if (formData.password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }

    // checks if password matches 
    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    setIsLoading(true);

    try {
      const token = localStorage.getItem("token");
      
      if (!token) {
        toast.error("Please login again");
        return;
      }

   
      const payload = {
        name: formData.name.trim(),
        email: formData.email.trim().toLowerCase(),
        mobile: formData.mobile.trim(),
        password: formData.password,
        confirmPassword: formData.confirmPassword,
      };

      console.log("Sending payload:", payload); // Debug log

      const response = await fetch("https://agent-management-server.vercel.app/api/agents/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          token: token,
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();
      console.log("Response:", data); // Debug log

      if (data.success) {
        toast.success("Agent added successfully");
        
        // Reset form
        setFormData({
          name: "",
          email: "",
          mobile: "",
          password: "",
          confirmPassword: "",
        });
        
        // Refresh agent list
        if (getAgents) {
          getAgents();
        }
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error("Add agent error:", error);
      toast.error("Failed to add agent. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow mb-6">
      <h2 className="text-xl font-semibold mb-4">
        Add New Agent
      </h2>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Name Field */}
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />


          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />


          <input
            type="tel"
            name="mobile"
            placeholder="Mobile Number (10 digits)"
            value={formData.mobile}
            onChange={handleChange}
            className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />

       
          <input
            type="password"
            name="password"
            placeholder="Password (min 6 characters)"
            value={formData.password}
            onChange={handleChange}
            className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />

      
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={handleChange}
            className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className={`mt-4 bg-black text-white px-5 py-2 rounded transition ${
            isLoading 
              ? "opacity-50 cursor-not-allowed" 
              : "hover:bg-gray-800"
          }`}
        >
          {isLoading ? "Adding..." : "Add Agent"}
        </button>
      </form>
    </div>
  );
}

export default AddAgent;