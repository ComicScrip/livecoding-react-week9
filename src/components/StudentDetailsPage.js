import React, { useEffect, useState } from 'react';
import axios from 'axios';

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
  const [student, setStudent] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(`http://localhost:8080/students/${githubUserName}`)
      .then((res) => res.data)
      .then((data) => setStudent(data))
      .catch((err) => setError(err))
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

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
