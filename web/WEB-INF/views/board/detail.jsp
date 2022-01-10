<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<div>
    <c:if test="${sessionScope.loginUser.iuser == data.iuser}">
        <div>
            <button id="btnMod">수정</button>
            <button id="btnDel">삭제</button>
        </div>
    </c:if>
    <div id="data" data-icategory="${data.icategory}" data-iboard="${data.iboard}"></div>
    <div>${requestScope.data.icategory} ${requestScope.data.categorynm}</div>
    <div>${requestScope.data.title}</div>
    <div>${requestScope.data.writernm}</div>
    <div>${requestScope.data.hits}</div>
    <div>${requestScope.data.rdt}</div>
    <div>${requestScope.data.ctnt}</div>
</div>
