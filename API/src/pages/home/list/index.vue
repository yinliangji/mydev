<template>
	<div>
        <Breadcrumb :style="{margin: '16px 0'}">
            <BreadcrumbItem>首页</BreadcrumbItem>
            <BreadcrumbItem>工作台</BreadcrumbItem>
            <BreadcrumbItem>列表</BreadcrumbItem>
        </Breadcrumb>
        <Card>
            <Row class="listCont">
                <Col span="24" class="listBox">
                   
                    <ul class="list">
                        <li>
                            <router-link to="/" ><span>by dinglin</span><time datetime="2018-04-02">2018-04-02</time> <em>修改用户登录方式</em>   </router-link>
                        </li>
                        <li class="redDot">
                            <router-link to="/" ><span>by dinglin</span><time datetime="2018-04-02">2018-04-02</time> <em>修改用户登录方式</em>   </router-link>
                        </li>
                        <li class="greenDot">
                            <router-link to="/" ><span>by dinglin</span><time datetime="2018-04-02">2018-04-02</time> <em>修改用户登录方式</em>   </router-link>
                        </li>
                        <li>
                            <router-link to="/" ><span>by dinglin</span><time datetime="2018-04-02">2018-04-02</time> <em>修改用户登录方式</em>   </router-link>
                        </li>
                        <li>
                            <router-link to="/" ><span>by dinglin</span><time datetime="2018-04-02">2018-04-02</time> <em>修改用户登录方式</em>   </router-link>
                        </li>
                        <li>
                            <router-link to="/" ><span>by dinglin</span><time datetime="2018-04-02">2018-04-02</time> <em>修改用户登录方式</em>   </router-link>
                        </li>
                    </ul>
                </Col>
            </Row>
        </Card>
    </div>
</template>
<script>
	export default {

	}
</script>
<style lang="less" scoped>
@import './style.less';
.listBox {
    overflow:hidden;
    padding-top:20px;
    &:after{
        content:"";
        position:absolute;
        right:0;
        bottom:34px;
        width: 1px;
        height:50%;
        border-right: #dddee1 dashed 1px;
    }
    &:last-of-type{
        &:after{
            border-right: none;
        }
    }

    .moreBox {
        text-align: right;
        padding-top:10px;
        padding-bottom: 10px;
        a {
            color:@color-blue-dot;
            font-size:12px;
        }
    }
    
    ul {
        width: 95%;
        margin:0 auto;
    }
   
    

    ul {
        li.redDot{
            &:before{
                background: @color-red-dot;
            }
        }
        li.greenDot{
            &:before{
                background: @color-green-dot;
            }
        }
        li {
            position: relative;
            counter-increment: number;
            padding-top:10px;
            padding-bottom:10px;
            border-bottom: #999 dashed 1px;
            padding-left:15px;

            &:before{
                    content: counter(number);
                    position:absolute;
                    left:0;
                    top:50%;
                    transform: translate(0, -70%);
                    width: 8px;
                    height:8px;
                    background:@color-blue-dot;
                    color:transparent;
                    border-radius: 50%;
            }
            a {
                display: block;
                position: relative;
                overflow: hidden;
                padding-bottom: 1px;
                color:#495060;
                font-size: 12px;
                time , span , em {
                    overflow: hidden;
                    white-space: nowrap;
                    text-overflow: ellipsis;
                }
                time{
                    float:left;
                    width:80px;
                    color:#999999;
                }
                span {
                    float: right;
                    width:80px;
                    box-sizing: border-box;
                    padding-left:10px; 
                }
                em{
                    margin-left:80px;
                    margin-right: 80px;
                    display:block;
                    font-style: normal; 
                }
            }
        }
    }
}
</style>