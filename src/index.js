import SagTree from './package/Tree'

const components = [
  SagTree,
]

const install = vue => {
  components.forEach(component => {
    vue.component(component.name, component)
  })
}

export default {
  install,
  SagTree,
}
