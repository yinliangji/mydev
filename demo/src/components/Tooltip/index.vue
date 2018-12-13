<template>
    <div class="TooltipWrap" :style="L?'right:auto;left:'+L+'px':''">
        <Tooltip  :placement="placement">
            <div slot="content" :style="'white-space:normal;width:'+W+'px;'">
                {{content}}
            </div>
            <Icon type="ios-help" :size="size" :color="color"></Icon>
        </Tooltip>
    </div>
</template>
<script>
export default {
	data() {
		return {
			
		}
	},
	props: {
        size: {
            type: [String,Number,Boolean,Function,Object,Array,Symbol],
            default: function() {
                return "24";
            }
        },
        color: {
            type: [String,Number,Boolean,Function,Object,Array,Symbol],
            default: function() {
                return "#80848f";
            }
        },
        content: {
            type: [String,Number,Boolean,Function,Object,Array,Symbol],
            default: function() {
                return "text";
            }
        },
        placement: {
            type: [String,Number,Boolean,Function,Object,Array,Symbol],
            default: function() {
                return "top-end";
            }
        },
        W:{
            type: [String,Number,Boolean,Function,Object,Array,Symbol],
            default: function() {
                return 200;
            }
        },
        L:{
            type: [String,Number,Boolean,Function,Object,Array,Symbol],
            default: function() {
                return false;
            }
        },
    },
    mounted(){
    	
	},
}
	

</script>
<style lang="less" scoped>
.TooltipWrap{
    width:24px;height: 24px; position: absolute; right: -28px;top:4px;
}

</style>