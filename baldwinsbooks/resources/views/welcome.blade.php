<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title>Baldwin's Books</title>

        <!-- Fonts -->
        <link href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous">
        <link href="https://fonts.googleapis.com/css?family=Raleway:100,600" rel="stylesheet" type="text/css">

        <!-- Styles -->
        <style>
            html, body {
                color: #636b6f;
                font-family: 'Raleway', sans-serif;
                font-weight: 100;
                height: 100vh;
                margin: 0;
            }

            body {
              background: url("/images/bg.jpg");
              background-size: cover;
              background-repeat: no-repeat;
              background-color: black;
              background-position: center center;
            }


            .full-height {
                height: 100vh;
            }

            .flex-center {
                align-items: center;
                display: flex;
                justify-content: center;
            }

            .position-ref {
                position: relative;
            }

            .top-right {
                position: absolute;
                right: 10px;
                top: 18px;
            }

            .content {
                text-align: center;
                width: 100%;
            }

            .title {
                font-size: 84px;
                margin-bottom: 10px;
            }

            .sub {
              font-size: 50px;
            }

            .links > a {
                color: white;
                padding: 0 25px;
                font-size: 12px;
                font-weight: 600;
                letter-spacing: .1rem;
                text-decoration: none;
                text-transform: uppercase;
            }

            .hometext {
                background: rgba(0, 0, 0, 0.65);
                color: white;
            }

            .btn {
              margin-right: 8px;
            }
        </style>
    </head>
    <body>
        <div class="flex-center position-ref full-height">
            @if (Route::has('login'))
                <div class="top-right links">
                    @if (Auth::check())
                        <a style="padding: 8px 15px; background: #f08804; border: none;" class="btn btn-warning" href="{{ url('/home') }}">Home</a>
                    @else
                        <a style="padding: 8px 15px; background: #f08804; border: none;" class="btn btn-warning" href="{{ url('/login') }}">Login</a>
                        <a style="padding: 8px 15px; background: #f08804; border: none;" class="btn btn-warning" href="{{ url('/register') }}">Register</a>
                    @endif
                </div>
            @endif

            <div class="content">
                <div class="hometext">
                    <p class="title"> Welcome to WD6 International </p>
                    <p class="sub"> Historical Society </p>
                </div>
            </div>
        </div>
    </body>
</html>
