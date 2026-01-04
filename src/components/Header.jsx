import React, { useState, useEffect, useCallback } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
// Assuming this hook provides user/logout functions
import { useUser } from "../hooks/useUser"; 
// Assuming a custom Button component, likely styled with Tailwind
import { Button } from "./ui/button"; 
import { Search, LogOut, HeartPulse, ExternalLink, MapPin, Youtube } from "lucide-react"; 

// --- MOCK DATA: Specified Local Clinics ---
const mockClinics = [
  { _id: "1", name: "Sahlan Clinic", location: "Hargeisa, Woqooyi Galbeed", services: ["General Check-ups", "Vaccination", "Maternity"] },
  { _id: "2", name: "Kalkaal Medical Center", location: "Berbera, Woqooyi Galbeed", services: ["Diagnostics", "Laboratory Services"] },
  { _id: "3", name: "Kulan Health Services", location: "Burao, Togdheer", services: ["Family Health", "Nutrition"] },
  { _id: "4", name: "Caafi Wellness Clinic", location: "Erigavo, Sanaag", services: ["Pediatrics", "Consultation"] },
  { _id: "5", name: "Mudasir Clinic", location: "Las Anod, Sool", services: ["Dental Care", "General Practice"] },
  { _id: "6", name: "Health Clinic", location: "Hargeisa, Woqooyi Galbeed", services: ["Routine Care", "Outpatient"] },
];

// --- MODULAR COMPONENTS ---

/**
 * ClinicSearch: Search input field.
 */
const ClinicSearch = React.memo(({ search, setSearch }) => (
  <div className="mt-8 relative max-w-md lg:max-w-lg mx-auto lg:mx-0">
    <Search 
      className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" 
      size={20} 
      aria-hidden="true" 
    />
    <input
      type="search"
      placeholder="Search clinics by name, city, or service..."
      // Primary green focus
      className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 focus:border-green-600 rounded-full shadow-lg focus:shadow-green-300/60 transition duration-300 text-gray-800 placeholder-gray-500 text-lg outline-none"
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      aria-label="Search clinics"
    />
  </div>
));


/**
 * ClinicCard: Displays a single clinic's information (now static).
 */
const ClinicCard = React.memo(({ clinic }) => { // Removed navigate prop
    const services = clinic.services || []; 

    return (
        <article
          // Removed cursor-pointer, hover effects, and click handlers to make it static
          className="group space-y-4 p-8 rounded-2xl bg-white shadow-xl border-t-8 border-green-600 relative overflow-hidden"
        >
            <div className="absolute top-0 right-0 h-16 w-16 bg-green-500 transform rotate-45 translate-x-8 -translate-y-8 opacity-10 transition" aria-hidden="true" />

            <div className="flex items-center space-x-3">
                <HeartPulse className="text-green-600 flex-shrink-0" size={20} />
                <h3 className="text-xl sm:text-2xl font-bold text-gray-800 leading-snug">
                    {clinic.name}
                </h3>
            </div>
            
            <p className="text-gray-600 text-base flex items-center gap-2">
                <MapPin className="text-gray-400" size={16} />
                <span className="font-medium text-gray-700">{clinic.location}</span>
            </p>

            <div className="flex flex-wrap gap-2 pt-2">
                {services.slice(0, 3).map((service) => (
                    <span 
                        key={service} 
                        className="text-xs font-medium bg-green-100 text-green-800 px-3 py-1 rounded-full border border-green-300"
                    >
                        {service}
                    </span>
                ))}
            </div>
            
            {/* Removed the "View Details" Link component */}
        </article>
    );
});


// --- MAIN INTRO COMPONENT ---

