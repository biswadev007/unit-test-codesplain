import { Link } from 'react-router-dom';
import { MarkGithubIcon } from '@primer/octicons-react';
import FileIcon from '../tree/FileIcon';
import RepositoriesSummary from './RepositoriesSummary';

function RepositoriesListItem({ repository }) {
  const { full_name, language, description, owner, name, html_url } = repository;

  return (
    <div className="py-3 border-b flex">
      <FileIcon name={language} className="shrink w-6 pt-1" />
      <div>
        <Link to={`/repositories/${full_name}`} className="text-xl">
          {owner.login}/<span className="font-bold">{name}</span>
        </Link>
        <p className="text-gray-500 italic py-1">{description}</p>
        <Link to={html_url} target='_blank' aria-label='github repository'>
          <MarkGithubIcon />
        </Link>
        <RepositoriesSummary repository={repository} />
      </div>
    </div>
  );
}

export default RepositoriesListItem;
