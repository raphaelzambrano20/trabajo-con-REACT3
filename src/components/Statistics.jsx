import React from 'react';

const Statistics = ({ incomes }) => {
  const calculateStats = () => {
    if (incomes.length === 0) {
      return {
        total: 0,
        average: 0,
        byCategory: {},
        thisMonth: 0
      };
    }

    const total = incomes.reduce((sum, income) => sum + income.amount, 0);
    const average = total / incomes.length;

    // Calcular por categoría
    const byCategory = incomes.reduce((acc, income) => {
      acc[income.category] = (acc[income.category] || 0) + income.amount;
      return acc;
    }, {});

    // Calcular ingresos del mes actual
    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();
    const thisMonth = incomes
      .filter(income => {
        const incomeDate = new Date(income.date);
        return incomeDate.getMonth() === currentMonth && incomeDate.getFullYear() === currentYear;
      })
      .reduce((sum, income) => sum + income.amount, 0);

    return { total, average, byCategory, thisMonth };
  };

  const stats = calculateStats();

  const categories = {
    salary: { label: '💼 Salario', color: 'bg-blue-50 border-blue-200' },
    freelance: { label: '💻 Freelance', color: 'bg-green-50 border-green-200' },
    investment: { label: '📈 Inversión', color: 'bg-purple-50 border-purple-200' },
    bonus: { label: '🎁 Bonus', color: 'bg-yellow-50 border-yellow-200' },
    other: { label: '🔄 Otro', color: 'bg-gray-50 border-gray-200' }
  };

  if (incomes.length === 0) {
    return null;
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800 text-center">
        📊 Estadísticas
      </h2>
      
      {/* Estadísticas generales */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="card text-center">
          <div className="text-3xl mb-2">💰</div>
          <h3 className="text-lg font-semibold text-gray-600">Total</h3>
          <p className="text-2xl font-bold text-green-600">
            ${stats.total.toLocaleString('es-ES', { minimumFractionDigits: 2 })}
          </p>
        </div>
        
        <div className="card text-center">
          <div className="text-3xl mb-2">📊</div>
          <h3 className="text-lg font-semibold text-gray-600">Promedio</h3>
          <p className="text-2xl font-bold text-blue-600">
            ${stats.average.toLocaleString('es-ES', { minimumFractionDigits: 2 })}
          </p>
        </div>
        
        <div className="card text-center">
          <div className="text-3xl mb-2">📅</div>
          <h3 className="text-lg font-semibold text-gray-600">Este Mes</h3>
          <p className="text-2xl font-bold text-purple-600">
            ${stats.thisMonth.toLocaleString('es-ES', { minimumFractionDigits: 2 })}
          </p>
        </div>
      </div>

      {/* Estadísticas por categoría */}
      <div className="card">
        <h3 className="text-xl font-semibold text-gray-800 mb-4 text-center">
          📋 Ingresos por Categoría
        </h3>
        <div className="space-y-3">
          {Object.entries(stats.byCategory).map(([category, amount]) => {
            const categoryInfo = categories[category] || categories.other;
            const percentage = ((amount / stats.total) * 100).toFixed(1);
            
            return (
              <div key={category} className={`p-4 rounded-lg border-2 ${categoryInfo.color}`}>
                <div className="flex justify-between items-center mb-2">
                  <span className="font-semibold">{categoryInfo.label}</span>
                  <span className="text-sm text-gray-600">{percentage}%</span>
                </div>
                <div className="flex justify-between items-center">
                  <div className="w-full bg-gray-200 rounded-full h-2 mr-3">
                    <div 
                      className="bg-primary-500 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${percentage}%` }}
                    ></div>
                  </div>
                  <span className="text-lg font-bold">
                    ${amount.toLocaleString('es-ES', { minimumFractionDigits: 2 })}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Statistics;