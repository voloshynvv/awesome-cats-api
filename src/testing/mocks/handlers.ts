import { http, HttpResponse } from 'msw';

export const mswApiUrl = (path: string) => {
  return import.meta.env.VITE_API_BASE_URL + path;
};

export const handlers = [
  http.get(mswApiUrl('/breeds'), () => {
    return HttpResponse.json([
      { id: 'id1', name: 'breed name 1' },
      { id: 'id2', name: 'breed name 2' },
      { id: 'id3', name: 'breed name 3' },
    ]);
  }),
];
