{
    const dataElem = document.querySelector('#data');
    const icategory = dataElem.dataset.icategory;
    const iboard = dataElem.dataset.iboard;
    // 삭제 처리
    const btnDelElem = document.querySelector('#btnDel');

    btnDelElem.addEventListener('click', () =>{

        if(confirm(msg.fnIsDel(`${iboard}번 글`))) {
            location.href = `/board/del?icategory=${icategory}&iboard=${iboard}`
        }
    })

    // 수정처리
    const btnModElem = document.querySelector('#btnMod');

    btnModElem.addEventListener("click", () =>{
        location.href = `/board/mod?iboard=${iboard}`;
    })

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
            }, param)
        }
    }


}

{

}