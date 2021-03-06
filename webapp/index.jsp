<%@ include file="/taglibs.jsp"%>

<div id="intro">
    <h2>Welcome to AppFuse Light!</h2>
    <p>
        <a href="http://appfuse-light.dev.java.net">AppFuse Light</a> is a lightweight version of <a href="http://appfuse.org">AppFuse</a>.
        I was inspired to create it while writing <a href="http://springlive.com">Spring Live</a> and 
        looking at the <em>struts-blank</em> and <em>webapp-minimal</em> 
        applications that ship with Struts and Spring, respectively.
        These "starter" apps were not robust enough for me, and I wanted 
        something like AppFuse, only simpler.  Much of the documentation for developing
        with AppFuse Light can be found in the <a href="http://sourcebeat.com/titles/springlive/public/Rev_12/SpringLive_SampleChapter.pdf">
        Spring QuickStart Chapter</a> in Spring Live.  If you have issues downloading this 
        PDF, you might try saving it to your hard drive before opening it.
    </p>
    <p>
        The basic AppFuse Light application shows how to do simple
        <acronym title="Create, Retrieve, Update and Delete">CRUD</acronym> on a database table.  
        To see this feature, click on the button below. <a href="?" onclick="readMore(); return false">Click here</a> 
        to learn more about AppFuse Light.
    </p>
    <p>
        <button class="button" onclick="location.href='users.html'">View Demonstration</button>
    </p>
</div>
<div id="readmore" style="display:none">
    <h3>Introduction to AppFuse Light</h3>
    <p>
        AppFuse Light is designed to show Java Web Developers how to start
        a bare-bones webapp using a <a href="http://www.springframework.org">
        Spring</a>-managed middle-tier backend and <a href="http://www.hibernate.org">
        Hibernate</a> for persistence. By default, AppFuse Light uses Spring for
        its MVC framework, but you can change it to 
        <a href="http://myfaces.apache.org">JSF/MyFaces</a>,
        <a href="http://mc4j.org/confluence/display/stripes/Home">Stripes</a>,
        <a href="http://struts.apache.org">Struts 1.x</a>, 
        <a href="http://struts.apache.org/2.x/">Struts 2.x</a>,
        <a href="http://opensymphony.com/webwork">WebWork</a>, 
        <a href="http://jakarta.apache.org/tapestry">Tapestry</a> or
        <a href="http://wicket.sourceforge.net/">Wicket</a>. In addition, there's a
        number of extras for Spring MVC, including Velocity and FreeMarker versions, Ajax
        support and Acegi Security support. Installers are in the "extras" directory.
    </p>
    <p>
        By default, AppFuse Light expects you to have MySQL installed. It will create an
        "appfuse_light" database the first time tests are run or the application is started.
        More information on database configuration can be found in this project's README.txt 
        file.
    </p>
    <p> 
        Since no server configuration is required, this application should
        this application should work with any Servlet 2.4 servlet engine.
    </p>
    <p>
        <button class="button" onclick="readMore();">&laquo; Back</button>
    </p>
</div>
<content tag="underground">
<h3>Assumptions</h3>
<ul>
    <li>It's 2007, no one uses Netscape 4 anymore, or at least
        no one does by choice. All HTML will be XHTML compliant,
        without a space: i.e. &lt;br/&gt; not &lt;br /&gt;.</li>
    <li>JSP 2.0 is out, so it will be used to simplify syntax.</li>
    <li>Simplicity is more important than configurability.</li>
</ul>
</content>

<script type="text/javascript">
function readMore() {
    var main = document.getElementById("intro");
    var more = document.getElementById("readmore");
    if (main.style.display == "") {
        main.style.display = "none";
        more.style.display = "";
    } else {
        more.style.display = "none";
        main.style.display = "";
    }
}
</script>
