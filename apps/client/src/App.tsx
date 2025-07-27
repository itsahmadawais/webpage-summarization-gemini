

import { useState } from 'react';
import { summarizeURL } from './api/summarize';
import URLForm from './components/URLForm';
import Summary from './components/Summary';
import ErrorMessage from './components/ErrorMessage';

interface SummaryResponse {
  summary: string;
}

function App() {
  const [summary, setSummary] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>('');

  const handleSubmit = async (url: string) => {
    setLoading(true);
    setError('');
    setSummary('');

    try {
      const data = await summarizeURL(url) as SummaryResponse;
      setSummary(data.summary || 'No summary found.');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-blue-50 flex items-center justify-center p-4">
      <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-xl">
        <URLForm onSubmit={handleSubmit} loading={loading} />

        {error && <ErrorMessage message={error} />}

        {summary && <Summary summary={summary} />}
      </div>
    </div>
  );
}

export default App
