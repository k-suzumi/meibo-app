import PersonDetail from '../common/PersonDetail.js';
import type { PersonPageProps } from '../../types.js';

const Yamamoto = ({ person }: PersonPageProps) => {
  return <PersonDetail person={person} currentPage="yamamoto" />;
};

export default Yamamoto;