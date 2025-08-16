import React from 'react';
import IncomeCard from './IncomeCard';

const IncomeList = ({ incomes, onDeleteIncome }) => {
  if (incomes.length === 0) {
    return (
      <div className="card text-center py-12">
        <div className="text-6xl mb-4">📊</div>
        <h3 className="text-xl font-semibold text-gray-600 mb-2">
          No hay ingresos registrados
        </h3>
        <p className="text-gray-500">
          Comienza agregando tu primer ingreso usando el formulario arriba
        </p>
      </div>
    );
  }

  // Ordenar ingresos por fecha (más recientes primero)
  const sortedIncomes = [...incomes].sort((a, b) => new Date(b.date) - new Date(a.date));

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
        📋 Historial de Ingresos ({incomes.length})
      </h2>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {sortedIncomes.map(income => (
          <IncomeCard
            key={income.id}
            income={income}
            onDelete={onDeleteIncome}
          />
        ))}
      </div>
    </div>
  );
};

export default IncomeList;