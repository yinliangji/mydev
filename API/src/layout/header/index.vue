<template>
	<!-- <Header>Header<slot>Header slot</slot></Header> -->
	<Layout class="headerBox">
		<Header class="header">
			<Menu class="header-menu" mode="horizontal" theme="dark" active-name="1">
				<div class="layout-logo header-logo">
					<img src="@/assets/images/logo.png">
				</div>
				<div class="layout-nav header-menu-ui">
					<Menu-Item name="1" class="header-menu-item">
						<router-link tag="span" class="router-span" to="/item1">
							首页
						</router-link>
					</Menu-Item>
					<MenuItem name="2">
						<router-link tag="div" class="router-span" to="/agile">敏捷管理</router-link>	
					</MenuItem>
					<MenuItem name="3">
						<router-link tag="div" class="router-span" to="/code">代码仓库管理</router-link>		
					</MenuItem>
					<MenuItem name="4">
						产品管理
					</MenuItem>
				</div>
			</Menu>	
		</Header>
		<div class="header-under-bar"></div>
	</Layout>
</template>
<script>
	export default {

	}
</script>
<style lang="less" scoped>


.headerBox {
	position:relative;
	height:74px;
	flex:0 0 auto;
}
.header {
	position: absolute;
	left:0;
	top:0;
	width: 100%;
	height:64px;
	background:white;

}
.layout-logo{
	width: 500px;
	height: 52px;
	float: left;
	position: relative;
	top: 6px;
	left: 0;	
}
.header-logo img{
	display: block;
	width: 100%;
	height: 100%;
}
.layout-nav{
	width: 420px;
	margin: 0 auto;
	margin-right: 20px;
}
.layout-footer-center{
	text-align: center;
}
.header-menu{
	background-color: #f9f9f9;
}
.ivu-menu-dark.ivu-menu-horizontal .ivu-menu-item{
	color: #333;
}
.header-under-bar{
	width: 100%;
	height: 10px;
	background-color: #21488a;
	margin-top: 64px;
}
.header-menu-ui{
	height: 64px;
	line-height: 64px;
}
.router-link-active{
	color: #21488a;
}

// .ivu-layout-header {
//     background: gray;
//     padding: 0;
//     height: 64px;
//     line-height: normal;
// }
// span {
// 	color:white;
	
// 	text-align: center;
// }
</style>