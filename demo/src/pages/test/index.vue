<template>

    <Transfer
        class="transfer"
        :data="data3"
        :target-keys="targetKeys3"
        :list-style="listStyle"
        :render-format="render3"
        :operations="['To left','To right']"
        :filterable="false"
        @on-change="handleChange3"
        @on-selected-change="selectedChange"
        >
        <div :style="{float: 'right', margin: '5px'}">
            <Button type="ghost" size="small" @click="reloadMockData">Refresh</Button>
        </div>
    </Transfer>

</template>
<script>
    export default {
        data () {
            return {
                data3: this.getMockData(),
                targetKeys3: this.getTargetKeys(),
                listStyle: {
                    width: '250px',
                    height: '300px'
                }
            }
        },
        methods: {
            getMockData () {
                let mockData = [];
                for (let i = 1; i <= 20; i++) {
                    mockData.push({
                        key: i.toString(),
                        label: 'Content ' + i,
                        description: 'The desc of content  ' + i,
                        num: i+"_",
                        disabled: Math.random() * 3 < 1,
                        //
                        render: (h, params) => {
                            return h(
                                'a',
                                {
                                    style:{color:'#2d8cf0'},

                                },
                                "1111"
                            );
                        }
                        //
                    });
                }
                return mockData;
            },
            getTargetKeys () {
                return this.getMockData()
                        .filter(() => Math.random() * 2 > 1)
                        .map(item => item.key);
            },
            handleChange3 (newTargetKeys) {
                this.targetKeys3 = newTargetKeys;
            },
            render3 (item) {
                return  item.num + item.label + ' - ' + item.description;
            },
            reloadMockData () {
                this.data3 = this.getMockData();
                this.targetKeys3 = this.getTargetKeys();
            },
            selectedChange (sourceSelectedKeys, targetSelectedKeys){
                console.log(sourceSelectedKeys, targetSelectedKeys)
            },
        }
    }

window.abc = function(){
    alert(2333)
};
</script>

<style lang="less" scoped>
// @import './style.less';
// @import './style.css';

</style>
<style lang="less" >

.transfer .ivu-transfer-list-body {
    border: 1px solid #dddee1;
    overflow:auto;
}
.transfer  .ivu-transfer-operation{
    background: none;
    margin:0;
}
</style>
