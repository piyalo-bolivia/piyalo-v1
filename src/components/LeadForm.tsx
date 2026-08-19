'use client';

import { useState } from 'react';
import { MapPinIcon, PhoneIcon, UserIcon } from '@heroicons/react/24/outline';

interface LeadFormProps {
  serviceName: string;
}

export function LeadForm({ serviceName }: LeadFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    reference: '',
    urgency: 'medium'
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Create lead object
    const leadData = {
      service: serviceName,
      name: formData.name,
      phone: formData.phone,
      address: formData.address,
      reference: formData.reference,
      urgency: formData.urgency,
      created_at: new Date().toISOString()
    };

    try {
      // Send lead to API
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(leadData),
      });

      if (response.ok) {
        alert('¡Tu solicitud ha sido enviada! Un técnico se pondrá en contacto contigo pronto.');
        setFormData({
          name: '',
          phone: '',
          address: '',
          reference: '',
          urgency: 'medium'
        });
      } else {
        alert('Hubo un error al enviar tu solicitud. Por favor, inténtalo de nuevo.');
      }
    } catch (error) {
      console.error('Error submitting lead:', error);
      alert('Hubo un error al enviar tu solicitud. Por favor, inténtalo de nuevo.');
    }
  };

  return (
    <div className="mt-6 bg-blue-50 rounded-lg p-4 border border-blue-200">
      <h3 className="font-medium text-blue-900 mb-2">¿Necesitas este servicio?</h3>
      <p className="text-blue-800 text-sm mb-3">
        Déjanos tu información para que te contactemos con los mejores técnicos
      </p>
      <form onSubmit={handleSubmit} className="space-y-3">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
            Nombre completo
          </label>
          <div className="relative">
            <UserIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              id="name"
              required
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 text-sm"
              placeholder="Tu nombre completo"
            />
          </div>
        </div>
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
            Teléfono
          </label>
          <div className="relative">
            <PhoneIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="tel"
              id="phone"
              required
              value={formData.phone}
              onChange={(e) => setFormData({...formData, phone: e.target.value})}
              className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 text-sm"
              placeholder="+591 XXX XXX XX"
            />
          </div>
        </div>
        <div>
          <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
            Dirección exacta
          </label>
          <div className="relative">
            <MapPinIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              id="address"
              required
              value={formData.address}
              onChange={(e) => setFormData({...formData, address: e.target.value})}
              className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 text-sm"
              placeholder="Calle, número, barrio..."
            />
          </div>
        </div>
        <div>
          <label htmlFor="reference" className="block text-sm font-medium text-gray-700 mb-1">
            Referencia (opcional)
          </label>
          <input
            type="text"
            id="reference"
            value={formData.reference}
            onChange={(e) => setFormData({...formData, reference: e.target.value})}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 text-sm"
            placeholder="Referencia para encontrar tu casa"
          />
        </div>
        <div>
          <label htmlFor="urgency" className="block text-sm font-medium text-gray-700 mb-1">
            Urgencia
          </label>
          <select
            id="urgency"
            value={formData.urgency}
            onChange={(e) => setFormData({...formData, urgency: e.target.value})}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 text-sm"
          >
            <option value="low">Baja</option>
            <option value="medium">Media</option>
            <option value="high">Alta</option>
          </select>
        </div>
        <button 
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg text-sm flex items-center justify-center"
        >
          <MapPinIcon className="w-4 h-4 mr-2" />
          Enviar solicitud
        </button>
      </form>
    </div>
  );
}
