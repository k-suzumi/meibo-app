import Layout from '../Layout.js';

const Tanaka = () => {
  return (
    <Layout current="tanaka">
      <div className="detail-item">
        <span className="detail-label">性別：</span>
        <span className="detail-value">女性</span>
      </div>
      <div className="detail-item">
        <span className="detail-label">趣味：</span>
        <span className="detail-value">料理、旅行</span>
      </div>
      <div className="detail-item">
        <span className="detail-label">職業：</span>
        <span className="detail-value">デザイナー</span>
      </div>
    </Layout>
  );
};

export default Tanaka;