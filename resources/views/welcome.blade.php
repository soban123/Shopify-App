@extends('shopify-app::layouts.default')

@section('content')
    <!-- You are: (shop domain name) -->
    <p><a href="{{ route('billing', ['plan_id' => 2]) }}">Upgrade</a></p>
    <p>You are: {{ auth()->user()->name }}</p>
    <p>Grandfeatherd: {{auth()->user()->isGrandfathered() ? "TRUE" : "FALSE"}}</p>
    <p>isFreemium: {{auth()->user()->isFreemium() ? "TRUE" : "FALSE"}}</p>
    <a href="{{route('optimize')}}">GET DATA</a>
    <a href="{{route('products_list')}}">Update Products</a>
    <a href="{{route('broken_images')}}">View Broken Images</a>
    <a href="{{route('watermark_page')}}">Add Watermark</a>
    <a href="{{route('resize_image')}}">Resize Image</a>
@endsection

@section('scripts')
    @parent
    <script type="text/javascript">
        var AppBridge = window['app-bridge'];
        var actions = AppBridge.actions;
        var TitleBar = actions.TitleBar;
        var Button = actions.Button;
        var Redirect = actions.Redirect;
        var titleBarOptions = {
            title: 'Welcome',
        };
        var myTitleBar = TitleBar.create(app, titleBarOptions);
    </script>
@endsection
