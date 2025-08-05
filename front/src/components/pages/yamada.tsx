import PersonDetail from '../common/PersonDetail.js';
import type { PersonPageProps } from '../../types.js';

const Yamada = ({ person }: PersonPageProps) => {
  return <PersonDetail person={person} currentPage="yamada" />;
};

export default Yamada;