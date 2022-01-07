<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<h1>로그인</h1>
<c:if test="${requestScope.msg != null}">
    <div>${requestScope.msg}</div>
</c:if>
<form action="/user/login" method="post" id="login-frm">
    <div><label><input type="text" name="uid" value="<c:out value="${requestScope.uid}" />"></label></div>
    <div><label><input type="password" name="upw"></label></div>
    <div><label><input type="submit" value="LOGIN"></label></div>
</form>
<div><a href="/user/join">join</a></div>

<%--
    로그인처리
    세션에 UserEntity 객체 주소값 저장(키 값은 Const.LOGIN_USER 사용)
    객체에 iuser, uid, nm, profileimg 값 저장
    로그인 성공시 /board/list 주소이동
    로그인 실패시 login.jsp에 메시지 출력
--%>