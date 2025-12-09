import React, { useState } from 'react';
import './Navbar.css';
import menu_icon from '../../Assets/menu.png';
import search_icon from '../../Assets/search.png';
import upload_icon from '../../Assets/upload.png';
import more_icon from '../../Assets/more.png';
import notifications_icon from '../../Assets/notification.png';
import profile_icon from '../../Assets/jack.png';
import { Link, useNavigate } from 'react-router-dom';
import { FaYoutube, FaMicrophone } from 'react-icons/fa';

const Navbar = ({ setSidebar }) => {

    const [searchQuery, setSearchQuery] = useState("");
    const [listening, setListening] = useState(false);
    const navigate = useNavigate();

    const handleSearch = () => {
        if (searchQuery.trim() === "") return;
        navigate(`/search/${searchQuery}`);
    };

    const handleKeyPress = (e) => {
        if (e.key === "Enter") {
            handleSearch();
        }
    };

    const startVoiceSearch = () => {
        if (!("webkitSpeechRecognition" in window)) {
            alert("Voice search is not supported on this browser");
            return;
        }

        const recognition = new window.webkitSpeechRecognition();
        recognition.continuous = false;

        // 🟩 SUPPORT FOR MULTIPLE LANGUAGES
        recognition.lang = "en-US, ur-PK, hi-IN";

        recognition.interimResults = false;

        recognition.start();
        setListening(true);

        recognition.onresult = (event) => {
            const voiceText = event.results[0][0].transcript;
            setSearchQuery(voiceText);
            navigate(`/search/${voiceText}`);
        };

        recognition.onerror = () => {
            setListening(false);
        };

        recognition.onend = () => {
            setListening(false);
        };
    };

    return (
        <nav className='flex-nav flex-div'>
            <div className='nav-left flex-div'>
                <img
                    className='menu_icon'
                    onClick={() => setSidebar(prev => !prev)}
                    src={menu_icon}
                    alt=""
                />

                <Link className='logo' to='/'>
                    <FaYoutube size={32} color="red" />
                    <span className="logo-text">YouTube</span>
                </Link>
            </div>

            <div className="nav-middle flex-div">
                <div className="search-box flex-div">
                    <input
                        type="text"
                        placeholder={listening ? "Listening..." : "Search"}
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        onKeyDown={handleKeyPress}
                    />

                    <img
                        src={search_icon}
                        alt=""
                        onClick={handleSearch}
                        style={{ cursor: "pointer" }}
                    />

                    <div
                        className={`mic-container ${listening ? "pulse" : ""}`}
                        onClick={startVoiceSearch}
                    >
                        <FaMicrophone size={20} color={listening ? "red" : "black"} />
                    </div>
                </div>
            </div>

            <div className="nav-right flex-div">
                <img src={upload_icon} alt="" />
                <img src={more_icon} alt="" />
                <img src={notifications_icon} alt="" />
                <img src={profile_icon} className='user-icon' alt="" />
            </div>
        </nav>
    );
};

export default Navbar;
