<template>
	<div>
        <Breadcrumb :style="{margin: '16px 0'}">
            <BreadcrumbItem>首页</BreadcrumbItem>
            <BreadcrumbItem>工作台</BreadcrumbItem>
            <BreadcrumbItem>我的任务</BreadcrumbItem>
        </Breadcrumb>
        <Card>
            <div >
                <img :src="DemoImg" />
            </div>
        </Card>

    </div>
</template>
<script>
import DemoImg from "@/assets/images/demo.jpg";
import imgSrc from "../../assets/images/demo.jpg";
export default {
    data(){
        return{
            DemoImg,
        }
    }
}
</script>
<style lang="less" scoped>
@import './style.less';

img {
    margin:0 auto;
    max-width: 100%;
}

</style>