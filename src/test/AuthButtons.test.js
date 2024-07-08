import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import { setupServer } from 'msw/node';
import { rest } from 'msw';
import { SWRConfig } from 'swr';

import AuthButtons from '../components/auth/AuthButtons';

const renderComponent = async () => {
  render(
    <MemoryRouter>
      <SWRConfig value={{ provider: ()=> new Map() }}>
        <AuthButtons />
      </SWRConfig>
    </MemoryRouter>
  );

  await screen.findAllByRole('link');
};

const createServer = (user) => {
  return setupServer(
    rest.get('/api/user', (req, res, ctx) => {
      return res(ctx.json({ user }));
    })
  );
};

describe('when user not sign in', () => {
  const server = createServer(null);

  beforeAll(() => {
    server.listen();
  });

  afterEach(() => {
    server.resetHandlers();
  });

  afterAll(() => {
    server.close();
  });

  test('show sign in and sign up button', async () => {
    await renderComponent();

    const signinbutton = screen.getByRole('link', {
      name: /sign in/i,
    });
    const signupbutton = screen.getByRole('link', {
      name: /sign up/i,
    });

    expect(signinbutton).toBeInTheDocument();
    expect(signinbutton).toHaveAttribute('href', '/signin');
    expect(signupbutton).toBeInTheDocument();
    expect(signupbutton).toHaveAttribute('href', '/signup');
  });
  test('hide sign out button', async () => {
    await renderComponent();

    const signoutbutton = screen.queryByRole('link', {
      name: /sign out/i,
    });

    expect(signoutbutton).not.toBeInTheDocument();
  });
});

describe('when user is sign in', () => {
  const server = createServer({ id: 1, email: 'ppapai844@gmail.com' });

  beforeAll(() => {
    server.listen();
  });

  afterEach(() => {
    server.resetHandlers();
  });

  afterAll(() => {
    server.close();
  });

  test('hide sign in and sign up button', async () => {
    await renderComponent();
    const signinbutton = screen.queryByRole('link', {
      name: /sign in/i,
    });
    const signupbutton = screen.queryByRole('link', {
      name: /sign up/i,
    });

    expect(signinbutton).not.toBeInTheDocument();
    expect(signupbutton).not.toBeInTheDocument();
  });
  test('show sign out button', async () => {
    await renderComponent();
    const signoutButton = screen.getByRole('link', { name: /sign out/i });

    expect(signoutButton).toBeInTheDocument();
    expect(signoutButton).toHaveAttribute('href', '/signout');
  });
});
