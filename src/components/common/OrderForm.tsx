import React, { useState } from 'react';
import { storeOrder } from '../../supabase-service';
import { useNotification } from '../../contexts/NotificationContext';

export const OrderForm: React.FC = () => {
  const { showNotification } = useNotification();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    item: 'SafeStay Monthly Support',
    quantity: 1,
    notes: ''
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      await storeOrder({
        full_name: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        item: formData.item,
        quantity: Number(formData.quantity),
        amount: Number(formData.quantity) * 100,
        notes: formData.notes,
        status: 'pending'
      });
      showNotification('Checkout order saved successfully to Supabase! 🎉', 'success');
      setFormData({ fullName: '', email: '', phone: '', item: 'SafeStay Monthly Support', quantity: 1, notes: '' });
    } catch (error) {
      console.error('Error saving checkout order', error);
      showNotification('Could not save order. Please try again.', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-lg max-w-2xl mx-auto">
      <h3 className="text-2xl font-black text-slate-900 mb-4">Quick Order Form</h3>
      <p className="text-sm text-slate-500 mb-6">Submit checkout details and store them in your Supabase orders table.</p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <input
            required
            value={formData.fullName}
            onChange={e => setFormData({ ...formData, fullName: e.target.value })}
            className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-orange-500 text-sm"
            placeholder="Full Name"
          />
          <input
            required
            type="email"
            value={formData.email}
            onChange={e => setFormData({ ...formData, email: e.target.value })}
            className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-orange-500 text-sm"
            placeholder="Email"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <input
            required
            value={formData.phone}
            onChange={e => setFormData({ ...formData, phone: e.target.value })}
            className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-orange-500 text-sm"
            placeholder="Phone"
          />
          <select
            value={formData.item}
            onChange={e => setFormData({ ...formData, item: e.target.value })}
            className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-orange-500 text-sm"
          >
            <option>SafeStay Monthly Support</option>
            <option>Room Reservation</option>
            <option>Verification Premium</option>
            <option>Other</option>
          </select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <input
            required
            type="number"
            min={1}
            value={formData.quantity}
            onChange={e => setFormData({ ...formData, quantity: Number(e.target.value) })}
            className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-orange-500 text-sm"
            placeholder="Quantity"
          />
          <input
            value={formData.notes}
            onChange={e => setFormData({ ...formData, notes: e.target.value })}
            className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-orange-500 text-sm"
            placeholder="Notes (optional)"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 bg-orange-500 text-white rounded-xl font-bold hover:bg-orange-600 transition-all disabled:opacity-60"
        >
          {loading ? 'Saving...' : 'Save Checkout Order'}
        </button>
      </form>
    </div>
  );
};
