<template>
  <div class="sag-tree">
    <div class="tree-item" :class="isBottom(o) && 'tree-item--bottom'" v-for="o in data" :key="o.id">
      <div class="tree-item-line">
        <img
        v-if="!isBottom(o)"
        @click="isExpend(o) ? expendIds = expendIds.filter(id => o.id !== id) : expendIds.push(o.id)"
        class="tree-item-arrow"
        :class="isExpend(o) && 'tree-item-arrow__active'"
        src="../../assets/sanjiao.svg"
        alt
      />
      <div class="tree-item-title" v-if="o.children && o.children.length !== 0">{{o.title}}</div>
      </div>
      <sag-tree :data="o.children" v-show="isExpend(o)"></sag-tree>
      <card :data="o" v-if="isBottom(o)"></card>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SagTree',
  props: {
    data: {
      type: Array,
      default: () => [],
    },
    renderContent: Function,
  },
  components: {
    card: {
      props: {
        data: {
          default: () => ({}),
        },
      },
      render (h) {
        return (
          this.$parent.root &&
          this.$parent.root.renderContent &&
          this.$parent.root.renderContent(h, this.data)
        )
      },
    },
  },
  data () {
    return {
      expendIds: [],
    }
  },
  provide () {
    if (this.$parent.$options.name !== this.$options.name) {
      const root = this
      return {
        root,
      }
    }
  },
  inject: {
    root: {
      default: this,
    },
  },
  computed: {
    isExpend () {
      return o => this.expendIds.includes(o.id)
    },
    isBottom () {
      return o => !o.children || o.children.length === 0
    },
  },
}
</script>

<style lang="scss">
.tree-item {
  margin-left: 1rem;
  font-size: 14px;
  .tree-item-line {
    display: flex;
    align-items: center;
    height: 1.5rem;
    .tree-item-arrow {
      $s: 20px;
      width: $s;
      height: $s;
      transition: transform 0.3s ease-in-out;
      &.tree-item-arrow__active {
        transform: rotate(90deg);
      }
    }
    .tree-item-title {
      display: inline-flex;
    }
  }
  &.tree-item--bottom {
    display: inline-flex;
  }
}
</style>
