{
    let pwFrmElem = document.querySelector("#pwfrm");

    if(pwFrmElem){


        pwFrmElem.addEventListener('submit', (e) => {
            let upwVal = pwFrmElem.upw.value
            let nowpwVal = pwFrmElem.nowpw.value
            let chkpwVal = pwFrmElem.chkpw.value
            let btn_submit = pwFrmElem.btn_submit
            if(upwVal.length === 0){
                alert("현재 비밀번호를 확인하세요")
                console.log(upwVal)
                e.preventDefault()
            }else if(nowpwVal.length === 0){
                alert("변경 비밀번호를 확인하세요")
                e.preventDefault()
            } else if(nowpwVal !== chkpwVal){
                alert('변경비밀번호, 확인 비밀번호를 확인하세요')
                e.preventDefault()
            } else if(regex.isWrongPw(upwVal)) {
                alert("대소문자 + 숫자 + !@_ 조합으로 4~20글자인지 확인 하세요")
                e.preventDefault()
            } else if(regex.isWrongPw(nowpwVal)) {
                alert("대소문자 + 숫자 + !@_ 조합으로 4~20글자인지 확인 하세요")
                e.preventDefault()
            }
            console.log(pwFrmElem)
            console.log(upwVal)
            console.log(nowpwVal)
            console.log(chkpwVal)
            console.log(btn_submit)
        })

    }
}