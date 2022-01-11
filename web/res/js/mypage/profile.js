{
    const profileFileElem = document.querySelector('#profile-file');
    if(profileFileElem){
        profileFileElem.addEventListener('change',() =>{
            const img = profileFileElem.files[0];
            if(img != null) {
                uploadProfileImg(img)
            }
        })
    }
    //프로필 이미지 클릭 이벤트
    const profileileViewElem = document.querySelector('#profile-view');
    if(profileileViewElem){
        profileileViewElem.addEventListener('click', ()=>{
            profileFileElem.click()
        })
    }
    //이미지 업로드
    const uploadProfileImg = (img) => {
        const fData = new FormData();
        fData.append('profileimg', img);

        fetch('/user/mypage/profile', {
            'method' : 'post',
            'body' : fData
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
            })
            .catch(e =>{
                console.log(e)
        })
    }
}