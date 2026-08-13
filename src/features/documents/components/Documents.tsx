import { mockFormTemplates } from '../../../data/mockData';

export function Documents() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-50">Documents & Forms</h1>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
          Add Form Template
        </button>
      </div>

      <div className="bg-white dark:bg-slate-800 rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-50 mb-4">Available Form Templates</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {mockFormTemplates.map((template) => (
            <div key={template.id} className="border border-slate-200 dark:border-slate-700 rounded-lg p-4 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors">
              <h3 className="font-semibold text-slate-900 dark:text-slate-50 mb-2">{template.code}</h3>
              <p className="text-sm text-slate-700 dark:text-slate-300 mb-2">{template.name}</p>
              <p className="text-xs text-slate-600 dark:text-slate-400">{template.description}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white dark:bg-slate-800 rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-50 mb-4">Form Architecture</h2>
        <p className="text-slate-600 dark:text-slate-400 mb-4">
          Form templates are designed to consume Client + Matter + Trademark data for automated document generation.
          Additional forms can be added without code changes through the template system.
        </p>
        <div className="bg-slate-50 dark:bg-slate-900 rounded-lg p-4">
          <h4 className="font-medium text-slate-900 dark:text-slate-50 mb-2">Template Features:</h4>
          <ul className="list-disc list-inside text-sm text-slate-700 dark:text-slate-300 space-y-1">
            <li>Reusable form templates</li>
            <li>Dynamic field mapping</li>
            <li>Client/Matter/Trademark data integration</li>
            <li>PDF generation ready</li>
            <li>Custom branding support</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
