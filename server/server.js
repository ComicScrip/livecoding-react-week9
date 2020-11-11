const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

let students = [
  {
    firstName: 'Alex',
    lastName: 'Buteau',
    githubUserName: 'AlexButeau',
    firstTrainerMeetingDone: false,
  },
  {
    firstName: 'Amandine',
    lastName: 'Gervis',
    githubUserName: 'AmandineGervis',
    firstTrainerMeetingDone: false,
  },
  {
    firstName: 'Antoine',
    lastName: 'Gorenflot',
    githubUserName: 'AntoineGGG',
    firstTrainerMeetingDone: false,
  },
  {
    firstName: 'Aymeric',
    lastName: 'Bouault',
    githubUserName: 'Abouault',
    firstTrainerMeetingDone: false,
  },
  {
    firstName: 'Brieuc',
    lastName: 'Quertier',
    githubUserName: 'BrieucQ',
    firstTrainerMeetingDone: false,
  },
  {
    firstName: 'Caroline',
    lastName: 'Morlet',
    githubUserName: 'carolinemorlet',
    firstTrainerMeetingDone: false,
  },
  {
    firstName: 'Cédric',
    lastName: 'Leroy',
    githubUserName: 'leroy117',
    firstTrainerMeetingDone: false,
  },
  {
    firstName: 'Christian',
    lastName: 'Théobald',
    githubUserName: 'christiantheobald',
    firstTrainerMeetingDone: false,
  },
  {
    firstName: 'Clément',
    lastName: 'Garcin',
    githubUserName: 'gclement28',
    firstTrainerMeetingDone: false,
  },
  {
    firstName: 'Eddy',
    lastName: 'Mandran',
    githubUserName: 'eddymandran',
    firstTrainerMeetingDone: false,
  },
  {
    firstName: 'Gilles',
    lastName: 'Autier',
    githubUserName: 'Guillou33',
    firstTrainerMeetingDone: false,
  },
  {
    firstName: 'Guillem',
    lastName: 'Dardill',
    githubUserName: 'Twiggui',
    firstTrainerMeetingDone: false,
  },
  {
    firstName: 'Jean',
    lastName: 'Ducret',
    githubUserName: 'jeandct',
    firstTrainerMeetingDone: false,
  },
  {
    firstName: 'Julien',
    lastName: 'Pellattiero',
    githubUserName: 'Pella0',
    firstTrainerMeetingDone: false,
  },
  {
    firstName: 'Karen',
    lastName: 'Orduña',
    githubUserName: 'KarenOrduna',
    firstTrainerMeetingDone: false,
  },
  {
    firstName: 'Laurence',
    lastName: 'Portron',
    githubUserName: 'LaurencePortron',
    firstTrainerMeetingDone: false,
  },
  {
    firstName: 'Louise',
    lastName: 'Ceccaldi',
    githubUserName: 'LouiseCeccaldi',
    firstTrainerMeetingDone: false,
  },
  {
    firstName: 'Nathan',
    lastName: 'Vanstaevel',
    githubUserName: 'Nathan-Vanstaevel',
    firstTrainerMeetingDone: false,
  },
  {
    firstName: 'Nicolas',
    lastName: 'Dantas',
    githubUserName: 'nicolasdantas',
    firstTrainerMeetingDone: false,
  },
  {
    firstName: 'Rémi',
    lastName: 'Cusset',
    githubUserName: 'lerem-s38',
    firstTrainerMeetingDone: false,
  },
  {
    firstName: 'Romain',
    lastName: 'Montel',
    githubUserName: 'Rom-mtl',
    firstTrainerMeetingDone: false,
  },
  {
    firstName: 'Sabrina',
    lastName: 'Karakog',
    githubUserName: 'SaKara69',
    firstTrainerMeetingDone: false,
  },
  {
    firstName: 'Thibault',
    lastName: 'Verin',
    githubUserName: 'ThibaultVerin',
    firstTrainerMeetingDone: false,
  },
  {
    firstName: 'Thomas',
    lastName: 'Chevaleraud',
    githubUserName: 'ThomasChevaleraud',
    firstTrainerMeetingDone: false,
  },
];

app.get('/students', (req, res) => {
  setTimeout(() => {
    res.json(students);
  }, 3000);
});

app.get('/students/:githubUserName', (req, res) => {
  setTimeout(() => {
    res.json(
      students.find((s) => s.githubUserName === req.params.githubUserName)
    );
  }, 1500);
});

app.delete('/students/:githubUserName', (req, res) => {
  setTimeout(() => {
    const student = students.find(
      (s) => s.githubUserName === req.params.githubUserName
    );
    if (student) {
      students = students.filter(
        (s) => s.githubUserName !== req.params.githubUserName
      );
      res.sendStatus(204);
    } else {
      res.sendStatus(404);
    }
  }, 1000);
});

app.patch('/students/:githubUserName', (req, res) => {
  setTimeout(() => {
    const student = students.find(
      (s) => s.githubUserName === req.params.githubUserName
    );
    if (student) {
      const { firstName, lastName, firstTrainerMeetingDone } = req.body;
      Object.assign(student, { firstName, lastName, firstTrainerMeetingDone });
      res.json(student);
    } else {
      res.sendStatus(404);
    }
  }, 1500);
});

app.post('/students', (req, res) => {
  setTimeout(() => {
    const { firstName, lastName, firstTrainerMeetingDone } = req.body;
    const newStudent = { firstName, lastName, firstTrainerMeetingDone };
    students.concat(newStudent);
    res.json(newStudent);
  }, 1500);
});

const PORT = 8080;
app.listen(PORT, () => {
  console.log(`server listenting on port ${PORT}`); // eslint-disable-line
});
