(function() {
	window.Main = {};
	Main.Page = (function() {

//*-------------------Three.js-------------------------
		var clock = new THREE.Clock();
		var scene = new THREE.Scene();
		var camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );
		var turn = { dir: "M"};
		var Pessoa;


		var renderer = new THREE.WebGLRenderer();
		renderer.setSize( window.innerWidth, window.innerHeight );
		document.body.appendChild( renderer.domElement );

		var objLoader = new THREE.OBJLoader();

		objLoader.load( 'Male.obj', function ( object ) {

		object.reciveShadow = true;
		object.castShadow = true;
		Pessoa = object;
		scene.add( Pessoa );
		// instantiate a loader
		});

		camera.position.z = 7;

		var trackballControls = new THREE.TrackballControls(camera);


		var animate = function () {
			requestAnimationFrame( animate );

			 var delta = clock.getDelta();

			 trackballControls.update(delta);
			constdata();


			renderer.render(scene, camera);
		};

		function constdata() {
			if(turn.dir == "D"){
				Pessoa.rotation.z = Math.PI/2;
			}else if (turn.dir == "E") {
				Pessoa.rotation.z = -Math.PI/2;
			}
		}

		animate();
//------------------AJAX-------------------------



		var mosq = null;
		function Page() {
			var _this = this;
			mosq = new Mosquitto();
			var i = 0;

			$('#connect-button').click(function() {
				return _this.connect();
			});
			$('#disconnect-button').click(function() {
				return _this.disconnect();
			});
			$('#subscribe-button').click(function() {
				return _this.subscribe();
			});
			$('#unsubscribe-button').click(function() {
				return _this.unsubscribe();
			});

			/*
			$('#liga-output').click(function() {
				var payload = "L";
				var TopicPublish = $('#pub-topic-text')[0].value;
				mosq.publish(TopicPublish, payload, 0);

			});

			$('#liga-output2').click(function() {
				var payload = "L2";
				var TopicPublish = $('#pub-topic-text')[0].value;
				mosq.publish(TopicPublish, payload, 0);

			});

			$('#reverse-output').click(function() {
				var payload = "R";
				var TopicPublish = $('#pub-topic-text')[0].value;
				mosq.publish(TopicPublish, payload, 0);


			});
			$('#reverse-output2').click(function() {
				var payload = "R2";
				var TopicPublish = $('#pub-topic-text')[0].value;
				mosq.publish(TopicPublish, payload, 0);


			});

			$('#desliga-output').click(function() {
				var payload = "D";
				var TopicPublish = $('#pub-topic-text')[0].value;
				mosq.publish(TopicPublish, payload, 0);
				boolm1 = false;
				boolm1R = false;
				console.log("User stopped motor 1");
			});

			$('#desliga-output2').click(function() {
				var payload = "D2";
				var TopicPublish = $('#pub-topic-text')[0].value;
				mosq.publish(TopicPublish, payload, 0);
				boolm2 = false;
				boolm2R = false;

				//setTimeout(function(){   }, 1000);
				console.log("User stopped motor 2");
			});
*/
			mosq.onconnect = function(rc){
				var p = document.createElement("p");
				var topic = $('#pub-subscribe-text')[0].value;
				p.innerHTML = "Conectado ao Broker!";

				$("#debug").append(p);
				mosq.subscribe(topic, 0);

			};

			mosq.ondisconnect = function(rc){
				var p = document.createElement("p");
				var url = "ws://iot.eclipse.org/ws";

				p.innerHTML = "A conexão com o broker foi perdida";
				$("#debug").append(p);
				mosq.connect(url);
			};

			mosq.onmessage = function(topic, payload, qos){
				var p = document.createElement("p");
				var acao = payload[0];
				var c1 =  payload[1];
				var c2 = acao + c2;
				var c3 = c2.slice(0, 2);

				if(payload == "E"){
				 turn.dir = "E";
			 }else if(payload == "D") {
					turn.dir = "D";
				}else if (payload == "M") {
					turn.dir = "M";
				}


				$("#status_io").html(p);
			};
		}

		Page.prototype.connect = function(){
			var url = "ws://iot.eclipse.org/ws";
			mosq.connect(url);
		};
		Page.prototype.disconnect = function(){
			mosq.disconnect();
		};
		Page.prototype.subscribe = function(){
			var topic = $('#sub-topic-text')[0].value;
			mosq.subscribe(topic, 0);
		};
		Page.prototype.unsubscribe = function(){
			var topic = $('#sub-topic-text')[0].value;
			mosq.unsubscribe(topic);
		};

		return Page;
	})();
	$(function(){
		return Main.controller = new Main.Page;
	});
}).call(this);
