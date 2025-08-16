import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import IncomeForm from './components/IncomeForm';
import IncomeList from './components/IncomeList';
import Statistics from './components/Statistics';

function App() {
  const [incomes, setIncomes] = useState([]);

  // Cargar datos del localStorage al iniciar
  useEffect(() => {
    const savedIncomes = localStorage.getItem('personal-incomes');
    if (savedIncomes) {
      setIncomes(JSON.parse(savedIncomes));
    }
  }, []);

  // Guardar en localStorage cada vez que cambien los ingresos
  useEffect(() => {
    localStorage.setItem('personal-incomes', JSON.stringify(incomes));
  }, [incomes]);

  const handleAddIncome = (newIncome) => {
    setIncomes(prevIncomes => [...prevIncomes, newIncome]);
  };

  const handleDeleteIncome = (incomeId) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar este ingreso?')) {
      setIncomes(prevIncomes => prevIncomes.filter(income => income.id !== incomeId));
    }
  };

  const totalIncome = incomes.reduce((total, income) => total + income.amount, 0);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header totalIncome={totalIncome} />
      
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Formulario */}
          <div className="mb-8">
            <IncomeForm onAddIncome={handleAddIncome} />
          </div>

          {/* Estadísticas */}
          {incomes.length > 0 && (
            <div className="mb-8">
              <Statistics incomes={incomes} />
            </div>
          )}

          {/* Lista de ingresos */}
          <div>
            <IncomeList 
              incomes={incomes} 
              onDeleteIncome={handleDeleteIncome} 
            />
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-6 mt-12">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-300">
            💡 Aplicación educativa - Aprende React, Props y State
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;