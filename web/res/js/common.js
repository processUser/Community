const msg = {
    'isDel' : '삭제하시겠습니까?',

    'fnIsDel' : function(target) {
        return `${target}을(를)` + this.isDel;
    }
}
const regex = {
    id : /^([a-zA-Z09]{4,15})$/,
    pw : /^([a-zA-Z09!@_]{4,20})$/, // 대소문자 + 숫자 + !@_ 조합(4~20)
    nm : /^([가-힣]{2,5})$/,
    isWrongId :function (val) {
        return !this.id.test(val);
    },
    isWrongPw :function (val) {
        return !this.id.test(val);
    },
    isWrongNm :function (val) {
        return !this.id.test(val);
    },
    isWrongWith: function (target, val) {
        return!this[target].test(val);
    },
    getMsg(target) {
        switch (target) {
            case 'id': return ''
        }
    }
}