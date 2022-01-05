package com.koreait.community.user;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.HashMap;
import java.util.Map;

@Controller
@RequestMapping("/user")
public class UserController {
    @Autowired
    private UserService service;

    @GetMapping("/join")
    public void join(){}
    @GetMapping("/login")
    public void login(){}

    @GetMapping("/idChk/{uid}")
    @ResponseBody // 리턴 시 json 으로.
    //@PathVariable 클라이언트에서 넘어온 값({}안의 값)을 받기 위한 용도.
    public Map<String, Integer> idChk(@PathVariable String uid) {
        System.out.println("uid : " + uid);
        Map<String, Integer> res = new HashMap();
        res.put("result", service.idChk(uid));
        return res;
    }
}
