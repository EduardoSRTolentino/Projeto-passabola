import React from 'react';
import { Home, Users, MessageCircle, Info } from 'lucide-react';

const NavButton = ({ icon: Icon, label, active, onClick }) => (
  <button
    onClick={onClick}
    className={`flex flex-col items-center justify-center p-2 rounded-xl transition-colors duration-200 ${
      active ? 'bg-white/20' : 'hover:bg-white/10'
    }`}
  >
    <Icon className="w-6 h-6 text-white" />
    <span className="text-white text-xs mt-1 font-semibold">{label}</span>
  </button>
);

const Footer = ({ currentPage, setCurrentPage }) => {
  return (
    <div className="fixed bottom-0 left-0 w-full bg-indigo-900 bg-opacity-80 backdrop-blur-lg border-t border-white/20 p-2 md:p-4 shadow-top z-50">
      <nav className="flex justify-around">
        <NavButton
          icon={Home}
          label="Home"
          active={currentPage === 'Home'}
          onClick={() => setCurrentPage('Home')}
        />
        <NavButton
          icon={Users}
          label="Campeonatos"
          active={currentPage === 'Campeonatos'}
          onClick={() => setCurrentPage('Campeonatos')}
        />
        <NavButton
          icon={MessageCircle}
          label="Contato"
          active={currentPage === 'Contato'}
          onClick={() => setCurrentPage('Contato')}
        />
        <NavButton
          icon={Info}
          label="Sobre"
          active={currentPage === 'Sobre'}
          onClick={() => setCurrentPage('Sobre')}
        />
      </nav>
    </div>
  );
};

export default Footer;