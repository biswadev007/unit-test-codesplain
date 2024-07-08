import { render, screen } from '@testing-library/react';
import { setupServer } from 'msw/node';
import { rest } from 'msw';
import { MemoryRouter } from 'react-router';

import HomeRoute from '../routes/HomeRoute';

const handler = [
  rest.get('/api/repositories', (req, res, ctx) => {
    const query = req.url.searchParams.get('q').split('language:')[1];
    
    return res(
      ctx.json({
        items: [
          { id: 1, full_name: `${query}_1` },
          { id: 2, full_name: `${query}_2` },
        ],
      })
    );
  }),
];

const server = setupServer(...handler);

beforeAll(() => {
  server.listen();
});

afterEach(() => {
  server.resetHandlers();
});

afterAll(() => {
  server.close();
});

test('render two link for each', async () => {
  render(
    <MemoryRouter>
      <HomeRoute />
    </MemoryRouter>
  );

  const languages = [
    'javascript',
    'typescript',
    'python',
    'java',
    'go',
    'rust',
  ];

  for (let lang of languages) {
    const link = await screen.findAllByRole('link', {
      name: new RegExp(`${lang}_`),
    });

    expect(link).toHaveLength(2);
    // expect(link).toHaveAttribute('href', `/repositories/${lang}`);
  }
});
