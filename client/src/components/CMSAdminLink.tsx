import React from 'react';
import { Settings, ExternalLink } from 'lucide-react';

const CMSAdminLink: React.FC = () => {
  const handleCMSAccess = () => {
    // Open Netlify CMS admin panel
    window.open('/admin/', '_blank');
  };

  return (
    <button
      onClick={handleCMSAccess}
      className="fixed bottom-20 left-4 z-50 bg-purple-600 hover:bg-purple-700 text-white p-3 rounded-full shadow-lg transition-all duration-300 group"
      title="Content Management System"
      data-testid="button-cms-access"
    >
      <div className="flex items-center space-x-2">
        <Settings className="h-5 w-5 group-hover:rotate-90 transition-transform duration-300" />
        <ExternalLink className="h-3 w-3" />
      </div>
    </button>
  );
};

export default CMSAdminLink;
