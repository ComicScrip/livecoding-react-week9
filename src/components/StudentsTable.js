import React, { useState } from 'react';
import { useQuery } from 'react-query';
import { sortBy } from 'lodash';
import axios from 'axios';

import {
  getAvatarUrl,
  getFullName,
  getGitHubAccountUrl,
} from '../data/students';
import SortButton from './SortButton';
import StudentsTableRow from './StudentsTableRow';

function StudentsTable({ initialStudentList }) {
  const [activeSort, setActiveSort] = useState('');
  const [sortedStudents, setSortedStudents] = useState([]);
  const handleSortButtonClicked = (fieldToSortByWithOrder) => {
    if (activeSort === fieldToSortByWithOrder) {
      setSortedStudents(initialStudentList);
      setActiveSort(null);
    } else {
      const [fieldToSortBy, sortOrder] = fieldToSortByWithOrder.split(' ');
      let sorted = sortBy(initialStudentList, fieldToSortBy);
      if (sortOrder === 'DESC') {
        sorted = sortedStudents.reverse();
      }
      setSortedStudents(sorted);
      setActiveSort(fieldToSortByWithOrder);
    }
  };

  const handleTrainerMeetingDoneToogle = (githubUserName) => {
    setSortedStudents((sorted) =>
      sorted.map((s) =>
        s.githubUserName === githubUserName
          ? {
              ...s,
              firstTrainerMeetingDone: !s.firstTrainerMeetingDone,
            }
          : s
      )
    );
  };

  const { isLoading, error } = useQuery('repoData', () =>
    axios.get('http://localhost:8080/students').then((res) => res.data)
  );

  if (error) return <p className="error">{error}</p>;
  if (isLoading) return <p>loading students from API</p>;

  return (
    <table>
      <thead>
        <tr>
          <td>
            Prénom
            <span className="col-sort-buttons-container">
              <SortButton
                fieldToSortBy="firstName"
                sortOrder="ASC"
                onClick={handleSortButtonClicked}
                activeSort={activeSort}
              />
              <SortButton
                fieldToSortBy="firstName"
                sortOrder="DESC"
                onClick={handleSortButtonClicked}
                activeSort={activeSort}
              />
            </span>
          </td>
          <td>
            Nom
            <span className="col-sort-buttons-container">
              <SortButton
                fieldToSortBy="lastName"
                sortOrder="ASC"
                onClick={handleSortButtonClicked}
                activeSort={activeSort}
              />
              <SortButton
                fieldToSortBy="lastName"
                sortOrder="DESC"
                onClick={handleSortButtonClicked}
                activeSort={activeSort}
              />
            </span>
          </td>
          <td>Retirer de la liste</td>
        </tr>
      </thead>
      <tbody>
        {sortedStudents.map((student) => {
          const {
            githubUserName,
            firstName,
            lastName,
            firstTrainerMeetingDone,
          } = student;
          return (
            <StudentsTableRow
              key={githubUserName}
              handleTrainerMeetingDoneToogle={() =>
                handleTrainerMeetingDoneToogle(githubUserName)
              }
              {...{
                firstTrainerMeetingDone,
                firstName,
                lastName,
                gitHubAccountUrl: getGitHubAccountUrl(student),
                avatarUrl: getAvatarUrl(student),
                fullName: getFullName(student),
              }}
            />
          );
        })}
      </tbody>
    </table>
  );
}

export default StudentsTable;
