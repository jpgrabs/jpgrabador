
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <meta name="description" content="Bringing stories to life. Making your special moments happen.">
    <meta name="author" content="John Paul Grabador">
    <meta name="robots" content="index,follow">
    <link href="{{url('/images/files/cliffhangerstudio.jpg')}}" rel="icon">
    <link href="{{url('/images/files/cliffhangerstudio.jpg')}}" rel="apple-touch-icon">
    <title>The Cliffhanger Studios</title>
    <link href="{{url('/old/css/bootstrap.min copy.css')}}" rel="stylesheet">
    <link href="{{url('/css/app.css')}}" rel="stylesheet">
    <link href="{{url('/css/style.css')}}" rel="stylesheet">
    <!-- <link href="{{url('/old/font-awesome/css/font-awesome.min.css')}}" rel="stylesheet" type="text/css"> -->
    <!-- <link href="{{url('/old/css/freelancer.min.css')}}" rel="stylesheet"> -->

    <meta property="og:url" content="{{url()->current()}}">
    <meta property="og:type" content="website">


    <meta property="og:image" content="{{url('/images/files/cliffhangerstudio.jpg')}}">
    <meta property="og:site_name" content="Bringing stories to life. Making your special moments happen." >
    <!-- <meta property="fb:app_id" content="2573568509320915"> -->
    <meta property="og:image:width" content="1200" >
    <meta property="og:image:height" content="630" >
    <meta property="og:title" content="The Cliffhanger Studios" >
  </head>

  <body class="index" id="page-top">
    @include('shared.navbar-main-sub')
    <section>
      <div class="container">
          <h2 class="text-center">The Cliffhanger Studios</h2>
          <hr class="star-primary">
          <div class="col">
            <img class="img-thumbnails ml-2" src="{{url('/images/files/cliffhangerstudio.jpg')}}" height="300px" width="500px"></img>
            <br>  <br>  <br>
            <p><a class="btn-link" style ="text-decoration: none;"href="https://www.facebook.com/pg/thecliffhangerstudios/">
              <i class="fa fa-fw fa-facebook"> </i><small> Visit on Facebook</small></a></p>


          </div>
      </div>
    </section>
  <!-- Footer -->
    <footer class="text-center">
      @include('shared.footer-main')
    </footer>
    <div class="scroll-top d-lg-none">
      <a class="btn btn-primary page-scroll" href="#page-top">
        <i class="fa fa-chevron-up"></i>
      </a>
    </div>


  </body>

</html>
