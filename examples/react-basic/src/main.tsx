import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import {
  FsAside,
  FsButton,
  FsButtonGroup,
  FsContainer,
  FsFooter,
  FsHeader,
  FsMain,
  FsMenu,
  FsMenuItem,
  FsSubMenu,
  FsNavBar,
  FsNavSide,
  FsCollapse,
  FsCollapseItem,
  FsIcon
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

type IconName = Parameters<typeof FsIcon>[0]['name'];

const iconGroups: Array<{
  key: string;
  title: string;
  icons: IconName[];
}> = [
  {
    key: 'direction',
    title: '方向性（direction）',
    icons: [
      'arrowLeft',
      'arrowRight',
      'arrowUp',
      'arrowDown',
      'arrowUpDown',
      'chevronLeft',
      'chevronRight'
    ]
  },
  {
    key: 'feedback',
    title: '状态 / 提示（feedback）',
    icons: ['info', 'success', 'warning', 'error', 'question']
  },
  {
    key: 'edit',
    title: '编辑操作（edit）',
    icons: ['plus', 'minus', 'edit', 'delete', 'copy']
  },
  {
    key: 'data',
    title: '数据 / 图表（data）',
    icons: ['chartBar', 'chartLine', 'chartPie', 'trendUp', 'trendDown']
  },
  {
    key: 'common',
    title: '通用（common）',
    icons: ['home', 'search', 'settings', 'user', 'refresh', 'close']
  }
];

function getIconColor(name: IconName): string | undefined {
  switch (name) {
    case 'success':
      return '#67c23a';
    case 'warning':
      return '#e6a23c';
    case 'error':
      return '#f56c6c';
    case 'info':
      return '#409eff';
    case 'question':
      return '#909399';
    default:
      return undefined;
  }
}

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
    children: [
      { key: 'basic-button', title: 'button' },
      { key: 'basic-icon', title: 'icon' }
    ]
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
  const [navTopActive, setNavTopActive] = useState<string>('home');
  const [navSideActive, setNavSideActive] = useState<string>('dashboard');

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
        bordered
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
          bordered
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
                <h2>7. 按钮组（ButtonGroup）</h2>
                <FsButtonGroup fsType="primary" style={{ marginBottom: 12 }} >
                  <FsButton>左</FsButton>
                  <FsButton>中</FsButton>
                  <FsButton>右</FsButton>
                </FsButtonGroup>
                <FsButtonGroup style={{ marginLeft: 12 }} direction="vertical" fsType="success" size="small">
                  <FsButton>上</FsButton>
                  <FsButton>下</FsButton>
                </FsButtonGroup>
                <FsButtonGroup fsType="info" disabled style={{ marginTop: 12 ,marginLeft: 12}} >
                  <FsButton>禁用 1</FsButton>
                  <FsButton>禁用 2</FsButton>
                  <FsButton>禁用 3</FsButton>
                </FsButtonGroup>
              </section>

              <section style={{ marginTop: 24 }}>
                <h2>8. 聚焦</h2>
                <FsButton
                  fsType="danger"
                  autoFocus
                >
                  初始聚焦
                </FsButton>
              </section>

              <section style={{ marginTop: 24 }}>
                <h2>9. 禁用 & 自定义样式</h2>
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
                    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.25)',
                    borderRadius: '8px',
                  }}
                >
                  自定义样式按钮
                </FsButton>
              </section>
            </>
          )}

          {activeDemo === 'basic-icon' && (
            <section style={{ marginTop: 16 }}>
              <h2>图标组件（FsIcon）</h2>
              <p>使用 FsIcon 渲染不同分类下的线框图标。</p>
              {iconGroups.map((group) => (
                <section
                  key={group.key}
                  style={{ marginTop: 16 }}
                >
                  <h3 style={{ marginBottom: 8 }}>{group.title}</h3>
                  <div
                    style={{
                      display: 'flex',
                      flexWrap: 'wrap',
                      gap: 16,
                      marginTop: 4
                    }}
                  >
                    {group.icons.map((name) => (
                      <div
                        key={name}
                        style={{
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                          width: 80
                        }}
                      >
                        <FsIcon
                          name={name}
                          size={48}
                          color={getIconColor(name)}
                        />
                        <span
                          style={{
                            marginTop: 4,
                            fontSize: 12,
                            color: '#606266'
                          }}
                        >
                          {name}
                        </span>
                      </div>
                    ))}
                  </div>
                </section>
              ))}
            </section>
          )}

          {activeDemo === 'basic-container' && (
            <section style={{ marginTop: 16 }}>
              <h2>Container 布局示例</h2>
              <p>使用 FsContainer / FsHeader / FsAside / FsMain / FsFooter 构建基础布局。</p>
              <div
                style={{
                  border: '1px solid #ebeef5',
                  borderRadius: 4,
                  overflow: 'hidden',
                  marginTop: 12
                }}
              >
                <FsContainer
                  fullWidth={false}
                  maxWidth={800}
                  paddingX={0}
                  paddingY={0}
                  fsStyle={{ minHeight: 220 }}
                >
                  <FsHeader
                    height={40}
                    bordered
                    fsStyle={{ backgroundColor: '#f5f7fa' }}
                  >
                    Header
                  </FsHeader>
                  <div style={{ display: 'flex', minHeight: 140 }}>
                    <FsAside
                      width={160}
                      bordered
                      fsStyle={{ backgroundColor: '#fafafa', padding: 12 }}
                    >
                      Aside
                    </FsAside>
                    <FsMain fsStyle={{ padding: 12 }}>
                      Main 内容区域，可以放表格、卡片等内容。
                    </FsMain>
                  </div>
                  <FsFooter
                    height={32}
                    bordered
                    fsStyle={{ backgroundColor: '#f5f7fa' }}
                  >
                    Footer
                  </FsFooter>
                </FsContainer>
              </div>
            </section>
          )}

          {activeDemo === 'navigation-menu' && (
            <section style={{ marginTop: 16 }}>
              <h2>导航菜单示例</h2>
              <p>使用 FsNavBar / FsNavSide / FsMenu 构建顶部 + 侧边导航。</p>
              <div
                style={{
                  border: '1px solid #ebeef5',
                  borderRadius: 4,
                  overflow: 'hidden',
                  marginTop: 12
                }}
              >
                <FsNavBar
                  height={40}
                  fsStyle={{ paddingLeft: 16, paddingRight: 16 }}
                >
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      width: '100%'
                    }}
                  >
                    <span>Brand</span>
                    <FsMenu
                      mode="horizontal"
                      activeKey={navTopActive}
                      onSelect={(key) => setNavTopActive(key)}
                    >
                      <FsMenuItem itemKey="home">首页</FsMenuItem>
                      <FsMenuItem itemKey="docs">文档</FsMenuItem>
                      <FsMenuItem itemKey="about">关于</FsMenuItem>
                    </FsMenu>
                  </div>
                </FsNavBar>
                <div style={{ display: 'flex', minHeight: 140 }}>
                  <FsNavSide width={160}>
                    <FsMenu
                      mode="vertical"
                      activeKey={navSideActive}
                      onSelect={(key) => setNavSideActive(key)}
                    >
                      <FsMenuItem itemKey="dashboard">
                        Dashboard
                      </FsMenuItem>
                      <FsSubMenu
                        itemKey="user"
                        title="用户"
                      >
                        <FsMenuItem itemKey="user-list">
                          用户列表
                        </FsMenuItem>
                        <FsMenuItem itemKey="user-role">
                          角色管理
                        </FsMenuItem>
                      </FsSubMenu>
                    </FsMenu>
                  </FsNavSide>
                  <FsMain fsStyle={{ padding: 16 }}>
                    主内容区域，可根据菜单切换不同页面内容。
                  </FsMain>
                </div>
              </div>
            </section>
          )}

          {activeDemo === 'navigation-collapse' && (
            <section style={{ marginTop: 16 }}>
              <h2>折叠面板示例</h2>
              <p>使用 FsCollapse / FsCollapseItem 展示可展开/收起的内容块。</p>
              <FsCollapse
                defaultActiveKeys={['panel-1']}
                style={{ marginTop: 12 }}
              >
                <FsCollapseItem
                  itemKey="panel-1"
                  title="面板一"
                >
                  面板一的内容区域，可以放入任意组件。
                </FsCollapseItem>
                <FsCollapseItem
                  itemKey="panel-2"
                  title="面板二"
                >
                  面板二的内容区域。
                </FsCollapseItem>
                <FsCollapseItem
                  itemKey="panel-3"
                  title="面板三（禁用）"
                  disabled
                >
                  这是一个禁用的面板。
                </FsCollapseItem>
              </FsCollapse>
            </section>
          )}
        </FsMain>
      </div>

      <FsFooter
        height={40}
        bordered
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
