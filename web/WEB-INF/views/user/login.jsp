<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<div class="flex-container flex-center flex-direction-column">
    <h1>로그인</h1>
    <div>${requestScope.msg}</div>
    <form action="/user/login" method="post" id="login-frm">
        <div><label>id : <input type="text" name="uid" value="aaaaa"></label></div>
        <div><label>password : <input type="password" name="upw" value="aaaaa"></label></div>
        <div>
            <input type="submit" value="LOGIN">
        </div>
    </form>
    <div><a href="/user/join">join</a></div>
</div>

<%--
    로그인처리
    세션에 UserEntity 객체 주소값 저장(키 값은 Const.LOGIN_USER 사용)
    객체에 iuser, uid, nm, profileimg 값 저장
    로그인 성공시 /board/list 주소이동
    로그인 실패시 login.jsp에 메시지 출력
--%>