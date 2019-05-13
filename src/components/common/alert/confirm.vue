<template>
    <div class="confirm-shade" v-if="show">
        <div class="confirm-box">
            <div class="content">
                <h4>{{notice.title}}</h4>
                <div class="tip-text">{{notice.text}}</div>
            </div>
            <div class="btn-box">
                <span @click="customCancel" class="cancel-btn custom-btn">{{notice.cancel}}</span>
                <span @click="customConfirm" class="confirm-btn custom-btn">{{notice.confirm}}</span>
            </div>
        </div>
    </div>  
</template>

<script>
let seed = 0;

function getUuid() {
    return 'confirm_' + (seed++);
}

export default {
    name: 'confirm',
    data () {
        return {
            show: false,
            name: 'confirm',
            notice: {}
        }
    },
    methods: {
        setContent (obj) {
            this.show = true;
            this.notice = Object({name: getUuid()}, obj);
        },

        customConfirm () {
            this.show = false;       
            return true
        },
        customCancel () {
            this.show = false;
            return false
        }
    }
}
</script>

<style>
html, body{
				width: 100%;
				height: 100%;
				margin: 0;		
			}
			h4{
				margin: 0;
				color: #333;
			}
			.confirm-shade{
			    width: 100%;
			    height: 100%;
			    background-color: rgba(0, 0, 0, 0.1);
			    overflow: hidden;
			}
			.confirm-box{
			    width: 400px;
			    height: 220px;
			    margin: auto;
			    margin-top: 100px;
			    background-color: white;
			    border: 1px solid #ddd;
			    border-radius: 5px;
			}			
			.content{
				box-sizing: border-box;
			    height: 160px;
			    padding: 20px;			    
			}
			.tip-text{
				color: #333;
				font-size: 16px;
				padding-top: 15px;
				line-height: 30px;
			}
			.btn-box{
				display: flex;
			    height: 60px;	
			    align-items: center;
			    justify-content: flex-end;	    
			    background-color: #f5f5f5;
			    border-top: 1px solid #eee;
			    box-sizing: border-box;
			}
			.custom-btn{
			    margin-right: 20px;
			    width: 70px;
			    height: 30px;
			    box-sizing: border-box;			    
			    line-height: 30px;
			    text-align: center;
			    border-radius: 4px;
			    cursor: pointer;
			    color: white;
			}
			.confirm-btn{
				background-color: rgba(0, 102, 255, 0.5);
			}
			.cancel-btn{
				background-color: rgba(204, 51, 0, 0.5);
			}
			.confirm-btn:hover{
				background-color: rgba(0, 102, 255, 0.8);
			}
			.cancel-btn:hover{
				background-color: rgba(204, 51, 0, 0.8);
			}
</style>
