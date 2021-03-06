package com.koreait.community.user;

import com.koreait.community.Const;
import com.koreait.community.model.UserEntity;
import com.koreait.community.model.UserDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import javax.servlet.http.HttpSession;
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
    public String joinProc(UserEntity entity, RedirectAttributes reAttr){
        int result = service.insUser(entity);
        if(result == 0) {
            reAttr.addFlashAttribute(Const.MSG, Const.ERR_4);
            return "redirect:/user/join";
        }
        service.login(entity);
        return "redirect:/board/list";
    }

    @GetMapping("/login")
    public void login(){}

    @PostMapping("/login")
    public String loginProc(UserEntity entity, RedirectAttributes ra){
        int result = service.login(entity);
        switch (result){
            case 0:
                //에러
                //ra.addAttribute() // 쿼리 스트링 이용
                ra.addFlashAttribute(Const.MSG, Const.ERR_1); // session 이용
                break;
            case 1:
                return "redirect:/board/list/1";
            case 2:
                //아이디 없음
                ra.addFlashAttribute(Const.MSG, Const.ERR_2);
                break;
            case 3:
                //비밀번호 다름
                ra.addFlashAttribute(Const.MSG, Const.ERR_3);
                break;
        }
        ra.addFlashAttribute("uid", entity.getUid());
        return "redirect:/user/login";

    }

    @GetMapping("/logout")
    public String logout(HttpSession hs) {
        hs.invalidate();
        return "redirect:/user/login";
    }

    @GetMapping("/idChk/{uid}")
    @ResponseBody // 리턴 시 json 으로.
    //@PathVariable 클라이언트에서 넘어온 값({}안의 값)을 받기 위한 용도.
    public Map<String, Integer> idChk(@PathVariable String uid) {
        Map<String, Integer> res = new HashMap();
        res.put("result", service.idChk(uid));
        return res;
    }

    @GetMapping("/mypage/profile")
    public void mypageProfile() {}

    @ResponseBody
    @PostMapping("/mypage/profile")
    public Map<String, String> mypageProfile(MultipartFile profileimg) {
        String fileNm = service.uploadProfileImg(profileimg);
        Map<String, String> result = new HashMap<>();
        result.put("result", fileNm);
        return result;
    }

    @GetMapping("/mypage/password")
    public void password() {}

    @PostMapping("/mypage/password")
    public String passwordProc(UserDto dto, HttpSession hs, RedirectAttributes rAttr) {
        System.out.println(dto.getNowpw());
        System.out.println(dto.getUpw());
        int result = service.changUpw(dto);

        if(result != 1){
            switch (result) {
                case 0:
                    rAttr.addFlashAttribute(Const.MSG,"비밀번호 변경에 실패하였습니다.");
                    break;
                case 2:
                    rAttr.addFlashAttribute(Const.MSG,"현재 비밀번호를 확인 해주세요");
                    break;
            }
            //return "user/mypage/password";  // f5(새로고침)시 post가 또 이루어진다.
            return "redirect:/user/mypage/password";

        }
        hs.invalidate();
        return "redirect:/user/logout";
    }
}
