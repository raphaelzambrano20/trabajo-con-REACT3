import React from 'react';

const IncomeCard = ({ income, onDelete }) => {
  const categories = {
    salary: { label: '💼 Salario', color: 'bg-blue-100 text-blue-800' },
    freelance: { label: '💻 Freelance', color: 'bg-green-100 text-green-800' },
    investment: { label: '📈 Inversión', color: 'bg-purple-100 text-purple-800' },
    bonus: { label: '🎁 Bonus', color: 'bg-yellow-100 text-yellow-800' },
    other: { label: '🔄 Otro', color: 'bg-gray-100 text-gray-800' }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const category = categories[income.category] || categories.other;

  return (
    <div className="card hover:shadow-md transition-shadow duration-200">
      <div className="flex justify-between items-start mb-3">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">
            {income.description}
          </h3>
          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${category.color}`}>
            {category.label}
          </span>
        </div>
        <button
          onClick={() => onDelete(income.id)}
          className="text-gray-400 hover:text-red-500 transition-colors duration-200 ml-2"
          title="Eliminar ingreso"
        >
          🗑️
        </button>
      </div>
      
      <div className="flex justify-between items-center">
        <span className="text-2xl font-bold text-green-600">
          ${income.amount.toLocaleString('es-ES', { minimumFractionDigits: 2 })}
        </span>
        <span className="text-sm text-gray-500">
          📅 {formatDate(income.date)}
        </span>
      </div>
    </div>
  );
};

export default IncomeCard;