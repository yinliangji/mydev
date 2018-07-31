<template>
    <div class="goAgile" :style="{top: Top+'px'}">
        <router-link  :to="togo" >
            <Button >
                {{cont}}
                <Icon type="chevron-right"></Icon>
            </Button>
        </router-link>
    </div>
</template>
<script>
export default {
	data() {
		return {
			togo:this.go,
			cont:this.text,
		}
	},
	props: {
        go: {
            type: [String,Number,Boolean,Function,Object,Array,Symbol],
            default: function() {
                return false;
            }
        },
        Top: {
            type: [String,Number,Boolean,Function,Object,Array,Symbol],
            default: function() {
                return 10;
            }
        },
        text: {
            type: [String,Number,Boolean,Function,Object,Array,Symbol],
            default: function() {
                return "返回敏捷项目列表";
            }
        },
    },
    mounted(){
    	
	},
}
	

</script>
<style lang="less" scoped>
.goAgile {
    position: absolute;
    right:5px;
    top:10px;
    z-index: 10;
}
</style>