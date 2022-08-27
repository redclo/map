import GameMap from "..";
import * as THREE from "three";

import { KTX2Loader } from 'three/examples/jsm/loaders/KTX2Loader';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

import FileSaver from 'file-saver';
export default (game: GameMap) => {
    let _canvas: HTMLCanvasElement;

    return {
        async initWidthCanvas(canvas: HTMLCanvasElement) {
            _canvas = canvas;

            const width = window.innerWidth;
			const height = window.innerHeight;

			const renderer = new THREE.WebGLRenderer( { antialias: true, canvas: canvas});
			renderer.setSize( width, height );
			renderer.outputEncoding = THREE.sRGBEncoding;

            game.actions.initWidthRender( renderer );


			const scene = new THREE.Scene();
			scene.background = new THREE.Color( 0x202020 );

			const camera = new THREE.PerspectiveCamera( 60, width / height, 0.1, 100 );
			camera.position.set( 2, 1.5, 1 );
			camera.lookAt( scene.position );
			scene.add( camera );

			const controls = new OrbitControls( camera, renderer.domElement );
			controls.autoRotate = true;

			// PlaneGeometry UVs assume flipY=true, which compressed textures don't support.
			const geometry = flipY( new THREE.PlaneGeometry() );
			const material = new THREE.MeshBasicMaterial( {
				color: 0xFFFFFF,
				side: THREE.DoubleSide
			} );
			const mesh = new THREE.Mesh( geometry, material );
			scene.add( mesh );

			const formatStrings = {
				[ THREE.RGBAFormat ]: 'RGBA32',
				[ THREE.RGBA_BPTC_Format ]: 'RGBA_BPTC',
				[ THREE.RGBA_ASTC_4x4_Format ]: 'RGBA_ASTC_4x4',
				[ THREE.RGB_S3TC_DXT1_Format ]: 'RGB_S3TC_DXT1',
				[ THREE.RGBA_S3TC_DXT5_Format ]: 'RGBA_S3TC_DXT5',
				[ THREE.RGB_PVRTC_4BPPV1_Format ]: 'RGB_PVRTC_4BPPV1',
				[ THREE.RGBA_PVRTC_4BPPV1_Format ]: 'RGBA_PVRTC_4BPPV1',
				[ THREE.RGB_ETC1_Format ]: 'RGB_ETC1',
				[ THREE.RGB_ETC2_Format ]: 'RGB_ETC2',
				[ THREE.RGBA_ETC2_EAC_Format ]: 'RGB_ETC2_EAC',
			};


            const _directionalLight = new THREE.DirectionalLight(16578536, 1);
            _directionalLight.position.set(0, 1, 1);
            scene.add(_directionalLight);

            const o = new THREE.DirectionalLight(16578536, 1);
            o.position.set(-1, -1, -1);
            scene.add(o);

            const _ambientLight = new THREE.AmbientLight(16777215, .1);
            scene.add(_ambientLight);

       
            animate();


        const book =  await game.ctx.chapterx.actions.loadBook() as any;

        scene.add( book );

        setTimeout(() => {
            book.open = 1;
            book.openMix = 0.8;

        }, 3000);

        try {

            const texture = await game.actions.loadKTX2( 'book/book.ao.ktx2' );
            console.info( `transcoded to ${formatStrings[ texture.format ]}`);

            material.map = texture;
            material.transparent = true;

            material.needsUpdate = true;

        } catch ( e ) {
            console.error( e );
        } finally {
            game.actions.loaderDispose();
        }

        function animate() {

            requestAnimationFrame( animate );

            controls.update();

            renderer.render( scene, camera );

        }

        window.addEventListener( 'resize', onWindowResize );

        function onWindowResize() {

            const width = window.innerWidth;
            const height = window.innerHeight;

            camera.aspect = width / height;
            camera.updateProjectionMatrix();
            renderer.setSize( width, height );

        }

        /** Correct UVs to be compatible with `flipY=false` textures. */
        function flipY( geometry:any ) {

            const uv = geometry.attributes.uv;
            for ( let i = 0; i < uv.count; i ++ ) {

                uv.setY( i, 1 - uv.getY( i ) );

            }
            return geometry;

        }
    }
    }
}