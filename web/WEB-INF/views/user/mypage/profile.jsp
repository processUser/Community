<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<c:set var="profileImg" value="/res/img/defultProfile.png" />
<c:if test="${sessionScope.loginUser.profileimg != null}">
    <c:set var="profileImg" value="/res/img/user/${sessionScope.loginUser.iuser}/${sessionScope.loginUser.profileimg}" />
</c:if>

<h1>프로필</h1>
<div id="profile-view" class="pointer"><img src="${profileImg}" alt=""></div>
<input type="file" id="profile-file" class="hidden" accept="image/*">
<div>아이디: ${sessionScope.loginUser.uid}</div>
<div>이름: ${sessionScope.loginUser.nm}</div>
<div>성별: ${sessionScope.loginUser.gender}</div>
<div>가입일시: ${sessionScope.loginUser.rdt}</div>