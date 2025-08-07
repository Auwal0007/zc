import React, { useState } from 'react';
import { Plus, Edit, Trash2, Save, X, Upload } from 'lucide-react';
import { Product, InsertProduct, insertProductSchema } from '@shared/schema';
import { useQuery, useMutation } from '@tanstack/react-query';
import { apiRequest, queryClient } from '../lib/queryClient';

interface AdminPanelProps {}

const AdminPanel: React.FC<AdminPanelProps> = () => {
  const { data: products = [], isLoading } = useQuery<Product[]>({
    queryKey: ['api', 'products'],
  });
  const [isOpen, setIsOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [formData, setFormData] = useState<Partial<InsertProduct>>({
    name: '',
    price: '0',
    image: '',
    category: 'arabian',
    description: '',
    featured: false
  });

  const categories = [
    { value: 'arabian', label: 'Arabian Perfumes' },
    { value: 'english', label: 'English Perfumes' },
    { value: 'oil', label: 'Oil Perfumes' },
    { value: 'luxury', label: 'Luxury Collection' }
  ];

  const createMutation = useMutation({
    mutationFn: (product: InsertProduct) => apiRequest('/api/products', {
      method: 'POST',
      body: JSON.stringify(product),
    }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['api', 'products'] });
      handleCancel();
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, product }: { id: number; product: Partial<InsertProduct> }) => 
      apiRequest(`/api/products/${id}`, {
        method: 'PUT',
        body: JSON.stringify(product),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['api', 'products'] });
      handleCancel();
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: number) => apiRequest(`/api/products/${id}`, {
      method: 'DELETE',
    }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['api', 'products'] });
    },
  });

  const handleInputChange = (field: keyof InsertProduct, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    if (!formData.name || !formData.price || !formData.image) {
      alert('Please fill in all required fields (Name, Price, Image)');
      return;
    }

    const productData: InsertProduct = {
      name: formData.name!,
      price: formData.price!,
      image: formData.image!,
      category: formData.category!,
      description: formData.description || '',
      featured: formData.featured || false
    };

    if (editingProduct) {
      updateMutation.mutate({ id: editingProduct.id, product: productData });
    } else {
      createMutation.mutate(productData);
    }
  };

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setFormData(product);
    setIsAddingNew(false);
  };

  const handleDelete = (productId: number) => {
    if (confirm('Are you sure you want to delete this product?')) {
      deleteMutation.mutate(productId);
    }
  };

  const handleAddNew = () => {
    setEditingProduct(null);
    setFormData({
      name: '',
      price: '0',
      image: '',
      category: 'arabian',
      description: '',
      featured: false
    });
    setIsAddingNew(true);
  };

  const handleCancel = () => {
    setEditingProduct(null);
    setIsAddingNew(false);
    setFormData({
      name: '',
      price: '0',
      image: '',
      category: 'arabian',
      description: '',
      featured: false
    });
  };

  const formatPrice = (price: string) => {
    const numPrice = parseFloat(price);
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0,
    }).format(numPrice);
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed top-4 right-4 z-50 bg-burgundy-600 hover:bg-burgundy-700 text-white p-3 rounded-full shadow-lg transition-all duration-300"
        title="Admin Panel"
      >
        <Edit className="h-5 w-5" />
      </button>
    );
  }

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="bg-burgundy-600 text-white p-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold font-playfair">Product Management</h2>
          <button
            onClick={() => setIsOpen(false)}
            className="p-2 hover:bg-burgundy-700 rounded-full transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="flex h-[calc(90vh-88px)]">
          {/* Product List */}
          <div className="w-1/2 border-r border-gray-200 overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold">Products ({products.length})</h3>
                <button
                  onClick={handleAddNew}
                  className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
                >
                  <Plus className="h-4 w-4" />
                  <span>Add Product</span>
                </button>
              </div>

              {products.length === 0 ? (
                <div className="text-center py-12 text-gray-500">
                  <Upload className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>No products yet. Add your first product!</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {products.map((product) => (
                    <div
                      key={product.id}
                      className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                    >
                      <div className="flex items-start space-x-4">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-16 h-16 object-cover rounded-lg"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.src = 'https://images.pexels.com/photos/965989/pexels-photo-965989.jpeg?auto=compress&cs=tinysrgb&w=800';
                          }}
                        />
                        <div className="flex-1 min-w-0">
                          <h4 className="font-semibold text-gray-900 truncate">{product.name}</h4>
                          <p className="text-sm text-gray-600 capitalize">{product.category}</p>
                          <p className="text-lg font-bold text-burgundy-600">{formatPrice(product.price)}</p>
                          {product.featured && (
                            <span className="inline-block bg-gold-100 text-gold-800 text-xs px-2 py-1 rounded-full mt-1">
                              Featured
                            </span>
                          )}
                        </div>
                        <div className="flex space-x-2">
                          <button
                            onClick={() => handleEdit(product)}
                            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          >
                            <Edit className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => handleDelete(product.id)}
                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Form */}
          <div className="w-1/2 overflow-y-auto">
            {(editingProduct || isAddingNew) ? (
              <div className="p-6">
                <h3 className="text-lg font-semibold mb-6">
                  {editingProduct ? 'Edit Product' : 'Add New Product'}
                </h3>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Product Name *
                    </label>
                    <input
                      type="text"
                      value={formData.name || ''}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-burgundy-500 focus:border-transparent"
                      placeholder="Enter product name"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Price (₦) *
                    </label>
                    <input
                      type="number"
                      value={formData.price || ''}
                      onChange={(e) => handleInputChange('price', parseInt(e.target.value) || 0)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-burgundy-500 focus:border-transparent"
                      placeholder="Enter price in Naira"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Image URL *
                    </label>
                    <input
                      type="url"
                      value={formData.image || ''}
                      onChange={(e) => handleInputChange('image', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-burgundy-500 focus:border-transparent"
                      placeholder="https://example.com/image.jpg"
                    />
                    {formData.image && (
                      <img
                        src={formData.image}
                        alt="Preview"
                        className="mt-2 w-24 h-24 object-cover rounded-lg"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.style.display = 'none';
                        }}
                      />
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Category *
                    </label>
                    <select
                      value={formData.category || 'arabian'}
                      onChange={(e) => handleInputChange('category', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-burgundy-500 focus:border-transparent"
                    >
                      {categories.map((cat) => (
                        <option key={cat.value} value={cat.value}>
                          {cat.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Description
                    </label>
                    <textarea
                      value={formData.description || ''}
                      onChange={(e) => handleInputChange('description', e.target.value)}
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-burgundy-500 focus:border-transparent"
                      placeholder="Enter product description"
                    />
                  </div>

                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="featured"
                      checked={formData.featured || false}
                      onChange={(e) => handleInputChange('featured', e.target.checked)}
                      className="h-4 w-4 text-burgundy-600 focus:ring-burgundy-500 border-gray-300 rounded"
                    />
                    <label htmlFor="featured" className="ml-2 block text-sm text-gray-700">
                      Featured Product
                    </label>
                  </div>

                  <div className="flex space-x-4 pt-4">
                    <button
                      onClick={handleSave}
                      className="flex-1 bg-burgundy-600 hover:bg-burgundy-700 text-white px-4 py-2 rounded-lg flex items-center justify-center space-x-2 transition-colors"
                    >
                      <Save className="h-4 w-4" />
                      <span>Save Product</span>
                    </button>
                    <button
                      onClick={handleCancel}
                      className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-700 px-4 py-2 rounded-lg transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="p-6 text-center text-gray-500">
                <Upload className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>Select a product to edit or add a new one</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;