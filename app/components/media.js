import { useState, useEffect, useRef } from "react";
import IonIcon from '@reacticons/ionicons';
import Matter from "matter-js";

const Media = () => {
    const sceneRef = useRef(null);
    const [currentTitle, setCurrentTitle] = useState('');

    function renderScene() {
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


        Composite.add(world, [
            Bodies.rectangle(50, 50, 240, 300, {
                title: "반짝이는 워터멜론",
                render: {
                    sprite: {
                        texture: 'https://i.namu.wiki/i/oU6jb8E02jZarXQwQJ-Sv_RAtEKeGh4xKb9k3cgJGOTPIZg3DNNStLM7BcCVyckCAwNfp_0g8WMCYmpMw7SeuA.webp',
                        xScale: 0.22,
                        yScale: 0.22
                    }
                }
            }),
            Bodies.rectangle(80, 12, 240, 300, {
                title: "프로젝트 헤일메리",
                render: {
                    sprite: {
                        texture: 'https://i.namu.wiki/i/Z5LFy706523dOfooJhy2B_CtzKzZe6hGjoHwiyTfqi9-b_eBrRTDH6C8hnk8AGgDI8TTj2aBJ5E9OvMWHb3zCg.webp',
                        xScale: 0.22,
                        yScale: 0.22
                    }
                }
            }),
            Bodies.rectangle(50, 50, 240, 300, {
                title: "삼체",
                render: {
                    sprite: {
                        texture: 'https://i.namu.wiki/i/F6lC2Z5Ok0NGNEatdHXzzkPlWrsGq_DgDq-ZdvCo0JOuNNLS84cUdUqUgA79msOdP6gMj-X4rMFihJnEZD2OpA.webp',
                        xScale: 0.22,
                        yScale: 0.22
                    }
                }
            }),
            Bodies.rectangle(80, 12, 240, 300, {
                title: "우리가 빛의 속도로 갈 수 없다면",
                render: {
                    sprite: {
                        texture: 'https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1566297225l/52214051.jpg',
                        xScale: 0.7,
                        yScale: 0.7
                    }
                }
            }),


            Bodies.rectangle(50, 150, 240, 300, {
                title: "천 개의 파랑",
                render: {
                    sprite: {
                        texture: 'https://i.namu.wiki/i/ISHhIhDdbzqyW-9iYp-vMoyM5iv0gPyfoYdVbtAdKuvmj-tGhWWPNbZ9v7bZLWtIewajdpF4QC260-_32vGQgQ.webp',
                        xScale: 0.25,
                        yScale: 0.25
                    }
                }
            }),

        ]);

        /*
        var stack = Composites.stack(5, 5, 2, 3, 0, 0, function (x, y) {
            var sides = Math.round(Common.random(1, 8));

            // round the edges of some bodies
            var chamfer = null;
            if (sides > 2 && Common.random() > 0.7) {
                chamfer = {
                    radius: 10
                };
            }

            switch (Math.round(Common.random(0, 1))) {
                case 0:
                    if (Common.random() < 0.8) {
                        return Bodies.rectangle(x, y, Common.random(25, 50), Common.random(25, 50), { chamfer: chamfer });
                    } else {
                        return Bodies.rectangle(x, y, Common.random(80, 120), Common.random(25, 30), { chamfer: chamfer });
                    }
                case 1:
                    return Bodies.polygon(x, y, sides, Common.random(25, 50), { chamfer: chamfer });
            }
        });

        Composite.add(world, stack);
        */

        Composite.add(world, [
            // walls
            Bodies.rectangle(400, 0, 800, 50, { isStatic: true, render: { visible: false } }),
            Bodies.rectangle(400, 700, 800, 50, { isStatic: true, render: { visible: false } }), // y 좌표를 700으로 변경
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

        // keep the mouse in sync with rendering
        render.mouse = mouse;



        Matter.Events.on(mouseConstraint, 'mousemove', function (event) {
            var allBodies = Matter.Composite.allBodies(engine.world);
            var foundBodies = Matter.Query.point(allBodies, event.mouse.position);
            try { setCurrentTitle(foundBodies[0].title); }
            catch (e) { setCurrentTitle(''); }
        });

        // fit the render viewport to the scene
        Render.lookAt(render, {
            min: { x: 0, y: 0 },
            max: { x: 800, y: 600 }
        });

        return function cleanup() {
            Render.stop(render);
            Runner.stop(runner);
        };
    }

    useEffect(() => {
        renderScene()
    }, []);

    const initCanvas = () => {
        const scene = sceneRef.current;
        while (scene.firstChild) {
            scene.removeChild(scene.lastChild);
        }
        renderScene();
    }

    return (
        <div className="card card-1x1" style={{ color: "var(--blue)" }}>
            <div style={{ position: 'absolute', top: '0', left: '0', zIndex: '99', width: '100%', padding: '20px', borderRadius: '20px 20px 0 0', background: `linear-gradient(to top, transparent, var(--gradient))` }}>
                <h4><b>{currentTitle || '최근 감상한 것.'}</b></h4>

                <a onClick={() => initCanvas()} style={{ position: 'absolute', right: '20px', top: '20px' }}><IonIcon name="refresh" /></a>
            </div>
            <div style={{ width: '100%', height: '100%', position: 'absolute', top: 0, left: 0 }} ref={sceneRef}></div>
        </div>
    );
};

export default Media;