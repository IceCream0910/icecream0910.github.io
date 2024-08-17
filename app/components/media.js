import { useState, useEffect, useRef } from "react";
import IonIcon from '@reacticons/ionicons';
import Matter from "matter-js";

const Media = () => {
    const sceneRef = useRef(null);
    const [currentTitle, setCurrentTitle] = useState('');
    const [mediaList, setMediaList] = useState([]);
    const desiredWidth = 210;
    const desiredHeight = 310;

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch('/api/ott');
            const data = await response.json();
            setMediaList(data);
        };

        fetchData();
    }, []);

    useEffect(() => {
        if (mediaList.length === 0 || !mediaList) return;
        renderScene(mediaList);
    }, [mediaList]);

    function loadImageDimensions(url) {
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.onload = () => resolve({ width: img.width, height: img.height });
            img.onerror = reject;
            img.src = url;
        });
    }

    function renderScene(data) {
        var Engine = Matter.Engine,
            Render = Matter.Render,
            Runner = Matter.Runner,
            Composites = Matter.Composites,
            Common = Matter.Common,
            MouseConstraint = Matter.MouseConstraint,
            Mouse = Matter.Mouse,
            Composite = Matter.Composite,
            Event = Matter.Event,
            Bodies = Matter.Bodies;

        // create engine
        var engine = Engine.create({
            gravity: {
                scale: 0.003
            }
        }),
            world = engine.world;

        // create renderer
        var render = Render.create({
            element: sceneRef.current,
            engine: engine,
            options: {
                width: sceneRef.current.offsetWidth,
                height: sceneRef.current.offsetHeight,
                showAngleIndicator: false,
                wireframes: false,
            }
        });

        Render.run(render);

        // create runner
        var runner = Runner.create();
        Runner.run(runner, engine);

        Promise.all(mediaList.map(media => loadImageDimensions(media.posterImage.pathUrl)))
            .then(dimensions => {
                const mediaBodies = mediaList.map((media, index) => {
                    const { width, height } = dimensions[index];
                    const xScale = desiredWidth / width;
                    const yScale = desiredHeight / height;
                    const x = (index % 3) * 280 + 50;
                    const y = Math.floor(index / 3) * 350 + 50;
                    return Bodies.rectangle(x, y, desiredWidth, desiredHeight, {
                        title: media.titleKr,
                        render: {
                            sprite: {
                                texture: media.posterImage.pathUrl,
                                xScale: xScale,
                                yScale: yScale
                            }
                        }
                    });
                });

                Composite.add(world, mediaBodies);
            })
            .catch(error => {
                console.error('Error loading image dimensions:', error);
            });

        Composite.add(world, [
            // walls
            Bodies.rectangle(400, 0, 800, 50, { isStatic: true, render: { visible: false } }),
            Bodies.rectangle(400, 700, 800, 50, { isStatic: true, render: { visible: false } }),
            Bodies.rectangle(800, 300, 50, 700, { isStatic: true, render: { visible: false } }),
            Bodies.rectangle(0, 300, 50, 700, { isStatic: true, render: { visible: false } })
        ]);

        // add mouse control
        var mouse = Mouse.create(render.canvas),
            mouseConstraint = MouseConstraint.create(engine, {
                mouse: mouse,
                constraint: {
                    stiffness: 0.2,
                    render: {
                        visible: false
                    }
                }
            });

        Composite.add(world, mouseConstraint);

        render.mouse = mouse;



        Matter.Events.on(mouseConstraint, 'mousemove', function (event) {
            var allBodies = Matter.Composite.allBodies(engine.world);
            var foundBodies = Matter.Query.point(allBodies, event.mouse.position);
            try { setCurrentTitle(foundBodies[0].title); }
            catch (e) { setCurrentTitle(''); }
        });

        Render.lookAt(render, {
            min: { x: 0, y: 0 },
            max: { x: 800, y: 600 }
        });

        return function cleanup() {
            Render.stop(render);
            Runner.stop(runner);
        };
    }

    const initCanvas = () => {
        const scene = sceneRef.current;
        while (scene.firstChild) {
            scene.removeChild(scene.lastChild);
        }
        renderScene();
    }

    return (
        <div className="card card-1x1 noswapy" style={{ color: "var(--blue)" }} data-swapy-item="10">
            <div data-swapy-handle style={{ position: 'absolute', top: '0', left: '0', zIndex: '99', width: '100%', padding: '20px', borderRadius: '20px 20px 0 0', background: `linear-gradient(to top, transparent, var(--gradient))` }}>
                <h4 style={{ cursor: 'pointer' }}
                    onClick={() => window.open("https://blog.yuntae.in/watchings-5931780837234126a4163e8aa940f2d5", "_blank")}
                >
                    <b>{currentTitle || '최근 감상한 콘텐츠'}</b>
                </h4>

                <a onClick={() => initCanvas()} style={{ position: 'absolute', right: '20px', top: '20px' }}><IonIcon name="refresh" /></a>
            </div>
            <div style={{ width: '100%', height: '100%', position: 'absolute', top: 0, left: 0 }} ref={sceneRef}></div>
        </div>
    );
};

export default Media;