export default function Intro() {
    const { user, logout } = useUser();
    const navigate = useNavigate();
    const location = useLocation();
    
    const [search, setSearch] = useState("");
    const [clinics, setClinics] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    // Simulated data fetching
    useEffect(() => {
        setIsLoading(true);
        const timer = setTimeout(() => {
            setClinics(mockClinics);
            setIsLoading(false);
        }, 800);
        return () => clearTimeout(timer);
    }, []);

    const handleLogout = useCallback(() => {
        logout();
        navigate("/login", { replace: true });
    }, [logout, navigate]);


    const filteredClinics = clinics.filter((clinic) => {
        const lowerSearch = search.toLowerCase();
        
        const matchesNameOrLocation = 
            clinic.name.toLowerCase().includes(lowerSearch) ||
            clinic.location.toLowerCase().includes(lowerSearch);

        const matchesService = clinic.services?.some(service => 
            service.toLowerCase().includes(lowerSearch)
        );

        return matchesNameOrLocation || matchesService;
    });

    const isSearchActive = search.length > 0;

    // --- Header Rendering function ---
    const renderHeader = () => (
        <header className="w-full bg-white border-b border-gray-200 shadow-sm sticky top-0 z-50">
            <div className="max-w-7xl mx-auto flex justify-between items-center px-4 sm:px-6 py-4">
                <Link to="#" className="flex items-center" aria-label="Go to Home Page">
                    {/* Logo/Title using Green accent */}
                    <span className="text-2xl sm:text-3xl font-black text-green-800 tracking-tight">
                        ZULTAN HEALTH <span className="text-green-500 font-extralight">Solutions</span>
                    </span>
                </Link>

                <div className="flex items-center space-x-4">
                    {user ? (
                        <Button 
                            onClick={handleLogout} 
                            // Logout remains Red for final action
                            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-full transition flex items-center gap-2"
                            aria-label="Log out of the system"
                        >
                            <LogOut size={18} />
                            <span className="hidden sm:inline">Logout</span>
                        </Button>
                    ) : (
                        // Login link uses Green accent
                        <Link to="/login" className="text-green-600 hover:text-green-700 font-medium">Ministry Login</Link>
                    )}
                </div>
            </div>
        </header>
    );

    // Render minimal header for sub-paths
    if (location.pathname !== "/") {
      return renderHeader();
    }


    return (
        <>
            {renderHeader()}

            {/* MAIN CONTENT (Root Path Only) */}
            <main className="bg-white">

                {/* HERO SECTION */}
                <section className="bg-gradient-to-br from-green-50 to-white py-20 md:py-32 border-b border-gray-100">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 grid lg:grid-cols-12 items-center gap-12 md:gap-16">

                        {/* LEFT SIDE: Text and Search */}
                        <div className="space-y-8 text-center lg:text-left lg:col-span-7">
                            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-[4.5rem] font-extrabold text-gray-900 leading-tight">
                                <span className="text-green-700 block">Universal Health Coverage</span>
                                For All Somaliland Citizens.
                            </h1>

                            <p className="text-lg sm:text-xl text-gray-700 max-w-xl mx-auto lg:mx-0">
                    Countless children, mothers, and patients lose their lives because reliable health data does not exist. Medical records cannot be transferred between clinics, forcing patients to start from zero each time they seek care, with no access to previous lab results or medical history. This leads to repeated tests and treatments that many people cannot afford, turning preventable and treatable conditions into fatal outcomes
                            </p>

                            <ClinicSearch search={search} setSearch={setSearch} />
                        </div>

                        {/* RIGHT SIDE VIDEO/IMAGE */}
                        <div className="lg:col-span-5 w-full">
                            <div className="w-full h-[300px] md:h-[400px] bg-green-100 rounded-3xl shadow-2xl overflow-hidden relative group">
                                {/* Video Placeholder */}
                                <div className="absolute inset-0 flex items-center justify-center bg-gray-900/50">
                                    <div className="text-center p-4">
                                        <Youtube size={64} className="text-red-500 mx-auto group-hover:scale-110 transition" />
                                        <p className="text-white font-bold mt-2 text-lg">Watch: Latest Health Announcement</p>
                                        <a 
                                            href="https://www.youtube.com/watch?v=EXAMPLE_ID" 
                                            target="_blank" 
                                            rel="noopener noreferrer"
                                            className="text-sm font-medium text-red-400 hover:text-red-300 transition"
                                        >
                                            Click to view video
                                        </a>
                                    </div>
                                </div>
                                <img
                                    src="https://images.unsplash.com/photo-1579684385137-b952f01f89c6?fit=crop&w=800&q=80" 
                                    alt="Health professionals and patient care"
                                    className="w-full h-full object-cover object-center" 
                                />
                            </div>
                            <p className="text-sm text-center text-gray-500 mt-3">Featured video: Public Health Initiatives in Somaliland</p>
                        </div>
                    </div>
                </section>

                {/* CLINICS GRID */}
                <section className="py-20 bg-gray-50" aria-labelledby="clinics-heading">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-12">
                        <h2 id="clinics-heading" className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-center text-gray-900">
                            <span className="text-green-700">Authorized Health Clinics</span>
                        </h2>
                        
                        {isLoading ? (
                            // Skeleton UI for loading state
                            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8">
                                {[1, 2, 3].map((i) => (
                                    <div key={i} className="animate-pulse space-y-4 p-8 rounded-2xl bg-white shadow-lg border-t-8 border-green-200">
                                        <div className="h-6 bg-gray-200 rounded w-3/4"></div>
                                        <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                                        <div className="flex gap-2"><div className="h-5 bg-green-100 rounded-full w-1/4"></div><div className="h-5 bg-green-100 rounded-full w-1/4"></div></div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <>
                                <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8">
                                    {/* Passed only clinic data, removed navigation prop */}
                                    {filteredClinics.map((clinic) => (
                                        <ClinicCard key={clinic._id} clinic={clinic} /> 
                                    ))}
                                </div>

                                {filteredClinics.length === 0 && isSearchActive && (
                                    <div className="text-center p-12 bg-white rounded-xl shadow-inner border border-gray-100">
                                        <p className="text-2xl font-bold text-gray-700">
                                            No Clinics Found
                                        </p>
                                        <p className="text-lg text-gray-500 mt-2">
                                            Your search for **"{search}"** did not match any health facilities.
                                        </p>
                                        <Button 
                                            onClick={() => setSearch("")} 
                                            className="mt-6 bg-green-600 hover:bg-green-700 text-white rounded-full px-6 py-3 transition"
                                        >
                                            Clear Search
                                        </Button>
                                    </div>
                                )}
                                
                                {filteredClinics.length > 0 && !isSearchActive && (
                                    <p className="text-center text-gray-500 text-lg">
                                        Displaying {filteredClinics.length} authorized clinics across Somaliland.
                                    </p>
                                )}
                            </>
                        )}
                    </div>
                </section>
            </main>
        </>
    );
}