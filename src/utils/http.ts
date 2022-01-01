export const extractResumeableUrl = async (url: string): Promise<string | null> => {
  const response = await fetch(url, {
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    mode: 'cors',
    headers: {
      'x-goog-resumable': 'start',
    },
  });
  return response.headers.get('location');
}