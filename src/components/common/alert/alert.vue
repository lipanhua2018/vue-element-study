<template>
    <div class="alert">
        <div class="alert-main" v-for="(item, index) in notices" :key="index">
            <div class="alert-content">
                {{item.content}}
            </div>
        </div>
    </div>
</template>

<script>

let seed = 0;

function getUuid() {
    // console.log(seed)
    return 'alert_' + (seed++);
}

export default {
    name: 'alert',
    data () {
        return {
            name: 'alert',
            notices: [] // 因为通知信息有可能是多个 因此这里用数组来存储通知信息
        }
    },
    methods: {
        add (notice) {
            const name = getUuid();

            let _notice = Object.assign({name: name}, notice);

            this.notices.push(_notice);

            const duration = notice.duration;

            // 定时移出单位
            setTimeout(() => {
                this.remove(name)
            }, duration * 1000)
        },
        remove (name) {
            const notices = this.notices;

            for (let i = 0, len = notices.length; i < len; i++ ) {
                if (notices[i].name === name) {
                    this.notices.splice(i, 1);
                    break;
                }
            }
        }
    }
}
</script>


<style>
  .alert{
    position: fixed;
    width: 100%;
    top: 16px;
    left: 0;
    text-align: center;
    pointer-events: none;
  }
  .alert-content{
    display: inline-block;
    padding: 8px 16px;
    background: #fff;
    border-radius: 3px;
    box-shadow: 0 1px 6px rgba(0, 0, 0, .2);
    margin-bottom: 8px;
  }
</style>
