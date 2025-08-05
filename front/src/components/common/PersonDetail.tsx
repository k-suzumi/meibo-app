import Layout from "../Layouts/Layout.js";

interface Person {
  name: string;
  gender: string;
  hobbies: string[];
  job: string;
}

interface PersonDetailProps {
  person: Person | null;
  currentPage: string;
}

const PersonDetail = ({ person, currentPage }: PersonDetailProps) => {
  if (!person) {
    return (
      <Layout current={currentPage}>
        <div>データの読み込みに失敗しました</div>
      </Layout>
    );
  }

  return (
    <Layout current={currentPage}>
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
        <span className="detail-value">{person.job}</span>
      </div>
    </Layout>
  );
};

export default PersonDetail;