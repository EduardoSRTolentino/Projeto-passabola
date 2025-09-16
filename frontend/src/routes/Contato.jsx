import React from 'react';
import { MessageCircle, List } from 'lucide-react';

const Contato = () => (
  <div className="min-h-screen p-8 bg-gradient-to-br from-indigo-800 to-purple-900 text-white font-inter flex flex-col items-center justify-center">
    <div className="bg-white bg-opacity-10 backdrop-blur-lg rounded-3xl p-8 w-full max-w-xl text-center shadow-xl">
      <h1 className="text-4xl md:text-5xl font-bold mb-4">Fale Conosco</h1>
      <p className="text-lg mb-6 opacity-80">
        Estamos ansiosos para ouvir de você!
      </p>
      <div className="space-y-6 text-left">
        <div className="flex items-start">
          <MessageCircle className="w-6 h-6 text-pink-400 mt-1 mr-4 flex-shrink-0" />
          <div>
            <h2 className="text-xl font-semibold">E-mail</h2>
            <p>contato@passaabola.com.br</p>
          </div>
        </div>
        <div className="flex items-start">
          <List className="w-6 h-6 text-pink-400 mt-1 mr-4 flex-shrink-0" />
          <div>
            <h2 className="text-xl font-semibold">Redes Sociais</h2>
            <p>
              <a href="#" className="underline">Instagram</a>, <a href="#" className="underline">Facebook</a>, <a href="#" className="underline">Twitter</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default Contato;