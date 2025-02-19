import { motion } from "framer-motion";
import { ExternalLink, ArrowLeft } from "lucide-react";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import teamData from "../data/teamData.json";
import ScrollToTop from "./ScrollProgress.jsx"; // Import the scroll-to-top component


const TeamMemberPage = () => {
    const { id } = useParams();
    const member = teamData.find((m) => m.id === id);
    const navigate = useNavigate();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const handleBackToTeam = () => {
        navigate("/"); // Navigate to home page first
        setTimeout(() => {
            document.getElementById("our-team")?.scrollIntoView({ behavior: "smooth" });
        }, 100); // Delay to ensure the navigation is complete
    };

    const handleToContact = () => {
        navigate("/");
        setTimeout(() => {
            document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
        }, 100);
    }

    if (!member) return <p className="text-center text-red-600">Member not found</p>;

    return (
        <section className="bg-gray-50 py-20">
            <ScrollToTop />
            <div className="container mx-auto px-4">
                {/* Back Button */}
                <div className="flex justify-center mb-8">
                    <button
                        onClick={handleBackToTeam}
                        className="flex items-center text-blue-600 hover:text-blue-800 transition duration-300"
                    >
                        <ArrowLeft className="mr-2" /> Back to Team
                    </button>
                </div>

                {/* Hero Section */}
                <div className="flex flex-col items-center text-center mb-12">
                    <motion.img
                        src={member.image}
                        alt={member.name}
                        className="w-48 h-48 rounded-full object-cover mb-6 shadow-lg"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5 }}
                    />
                    <h1 className="text-4xl font-bold text-gray-900">{member.name}</h1>
                    <p className="text-gray-600 text-lg mb-4">{member.title}</p>
                    <p className="text-gray-600 max-w-2xl">{member.description}</p>
                </div>

                {/* Bio & Skills Section */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-12">
                    <div>
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">About {member.name}</h2>
                        <p className="text-gray-600">{member.intro}</p>
                    </div>
                    <div>
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">Skills & Tools</h2>
                        <div className="flex flex-wrap gap-2">
                            {member?.tools?.map((tool, idx) => (
                                <span
                                    key={idx}
                                    className="rounded-full bg-blue-100 px-4 py-2 text-sm text-blue-600"
                                >
                                    {tool}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Recent Projects */}
                {member.projects?.length > 0 && (
                    <div className="mb-12">
                        <h2 className="text-2xl font-bold text-gray-900 text-center mb-6">Recent Projects</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {member.projects.map((project, idx) => (
                                <div key={idx} className="bg-white rounded-lg shadow-lg overflow-hidden">
                                    <img src={project.image} alt={project.title} className="w-full h-48 object-cover" />
                                    <div className="p-6">
                                        <h3 className="text-xl font-semibold text-gray-900 mb-2">{project.title}</h3>
                                        <p className="text-gray-600 mb-4">{project.description}</p>
                                        <a
                                            href={project.link}
                                            className="inline-flex items-center text-blue-600 hover:text-blue-800 transition duration-300"
                                        >
                                            View Project <ExternalLink className="ml-2 h-4 w-4" />
                                        </a>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Contact Section */}
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">Get in Touch</h2>
                    <p className="text-gray-600 mb-6">Interested in collaborating? Feel free to reach iut.</p>
                    <button
                        onClick={handleToContact}
                        className="inline-flex items-center rounded-full bg-blue-600 px-6 py-3 font-medium text-white transition duration-300 hover:bg-blue-700"
                    >
                        Contact Us
                    </button>
                </div>
            </div>
        </section>
    );
};

export default TeamMemberPage;
