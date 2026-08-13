import { mockFormTemplates } from '../../../data/mockData';

export function Documents() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-4xl font-bebas font-normal text-[#0C0C0C] tracking-wider">DOCUMENTS & FORMS</h1>
        <button className="btn-primary px-4 py-2">
          Add Form Template
        </button>
      </div>

      <div className="card-neo p-6">
        <h2 className="text-2xl font-bebas font-normal text-[#0C0C0C] tracking-wider mb-4">AVAILABLE FORM TEMPLATES</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {mockFormTemplates.map((template) => (
            <div key={template.id} className="border-2 border-[#0C0C0C] bg-[#F0E8D0] p-4">
              <h3 className="font-mono uppercase text-sm text-[#0C0C0C] mb-2">{template.code}</h3>
              <p className="text-sm text-[#0C0C0C] mb-2">{template.name}</p>
              <p className="text-xs text-[#0C0C0C] opacity-60">{template.description}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="card-neo p-6">
        <h2 className="text-2xl font-bebas font-normal text-[#0C0C0C] tracking-wider mb-4">FORM ARCHITECTURE</h2>
        <p className="text-[#0C0C0C] opacity-60 mb-4">
          Form templates are designed to consume Client + Matter + Trademark data for automated document generation.
          Additional forms can be added without code changes through the template system.
        </p>
        <div className="border-2 border-[#0C0C0C] bg-[#F0E8D0] p-4">
          <h4 className="font-mono uppercase text-sm text-[#0C0C0C] mb-2">Template Features:</h4>
          <ul className="list-disc list-inside text-sm text-[#0C0C0C] space-y-1">
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
