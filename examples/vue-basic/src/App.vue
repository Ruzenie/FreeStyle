<template>
  <FsContainer
    :padding-x="16"
    :padding-y="16"
    :fs-style="{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column'
    }"
    style="font-family: system-ui, -apple-system, BlinkMacSystemFont, sans-serif;"
  >
    <FsHeader
      :height="56"
      bordered
    >
      <h1 style="margin: 0;">FreeStyle Vue 示例</h1>
    </FsHeader>

    <div style="display: flex; margin-top: 16px; gap: 16px; flex: 1 1 auto;">
      <FsAside
        :width="220"
        bordered
      >
        <h3 style="margin-top: 0; margin-bottom: 8px; font-size: 14px;">示例导航</h3>
        <FsMenu
          mode="vertical"
          v-model:activeKey="activeDemo"
        >
          <FsSubMenu
            item-key="basic"
            title="basic"
          >
            <FsMenuItem item-key="basic-button">
              button
            </FsMenuItem>
            <FsMenuItem item-key="basic-icon">
              icon
            </FsMenuItem>
          </FsSubMenu>
          <FsSubMenu
            item-key="layout"
            title="container"
          >
            <FsMenuItem item-key="basic-container">
              layout
            </FsMenuItem>
          </FsSubMenu>
          <FsSubMenu
            item-key="navigation"
            title="navigation"
          >
            <FsMenuItem item-key="navigation-menu">
              menu
            </FsMenuItem>
            <FsMenuItem item-key="navigation-collapse">
              collapse
            </FsMenuItem>
          </FsSubMenu>
        </FsMenu>
      </FsAside>
      <FsMain
        :fs-style="{
          paddingLeft: 0,
          paddingRight: 0,
          paddingTop: 0
        }"
      >
        <div v-if="activeDemo === 'basic-button'">
          <section style="margin-top: 16px;">
            <h2>1. 不同类型（fsType）</h2>
            <FsButton
              v-for="t in types"
              :key="t"
              :fs-type="t"
              style="margin-right: 8px; margin-bottom: 8px;"
            >
              {{ t }}
            </FsButton>
          </section>

          <section style="margin-top: 24px;">
            <h2>2. 不同尺寸（size）</h2>
            <FsButton
              v-for="s in sizes"
              :key="s"
              :size="s"
              style="margin-right: 8px;"
            >
              {{ s }}
            </FsButton>
          </section>

          <section style="margin-top: 24px;">
            <h2>3. 朴素按钮（plain）</h2>
            <FsButton
              v-for="t in types.filter((t) => t !== 'text')"
              :key="t"
              :fs-type="t"
              plain
              style="margin-right: 8px; margin-bottom: 8px;"
            >
              {{ t }}
            </FsButton>
          </section>

          <section style="margin-top: 24px;">
            <h2>4. 圆角 / 圆形（round / circle）</h2>
            <FsButton
              fs-type="primary"
              round
              style="margin-right: 8px;"
            >
              Round
            </FsButton>
            <FsButton
              fs-type="success"
              circle
            >
              +
            </FsButton>
          </section>

          <section style="margin-top: 24px;">
            <h2>5. 带图标（icon）</h2>
            <FsButton
              fs-type="primary"
              icon="fs-icon-plus"
              style="margin-right: 8px;"
            >
              新增
            </FsButton>
            <FsButton
              fs-type="danger"
              icon="fs-icon-delete"
            >
              删除
            </FsButton>
          </section>

          <section style="margin-top: 24px;">
            <h2>6. 加载中（loading）</h2>
            <FsButton
              fs-type="primary"
              loading
              style="margin-right: 8px;"
            >
              Loading
            </FsButton>
            <FsButton
              fs-type="success"
              loading
            >
              Loading
            </FsButton>
          </section>

          <section style="margin-top: 24px;">
            <h2>7. 按钮组（ButtonGroup）</h2>
            <FsButtonGroup fs-type="primary" style="margin-bottom: 12px;">
              <FsButton>左</FsButton>
              <FsButton>中</FsButton>
              <FsButton>右</FsButton>
            </FsButtonGroup>
            <FsButtonGroup direction="vertical" fs-type="success" size="small">
              <FsButton>上</FsButton>
              <FsButton>下</FsButton>
            </FsButtonGroup>
            <FsButtonGroup fs-type="info" :disabled="true" style="margin-top: 12px;">
              <FsButton>禁用 1</FsButton>
              <FsButton>禁用 2</FsButton>
              <FsButton>禁用 3</FsButton>
            </FsButtonGroup>
          </section>

          <section style="margin-top: 24px;">
            <h2>8. 聚焦</h2>
            <FsButton
              fs-type="primary"
              autofocus
            >
              初始聚焦
            </FsButton>
          </section>

        </div>

        <section
          v-if="activeDemo === 'basic-icon'"
          style="margin-top: 16px;"
        >
          <h2>图标组件（FsIcon）</h2>
          <p>使用 FsIcon 渲染不同分类下的线框图标。</p>
          <section
            v-for="group in iconGroups"
            :key="group.key"
            style="margin-top: 16px;"
          >
            <h3 style="margin-bottom: 8px;">
              {{ group.title }}
            </h3>
            <div
              style="
                display: flex;
                flex-wrap: wrap;
                gap: 16px;
                margin-top: 4px;
              "
            >
              <div
                v-for="name in group.icons"
                :key="name"
                style="
                  display: flex;
                  flex-direction: column;
                  align-items: center;
                  width: 80px;
                "
              >
                <FsIcon
                  :name="name"
                  :size="48"
                  :color="getIconColor(name)"
                />
                <span
                  style="
                    margin-top: 4px;
                    font-size: 12px;
                    color: #606266;
                  "
                >
                  {{ name }}
                </span>
              </div>
            </div>
          </section>
        </section>

        <section
          v-if="activeDemo === 'basic-container'"
          style="margin-top: 16px;"
        >
          <h2>Container 布局示例</h2>
          <p>使用 FsContainer / FsHeader / FsAside / FsMain / FsFooter 构建基础布局。</p>
          <div
            style="border: 1px solid #ebeef5; border-radius: 4px; overflow: hidden; margin-top: 12px;"
          >
            <FsContainer
              :full-width="false"
              :max-width="800"
              :padding-x="0"
              :padding-y="0"
              :fs-style="{ minHeight: '220px' }"
            >
              <FsHeader
                :height="40"
                bordered
                :fs-style="{ backgroundColor: '#f5f7fa' }"
              >
                Header
              </FsHeader>
              <div style="display: flex; min-height: 140px;">
                <FsAside
                  :width="160"
                  bordered
                  :fs-style="{ backgroundColor: '#fafafa', padding: '12px' }"
                >
                  Aside
                </FsAside>
                <FsMain :fs-style="{ padding: '12px' }">
                  Main 内容区域，可以放表格、卡片等内容。
                </FsMain>
              </div>
              <FsFooter
                :height="32"
                bordered
                :fs-style="{ backgroundColor: '#f5f7fa' }"
              >
                Footer
              </FsFooter>
            </FsContainer>
          </div>
        </section>

        <section
          v-if="activeDemo === 'navigation-menu'"
          style="margin-top: 16px;"
        >
          <h2>导航菜单示例</h2>
          <p>使用 FsNavBar / FsNavSide / FsMenu 构建顶部 + 侧边导航。</p>
          <div
            style="border: 1px solid #ebeef5; border-radius: 4px; overflow: hidden; margin-top: 12px;"
          >
            <FsNavBar
              :height="40"
              :fs-style="{ paddingLeft: '16px', paddingRight: '16px' }"
            >
              <div
                style="display: flex; align-items: center; justify-content: space-between; width: 100%;"
              >
                <span>Brand</span>
                <FsMenu
                  mode="horizontal"
                  v-model:activeKey="navTopActive"
                >
                  <FsMenuItem item-key="home">
                    首页
                  </FsMenuItem>
                  <FsMenuItem item-key="docs">
                    文档
                  </FsMenuItem>
                  <FsMenuItem item-key="about">
                    关于
                  </FsMenuItem>
                </FsMenu>
              </div>
            </FsNavBar>
            <div style="display: flex; min-height: 140px;">
              <FsNavSide :width="160">
                <FsMenu
                  mode="vertical"
                  v-model:activeKey="navSideActive"
                >
                  <FsMenuItem item-key="dashboard">
                    Dashboard
                  </FsMenuItem>
                  <FsSubMenu
                    item-key="user"
                    title="用户"
                  >
                    <FsMenuItem item-key="user-list">
                      用户列表
                    </FsMenuItem>
                    <FsMenuItem item-key="user-role">
                      角色管理
                    </FsMenuItem>
                  </FsSubMenu>
                </FsMenu>
              </FsNavSide>
              <FsMain :fs-style="{ padding: '16px' }">
                主内容区域，可根据菜单切换不同页面内容。
              </FsMain>
            </div>
          </div>
        </section>

        <section
          v-if="activeDemo === 'navigation-collapse'"
          style="margin-top: 16px;"
        >
          <h2>折叠面板示例</h2>
          <p>使用 FsCollapse / FsCollapseItem 展示可展开/收起的内容块。</p>
          <FsCollapse
            :default-active-keys="['panel-1']"
            style="margin-top: 12px;"
          >
            <FsCollapseItem
              item-key="panel-1"
              title="面板一"
            >
              面板一的内容区域，可以放入任意组件。
            </FsCollapseItem>
            <FsCollapseItem
              item-key="panel-2"
              title="面板二"
            >
              面板二的内容区域。
            </FsCollapseItem>
            <FsCollapseItem
              item-key="panel-3"
              title="面板三（禁用）"
              :disabled="true"
            >
              这是一个禁用的面板。
            </FsCollapseItem>
          </FsCollapse>
        </section>
      </FsMain>
    </div>

    <FsFooter
      :height="40"
      style="margin-top: 24px;"
      bordered
    >
      页脚区域
    </FsFooter>
  </FsContainer>
</template>

<script setup lang="ts">
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
} from '@freestyle/vue';
import { ref } from 'vue';

const types = ['primary', 'success', 'warning', 'danger', 'info', 'text'] as const;
const sizes = ['large', 'medium', 'small', 'mini'] as const;
const activeDemo = ref('basic-button');
const navTopActive = ref('home');
const navSideActive = ref('dashboard');

const iconGroups = [
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
] as const;

function getIconColor(name: string): string | undefined {
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
</script>
