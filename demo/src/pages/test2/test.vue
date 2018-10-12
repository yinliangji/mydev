<template>
    <!-- <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
        <FormItem label="Name" prop="name">
            <Input v-model="formValidate.name" placeholder="Enter your name"></Input>
        </FormItem>
       
        <FormItem>
            <Button type="primary" @click="handleSubmit('formValidate')">Submit</Button>
           
        </FormItem>
    </Form> -->
<Modal ref="addPartPop" v-model="partAdd" title="添加角色" @on-ok="submitPart('addPartPopBox')" on-cancel="partCancel"  ok-text="确定" :loading="formPartValidate.loading"  >
    <Form  :label-width="80" ref="addPartPopBox" :model="formPartValidate" :rules="rulePartValidate">
        <FormItem label="角色名称" prop="partName">
            <Input v-model="formPartValidate.partName" placeholder="请输入角色名称（最多四个字）" :maxlength="8"></Input>
        </FormItem>
    </Form>
</Modal>
</template>
<script>
    export default {
        data () {
            const validatePart = (rule, value, callback) => {
                return callback(new Error('请选择日期'));
                
            };
            return {
                partAdd:true,
                formPartValidate: {
                    loading:true,
                    partName: '',
                   
                },
                rulePartValidate: {
                    partName: [
                        { required: true, validator: validatePart,  trigger: 'blur' }
                    ],
                    
                }
            }
        },
        methods: {
            submitPart (name) {
                this.partAdd = true;
                
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        this.$Message.success('Success!');
                    } else {
                        this.$Message.error('Fail!');
                    }
                })
            },
            partCancel (name) {
                this.$refs[name].resetFields();
            }
        }
    }
</script>
