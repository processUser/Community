<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<%@ taglib prefix="myjstl" uri="tld/MyCustomJstlTag.tld" %>

<div>
    <c:if test="${sessionScope.loginUser != null}">
        <a href="/board/write?icategory=${requestScope.icategory}">글쓰기</a>
    </c:if>
    <h1>보드 리스트</h1>
    <div>
        <c:choose>
            <c:when test="${fn:length(requestScope.list) == 0}">
                글이없습니다.
            </c:when>
            <c:otherwise>
                <table>
                    <tr>
                        <th>no</th>
                        <th>title</th>
                        <th>hits</th>
                        <th>writer</th>
                        <th>reg date</th>
                    </tr>
                    <c:forEach items="${requestScope.list}" var="item">
                        <tr class="record" data-iboard="${item.iboard}">
                            <td>${item.iboard}</td>
                            <td><c:out value="${item.title}" /></td>
                            <td>${item.hits}</td>
                            <td><div class="flex-container flex-align-center"><span class="m-r-5">${item.writernm}</span><myjstl:profileImg classVal="pointer circular--img wh-30"
                                                                                                                                        iuser="${item.iuser}"
                                                                                                                                        profileImgVal="${item.profileimg}"/></div></td>
                            <td>${item.rdt}</td>
                        </tr>
                    </c:forEach>
                </table>
            </c:otherwise>
        </c:choose>
    </div>
</div>

