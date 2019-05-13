import Confirm from './confirm.vue';
import Vue from 'vue';

Confirm.newInstance = properties => {
    const props = properties || {};

    const Instance = new Vue({
        data: props,
        render (h) {
        return h(Confirm, {props: props});
        }
    });

    
    const component = Instance.$mount();
    document.body.appendChild(component.$el);

    const confirm = Instance.$children[0];

    return {
        setContent (obj) {
            confirm.setContent(obj);
        },
        customConfirm () {
            let bool = confirm.customConfirm();
            return bool;
        },
        customCancel () {
            let bool = confirm.customCancel();
            return bool;
        }
    }
}
export default Confirm;