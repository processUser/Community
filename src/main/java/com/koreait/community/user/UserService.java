package com.koreait.community.user;

import com.koreait.community.model.UserEntity;
import org.mindrot.jbcrypt.BCrypt;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {
    @Autowired
    private UserMapper mapper;

    // 회원가입
    public int insUser(UserEntity entity){
        String pw = entity.getUpw();
        String hashPw = BCrypt.hashpw(pw, BCrypt.gensalt());
        entity.setUpw(hashPw);

        return mapper.insUser(entity);
    }

    //아이디가 없으면 리턴 1, 있으면 리턴 0
    public int idChk(String uid){
        UserEntity entity = new UserEntity();
        entity.setUid(uid);

        UserEntity result = mapper.selUser(entity);

        return result == null ? 1 : 0;
    }
}
