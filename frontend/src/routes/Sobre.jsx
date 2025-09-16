import React from 'react';
import { ChevronRight } from 'lucide-react';

const Sobre = () => (
    <div className="min-h-screen p-8 bg-gradient-to-br from-indigo-800 to-purple-900 text-white font-inter">
        <div className="bg-white bg-opacity-10 backdrop-blur-lg rounded-3xl p-8 w-full text-center shadow-xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Sobre a Passa a Bola</h1>
            <p className="text-lg font-light mb-8 opacity-80">
                Nossa missão e a paixão pelo futebol feminino.
            </p>
            <div className="text-left space-y-6">
                <div className="p-6 bg-white/10 rounded-2xl">
                    <h2 className="text-2xl font-bold mb-2 flex items-center"><ChevronRight className="w-6 h-6 mr-2" /> Nossa História</h2>
                    <p className="font-light">
                        A Passa a Bola nasceu da paixão e do desejo de impulsionar o futebol feminino no Brasil. Vimos a necessidade de criar uma plataforma dedicada a organizar campeonatos de alta qualidade, conectar comunidades e dar visibilidade às atletas.
                    </p>
                </div>
                <div className="p-6 bg-white/10 rounded-2xl">
                    <h2 className="text-2xl font-bold mb-2 flex items-center"><ChevronRight className="w-6 h-6 mr-2" /> Futebol Feminino</h2>
                    <p className="font-light">
                        O futebol feminino não é apenas um esporte, é uma força de mudança. Acreditamos que, ao fornecer um espaço profissional e divertido para a competição, estamos contribuindo para o crescimento do esporte, empoderando mulheres e meninas e construindo um futuro mais justo e igualitário.
                    </p>
                </div>
            </div>
        </div>
    </div>
);

export default Sobre;