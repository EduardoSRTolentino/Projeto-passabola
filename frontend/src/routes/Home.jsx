import React, { useState, useEffect } from 'react';
import { LogOut, Loader, CheckCircle, AlertCircle } from 'lucide-react';

const Home = ({ user, userData, onLogout, onRegister }) => {
  const [name, setName] = useState(userData?.name || '');
  const [age, setAge] = useState(userData?.age || '');
  const [email, setEmail] = useState(userData?.email || '');
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [showAgeError, setShowAgeError] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);

  useEffect(() => {
    if (userData) {
      setName(userData.name || '');
      setAge(userData.age || '');
      setEmail(userData.email || '');
    }
  }, [userData]);

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (parseInt(age) < 16) {
      setShowAgeError(true);
      setTimeout(() => setShowAgeError(false), 3000);
      return;
    }
    
    setShowAgeError(false);
    
    if (name && age && email) {
      setIsRegistering(true);
      try {
        const newUser = {
          name,
          age,
          email,
          uid: user?.uid || crypto.randomUUID(),
          createdAt: new Date().toISOString()
        };
        onRegister(newUser);
        setShowSuccessMessage(true);
        setTimeout(() => setShowSuccessMessage(false), 3000);
      } catch (error) {
        console.error("Erro ao salvar dados do usuário no localStorage:", error);
      } finally {
        setIsRegistering(false);
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8 bg-gradient-to-br from-indigo-800 to-purple-900 text-white font-inter">
      <div className="bg-white bg-opacity-10 backdrop-blur-lg rounded-3xl p-8 md:p-12 w-full max-w-2xl text-center shadow-2xl transition-all duration-300 transform hover:scale-[1.01]">
        <h1 className="text-4xl md:text-6xl font-extrabold mb-4 animate-fade-in-down drop-shadow-lg">
          Passa a Bola
        </h1>
        <p className="text-xl md:text-2xl font-light mb-8 animate-fade-in-up">
          Junte-se à revolução do futebol feminino. Inscreva-se em nossos campeonatos!
        </p>

        {!userData ? (
          <div className="space-y-4 text-left">
            <h2 className="text-2xl font-bold mb-4">Cadastro Rápido</h2>
            <form onSubmit={handleFormSubmit} className="bg-white/10 p-6 rounded-2xl border border-white/20 space-y-4">
              <p className="font-light mb-2">
                Preencha seus dados para receber as últimas notícias sobre nossos eventos e campeonatos.
              </p>
              <input
                type="text"
                placeholder="Seu nome"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full p-3 rounded-xl bg-white/20 text-white placeholder-white/80 focus:outline-none focus:ring-2 focus:ring-purple-400"
              />
              <input
                type="number"
                placeholder="Sua idade (mínimo de 16)"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                required
                className="w-full p-3 rounded-xl bg-white/20 text-white placeholder-white/80 focus:outline-none focus:ring-2 focus:ring-purple-400"
              />
              <input
                type="email"
                placeholder="Seu e-mail"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full p-3 rounded-xl bg-white/20 text-white placeholder-white/80 focus:outline-none focus:ring-2 focus:ring-purple-400"
              />
              <button
                type="submit"
                className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-6 rounded-xl transition-transform transform hover:scale-105 shadow-lg flex items-center justify-center"
                disabled={isRegistering}
              >
                {isRegistering ? (
                  <>
                    <Loader className="animate-spin mr-2" />
                    Cadastrando...
                  </>
                ) : (
                  'Cadastrar'
                )}
              </button>
            </form>
          </div>
        ) : (
          <div className="space-y-4 text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Bem-vindo(a), {userData?.name || 'Jogadora'}!</h2>
            <p className="text-lg font-light">Seu cadastro está completo. Você agora pode inscrever times em campeonatos!</p>
            <button
              onClick={onLogout}
              className="mt-4 bg-white text-gray-800 font-bold py-2 px-6 rounded-xl shadow-lg flex items-center justify-center mx-auto"
            >
              <LogOut className="w-5 h-5 mr-2" /> Sair
            </button>
          </div>
        )}

        <div className="mt-8 text-sm text-white/50">
          <p>Seu ID de Usuário:</p>
          <span className="break-all font-mono font-bold text-white/70">{user?.uid || 'N/A'}</span>
        </div>
      </div>

      {showSuccessMessage && (
        <div className="fixed bottom-24 left-1/2 transform -translate-x-1/2 p-4 rounded-xl bg-green-600 text-white flex items-center shadow-lg transition-opacity duration-300 z-50 animate-fade-in-up">
          <CheckCircle className="w-6 h-6 mr-2" />
          <span>Cadastro rápido feito com sucesso!</span>
        </div>
      )}
      {showAgeError && (
        <div className="fixed bottom-24 left-1/2 transform -translate-x-1/2 p-4 rounded-xl bg-red-600 text-white flex items-center shadow-lg transition-opacity duration-300 z-50 animate-fade-in-up">
          <AlertCircle className="w-6 h-6 mr-2" />
          <span>A idade mínima para cadastro é 16 anos.</span>
        </div>
      )}
    </div>
  );
};

export default Home;