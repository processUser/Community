<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="tiles" uri="http://tiles.apache.org/tags-tiles" %>
<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css" integrity="sha512-Fo3rlrZj/k7ujTnHg4CGR2D7kSs0v4LLanw2qksYuRlEzO+tcaEPQogQ0KaoGN26/zrn20ImR1DfuLWnOo7aBA==" crossorigin="anonymous" referrerpolicy="no-referrer" />
    <link rel="stylesheet" href="/res/css/<tiles:getAsString name="common"/>.css">
    <link rel="stylesheet" href="/res/css/<tiles:getAsString name="addr1"/>/index.css">
    <link rel="stylesheet" href="/res/css/<tiles:getAsString name="addr2"/>.css">
    <script defer src="/res/js/<tiles:getAsString name="common"/>.js"></script>
    <script defer src="/res/js/<tiles:getAsString name="addr1"/>/index.js"></script>
    <script defer src="/res/js/<tiles:getAsString name="addr2"/>.js"></script>
    <title><tiles:getAsString name="title" /></title>
</head>
<body>
    <div id="container">
        <tiles:insertAttribute name="header"/>
        <section>
            <tiles:insertAttribute name="body" />
        </section>
        <tiles:insertAttribute name="footer"/>
    </div>

</body>
</html>
