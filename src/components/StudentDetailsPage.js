import React from 'react';
import axios from 'axios';
import { useQuery } from 'react-query';

import LoadingIndicator from './LoadingIndicator';
import ErrorBox from './ErrorBox';
import {
  getAvatarUrl,
  getFullName,
  getGitHubAccountUrl,
} from '../data/students';

function StudentDetailsPage({
  match: {
    params: { githubUserName },
  },
}) {
  const { isLoading, error, data } = useQuery(
    ['students/', githubUserName],
    () =>
      axios
        .get(`http://localhost:8080/students/${githubUserName}`)
        .then((res) => res.data)
  );
  const student = data || [];

  if (isLoading) return <LoadingIndicator />;
  if (error) return <ErrorBox message={error} />;
  if (!student)
    return <p>Aucun élève avec le compte GH "{githubUserName}"...</p>;

  const fullName = getFullName(student);
  const githubAccountUrl = getGitHubAccountUrl(student);

  return (
    <div>
      <h2>{fullName}</h2>

      <div className="student-card">
        <a href={githubAccountUrl} target="_blank" rel="noopener noreferrer">
          <img className="avatar" alt={fullName} src={getAvatarUrl(student)} />
        </a>
        <br />
      </div>
    </div>
  );
}

export default StudentDetailsPage;
