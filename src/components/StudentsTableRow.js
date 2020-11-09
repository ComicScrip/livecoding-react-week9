import React from 'react';
import Switch from '@material-ui/core/Switch';

export default ({
  firstName,
  lastName,
  gitHubAccountUrl,
  firstTrainerMeetingDone,
  avatarUrl,
  fullName,
  handleTrainerMeetingDoneToogle = () => {},
}) => {
  return (
    <tr>
      <td>
        <a href={gitHubAccountUrl} target="_blank" rel="noopener noreferrer">
          <img
            className="avatar"
            src={avatarUrl}
            alt={`${fullName}'s Github avatar`}
          />
        </a>
      </td>
      <td>
        <a href={gitHubAccountUrl}>{firstName}</a>
      </td>
      <td>{lastName.toUpperCase()}</td>
      <td>
        <Switch
          checked={firstTrainerMeetingDone}
          onChange={handleTrainerMeetingDoneToogle}
          color="primary"
          inputProps={{ 'aria-label': 'primary checkbox' }}
        />
      </td>
    </tr>
  );
};
