<template>
	<Sider class="sider">
		<Menu :active-name="currentMenu" theme="dark" width="auto" :open-names="OpenNames" ref="side_menu" @on-open-change="onOpenChange"  >
			<Submenu name="1">
				<template slot="title">
					<Icon type="ios-navigate"></Icon>
					Item 1
				</template>
				<MenuItem name="1-1" ><router-link tag="span" to="/index" />Option 1</MenuItem>
				<MenuItem name="1-2" ><router-link tag="span" :to="{path:'/page1',query: {ID: 'id_myid'}}" />Option 2</MenuItem>
				<MenuItem name="1-3" ><router-link tag="span" to="/page2" />Option 3</MenuItem>
			</Submenu>
		  <Submenu name="2">
		      <template slot="title">
				<Icon type="ios-keypad"></Icon>
				Item 2
		      </template>
		      <MenuItem name="2-1">Option 1</MenuItem>
		      <MenuItem name="2-2">Option 2</MenuItem>
		  </Submenu>
		  <Submenu name="3">
		      <template slot="title">
				<Icon type="ios-analytics"></Icon>
				Item 3
		      </template>
		      <MenuItem name="3-1">Option 1</MenuItem>
		      <MenuItem name="3-2">Option 2</MenuItem>
		  </Submenu>
		</Menu>
    </Sider>
</template>
<script>

export default {
	name: 'sider',
	data(){
		return{
			pathActive:{
				index:["1","1-1"],
				page1:["1","1-2"],
				page2:["1","1-3"],
			},
			OpenNames:[],//["1"]
			currentMenu:"",//1-1
		}
	},
	methods:{
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
		if(this.$route.path.indexOf("index")!= -1){
				this.side_menu("index")
		}
	},
	watch: {
		'$route'(to,from) {
			let index = "index";
			let page1 = "page1";
			let page2 = "page2";
			if(to.path.indexOf(index)!= -1){
				this.side_menu(index)
			}else if(to.path.indexOf(page1)!= -1){
				this.side_menu(page1)
			}else if(to.path.indexOf(page2)!= -1){
				this.side_menu(page2)
			}
			//
		}
	},

}
</script>
<style lang="less" scoped>
.sider {
  position: absolute;
  height: 100%; 
  left: 0; 
  overflow: auto;
}
li span {
	position:absolute;
	left:0;
	top: 0;
	width: 100%;
	height:100%;
}
</style>