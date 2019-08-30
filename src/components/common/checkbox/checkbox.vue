<template>
    <div class="checkbox">
        <input type="checkbox" name="checkbox" :value="currentValue" :disabled="disabled" @change="changeFn" />
        <slot></slot>
    </div>
</template>
<script>
export default {
    name: 'checkbox',
    data () {
        return {
            currentValue: this.value
        }
    },
    props: {
        disabled: {
            type: Boolean,
            default: false
        },
        value: {
            type: [Boolean, String, Number],
            default: false
        },
        trueValue: {
            type: [Boolean, String, Number],
            default: true
        },
        falseValue: {
            type: [Boolean, String, Number],
            default: false
        }
    },
    methods: {
        changeFn (event) {
            if (this.disabled) {
                return false
            }
            const checked = event.target.checked;
            this.currentValue = checked;
            
        }
    }
}
</script>
<style lang="scss" scoped>
.checkbox{
    display: inline-block;
}
</style>