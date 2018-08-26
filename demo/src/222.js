this.$refs.addPartPopBox.validate((valid) => {
    this.formPartValidate.loading = false;
    this.$nextTick(() => {
        this.formPartValidate.loading = true;
    });
    if (valid) {
        this.formPartValidate.loading = true;
        this.$nextTick(() => {
            this.formPartValidate.loading = true;
        });
        let _tempObj = {
            myRef: "selfRef",
            group: [],
            groupList: [],
            myLabel: "",
            myValue: "",
            delBtn: true,
            groupName: "",
            required: true,
        }
        _tempObj.myLabel = this.formPartValidate.addGroupList.length ? this.formPartValidate.addGroupList.filter((item) => {
            return item.value == this.formPartValidate.partName
        })[0].label : this.formPartValidate.partName;
        _tempObj.myValue = this.formPartValidate.partName;

        this.formValidate.AddGroupList.push(_tempObj);

        this.formPartValidate.partName = "";
        _tempObj = null;
        this.partAdd = false;
    }
})