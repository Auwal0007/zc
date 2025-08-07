import React, { useState } from 'react';
import { Settings, Shield, Lock } from 'lucide-react';

interface AdminLinkProps {
  onAdminAccess?: () => void;
}

const AdminLink: React.FC<AdminLinkProps> = ({ onAdminAccess }) => {
  const [showPasswordPrompt, setShowPasswordPrompt] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  // Simple admin password (in production, use proper authentication)
  const ADMIN_PASSWORD = 'admin123';

  const handleAdminClick = () => {
    setShowPasswordPrompt(true);
    setError('');
  };

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setShowPasswordPrompt(false);
      setPassword('');
      if (onAdminAccess) {
        onAdminAccess();
      }
    } else {
      setError('Incorrect password');
    }
  };

  const handleClose = () => {
    setShowPasswordPrompt(false);
    setPassword('');
    setError('');
  };

  return (
    <>
      <button
        onClick={handleAdminClick}
        className="fixed bottom-4 left-4 z-50 bg-gray-700 hover:bg-gray-800 text-white p-3 rounded-full shadow-lg transition-all duration-300 group"
        title="Admin Access"
        data-testid="button-admin-access"
      >
        <Shield className="h-5 w-5 group-hover:rotate-12 transition-transform duration-300" />
      </button>

      {/* Password Prompt Modal */}
      {showPasswordPrompt && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg p-6 w-96 max-w-md mx-4">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2">
                <Lock className="h-5 w-5 text-gray-600" />
                <h3 className="text-lg font-semibold">Admin Access</h3>
              </div>
              <button
                onClick={handleClose}
                className="text-gray-400 hover:text-gray-600"
                data-testid="button-close-admin-prompt"
              >
                ×
              </button>
            </div>

            <form onSubmit={handlePasswordSubmit}>
              <div className="mb-4">
                <label htmlFor="admin-password" className="block text-sm font-medium text-gray-700 mb-2">
                  Enter admin password:
                </label>
                <input
                  id="admin-password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-burgundy-500 focus:border-transparent"
                  placeholder="Password"
                  autoFocus
                  data-testid="input-admin-password"
                />
                {error && (
                  <p className="mt-2 text-sm text-red-600" data-testid="text-admin-error">
                    {error}
                  </p>
                )}
              </div>

              <div className="flex space-x-3">
                <button
                  type="submit"
                  className="flex-1 bg-burgundy-600 text-white py-2 px-4 rounded-md hover:bg-burgundy-700 transition-colors duration-200"
                  data-testid="button-submit-admin-password"
                >
                  Access Admin
                </button>
                <button
                  type="button"
                  onClick={handleClose}
                  className="flex-1 bg-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-400 transition-colors duration-200"
                  data-testid="button-cancel-admin"
                >
                  Cancel
                </button>
              </div>
            </form>

            <div className="mt-4 text-xs text-gray-500">
              <p>Hint: Default password is "admin123"</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AdminLink;