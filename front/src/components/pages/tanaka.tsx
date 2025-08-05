import PersonDetail from '../common/PersonDetail.js';
import type { PersonPageProps } from '../../types.js';

const Tanaka = ({ person }: PersonPageProps) => {
  return <PersonDetail person={person} currentPage="tanaka" />;
};

export default Tanaka;