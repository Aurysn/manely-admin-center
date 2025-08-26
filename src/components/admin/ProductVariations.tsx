'use client';

import { useState } from 'react';
import { Plus, Trash2, Edit } from 'lucide-react';

interface ProductVariation {
  id?: string;
  name: string;
  value: string;
  price?: number;
  sku?: string;
  inventory: number;
  weight?: number;
}

interface ProductVariationsProps {
  variations: ProductVariation[];
  onChange: (variations: ProductVariation[]) => void;
}

export default function ProductVariations({ variations, onChange }: ProductVariationsProps) {
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  const addVariation = () => {
    const newVariation: ProductVariation = {
      name: '',
      value: '',
      price: 0,
      sku: '',
      inventory: 0,
      weight: 0,
    };
    onChange([...variations, newVariation]);
  };

  const updateVariation = (index: number, field: keyof ProductVariation, value: any) => {
    const updatedVariations = [...variations];
    updatedVariations[index] = { ...updatedVariations[index], [field]: value };
    onChange(updatedVariations);
  };

  const removeVariation = (index: number) => {
    const updatedVariations = variations.filter((_, i) => i !== index);
    onChange(updatedVariations);
  };

  const startEditing = (index: number) => {
    setEditingIndex(index);
  };

  const stopEditing = () => {
    setEditingIndex(null);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium text-gray-900">Product Variations</h3>
        <button
          type="button"
          onClick={addVariation}
          className="flex items-center space-x-2 px-3 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          <Plus className="h-4 w-4" />
          <span>Add Variation</span>
        </button>
      </div>

      {variations.length === 0 ? (
        <p className="text-gray-500 text-center py-8">No variations added yet.</p>
      ) : (
        <div className="space-y-4">
          {variations.map((variation, index) => (
            <div key={index} className="border border-gray-200 rounded-lg p-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Attribute Name
                  </label>
                  <input
                    type="text"
                    value={variation.name}
                    onChange={(e) => updateVariation(index, 'name', e.target.value)}
                    placeholder="e.g., Size, Color"
                    className="w-full border border-gray-300 rounded-md px-3 py-2"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Value
                  </label>
                  <input
                    type="text"
                    value={variation.value}
                    onChange={(e) => updateVariation(index, 'value', e.target.value)}
                    placeholder="e.g., Large, Red"
                    className="w-full border border-gray-300 rounded-md px-3 py-2"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Price
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    value={variation.price || ''}
                    onChange={(e) => updateVariation(index, 'price', parseFloat(e.target.value) || 0)}
                    placeholder="0.00"
                    className="w-full border border-gray-300 rounded-md px-3 py-2"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    SKU
                  </label>
                  <input
                    type="text"
                    value={variation.sku || ''}
                    onChange={(e) => updateVariation(index, 'sku', e.target.value)}
                    placeholder="SKU"
                    className="w-full border border-gray-300 rounded-md px-3 py-2"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Inventory
                  </label>
                  <input
                    type="number"
                    value={variation.inventory}
                    onChange={(e) => updateVariation(index, 'inventory', parseInt(e.target.value) || 0)}
                    placeholder="0"
                    className="w-full border border-gray-300 rounded-md px-3 py-2"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Weight (kg)
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    value={variation.weight || ''}
                    onChange={(e) => updateVariation(index, 'weight', parseFloat(e.target.value) || 0)}
                    placeholder="0.00"
                    className="w-full border border-gray-300 rounded-md px-3 py-2"
                  />
                </div>
              </div>

              <div className="flex justify-end space-x-2 mt-4">
                <button
                  type="button"
                  onClick={() => removeVariation(index)}
                  className="flex items-center space-x-1 px-3 py-1 text-red-600 hover:text-red-700"
                >
                  <Trash2 className="h-4 w-4" />
                  <span>Remove</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
