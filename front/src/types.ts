export interface Person {
  name: string;
  gender: string;
  hobbies: string[];
  occupation: string;
}

export interface PersonPageProps {
  person: Person | null;
}