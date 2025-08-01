import Layout from '../Layout.js';

const Yamada = () => {
  return (
    <Layout current="yamada">
      <div className="detail-item">
        <span className="detail-label">性別：</span>
        <span className="detail-value">男性</span>
      </div>
      <div className="detail-item">
        <span className="detail-label">趣味：</span>
        <span className="detail-value">読書、映画鑑賞</span>
      </div>
      <div className="detail-item">
        <span className="detail-label">職業：</span>
        <span className="detail-value">エンジニア</span>
      </div>
    </Layout>
  );
};

export default Yamada;