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
      border
    >
      <h1 style="margin: 0;">FreeStyle Vue Button 示例</h1>
    </FsHeader>

    <div style="display: flex; margin-top: 16px; gap: 16px; flex: 1 1 auto;">
      <FsAside
        :width="220"
        border
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
      <FsButton fs-type="primary" round style="margin-right: 8px;">
        Round
      </FsButton>
      <FsButton fs-type="success" circle>
        +
      </FsButton>
    </section>

    <section style="margin-top: 24px;">
      <h2>5. 带图标（icon）</h2>
      <FsButton fs-type="primary" icon="fs-icon-plus" style="margin-right: 8px;">
        新增
      </FsButton>
      <FsButton fs-type="danger" icon="fs-icon-delete">
        删除
      </FsButton>
    </section>

    <section style="margin-top: 24px;">
      <h2>6. 加载中（loading）</h2>
      <FsButton fs-type="primary" loading style="margin-right: 8px;">
        Loading
      </FsButton>
      <FsButton fs-type="success" loading>
        Loading
      </FsButton>
    </section>

    <section style="margin-top: 24px;">
      <h2>7. 聚焦</h2>
      <FsButton
        fs-type="primary"
        autofocus
      >
        初始聚焦
      </FsButton>
    </section>
        </div>

        <section
          v-if="activeDemo === 'basic-container'"
          style="margin-top: 16px;"
        >
          <h2>Container 布局示例</h2>
          <p>当前页面即是使用 FsContainer / FsHeader / FsAside / FsMain / FsFooter 的布局示例。</p>
        </section>

        <section
          v-if="activeDemo === 'navigation-menu' || activeDemo === 'navigation-collapse'"
          style="margin-top: 16px;"
        >
          <h2>导航组件示例</h2>
          <p>导航组件（菜单 / 折叠面板）在侧边栏和其它示例中使用，这里预留更详细的演示位置。</p>
        </section>
      </FsMain>
    </div>

    <FsFooter
      :height="40"
      border
      style="margin-top: 24px;"
    >
      页脚区域
    </FsFooter>
  </FsContainer>
</template>

<script setup lang="ts">
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
} from '@freestyle/vue';

const types = ['primary', 'success', 'warning', 'danger', 'info', 'text'] as const;
const sizes = ['large', 'medium', 'small', 'mini'] as const;
const activeDemo = ref('basic-button');
</script>
