import React, { Component } from 'react';
import axios from 'axios';

export default class home extends Component{
  constructor(props){
    super(props);

    this.state={
      instructors:[]
    };

  }
  componentDidMount(){
    this.retrieveInstructors();
  }

  retrieveInstructors(){
    axios.get("http://localhost:8070/instructors").then(res =>{
      if(res.data.success){
        this.setState({
          instructors:res.data.existingInstructors
        });
      
        console.log(this.state.instructors)
      }
  
      
    });
  }

  onDelete = (id) =>{
    axios.delete(`http://localhost:8070/instructor/delete/${id}`).then((res) =>{
      alert("Delete Successfully");
      this.retrieveInstructors();
    });
  }

  filterData(instructors,searchKey){
    const result = instructors.filter((instructor) =>
    instructor.firstname.toLowerCase().includes(searchKey)||
    instructor.lastname.toLowerCase().includes(searchKey)
    )
    this.setState({instructors:result})
  }

  handleSearchArea = (e) =>{
    const searchKey=e.currentTarget.value;

    axios.get("http://localhost:8070/instructors").then(res =>{
      if(res.data.success){
        this.filterData(res.data.existingInstructors, searchKey)
  
      }
    })
  }

render() {
  return(
    <div>
    <meta charSet="utf-8" />
    <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    {/* The above 3 meta tags *must* come first in the head; any other head content must come *after* these tags */}
    <title>Institute Management System</title>
    {/* Google font */}
    <link
      href="https://fonts.googleapis.com/css?family=Lato:700%7CMontserrat:400,600"
      rel="stylesheet"
    />
    {/* Bootstrap */}
   
    {/* Font Awesome Icon */}
    <link
      rel="stylesheet"
      href="https://use.fontawesome.com/releases/v5.8.1/css/all.css"
      integrity="sha384-50oBUHEmvpQ+1lW4y57PTFmhCaXp0ML5d60M1M7uH2+nqUivzIebhndOJK28anvf"
      crossOrigin="anonymous"
    />
    {/* Custom stlylesheet */}
    <style
      media="screen"
      dangerouslySetInnerHTML={{
        __html:
          '\n\t\tbody {\n\tfont-family: \'Montserrat\', sans-serif;\nfont-size: 15px;\n\tfont-weight: 400;\n\tcolor: #798696;\noverflow-x:hidden;\n}\n\nh1,h2,h3,h4,h5,h6 {\nmargin-top: 12px;\nmargin-bottom: 15px;\nfont-weight: 600;\ncolor: #374050;\n}\n\nh1 {\nfont-size:38px;\n}\n\nh2 {\nfont-size:30px;\n}\n\nh3 {\nfont-size:24px;\n}\n\nh4 {\nfont-size:18px;\n}\n\na {\nfont-family: \'Lato\', sans-serif;\ncolor: #374050;\nfont-weight: 700;\n}\n\na:hover,\na:focus{\n\ttext-decoration: none;\n\toutline: none;\ncolor: #374050;\nopacity: 0.9;\n}\n\nul,ol{\n\tmargin: 0;\n\tpadding: 0;\n\tlist-style: none\n}\n\n.white-text {\ncolor: #FFF;\n}\n\n.section {\n\tposition:relative;\n\tpadding-top:80px;\n\tpadding-bottom:80px;\n}\n\n.section-hr {\n\tmargin-top:80px;\n\tmargin-bottom:80px;\n\tborder-color: #EBEBEB;\n}\n\n.section-header {\n\tmargin-bottom:40px;\n}\n\n/* --- Background Image --- */\n.bg-image {\n\tposition:absolute;\n\tleft:0;\n\tright:0;\n\ttop:0;\n\tbottom:0;\n\tbackground-position:center;\n\tbackground-size:cover;\n}\n\n.bg-image.bg-parallax {\n\tbackground-attachment:fixed;\n}\n\n.bg-image.overlay:after {\n\tcontent:"";\n\tposition:absolute;\n\tleft:0;\n\tright:0;\n\ttop:0;\n\tbottom:0;\n\tbackground-image: -webkit-gradient(linear, left top, left bottom, from(#374050), to(#798696));\n\tbackground-image: linear-gradient(to bottom, #374050 0%, #798696 100%);\n\topacity: 0.7;\n}\n\n/* --- Buttons --- */\n.main-button {\n\tposition:relative;\n\tdisplay:inline-block;\n\tpadding:10px 30px;\n\tbackground-color: #FF6700;\n\tborder: 2px solid transparent;\n\tborder-radius: 40px;\n\tcolor: #FFF;\n\t-webkit-transition:0.2s all;\n\ttransition:0.2s all;\n}\n\n.main-button:hover , .main-button:focus {\n\tbackground-color:#fff;\n\tborder: 2px solid #FF6700;\n\tcolor:#FF6700;\n}\n\n.main-button.icon-button:hover , .main-button.icon-button:focus {\n\tpadding-right: 45px;\n}\n\n.main-button.icon-button:after {\n\tcontent:"\\f178";\n\tfont-family:FontAwesome;\n\tposition:absolute;\n\twidth: 30px;\n\tright: 15px;\n\ttext-align:center;\n\topacity:0;\n\t-webkit-transition:0.2s all;\n\ttransition:0.2s all;\n}\n\n.main-button.icon-button:hover:after , .main-button.icon-button:focus:after {\n\topacity:1;\n}\n\ntextarea {\n    padding: 10px 15px;\n}\n\n\n.navbar-brand {\n    padding: 0;\n}\n\n.navbar-brand .logo {\n\tmargin-top: 10px;\n\tdisplay: inline-block;\n}\n\n.navbar-brand .logo > img {\n\tmax-height:30px;\n}\n\n@media only screen and (max-width: 767px) {\n\t.navbar-brand {\n\t\tmargin-left:15px;\n\t}\n}\n\n/*------------------------------------*\\\n\tNavigation\n\\*------------------------------------*/\n#header {\n\tposition:relative;\n\tleft:0;\n\tright:0;\n\ttop:0;\n\tz-index:99;\n\tborder-bottom:1px solid rgba(235, 235, 235, 0.25);\n\tbackground-color:#FFF;\n\t-webkit-transition:0.2s all;\n\ttransition:0.2s all;\n}\n\n#header.transparent-nav {\n\tposition:absolute;\n\tbackground-color: transparent;\n}\n\n#header.transparent-nav .main-menu li a {\n\tcolor:#FFF;\n}\n\n.main-menu li a {\n\ttext-transform:uppercase;\n\t-webkit-transition:0.2s all;\n\ttransition:0.2s all;\n}\n\n.main-menu li a:hover , .main-menu li a:focus {\n\tbackground-color:transparent;\n}\n\n.main-menu li a:after {\n\tcontent:"";\n\tdisplay:block;\n\theight:2px;\n\tbackground-color:#FF6700;\n\twidth:100%;\n\t-webkit-transform: translateY(5px);\n\t    -ms-transform: translateY(5px);\n\t        transform: translateY(5px);\n\topacity:0;\n\t-webkit-transition:0.2s all;\n\ttransition:0.2s all;\n}\n\n.main-menu li a:hover:after , .main-menu li a:focus:after {\n\t-webkit-transform: translateY(0px);\n\t    -ms-transform: translateY(0px);\n\t        transform: translateY(0px);\n\topacity:1;\n}\n\n@media only screen and (max-width: 767px) {\n\t#nav {\n\t\tposition: fixed;\n\t\ttop: 0;\n\t\tright: 0;\n\t\twidth: 0%;\n\t\tmax-width:250px;\n\t\theight: 100vh;\n\t\tbackground: #FFF;\n\t\t-webkit-box-shadow: 0px 5px 10px 0px rgba(0, 0, 0, 0.1);\n\t\t        box-shadow: 0px 5px 10px 0px rgba(0, 0, 0, 0.1);\n\t\tpadding-top: 80px;\n\t\tpadding-bottom: 40px;\n\t\t-webkit-transform: translateX(100%);\n\t\t    -ms-transform: translateX(100%);\n\t\t        transform: translateX(100%);\n\t\t-webkit-transition: 0.4s all cubic-bezier(.77,0,.18,1);\n\t\ttransition: 0.4s all cubic-bezier(.77,0,.18,1);\n\t\tz-index:9;\n\t}\n\n\t#header.nav-collapse #nav{\n\t\twidth:100%;\n\t\t-webkit-transform: translateX(0%);\n\t\t    -ms-transform: translateX(0%);\n\t\t        transform: translateX(0%);\n\t}\n\n\t.main-menu {\n\t\tmargin:0;\n\t}\n\n\t.main-menu li a {\n\t\tcolor: #374050 !important;\n\t\tdisplay: inline-block;\n\t\tmargin-left: 40px;\n\t}\n}\n\n/* -- Mobile Toggle Btn -- */\n.navbar-toggle {\n\tposition:fixed;\n\tright:0;\n\tpadding: 0;\n\theight: 40px;\n\twidth: 40px;\n\tmargin-top: 5px;\n\tz-index:99;\n}\n\n.navbar-toggle > span {\n\tposition: absolute;\n\ttop: 50%;\n\tleft: 50%;\n    -webkit-transform: translate(-50% , -50%);\n        -ms-transform: translate(-50% , -50%);\n            transform: translate(-50% , -50%);\n\t-webkit-transition: 0.2s background;\n\ttransition: 0.2s background;\n}\n\n.navbar-toggle > span:before, .navbar-toggle > span:after {\n\tcontent: \'\';\n\tposition:absolute;\n\tleft:0;\n\t-webkit-transition: 0.2s -webkit-transform;\n\ttransition: 0.2s -webkit-transform;\n\ttransition: 0.2s transform;\n\ttransition: 0.2s transform, 0.2s -webkit-transform;\n}\n\n.navbar-toggle > span , .navbar-toggle > span:before , .navbar-toggle > span:after {\n\theight: 2px;\n\twidth: 25px;\n\tbackground-color:#374050;\n}\n\n.navbar-toggle > span:before {\n\ttop: -10px;\n}\n\n.navbar-toggle > span:after {\n\ttop: 10px;\n}\n\n#header.nav-collapse .navbar-toggle > span {\n\tbackground: transparent;\n}\n\n#header.nav-collapse .navbar-toggle > span:before {\n    -webkit-transform: translateY(10px) rotate(45deg);\n        -ms-transform: translateY(10px) rotate(45deg);\n            transform: translateY(10px) rotate(45deg);\n}\n\n#header.nav-collapse .navbar-toggle > span:after {\n    -webkit-transform: translateY(-10px) rotate(-45deg);\n        -ms-transform: translateY(-10px) rotate(-45deg);\n            transform: translateY(-10px) rotate(-45deg);\n}\n\n/*------------------------------------*\\\n\tHero Area\n\\*------------------------------------*/\n.hero-area {\n\tposition:relative;\n\tpadding-top: 80px;\n\tpadding-bottom: 80px;\n}\n\n#home.hero-area {\n\theight:calc(100vh - 80px);\n\tpadding-top: 0px;\n\tpadding-bottom: 0px;\n}\n\n.home-wrapper {\n\tposition:absolute;\n\ttop:50%;\n\t-webkit-transform:translateY(-50%);\n\t    -ms-transform:translateY(-50%);\n\t        transform:translateY(-50%);\n\tleft:0;\n\tright:0;\n}\n\n/* -- Breadcrumb -- */\n.hero-area-tree li {\n\tdisplay:inline-block;\n\tfont-family: \'Lato\', sans-serif;\n\tfont-weight:600;\n\tfont-size:14px;\n\tcolor:rgba(255, 255, 255, 0.8);\n}\n\n.hero-area-tree li > a {\n\tcolor:rgba(255, 255, 255, 0.8);\n}\n\n.hero-area-tree li + li:before {\n\tcontent: "/";\n\tdisplay: inline-block;\n\tmargin: 0px 5px;\n\tcolor: rgba(235, 235, 235, 0.25);\n}\n\n/*------------------------------------*\\\n\tAbout & Why Us (Feature)\n\\*------------------------------------*/\n/* -- Feature -- */\n.feature {\n\tposition:relative;\n}\n\n.feature + .feature  {\n\tmargin-top:40px;\n}\n\n.feature .feature-icon {\n\tposition:absolute;\n\tleft:0;\n\ttop:0;\n\twidth:80px;\n\theight:80px;\n\tline-height:80px;\n\ttext-align:center;\n\tborder-radius: 50%;\n\tfont-size:30px;\n\tborder:1px solid #EBEBEB;\n\tcolor:#FF6700;\n}\n\n.feature-content {\n\tpadding-left:100px;\n}\n\n.about-img {\n\tmargin-top:40px;\n}\n\n.about-img > img {\n\twidth:100%;\n}\n\n.course {\n\tmargin-top:20px;\n\tmargin-bottom:20px;\n}\n\n.course .course-img {\n\tposition: relative;\n\tdisplay:block;\n\tmargin-bottom:20px;\n\tborder-radius:4px;\n\toverflow:hidden;\n}\n\n.course .course-img > img {\n\twidth:100%;\n}\n\n.course-img:after {\n\tcontent:"";\n\tposition:absolute;\n\tleft:0;\n\tright:0;\n\tbottom:0;\n\ttop:0;\n\tbackground-color:#FF6700;\n\topacity:0;\n\t-webkit-transition:0.2s opacity;\n\ttransition:0.2s opacity;\n}\n\n.course .course-img:hover:after {\n\topacity:0.7;\n}\n\n.course .course-img .course-link-icon {\n\tposition:absolute;\n\tleft:50%;\n\ttop:50%;\n\t-webkit-transform: translate(-50% , calc(-50% - 15px));\n\t    -ms-transform: translate(-50% , calc(-50% - 15px));\n\t        transform: translate(-50% , calc(-50% - 15px));\n\twidth:40px;\n\theight:40px;\n\tline-height:40px;\n\ttext-align:center;\n\tborder:2px solid #fff;\n\tcolor:#fff;\n\tborder-radius:50%;\n\topacity:0;\n\tz-index:10;\n\t-webkit-transition:0.2s all;\n\ttransition:0.2s all;\n}\n\n.course .course-img:hover .course-link-icon {\n\t-webkit-transform: translate(-50% , -50%);\n\t    -ms-transform: translate(-50% , -50%);\n\t        transform: translate(-50% , -50%);\n\topacity:1;\n}\n\n.course .course-title {\n\tdisplay:block;\n\theight:42px;\n}\n\n.course .course-details {\n\tmargin-top: 20px;\n\tpadding-top: 10px;\n\tborder-top: 1px solid #EBEBEB;\n}\n\n.course .course-details .course-price {\n\tfloat: right;\n}\n\n.course .course-details .course-price.course-free {\n\tcolor: green;\n}\n\n.course .course-details .course-price.course-premium {\n\tcolor: #FF6700;\n}\n\n#courses .center-btn {\n\ttext-align:center;\n\tmargin-top:40px;\n}\n\n\n\t\t'
      }}
    />
    {/* Header */}
    
    {/* /Header */}
    {/* Home */}
    <div id="home" className="hero-area">
      {/* Backgound Image */}
      <div
        className="bg-image bg-parallax overlay"
        style={{ backgroundImage: "url(https://i.imgur.com/YDwNPZg.jpg)" }}
      />
      {/* /Backgound Image */}
      <div className="home-wrapper">
        <div className="container">
          <div className="row">
            <div className="col-md-8">
              <h1 className="white-text">Institute Management System</h1>
              <p className="lead white-text">
                This is our ITP project of a institute management system.
              </p>
              <p className="lead white-text">
                Made by: Wisdom Universe team
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
    {/* About */}
    <div id="about" className="section">
      {/* container */}
      <div className="container">
        {/* row */}
        <div className="row">
          <div className="col-md-6">
            <div className="section-header">
              <h2>Welcome to CMS</h2>
              <p className="lead">
                The main entity sets of the database are Students, Instructors,
                Departments and Sections.
              </p>
            </div>
            {/* feature */}
            <div className="feature">
              <i className="feature-icon fa fa-flask" />
              <div className="feature-content">
                <a href="/departments">
                  <h4>Departments </h4>
                </a>
                <p>Click to view the list of departments in the college.</p>
              </div>
            </div>
            {/* /feature */}
            {/* feature */}
            <div className="feature">
              <i className="feature-icon fa fa-users" />
              <div className="feature-content">
                <a href="/instructors">
                  <h4>Instructors</h4>
                </a>
                <p>Click to view the info about instructors of the college.</p>
              </div>
            </div>
            {/* /feature */}
            {/* feature */}
            <div className="feature">
              <i className="feature-icon fab fa-simplybuilt" />
              <div className="feature-content">
                <a href="/sections">
                  <h4>Sections</h4>
                </a>
                <p>Click to view the details about sections in the college.</p>
              </div>
            </div>
            {/* /feature */}
          </div>
          <div className="col-md-6">
            <div className="about-img">
              <img src="https://i.imgur.com/qw0AWhu.png" />
            </div>
          </div>
        </div>
        {/* row */}
      </div>
      {/* container */}
    </div>
    {/* /About */}
    {/* Courses */}
    <div id="courses" className="section">
      {/* container */}
      <div className="container">
        {/* row */}
        {/* /Footer */}
        {/* preloader */}
        <div id="preloader">
          <div className="preloader" />
        </div>
        {/* /preloader */}
        {/* jQuery Plugins */}
      </div>
    </div>
    </div>
  )
}
}