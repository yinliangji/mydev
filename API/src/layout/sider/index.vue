<template>
	<Sider  ref="SiderBox" collapsible :collapsed-width="78" v-model="isCollapsed" class="siderBox"  hide-trigger>
		<Menu :active-name="currentMenu" theme="dark" width="auto" :class="menuitemClasses" @on-open-change="onOpenChange" ref="side_menu" class="siderMenu">
			<MenuItem name="1-1">
				<router-link  to="/home" />
				<Icon type="ios-navigate"></Icon>
				<span>我的任务</span>
			</MenuItem>
			<MenuItem name="1-2">
				<router-link :to="{path:'/page1',query: {ID: 'id_myid'}}" />
				<Icon type="ios-navigate"></Icon>
				<span>page 1</span>
			</MenuItem>
			<MenuItem name="1-3">
				<router-link  to="/page2" />
				<Icon type="ios-navigate"></Icon>
				<span>page 2</span>
			</MenuItem>
		</Menu>
		<Icon @click.native="collapsedSider" :class="rotateIcon" :style="{margin: '-12px 8px 0 0'}" type="chevron-left" size="24" class="triggerBtn" color="white" ></Icon> 
	</Sider> 
</template>
<script>
export default {
	name: 'sider',
	data(){
		return{
			isCollapsed: false,
			pathActive:{
				home:["1","1-1"],
				page1:["1","1-2"],
				page2:["1","1-3"],
			},
			OpenNames:[],//["1"]
			currentMenu:"",//1-1
		}
	},
	methods:{
		collapsedSider () {
	        this.$refs.SiderBox.toggleCollapse();
	    },
	    onOpenChange(name){
			console.log(name)
			//设置菜单展开子菜单的数组name
		},
		side_menu(param){
			let ON = this.pathActive[param][0];
			if(this.OpenNames.indexOf(ON) == -1){
				this.OpenNames.push(ON);
			}
			this.currentMenu = this.pathActive[param][1];
			this.$nextTick(()=>{
				this.$refs.side_menu.updateOpened();
				this.$refs.side_menu.updateActiveName();
			})
		},
	},
	beforeMount(){

	},
	mounted() {
		if(this.$route.path.indexOf("home")!= -1){
				this.side_menu("home")
		}
	},
	computed: {
		rotateIcon () {
	        return [
	            'menu-icon',
	            this.isCollapsed ? 'rotate-icon' : ''
	        ];
	    },
	    menuitemClasses: function () {
	        return [
	            'menu-item',
	            this.isCollapsed ? 'collapsed-menu' : ''
	        ]
	    },
	    
	},
	watch: {
		'$route'(to,from) {
			let home = "home";
			let page1 = "page1";
			let page2 = "page2";
			if(to.path.indexOf(home)!= -1){
				this.side_menu(home)
			}else if(to.path.indexOf(page1)!= -1){
				this.side_menu(page1)
			}else if(to.path.indexOf(page2)!= -1){
				this.side_menu(page2)
			}
		}
	},

}
</script>
<style lang="less" scoped>

// li a {
// 	position:absolute;
// 	left:0;
// 	top: 0;
// 	width: 100%;
// 	height:100%;
// }
// li>span{
// 	padding-bottom: 1px;
// }
// .siderBox {
  
//   height:100%;
//   overflow-y:auto;
//   overflow-x:hidden;

// }
// .layout-con{
//     height: 100%;
//     width: 100%;
// }
// .triggerBtn {
//   position:absolute;
//   right:0;
//   top:50%;
//   z-index: 901;
//   cursor: pointer;

// }
// .menu-icon{
//   transition: all .3s;
// }
// .rotate-icon{
//   transform: rotate(-180deg);
// }

// .menu-item span{
//     display: inline-block;
//     overflow: hidden;
//     width: 69px;
//     text-overflow: ellipsis;
//     white-space: nowrap;
//     vertical-align: bottom;
//     transition: width .2s ease .2s;
// }
// .menu-item i{
//     transform: translateX(0px);
//     transition: font-size .2s ease, transform .2s ease;
//     vertical-align: middle;
//     font-size: 16px;
// }
// .collapsed-menu span{
//     width: 0px;
//     transition: width .2s ease;
// }
// .collapsed-menu i{
//     transform: translateX(5px);
//     transition: font-size .2s ease .2s, transform .2s ease .2s;
//     vertical-align: middle;
//     font-size: 22px;
// }
li a {
	position:absolute;
	left:0;
	top: 0;
	width: 100%;
	height:100%;
	z-index:10;
}
li>span{
	padding-bottom: 1px;
}



.ivu-menu-dark.ivu-menu-vertical .ivu-menu-item-active:not(.ivu-menu-submenu), .ivu-menu-dark.ivu-menu-vertical .ivu-menu-submenu-title-active:not(.ivu-menu-submenu) {
    color: white;
}

.siderBox {
  
  height:100%;
  overflow-y:auto;
  overflow-x:hidden;
  background: #21488a;//

}
.siderMenu {
	background: transparent;
}
.layout-con{
    height: 100%;
    width: 100%;
}
.triggerBtn {
  position:absolute;
  right:0;
  top:50%;
  z-index: 901;
  cursor: pointer;

}
.menu-icon{
  transition: all .3s;
}
.rotate-icon{
  transform: rotate(-180deg);
}

.menu-item span{
    display: inline-block;
    overflow: hidden;
    width: 85px;
    text-overflow: ellipsis;
    white-space: nowrap;
    vertical-align: bottom;
    transition: width .2s ease .2s;
}
.menu-item i{
    transform: translateX(0px);
    transition: font-size .2s ease, transform .2s ease;
    vertical-align: middle;
    font-size: 16px;
}
.collapsed-menu span{
    width: 0px;
    transition: width .2s ease;
}
.collapsed-menu i{
    transform: translateX(5px);
    transition: font-size .2s ease .2s, transform .2s ease .2s;
    vertical-align: middle;
    font-size: 22px;
}
</style>