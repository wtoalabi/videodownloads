<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <meta property="og:url" content="@yield('url')" />
    <meta property="og:type" content="@yield('type')" />
    <meta property="og:title" content="@yield('ogtitle')" />
    <meta property="og:description" content="@yield('description')" />
    <meta property="og:image" content="@yield('image')" />

    <title>{{$title}} | {{ config('app.name', 'Video Downloads') }}</title>


    <link href="{{ mix('css/front.css','front') }}" rel="stylesheet">
    @if (env('APP_ENV') === 'local')
        <script src="http://localhost:33333/livereload.js"></script>
    @endif

</head>
<body>
<article id="front">
    @yield('content')
</article>
</body>
</html>

<script src="{{ mix('js/front.js','front') }}"></script>
@include('shared.html.shared_scripts')
