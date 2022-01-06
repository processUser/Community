package com.koreait.community.user;

import com.koreait.community.model.UserEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import java.util.HashMap;
import java.util.Map;

@Controller
@RequestMapping("/user")
public class UserController {
    @Autowired
    private UserService service;

    @GetMapping("/join")
    public void join(){}

    @PostMapping("/join")
    public String joinProc(UserEntity entity, RedirectAttributes ra){
        int result = service.insUser(entity);
        switch (result) {
            case 0:
                ra.addFlashAttribute("msg", "회원가입에 실패");
                break;
            case 1:
                return "redirect:/user/login";

        }

        return "redirect:/user/join";

    }

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
