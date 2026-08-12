import { Link } from '@tanstack/react-router'

export function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <h1 className="text-5xl font-bold text-slate-900 dark:text-slate-50 mb-6">
          BrandEx IP Practice
        </h1>
        <p className="text-xl text-slate-600 dark:text-slate-400 mb-8">
          IP Law Practice Management System for trademark/IP consultants and law firms
        </p>
        <div className="flex gap-4 justify-center">
          <Link
            to="/login"
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            Get Started
          </Link>
          <button className="px-6 py-3 border border-slate-300 text-slate-700 dark:border-slate-600 dark:text-slate-300 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors font-medium">
            Learn More
          </button>
        </div>
      </div>
    </div>
  );
}
