export const formDataList = [
  {
    id: 'first_name',
    label: 'First Name',
    grid: 4,
    require: true,
  },
  {
    id: 'last_name',
    label: 'Last Name',
    grid: 4,
    require: true,
  },
  {
    id: 'grade',
    label: 'Grade',
    grid: 2,
    require: true,
    maxLength: 2,
  },
  {
    id: 'level',
    label: 'Level',
    grid: 2,
    require: false,
    maxLength: 1,
  },
  {
    id: 'parent_name',
    label: `Parent's Name`,
    grid: 12,
    require: true,
  },
  {
    id: 'email1',
    label: 'Primary Email',
    grid: 6,
    require: true,
  },
  {
    id: 'email2',
    label: 'Secondary Email',
    grid: 6,
  },
  {
    id: 'school',
    label: 'School Name',
    grid: 12,
    require: true,
  },
  {
    id: 'street1',
    label: 'Address Street',
    grid: 12,
    address: true,
    require: true,
  },
  {
    id: 'street2',
    label: 'Address Street 2',
    grid: 12,
    address: true,
  },
  {
    id: 'city',
    label: 'City',
    grid: 4,
    address: true,
    require: true,
  },
  {
    id: 'state',
    label: 'State',
    grid: 4,
    address: true,
    require: true,
  },
  {
    id: 'zipcode',
    label: 'Zipcode',
    grid: 4,
    address: true,
    require: true,
    maxLength: 5,
  },
];
