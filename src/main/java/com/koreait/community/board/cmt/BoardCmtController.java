package com.koreait.community.board.cmt;

import com.koreait.community.model.BoardCmtEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController // json 이루어지는 경우 사용.
@RequestMapping("/board/cmt")
public class BoardCmtController {

    @Autowired private BoardCmtService service;

    @PostMapping
    public Map<String, Integer> insBoardCmt(@RequestBody BoardCmtEntity entity){
        System.out.println(entity);
        Map<String, Integer> result = new HashMap<>();
        result.put("result", service.insBoardCmt(entity));
        return result;
    }
}
