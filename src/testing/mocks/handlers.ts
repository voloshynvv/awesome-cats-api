import { http, HttpResponse } from 'msw';

export const mswBaseURL = (path: string) => {
  const [, rawPath] = path.split('/');
  return new URL(rawPath, import.meta.env.VITE_API_BASE_URL + '/').toString();
};

export const handlers = [
  http.get(mswBaseURL('/breeds'), () => {
    return HttpResponse.json([
      { id: 'id1', name: 'breed name 1' },
      { id: 'id2', name: 'breed name 2' },
      { id: 'id3', name: 'breed name 3' },
    ]);
  }),
];
