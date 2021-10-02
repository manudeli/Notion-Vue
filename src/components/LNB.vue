<template>
  <nav>
    <div class="header">
      <div class="user-profile"></div>
      Leon's Notion
    </div>
    <ul>
      <WorkspaceItem
        v-for="workspace in workspaces"
        :key="workspace.id"
        :workspace="workspace"
      />
    </ul>
    <div class="actions"></div>
  </nav>
</template>

<script>
import WorkspaceItem from '@/components/WorkspaceItem'

export default {
  components: {
    WorkspaceItem,
  },
  computed: {
    workspaces() {
      return this.$store.state.workspace.workspaces
    },
  },
  created() {
    this.$store.dispatch('workspace/readWorkspaces')
  },
}
</script>

<style lang="scss" scoped>
nav {
  width: 240px;
  height: 100%;
  background-color: $color-background;
  .header {
    padding: 14px;
    font-weight: 700;
    display: flex;
    align-items: center;
    .user-profile {
      width: 20px;
      height: 20px;
      border-radius: 4px;
      margin-right: 10px;
      background-image: url('https://avatars.githubusercontent.com/u/61593290?v=4');
      background-size: cover;
    }
  }
  ul {
  }
  .actions {
  }
}
</style>
