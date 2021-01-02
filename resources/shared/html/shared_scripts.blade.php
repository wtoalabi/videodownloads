@if( env('APP_ENV') !== 'dev')
    <script src="{{ asset('shared/vendors.js') }}" defer></script>
@endif
<script src="{{ asset('shared/polyfills/intersection-observer.js') }}" defer></script>
