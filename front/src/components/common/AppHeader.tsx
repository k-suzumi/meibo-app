import type { FC } from 'hono/jsx';

type AppHeaderProps = {
  current?: string;
};

const AppHeader: FC<AppHeaderProps> = ({ current }) => {
  return (
    <>
      <div className="meishi-title">名簿</div>
      <div className="name-grid">
        <a href="/yamada" className={`name-item ${current === 'yamada' ? 'active' : ''}`}>山田</a>
        <a href="/tanaka" className={`name-item ${current === 'tanaka' ? 'active' : ''}`}>田中</a>
        <a href="/suzuki" className={`name-item ${current === 'suzuki' ? 'active' : ''}`}>鈴木</a>
        <a href="/yamamoto" className={`name-item ${current === 'yamamoto' ? 'active' : ''}`}>山本</a>
      </div>
    </>
  );
};

export default AppHeader;
