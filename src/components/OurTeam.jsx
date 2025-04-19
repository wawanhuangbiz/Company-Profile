import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Search } from "lucide-react";
import { useState, useEffect } from "react";
import teamData from "../data/teamData"; // Ensure this path is correct
import mainData from "../data/mainData.json";
import './OurTeam.css'; // Import the CSS file

const OurTeam = ({ selectedLanguage }) => {
    const [activeFilter, setActiveFilter] = useState("All");
    const [searchTerm, setSearchTerm] = useState("");
    const [filteredTeams, setFilteredTeams] = useState([]);
    const [flippedCards, setFlippedCards] = useState({}); // Object to track flipped state


    const handleCardClick = (id) => {
        setFlippedCards((prev) => ({
            ...prev,
            [id]: !prev[id], // Toggle the flipped state for the clicked card
        }));
    };

    const teams = teamData[selectedLanguage] || [];

    const data = mainData[selectedLanguage]?.ourteam || {};

    useEffect(() => {
        const filtered = teams.filter((team) => {
            const matchesCategory = activeFilter === "All" || team.role === activeFilter;
            const matchesSearch = team.name.toLowerCase().includes(searchTerm.toLowerCase());
            return matchesCategory && matchesSearch;
        });
        setFilteredTeams(filtered);
    }, [activeFilter, searchTerm, teams]);

    return (
        <section id="our-team" className="bg-gray-50 py-20">
            <div className="container mx-auto px-4">
                <div className="mb-16 text-center">
                    <h2 className="text-3xl font-custom font-bold text-gray-900">{data?.heading}</h2>
                    <p className="mx-auto max-w-2xl text-lg font-custom text-gray-600">{data?.subheading}</p>
                </div>

                <div className="mb-12 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search member..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full rounded-lg border border-gray-200 bg-white py-2 pl-10 pr-4 text-gray-600 placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 md:w-80"
                        />
                    </div>
                </div>

                <div className="grid grid-cols-3 gap-8 md:grid-cols-2 lg:grid-cols-3 small-screen">
                    <AnimatePresence>
                        {filteredTeams.map((team) => (
                            <motion.div className="card-container" key={team.id}>
                                <div className={`card ${flippedCards[team.id] ? "flipped" : ""}`} onClick={() => handleCardClick(team.id)}>
                                    <div className="card-front">
                                        <img src={team.image} alt={team.name} className="w-full h-48 object-cover rounded-t-lg" />
                                        <div className="p-4">
                                            <h3 className="text-xl font-custom font-bold">{team.name}</h3>
                                            <p className="text-gray-600 font-custom">{team.role}</p>
                                        </div>
                                    </div>
                                    <div className="card-back">
                                        <div className="p-4">
                                            <p className="text-gray-800 font-bold">"{team.quote}"</p>
                                            <p className="text-gray-600">{team.intro}</p>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>
            </div>
        </section>
    );
};

export default OurTeam;
