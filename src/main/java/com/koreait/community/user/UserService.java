package com.koreait.community.user;

import com.koreait.community.UserUtils;
import com.koreait.community.model.UserEntity;
import org.mindrot.jbcrypt.BCrypt;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


@Service
public class UserService {
    @Autowired
    private UserMapper mapper;

    @Autowired
    private UserUtils UserUtils;
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
                UserUtils.setLoginUser(logInUser);
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
}
