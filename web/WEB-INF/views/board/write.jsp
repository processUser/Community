<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="tiles" uri="http://tiles.apache.org/tags-tiles" %>
<tiles:importAttribute name="menuList" />

<div>
    <h1>글쓰기</h1>
    <form action="/board/write" method="post">
        <div><select name="icategory">
            <c:forEach items="${menuList}" var="item"><%--pageScope에 담긴다?--%>
                <option value="${item.icategory}">${item.nm}</option>
            </c:forEach>
        </select></div>
        <div><label>제목 : <input type="text" name="title"></label></div>
        <div><label>내용 : <textarea name="ctnt"></textarea></label></div>
        <div><input type="submit"value="write"></div>
    </form>
</div>
