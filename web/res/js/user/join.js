{
    let idChkState = 0; // 0: 아이디 사용 불가능, 1: 아이디 사용가능, 2: 체크 안함
    const joinFrmElem = document.querySelector('#join-frm');
    const idRegex = /^([a-zA-Z09]{4,15})$/g;
    const pwRegex = /^([a-zA-Z09!@_]{4,20})$/g; // 대소문자 + 숫자 + !@_ 조합(4~20)
    const nmRegex = /^([가-힣]{2,5})$/
    const msg1 = '아이디는 대소문자, 숫자 조합으로 4~15자';
    // 중복체크 메세지 함수
    let setMsg = (data) => {
        idChkState = data.result;

        const idChkMsg = joinFrmElem.querySelector('#id-chk-msg');
        switch (data.result) {
            case 0:
                idChkMsg.innerText = '이미사용 중인 아이디 입니다.';
                idChkMsg.style.color = 'green';
                break;
            case 1:
                idChkMsg.innerText = '사용할 수 있는 아이디 입니다.';
                idChkMsg.style.color = 'red';
                joinFrmElem.uid.focus();
                break;
        }
    }


    if(joinFrmElem) {

        joinFrmElem.addEventListener('submit', (e) => {
            const uid = joinFrmElem.uid.value;
            const upw = joinFrmElem.upw.value;
            const upwChk = joinFrmElem.querySelector('#upw-chk').value;
            const nm = joinFrmElem.nm.value;
            if(!idRegex.test(uid)){
                alert(msg1)
                e.preventDefault();
            } else if(!pwRegex.test(upw)) {
                alert('비밀번호는 대소문자, 숫자, !@_ 조합으로 4~20자')
                e.preventDefault();
            } else if(upw != upwChk) {
                alert('비밀번호를 확인')
                e.preventDefault();
            } else if(!nmRegex.test(nm)) {
                alert('이름은 한글로 2~5글자가 되어야합니다.')
                e.preventDefault();
            }

            if(idChkState !== 1){
                switch (idChkState) {
                    case 0:
                        alert('다른아이디를 사용해주세요')
                        break;
                    case 2:
                        alert('아이디 중복체크를 해주세요')
                        break;
                }
                e.preventDefault();
            }
        })
        joinFrmElem.uid.addEventListener('keyup', () =>{
            const idChkMsg = joinFrmElem.querySelector('#id-chk-msg');
            idChkState = 2;
            idChkMsg.innerText = ''

        })

        //아이디 중복 체크 버튼
        const idBtnChkElem = joinFrmElem.querySelector('#id-btn-chk');
        idBtnChkElem.addEventListener('click', () => {
            const idVal = joinFrmElem.uid.value;
            if(idVal.length < 4){
                alert('아이디는 4자 이상 작성해 주세요.');
                return;
            }

            if(!idRegex.test(idVal)){
                alert(msg1)
                return;
            }

            //리터럴 템플릿(`)
            fetch(`/user/idChk/${idVal}`)
                .then(res => res.json())
                .then((data) => {
                    setMsg(data)
                    console.log(data);
                }).catch((e) =>{
                    console.log(e);
            });
        });


    }
}