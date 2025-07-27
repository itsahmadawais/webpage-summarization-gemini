interface URLFormProps {
  onSubmit: (url: string) => Promise<void>;
  loading: boolean;
}

export default function URLForm({ onSubmit, loading }: URLFormProps) {
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const url = new FormData(form).get('url') as string;
    if (url) {
      await onSubmit(url);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label
          htmlFor="url"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          Webpage URL
        </label>
        <input
          id="url"
          name="url"
          type="url"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="Enter a webpage URL..."
          required
        />
      </div>
      <button
        type="submit"
        className="w-full cursor-pointer py-2 px-4 bg-blue-500 text-white font-semibold rounded-lg shadow hover:bg-blue-600 transition duration-150 disabled:opacity-50 disabled:cursor-not-allowed"
        disabled={loading}
      >
        {loading ? 'Summarizing...' : 'Summarize'}
      </button>
    </form>
  );
}
