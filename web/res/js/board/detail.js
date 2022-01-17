{
    const dataElem = document.querySelector('#data');
    const icategory = dataElem.dataset.icategory;
    const iboard = dataElem.dataset.iboard;
    // 삭제 처리
    const btnDelElem = document.querySelector('#btnDel');

    if(btnDelElem) {
        btnDelElem.addEventListener('click', () => {

            if (confirm(msg.fnIsDel(`${iboard}번 글`))) {
                location.href = `/board/del?icategory=${icategory}&iboard=${iboard}`
            }
        })
    }

    // 수정처리
    const btnModElem = document.querySelector('#btnMod');
    if(btnModElem) {
        btnModElem.addEventListener("click", () => {
            location.href = `/board/mod?iboard=${iboard}`;
        })
    }




    // 댓글 달기
    const cmtFrmElem = document.querySelector('#cmtFrm');
    if(cmtFrmElem) { // 로그인한 상태
        cmtFrmElem.addEventListener('submit', (e)=>{
            e.preventDefault();
        })
        cmtFrmElem.btn_submit.addEventListener('click', () => {
            const cmtVal = cmtFrmElem.ctnt.value;
            if(cmtVal.length === 0) {
                alert('댓글 내용을 작성해 주세요.');
            } else if(regex.isWrongWith('ctnt', cmtVal)) {
                alert(regex.msg.ctnt);
            } else {
                insBoardCmtAjax(cmtVal);
            }
        });

        const insBoardCmtAjax = (val) => {
            const param = {
                'iboard': dataElem.dataset.iboard,
                'ctnt': val
            };
            myFetch.post('/board/cmt',(data)=>{
                console.log(data);
                cmtFrmElem.ctnt.value = '';
                getCmtList();
            }, param);



        }
    }

    const cmtListElem = document.querySelector("#cmt_list");

    // 통신 시작
    const getCmtList = () =>{
        cmtListElem.innerHTML='';
        let url = '/board/cmt/'+iboard
        myFetch.get(url, setCmtlist);
    }

    //통신 결과물 세팅
    const setCmtlist = (list) =>{
        console.log(list)
        if(list.length !== 0) {
            list.forEach((item) => {
                const divElem1 = document.createElement('div');
                const divElem2 = document.createElement('div');
                const spanElem1 = document.createElement('span');
                const spanElem2 = document.createElement('span');
                const spanElem3 = document.createElement('span');
                const imgElem = document.createElement('img');
                const modBtnElem = document.createElement('input');
                const delBtnElem = document.createElement('input');

                divElem1.classList = 'm-t-15 p-10 bor-bot';
                divElem1.id = "cmtlist"

                spanElem1.innerText = item.writernm;

                const imgSrc = item.profileimg === null ? '/res/img/defultProfile.png':`/images/user/${item.iuser}/${item.profileimg}`
                imgElem.src = imgSrc;
                imgElem.classList = 'circular--img wh-30';

                spanElem2.innerText = item.mdt;
                spanElem2.style.marginLeft = '200px'



                divElem2.innerText = item.ctnt;

                cmtListElem.append(divElem1);
                divElem1.append(spanElem1);
                divElem1.append(imgElem);
                divElem1.append(spanElem2);
                divElem1.append(spanElem3);

                if(parseInt(dataElem.dataset.iuser)===item.iuser ){
                    modBtnElem.type = 'button'
                    modBtnElem.value = '수정'
                    delBtnElem.type = 'button'
                    delBtnElem.value = '삭제'
                    spanElem3.append(modBtnElem);
                    spanElem3.append(delBtnElem);

                    delBtnElem.addEventListener('click', () => {
                        if(confirm('삭제하시겠습니까?')) {
                            delCmt(item.icmt, divElem1)
                        }
                    })
                }


                divElem1.append(divElem2);
                console.log('item : ' + item.ctnt);
            })
        } else {
            const divElem1 = document.createElement('div');

            divElem1.innerText='글이없습니다.'

            cmtListElem.append(divElem1);

        }
    }

    const delCmt = (icmt, divElem1) => {
        myFetch.delete(`/board/cmt/${icmt}`, data =>{
           console.log('delCmt : '+data.result);
           if(data.result) {
               divElem1.remove();
           } else {
               alert('댓글을 삭제할 수 없습니다.')
           }
        });
    }

    getCmtList();

}
