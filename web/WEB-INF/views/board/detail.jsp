<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<div>
    <c:if test="${sessionScope.loginUser.iuser == data.iuser}">
        <div>
            <button id="btnMod">수정</button>
            <button id="btnDel">삭제</button>
        </div>
    </c:if>
    <div id="data" data-writernm="${data.writernm}" data-profileimg="${data.profileimg}" data-icategory="${data.icategory}" data-iboard="${data.iboard}" data-iuser="${sessionScope.loginUser.iuser}"></div>

    <div>
        <c:if test="${requestScope.prevNext.previboard > 0}">
            <a href="/board/detail?iboard=${requestScope.prevNext.previboard}">이전글</a>
        </c:if>
        <c:if test="${requestScope.prevNext.nextiboard > 0}">
            <a href="/board/detail?iboard=${requestScope.prevNext.nextiboard}">다음글</a>
        </c:if>
    </div>

    <div>${requestScope.data.icategory} ${requestScope.data.categorynm}</div>
    <div>${requestScope.data.title}</div>
    <div>${requestScope.data.writernm}</div>
    <div>${requestScope.data.hits}</div>
    <div>${requestScope.data.rdt}</div>
    <div>${requestScope.data.ctnt}</div>
    <hr>
    <c:if test="${sessionScope.loginUser != null}">
        <div class="m-t-15">
            <form id="cmtFrm">
                <input type="text" name="ctnt">
                <input type="button" id="btn_submit" value="댓글달기">
            </form>
        </div>
    </c:if>
    <hr>
    <div class="m-t-15" id="cmt_list"></div>
</div>
