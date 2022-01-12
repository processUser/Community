package com.koreait.community.user;

import com.koreait.community.Const;
import com.koreait.community.MyFileUtils;
import com.koreait.community.UserUtils;
import com.koreait.community.model.UserEntity;
import org.mindrot.jbcrypt.BCrypt;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;


@Service
public class UserService {
    @Autowired
    private UserMapper mapper;

    @Autowired
    private UserUtils userUtils;

    @Autowired
    private MyFileUtils fileUtils;
    // 회원가입
    public int insUser(UserEntity entity){
        UserEntity copyEntity = new UserEntity();
        BeanUtils.copyProperties(entity, copyEntity); // 깊은 복사

        // 비밀번호 암호화
        String hashPw = BCrypt.hashpw(copyEntity.getUpw(), BCrypt.gensalt());
        copyEntity.setUpw(hashPw);

        return mapper.insUser(copyEntity);
    }

    public int login(UserEntity entity){
        try {
            UserEntity logInUser = mapper.selUser(entity);
            if(logInUser == null){
                //아이디 없음
                return 2;
            }
            if(BCrypt.checkpw(entity.getUpw(), logInUser.getUpw())){
                //true
                logInUser.setUpw(null);
                logInUser.setRdt(null);
                logInUser.setMdt(null);
                userUtils.setLoginUser(logInUser);
                return 1;
            } else {
                // 비밀번호 없음.
                return 3;
            }
        } catch (Exception e) {
            e.printStackTrace();
            return 0;
        }
    }

    //아이디가 없으면 리턴 1, 있으면 리턴 0
    public int idChk(String uid){
        UserEntity entity = new UserEntity();
        entity.setUid(uid);

        UserEntity result = mapper.selUser(entity);

        return result == null ? 1 : 0;
    }

    //이미지 업로드 처리및 저장 파일명 리턴
    public String uploadProfileImg(MultipartFile mf){

        if(mf == null) { return null; }

        UserEntity loginUser = userUtils.getLoginUser();

        final String PATH = Const.UPLOAD_IMG_PATH + "/user/" + loginUser.getIuser();
        String fileNm = fileUtils.saveFile(PATH, mf);
        System.out.println("fileNm : " + fileNm);
        if(fileNm == null) { return null; }

        UserEntity entity = new UserEntity();
        entity.setIuser(userUtils.getLoginUserPk());

        // 기존 파일명
        String oldFilePath = PATH + "/" + loginUser.getProfileimg();
        fileUtils.delFile(oldFilePath);

        // 파일명을 t_user 테이블에 update

        entity.setProfileimg(fileNm);
        mapper.updUser(entity);

        //세션 프로필 파일명을 수정해 준다.
        loginUser.setProfileimg(fileNm);

        return fileNm;
    }
}
