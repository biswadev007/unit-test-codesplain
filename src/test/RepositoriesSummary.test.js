import { render, screen } from '@testing-library/react';
import RepositorySummary from '../components/repositories/RepositoriesSummary';

test('Render the component properly', () => {
  const repository = {
    stargazers_count: 5,
    open_issues: 1,
    forks: 30,
    language: 'Javascript',
  };
  render(<RepositorySummary repository={repository} />);

  Object.entries(repository).forEach(([_, value])=> {
    const element = screen.getByText(new RegExp(value));
    expect(element).toBeInTheDocument();
  });
});
