function broadcast(componentName, eventName, params) {  // 向下传递数据
    this.$children.forEach(child => {
      const name = child.name;
  
      if (name === componentName) {
        child.$emit.apply(child, [eventName].concat(params));
      } else {
        broadcast.apply(child, [componentName, eventName].concat([params]));
      }
    });
  }
  export default {
    methods: {
    // 使用方法，传入一个组件名称，即你需要传递的目标组件的名称，定义一个自定义的事件，目标组件需要使用$on监听这个自定义事件，params是传递过去的数据
      dispatch(componentName, eventName, params) {  // 向上传递数据
        let parent = this.$parent || this.$root;
        let name = parent.name;
  
        while (parent && (!name || name !== componentName)) {
          parent = parent.$parent;
  
          if (parent) {
            name = parent.name;
          }
        }
        if (parent) {
          parent.$emit.apply(parent, [eventName].concat(params));
        }
      },
      broadcast(componentName, eventName, params) {
        broadcast.call(this, componentName, eventName, params);
      }
    }
  };