<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="tiles" uri="http://tiles.apache.org/tags-tiles" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<%@ taglib prefix="my" uri="tld/MyCustomTag.tld" %>
<%@ taglib prefix="myjstl" uri="tld/MyCustomJstlTag.tld" %>

<tiles:importAttribute name="menuList" />

<c:set var="currentPagePath" value="${requestScope['javax.servlet.forward.request_uri']}" />
<c:set var="splitURI" value="${fn:split(currentPagePath, '/')}" />
<c:set var="lastPath" value="${splitURI[fn:length(splitURI) - 1]}" />


<header class="h50">
    <div class="flex-container flex-align-center p-lr20 ">
        <c:choose>
            <c:when test="${sessionScope.loginUser == null}">
                <div class="m-r-20"><a href="/user/login" class="font-color-white">로그인</a></div>
            </c:when>
            <c:otherwise>
                <c:set var="profileImg" value="/res/img/defultProfile.png" />
                <c:if test="${sessionScope.loginUser.profileimg != null}">
                    <c:set var="profileImg" value="/images/user/${sessionScope.loginUser.iuser}/${sessionScope.loginUser.profileimg}" />
                </c:if>

                <div class="m-r-20"><a href="/user/logout" class="font-color-white">로그아웃</a></div>
                <div class="m-r-20 m-l-20">
                    <a href="/user/mypage/profile" class="font-color-white">
                        <myjstl:profileImg imgIdVal="header-profileimg" idVal="pointer" classVal="circular circular--img wh-30"
                                           iuser="${sessionScope.loginUser.iuser}" profileImgVal="${sessionScope.loginUser.profileimg}"/>
                    </a>
                </div>
<%--                <div class="m-r-20 m-l-20"><a href="/user/mypage/profile" class="font-color-white"><div class="pointer "><img src="${profileImg}" class="circular" id="header-profileimg" alt=""></div></a></div>--%>
<%--                <div class="m-r-20">${my:profileImg('', 'circular--img wh-30', sessionScope.loginUser.iuser, sessionScope.loginUser.profileimg)}</div>--%>
            </c:otherwise>
        </c:choose>

        <c:forEach items="${menuList}" var="item"><%--pageScope에 담긴다?--%>
            <div class="m-r-20 ${lastPath == ''.concat(item.icategory) ? 'menu-selected' : ''}"><a href="/board/list/${item.icategory}" class="font-color-white">${item.nm}</a></div>
        </c:forEach>
    </div>
</header>
