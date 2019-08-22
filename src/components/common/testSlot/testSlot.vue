<template>
    <div class="slot-root">
        <h3>slot插槽</h3>
        <div class="tip"><slot name="tip"></slot></div>        
        <div class="btn">
            <slot name="btn"></slot>
        </div>
    </div>
</template>

<script>
export default {
    name: 'testSlot',
    data () {
        return {
            data: 'testSlot'
        }
    },
    created () {

    },
    mounted () {

    },
    methods: {

    }
}
</script>

<style lang="scss">
.slot-root{
    .tip{
        color: orange;
    }
    .btn{
        background-color: yellowgreen;
    }
}
</style>
