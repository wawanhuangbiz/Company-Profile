import { motion, AnimatePresence } from "framer-motion";
import { Search } from "lucide-react";
import { useState, useEffect } from "react";
import { supabase } from '../supabaseClient'; 
import mainData from "../data/mainData.json";
import './OurTeam.css';

const OurTeam = ({ selectedLanguage }) => {
    const [teams, setTeams] = useState([]); 
    const [loading, setLoading] = useState(true);
    const [activeFilter, setActiveFilter] = useState("All");
    const [searchTerm, setSearchTerm] = useState("");
    const [filteredTeams, setFilteredTeams] = useState([]);
    const [flippedCards, setFlippedCards] = useState({});

    // Fetch data dari Supabase
    const fetchTeams = async () => {
        try {
            setLoading(true);
            let { data, error } = await supabase
                .from('teamData') // Pastikan nama tabel di Supabase adalah 'teamData'
                .select('*')
                .order('id', { ascending: true });

            if (error) throw error;
            if (data) setTeams(data);
        } catch (error) {
            console.log('Error fetching teams:', error.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTeams();
    }, []);

    const handleCardClick = (id) => {
        setFlippedCards((prev) => ({
            ...prev,
            [id]: !prev[id],
        }));
    };

    // Ambil data heading dari JSON lokal
    const data = mainData[selectedLanguage]?.ourteam || {};

    // Logika Search dan Filter
    useEffect(() => {
        const filtered = teams.filter((team) => {
            const matchesCategory = activeFilter === "All" || team.role === activeFilter;
            const matchesSearch = (team.name || "").toLowerCase().includes(searchTerm.toLowerCase());
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

                {/* Search Bar */}
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

                {/* Logika Tampilan: Loading vs Content */}
                {loading ? (
                    <div className="text-center py-10 font-custom">Loading team members...</div>
                ) : (
                    <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                        <AnimatePresence>
                            {filteredTeams.map((team) => {
                                const isChinese = selectedLanguage === "zh";

                                return (
                                    <motion.div 
                                        className="card-container" 
                                        key={team.id}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, scale: 0.9 }}
                                    >
                                        <div 
                                            className={`card ${flippedCards[team.id] ? "flipped" : ""}`} 
                                            onClick={() => handleCardClick(team.id)}
                                        >
                                            {/* SISI DEPAN KARTU */}
                                            <div className="card-front text-center">
                                                <img 
                                                    src={team.image} 
                                                    alt={isChinese ? team.name_zh : team.name} 
                                                    className="w-full h-48 object-cover rounded-t-lg" 
                                                />
                                                <div className="p-4">
                                                    <h3 className="text-xl font-custom font-bold">
                                                        {isChinese ? (team.name_zh || team.name) : team.name}
                                                    </h3>
                                                    <p className="text-gray-600 font-custom">
                                                        {isChinese ? (team.role_zh || team.role) : team.role}
                                                    </p>
                                                </div>
                                            </div>

                                            {/* SISI BELAKANG KARTU */}
                                            <div className="card-back text-center">
                                                <div className="p-4 flex flex-col justify-center h-full">
                                                    <p className="text-gray-800 font-bold mb-2 font-custom">
                                                        "{isChinese ? (team.quote_zh || team.quote) : team.quote}"
                                                    </p>
                                                    <p className="text-gray-600 text-sm font-custom">
                                                        {isChinese ? (team.intro_zh || team.intro) : team.intro}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>
                                );
                            })}
                        </AnimatePresence>
                    </div>
                )}
            </div>
        </section>
    );
};

export default OurTeam;