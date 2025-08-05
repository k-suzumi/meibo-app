import Layout from '../Layout.js';

const Suzuki = () => {
  return (
    <Layout current="suzuki">
      <div className="detail-item">
        <span className="detail-label">性別：</span>
        <span className="detail-value">男性</span>
      </div>
      <div className="detail-item">
        <span className="detail-label">趣味：</span>
        <span className="detail-value">スポーツ、音楽</span>
      </div>
      <div className="detail-item">
        <span className="detail-label">職業：</span>
        <span className="detail-value">営業</span>
      </div>
    </Layout>
  );
};

export default Suzuki;