export interface Person {
  name: string;
  gender: string;
  hobbies: string[];
  job: string;
}

export interface PersonPageProps {
  person: Person | null;
}