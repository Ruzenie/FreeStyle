import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import {
  FsAside,
  FsButton,
  FsContainer,
  FsFooter,
  FsHeader,
  FsMain,
  FsMenu,
  FsMenuItem,
  FsSubMenu
} from '@freestyle/react';
import './index.css';

const rootElement = document.getElementById('root');

const types: Array<Parameters<typeof FsButton>[0]['fsType']> = [
  'primary',
  'success',
  'warning',
  'danger',
  'info',
  'text'
];

const sizes: Array<Parameters<typeof FsButton>[0]['size']> = [
  'large',
  'medium',
  'small',
  'mini'
];

type MenuNode = {
  key: string;
  title: string;
  children?: MenuNode[];
};

// Static tree reflecting relevant src structure (simplified).
const demoMenuTree: MenuNode[] = [
  {
    key: 'basic',
    title: 'basic',
    children: [{ key: 'basic-button', title: 'button' }]
  },
  {
    key: 'layout',
    title: 'container',
    children: [{ key: 'basic-container', title: 'layout' }]
  },
  {
    key: 'navigation',
    title: 'navigation',
    children: [
      { key: 'navigation-menu', title: 'menu' },
      { key: 'navigation-collapse', title: 'collapse' }
    ]
  }
];

function App() {
  const [activeDemo, setActiveDemo] = useState<string>('basic-button');

  return (
    <FsContainer
      paddingX={16}
      paddingY={16}
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, sans-serif'
      }}
    >
      <FsHeader
        height={56}
        border
      >
        <h1 style={{ margin: 0 }}>FreeStyle React 示例</h1>
      </FsHeader>

      <div
        style={{
          display: 'flex',
          marginTop: 16,
          gap: 16,
          flex: 1
        }}
      >
        <FsAside
          width={220}
          border
        >
          <h3 style={{ marginTop: 0, marginBottom: 8, fontSize: 14 }}>示例导航</h3>
          <FsMenu
            mode="vertical"
            activeKey={activeDemo}
            onSelect={(key) => setActiveDemo(key)}
          >
            {demoMenuTree.map((node) =>
              node.children && node.children.length > 0 ? (
                <FsSubMenu
                  key={node.key}
                  itemKey={node.key}
                  title={node.title}
                >
                  {node.children.map((child) => (
                    <FsMenuItem
                      key={child.key}
                      itemKey={child.key}
                    >
                      {child.title}
                    </FsMenuItem>
                  ))}
                </FsSubMenu>
              ) : (
                <FsMenuItem
                  key={node.key}
                  itemKey={node.key}
                >
                  {node.title}
                </FsMenuItem>
              )
            )}
          </FsMenu>
        </FsAside>
        <FsMain
          style={{
            paddingLeft: 0,
            paddingRight: 0,
            paddingTop: 0
          }}
        >
          {activeDemo === 'basic-button' && (
            <>
              <section style={{ marginTop: 16 }}>
                <h2>1. 不同类型（fsType）</h2>
                {types.map((t) => (
                  <FsButton key={t} fsType={t} style={{ marginRight: 8, marginBottom: 8 }}>
                    {t}
                  </FsButton>
                ))}
              </section>

              <section style={{ marginTop: 24 }}>
                <h2>2. 不同尺寸（size）</h2>
                {sizes.map((s) => (
                  <FsButton key={s} size={s} style={{ marginRight: 8 }}>
                    {s}
                  </FsButton>
                ))}
              </section>

              <section style={{ marginTop: 24 }}>
                <h2>3. 朴素按钮（plain）</h2>
                {types
                  .filter((t) => t !== 'text')
                  .map((t) => (
                    <FsButton
                      key={t}
                      fsType={t}
                      plain
                      style={{ marginRight: 8, marginBottom: 8 }}
                    >
                      {t}
                    </FsButton>
                  ))}
              </section>

              <section style={{ marginTop: 24 }}>
                <h2>4. 圆角 / 圆形（round / circle）</h2>
                <FsButton fsType="primary" round style={{ marginRight: 8 }}>
                  Round
                </FsButton>
                <FsButton fsType="success" circle>
                  +
                </FsButton>
              </section>

              <section style={{ marginTop: 24 }}>
                <h2>5. 带图标（icon）</h2>
                <FsButton fsType="primary" icon="fs-icon-plus" style={{ marginRight: 8 }}>
                  新增
                </FsButton>
                <FsButton fsType="danger" icon="fs-icon-delete">
                  删除
                </FsButton>
              </section>

              <section style={{ marginTop: 24 }}>
                <h2>6. 加载中（loading）</h2>
                <FsButton fsType="primary" loading style={{ marginRight: 8 }}>
                  Loading
                </FsButton>
                <FsButton fsType="success" loading>
                  Loading
                </FsButton>
              </section>

              <section style={{ marginTop: 24 }}>
                <h2>7. 聚焦</h2>
                <FsButton
                  fsType="danger"
                  autoFocus
                >
                  初始聚焦
                </FsButton>
              </section>

              <section style={{ marginTop: 24 }}>
                <h2>8. 禁用 & 自定义样式</h2>
                <FsButton fsType="primary" disabled style={{ marginRight: 8 }}>
                  禁用按钮
                </FsButton>
                <FsButton
                  fsType="primary"
                  className="fs-btn-custom-hover"
                  fsStyle={{
                    background: 'linear-gradient(90deg, #ff7e5f, #feb47b)',
                    border: 'none',
                    color: '#fff',
                    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.25)'
                  }}
                >
                  自定义样式按钮
                </FsButton>
              </section>
            </>
          )}

          {activeDemo === 'basic-container' && (
            <section style={{ marginTop: 16 }}>
              <h2>Container 布局示例</h2>
              <p>当前页面即是使用 FsContainer / FsHeader / FsAside / FsMain / FsFooter 的布局示例。</p>
            </section>
          )}

          {(activeDemo === 'navigation-menu' || activeDemo === 'navigation-collapse') && (
            <section style={{ marginTop: 16 }}>
              <h2>导航组件示例</h2>
              <p>导航组件（菜单 / 折叠面板）在侧边栏和其它示例中使用，这里预留更详细的演示位置。</p>
            </section>
          )}
        </FsMain>
      </div>

      <FsFooter
        height={40}
        border
        style={{ marginTop: 24 }}
      >
        页脚区域
      </FsFooter>
    </FsContainer>
  );
}

if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}
