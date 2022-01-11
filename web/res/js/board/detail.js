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
}