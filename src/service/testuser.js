export default {
    data () {
        return {
            userA: '张梦琳',
            userB: '马化腾'
        }
    },
    methods: {
        getUser () {
            console.log(this.userA)
        }
    }
}