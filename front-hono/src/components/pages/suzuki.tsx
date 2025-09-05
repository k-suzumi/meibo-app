import PersonDetail from '../common/PersonDetail.js';
import type { PersonPageProps } from '../../types.js';

const Suzuki = ({ person }: PersonPageProps) => {
  return <PersonDetail person={person} currentPage="suzuki" />;
};

export default Suzuki;