import Tree from './index.vue'

Tree.install = vue => {
  vue.component(Tree.name, Tree)
}

export default Tree
