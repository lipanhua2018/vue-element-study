<template>
    <div class="slotScope-root">
        <ul>
            <li v-for="(item,index) in bookList" :key="index">
                <slot :item="item">{{item.name}}</slot>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    name: 'slotScope',
    data () {
        return {
            data: 'slotScope'
        }
    },
    props: ['bookList'],
    created () {

    },
    mounted () {
        console.log(this.bookList, 24)
    }
}
</script>
 <style lang="scss" scope>
 
 </style>
 