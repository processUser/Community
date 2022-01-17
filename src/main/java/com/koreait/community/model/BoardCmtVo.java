package com.koreait.community.model;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
public class BoardCmtVo extends BoardCmtEntity{
    private String writernm;
    private String profileimg;
}
