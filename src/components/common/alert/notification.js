// notification.js
import Alert from './alert.vue';
import Vue from 'vue';

Alert.newInstance = properties => {
    console.log(Alert)
    const props = properties || {};

    const Instance = new Vue({
        data: props,
        render (h) {
        return h(Alert, {props: props});
        }
    });

    const component = Instance.$mount();
    // console.log(component.$el, component)
    document.body.appendChild(component.$el);
    // 因为 Instance 下只 Render 了 Notification 一个子组件，所以可以用 $children[0] 访问到
    const alert = Instance.$children[0];

    return {
        add (noticeProps) {
            alert.add(noticeProps);
        },
        remove (name) {
            alert.remove(name);
        }
    }
};
export default Alert;