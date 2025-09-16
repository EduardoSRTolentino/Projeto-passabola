import React, { useState, useEffect } from 'react';
import { PlusCircle, AlertCircle, CheckCircle, Shield, User } from 'lucide-react';

const Campeonatos = ({ user, userData }) => {
  const [championships, setChampionships] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showRegistrationChoice, setShowRegistrationChoice] = useState(false);
  const [isIndividualRegistration, setIsIndividualRegistration] = useState(false);
  const [selectedChampionship, setSelectedChampionship] = useState(null);
  const [newTeamName, setNewTeamName] = useState('');
  const [newPlayers, setNewPlayers] = useState('');
  const [showFailMessage, setShowFailMessage] = useState(false);
  const [failMessage, setFailMessage] = useState('');
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    const storedChampionships = localStorage.getItem('championships');
    if (storedChampionships) {
      setChampionships(JSON.parse(storedChampionships));
    } else {
      const sampleChampionships = [
        {
          id: 'champ-1',
          name: "Campeonato de Verão 2025",
          description: "Primeiro campeonato do ano, com times de todo o Brasil.",
          date: "15/01/2025",
          location: "São Paulo, SP",
          teams: []
        },
        {
          id: 'champ-2',
          name: "Copa Passa a Bola",
          description: "Torneio especial de verão com prêmios incríveis.",
          date: "22/02/2025",
          location: "Rio de Janeiro, RJ",
          teams: []
        },
        {
          id: 'champ-3',
          name: "Torneio de Inverno",
          description: "Campeonato amigável para times em formação.",
          date: "10/06/2025",
          location: "Curitiba, PR",
          teams: []
        }
      ];
      localStorage.setItem('championships', JSON.stringify(sampleChampionships));
      setChampionships(sampleChampionships);
    }
  }, []);

  const saveChampionships = (updatedChampionships) => {
    localStorage.setItem('championships', JSON.stringify(updatedChampionships));
    setChampionships(updatedChampionships);
  };

  const isUserAlreadyRegistered = (championship, userId) => {
    return championship.teams.some(team =>
      team.players.some(player => player.uid === userId)
    );
  };

  const handleOpenRegistrationModal = (championship) => {
    setSelectedChampionship(championship);
    setShowRegistrationChoice(true);
    setShowModal(true);
  };

  const handleRegisterIndividual = (e) => {
    e.preventDefault();
    if (!userData || !userData.name) {
      setFailMessage("Você precisa se cadastrar na página inicial primeiro.");
      setShowFailMessage(true);
      setTimeout(() => setShowFailMessage(false), 3000);
      return;
    }
    
    const currentChampIndex = championships.findIndex(c => c.id === selectedChampionship.id);
    if (currentChampIndex === -1) return;

    const currentChamp = championships[currentChampIndex];
    if (isUserAlreadyRegistered(currentChamp, user.uid)) {
      setFailMessage("Você já está inscrito neste campeonato.");
      setShowFailMessage(true);
      setTimeout(() => setShowFailMessage(false), 3000);
      setShowModal(false);
      return;
    }

    if (currentChamp.teams.length >= 8) {
      setFailMessage("Este campeonato já atingiu o número máximo de 8 times.");
      setShowFailMessage(true);
      setTimeout(() => setShowFailMessage(false), 3000);
      setShowModal(false);
      return;
    }

    const updatedChampionships = [...championships];
    const updatedChamp = updatedChampionships[currentChampIndex];

    const availableTeams = updatedChamp.teams.filter(team => team.players.length < 15);

    let teamToJoin;

    if (availableTeams.length > 0) {
        const randomIndex = Math.floor(Math.random() * availableTeams.length);
        teamToJoin = availableTeams[randomIndex];
        teamToJoin.players.push({ name: userData.name, uid: user.uid });
        setSuccessMessage(`Você foi adicionado ao time "${teamToJoin.teamName}"!`);
    } else {
        const autoTeamCount = updatedChamp.teams.filter(t => t.teamName.includes('Time Automático')).length;
        const newTeamName = `Time Automático ${autoTeamCount + 1}`;
        const newTeam = {
          teamName: newTeamName,
          players: [{ name: userData.name, uid: user.uid }],
          registeredBy: user.uid
        };
        updatedChamp.teams.push(newTeam);
        setSuccessMessage(`Não havia times incompletos. Um novo time, "${newTeamName}", foi criado para você!`);
    }

    saveChampionships(updatedChampionships);
    setShowModal(false);
    setShowSuccessMessage(true);
    setTimeout(() => setShowSuccessMessage(false), 5000);
  };

  const handleRegisterTeam = (e) => {
    e.preventDefault();
    if (!userData || !userData.name) {
      setFailMessage("Você precisa se cadastrar na página inicial primeiro.");
      setShowFailMessage(true);
      setTimeout(() => setShowFailMessage(false), 3000);
      return;
    }
    
    const currentChampIndex = championships.findIndex(c => c.id === selectedChampionship.id);
    if (currentChampIndex === -1) return;

    const currentChamp = championships[currentChampIndex];
    if (isUserAlreadyRegistered(currentChamp, user.uid)) {
      setFailMessage("Você já está inscrito neste campeonato.");
      setShowFailMessage(true);
      setTimeout(() => setShowFailMessage(false), 3000);
      setShowModal(false);
      return;
    }

    const playersList = newPlayers.split(',').map(p => p.trim()).filter(p => p.length > 0);
    const playersFormatted = playersList.map(p => ({ name: p, uid: crypto.randomUUID() }));
    
    if (playersFormatted.length > 15) {
      setFailMessage("O número máximo de jogadoras por time é 15.");
      setShowFailMessage(true);
      setTimeout(() => setShowFailMessage(false), 3000);
      return;
    }

    if (currentChamp.teams.length >= 8) {
      setFailMessage("Este campeonato já atingiu o número máximo de 8 times.");
      setShowFailMessage(true);
      setTimeout(() => setShowFailMessage(false), 3000);
      setShowModal(false);
      return;
    }
    
    const updatedChampionships = [...championships];
    const updatedChamp = updatedChampionships[currentChampIndex];

    const newTeam = {
      teamName: newTeamName,
      players: playersFormatted,
      registeredBy: user.uid
    };
    
    updatedChamp.teams.push(newTeam);
    saveChampionships(updatedChampionships);
    
    setNewTeamName('');
    setNewPlayers('');
    setShowModal(false);
    setSuccessMessage("Time inscrito com sucesso!");
    setShowSuccessMessage(true);
    setTimeout(() => setShowSuccessMessage(false), 5000);
  };

  const getBackgroundColor = (id) => {
    const colors = ['bg-indigo-600', 'bg-pink-600', 'bg-emerald-600', 'bg-amber-600', 'bg-sky-600'];
    const hash = id.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return colors[hash % colors.length];
  };

  return (
    <div className="min-h-screen p-6 pb-24 bg-gradient-to-br from-indigo-800 to-purple-900 text-white font-inter">
      <h1 className="text-4xl font-bold mb-8 text-center drop-shadow-lg">
        Campeonatos Ativos
      </h1>
      <div className="flex flex-col gap-6">
        {championships.length > 0 ? (
          championships.map((champ) => (
            <div
              key={champ.id}
              className={`rounded-2xl p-6 shadow-xl w-full transform transition-all duration-300 hover:shadow-2xl ${getBackgroundColor(champ.id)}`}
            >
              <h2 className="text-2xl font-bold mb-2">{champ.name}</h2>
              <p className="text-sm font-light mb-4 opacity-80">{champ.description}</p>
              <div className="flex justify-between items-center mb-4">
                <p className="font-semibold">Data: {champ.date}</p>
                <p className="font-semibold">Local: {champ.location}</p>
              </div>
              {userData ? (
                <button
                  onClick={() => handleOpenRegistrationModal(champ)}
                  className="w-full bg-white text-gray-800 font-bold py-3 rounded-xl shadow-lg transition-transform transform hover:scale-105 flex items-center justify-center"
                >
                  <PlusCircle className="w-5 h-5 mr-2" /> Inscrever
                </button>
              ) : (
                <div className="bg-red-500/20 text-white text-sm p-3 rounded-xl flex items-center justify-center space-x-2">
                  <AlertCircle className="w-5 h-5" />
                  <span>Cadastre-se na Home para se inscrever!</span>
                </div>
              )}
              
              {champ.teams && champ.teams.length > 0 && (
                <div className="mt-6 p-4 bg-white/10 rounded-xl">
                  <h3 className="text-lg font-bold mb-2">Times Inscritos ({champ.teams.length}/8):</h3>
                  <ul className="space-y-3">
                    {champ.teams.map((team, index) => (
                      <li key={index} className="flex flex-col p-3 bg-white/20 rounded-xl">
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-lg flex items-center"><Shield className="w-5 h-5 mr-2" /> {team.teamName}</span>
                          <span className="text-xs opacity-70">Por: {team.registeredBy.substring(0, 8)}...</span>
                        </div>
                        <div className="mt-2 text-sm">
                          <p className="font-semibold">Jogadoras ({team.players.length}/15):</p>
                          <ul className="list-disc list-inside space-y-1 mt-1">
                            {team.players.map((player, pIndex) => (
                              <li key={pIndex} className="flex items-center"><User className="w-4 h-4 mr-2" />{player.name}</li>
                            ))}
                          </ul>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))
        ) : (
          <div className="col-span-full text-center py-10">
            <p className="text-2xl font-light">Nenhum campeonato disponível no momento.</p>
          </div>
        )}
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-3xl p-8 w-full max-w-lg text-gray-800 transform scale-100 transition-transform duration-300">
            <h2 className="text-2xl font-bold mb-4">Inscrever em {selectedChampionship.name}</h2>
            {showRegistrationChoice ? (
              <div className="space-y-4">
                <p className="text-lg mb-4 text-center">Como você gostaria de se inscrever?</p>
                <div className="flex flex-col md:flex-row gap-4">
                  <button
                    onClick={() => { setIsIndividualRegistration(false); setShowRegistrationChoice(false); }}
                    className="flex-1 bg-purple-600 text-white font-bold py-4 px-6 rounded-xl shadow-lg transition-transform transform hover:scale-105"
                  >
                    Inscrever um Time Completo
                  </button>
                  <button
                    onClick={() => { setIsIndividualRegistration(true); setShowRegistrationChoice(false); }}
                    className="flex-1 bg-purple-600 text-white font-bold py-4 px-6 rounded-xl shadow-lg transition-transform transform hover:scale-105"
                  >
                    Inscrever-se Sozinho
                  </button>
                </div>
                <div className="mt-4 text-center">
                  <button onClick={() => setShowModal(false)} className="text-gray-500 hover:text-gray-700 font-bold py-2">Cancelar</button>
                </div>
              </div>
            ) : isIndividualRegistration ? (
              <form onSubmit={handleRegisterIndividual} className="space-y-4">
                <p className="mb-4 text-sm text-gray-600">Inscreva-se e seja adicionado a um time automaticamente.</p>
                <div className="flex justify-end space-x-4 mt-4">
                  <button
                    type="button"
                    onClick={() => {setShowModal(false); setShowRegistrationChoice(true);}}
                    className="bg-gray-200 text-gray-700 font-bold py-2 px-6 rounded-xl hover:bg-gray-300 transition-colors"
                  >
                    Voltar
                  </button>
                  <button
                    type="submit"
                    className="bg-purple-600 text-white font-bold py-2 px-6 rounded-xl hover:bg-purple-700 transition-colors"
                  >
                    Confirmar Inscrição
                  </button>
                </div>
              </form>
            ) : (
              <form onSubmit={handleRegisterTeam} className="space-y-4">
                <p className="mb-4 text-sm text-gray-600">Para se inscrever, use o e-mail que você cadastrou na página inicial.</p>
                <input
                  type="text"
                  placeholder="Nome do Time"
                  value={newTeamName}
                  onChange={(e) => setNewTeamName(e.target.value)}
                  required
                  className="w-full p-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-400"
                />
                <textarea
                  placeholder="Nomes das jogadoras (separados por vírgula)"
                  value={newPlayers}
                  onChange={(e) => setNewPlayers(e.target.value)}
                  required
                  rows="4"
                  className="w-full p-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-400"
                ></textarea>
                <div className="flex justify-end space-x-4 mt-4">
                  <button
                    type="button"
                    onClick={() => {setShowModal(false); setShowRegistrationChoice(true);}}
                    className="bg-gray-200 text-gray-700 font-bold py-2 px-6 rounded-xl hover:bg-gray-300 transition-colors"
                  >
                    Voltar
                  </button>
                  <button
                    type="submit"
                    className="bg-purple-600 text-white font-bold py-2 px-6 rounded-xl hover:bg-purple-700 transition-colors"
                  >
                    Confirmar Inscrição
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      {showFailMessage && (
        <div className="fixed bottom-24 left-1/2 transform -translate-x-1/2 p-4 rounded-xl bg-red-600 text-white flex items-center shadow-lg transition-opacity duration-300 z-50 animate-fade-in-up">
          <AlertCircle className="w-6 h-6 mr-2" />
          <span>{failMessage}</span>
        </div>
      )}
      {showSuccessMessage && (
        <div className="fixed bottom-24 left-1/2 transform -translate-x-1/2 p-4 rounded-xl bg-green-600 text-white flex items-center shadow-lg transition-opacity duration-300 z-50 animate-fade-in-up">
          <CheckCircle className="w-6 h-6 mr-2" />
          <span>{successMessage}</span>
        </div>
      )}
    </div>
  );
};

export default Campeonatos;