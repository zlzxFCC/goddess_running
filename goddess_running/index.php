<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,user-scalable=no, initial-scale=1, minimum-scale=1, maximum-scale=1">
<meta name="apple-mobile-web-app-capable" content="yes">
<title>奔跑吧女神</title>
<link rel="icon" type="image/GIF" href="assets/img/icon.jpg"/>
<link rel="stylesheet" href="assets/css/main.css">

<?php
    $appid  = 'wxa5a413eb6d844091';
    $secret = 'd3fc4256f8001e94d838a217fe4ddf4d';
    $redurl = 'http%3a%2f%2fh5.oa.com%2fpub%2fh5mini%2fgoddess_running%2findex.php';

    if(isset($_GET['code'])){
        $code = $_GET['code'];
        $url = "https://api.weixin.qq.com/sns/oauth2/access_token?appid={$appid}&secret={$secret}&code={$code}&grant_type=authorization_code";
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, $url);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        $result = curl_exec($ch);
        curl_close($ch);

        $result = json_decode($result,true);

        if($result['openid']){
            $js = <<<JS
            <script type="text/javascript">
                var _wxuser = [];
                _wxuser.openId = "{$result['openid']}";

            </script>

JS;
        echo $js;
        
        }
    } else {
        header("location:https://open.weixin.qq.com/connect/oauth2/authorize?appid={$appid}&redirect_uri={$redurl}&response_type=code&scope=snsapi_userinfo&state=goddess#wechat_redirect");
    }
?>
<script src="http://res.wx.qq.com/open/js/jweixin-1.0.0.js"></script>
<script type="text/javascript" src="http://266.com/php/jssdk.php?url=<?php echo 'http://'.$_SERVER['HTTP_HOST'].$_SERVER['REQUEST_URI'];?>">
</script>

<script type="text/javascript" src="./assets/libs/jquery-2.1.1.min.js"></script>
<script type="text/javascript" src="./assets/libs/my.class.min.js"></script>
<script type="text/javascript" src="./assets/libs/createjs.min.js"></script>
<script type="text/javascript" src="./assets/js/config.js"></script>
<script type="text/javascript" src="./assets/js/stage.js"></script>
<script type="text/javascript" src="./assets/js/app.js"></script>
<script type="text/javascript" src="./assets/js/game.js"></script>

<script type="text/javascript" src="./assets/js/BaseObj.js"></script>
<script type="text/javascript" src="./assets/js/Scenery.js"></script>
<script type="text/javascript" src="./assets/js/WayLine.js"></script>
<script type="text/javascript" src="./assets/js/Food.js"></script>
<script type="text/javascript" src="./assets/js/Goddess.js"></script>
<script type="text/javascript" src="./assets/js/res.js"></script>
<script type="text/javascript" src="./assets/js/scene/BaseScene.js"></script>
<script type="text/javascript" src="./assets/js/scene/TitleScene.js"></script>
<script type="text/javascript" src="./assets/js/scene/MapScene.js"></script>
<script type="text/javascript" src="./assets/js/scene/IntroduceScene.js"></script>
<script type="text/javascript" src="./assets/js/scene/GameScene.js"></script>
<script type="text/javascript" src="./assets/js/scene/PopScene.js"></script>


</head>
<body>
	<canvas id="stage" width="640" height="960">
		您的浏览器不支持html5, 请换用高端一点的浏览器试试吧。
	</canvas>
</body>
</html>
<script src="http://mj28501.static.17c.cn/html5/h5mini/common/js/wx_share/share.js" type="text/javascript"></script>
<script src="http://mj28501.static.17c.cn/html5/h5mini/common/js/dataeye/dcagent.min.js"></script>
<script type="text/javascript">
    DCAgent.init({
		appId: '9C43643649CCF0FCEF43DEE1EB373B10'
	});
	openID();
	function openID(){
    	// alert('openId:'+_wxuser.openId);
    }

</script>
