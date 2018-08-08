<template>
  <Layout>
    <content>
      <p span="4" v-if="groupList.length > 0" class="left_border"></p>
      <div class="row-wrapper">
        <Row :gutter="16" type="flex" justify="start" align="middle">
          <Col span="4" v-if="groupList.length > 0">
            <div class="centerHeader">
              {{groupList[0].text}}
            </div>
          </Col>
          <Col span="4" v-for="(item, index) in statusList" :key="index">
            <kanbanContentHeader :text="item.stateStr" :taskNumber="item.taskNumber"></kanbanContentHeader>
          </Col>
        </Row>
      </div>
      <!--有分组-->
      <div class="row-wrapper" v-for="(itemGroup, index) in groupLists" v-if="groupList.length > 0">
        <Row :gutter="16" type="flex" justify="start" align="middle">
          <Col span="4" v-if="groupLists.length > 0">
            <div class="centerHeader">
              {{itemGroup.text}}
            </div>
          </Col>
          <Col span="4" v-for="(items, index) in statusList"  :key="index">
            <kanbanItem
              :key="keys"
              :item = "value"
              :Group = true
              v-for="(value, keys) in cardList"
              v-if="itemGroup.groupId == value.groupId && value.taskState == items.state"
              >
             </kanbanItem>
          </Col>
        </Row>
      </div>
      <!--无分组-->
      <div class="row-wrapper" v-if="groupList.length == 0">
        <Row :gutter="16" type="flex" justify="start" align="middle">
          <Col span="4" v-for="(items, index) in statusList"  :key="index">
            <kanbanItem
                :key="keys"
                :item = "value"
                :Group = false
                v-for="(value, keys) in cardList"
                v-if=" value.taskState == items.state">
            </kanbanItem>
          </Col>
        </Row>
      </div>
    </content>
  </Layout>
</template>

<script>
import kanbanHeader from "./kanban-header";
import kanbanContentHeader from "./kanbancontent-header";

import kanbanItem from "./kanban-item";

export default {
  props: {
    cardList: {
      type: Array,
      default: function() {
        return [];
      }
    },
    groupList: {
      type: Array,
      default: function() {
        return [];
      }
    },
    statusList: {
      type: Array,
      default: function() {
        return [];
      }
    }
  },
  data() {
    return {};
  },

  computed: {
    groupLists() {
      return this.groupList.slice(1, this.groupList.length);
    }
  },
  components: {
    kanbanHeader,
    kanbanContentHeader,
    kanbanItem
  }
};
</script>

<style scoped>
.ivu-layout-header {
  background: #fff;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.1);
}

.row-wrapper {
  margin-top: 10px;
  border-bottom: 4px solid #ccc;
  padding-bottom: 10px;
}

.left_border {
  position: absolute;
  left: 15%;
  border-right: 4px solid #ccc;
  height: 100%;
}

.leftHeader {
  width: 100px;
  background: #33cccc;
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
  font-weight: 600;
  margin: auto;
  height: 32px;
  line-height: 32px;

}

.centerHeader {
  width: 100px;
  background: #33cccc;
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
  font-weight: 600;
  margin: auto;
  height: 32px;
  line-height: 32px;
  text-align: center;
  font-size: 14px;

  
}
</style>
