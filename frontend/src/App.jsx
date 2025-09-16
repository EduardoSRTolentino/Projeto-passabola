import React, { useState, useEffect } from 'react';
import HomeContent from './routes/Home';
import CampeonatosContent from './routes/Campeonatos';
import ContatoContent from './routes/Contato';
import SobreContent from './routes/Sobre';
import Footer from './components/Footer';
import { Loader } from 'lucide-react';

export const App = () => {
  const [currentPage, setCurrentPage] = useState('Home');
  const [user, setUser] = useState(null);
  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    try {
      const storedUserData = localStorage.getItem('userData');
      if (storedUserData) {
        const parsedData = JSON.parse(storedUserData);
        setUserData(parsedData);
        setUser({ uid: parsedData.uid });
      }
    } catch (e) {
      console.error("Erro ao carregar dados do localStorage: ", e);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleRegister = (newUserData) => {
    localStorage.setItem('userData', JSON.stringify(newUserData));
    setUserData(newUserData);
    setUser({ uid: newUserData.uid });
  };

  const handleLogout = () => {
    localStorage.removeItem('userData');
    setUserData(null);
    setUser(null);
  };

  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
          <Loader className="w-12 h-12 animate-spin text-purple-400" />
          <p className="mt-4 text-xl">Carregando...</p>
        </div>
      );
    }
    switch (currentPage) {
      case 'Home':
        return <HomeContent user={user} userData={userData} onLogout={handleLogout} onRegister={handleRegister} />;
      case 'Campeonatos':
        return <CampeonatosContent user={user} userData={userData} />;
      case 'Contato':
        return <ContatoContent />;
      case 'Sobre':
        return <SobreContent />;
      default:
        return <HomeContent user={user} userData={userData} onLogout={handleLogout} onRegister={handleRegister} />;
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-900 font-sans">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap');
        body {
          font-family: 'Inter', sans-serif;
        }
        .animate-fade-in-down {
          animation: fadeInDown 0.8s ease-out forwards;
        }
        .animate-fade-in-up {
          animation: fadeInUp 0.8s ease-out forwards;
        }
        @keyframes fadeInDown {
          from { opacity: 0; transform: translateY(-20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
      <script src="https://cdn.tailwindcss.com"></script>
      <div className="flex-1 overflow-auto">
        {renderContent()}
      </div>
      <Footer currentPage={currentPage} setCurrentPage={setCurrentPage} />
    </div>
  );
};

export default App;