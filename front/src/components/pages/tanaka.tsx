import Layout from '../Layout.js';

interface Person {
  name: string;
  gender: string;
  hobbies: string[];
  occupation: string;
}

interface TanakaProps {
  person: Person | null;
}

const Tanaka = ({ person }: TanakaProps) => {
  if (!person) {
    return (
      <Layout current="tanaka">
        <div>データの読み込みに失敗しました</div>
      </Layout>
    );
  }

  return (
    <Layout current="tanaka">
      <div className="detail-item">
        <span className="detail-label">性別：</span>
        <span className="detail-value">{person.gender}</span>
      </div>
      <div className="detail-item">
        <span className="detail-label">趣味：</span>
        <span className="detail-value">{person.hobbies.join('、')}</span>
      </div>
      <div className="detail-item">
        <span className="detail-label">職業：</span>
        <span className="detail-value">{person.occupation}</span>
      </div>
    </Layout>
  );
};

export default Tanaka;