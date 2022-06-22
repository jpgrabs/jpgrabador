
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <meta name="description" content="We make celebration more special">
    <meta name="author" content="John Paul Grabador">
    <meta name="robots" content="index,follow">
    <link href="{{url('/images/files/makeorbake.jpg')}}" rel="icon">
    <link href="{{url('/images/files/makeorbake.jpg')}}" rel="apple-touch-icon">
    <title>Make or Bake</title>
    <link href="{{url('/old/css/bootstrap.min copy.css')}}" rel="stylesheet">
    <link href="{{url('/css/app.css')}}" rel="stylesheet">
    <link href="{{url('/css/style.css')}}" rel="stylesheet">
    <!-- <link href="{{url('/old/font-awesome/css/font-awesome.min.css')}}" rel="stylesheet" type="text/css"> -->
    <!-- <link href="{{url('/old/css/freelancer.min.css')}}" rel="stylesheet"> -->

    <meta property="og:url" content="{{url()->current()}}">
    <meta property="og:type" content="website">


    <meta property="og:image" content="{{url('/images/files/makeorbake.jpg')}}">
    <meta property="og:site_name" content="We make celebration more special" >
    <!-- <meta property="fb:app_id" content="2573568509320915"> -->
    <meta property="og:image:width" content="1200" >
    <meta property="og:image:height" content="630" >
    <meta property="og:title" content="Make or Bake" >
  </head>

  <body class="index" id="page-top">
    @include('shared.navbar-main-sub')
    <section>
      <div class="container">
          <h2 class="text-center">Make or Bake</h2>
          <hr class="star-primary">
          <div class="col">
            <img class="img-thumbnails ml-2" src="{{url('/images/files/makeorbake.jpg')}}" height="300px" width="500px"></img>
            <br>  <br>  <br>
            <p><a class="btn-link" style ="text-decoration: none;"href="https://www.facebook.com/makeorbake/">
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
