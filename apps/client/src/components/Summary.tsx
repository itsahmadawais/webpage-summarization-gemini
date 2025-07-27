export default function Summary({ summary }: { summary: string }) {
    return (
        <div className="mt-8">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 shadow">
                <h2 className="text-lg font-bold mb-2 text-blue-700">Summary</h2>
                <p className="text-gray-800 whitespace-pre-line">{summary}</p>
            </div>
        </div>
    )
}
