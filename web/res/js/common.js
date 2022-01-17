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
    ctnt: /^[^><]*$/,
    msg: {
        id: '대소문자, 숫자 조합으로 4~15글자',
        pw: '대소문자, 숫자 !@_ 조합으로 4~20글자',
        nm: '한글 조합으로 2~5글자',
        ctnt: '<, >는 사용할 수 없습니다.',
    },

    isWrongPw :function (val) {
        return !this.id.test(val);
    },
    isWrongWith: function (target, val) {
        return (target && val) ? !this[target].test(val) : true;
    },

}


// 관점지향 프로그래밍 aop
const myFetch = {
    send:function (fetchObj, cb) {
        return fetchObj.then(res => res.json()).then(cb).catch(e => { console.log(e); });
    },
    get: function (url, cb, param) {
        if(param){
            const queryString = Object.keys(param).map(key => `${key}=${param[key]}`).join('&');  // Object > query string 로...
            // map 은 같은 크기의 배열을 만들수 있다. join은 합쳐준다.
            url = `${url}?${queryString}`;
        }
        return this.send(fetch(url), cb);

    },
    post: function (url, cb, param) {
        return fetch(url,{
            'method': 'post',
            'headers': {'Content-Type': 'application/json'},
            'body': JSON.stringify(param)
        })
            .then(res => res.json())
            .then(cb)
            .catch(e => {console.log(e);});
    },
    delete: function (url, cb) {
        return this.send(fetch(url,{
            'method': 'delete',
            'headers': {'Content-Type': 'application/json'},
        }), cb)
    }
}
/*
    javascript 는 싱글쓰래드
    -> call back  처리
    -> 가독성 bad

    Promise 는 작업이 오래 걸릴때 사용.
        const pro = new Promise((than함수 호출, catch함수 호출) =>{});
        pro.then((data) =>{}).catch(e => {})
        pro.then((data) =>{ return 20; }).then((data) =>{}).catch(e => {})

    fetch 를 호출하면 Promise 객체로 넘어옴.
    ----------------------------------
    Object.keys(param) -  {key - value} 로 넘어온 값을 key 배열로 변환

    .map(key => `${key}=${param[key]}`) - 똑같은 배열을 만들면서 수정할수 있도록 도와줌. 자신의 길이만큼 반복(foreach 문과 비슷)

    const reuslt2 = result1.map((key) => {
        const value = param[key];
        const str = key + '=' +value;
        return str;
    })

    .join('&');
*/
/*
    Restful API > POST, GET, PUT, DELETE
    POST - C
    GET - R
    PUT - U
    DELETE - D
*/