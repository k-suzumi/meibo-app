import { useEffect, useState } from 'react';
import Layout from '../Layout.js';

const Suzuki = () => {
  const [person, setPerson] = useState(null);

  useEffect(() => {
    fetch('http://localhost:3000/api/person/1') // 例: ID=1のデータ
      .then((res) => res.json())
      .then((data) => setPerson(data))
      .catch((err) => console.error(err));
  }, []);

  if (!person) return <div>読み込み中...</div>;

  return (
    <Layout current="suzuki">
      <div className="detail-item">
        <span className="detail-label">名前：</span>
        <span className="detail-value">{person.name}</span>
      </div>
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

export default Suzuki;
