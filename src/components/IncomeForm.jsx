import React, { useState } from 'react';

const IncomeForm = ({ onAddIncome }) => {
  const [formData, setFormData] = useState({
    description: '',
    amount: '',
    category: 'salary',
    date: new Date().toISOString().split('T')[0]
  });

  const [errors, setErrors] = useState({});

  const categories = [
    { value: 'salary', label: '💼 Salario', color: 'bg-blue-100 text-blue-800' },
    { value: 'freelance', label: '💻 Freelance', color: 'bg-green-100 text-green-800' },
    { value: 'investment', label: '📈 Inversión', color: 'bg-purple-100 text-purple-800' },
    { value: 'bonus', label: '🎁 Bonus', color: 'bg-yellow-100 text-yellow-800' },
    { value: 'other', label: '🔄 Otro', color: 'bg-gray-100 text-gray-800' }
  ];

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.description.trim()) {
      newErrors.description = 'La descripción es requerida';
    }
    
    if (!formData.amount || parseFloat(formData.amount) <= 0) {
      newErrors.amount = 'El monto debe ser mayor a 0';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      const newIncome = {
        id: Date.now(),
        ...formData,
        amount: parseFloat(formData.amount)
      };
      
      onAddIncome(newIncome);
      
      // Resetear formulario
      setFormData({
        description: '',
        amount: '',
        category: 'salary',
        date: new Date().toISOString().split('T')[0]
      });
      setErrors({});
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Limpiar error cuando el usuario empiece a escribir
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  return (
    <div className="card max-w-md mx-auto">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
        ➕ Agregar Nuevo Ingreso
      </h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Descripción
          </label>
          <input
            type="text"
            name="description"
            value={formData.description}
            onChange={handleChange}
            className={`input-field ${errors.description ? 'border-red-500' : ''}`}
            placeholder="Ej: Salario de enero"
          />
          {errors.description && (
            <p className="text-red-500 text-sm mt-1">{errors.description}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Monto ($)
          </label>
          <input
            type="number"
            name="amount"
            value={formData.amount}
            onChange={handleChange}
            className={`input-field ${errors.amount ? 'border-red-500' : ''}`}
            placeholder="0.00"
            step="0.01"
            min="0"
          />
          {errors.amount && (
            <p className="text-red-500 text-sm mt-1">{errors.amount}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Categoría
          </label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="input-field"
          >
            {categories.map(cat => (
              <option key={cat.value} value={cat.value}>
                {cat.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Fecha
          </label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className="input-field"
          />
        </div>

        <button type="submit" className="btn-primary w-full">
          💾 Guardar Ingreso
        </button>
      </form>
    </div>
  );
};

export default IncomeForm;