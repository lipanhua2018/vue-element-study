<template>
    <div class="sever-component">
            {{tipStr}}
    </div>
</template>

<script>
export default {
    name: 'sever-component',
    data () {
        return {
            tipStr: '就是几个字，这个是sever模块'
        }
    },

}
</script>

<style lang="scss" scoped>
.sever-component{
    font-size: 14px;
    color: red;
}
</style>