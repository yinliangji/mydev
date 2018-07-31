<template>
	<Sider  ref="SiderBox" collapsible :collapsed-width="65" v-model="isCollapsed" class="siderBox"  hide-trigger>
		<Menu :active-name="currentMenu" theme="dark" width="auto" :class="menuitemClasses" @on-open-change="onOpenChange" ref="side_menu" class="siderMenu">
			<router-view name="Aside" />
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
				agile:["1","1-1"],
				demand:["1","1-2"],
				product:["1","1-3"],
				iteration:["1","1-4"],
				development:["1","1-5"],
				defect:["1","1-6"],
				overView:["1","1-7"],
				'agile/detail':["1","1-8"],

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
		if(this.$route.path.indexOf("agile")!= -1){
				this.side_menu("agile")
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
			let home = "agile";
			let page2 = "demand";
			let page3 = "product";
			let page4 = "iteration";
			let page5 = "development";
			let page6 = "defect";
			let page7 = "overView";
			let page8 = "agile/detail";


			if(to.path.indexOf(page8)!= -1){
				this.side_menu(page8)
			}else  if(to.path.indexOf(home)!= -1){
				this.side_menu(home)
			}else if(to.path.indexOf(page2)!= -1){
				this.side_menu(page2)
			}else if(to.path.indexOf(page3)!= -1){
				this.side_menu(page3)
			}else if(to.path.indexOf(page4)!= -1){
				this.side_menu(page4)
			}else if(to.path.indexOf(page5)!= -1){
				this.side_menu(page5)
			}else if(to.path.indexOf(page6)!= -1){
				this.side_menu(page6)
			}else if(to.path.indexOf(page7)!= -1){
				this.side_menu(page7)
			}
		}
	},

}
</script>
<style lang="less">


.siderBox {
  height:100%;
  overflow-y:auto;
  overflow-x:hidden;
  background: #21488a;
  //
  .siderMenu li a {
		position:absolute;
		left:0;
		top: 0;
		width: 100%;
		height:100%;
		z-index:10;
	}
	.siderMenu li>span{
		padding-bottom: 1px;
	}



	.ivu-menu-dark.ivu-menu-vertical .ivu-menu-item-active:not(.ivu-menu-submenu), .ivu-menu-dark.ivu-menu-vertical .ivu-menu-submenu-title-active:not(.ivu-menu-submenu) {
	    color: white;
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

  
}



</style>