import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';

import RepositoriesListItem from '../components/repositories/RepositoriesListItem';

/** Another way of mocking component to skip act warning */
jest.mock('../components/tree/FileIcon.js', () => {
  return () => {
    return 'This is mock of FileIcon component';
  };
});

function renderComponent() {
  const repository = {
    full_name: 'TheAlgorithms/Python',
    language: 'Python',
    description: 'All Algorithms implemented in Python',
    owner: { login: 'TheAlgorithms' },
    name: 'Python',
    html_url: 'https://github.com/TheAlgorithms/Python',
  };

  /** Use the MemoryRouter wrapper because the component has Link which is part of Router context */
  render(
    <MemoryRouter>
      <RepositoriesListItem repository={repository} />
    </MemoryRouter>
  );

  return {
    repository,
  };
}

test('Render the component properly', async () => {
  renderComponent();
  /** Before act warning */

  /** Resolve act warning */
  // await screen.findByRole('img', { name: /python/i });
});

test('link to external redirect to github', ()=> {
  const { repository } = renderComponent();

  const link = screen.getByRole('link', {
    name: /github repository/i
  });

  expect(link).toHaveAttribute('href', repository.html_url);
});

test('link has proper attribute', ()=> {
  const { repository: { owner, full_name } } = renderComponent();

  const link = screen.getByRole('link', {
    name: new RegExp(`${owner.login}`)
  });

  expect(link).toHaveAttribute('href', `/repositories/${full_name}`);
});