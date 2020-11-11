import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import sortBy from 'lodash/sortBy';
import SortButton from './SortButton';
import { getGitHubAccountUrl } from '../data/students';
import useRemoteCollection from '../hooks/useRemoteCollection';
import useRemoteCollectionRemover from '../hooks/useRemoteCollectionRemover';

function StudentsTable() {
  const [fieldToSortByWithOrder, setFieldToSortByWithOrder] = useState(null);
  const { isLoading, error, data: studentsFromServer } = useRemoteCollection(
    'students'
  );
  const [optimisticallyRemoveStudent] = useRemoteCollectionRemover('students', {
    getEntityId: (s) => s.githubUserName,
    updateLocalDataBefore: true,
  });

  if (error) return <p className="error">Error</p>;
  if (isLoading) return <p>Loading students from API</p>;
  if (!studentsFromServer.length) return <p>No Student to show</p>;

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
      sortedStudents = sortBy(sortedStudents, fieldToSortBy);
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
