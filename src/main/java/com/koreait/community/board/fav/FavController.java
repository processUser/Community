package com.koreait.community.board.fav;

import com.koreait.community.Const;
import com.koreait.community.model.BoardFavEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/board/fav")
public class FavController {
    @Autowired private FavService service;

    @GetMapping("/{iboard}")
    public Map<String, Integer> selBoardFav(@PathVariable int iboard){
        Map<String, Integer> map = new HashMap<>();
        map.put(Const.RESULT, service.selBoardFav(iboard) == null ? 0 : 1);
        return map;
    }

    @PostMapping
    public Map<String, Integer> insBoardFav(@RequestBody BoardFavEntity entity) {
        Map<String, Integer> map = new HashMap<>();
        map.put(Const.RESULT, service.insBoardFav(entity));
        return map;
    }

    @DeleteMapping("/{iboard}")
    public Map<String, Integer> delBoardFav(@PathVariable int iboard){
        Map<String, Integer> map = new HashMap<>();
        map.put(Const.RESULT, service.delBoardFav(iboard));
        return map;
    }
}
