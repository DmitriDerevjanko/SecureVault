export interface PersonData {
  id: number;
  login: string;
  passwordValue: string;
  purpose: string;
  userid: string;
  folderName: string;
}

export interface State {
  peopleData: PersonData[];
}
