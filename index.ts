import { Socket } from "net";

// const ANVIL = (() => {
    const Matter = require("matter-js");
    const GPU = require("gpu.js");

    // Options interfaces

    /**
     * For configuring basic properties of a GameObject
     * 
     * @interface GameObjectOptions
     * @property {boolean} [physicsEnabled=false] - Set to true to enable physics, default is false
     * @property {PhysicsOptions} [physicsOptions={}] - Options passed to matter.js engine
     * @example
     * ```js
     *  const options: GameObjectOptions = {
     *      physicsEnabled: true,
     *      physicsOptions: {
     *      restitution: 0.5
     *  }
     * ```
     */
    interface GameObjectOptions {
        physicsEnabled?: boolean; // set to true to enable physics, default is false
        physicsOptions?: PhysicsOptions; // options passed to matter.js engine
    }

    /**
     * For configuring the gravity of a scene
     * 
     * @interface Gravity
     * @property {number} [scale=0.001] - The magnitude of the gravitational acceleration. Set to 0 if you want a scene with physics but no gravity, default is 0.001
     * @example
     * ```js
     *  const gravity: Gravity = {
     *      scale: 0.001
     *      x: 0,
     *      y: 1
     *  }
     * ```
     */
    interface Gravity extends Vector {
        scale?: number; // The magnitude of the gravitational acceleration. Set to 0 if you want a scene with physics but no gravity, default is 0.001
    }

    /**
     * For configuring the properties of a polygon
     * 
     * @interface PolygonOptions
     * @property {Point[]} points - A list of points that make up the polygon
     * @property {string} backgroundColor - CSS color, background color of the polygon
     * @example
     * ```js
     *  const options: PolygonOptions = {
     *      points: [[0, 0], [0, 100], [100, 100], [100, 0]],
     *      backgroundColor: "red"
     *  }
     * ```
     */
    interface PolygonOptions extends GameObjectOptions {
        points: Point[]; // A list of points that make up the polygon
        backgroundColor: string; // CSS color, background color of the polygon
    }

    // For configuring the properties of a sprite
    /**
     * For configuring the properties of a sprite
     * 
     * @interface SpriteOptions
     * @property {string} url - Url of the image
     * @property {Vec2} coordinates - Initial coordinates of the sprite
     * @property {number} width - Width of the sprite
     * @property {number} height - Height of the sprite
     * @example
     * ```js
     *  const options: SpriteOptions = {
     *      url: "https://i.imgur.com/0xq2Mgj.png",
     *      coordinates: [0, 0],
     *      width: 100,
     *      height: 100
     *  }
     * ```
     */
    interface SpriteOptions extends GameObjectOptions {
        url: string; // url of the image
        coordinates: Vec2; // initial coordinates of the sprite
        width: number; // width of the sprite
        height: number; // height of the sprite
    }

    // For configuring the properties of Scene Manager
    /**
     * For configuring the properties of Scene Manager
     * 
     * @interface SceneManagerOptions
     * @property {Scene} [initialScene] - The scene to start with
     * @property {HTMLCanvasElement} canvas - The canvas to render to
     * @property {number} width - Width of canvas (this will overwrite the canvas width)
     * @property {number} height - Height of canvas (this will overwrite the canvas height)
     * @example
     * ```js
     *  const options: SceneManagerOptions = {
     *      initialScene: scene,
     *      canvas: document.getElementById("canvas"),
     *      width: 500,
     *      height: 500
     *  }
     * ```
     */
    interface SceneManagerOptions { 
        initialScene?: Scene; // The scene to start with
        canvas: HTMLCanvasElement; // The canvas to render to
        width: number; // Width of canvas (this will overwrite the canvas width)
        height: number; // Height of canvas (this will overwrite the canvas height)
    }

    // For configuring the properties of a Scene
    /**
     * For configuring the properties of a Scene
     * 
     * @interface SceneOptions
     * @property {boolean} [fpsMonitoringEnabled=false] - Set to true to enable an FPS counter in top-left, default is false
     * @property {boolean} [lighting=false] - True to enable lighting, default is false
     * @property {lightingOptions} [lightOptions={}] - Options for lighting, default {} (empty object)
     * @property {GPUsettings} [GPUsettings={}] - Settings for GPU.js, default {} (empty object)
     * @property {boolean} [physics=false] - Set to true to enable physics (Uses matter.js under the hood), default is false
     * @property {WorldPhysicsOptions} [physicsOptions={}] - Options passed to matter.js engine
     * @property {Function} [update] - Function to run on every tick, default is an empty function
     * @property {boolean} [clear=true] - Set to false to disable clearing the canvas on every tick, default is true
     * @property {Vec2} [bounds] - Set the bounds of the scene, by default bounds are not enabled
     * @property {number} [FPS_BUFFER_SIZE=60] - Size of the buffer used to calculate FPS, default is 60
     * @property {GameObject} [bindCameraTo] - Bind the camera to a GameObject, by default camera is static
     * @example
     * ```js
     *  const options: SceneOptions = {
     *      fpsMonitoringEnabled: true,
     *      lighting: true,
     *      lightOptions: {
     *          fog: 1.3,
     *          ambient: 0.2
     *      },
     *      GPUsettings: {
     *           mode: "webgl"
     *      },
     *      physics: true,
     *      physicsOptions: {
     *           gravity: {
     *              x: 0,
     *              y: 1,
     *              scale: 0.001
     *          }
     *      },
     *      update: () => {
     *          // do something
     *      },
     *      clear: false,
     *      bounds: [500, 500],
     *      FPS_BUFFER_SIZE: 60,
     *      bindCameraTo: gameObject
     *  }
     * ```
     */
    interface SceneOptions {
        fpsMonitoringEnabled?: boolean; // set to true to enable an FPS counter in top-left, default is false
        lighting?: boolean; // true to enable lighting, default is false
        lightOptions?: lightingOptions; // options for lighting, default {} (empty object)
        GPUsettings?: GPUsettings; // settings for GPU.js, default {} (empty object)
        physics?: boolean; // set to true to enable physics (Uses matter.js under the hood), default is false
        physicsOptions?: WorldPhysicsOptions; // options passed to matter.js engine
        update?: Function; // function to run on every tick, default is an empty function
        clear?: boolean; // set to false to disable clearing the canvas on every tick, default is true
        bounds?: Vec2; // set the bounds of the scene, by default bounds are not enabled
        FPS_BUFFER_SIZE?: number; // size of the buffer used to calculate FPS, default is 60
        bindCameraTo?: GameObject; // bind the camera to a GameObject, by default camera is static
    }

    // Configuring lights in a scene
    /**
     * For configuring lights in a scene
     * 
     * @interface lightingOptions
     * @property {number} [fog=1.3] - Changes how light spreads, default is 1.3
     * @property {number} [ambient=0.2] - Ambient lighting of the scene, default is 0.2
     * @example
     * ```js
     *  const options: lightingOptions = {
     *      fog: 1.3,
     *      ambient: 0.2
     *  }
     * ```
     */
    interface lightingOptions {
        fog?: number; // changes how light spreads, default is 1.3
        ambient?: number; // ambient lighting of the scene, default is 0.2
    }

    // Settings passed to GPU.js
    /**
     * Settings passed to GPU.js
     * 
     * @interface GPUsettings
     * @property {string} [mode="webgl"] - Mode to run GPU.js in, default is "webgl"
     * @example
     * ```js
     *  const options: GPUsettings = {
     *      mode: "webgl"
     *  }
     * ```
     */
    interface GPUsettings {
        mode?: "dev" | "webgl" | "webgl2" | "headlessgl" | "cpu"; // mode to run GPU.js in, default is "webgl"
    }

    interface LightKernelOptions {
        pix: Uint8ClampedArray;
        width: number;
        height: number;
        lights: Array<number>;
        numLights: number;
        dlights: Array<number>;
        numDlights: number;
        ambient: number;
        fog: number;
        globalAlpha: number;
    }

    /**
     * For configuring the properties of a World (matter.js)
     * Refer to matter.js documentation 
     * 
     * @interface WorldPhysicsOptions
     * @property {number} [constraintIterations=2] - An integer Number that specifies the number of constraint iterations to perform each update. The higher the value, the higher quality the simulation will be at the expense of performance. The default value of 2 is usually very adequate.
     * @property {any} [detector=Matter.Detector] - A Matter.Detector instance, default is Matter.Detector
     * @property {boolean} [enableSleeping=false] - A flag that specifies whether the engine should allow sleeping via the Matter.Sleeping module. Sleeping can improve stability and performance, but often at the expense of accuracy. default is false
     * @property {Gravity} [gravity={ x: 0, y: 1, scale: 0.001 }] - An optional gravitational acceleration applied to all bodies in engine.world on every update. default is { x: 0, y: 1, scale: 0.001 }
     * @property {any} [plugin={}] - An object reserved for storing plugin-specific properties.
     * @property {number} [positionIterations=6] - An integer Number that specifies the number of position iterations to perform each update. The higher the value, the higher quality the simulation will be at the expense of performance. The default value is 6
     * @property {PhysicsTimingOptions} [timing={ lastDelta: 1000 / 60, lastElapsed: 1000 / 60, timeScale: 1, timestamp: 0 }] - An object that specifies the timing systems to use for engine updates and rendering. default is { lastDelta: 1000 / 60, lastElapsed: 1000 / 60, timeScale: 1, timestamp: 0 }
     * @property {number} [velocityIterations=4] - An integer Number that specifies the number of velocity iterations to perform each update. The higher the value, the higher quality the simulation will be at the expense of performance.
     * @property {Object} [world={}] - The root Matter.Composite instance that will contain all bodies, constraints and other composites to be simulated by this engine. default is a Matter.Composite with no bodies (Handled under the hood, do not worry about this)
     */
    interface WorldPhysicsOptions {
        constraintIterations?: number; // An integer Number that specifies the number of constraint iterations to perform each update. The higher the value, the higher quality the simulation will be at the expense of performance. The default value of 2 is usually very adequate. 
        detector?: any; // A Matter.Detector instance, default is Matter.Detector
        enableSleeping?: boolean; // A flag that specifies whether the engine should allow sleeping via the Matter.Sleeping module. Sleeping can improve stability and performance, but often at the expense of accuracy. default is false
        gravity?: Gravity; // An optional gravitational acceleration applied to all bodies in engine.world on every update. default is { x: 0, y: 1, scale: 0.001 }
        plugin?: any; // An object reserved for storing plugin-specific properties.
        positionIterations?: number; // An integer Number that specifies the number of position iterations to perform each update. The higher the value, the higher quality the simulation will be at the expense of performance. The default value is 6  
        timing?: PhysicsTimingOptions; // An object that specifies the timing systems to use for engine updates and rendering. default is { lastDelta: 1000 / 60, lastElapsed: 1000 / 60, timeScale: 1, timestamp: 0 }
        velocityIterations?: number; // An integer Number that specifies the number of velocity iterations to perform each update. The higher the value, the higher quality the simulation will be at the expense of performance.        
        world?: Object; // The root Matter.Composite instance that will contain all bodies, constraints and other composites to be simulated by this engine. default is a Matter.Composite with no bodies (Handled under the hood, do not worry about this)  
    }

    /**
     * For configuring the timing systems to use for engine updates and rendering
     * 
     * @interface PhysicsTimingOptions
     * @property {number} [lastDelta=1000 / 60] - A Number that represents the delta value used in the last engine update. default is 0
     * @property {number} [lastElapsed=1000 / 60] - A Number that represents the total execution time elapsed during the last Engine.update in milliseconds. It is updated by timing from the start of the last Engine.update call until it ends. default is 0. This value will also include the total execution time of all event handlers directly or indirectly triggered by the engine update.
     * @property {number} [timeScale=1] - A Number that specifies the global scaling factor of time for all bodies. A value of 0 freezes the simulation. A value of 0.1 gives a slow-motion effect. A value of 1.2 gives a speed-up effect. default is 1
     * @property {number} [timestamp=0] - A Number that specifies the current simulation-time in milliseconds starting from 0. It is incremented on every Engine.update by the given delta argument. default is 0
     */
    interface PhysicsTimingOptions {
        lastDelta: number; // A Number that represents the delta value used in the last engine update. default is 0
        lastElapsed: number; // A Number that represents the total execution time elapsed during the last Engine.update in milliseconds. It is updated by timing from the start of the last Engine.update call until it ends. default is 0. This value will also include the total execution time of all event handlers directly or indirectly triggered by the engine update.
        timeScale: number; // A Number that specifies the global scaling factor of time for all bodies. A value of 0 freezes the simulation. A value of 0.1 gives a slow-motion effect. A value of 1.2 gives a speed-up effect. default is 1       
        timestamp: number; // A Number that specifies the current simulation-time in milliseconds starting from 0. It is incremented on every Engine.update by the given delta argument. default is 0   
    }

    /**
     * For configuring the phyisical properties of GameObjects in a scene
     * 
     * @interface PhysicsOptions
     * @property {number} [angle=0] - A Number specifying the angle of the body, in radians. default is 0
     * @property {number} [angularSpeed=0] - Read only. Use GameObject.body.setAngularSpeed to set. default is 0. The current rotational speed of the body.
     * @property {number} [anglarVelocity=0] - Read only. Use Body.setAngularVelocity to set. default is 0. Gets the current rotational velocity of the body.
     * @property {string} [area] - Read only. Calculated automatically when vertices are set. A Number that measures the area of the body's convex hull.
     * @property {Vector} [axes] - Read only. Calculated automatically when vertices are set. An array of unique axis vectors (edge normals) used for collision detection. These are automatically calculated when vertices are set. They are constantly updated by Body.update during the simulation.
     * @property {Bounds} [bounds] - A Bounds object that defines the AABB region for the body. It is automatically calculated when vertices are set and constantly updated by Body.update during simulation.
     * @property {Object} [collisionFileter] - An Object that specifies the collision filtering properties of this body.  See https://brm.io/matter-js/docs/classes/Body.html#property_collisionFilter
     * @property {number} [collisionFileter.category=1] - A bit field that specifies the collision category this body belongs to. The category value should have only one bit set, for example 0x0001. This means there are up to 32 unique collision categories available. See body.collisionFilter for more information. default is 1
     * @property {number} [collisionFileter.group=0] - An Integer Number, that specifies the collision group this body belongs to. See body.collisionFilter for more information. default is 0
     * @property {number} [collisionFileter.mask=-1] - A bit mask that specifies the collision categories this body may collide with. See body.collisionFilter for more information. default is -1
     * @property {number} [deltaTime=1000 / 60] - Read only. Updated during engine update. A Number that records the last delta time value used to update this body. Used to calculate speed and velocity. default is 1000 / 60
     * @property {number} [density=0.001] - Read only. Use GameObject.body.setDensity to set. A Number that defines the density of the body (mass per unit area). Mass will also be updated when set. default is 0.001
     * @property {Vector} [force] - A Vector that accumulates the total force applied to the body for a single update. Force is zeroed after every Engine.update, so constant forces should be applied for every update they are needed. Apply force with GameObject.body.applyForce (https://brm.io/matter-js/docs/classes/Body.html#method_applyForce)
     * @property {number} [friction=0.1] - A Number that defines the friction of the body. The value is always positive and is in the range (0, 1). A value of 0 means that the body may slide indefinitely. A value of 1 means the body may come to a stop almost instantly after a force is applied. The effects of the value may be non-linear. High values may be unstable depending on the body. The engine uses a Coulomb friction model including static and kinetic friction. Note that collision response is based on pairs of bodies, and that friction values are combined with the following formula: Math.min(bodyA.friction, bodyB.friction). default is 0.1
     * @property {number} [frictionAir=0.01] - A Number that defines the air friction of the body (air resistance). A value of 0 means the body will never slow as it moves through space. The higher the value, the faster a body slows when moving through space. The effects of the value are non-linear. default is 0.01
     * @property {number} [frictionStatic=0.5] - A Number that defines the static friction of the body (in the Coulomb friction model). A value of 0 means the body will never 'stick' when it is nearly stationary and only dynamic friction is used. The higher the value (e.g. 10), the more force it will take to initially get the body moving when nearly stationary. This value is multiplied with the friction property to make it easier to change friction and maintain an appropriate amount of static friction. default is 0.5
     * @property {number} [id] - An integer Number uniquely identifying number generated in Body.create by Common.nextId.
     * @property {number} [inertia] - Read only. Automatically calculated when vertices, mass or density are set or set through GameObject.body.setInertia. A Number that defines the moment of inertia of the body. This is the second moment of area in two dimensions. Can be manually set to Infinity to prevent rotation of the body. See https://brm.io/matter-js/docs/classes/Body.html#method_setInertia.
     * @property {number} [inverseInertia] - Read only. Automatically calculated when vertices, mass or density are set or calculated by Body.setInertia. A Number that defines the inverse moment of inertia of the body (1 / inertia).
     * @property {number} [inverseMass] - Read only. Use GameObject.body.setMass to set. A Number that defines the inverse mass of the body (1 / mass).
     * @property {boolean} [isSensor=false] - A flag that indicates whether a body is a sensor. Sensor triggers collision events, but doesn't react with colliding body physically. False by default.
     * @property {boolean} [isSleeping] - Read only. Use Matter.Sleeping.set to set. A flag that indicates whether the body is considered sleeping. A sleeping body acts similar to a static body, except it is only temporary and can be awoken. False by default.
     * @property {boolean} [isStatic] - Read only. Use GameObject.body.setStatic to set. A flag that indicates whether a body is considered static. A static body can never change position or angle and is completely fixed. False by default.
     * @property {string} [label] - A String that defines the label property of the body. See https://brm.io/matter-js/docs/classes/Body.html#property_label
     * @property {number} [mass] - Read only. Use GameObject.body.setMass to set. Calculated automatically from object properties
     * @property {number} [motion] - Read only. Calculated during engine update only when sleeping is enabled. A Number that loosely measures the amount of movement a body currently has. Derived from body.speed^2 + body.angularSpeed^2. See Sleeping.update. 0 by default.
     * @property {Object} [parent] - Read only. Updated by GameObject.body.setParts. A reference to the body that this is a part of. See body.parts. This is a self reference if the body is not a part of another body.
     * @property {Object[]} [parts] - Read only. Use Body.setParts to set. An array of bodies that make up this body. The first body in the array must always be a self reference to the current body instance. All bodies in the parts array together form a single rigid compound body. Parts are allowed to overlap, have gaps or holes or even form concave bodies. Parts themselves should never be added to a World, only the parent body should be. Use Body.setParts when setting parts to ensure correct updates of all properties.
     * @property {Vector} [position] - Read only. Use GameObject.body.setPosition to set. A Vector that specifies the current world-space position of the body. Default is { x: 0, y: 0 }
     * @property {number} [restitution=0] - A Number that defines the restitution (elasticity) of the body. The value is always positive and is in the range (0, 1). A value of 0 means collisions may be perfectly inelastic and no bouncing may occur. A value of 0.8 means the body may bounce back with approximately 80% of its kinetic energy. Note that collision response is based on pairs of bodies, and that restitution values are combined with the following formula: Math.max(bodyA.restitution, bodyB.restitution). 0 by default.
     * @property {number} [sleepThreshold=60] - A Number that defines the length of time during which this body must have near-zero velocity before it is set as sleeping by the Matter.Sleeping module (if sleeping is enabled by the engine). Default is 60.
     * @property {number} [slop=0.05] - A Number that specifies a thin boundary around the body where it is allowed to slightly sink into other bodies. This is required for proper collision response, including friction and restitution effects. The default should generally suffice in most cases. You may need to decrease this value for very small bodies that are nearing the default value in scale. Default is 0.05.
     * @property {number} [speed] - Read only. Use GameObject.body.setVelocity to set. A Number that specifies the speed of the body. This value is always positive, representing the magnitude of velocity. 0 by default.
     * @property {number} [timeScale=1] - A Number that specifies per-body time scaling. Defualt is 1.... to make time slower relative to other objects in the scene, set to a number less than 1. To make time faster relative to other objects in the scene, set to a number greater than 1.
     * @property {number} [torque] - A Number that accumulates the total torque (turning force) applied to the body for a single update. See also Body.applyForce. Torque is zeroed after every Matter.Engine.update (Scene.engine), so constant torques should be applied for every update they are needed. Torques result in angular acceleration on every update, which depends on body inertia and the engine update delta. 0 by default.
     * @property {Vector} [velocity] - Read only. Use GameObject.body.setVelocity to set. A Vector that specifies the current world-space velocity of the body. Default is { x: 0, y: 0 }
     */
    interface PhysicsOptions {
        angle?: number; // A Number specifying the angle of the body, in radians. default is 0
        readonly angularSpeed?: number; // Read only. Use GameObject.body.setAngularSpeed to set. default is 0. The current rotational speed of the body.
        anglarVelocity?: number; // Read only. Use Body.setAngularVelocity to set. default is 0. Gets the current rotational velocity of the body.
        readonly area?: string; // Read only. Calculated automatically when vertices are set. A Number that measures the area of the body's convex hull.
        readonly axes?: Vector; // Read only. Calculated automatically when vertices are set. An array of unique axis vectors (edge normals) used for collision detection. These are automatically calculated when vertices are set. They are constantly updated by Body.update during the simulation.
        bounds?: Bounds; // A Bounds object that defines the AABB region for the body. It is automatically calculated when vertices are set and constantly updated by Body.update during simulation.        
        collisionFileter?: { // An Object that specifies the collision filtering properties of this body.  See https://brm.io/matter-js/docs/classes/Body.html#property_collisionFilter
            category?: number; // A bit field that specifies the collision category this body belongs to. The category value should have only one bit set, for example 0x0001. This means there are up to 32 unique collision categories available. See body.collisionFilter for more information. default is 1
            group?: number; // An Integer Number, that specifies the collision group this body belongs to. See body.collisionFilter for more information. default is 0
            mask?: number; // A bit mask that specifies the collision categories this body may collide with. See body.collisionFilter for more information. default is -1

        };
        readonly deltaTime?: number; // Read only. Updated during engine update. A Number that records the last delta time value used to update this body. Used to calculate speed and velocity. default is 1000 / 60
        readonly density?: number; // Read only. Use GameObject.body.setDensity to set. A Number that defines the density of the body (mass per unit area). Mass will also be updated when set. default is 0.001
        force?: Vector; // A Vector that accumulates the total force applied to the body for a single update. Force is zeroed after every Engine.update, so constant forces should be applied for every update they are needed. Apply force with GameObject.body.applyForce (https://brm.io/matter-js/docs/classes/Body.html#method_applyForce)
        friction?: number; // A Number that defines the friction of the body. The value is always positive and is in the range (0, 1). A value of 0 means that the body may slide indefinitely. A value of 1 means the body may come to a stop almost instantly after a force is applied. The effects of the value may be non-linear. High values may be unstable depending on the body. The engine uses a Coulomb friction model including static and kinetic friction. Note that collision response is based on pairs of bodies, and that friction values are combined with the following formula: Math.min(bodyA.friction, bodyB.friction). default is 0.1
        frictionAir?: number; // A Number that defines the air friction of the body (air resistance). A value of 0 means the body will never slow as it moves through space. The higher the value, the faster a body slows when moving through space. The effects of the value are non-linear. default is 0.01
        frictionStatic?: number; // A Number that defines the static friction of the body (in the Coulomb friction model). A value of 0 means the body will never 'stick' when it is nearly stationary and only dynamic friction is used. The higher the value (e.g. 10), the more force it will take to initially get the body moving when nearly stationary. This value is multiplied with the friction property to make it easier to change friction and maintain an appropriate amount of static friction. default is 0.5
        id?: number; // An integer Number uniquely identifying number generated in Body.create by Common.nextId.
        readonly inertia?: number; // Read only. Automatically calculated when vertices, mass or density are set or set through GameObject.body.setInertia. A Number that defines the moment of inertia of the body. This is the second moment of area in two dimensions. Can be manually set to Infinity to prevent rotation of the body. See https://brm.io/matter-js/docs/classes/Body.html#method_setInertia.
        readonly inverseInertia?: number; // Read only. Automatically calculated when vertices, mass or density are set or calculated by Body.setInertia. A Number that defines the inverse moment of inertia of the body (1 / inertia).
        readonly inverseMass?: number; // Read only. Use GameObject.body.setMass to set. A Number that defines the inverse mass of the body (1 / mass).
        isSensor?: boolean; // A flag that indicates whether a body is a sensor. Sensor triggers collision events, but doesn't react with colliding body physically. False by default.
        readonly isSleeping?: boolean; // Read only. Use Matter.Sleeping.set to set. A flag that indicates whether the body is considered sleeping. A sleeping body acts similar to a static body, except it is only temporary and can be awoken. False by default.
        readonly isStatic?: boolean; // Read only. Use GameObject.body.setStatic to set. A flag that indicates whether a body is considered static. A static body can never change position or angle and is completely fixed. False by default.
        label?: string; // A String that defines the label property of the body. See https://brm.io/matter-js/docs/classes/Body.html#property_label
        readonly mass?: number; // A Number that defines the mass of the body. Density will also be updated when set. Read only. Use GameObject.body.setMass to set. Calculated automatically from object properties
        readonly motion?: number; // Read only. Calculated during engine update only when sleeping is enabled. A Number that loosely measures the amount of movement a body currently has. Derived from body.speed^2 + body.angularSpeed^2. See Sleeping.update. 0 by default.
        readonly parent?: Object; // Read only. Updated by GameObject.body.setParts. A reference to the body that this is a part of. See body.parts. This is a self reference if the body is not a part of another body.
        readonly parts?: Object[]; // Read only. Use Body.setParts to set. An array of bodies that make up this body. The first body in the array must always be a self reference to the current body instance. All bodies in the parts array together form a single rigid compound body. Parts are allowed to overlap, have gaps or holes or even form concave bodies. Parts themselves should never be added to a World, only the parent body should be. Use Body.setParts when setting parts to ensure correct updates of all properties.
        readonly position?: Vector; // Read only. Use GameObject.body.setPosition to set. A Vector that specifies the current world-space position of the body. Default is { x: 0, y: 0 }
        restitution?: number; // A Number that defines the restitution (elasticity) of the body. The value is always positive and is in the range (0, 1). A value of 0 means collisions may be perfectly inelastic and no bouncing may occur. A value of 0.8 means the body may bounce back with approximately 80% of its kinetic energy. Note that collision response is based on pairs of bodies, and that restitution values are combined with the following formula: Math.max(bodyA.restitution, bodyB.restitution). 0 by default.
        sleepThreshold?: number; // A Number that defines the length of time during which this body must have near-zero velocity before it is set as sleeping by the Matter.Sleeping module (if sleeping is enabled by the engine). Default is 60.
        slop?: number; // A Number that specifies a thin boundary around the body where it is allowed to slightly sink into other bodies. This is required for proper collision response, including friction and restitution effects. The default should generally suffice in most cases. You may need to decrease this value for very small bodies that are nearing the default value in scale. Default is 0.05.
        readonly speed?: number; // Read only. Use GameObject.body.setVelocity to set. A Number that specifies the speed of the body. This value is always positive, representing the magnitude of velocity. 0 by default.
        timeScale?: number; // A Number that specifies per-body time scaling. Defualt is 1.... to make time slower relative to other objects in the scene, set to a number less than 1. To make time faster relative to other objects in the scene, set to a number greater than 1.
        torque?: number; // A Number that accumulates the total torque (turning force) applied to the body for a single update. See also Body.applyForce. Torque is zeroed after every Matter.Engine.update (Scene.engine), so constant torques should be applied for every update they are needed. Torques result in angular acceleration on every update, which depends on body inertia and the engine update delta. 0 by default.
        readonly "type"?: string; // A String denoting the type of object. Should always be "body". Read only.
        readonly velocity?: Vector; // Read only. Use Body.setVelocity to set. Equivalent to the magnitude of body.angularVelocity (always positive). { x: 0, y: 0 } by default.
        readonly vertices?: Vector[]; // Read only. Use GameObject.body.setVertices or GameObject.body.setParts to set. See also Scene.Bodies.fromVertices(). An array of Vector objects that specify the convex hull of the rigid body. These should be provided about the origin (0, 0). E.g. [{ x: 0, y: 0 }, { x: 25, y: 50 }, { x: 50, y: 0 }]. Vertices must always be convex, in clockwise order and must not contain any duplicate points. Do not worry about this, it is handled under the hood. If the polygon is not convex and is built using the Polygon class, the points will be deconstructed into multiple convex polygons.
    }

    // Passed to the draw function of a GameObject
    /**
     * Passed to the draw function of a GameObject
     * 
     * @interface DrawOptions
     * @property {HTMLCanvasElement} [canvas] - Used for positional calculations.
     * @property {CanvasRenderingContext2D} ctx - Canvas rendering context that the object draws with
     * @property {Vec2} camera - Position of the camera in the scene
     * 
     * @example
     * ```js
     *  const options: DrawOptions = {
     *      canvas: document.getElementById("canvas") as HTMLCanvasElement,
     *      ctx: document.getElementById("canvas").getContext("2d"),
     *      camera: [0, 0]
     *  }
     * ```
     */
    interface DrawOptions {
        canvas?: HTMLCanvasElement; // Used for positional calculations.
        ctx: CanvasRenderingContext2D; // Canvas rendering context that the object draws with
        camera: Vec2; // Position of the camera in the scene
    }

    // Bounds defining the boundaries of a physics body
    /**
     * Bounds defining the boundaries of a physics body
     * 
     * @interface Bounds
     * @property {Vec2} min - minimum bounds
     * @property {Vec2} max - maximum bounds
     */
    type Bounds = {
        min: Vec2; // minimum bounds
        max: Vec2; // maximum bounds
    }

    /**
     * An alias for Vec2
     * 
     * @type {Point}
     * @alias Vec2
     */
    type Point = Vec2; // alias for a Vec2, for easier readability

    /**
     * A 2D vector
     * @type {Vec2}
     */
    type Vec2 = [number, number]; // 2D vector

    // Same as Vec2, but with a different structure for compatability with matter.js
    /**
     * Same as Vec2, but with a different structure for compatability with matter.js
     * 
     * @type {Vector}
     */
    type Vertex = {
        x: number;
        y: number;
    };

    // Alias for Vertex
    /**
     * Alias for Vertex
     * 
     * @type {Vector}
     * @alias Vertex
     */
    type Vector = Vertex;

    // A projection of a polygon onto an axis, used for collision detection
    /**
     * A projection of a polygon onto an axis, used for collision detection
     * 
     * @type {Projection}
     * @property {number} min - minimum projection
     * @property {number} max - maximum projection
     */
    type Projection = {
        min: number;
        max: number;
    };

    // Defines a collision between two objects
    // [object1, object2, function to run on collision, function to run on seperation, active]
    /**
     * Defines a collision between two objects
     * 
     * @type {CollisionMonitor}
     * @property {GameObject} 0 - First object
     * @property {GameObject} 1 - Second object
     * @property {Function} 2 - Function to run on collision
     * @property {Function} 3 - Function to run on seperation
     * @property {boolean} 4 - Whether the collision is active
     */
    type CollisionMonitor = [GameObject, GameObject, Function, Function, boolean];


    /**
     * Function for handling user input
     * 
     * @type {EventOnFunction}
     * @param {Event | GameObject} event - The event that triggered the function. If the input listens for keyboard input, this is an Event object, otherwise it is the GameObject that was clicked.
     */
    type EventOnFunction = (event: Event | GameObject) => void;

    // Used for rendering lights onto a scene, called each pixel and calculates the brightness of the pixel based on the lights in the scene
    /**
     * Used for rendering lights onto a scene, called each pixel and calculates the brightness of the pixel based on the lights in the scene
     * @param pix Uint8ClampedArray of the pixels of the canvas
     * @param width Width of the canvas
     * @param height Height of the canvas
     * @param lights Array of lights in the scene (formatted)
     * @param numLights Number of lights in the scene
     * @param dlights Array of directional lights in the scene (formatted)
     * @param numDlights Number of directional lights in the scene
     * @param ambient Ambient lighting in the scene
     * @param fog Constant that defines how lights spread in the scene
     * @param globalAlpha Contant transparency of the scene
     */
    function GPULightingKernel(this: any, pix: Uint8ClampedArray, width: number, height: number, lights: Array<number>, numLights: number, dlights: Array<number>, numDlights: number, ambient: number, fog: number, globalAlpha: number) {
        // aliases for coordinates (loop friendly)
        const i = this.thread.y;
        const j = this.thread.x;

        // calculates the rows down from the top of the canvas
        var rowsDown = height - i;

        // calculates the pixel number
        var pixNum = ((width * rowsDown) + j) * 4;

        // initial brightness (format is r,g,b)
        var brightness = [ambient, ambient, ambient];

        // loop over each light, calculate brightness of each pixel based on proximity to the light, how far the light spreads (diffuse), and the strength of the light
        for (var k = 0; k < numLights; k++) {
            var ln = k * 7;
            var attenuation = (1 - Math.pow(Math.min(distance([j, i], [lights[ln], height - lights[ln + 1]]), lights[ln + 3]) / lights[ln + 3], fog));
            var strength = lights[ln + 2];
            brightness[0] += attenuation * strength * (lights[ln + 4] / 255);
            brightness[1] += attenuation * strength * (lights[ln + 5] / 255);
            brightness[2] += attenuation * strength * (lights[ln + 6] / 255);
        }

        // loops over each directional light, calculates brightness of each pixel based on proximity to the light, how far the light spreads (diffuse), the angle of the light, and the strength of the light
        for (var d = 0; d < numDlights; d++) {
            var ln = d * 9;
            var angle = dlights[ln];
            var lightDir = angle
            const lightX = dlights[ln + 1];
            const lightY = dlights[ln + 2];
            const intensity = dlights[ln + 3];
            const diffuse = dlights[ln + 4];
            const spread = dlights[ln + 5];

            const redL = dlights[ln + 6];
            const greenL = dlights[ln + 7];
            const blueL = dlights[ln + 8];

            const dirX = this.thread.x - lightX;
            const dirY = this.thread.y - (height - lightY);

            const dist = Math.sqrt(dirX * dirX + dirY * dirY);

            const angleToLight = (Math.atan2(dirY, dirX) + 2 * Math.PI) % (2 * Math.PI);

            const angleDiff = Math.acos(Math.cos(angleToLight - lightDir));

            // if the pixel is within the spread of the light, calculate the brightness of the pixel
            if (angleDiff <= spread / 2) {
                const diffuseFactor = Math.max(0, Math.cos(angleDiff) * (1 - (dist / diffuse)));
                brightness[0] += diffuseFactor * intensity * (redL / 255);
                brightness[1] += diffuseFactor * intensity * (greenL / 255);
                brightness[2] += diffuseFactor * intensity * (blueL / 255);
            }
        }
        // apply brightness to the pixel
        var red = ((pix[pixNum] / 255) * brightness[0]) * globalAlpha;
        var green = ((pix[pixNum + 1] / 255) * brightness[1]) * globalAlpha;
        var blue = ((pix[pixNum + 2] / 255) * brightness[2]) * globalAlpha;
        var alpha = (pix[pixNum + 3] / 255) * globalAlpha;

        // return the color
        this.color(
            red, green, blue, alpha
        )

    }

    // checks if a polygon is convex
    /**
     * Checks if a polygon is convex
     * 
     * @param points List of points that make up the polygon
     * @returns Returns true of the polygon is convex, false if it is concave
     */
    function isConvex(points: Point[]): boolean {
        if (points.length < 3) {
            // A polygon must have at least 3 points
            return false;
        }

        function crossProduct(p1: Point, p2: Point, p3: Point): number {
            // Cross product of vectors (p2 - p1) and (p3 - p2)
            return (p2[0] - p1[0]) * (p3[1] - p2[1]) - (p2[1] - p1[1]) * (p3[0] - p2[0]);
        }

        let signDetected: Boolean = false;
        let foundSign: string = '';

        for (let i = 0; i < points.length; i++) {
            const p1 = points[i];
            const p2 = points[(i + 1) % points.length];
            const p3 = points[(i + 2) % points.length];

            const crossProductResult = crossProduct(p1, p2, p3);

            if (crossProductResult !== 0) {
                // Check if the sign of the cross product changes
                if (signDetected === false) {
                    foundSign = crossProductResult > 0 ? 'positive' : 'negative';
                    signDetected = true;
                } else {
                    if ((crossProductResult > 0 && foundSign === 'negative') ||
                        (crossProductResult < 0 && foundSign === 'positive')) {
                        // If the sign changes again, the polygon is concave
                        return false;
                    }
                }
            }
        }

        // If no sign change is detected, the polygon is convex
        return true;
    }

    /**
     * Checks to see if a light is a directional light or not
     * 
     * @param light Light instnace to check
     * @returns Returns true if the light is a directional light, false if it is not
     */
    function instanceOfDirectionalLight(light: Light | DirectionalLight): light is DirectionalLight {
        return (<DirectionalLight>light).angle !== undefined;
    }

    // gets the centroid of a polygon
    /**
     * Finds the centroid of the polygon
     * 
     * @param points List of points that make up the polygon
     * @returns Returns the centroid of the polygon
     */
    function getCentroid(points: Point[]): Point {
        var x: number = 0, y: number = 0;
        for (var i = 0; i < points.length; i++) {
            x += points[i][0];
            y += points[i][1];
        }
        return [x / points.length, y / points.length];
    }

    // calculates FPS based on a buffer
    /**
     * Calculates FPS of the scene based on a buffer of timestamps
     * 
     * @param buffer Array of numbers that represent the time between frames
     * @param FPS_BUFFER_LENGTH How long the buffer should be before an accurate FPS can be calculated
     * @returns FPS of the scene
     */
    function calculateFPS(buffer: Array<number>, FPS_BUFFER_LENGTH: number = 60): number | string {
        buffer = buffer.map(t => {
            var seconds = 1000 / t;
            return seconds
        });
        const average = (array: Array<number>): number => array.reduce((a, b) => a + b) / array.length;
        if (buffer.length < FPS_BUFFER_LENGTH) return "--"
        return Math.round(average(buffer));
    }

    // gets the top left most point of a polygon
    /**
     * Finds the top left most point of a given polyogon
     * 
     * @param points List of points that make up the polygon
     * @returns Returns the top left most point of the polygon
     */
    function findTopLeftMostPoint(points: Point[]): Point {
        if (points.length === 0) {
            throw new Error('Points array must not be empty');
        }

        // Initialize with the first point
        let topLeftMost = points[0];

        // Iterate through the rest of the points
        for (let i = 1; i < points.length; i++) {
            const currentPoint = points[i];

            // Compare x-coordinates first
            if (currentPoint[0] < topLeftMost[0]) {
                // If the current point's x-coordinate is smaller, update topLeftMost
                topLeftMost = currentPoint;
            } else if (currentPoint[0] === topLeftMost[0]) {
                // If x-coordinates are equal, compare y-coordinates
                if (currentPoint[1] < topLeftMost[1]) {
                    // If the current point's y-coordinate is smaller, update topLeftMost
                    topLeftMost = currentPoint;
                }
            }
            // If the x-coordinate is greater, no need to update
        }

        return topLeftMost;
    }

    // checks to see if a polygon is a square
    /**
     * Checks to see if a given polygon is a square (used for collision detection)
     * 
     * @param points List of points that make up the polygon
     * @returns Returns true if the polygon is a square, false if it is not
     */
    function isSquare(points: Point[]): boolean {
        if (points.length !== 4) return false;
        // Assuming points is an array of 4 points
        const sideLengths = [
            distance(points[0], points[1]),
            distance(points[1], points[2]),
            distance(points[2], points[3]),
            distance(points[3], points[0])
        ];
        // A square has 4 equal side lengths, Set() removes duplicates
        const uniqueSideLengths = new Set(sideLengths);
        return uniqueSideLengths.size === 1;
    }

    // gets the distance between two points
    /**
     * Gets the distance between two points
     * 
     * @param point1 The first point
     * @param point2 The second point
     * @returns The distance between the points
     */
    function distance(point1: Point, point2: Point): number {
        return Math.sqrt(Math.pow(point2[0] - point1[0], 2) + Math.pow(point2[1] - point1[1], 2));
    }

    // calculates the bounding box of a polygon based on a set of vertices
    /**
     * Calculates the bounding box of a polygon based on a set of vertices
     * 
     * @param vertices List of vertices that make up the polygon
     * @returns An array representing the bounding box of the polygon
     */
    function getBoundingBox(vertices: Array<Vertex>): Array<number> {
        let minX = Number.MAX_VALUE;
        let minY = Number.MAX_VALUE;
        let maxX = Number.MIN_VALUE;
        let maxY = Number.MIN_VALUE;

        for (const vertex of vertices) {
            minX = Math.min(minX, vertex.x);
            minY = Math.min(minY, vertex.y);
            maxX = Math.max(maxX, vertex.x);
            maxY = Math.max(maxY, vertex.y);
        }

        return [minX, minY, maxX, maxY];
    }

    // adds the elements of two arrays together

    /**
     * Adds up multiple arrays
     * 
     * @param arrays List of arrays to add together
     * @returns The arrays, each element summed with the corresponding element of the other arrays
     */
    function sumArrays(...arrays: Array<Array<number>>): Array<number> {
        const n = arrays.reduce((max, xs) => Math.max(max, xs.length), 0);
        const result = Array.from({ length: n });
        return result.map((_, i) => arrays.map(xs => xs[i] || 0).reduce((sum, x) => sum + x, 0));
    }

    // multiplies the elements of two arrays together
    /**
     * Multiples the elements of two arrays together
     * 
     * @param arrays List of arrays to multiply together
     * @returns The arrays, each element multiplied with the corresponding element of the other arrays
     */
    function multArrays(...arrays: Array<Array<number>>): Array<number> {
        const n = arrays.reduce((max, xs) => Math.max(max, xs.length), 0);
        const result = Array.from({ length: n });
        return result.map((_, i) => arrays.map(xs => xs[i] || 0).reduce((sum, x) => sum * x, 1));
    }

    // generates a unique identifier
    /**
     * Generates a unique identifier
     * 
     * @returns A unique identifier
     */
    function uid(): string {
        let
            d = new Date().getTime(),
            d2 = ((typeof performance !== 'undefined') && performance.now && (performance.now() * 1000)) || 0;
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
            let r = Math.random() * 16;
            if (d > 0) {
                r = (d + r) % 16 | 0;
                d = Math.floor(d / 16);
            } else {
                r = (d2 + r) % 16 | 0;
                d2 = Math.floor(d2 / 16);
            }
            return (c == 'x' ? r : (r & 0x7 | 0x8)).toString(16);
        });
    };

    // checks to see if two polygons are colliding (used for convex polygons)
    /**
     * Checks to see if two polygons are intersecting (used for convex polygons)
     * 
     * @param poly1 The first polygon
     * @param poly2 The second polygon
     * @returns True if the polygons are colliding, false otherwise
     */
    function checkSquareCollision(poly1: Point[], poly2: Point[]): boolean {
        // Helper function to get the axes of a polygon
        function getAxes(poly: Point[]): Array<Vec2> {
            const axes: Array<Vec2> = [];
            for (let i = 0; i < poly.length; i++) {
                const p1 = poly[i];
                const p2 = i + 1 < poly.length ? poly[i + 1] : poly[0];
                const edge = [p2[0] - p1[0], p2[1] - p1[1]];
                const perpendicular: Vec2 = [-edge[1], edge[0]]; // Perpendicular vector
                axes.push(perpendicular);
            }
            return axes;
        }
        // generates a projection of the polygon onto an axis
        function project(poly: Point[], axis: Vec2): Projection {
            let min = Infinity;
            let max = -Infinity;
            for (const point of poly) {
                const dotProduct = point[0] * axis[0] + point[1] * axis[1];
                min = Math.min(min, dotProduct);
                max = Math.max(max, dotProduct);
            }
            return { min, max };
        }
        // checks to see if two projections overlap
        function overlap(projection1: Projection, projection2: Projection): Boolean {
            return (
                projection1.max >= projection2.min && projection2.max >= projection1.min
            );
        }

        // get the axes of each polygon
        const axes1 = getAxes(poly1);
        const axes2 = getAxes(poly2);

        // loop over each axis of each polygon
        for (const axis of [...axes1, ...axes2]) {
            // calculate the projection of each polygon onto the axis
            const projection1: Projection = project(poly1, axis);
            const projection2: Projection = project(poly2, axis);

            // check if the projections overlap
            if (!overlap(projection1, projection2)) {
                // If there is any axis of separation, the polygons do not intersect
                return false;
            }
        }

        // If no separating axis is found, the polygons intersect
        return true;
    }

    // checks if a point is inside a polygon (not good for collision detection (does not check for edges intersecting) use checkSquareCollision()
    /**
     * Used for concave collision detection, not good for collision detection (does not check for edges intersecting) use checkSquareCollision()
     * @param polygon The polygon to check
     * @param pointsArray List of point to check against the polygon
     * @returns True if any of the points lie inside the polygon
     */
    function checkCollision(polygon: Point[], pointsArray: Array<Point>): Boolean {
        // Ensure the polygon has at least 3 points
        if (polygon.length < 3) {
            throw new Error('Polygon must have at least 3 points');
            return false;
        }

        // Helper function to check if a point is on the left side of a line
        function isOnLeftSide(lineStart: Point, lineEnd: Point, testPoint: Point): number {
            return (
                (lineEnd[0] - lineStart[0]) * (testPoint[1] - lineStart[1]) -
                (testPoint[0] - lineStart[0]) * (lineEnd[1] - lineStart[1])
            );
        }

        // Loop over each point in the array
        for (const point of pointsArray) {
            let inside = false;

            for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
                const vertex1 = polygon[i];
                const vertex2 = polygon[j];

                if (
                    (vertex1[1] > point[1]) !== (vertex2[1] > point[1]) &&
                    point[0] <
                    ((vertex2[0] - vertex1[0]) * (point[1] - vertex1[1])) /
                    (vertex2[1] - vertex1[1]) +
                    vertex1[0]
                ) {
                    inside = !inside;
                }

                // Check if the test point lies on an edge of the polygon
                if (
                    isOnLeftSide(vertex1, vertex2, point) === 0 &&
                    point[0] >= Math.min(vertex1[0], vertex2[0]) &&
                    point[0] <= Math.max(vertex1[0], vertex2[0]) &&
                    point[1] >= Math.min(vertex1[1], vertex2[1]) &&
                    point[1] <= Math.max(vertex1[1], vertex2[1])
                ) {
                    return true; // Return true if any point is on an edge
                }
            }

            if (inside) {
                return true; // Return true if any point is inside the polygon
            }
        }

        return false; // Return false if none of the points are inside the polygon
    }




    /**
     * @class GameObject
     * @classdesc Base class for all objects in the scene
     * @property {boolean} physicsEnabled - boolean if physics is enabled on the object
     * @property {PhysicsOptions} physicsOptions - options for the physics engine
     * @property {string} id - unique ID for each object
     * @property {Array<number>} bounds - how the object is bounded in the scene (set with scene.setBoundaries())
     * @property {boolean} boundsActive - are the bounds active on this object?
     * @property {boolean} pinned - does nothing!
     * @property {Object} _state - used for state() and returnState(), builds states that are returnable. Stacking two states is destructive.
     * @property {boolean} square - True if the object is a square, false otherwise
     * @property {Vec2} hitbox - Hitbox of the object, if the object is a square
     * @property {any} body - reference to the physics body (matter.js). Empty if physics is not enabled
     * @property {Array<Vec2>} points - points of the object (used for collision detection)
     * @property {Vec2} coordinates - coordinates of the object, or the top left most point of the object
     * @property {string} type - Type of the object, either "gameObject", "sprite", or "polygon"
     * @property {boolean} convex - true if the object is convex, false otherwise
     * @property {any} [key: string] - any other properties that are added to the object
     * @example
     * ```js
     *  const gameObject = new GameObject({
     *      physicsEnabled: true,
     *      physicsOptions: {
     *          restitution: 0.5
     *     }
     *  });
     * ```
     * @example
     * ```js
     *  const gameObject = new GameObject();
     * ```
     */
    class GameObject {
        physicsEnabled: boolean; // boolean if physics is enabled on the object
        physicsOptions: PhysicsOptions; // options for the physics engine
        id: string; // unique ID for each object
        bounds: Array<number>; // how the object is bounded in the scene (set with scene.setBoundaries())
        boundsActive: boolean; // are the bounds active on this object?
        pinned: boolean; // does nothing!
        _state: { [key: string]: any }; // used for state() and returnState(), builds states that are returnable. Stacking two states is destructive.
        square: boolean; // True if the object is a square, false otherwise
        hitbox: Vec2; // Hitbox of the object, if the object is a square
        body: any; // reference to the physics body (matter.js). Empty if physics is not enabled
        points: Array<Vec2>; // points of the object (used for collision detection)
        coordinates: Vec2; // coordinates of the object, or the top left most point of the object 
        type: string; // Type of the object, either "gameObject", "sprite", or "polygon"
        convex: boolean; // true if the object is convex, false otherwise
        [key: string]: any;

        /**
         * 
         * @param options GameObjectOptions to initialize the object with
         */
        constructor(options: GameObjectOptions = {}) {
            // will physics work on this object?
            this.physicsEnabled = options.physicsEnabled || false;
            this.physicsOptions = options.physicsOptions || {};

            if (this.physicsEnabled) {
                this.body = {}
            }
            // unique ID for each object
            this.id = uid();

            // where can it move? set with scene.setBoundaries()
            this.bounds = [];
            this.boundsActive = false;

            // does nothing!
            this.pinned = true;

            this._state = {};

            this.square = false; // assume the worst
            this.hitbox = [0, 0];
            this.points = [];
            this.coordinates = [0, 0];
            this.type = "gameObject";
            this.convex = false; // assume the worst
        }

        /**
         * Changes an attribute of the object (non destructive). To return to the original object, use returnState. Used for clicking
         * 
         * @param attr The attribute to change
         * @param value The new value of that attribute
         */
        state(attr: string, value: any): void {
            Object.keys(this).forEach(key => {
                if (key == "_state") return;
                this._state[key] = this[key];
            });
            this[attr] = value;
        }

        /**
         * Returns to the old state (before state() was called). Used for clicking
         */
        returnState(): void {
            Object.keys(this._state).forEach(key => {
                this[key] = this._state[key];
            })
        }

        /**
         * Updates object physics 1 tick
         */
        updatePhysics(): void {
            var vertices = this.body.vertices;
            if (this.square) {
                var width = (vertices[0].x - 10) - (vertices[1].x + 10);
                var height = (vertices[0].y - 10) - (vertices[1].y + 10);
                this.hitbox = [width, height];
                if (this.type == "sprite") {
                    this.coordinates = [this.body.bounds.min.x, this.body.bounds.min.y];
                    this.points = this.body.vertices.map((v: Vertex) => {
                        return [v.x, v.y]
                    });
                } else if (this.type == "polygon") {
                    this.points = this.body.vertices.map((v: Vertex) => {
                        return [v.x, v.y]
                    });
                    this.coordinates = findTopLeftMostPoint(this.points);
                }
            } else {
                this.points = this.body.vertices.map((v: Vertex) => {
                    return [v.x, v.y]
                });
                this.coordinates = findTopLeftMostPoint(this.points);
            }
        }
        /**
         * Applies a force to the object (only works if physics enabled)
         * 
         * @param vector The force vector to apply to the object
         */
        applyForce(vector: Vec2) {
            var vec = Matter.Vector.create(vector[0], vector[1]);
            Matter.Body.applyForce(this.body, this.body.position, vec);
        }

        /**
         * Modifies pin
         */
        unpin() {
            this.pinned = false;
        }
        /**
         * Modifies pin
         */
        pin() {
            this.pinned = true
        }

        /**
         * Returns the gameobject represented as an array of points.
         * @returns An array of points (eg: objects bounds). used for collision detection
         */
        polify(): Point[] {
            return [];
        }
        
        /**
         * Draws the object on the provided drawing context, in accordance with the camera position. This is handled automatically with scene and scene managers
         * 
         * @param options The DrawOptions for the object
         */
        draw(options: DrawOptions) { }


        /**
         * Sets the object's bounds (where it can move)
         * @param bounds The bounds to set the object to
         */
        setBounds(bounds: Array<number>) {
            this.bounds = bounds;
            this.boundsActive = true;
        }

        /**
         * Disables bounds on that object
         */
        disableBounds() {
            this.boundsActive = false;
        }

        /**
         * Activates bounds on that object
         */
        activateBounds() {
            this.boundsActive = true;
        }

        /**
         * Moves the object by a vector (no forces involved)
         * 
         * @param vector The vector to move the object by
         * @returns Whether the object was moved or not (if it was out of bounds, it will not move)
         */
        moveStatic(vector: Vec2) {
            if (!this.physicsEnabled) return this.move(vector);
            var newX = this.body.position.x + vector[0];
            var newY = this.body.position.y + vector[1];
            Matter.Body.setPosition(this.body, Matter.Vector.create(newX, newY));
            return true;
        }

        /**
         * Gets the width of the object.
         * @returns The width of the object. Useful for polygons, as polygons do not have a reliable width property
         */
        getWidth(): number {
            return 0;
        }

        /**
         * Gets the height of the object.
         * @returns The height of the object. Useful for polygons, as polygons do not have a reliable height property
         */
        getHeight(): number {
            return 0;
        }

        /**
         * Top level move function (works with both physics enabled and disabled)... needs helper functions getWidth(), getHeight() to be defined. Recommended to re-write based on your use case (if extending)
         * @param vector Vector to move the object by
         * @param continueAfterPhysics If set to false, the object will not move if physics are not enabled. If true, the object will move if physics are not enabled. True by defualt
         * @returns Boolean, true if the move was successful, false if it was not (if it was out of bounds, it will not move)
         */
        move(vector: Vec2, continueAfterPhysics = true): Boolean {
            var newCoords = <Vec2>sumArrays(this.coordinates, vector);
            if (this.physicsEnabled) {
                Matter.Body.setVelocity(this.body, { x: vector[0] + this.body.velocity.x, y: vector[1] + this.body.velocity.y });
                return true;
            } else {
                if (!continueAfterPhysics) return false;
            }
            if (this.boundsActive) {
                if (newCoords[0] < 0 || newCoords[0] + this.getWidth() > this.bounds[0] || newCoords[1] < 0 || newCoords[1] + this.getHeight() > this.bounds[1]) {
                    var passesRightBound = (newCoords[0] + this.getWidth() > this.bounds[0]);
                    var passesLeftBound = (newCoords[0] < 0);
                    var passesTopBound = (newCoords[1] < 0);
                    var passesBottomBound = (newCoords[1] + this.getHeight() > this.bounds[1]);
                    if (passesRightBound) {
                        this.coordinates[0] = this.bounds[0] - this.getWidth();
                    }
                    if (passesLeftBound) {
                        this.coordinates[0] = 0;
                    }
                    if (passesTopBound) {
                        this.coordinates[1] = 0;
                    }
                    if (passesBottomBound) {
                        this.coordinates[1] = this.bounds[1] - this.getHeight();
                    }
                    return false;
                } else {
                    this.coordinates = newCoords;
                    return true;
                }
            } else {
                this.coordinates = newCoords;
                return true;
            }
        }

        /**
         * Checks for a collision with another object
         * 
         * @param object The object to check for a collision with
         * @returns Boolean, true of the object is colliding with the other object, false otherwise
         */
        checkCollision(object: GameObject) {
            var p1 = this.polify();
            var p2 = object.polify();

            if ((this.square || this.convex) && (object.square || object.convex)) {
                return checkSquareCollision(p1, p2);
            } else {
                return checkCollision(p1, p2);
            }
        }
    }

    /**
     * @class Polygon
     * @classdesc Polygon class, used for rendering polygons
     * @property {Array<Point>} points - points of the polygon
     * @property {string} backgroundColor - background color of the polygon
     * @property {Vec2} coordinates - coordinates of the polygon, or the top left most point of the polygon
     * @property {boolean} convex - true if the polygon is convex, false otherwise
     * @property {boolean} square - true if the polygon is a square, false otherwise
     * @property {Vec2} hitbox - hitbox of the polygon, if the polygon is a square
     * @property {string} type - type of the object, either "gameObject", "sprite", or "polygon"
     * @example
     * ```js
     *  const polygon = new Polygon({
     *      points: [[0, 0], [0, 100], [100, 100], [100, 0]],
     *      backgroundColor: "red"
     *  });
     * ```
     */
    class Polygon extends GameObject {
        /**
         * 
         * @param options PolygonOptions to initialize the polygon with
         */
        constructor(options: PolygonOptions) {
            super(options);
            this.type = "polygon"
            this.points = options.points;
            if (this.points.length < 3) {
                throw new Error("Polygon must have at least 3 points");
            }
            this.backgroundColor = options.backgroundColor;
            this.coordinates = findTopLeftMostPoint(this.points);
            this.convex = isConvex(this.points);
            this.square = isSquare(this.points);
            if (this.square) {
                this.hitbox = [this.points[0][0] - this.points[1][0], this.points[0][1] - this.points[1][1]];
            }
        }

        /**
         * Sets the hitbox of the polygon. Useful if the polygon is concave and you need more reliable collision detection.
         * @param width The width of the hitbox
         * @param height The height of the hitbox
         * @example
         * ```js
         * const polygon = new Polygon({
         *      points: [[0, 0], [0, 100], [100, 100], [100, 0]],
         *      backgroundColor: "red"
         * });
         * polygon.setHitBox(polygon.getWidth(), polygon.getHeight());
         * ``` 
         */
        setHitBox(width: number, height: number): void {
            this.hitbox = [width, height];
            this.square = true;
        }

        /**
         * Draws the polygon onto the provided drawing context. This is handled automatically with scene and scene managers
         * @param options The DrawOptions for the object
         */
        draw(options: DrawOptions): void {
            var { ctx, camera } = options;
            ctx.fillStyle = this.backgroundColor;
            ctx.beginPath();

            ctx.moveTo(this.points[0][0] - camera[0], this.points[0][1] - camera[1]);
            for (var point of this.points) {
                ctx.lineTo(point[0] - camera[0], point[1] - camera[1]);
            }
            ctx.closePath();
            ctx.fill();

        }

        /**
         * Returns the vertices of the polygon.
         * @returns The vertices of the polygon
         */
        polify(): Point[] {
            return this.points;
        }

        /**
         * Calculates the width of the polygon.
         * @returns The width of the polygon.
         */
        getWidth(): number {
            var points = this.points;

            // Initialize min and max X-coordinates with the first point
            let minX = points[0][0];
            let maxX = points[0][0];

            // Iterate through the rest of the points to find the min and max X-coordinates
            for (let i = 1; i < points.length; i++) {
                const x = points[i][0];

                // Update minX and maxX if needed
                minX = Math.min(minX, x);
                maxX = Math.max(maxX, x);
            }

            // Calculate and return the width
            const width = maxX - minX;
            return width;
        }

        /**
         * Calculates the height of the polygon.
         * @returns The height of the polygon.
         */
        getHeight(): number {
            var points = this.points;

            // Initialize min and max Y-coordinates with the first point
            let minY = points[0][1];
            let maxY = points[0][1];

            // Iterate through the rest of the points to find the min and max Y-coordinates
            for (let i = 1; i < points.length; i++) {
                const y = points[i][1];

                // Update minY and maxY if needed
                minY = Math.min(minY, y);
                maxY = Math.max(maxY, y);
            }

            // Calculate and return the height
            const height = maxY - minY;
            return height;
        }

        /**
         * Moves the polygon
         * 
         * @param vector The vector to move the polygon by
         * @returns Boolean, true if the move was successful, false if it was not (if it was out of bounds, it will not move)
         */
        move(vector: Vec2): Boolean {
            var moved: Boolean = super.move(vector);
            var newPoints: Point[] = []
            for (var point of this.points) {
                var newCoords = <Vec2>sumArrays(point, vector);
                if (this.boundsActive) {
                    if (newCoords[0] >= 0 && newCoords[0] <= this.bounds[0] && newCoords[1] >= 0 && newCoords[1] <= this.bounds[1]) {
                        newPoints.push(newCoords);
                    } else {
                        newPoints = this.points;
                        break;
                    }
                } else {
                    newPoints.push(newCoords);
                }
            }
            this.points = newPoints;
            this.coordinates = findTopLeftMostPoint(this.points);

            return moved;
        }
    }

    /**
     * @class Sprite
     * @classdesc Sprite class, used for rendering sprites
     * @property {string} image - url of the image to use for the sprite
     * @property {HTMLImageElement} source - the image element to use for the sprite
     * @property {Vec2} coordinates - coordinates of the sprite, or the top left most point of the sprite
     * @property {boolean} spriteLoaded - true if the sprite is loaded, false otherwise
     * @property {number} width - width of the sprite
     * @property {number} height - height of the sprite
     * @property {string} type - type of the object, either "gameObject", "sprite", or "polygon"
     * @example
     * ```js
     * const sprite = new Sprite({
     *      url: "https://i.imgur.com/9Nc8fFp.png",
     *      coordinates: [0, 0],
     *      width: 100,
     *      height: 100
     * });
     * ```
     */
    class Sprite extends GameObject {
        image: string;
        source: HTMLImageElement;
        coordinates: Vec2;
        spriteLoaded: boolean;
        width: number;
        height: number;

        /**
         * 
         * @param options SpriteOptions to initialize the sprite with
         */
        constructor(options: SpriteOptions) {
            super(options);
            this.type = "sprite"
            this.image = options.url;
            this.coordinates = options.coordinates;
            this.width = options.width;
            this.height = options.height;
            this.square = true;
            this.hitbox = [this.width, this.height];
            this.source = new Image(this.width, this.height);
            this.spriteLoaded = false
            this.reload();
        }

        /**
         * @returns The width of the sprite
         */
        getWidth(): number {
            return this.width;
        }

        /**
         * @returns The height of the sprite
         */
        getHeight(): number {
            return this.height;
        }

        /**
         * Loads the sprite, or reloads the image source when the image is changed
         */
        reload(): void {
            this.source.src = this.image;
            this.source.crossOrigin = 'anonymous'
            this.source.onload = () => {
                this.spriteLoaded = true;
            }
        }
        
        /**
         * Draws the sprite onto the provided drawing context. This is handled automatically with scene and scene managers
         * 
         * @param options The DrawOptions for the object
         */
        draw(options: DrawOptions): void {
            var { ctx, camera } = options;
            if (!this.physicsEnabled) {
                ctx.drawImage(this.source, this.coordinates[0] - camera[0], this.coordinates[1] - camera[1], this.width, this.height);
            } else {
                var c = getCentroid(this.points);
                var [x, y] = [c[0] - camera[0], c[1] - camera[1]];
                var rotation = this.body.angle;


                ctx.save();
                ctx.translate(x, y);
                ctx.rotate(rotation);
                ctx.drawImage(this.source, -this.getWidth() / 2, -this.getHeight() / 2, this.getHeight(), this.getWidth());
                ctx.restore();
            }
        }

        /**
         * Reshapes the sprite according to the provided dimensions
         * 
         * @param width The new width of the sprite
         * @param height The new height of the sprite
         */
        reshape(width: number, height: number): void {
            this.width = width;
            this.height = height;
            this.hitbox = [this.width, this.height]
        }

        /**
         * Scales the sprite by the provided factor. 1 is the default size, 2 is twice the size, 0.5 is half the size, etc.
         * @param factor The factor to scale the sprite by
         */
        scale(factor: number): void {
            this.width = this.width * factor;
            this.height = this.height * factor;
            this.hitbox = [this.width, this.height];
        }
        
        /**
         * Changes the sprites image source
         * 
         * @param image The new image URL to use for the sprite
         */
        changeSource(image: string): void {
            this.image = image;
            this.reload();
        }

        /**
         * Calculates the vertices of the sprite
         * @returns The vertices of the sprite
         */
        polify(): Point[] {
            var point1: Point = [this.coordinates[0], this.coordinates[1]];
            var point2: Point = [this.coordinates[0] + this.width, this.coordinates[1]];
            var point3: Point = [this.coordinates[0] + this.width, this.coordinates[1] + this.height];
            var point4: Point = [this.coordinates[0], this.coordinates[1] + this.height];
            return [point1, point2, point3, point4]
        }
    }


    /**
     * @class Light
     * @classdesc Light class, used for creating lights in the scene
     * @property {Point} point - Coordinates of the light
     * @property {number} diffuse - How much the light diffuses (measured in pixels)
     * @property {number} strength - Strength of the light. No matter how strong it is, it will never go past the bounds defined by diffuse
     * @property {Array<number>} color - Color of the light. Format is [r,g,b]. White by default
     * @property {string} type - Type of the light, either "light" or "directional"
     * @property {GameObject} pinnedTo - Object to pin the light's position to. Null by default.
     * @example
     * ```js
     * // light at position [0, 0], diffuse 0.5, strength 0.8, color [255, 255, 255] (white)
     * const light = new Light([0, 0], 0.5, 0.8, [255, 255, 255]);
     * ```
     * @example
     * // light at position [0, 0], diffuse 0.5, defualt strength (0.8), defualt color (white)
     * const light = new Light([0, 0], 0.5);
     */
    class Light {
        point: Point;
        diffuse: number;
        strength: number;
        color: Array<number>;
        type: string;
        pinnedTo: GameObject | null;

        /**
         * 
         * @param position The position of the light in wolrd space [x,y]
         * @param diffuse How far the light diffuses, in pixels
         * @param strength The strength of the light. Default is 0.8
         * @param color The color of the light, [r,g,b]. By defualt is [255, 255, 255] (white)
         */
        constructor(position: Point, diffuse: number, strength: number = 0.8, color = [255, 255, 255]) {
            if (typeof color != "object" || color.length != 3) throw new Error("Light color format is [r,g,b]");
            this.point = position;
            this.type = "light";
            this.diffuse = diffuse;
            this.strength = strength;
            this.color = color;
            this.pinnedTo = null;
        }

        /**
         * Pins the light's position to a certain GameObject
         * @param object The GameObject to pin the light to
         */
        pin(object: GameObject): void {
            this.pinnedTo = object
        }

        /**
         * Brightens the light by the specified factor
         * 
         * @param factor The factor to brighten the light by
         */
        brighten(factor: number) {
            this.strength *= factor;
        }

        /**
         * Dims the light by the specified factor
         * 
         * @param factor The factor to dim the light by
         */
        dim(factor: number): void {
            this.strength /= factor;
        }

        /**
         * Moves the light by the specified vector
         * @param vector The vector to move the light by
         * @example
         * ```js
         * const light = new Light([0, 0], 0.5);
         * light.move([10, 10]); // moves the light ten pixels to the right and ten pixels down
         */
        move(vector: Vec2): void {
            this.point = <Vec2>sumArrays(this.point, vector)
        }

        /**
         * Moves the light to the center of the specified GameObject (Good for things like lanterns, etc.)
         * 
         * @param object GameObject to move the light's position to
         */
        moveToObject(object: GameObject): void {

            var sumOfX = 0;
            var sumOfY = 0;
            object.polify().forEach(point => {
                sumOfX += point[0];
                sumOfY += point[1];
            })
            var a1 = sumOfX / object.polify().length;
            var a2 = sumOfY / object.polify().length;
            var middleOfObject = [a1, a2]
            this.point = [middleOfObject[0], middleOfObject[1]];
        }

        /**
         * Updates the light's position if pinned to an object, otherwise does nothing
         * @param canvas The canvas to draw the light on (Optional).
         */
        update(canvas: HTMLCanvasElement): void {
            if (this.pinnedTo) {
                this.moveToObject(this.pinnedTo)
            }
        }
    }


    /**
     * @class DirectionalLight
     * @classdesc DirectionalLight class, used for creating directional lights in the scene
     * @property {Point} point - Coordinates of the light
     * @property {number} diffuse - How much the light diffuses (measured in pixels)
     * @property {number} strength - Strength of the light. No matter how strong it is, it will never go past the bounds defined by diffuse
     * @property {Array<number>} color - Color of the light. Format is [r,g,b]. White by default
     * @property {string} type - Type of the light, either "light" or "directional"
     * @property {number} angle - Angle of the light (in radians)
     * @property {number} spread - Spread of the light (in radians)
     * @property {GameObject} pinnedToAngle - Object to pin the light's angle to. Null by default.
     * @beta
     * @devnote Directional lights are not fully implemented yet. They are not recommended for use.
     * @example
     * ```js
     * // light at position [0, 0], diffuse 0.5, strength 0.8, color [255, 255, 255] (white)
     * const light = new DirectionalLight([0, 0], 0.5, 0.8, [255, 255, 255]);
     * ```
     */
    class DirectionalLight extends Light {
        angle: number;
        spread: number;
        pinnedToAngle: GameObject | null;

        /**
         * 
         * @param position Position of the light in the world. [x,y]
         * @param angle Angle of the light, in radians
         * @param spread The spread of the light, in radians
         * @param diffuse How far the light diffuses, in pixels
         * @param strength The strength of the light.
         * @param color The color of the light, [r,g,b]. By defualt is [255, 255, 255] (white)
         */
        constructor(position: Point, angle: number, spread: number, diffuse: number, strength: number, color = [255, 255, 255]) {
            super(position, diffuse, strength, color)
            if (typeof color != "object" || color.length != 3) throw new Error("Light color format is [r,g,b]");
            this.point = position;
            this.diffuse = diffuse;
            this.strength = strength;
            this.color = color;
            this.angle = angle;
            this.type = "directional";
            this.spread = spread;
            this.pinnedToAngle = null;
        }

        /**
         * Point the light to a certain object
         * @param object Object to point the light to
         * @param canvas Canvas that the light is being rendered on (used for calculating the angle)
         */
        pointTo(object: GameObject, canvas: HTMLCanvasElement) {
            var sumOfX = 0;
            var sumOfY = 0;
            object.polify().forEach(point => {
                sumOfX += point[0];
                sumOfY += point[1];
            })
            var a1 = sumOfX / object.polify().length;
            var a2 = sumOfY / object.polify().length;
            var middleOfObject = [a1, a2];
            var vector = [middleOfObject[0] - this.point[0], canvas.height - middleOfObject[1] - this.point[1]];
            var angleToPoint = Math.atan2(vector[1], vector[0]);
            this.angle = angleToPoint;
        }

        /**
         * Pins the angle of the light toward a given GameObject
         * 
         * @param object GameObject to pin the light's angle to (points the light to the center of the object)
         */
        pinAngleTo(object: GameObject) {
            this.pinnedToAngle = object;
        }

        /**
         * Updates the light's position and angle if pinned to an object, otherwise does nothing
         * @param canvas Required to calculate the angle of the light (if the angle is pinned)
         */
        update(canvas: HTMLCanvasElement) {

            if (this.pinnedTo) {
                this.moveToObject(this.pinnedTo)
            }
            if (this.pinnedToAngle) {
                this.pointTo(this.pinnedToAngle, canvas);
            }
        }
    }


    /**
     * @class Scene
     * @classdesc Scene class, used for building scenes
     * @property {Array<GameObject>} objects - Objects in the scene
     * @property {Array<CollisionMonitor>} collisionMonitors - Collision monitors in the scene
     * @property {Vec2} cameraAngle - Position of the camera
     * @property {Array<number>} fpsBuffer - Buffer that holds the last FPS_BUFFER_SIZE frames rendering times (in ms)
     * @property {boolean} fpsMonitoringEnabled - Whether or not to monitor the fps
     * @property {number} lastFrameStamp - Last frame stamp
     * @property {number} lastPhysicsUpdate - Last physics update
     * @property {boolean} lighting - Whether or not lighting is enabled
     * @property {string} id - Unique ID of the scene
     * @property {Function} update - Update function of the scene (called every frame)
     * @property {Array<Light>} lights - Lights in the scene
     * @property {Array<DirectionalLight>} dlights - Directional lights in the scene
     * @property {any} gpu - GPU.js instance
     * @property {boolean} readyToDraw - Whether or not the scene is ready to draw
     * @property {any} diffuseKernel - GPU.js kernel for diffuse lighting
     * @property {number} fog - Fog of the scene
     * @property {number} ambient - Ambient of the scene
     * @property {boolean} clearScene - Whether or not to clear the scene
     * @property {boolean} physics - Whether or not physics is enabled
     * @property {any} Engine - Matter.js Engine
     * @property {any} Bodies - Matter.js Bodies
     * @property {any} Composite - Matter.js Composite
     * @property {any} engine - Matter.js engine instance
     * @property {HTMLCanvasElement} canvas - Canvas of the scene
     * @property {CanvasRenderingContext2D} ctx - Canvas rendering context of the scene
     * @property {number} width - Width of the scene
     * @property {number} height - Height of the scene
     * @property {Vec2} bounds - Bounds of the scene
     * @property {boolean} boundsActive - Whether or not the bounds are active
     * @property {GameObject | null} cameraBind - Object to bind the camera to
     * @property {number} FPS_BUFFER_SIZE - Size of the fps buffer
     * @property {boolean} isActiveScene - Whether or not the scene is the active scene
     * @example
     * ```js
     * const scene = new Scene({
     *      lighting: true,
     *      physics: true,
     *      physicsOptions: {
     *      gravity: {
     *          x: 0,
     *          y: 0
     *      }
     * }
     * });
     * ```
     * @example
     * ```js
     * const scene = new Scene({
     *      lighting: true,
     *      physics: true,
     *      physicsOptions: {
     *          gravity: {
     *              x: 0,
     *              y: 0
     *          }
     *      },
     *      lightOptions: {
     *          fog: 1.3,
     *          ambient: 0.2
     *      } 
     * });
     * ```
     */
    class Scene {
        objects: Array<GameObject>;
        collisionMonitors: Array<CollisionMonitor>;
        cameraAngle: Vec2;
        fpsBuffer: Array<number>;
        fpsMonitoringEnabled: boolean;
        lastFrameStamp: number;
        lastPhysicsUpdate: number;
        lighting: boolean;
        id: string;
        update: Function;
        lights: Array<Light>;
        dlights: Array<DirectionalLight>;
        gpu: any;
        readyToDraw: boolean;
        diffuseKernel: any;
        fog: number;
        ambient: number;
        clearScene: boolean;
        physics: boolean;
        Engine: any;
        Bodies: any;
        Composite: any;
        engine: any;
        canvas!: HTMLCanvasElement;
        ctx!: CanvasRenderingContext2D;
        width!: number;
        height!: number;
        bounds: Vec2;
        boundsActive: boolean;
        cameraBind: GameObject | null;
        FPS_BUFFER_SIZE: number;
        isActiveScene: boolean;

        /**
         * 
         * @param options SceneOptions object passed to initialize the scene
         */
        constructor(options: SceneOptions = {}) {
            this.objects = [];
            this.collisionMonitors = [];
            this.cameraAngle = [0, 0];
            this.fpsBuffer = [];
            this.fpsMonitoringEnabled = options.fpsMonitoringEnabled || false;
            this.lastFrameStamp = performance.now();
            this.lastPhysicsUpdate = performance.now();
            this.lighting = options.lighting || false;
            this.id = uid();
            this.update = options.update || function () { };
            this.lights = [];
            this.dlights = [];
            this.clearScene = options.clear || true;
            this.bounds = options.bounds || [0, 0];
            this.boundsActive = (options.bounds) ? true : false;
            this.cameraBind = options.bindCameraTo || null;
            this.FPS_BUFFER_SIZE = options.FPS_BUFFER_SIZE || 60;
            this.isActiveScene = false;
            if (this.lighting) {
                this.fog = (options.lightOptions) ? options.lightOptions.fog || 1.3 : 1.3;
                this.ambient = (options.lightOptions) ? options.lightOptions.ambient || 0.2 : 0.2;
            } else {
                this.fog = 1.3;
                this.ambient = 0.2;
            }
            if (typeof GPU == "function") {
                this.gpu = new GPU(options.GPUsettings || {});
            } else {
                this.gpu = new GPU.GPU(options.GPUsettings || {})
            }
            if (options.physics) {
                this.physics = true;
                this.Engine = Matter.Engine
                this.Bodies = Matter.Bodies
                this.Composite = Matter.Composite;
                this.engine = Matter.Engine.create(options.physicsOptions);
            } else {
                this.physics = false;
                this.Engine = null;
                this.Bodies = null;
                this.Composite = null;
                this.engine = null;
            }
            this.readyToDraw = false;
        }

        /**
         * Initializes the scene, specifically the light rendering kernel
         */
        ready(): void {
            if (this.lighting) {
                this.diffuseKernel = this.gpu.createKernel(GPULightingKernel, {
                    output: [this.canvas.width, this.canvas.height],
                    functions: {
                        distance: (a: Point, b: Point) => {
                            return Math.sqrt(Math.pow(a[0] - b[0], 2) + Math.pow(a[1] - b[1], 2));
                        }
                    },
                    graphical: true,
                    dynamicArguments: true
                });
            }
            this.readyToDraw = true;
        }
        /**
         * Used to add lights to the scene
         * @param light Light to add to the scene (can be either a Light or DirectionalLight)
         */
        addLight(light: Light | DirectionalLight): void {
            if (instanceOfDirectionalLight(light)) {
                this.dlights.push(light);
            } else {
                this.lights.push(light);
            }
        }
        
        /**
         * Formats the lights into a format that the diffuseKernel can understand
         * 
         * @param lights List of lights in the scene
         * @returns diffuseKernel-friendly light format
         */
        formatLights(lights: Array<Light>): Array<number> {
            var flights = lights.map(l => {
                return [l.point[0] - this.cameraAngle[0], l.point[1] - this.cameraAngle[1], l.strength, l.diffuse, l.color]
            });
            return flights.flat(2);
        }

        /**
         * Formats the directional lights into a format that the diffuseKernel can understand
         * 
         * @param lights List of directional lights in the scene
         * @returns diffuseKernel-friendly directional light format
         */
        formatDLights(lights: Array<DirectionalLight>): Array<number> {
            var dlights = lights.map(l => {
                return [l.angle, l.point[0] - this.cameraAngle[0], l.point[1] - this.cameraAngle[1], l.strength, l.diffuse, l.spread, l.color];
            });
            return dlights.flat(2);
        }

        /**
         * Renders lights onto the scene. Automatically calculates if lights are in the camera view and removes them from the render if they are not.
         * 
         * @param ambient The ambient lighting in the scene
         * @param fog The fog constant in the scene
         */
        diffuseLights(ambient: number = 0.2, fog: number = 1.3): void {
            this.lights.forEach(l => {
                l.update(this.canvas);
            });
            this.dlights.forEach(l => {
                l.update(this.canvas);
            });
            var lights = this.lights.filter((light) => {
                // only draw if within the camera view
                var cameraX = this.cameraAngle[0];
                var cameraY = this.cameraAngle[1];
                var x = light.point[0];
                var y = light.point[1];
                var dx = x - cameraX;
                var dy = y - cameraY;
                var sceneWidth = this.canvas.width;
                var sceneHeight = this.canvas.height;
                var diffuseFactor = light.diffuse;
                var isBoundedLeft = dx + diffuseFactor > 0;
                var isBoundedRight = dx - diffuseFactor < sceneWidth;
                var isBoundedTop = dy + diffuseFactor > 0;
                var isBoundedBottom = dy - diffuseFactor < sceneHeight;


                // take in a account the diffuse factor
                var isInBounds = isBoundedLeft && isBoundedRight && isBoundedTop && isBoundedBottom;
                return isInBounds;

            });
            var dlights = this.dlights;

            const width = this.canvas.width;
            const height = this.canvas.height;
            var numLights = lights.length;
            var numDLights = dlights.length;
            const pix = this.ctx.getImageData(0, 0, width, height).data;
            var flights = this.formatLights(lights);
            var dflights = this.formatDLights(dlights);
            // Run the GPU kernel

            if (flights.length <= 0) {
                flights = [0, 0, 0, 0, 0, 0, 0];
                numLights = 0;
            };
            if (dflights.length <= 0) {
                dflights = [0, 0, 0, 0, 0, 0, 0, 0, 0];
                numDLights = 0;
            }
            var globalAlpha = this.ctx.globalAlpha || 1;
            this.diffuseKernel(pix, width, height, flights, numLights, dflights, numDLights, ambient, fog, globalAlpha);
            const pixels = this.diffuseKernel.getPixels();

            this.ctx.putImageData(new ImageData(pixels, width, height), 0, 0);
        }

        /**
         * Sets the boundaries of the scene (eg: where object can move)
         * 
         * @param rightBound How far right (in pixel) can objects in the scene move. If object are initialized outside the bounds, they will not be able to move, unless physics is enabled, in which case they will not be able to enter the scene.
         * @param bottomBound How far down (in pixel) can objects in the scene move. If object are initialized outside the bounds, they will not be able to move, unless physics is enabled, in which case they will not be able to enter the scene.
         * @param activate Boolean, if true, bounds will be active by defualt, if false, bounds will be inactive by default
         */
        setBoundaries(rightBound: number, bottomBound: number, activate: boolean = true): void {
            this.bounds = [rightBound || this.canvas.width, bottomBound || this.canvas.height];
            this.objects.forEach(object => {
                object.setBounds(this.bounds);
            });
            this.boundsActive = activate;
            if (this.physics) {
                var topBoundObj = this.Bodies.rectangle(this.bounds[0] / 2, -10, this.bounds[0], 10, { isStatic: true, friction: 0 });
                var bottomBoundObj = this.Bodies.rectangle(this.bounds[0] / 2, this.bounds[1] + 10, this.bounds[0], 10, { isStatic: true, friction: 0 });
                var leftBoundObj = this.Bodies.rectangle(-10, this.bounds[1] / 2, 10, this.bounds[1], { isStatic: true, friction: 0 });
                var rightBoundObj = this.Bodies.rectangle(this.bounds[0] + 10, this.bounds[1] / 2, 10, this.bounds[1], { isStatic: true, friction: 0 });
                this.Composite.add(this.engine.world, [topBoundObj, bottomBoundObj, leftBoundObj, rightBoundObj]);
            }
        }

        /**
         * Disables the boundaries of the scene
         */
        disableBounds(): void {
            this.boundsActive = false;
            this.objects.forEach(object => {
                object.disableBounds();
            })
        }
        /**
         * Enables the boundaries of the scene
         */
        activateBounds(): void {
            this.boundsActive = true;
            this.objects.forEach(object => {
                object.activateBounds();
            })
        }

        /**
         * Adds the specified GameObject to the scene
         * 
         * @param object GameObject to add to the scene
         */
        addObject(object: GameObject): void {
            object.scene = this.id;
            object.physicsEnabled = (this.physics) ? object.physicsEnabled : false;
            if (object.physicsEnabled && this.physics) {
                if (!object.square) {
                    var vertexSet = object.polify().map(point => {
                        return { x: point[0], y: point[1] }
                    })
                    var objectBody = this.Bodies.fromVertices(object.coordinates[0], object.coordinates[1], vertexSet, object.physicsOptions);
                    object.body = objectBody;
                } else {
                    var objectBody = this.Bodies.rectangle(object.coordinates[0], object.coordinates[1], object.getWidth(), object.getHeight(), object.physicsOptions);
                    object.body = objectBody
                }
                this.Composite.add(this.engine.world, [object.body]);
            }
            this.objects.push(object);
        }

        /**
         * Clears the canvas that the scene is being drawn on
         */
        clear(): void {
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        }

        /**
         * Draws all of the objects, lights, and directional lights in the scene.
         * Also updates each physics object and checks for collisions.
         * It also recalculates the FPS if enabled.
         */
        draw(): void {
            if (!this.readyToDraw) return;
            this.update();
            if (this.clearScene) this.clear();
            this.ctx.fillStyle = "white";
            this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
            if (this.physics) {
                var physicsNow = performance.now();
                var pElapsedTime = physicsNow - this.lastPhysicsUpdate;
                Matter.Engine.update(this.engine, pElapsedTime);
                this.lastPhysicsUpdate = physicsNow;
                this.objects.forEach(object => {
                    if (object.physicsEnabled) {
                        object.updatePhysics();
                    }
                })
            }
            if (this.cameraBind) {
                this.cameraTo(this.cameraBind);
            }
            this.objects.forEach(object => {
                object.draw({ ctx: this.ctx, camera: this.cameraAngle, canvas: this.canvas });
            });
            this.collisionMonitors = this.collisionMonitors.map((monitor) => {
                var [o1, o2, f, f2, active] = monitor;
                if (o1.checkCollision(o2)) {
                    if (!active) {
                        active = true;
                        f();
                    }
                } else {
                    if (active) {
                        active = false
                        f2();
                    }
                }
                return [o1, o2, f, f2, active];
            });
            if (this.lighting) {
                this.diffuseLights(this.ambient, this.fog)
            }
            var t1 = performance.now();
            var elapsedTime = t1 - this.lastFrameStamp;
            this.lastFrameStamp = t1;

            if (this.fpsMonitoringEnabled) {
                this.fpsBuffer.push(elapsedTime);

                if (this.fpsBuffer.length > this.FPS_BUFFER_SIZE) {
                    this.fpsBuffer.shift();
                }
                this.ctx.font = "20px Ariel";
                this.ctx.fillStyle = "black";
                this.ctx.fillText("FPS: " + calculateFPS(this.fpsBuffer), 5, 20);
            }
        }

        /**
         * Removes a GameObject from the scene
         * @param object GameObject to remove from the scene
         */
        removeObject(object: GameObject): void {
            this.objects.filter(compare => {
                return !(compare.id == object.id);
            })
        }

        /**
         * Enables collisions between the specified objects
         * Adds a CollisionMonitor to the scene
         * 
         * @param o1 First object to check for collisions
         * @param o2 Second object to check for collisions
         * @param fo Function that runs when the objects collide (called once)
         * @param ff Function that runs when the objects separate (called once)
         */
        enableCollisionsBetween(o1: GameObject, o2: GameObject, fo: Function, ff: Function) {
            this.collisionMonitors.push([o1, o2, fo, ff, false]);
            this.collisionMonitors.push([o2, o1, fo, ff, false]);
        }

        /**
         * Binds the scene's camera to a GameObject
         * 
         * @param object GameObject to bind the scene's camera to
         */
        bindCamera(object: GameObject): void {
            this.cameraBind = object
        }

        /**
         * Unbinds the scene's camera from a GameObject
         */
        unbindCamera(): void {
            this.cameraBind = null;
        }

        /**
         * Moves the camera to a GameObject
         * @param object GameObject to move the camera to
         */
        cameraTo(object: GameObject) {
            var sumOfX = 0;
            var sumOfY = 0;
            object.polify().forEach(point => {
                sumOfX += point[0];
                sumOfY += point[1];
            })
            var a1 = sumOfX / object.polify().length;
            var a2 = sumOfY / object.polify().length;
            var middleOfObject = [a1, a2]
            var middleOfCanvas = [this.width / 2, this.height / 2];
            this.cameraAngle = [middleOfObject[0] - middleOfCanvas[0], middleOfObject[1] - middleOfCanvas[1]];
        }

        /**
         * Moves the scene's camera
         * 
         * @param vector Vector to move the scene's camera by
         */
        moveCamera(vector: Vec2) {
            this.cameraAngle = <Vec2>sumArrays(this.cameraAngle, vector);
        }

        /**
         * Enables FPS monitoring
         */
        enableFPS() {
            this.fpsMonitoringEnabled = true;
        }

        /**
         * Disables FPS monitoring
         */
        disableFPS() {
            this.fpsMonitoringEnabled = false;
        }
    }


    /**
     * @class SceneManager
     * @classdesc SceneManager class, used for managing scenes and to transition between scenes
     * @property {Object} scenes - Scenes in the scene manager
     * @property {string} activeScene - ID of the active scene
     * @property {number} width - Width of the canvas (Will resize the canvas to this width). By default is the width of the canvas element
     * @property {number} height - Height of the canvas (Will resize the canvas to this height). By default is the width of the canvas element
     * @property {HTMLCanvasElement} canvas - Canvas element to draw the scenes on
     * @property {CanvasRenderingContext2D} ctx - Canvas rendering context of the canvas
     * @property {string} sceneAnimation - Animation to use when transitioning between scenes
     * @property {number} animationStartTime - Time when the animation started
     * @property {number} animationRunTime - How long the animation should run for
     * @property {Scene} animateTo - Scene to animate to
     * @property {Array<string>} animationNames - Names of the animations that can be used
     * @property {boolean} animationRunning - Whether or not the animation is running
     * @property {boolean} fromScenePrevHadLights - Whether or not the scene that the animation is coming from had lighting enabled
     * @property {boolean} toScenePrevHadLights - Whether or not the scene that the animation is going to had lighting enabled
     * @example
     * ```js
     * const sceneManager = new SceneManager({
     *      initialScene: scene,
     *      canvas: document.getElementById("canvas")
     * });
     * ```
     * @example
     * ```js
     * // Example animation between two scene
     * const sceneManger = new SceneManager({
     *      initialScene: scene,
     *      canvas: document.getElementById("canvas")
     * });
     * sceneManager.addScene(scene2);
     * sceneManager.animate("quickFade", scene2, 1000);
     * ```
     */
    class SceneManager {
        scenes: { [key: string]: Scene };
        activeScene: string;
        width: number;
        height: number;
        canvas: HTMLCanvasElement;
        ctx: CanvasRenderingContext2D;
        sceneAnimation!: string;
        animationStartTime!: number;
        animationRunTime!: number;
        animateTo!: Scene;
        animationNames: Array<string>;
        fromScenePrevHadLights!: boolean;
        toScenePrevHadLights!: boolean;
        animationRunning: boolean;

        /**
         * 
         * @param options SceneManagerOptions object passed to initialize the scene manager
         */
        constructor(options: SceneManagerOptions) {
            var initialScene = options.initialScene;
            if (!initialScene) throw new Error("Initial scene not provided");
            this.scenes = {};
            this.scenes[initialScene.id] = initialScene;
            this.activeScene = initialScene.id;

            this.width = options.width || 500;
            this.height = options.height || 500;
            this.canvas = options.canvas;
            this.ctx = <CanvasRenderingContext2D>this.canvas.getContext("2d", { willReadFrequently: true });
            this.canvas.width = this.width;
            this.canvas.height = this.height;


            this.scenes[initialScene.id].width = this.width;
            this.scenes[initialScene.id].height = this.height;
            this.scenes[initialScene.id].canvas = this.canvas;
            this.scenes[initialScene.id].ctx = this.ctx;
            this.scenes[initialScene.id].ready();
            this.draw();

            this.animationNames = ["quickFade", "slowFade", "slideLeft", "crossFade"];
            this.animationRunning = false;

            initialScene.isActiveScene = true;
        }

        /**
         * Changes the active scene, with no transition
         * @param scene Scene to change to
         */
        changeScene(scene: Scene): void {
            this.scenes[this.activeScene].isActiveScene = false;
            this.scenes[scene.id] = scene;
            this.scenes[scene.id].isActiveScene = true;
            this.activeScene = scene.id;
        }

        /**
         * Adds a sceen to the scene manager
         * @param scene Scene to add to the scene manager
         */
        addScene(scene: Scene): void {
            var arg1 = scene;
            this.scenes[arg1.id] = arg1;
            arg1.width = this.width;
            arg1.height = this.height;
            arg1.canvas = this.canvas;
            arg1.ctx = this.ctx;
            arg1.ready()
        }

        /**
         * Smoothly animates between scenes (unless lighting is enabled, in which case lighting is temporarily disabled as the animation is running)
         * @param transition Name of the transition to use
         * @param scene Scene to transition to
         * @param duration Time (in ms) to run the transition for
         */
        animate(transition: string, scene: Scene, duration: number = 1000): void {
            if (!this.animationNames.includes(transition)) throw new Error("Invalid transition type");
            this.sceneAnimation = transition;
            this.animationStartTime = performance.now();
            this.animationRunTime = duration;
            this.animateTo = scene;

            if (transition.startsWith('slide')) {
                this.fromScenePrevHadLights = this.scenes[this.activeScene].lighting;
                this.toScenePrevHadLights = this.scenes[this.animateTo.id].lighting;
            }
        }

        /**
         * Draws the active scene onto the canvas, also runs animations if they are running
         */
        draw(): void {
            // check if animations are running
            if (this.animationRunning && this.sceneAnimation && this.animationStartTime + this.animationRunTime > performance.now()) {
                if (this.sceneAnimation.startsWith('slide')) {
                    this.scenes[this.activeScene].lighting = false;
                    this.scenes[this.animateTo.id].lighting = false;
                }
                switch (this.sceneAnimation) {
                    case "quickFade":
                        var timeElapsed = performance.now() - this.animationStartTime;
                        var progress = timeElapsed / (this.animationRunTime);
                        var opacity = progress;

                        if (progress < 1) {
                            this.ctx.globalAlpha = 1 - opacity;
                            this.scenes[this.activeScene].draw();
                        }
                        break;
                    case "slowFade":
                        this.ctx.fillStyle = "black";
                        this.ctx.fillRect(0, 0, this.width, this.height)
                        var timeElapsed = performance.now() - this.animationStartTime;
                        var progress = timeElapsed / (this.animationRunTime / 2);
                        if (progress < 1) {
                            this.ctx.globalAlpha = 1 - progress;
                            this.scenes[this.activeScene].draw();
                        } else {
                            this.ctx.globalAlpha = progress - 1;
                            this.scenes[this.animateTo.id].draw();
                        }
                        break;
                    case "slideLeft":
                        var timeElapsed = performance.now() - this.animationStartTime;
                        var progress = timeElapsed / this.animationRunTime;
                        var translateX = this.width * progress;

                        this.ctx.save();
                        this.ctx.translate(-translateX, 0);
                        this.scenes[this.activeScene].draw();
                        this.ctx.restore();

                        this.ctx.save();
                        this.ctx.translate(this.width - translateX, 0);
                        this.scenes[this.animateTo.id].draw();
                        this.ctx.restore();
                        break;

                    case "crossFade":
                        var timeElapsed = performance.now() - this.animationStartTime;
                        var progress = timeElapsed / this.animationRunTime;
                        var opacity = progress;

                        this.ctx.globalAlpha = 1 - opacity;
                        this.scenes[this.activeScene].draw();

                        this.ctx.globalAlpha = opacity;
                        this.scenes[this.animateTo.id].draw();
                        break;
                    default:
                        this.animateTo.draw();
                        break;
                }
            } else {
                if (this.animationRunning) {
                    if (this.sceneAnimation.startsWith('slide')) {
                        this.scenes[this.activeScene].lighting = this.fromScenePrevHadLights;
                        this.scenes[this.animateTo.id].lighting = this.toScenePrevHadLights;
                    }
                    this.scenes[this.activeScene].isActiveScene = false;
                    this.activeScene = this.animateTo.id;
                    this.animateTo.isActiveScene = true;
                    this.animationRunning = false;
                    this.sceneAnimation = '';
                    this.animationRunTime = 0;
                    this.animationStartTime = 0;
                    this.ctx.globalAlpha = 1;

                }
                this.scenes[this.activeScene].draw();
            }
            window.requestAnimationFrame(() => {
                this.draw();
            })
        }
    }

    /**
     * @class Input
     * @classdesc Input class, used for handling input
     * @property {boolean} active - Whether or not the input is active
     * @property {string} key - Key that the input is bound to
     * @property {number} fireRate - Fire rate of the input
     * @property {string} id - Unique ID of the input
     * @property {any} fireInterval - Interval that the input fires on
     * @property {boolean} firing - Whether or not the input is firing
     * @property {boolean} clickMonitor - Whether or not the input is a click monitor
     * @property {EventOnFunction} on - Function to run when the input is fired (EventOnFunction)
     * @example
     * ```js
     * const input = new Input("w", 100);
     * input.on = (event) => {
     *      console.log("w pressed");
     * }
     * input.activate(scene);
     * ```
     */
    class Input {
        active: boolean;
        key: string;
        fireRate: number;
        id: string;
        fireInterval: any;
        firing: boolean;
        clickMonitor: boolean;
        on!: Function;

        /**
         * 
         * @param key The key that the input is bound to ("click" is you want to monitor clicks)
         * @param fireRate How often the input fires (in ms)
         */
        constructor(key: string, fireRate: number) {
            if (key == "click") {
                this.clickMonitor = true;
            } else {
                this.clickMonitor = false;
            }
            this.key = key;
            this.fireRate = fireRate
            this.id = uid();
            this.fireInterval;
            this.firing = false;
            this.active = false;
        }

        /**
         * Starts firing the on function ever fireRate ms
         * @param e Event to pass to the on function
         */
        startFiring(e: Event) {
            if (!this.firing) {
                this.firing = true;
                this.on();
                this.fireInterval = setInterval(() => {
                    if (this.firing) {
                        this.on(e);
                    }
                }, this.fireRate)
            }
        }

        /**
         * Stops firing the on function
         */
        stopFiring() {
            if (this.firing) {
                this.firing = false;
                clearInterval(this.fireInterval);
            }
        }
        /**
         * Activates the input monitor
         * @param scene Scene to activate the input on (Only matters if the input is a click monitor)
         */
        activate(scene: Scene) {
            this.active = true;
            if (this.clickMonitor) {

                document.addEventListener("mousedown", (event) => {
                    if (!scene.isActiveScene) return;
                    let rect = scene.canvas.getBoundingClientRect();
                    let x = event.clientX - rect.left;
                    let y = event.clientY - rect.top;
                    scene.objects.forEach(object => {
                        var r = <Point>sumArrays([x, y], scene.cameraAngle);
                        if (checkCollision(object.polify(), [r])) {
                            this.on(object);
                            document.addEventListener("mouseup", (event) => {
                                object.returnState();
                            })
                        }
                    })
                })
            } else {
                document.addEventListener("keydown", (e) => {
                    if (this.active) {
                        if (e.key == this.key) {
                            this.startFiring(e);
                        }
                    }
                })
                document.addEventListener("keyup", (e) => {
                    if (this.active) {
                        if (e.key == this.key) {
                            this.stopFiring();
                        }
                    }
                })
            }
        }
        /**
         * Reactivates the input monitor (if it was deactivated- do not use input.active(scene) as this will cause the on function to be called twice every fireRate ms)
         */
        reactivate() {
            this.active = true;
        }

        /**
         * Temporarily deactivates the input monitor
         */
        deactivate() {
            this.active = false;
            this.stopFiring();
        }
    }



    interface MultiPlayerServerOptions {
        port: number;
        httpServer: any;
        onNewConnection: Function;
        onDisconnect: Function;
    }
    interface Connection {
        socket: any;
        id: string;
        label: string;
    }
    class MultiPlayerServer {
        socketConnections: Array<Connection>;
        onNewConnection: Function;
        onDisconnect: Function;
        constructor(multiPlayerServerOptions: MultiPlayerServerOptions){
            const socketio = require("socket.io");
            const io = socketio(multiPlayerServerOptions.httpServer);
            this.socketConnections = [];
            this.onNewConnection = multiPlayerServerOptions.onNewConnection;
            this.onDisconnect = multiPlayerServerOptions.onDisconnect;

            io.on("connection", (socket: any) => {
                this.addSocketConnection(socket);
            });
        }

        addSocketConnection(socket: any){
            var label = this.onNewConnection(socket) || uid();


            this.socketConnections.push({
                socket,
                id: socket.id,
                label
            });

            socket.on("disconnect", () => {
                this.socketConnections = this.socketConnections.filter(s => {
                    this.onDisconnect(s.socket);
                    return s.id != socket.id;
                });
            })
        }
        broadcastData(data: any){
            this.socketConnections.forEach(socket => {
                socket.socket.emit("data", data);
            })
        }
        broadcastEvent(event: string, data: any){
            this.socketConnections.forEach(socket => {
                socket.socket.emit(event, data);
            })
        }
        emitData(socket: any, data: any){
            switch (typeof socket) {
                case "string":
                    this.socketConnections.forEach(s => {
                        if (s.label == socket) {
                            s.socket.emit("data", data);
                        }
                    })
                    break;
                case "object":
                    if(socket.label){
                        socket.socket.emit("data", data);
                    }else{
                        socket.emit("data", data);
                    }
                    break;
                default:
                    socket.emit("data", data);
                    break;
                }
        }
        emitEvent(socket: any, event: string, data: any){
            switch (typeof socket) {
                case "string":
                    this.socketConnections.forEach(s => {
                        if (s.label == socket) {
                            s.socket.emit(event, data);
                        }
                    })
                    break;
                case "object":
                    if(socket.label){
                        socket.socket.emit(event, data);
                    }else{
                        socket.emit(event, data);
                    }
                    break;
                default:
                    socket.emit(event, data);
                    break;
                }
        }

    }
    var ANVIL = {
        GameObject,
        Polygon,
        Sprite,

        Light,
        DirectionalLight,

        Scene,
        SceneManager,

        Input
    };
//     return ANVIL;
// })();