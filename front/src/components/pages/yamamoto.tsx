import Layout from '../Layout.js';

const Yamamoto = () => {
  return (
    <Layout current="yamamoto">
      <div class="detail-item">
        <span class="detail-label">性別：</span>
        <span class="detail-value">女性</span>
      </div>
      <div class="detail-item">
        <span class="detail-label">趣味：</span>
        <span class="detail-value">ガーデニング、読書</span>
      </div>
      <div class="detail-item">
        <span class="detail-label">職業：</span>
        <span class="detail-value">教師</span>
      </div>
    </Layout>
  );
};

export default Yamamoto;