export const summarizeURL = async (url: string) => {
  const res = await fetch(`http://localhost:5000/api/summarize`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ url }),
  });
  return res.json();
};
