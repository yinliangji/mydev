
<script>


export default {
  name: 'renderTest',
  data() {
    return {
    }
  },
  props: {
    level: {
      type: Number,
      required: true
    }
  },
  methods: {
    clickHandler (Obj,O) {
      console.log(Obj,O)
    }
  },
  render: function (createElement,params,Node) {

    return createElement(
      'h' + this.level,
      {
        on: {
          click:this.clickHandler
        },
        style:{color:'yellow',background:'gray'},
         'class': {
          foo: true,
          bar: false
        },
        attrs: {
            align: 'center'
        },
        domProps:{draggable: true},
      },
      [
        createElement('a', {
          attrs: {
            href: 'javascript:;'
          }
        }, this.$slots.default),

        createElement('br', {
          attrs: {
            
          }
        }, ""),

        createElement('b', {
          attrs: {
            title: '标题'
          }
        }, "this.$slots.default"),


      ]
    )
  },
  
}

</script>
<style lang="less" scoped>
@import './style.less';
@import './style.css';

</style>
