var mapInfos = [
	{
		text: "平塚市",
		link: "hiratsuka.html",
		lat: 35.33527653785272,
		lng: 139.34949445520024
	},
	{
		text: "秦野市",
		link: "hadano.html",
		lat: 35.3757816666551,
		lng: 139.22014148465973
	},
	{
		text: "厚木市",
		link: "atsugi.html",
		lat: 35.44323203475147,
		lng: 139.36238805335785
	},
	{
		text: "海老名市",
		link: "ebina.html",
		lat: 35.44648565013716,
		lng: 139.39088812636786
	},
    {
		text: "座間市",
		link: "zama.html",
		lat: 35.48876703084768,
        lng: 139.40752992452386
	},
    {
		text: "横浜市",
		link: "yokohama.html",
		lat: 35.45057987760954,
        lng: 139.63432425704787
	},
    {
		text: "川崎市",
		link: "kawasaki.html",
		lat: 35.531043121222396,
        lng: 139.70296481102986
	},
    {
		text: "横須賀市",
		link: "yokosuka.html",
		lat: 35.28171143520793,
        lng: 139.67208792636396
	},
    {
		text: "鎌倉市",
		link: "kamakura.html",
		lat: 35.319439679011595,
        lng: 139.5469720975298
	},
    {
		text: "逗子市",
		link: "zushi.html",
		lat: 35.29583761036416, 
        lng: 139.58035069752924
	},
    {
		text: "相模原市",
		link: "sagamihara.html",
		lat:  35.57155551489668, 
        lng: 139.37311063986584
	},
    {
		text: "大和市",
		link: "yamato.html",
		lat:  35.487765648321925, 
        lng: 139.45806077054365
	},
    {
		text: "綾瀬市",
		link: "ayase.html",
		lat:  35.43765020443031, 
        lng: 139.42687413801772
	},
	{
		text: "清川村",
		link: "kiyokawa.html",
		lat:  35.482636499802204, 
        lng: 139.27640983986362
	},
    {
		text: "藤沢市",
		link: "fujisawa.html",
		lat:  35.33894206826977, 
        lng: 139.49096087054014
	},
    {
		text: "茅ヶ崎市",
		link: "chigasaki.html",
		lat:  35.33405749356415, 
        lng: 139.40362562636523
	},
    {
		text: "伊勢原市",
		link: "isehara.html",
		lat:  35.40313606130887, 
        lng: 139.31490391102685
	},
    {
		text: "寒川町",
		link: "samuka.html",
		lat:  35.37288014338949, 
        lng: 139.3837764840361
	},
    {
		text: "大磯町",
		link: "osio.html",
		lat:  35.30711535473277, 
        lng: 139.31134889752957
	},
    {
		text: "二宮町",
		link: "ninomiya.html",
		lat:  35.29966034907722, 
        lng: 139.25551426869453
	},
    {
		text: "小田原市",
		link: "odawara.html",
		lat:  35.265047900282035, 
        lng: 139.1522318975286
	},
    {
		text: "箱根町",
		link: "hakone.html",
		lat:  35.23251762349342, 
        lng: 139.10716901084655
	}
];

var mapOptions = {
	zoom: 10.5,
	center: new google.maps.LatLng(35.37288014338949,139.3837764840361),
	mapTypeId: google.maps.MapTypeId.ROADMAP
};        



$(function(){
	var markers = [];
	var map;
	var infoWindow;

	var createMarker = function( mapInfo ) { // mapを生成する
		var marker = new google.maps.Marker({
			map: map,
			position: new google.maps.LatLng(mapInfo.lat, mapInfo.lng),
			title:mapInfo.text
		});
		// イベント登録
		google.maps.event.addListener(marker,'click',function(){
			showInfoWindow(mapInfo,marker);
		});
		markers.push(marker);
	};

	var showInfoWindow = function(mapInfo,marker) { // info windowの表示
		var content = '<div style="overflow:auto;width:100%;height:100%;text-align:center;">' + mapInfo.text +'</div>';
		if ( mapInfo.link ) {
			content += "<div><a href='"+ mapInfo.link + "'>リンク</a></div>";
		}
		if ( infoWindow ) {
			infoWindow.close();
		}
		infoWindow = new google.maps.InfoWindow({
			content: content,
			maxWidth: 1000
		});

//		map.setCenter(marker.getPosition()); // マップの中心位置にする
		infoWindow.open(map,marker);
	};

	var map = new google.maps.Map($("#map")[0], mapOptions);
	$.each(mapInfos, function(index,json){
		createMarker(json); // マーカーの生成
		$('#menu').append('<a href="#" class="open" id="_'+ index + '">' + json.text + '</a>、' );
	});


	$('.open').click(function(){ // クリックした際にinfoWindowを表示する
		var index = this.id.replace('_','');
		showInfoWindow(mapInfos[index],markers[index]);
	});

	// windowをリサイズする
	var windowResize = function() {
		$('#map').css({
			width:$(window).width(),
			height:$(window).height() - 100
		});
	}

	windowResize();
	$(window).resize(windowResize);

});