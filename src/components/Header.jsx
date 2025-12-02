import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useUser } from "../hooks/useUser";
import { Button } from "./ui/button"; // Assuming this is your custom button component

export default function Header() {
  // Assuming useUser provides the user state and logout function
  const { user, logout } = useUser(); 
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <>
      {/* ⚕️ Navigation Bar - Clean, High Contrast, and Professional */}
      <header className="w-full bg-white text-gray-800 border-b-4 border-blue-500/10 shadow-lg sticky top-0 z-50">
   <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">
    {/* Clinic Name - Plain Text, Not a Link */}
    <div className="text-4xl font-black text-blue-800 tracking-tighter">
      SAHLAN <span className="text-blue-500 font-extralight">CLINIC</span>
    </div>

    {/* Dynamic Action Button - High Visibility */}
    {/* (keep any other header buttons here if needed) */}
  </div>
      </header>

      {/* 🏥 Home Page Content - HIGH VISIBILITY & CLINICAL DESIGN */}
      {location.pathname === "/" && (
        <main className="bg-white">
          
          {/* ## 💥 Hero Section: The Pinnacle of Care */}
          <section className="bg-gradient-to-tr from-blue-50 to-white py-28 md:py-40 border-b border-gray-100">
            <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-12 items-center gap-16">
              
              {/* Left Column: Text Content (The main focus) */}
              <div className="space-y-8 text-center lg:text-left lg:col-span-7">
                <h1 className="text-7xl lg:text-[5.5rem] font-black text-gray-900 leading-tight">
                  <span className="text-blue-700 block">The Future</span> of
                  Health is Personal.
                </h1>
                <p className="text-2xl text-gray-700 leading-relaxed font-normal">
                  **Sahlan Clinic** is redefining healthcare with a focus on
                  **precision diagnostics**, proactive wellness, and a clinical experience
                  that puts *you* first.
                </p>
                
                {/* LARGE, HOT, HIGH-VISIBILITY BUTTON */}
                <Button
                  onClick={() => navigate("/login")}
                  className="
                    mt-10
                    bg-blue-700
                    hover:bg-red-600
                    text-white
                    px-16 py-5
                    rounded-full
                    text-2xl
                    font-black
                    uppercase
                    tracking-widest
                    transition duration-500
                    shadow-2xl
                    transform
                    hover:shadow-[0_10px_20px_rgba(255,0,0,0.5)]
                    hover:translate-y-[-4px]
                  "
                >
               Clinic Management system
                </Button>
                
              </div>

              {/* Right Column: Visual Placeholder */}
              <div className="hidden lg:block lg:col-span-5 relative">
               <div className="w-full h-[450px] bg-blue-200/40 rounded-3xl shadow-2xl overflow-hidden flex items-center justify-center border-4 border-white backdrop-blur-sm">
  <img 
    src="https://ebmedical.ca/wp-content/uploads/2023/11/eb-medical-clinic-dougall-rd-0017-scaled.jpg" // <-- Replace this with your actual image URL
    alt="A professional medical setting or doctor consulting a patient" 
    className="w-full h-full object-cover" // Ensures the image covers the div without distortion
  />
</div>
              </div>
            </div>
          </section>

          {/* --- */}

          {/* ## 🩺 Service Overview: High Visibility Cards */}
          <section className="py-24 bg-gray-50">
            <div className="max-w-7xl mx-auto px-6 space-y-16">
              <h2 className="text-5xl font-extrabold text-center text-gray-900">
                Our <span className="text-blue-700">Expert Services</span>
              </h2>
              <p className="text-xl text-center max-w-3xl mx-auto text-gray-600">
                From preventive care to specialized treatment, our departments work
                together to ensure seamless, holistic patient management.
              </p>

              <div className="grid md:grid-cols-3 gap-8">
                {/* Service Card 1: Primary Care */}
                <div className="space-y-4 p-8 rounded-2xl bg-white shadow-2xl border-t-4 border-blue-600 transform hover:scale-[1.02] transition duration-500">
                  <div className="text-4xl text-blue-600 mb-2 font-bold">PRIMARY CARE</div>
                  <p className="text-gray-600 leading-relaxed">
                    Comprehensive routine check-ups, ongoing condition management, and personalized health planning for all ages.
                  </p>
                  <Link to="/services/primary" className="text-blue-600 font-semibold hover:text-blue-800 block mt-2">View Details →</Link>
                </div>
                {/* Service Card 2: Specialized Diagnostics */}
                <div className="space-y-4 p-8 rounded-2xl bg-white shadow-2xl border-t-4 border-blue-600 transform hover:scale-[1.02] transition duration-500">
                  <div className="text-4xl text-blue-600 mb-2 font-bold">SPECIALIZED DIAGNOSTICS</div>
                  <p className="text-gray-600 leading-relaxed">
                    Utilizing cutting-edge lab and imaging technology for accurate, rapid, and non-invasive health assessments.
                  </p>
                  <Link to="/services/diagnostics" className="text-blue-600 font-semibold hover:text-blue-800 block mt-2">View Details →</Link>
                </div>
                {/* Service Card 3: Wellness & Prevention */}
                <div className="space-y-4 p-8 rounded-2xl bg-white shadow-2xl border-t-4 border-blue-600 transform hover:scale-[1.02] transition duration-500">
                  <div className="text-4xl text-blue-600 mb-2 font-bold">WELLNESS & PREVENTION</div>
                  <p className="text-gray-600 leading-relaxed">
                    Focus on long-term health, nutritional guidance, preventative screenings, and lifestyle consultations.
                  </p>
                  <Link to="/services/wellness" className="text-blue-600 font-semibold hover:text-blue-800 block mt-2">View Details →</Link>
                </div>
              </div>
            </div>
          </section>
          
          {/* --- */}

          {/* ## 💬 Social Proof / Testimonials: Build Trust */}
          <section className="py-24 bg-white">
            <div className="max-w-5xl mx-auto px-6 space-y-12 text-center">
              <h2 className="text-4xl font-extrabold text-gray-900">
                A Reputation Built on <span className="text-blue-700">Trust</span>
              </h2>
              
              <blockquote className="bg-blue-50 p-10 rounded-2xl shadow-inner border-l-8 border-blue-600">
                <p className="text-3xl font-serif italic text-gray-800 leading-snug">
                  "The doctors here are not only experts but incredibly kind. This clinic provides the highest standard of professional care I have ever experienced."
                </p>
                <footer className="mt-6 text-lg font-semibold text-blue-600">
                
                </footer>
              </blockquote>

  
            </div>
          </section>

          {/* --- */}

          {/* ## 🤝 Final CTA Banner: Highest Visibility Action */}
          <section className="py-16 bg-blue-800">
            <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center text-white space-y-4 md:space-y-0">
              <h2 className="text-3xl lg:text-4xl font-extrabold tracking-wide">
                Secure Your Health Consultation Today.
              </h2>
           
            </div>
          </section>
        </main>
      )}
    </>
  );
}