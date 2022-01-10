{
    window.onload = () =>{
        const recordElem = document.querySelectorAll('.record');
        for (let i = 0; i <recordElem.length; i++) {

            recordElem[i].addEventListener('click',()=>{
                let iboard = recordElem[i].dataset.iboard;
                console.log(iboard);
                location.href = `/board/detail?iboard=${iboard}`;
            })
        }
    }

}