PATTERN = {
    //手机号码和座机的校验
    checkTel : function(phone) {
        if (!(/^0\d{2,3}-?\d{7,8}$/).test(phone)) {
            return false;
        }
        return true;
    },
    checkMobile : function(mobile) {
        if (!(/^1[3|4|5|7|8|9]\d{9}$/).test(mobile)) {
            return false;
        }
        return true;
    },

//用户名称的校验
    checkUserName: function(userName) {
        if (!new RegExp("^[a-zA-Z0-9_\u4e00-\u9fa5\\s·]+$").test(userName)) {
            // showMsg("用户名不能有特殊字符");
            return false;
        }
        if (/(^\_)|(\__)|(\_+$)/.test(userName)) {
            // showMsg("用户名首尾不能出现下划线'_'");
            return false;
        }
        if (/^\d+\d+\d$/.test(userName)) {
            // showMsg("用户名不能全为数字");
            return false;
        }
        return true;
    },

//校验用户编号
    checkId : function(empId) {
        if (!(/^[0-9a-zA-Z]+$/).test(empId)) {
            // showMsg("用户编号格式不正确");
            return false;
        }
        return true;
    },

//校验邮箱格式
    checkEmail :function(email) {
        if (!(/^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/).test(email)) {
            // showMsg("邮箱格式不正确");
            return false;
        }
        return true;
    },
}
pattern = PATTERN;