export function Settings() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-50">Settings</h1>
      
      <div className="bg-white dark:bg-slate-800 rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-50 mb-4">Application Settings</h2>
        <p className="text-slate-600 dark:text-slate-400 mb-4">
          Configure application-wide settings and preferences.
        </p>
        
        <div className="space-y-4">
          <div className="border-b border-slate-200 dark:border-slate-700 pb-4">
            <h3 className="font-medium text-slate-900 dark:text-slate-50 mb-2">Client Types Configuration</h3>
            <p className="text-sm text-slate-600 dark:text-slate-400">Configure client type series (A, B, C, etc.)</p>
          </div>
          
          <div className="border-b border-slate-200 dark:border-slate-700 pb-4">
            <h3 className="font-medium text-slate-900 dark:text-slate-50 mb-2">Matter Types</h3>
            <p className="text-sm text-slate-600 dark:text-slate-400">Manage available matter types and workflows</p>
          </div>
          
          <div className="border-b border-slate-200 dark:border-slate-700 pb-4">
            <h3 className="font-medium text-slate-900 dark:text-slate-50 mb-2">Payment Methods</h3>
            <p className="text-sm text-slate-600 dark:text-slate-400">Configure accepted payment methods</p>
          </div>
          
          <div>
            <h3 className="font-medium text-slate-900 dark:text-slate-50 mb-2">Agent Management</h3>
            <p className="text-sm text-slate-600 dark:text-slate-400">Manage external agents and assignment tracking</p>
          </div>
        </div>
      </div>
      
      <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
        <p className="text-sm text-yellow-800 dark:text-yellow-200">
          ⚠️ Settings functionality is planned for future implementation. This is a placeholder for the settings interface.
        </p>
      </div>
    </div>
  );
}
