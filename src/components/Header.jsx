import React from 'react';

const Header = ({ totalIncome }) => {
  return (
    <header className="bg-gradient-to-r from-primary-500 to-primary-700 text-white py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-2">
          💰 Gestor de Ingresos Personales
        </h1>
        <p className="text-center text-primary-100 mb-4">
          Administra y visualiza tus ingresos de forma inteligente
        </p>
        <div className="text-center">
          <span className="text-lg">Total de ingresos: </span>
          <span className="text-2xl md:text-3xl font-bold">
            ${totalIncome.toLocaleString('es-ES', { minimumFractionDigits: 2 })}
          </span>
        </div>
      </div>
    </header>
  );
};

export default Header;