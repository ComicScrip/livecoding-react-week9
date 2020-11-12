import React, { useEffect, useState } from 'react';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import { Link } from 'react-router-dom';
import sortBy from 'lodash/sortBy';
import SortButton from './SortButton';
import { getGitHubAccountUrl } from '../data/students';
import LoadingIndicator from './LoadingIndicator';
import ErrorBox from './ErrorBox';

function StudentsTable() {
  const [fieldToSortByWithOrder, setFieldToSortByWithOrder] = useState(null);
  const [studentsFromServer, setStudentsFromServer] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    axios
      .get('http://localhost:8080/students')
      .then((res) => res.data)
      .then((data) => setStudentsFromServer(data))
      .catch((err) => setError(err))
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const optimisticallyRemoveStudent = (id) => {
    console.log(`suppression de l'élève avec l'identifiant ${id}`);
  };

  if (error)
    return <ErrorBox message="Erreur lors du chargement de la liste" />;
  if (isLoading) return <LoadingIndicator />;
  if (!studentsFromServer.length) return <p>Aucun élève dans la liste</p>;

  const renderSortButton = (fieldToSortBy, desc = false) => {
    const fieldWithOrder = `${fieldToSortBy} ${desc ? 'DESC' : 'ASC'}`;
    return (
      <SortButton
        active={fieldWithOrder === fieldToSortByWithOrder}
        onClick={() => setFieldToSortByWithOrder(fieldWithOrder)}
        desc={desc}
      />
    );
  };

  const renderTableHead = () => (
    <tr>
      <td>
        Prénom
        <span className="col-sort-buttons-container">
          {renderSortButton('firstName')}
          {renderSortButton('firstName', true)}
        </span>
      </td>
      <td>
        Nom
        <span className="col-sort-buttons-container">
          {renderSortButton('lastName')}
          {renderSortButton('lastName', true)}
        </span>
      </td>
      <td>Retirer de la liste</td>
    </tr>
  );

  const renderSortedStudents = () => {
    let sortedStudents = studentsFromServer.slice();
    if (fieldToSortByWithOrder) {
      const [fieldToSortBy, sortOrder] = fieldToSortByWithOrder.split(' ');
      sortedStudents = sortBy(sortedStudents, [
        (s) => s[fieldToSortBy].toUpperCase(),
      ]);
      if (sortOrder === 'DESC') {
        sortedStudents = sortedStudents.reverse();
      }
    }
    return sortedStudents.map((student) => (
      <tr key={student.githubUserName}>
        <td>
          <a href={getGitHubAccountUrl(student)}>{student.firstName}</a>
        </td>
        <td>
          <Link to={`/students/${student.githubUserName}`}>
            {student.lastName.toUpperCase()}
          </Link>
        </td>
        <td>
          <Button
            onClick={() => optimisticallyRemoveStudent(student.githubUserName)}
          >
            Retirer
          </Button>
        </td>
      </tr>
    ));
  };

  return (
    <table>
      <thead>{renderTableHead()}</thead>
      <tbody>{renderSortedStudents()}</tbody>
    </table>
  );
}

export default StudentsTable;
