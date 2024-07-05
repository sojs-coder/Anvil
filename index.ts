
// 
const Matter = require("matter-js");
const { createCanvas } = require("canvas")
const GPU = require("gpu.js");
// Options interfaces


/**
 * @interface TextOptions
 * @property {string} text - The text to render
 * @property {Point} coordinates - The coordinates of the text
 * @property {string} font - The font of the text, eg: "Arial", "Times New Roman", etc.
 * @property {number} fontSize - The font size of the text, in pixels
 * @property {string} color - The color of the text, in hex or rgb format
 * @property {string} type - The type of the object, "text"
 */
interface TextOptions extends GameObjectOptions {
    text: string;
    coordinates: Point;
    font: string;
    color: string;
    fontSize: number;
}
/**
 * Used for configuring properties of a SoundEmitter game object
 * 
 * @interface SoundEmitterOptions
 * @extends {SoundOptions}
 * @property {(distance: number) => number} [fallOffFunction] - A function that takes the distance from the listener and returns the volume of the sound. Default is a linear fall off function
 * @property {number} [maxDistance=1000] - The maximum distance the sound can be heard from (if outside this range, the volume of the sound will be 0)
 * @property {number} [minDistance=0] - The minimum distance the sound can be heard from (if inside this range, the volume of the sound will be 1)
 * @property {boolean} [startPlaying=true] - Set to false to prevent the sound from playing when the scene starts (default is true)
 * @property {GameObject} listener - The game object that will listen to the sound- eg: the player. Distance from the source is calculated from this object
 */
interface SoundEmitterOptions extends SoundOptions {
    fallOffFunction?: (distance: number) => number;
    maxDistance?: number;
    minDistance?: number;
    startPlaying?: boolean;
    listener: GameObject;
}
/**
 * For configuring Sounds in a scene
 * 
 * @interface SoundOptions
 * @property {string} source - The source of the sound (eg: "sound.mp3")
 * @property {number} [volume=1] - The volume of the sound, default is 1
 * @property {boolean} [loop=false] - Set to true to loop the sound, default is false
 * @property {number} [playbackRate=1] - The playback rate of the sound, default is 1
 */
interface SoundOptions {
    source: string;
    volume?: number;
    loop?: boolean;
    playbackRate?: number;
}

/**
 * For configuring the properties of a Layer in a scene
 * 
 * @interface LayerOptions
 * @property {boolean} [physics=false] - Set to true to enable physics, default is false
 * @property {any} physicsOptions - Options passed to matter.js engine
 * @property {Array<GameObject>} objects - Array of GameObjects in the layer
 * @property {Array<number>} bounds - Set the bounds of the layer, by default bounds are not enabled
 * @property {boolean} [boundsActive=false] - Set to true to enable bounds, default is false
 * @property {Vec2} [parallax=[1,1]] - Set the parallax of the layer, by default parallax is [1, 1]
 */
interface LayerOptions {
    physics?: boolean;
    physicsOptions?: any;
    objects?: Array<GameObject>;
    boundsActive?: boolean;
    bounds?: Array<number>;
    parallax?: Vec2;
}


/**
 * Returned from amplifyMedia
 * 
 * @interface AmplifiedMedia
 * @property {AudioContext} context - An instance of AudioContext which was used to change the media’s volume.
 * @property {MediaElementAudioSourceNode} source - A media source created from the AudioContext instance and the mediaElem. This may be useful if you desire to do more with the web audio API regarding this media. NOTE: Only one source node can be created from an element.
 * @property {GainNode} gain - A media gain created from the AudioContext instance and the mediaElem. This may be useful if you desire to do more with the web audio API regarding this media.
 * @property {HTMLMediaElement} media - A reference to the mediaElem passed into the function.
 * @property {Function} getAmpLevel - A function which returns the multiplier (amplification level).
 * @property {Function} amplify - A function which takes a multiplier (amplification level) and sets the media’s volume to that level.
 */
interface AmplifiedMedia {
    context: AudioContext;
    source: MediaElementAudioSourceNode;
    gain: GainNode;
    media: HTMLMediaElement;
    amplify: (multiplier: number) => void;
    getAmpLevel: () => number;
}
/**
 * Stack of data to be emitted when the socket is ready
 * 
 * @interface ReadyStackEmitItem
 * @property {string} type - The type item "on" or "emit"
 * @property {Array<any>} args - The arguments to pass to the stack. For "on" it is [event, callback], for "emit" it is [event, data]
 */
interface NotReadyStackEmitItem {
    type: string;
    args: Array<any>;
}
interface CollisionMonitorOptions {
    crossLayers?: boolean;
}
/**
 * Options to configure PlayerClient
 * 
 * @interface PlayerClientOptions
 * @property {HTMLCanvasElement} canvas - The canvas to render to
 * @property {number} [width=canvas.width] - Width of canvas (this will overwrite the canvas width)
 * @property {number} [height=canvas.height] - Height of canvas (this will overwrite the canvas height)
 * @property {Function} modifyLocalObject - Function to modify the local GameObject (the player, eg. change label, color, etc.)
 * @property {SceneOptions} [sceneOptions={}] - Options for the scene
 * @example
 * ```js
 * const options: PlayerClientOptions = {
 *      canvas: document.getElementById("canvas"),
 *      width: 500,
 *      height: 500,
 *      modifyLocalObject: (gameObject) => {
 *          gameObject.label = "You";
 *          gameObject.backgroundColor = "red";
 *      }
 * }
 * 
 * const playerClient = new PlayerClient(options);
 * ```
 */
interface PlayerClientOptions {
    canvas: HTMLCanvasElement;
    width?: number;
    height?: number;
    modifyLocalObject: (gameObject: GameObject) => void;
    sceneOptions?: SceneOptions;
}


/**
 * For configuring basic properties of a GameObject
 * 
 * @interface GameObjectOptions
 * @property {boolean} [physicsEnabled=false] - Set to true to enable physics, default is false
 * @property {PhysicsOptions} [physicsOptions={}] - Options passed to matter.js engine
 * @property {string} [id] - A unique id for the GameObject, generated automatically by default
 * @property {Vec2} [bounds] - Set the bounds of the GameObject, by default bounds are not enabled
 * @property {boolean} [boundsActive=false] - Set to true to enable bounds, default is false
 * @property {boolean} [square=false] - Set to true to make the GameObject a square, default is false
 * @property {Vec2} [hitbox] - Set the hitbox of the GameObject, by default hitbox is not enabled
 * @property {Array<Point>} [points] - Set the points of the GameObject, by default points are not enabled
 * @property {Vec2} [coordinates] - Set the coordinates of the GameObject, by default coordinates are [0, 0]
 * @property {string} [type] - Set the type of the GameObject, by defualt is "gameObject", "polygon", or "sprite"
 * @property {boolean} [convex=false] - Set to true to make the GameObject convex, default is false
 * @property {string} [backgroundColor="white"] - CSS color, background color of the GameObject (only applies to polygons)
 * @property {any} [_state] - Internal state of the GameObject, do not modify, but you can pass an initial state to the GameObject (use "_state": { ...gameObject, ...newProperties})
 * @property {GameObjectOptions} [gameObjectOptions={}] - Options for the GameObject (applied to clones when cloned using GameObject.From())
 * @property {any} [meta] - Any meta data you want to store in the GameObject (Do not overwrite "label", "player", or "id" if you are using a MultiPlayerSceneManager)
 * @property {Array<GameObject>} [blocks] - Array of GameObjects that are blocked by this GameObject
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
    id?: string;
    bounds?: Vec2;
    boundsActive?: boolean;
    square?: boolean;
    hitbox?: Vec2;
    points?: Array<Point>;
    coordinates?: Vec2;
    type?: string;
    convex?: boolean;
    backgroundColor?: string;
    _state?: any;
    gameObjectOptions?: GameObjectOptions;
    meta?: any;
    blocks?: Array<GameObject>;
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
 * @property {boolean} [start=true] - Whether or not to start drawing the scene when the SceneManager is created
 * @property {boolean} [autoDraw=true] - Start drawing over and over automatically if start is true or if the draw method was called.
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
    height: number; // Height of canvas (this will overwrite the canvas height),
    start?: boolean; // Whether or not to start drawing the scene when the SceneManager is created. True by default
    autoDraw?: boolean;
}


/**
 * For configuring properties of a MultiPlayerSceneManager
 * 
 * @interface MultiPlayerSceneManagerOptions
 * @property {HTMLCanvasElement} [canvas] - Synthetic canvas to render to, if not provided a canvas will be created
 * @property {number} [width=canvas.width] - Width of canvas (this will overwrite the canvas width on the client)
 * @property {number} [height=canvas.height] - Height of canvas (this will overwrite the canvas height on the client)
 * @property {Scene} initialScene - The scene to start with
 * @property {boolean} [showPlayerLabels=true] - Whether or not to show player labels
 */
interface MultiPlayerSceneManagerOptions {
    canvas?: HTMLCanvasElement;
    width?: number;
    height?: number;
    initialScene: Scene;
    showPlayerLabels?: boolean;
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
 * @property {boolean} [physics=false] - Set to true to enable physics (Uses matter.js under the hood), default is false. If true and no layers are specified, a default layer will be created with physics enabled. Othewise, physics is handled by each individual layer.
 * @property {WorldPhysicsOptions} [physicsOptions={}] - Options passed to matter.js engine
 * @property {Function} [update] - Function to run on every tick, default is an empty function
 * @property {boolean} [clear=true] - Set to false to disable clearing the canvas on every tick, default is true
 * @property {Vec2} [bounds] - Set the bounds of the scene, by default bounds are not enabled
 * @property {number} [FPS_BUFFER_SIZE=60] - Size of the buffer used to calculate FPS, default is 60
 * @property {GameObject} [bindCameraTo] - Bind the camera to a GameObject, by default camera is static
 * @property {Array<Layer>} [layers] - Layers in the scene. Will be rendered in the order they are in the array
 * @property {string} [backgroundColor="white"] - Background color of the scene
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
    layers?: Array<Layer>; // layers in the scene
    backgroundColor?: string; // background color of the scene
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

/**
 * Options to configure the MultiPlayerInputHandler (on the server)
 * 
 * @interface MultiPlayerInputHandlerOptions
 * @property {Array<ServerInputHandler>} monitors - Array of ServerInputHandlers to monitor
 */
interface MultiPlayerInputHandlerOptions {
    monitors: Array<ServerInputHandler>;
}

/**
 * Options to configure a ServerInputHandler
 * 
 * @interface ServerInputHandlerOptions
 * @property {string} key - Key to listen for
 * @property {number} fireRate - How often to fire the event (in milliseconds)
 * @property {Function} on - Function to run when the event is fired
 */
interface ServerInputHandlerOptions {
    key: string;
    fireRate: number;
    on: (socket: any, playerObject: GameObject) => void;
}

/**
 * Options to configure a Player
 * 
 * @interface PlayerOptions
 * @property {string} id - ID of the player
 * @property {string} label - Label of the player
 * @property {any} socket - Socket.io socket of the player
 * @property {GameObject} playerGameObject - Player GameObject. (Optional, an empty object will be created if none is provided)
 * @property {boolean} showLabel - Whether to show the label of the player (default is false)
 */
interface PlayerOptions {
    id: string;
    label: string;
    socket: any;
    playerGameObject?: GameObject;
    showLabel?: boolean;
}

/**
 * Options to configure a MultiPlayerServer
 * 
 * @interface MultiPlayerServerOptions
 * @property {number} port - Port to run the server on
 * @property {any} httpServer - HTTP server to run the server on
 * @property {Function} onNewConnection - Function to run when a new connection is made. Should return a label to assign to the connection. If no lable is returned, one is automatically generated
 * @property {Function} onDisconnect - Function to run when a connection is lost
 * @property {MultiPlayerSceneManager} sceneManager - MultiPlayerSceneManager to use
 * @property {number} [tickSpeed=1000 / 60] - How often to update the scene (in milliseconds)
 * @property {Function} [serverLive] - Function to run when the server is live
 * @property {GameObject} newPlayerObject - GameObject to use for new players
 * @property {MultiPlayerInputHandler} [inputHandler] - MultiPlayerInputHandler to use
 * @property {(socket: any, id: string, data: object) => [GameObject, string] | Promise<[GameObject, string]>} onNewPlayer - Function to run when a new player joins
 */
interface MultiPlayerServerOptions {
    port: number;
    httpServer: any;
    onNewConnection: (socket: any) => string;
    onDisconnect: Function;
    sceneManager: MultiPlayerSceneManager;
    tickSpeed?: number;
    serverLive?: Function;
    newPlayerObject: GameObjectBuilder;
    inputHandler?: MultiPlayerInputHandler;
    onNewPlayer: (socket: any, id: string, data: object) => [GameObject, string] | Promise<[GameObject, string]>;
}

/**
 * A connection to a client
 * 
 * @interface Connection
 * @property {any} socket - Socket.io socket of the connection
 * @property {string} id - ID of the connection (matches ID of the player)
 * @property {string} label - Label of the connection
 */
interface Connection {
    socket: any;
    id: string;
    label: string;
}

/**
 * Options passed to create a new player. Used by the MultiPlayerSceneManager
 * 
 * @interface NewPlayerOptions
 * @property {GameObject | Sprite | Polygon} class - The class of the game object to create
 * @property {GameObjectOptions | SpriteOptions | PolygonOptions} options - Options to pass to the game object
 */
interface GameObjectBuilder {
    class: any;
    options: GameObjectOptions | SpriteOptions | PolygonOptions;
}

// Bounds defining the boundaries of a physics body
/**
 * Bounds defining the boundaries of a physics body
 * 
 * @type Bounds
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



/**
 * Used to amplify the sound of a media element
 * https://cwestblog.com/2017/08/17/html5-getting-more-volume-from-the-web-audio-api/
 * 
 * @param mediaElem Media element to apply gain on
 * @param multiplier % to amplify sound
 * @returns All relevant data for the amplified media
 */
function amplifyMedia(mediaElem: HTMLMediaElement, multiplier: number): AmplifiedMedia {
    var context = new (window.AudioContext),
        result = {
            context: context,
            source: context.createMediaElementSource(mediaElem),
            gain: context.createGain(),
            media: mediaElem,
            amplify: function (multiplier: number) { result.gain.gain.value = multiplier; },
            getAmpLevel: function () { return result.gain.gain.value; }
        };
    result.source.connect(result.gain);
    result.gain.connect(context.destination);
    result.amplify(multiplier);
    return result;
}
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
 * @property {GameObjectOptions} gameObjectOptions - Game object options of the game object (for serialization and recreation)
 * @property {any} meta - Meta data of the object
 * @property {boolean} isLocalPlayer - True if the object is the local player, false otherwise
 * @property {Array<GameObject>} blocks - List of objects that this object blocks
 * @property {Array<GameObject>} blockedBy - List of objects that block this object
 * @property {"coordinates" | "center"} pinRef - Reference point to pin the object to (only applies if the object is pinned)
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
    pinned: GameObject | null; // the game object whose coordinates this object is pinned to
    _state: { [key: string]: any }; // used for state() and returnState(), builds states that are returnable. Stacking two states is destructive.
    square: boolean; // True if the object is a square, false otherwise
    hitbox: Vec2; // Hitbox of the object, if the object is a square
    body: any; // reference to the physics body (matter.js). Empty if physics is not enabled
    points: Array<Vec2>; // points of the object (used for collision detection)
    coordinates: Vec2; // coordinates of the object, or the top left most point of the object 
    type: string; // Type of the object, either "gameObject", "sprite", or "polygon"
    convex: boolean; // true if the object is convex, false otherwise
    gameObjectOptions: GameObjectOptions; // options for the game object
    meta: any;
    isLocalPlayer: boolean;
    blocks: Array<GameObject>;
    blockedBy: Array<GameObject>;
    pinRef: "coordinates" | "center";
    [key: string]: any;

    /**
     * 
     * @param options GameObjectOptions to initialize the object with
     */
    constructor(options: GameObjectOptions = {}) {
        this.gameObjectOptions = options;
        this.physicsEnabled = options.physicsEnabled || false;
        this.physicsOptions = options.physicsOptions || {};
        if (this.physicsEnabled) {
            this.body = {}
        }
        this.id = options.id || uid();
        this.bounds = options.bounds || [0, 0];
        this.boundsActive = options.boundsActive || false;
        this.pinned = null;
        this._state = options._state || {};
        this.square = options.square || false; // assume the worst
        this.hitbox = options.hitbox || [0, 0];
        this.points = options.points || [];
        this.coordinates = options.coordinates || [0, 0];
        this.type = options.type || "gameObject";
        this.convex = options.convex || false; // assume the worst
        this.meta = options.meta || {};
        this.isLocalPlayer = false;
        this.blocks = options.blocks || [];
        this.blockedBy = [];
        this.pinRef = "coordinates";
        this.blocks.forEach((object: GameObject) => {
            object.blockedBy.push(this);
        })

    }
    static From(options: GameObjectOptions) {
        var object: GameObject | Sprite | Polygon;
        switch (options.type) {
            case "sprite":
                object = new Sprite(<SpriteOptions>options.gameObjectOptions);
                break;
            case "polygon":
                object = new Polygon(<PolygonOptions>options.gameObjectOptions);
                break;
            default:
                object = new GameObject(options.gameObjectOptions);
                break;
        }
        object.physicsEnabled = options.physicsEnabled || false;
        object.physicsOptions = options.physicsOptions || {};
        object.bounds = options.bounds || [0, 0];
        object.boundsActive = options.boundsActive || false;
        object._state = options._state;
        object.square = options.square || false;
        object.hitbox = options.hitbox || [0, 0];
        object.points = options.points || [[0, 0]];
        object.coordinates = options.coordinates || [0, 0];
        object.type = options.type || "gameObject";
        object.convex = options.convex || false;
        object.gameObjectOptions = options.gameObjectOptions || {};
        object.meta = options.meta || {};
        return object;
    }
    /**
     * Returns the object as a JSON object
     * @returns The object as a JSON object
     */
    serialize(): GameObjectOptions {
        return {
            // return all data that is crucial for recreating the object
            physicsEnabled: this.physicsEnabled,
            physicsOptions: this.physicsOptions,
            bounds: <Vec2>this.bounds,
            boundsActive: this.boundsActive,
            _state: this._state,
            square: this.square,
            hitbox: this.hitbox,
            points: this.points,
            coordinates: this.coordinates,
            type: this.type,
            convex: this.convex,
            gameObjectOptions: this.gameObjectOptions,
            meta: this.meta
        }
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
     * Removes the pinned object
     */
    unpin() {
        this.pinned = null;
    }
    /**
     * Modifies pin to a game object
     * 
     * @param object The game object to pin to
     * @param to The reference point to pin to (either "center" or "coordinates")
     */
    pin(object: GameObject, to: "center" | "coordinates") {
        this.pinned = object;
        this.pinRef = to;
    }

    /**
     * Returns the gameobject represented as an array of points.
     * @returns An array of points (eg: objects bounds). used for collision detection
     */
    polify(): Point[] {
        return [];
    }

    /**
     * Returns the gameobject represented as an array of points, with an offset applied.
     * 
     * @param offset The offset to apply to the object
     * @returns List of points that make up the object, with the offset applied
     */
    polifyWithOffset(offset: Vec2): Point[] {
        return [];
    }

    /**
     * Draws the object's label on top of the object
     * The label is the objects meta label (eg: object.meta.label = "...")
     * 
     * @param options The DrawOptions for the object
     */
    drawLabel(options: DrawOptions) {
        if (options.ctx) {
            options.ctx.font = "15px Arial";
            options.ctx.fillStyle = this.backgroundColor || "black";
            options.ctx.textAlign = "center";
            options.ctx.fillText((this.meta) ? this.meta.label || "" : "", getCentroid(this.polify())[0] - options.camera[0], getCentroid(this.polify())[1] - (this.getHeight() / 2) - 15 - options.camera[1]);
        }
    }
    /**
     * Draws the object on the provided drawing context, in accordance with the camera position. This is handled automatically with scene and scene managers
     * 
     * @param options The DrawOptions for the object
     */
    draw(options: DrawOptions) {
        if (this.meta && this.meta.showLabel) this.drawLabel(options);
    }


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
     * Moves an object that has physics enabled by a vector (no forces pr boundaries involved)
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
     * Top level move function (works with both physics enabled and disabled)... needs helper functions getWidth(), getHeight() to be defined. Recommended to re-write based on your use case (if extending)
     * @param vector Vector to move the object by
     * @param continueAfterPhysics If set to false, the object will not move if physics are not enabled. If true, the object will move if physics are not enabled. True by defualt
     * @returns Boolean, true if the move was successful, false if it was not (if it was out of bounds, it will not move)
     */
    move(vector: Vec2, continueAfterPhysics = true): Boolean {
        var newCoords = <Vec2>sumArrays(this.coordinates, vector);
        var newPoly = this.polifyWithOffset(vector);
        // check to see if the object is colliding with any objects in `blockedBy`
        for (var object of this.blockedBy) {
            if (object.checkPolygonalCollision(newPoly)) {
                return false;
            }
        }
        if (this.physicsEnabled) {
            Matter.Body.setVelocity(this.body, { x: vector[0] + this.body.velocity.x, y: vector[1] + this.body.velocity.y });
            return true;
        } else {
            if (!continueAfterPhysics) return false;
        }
        if (this.boundsActive) {
            if (newPoly.some((point: Point) => point[0] < 0 || point[0] > this.bounds[0] || point[1] < 0 || point[1] > this.bounds[1])) {
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

    /**
     * Checks for a collision with a polygon
     * 
     * @param polygon The polygon (lower case, not type Polygon) to check for a collision with
     * @returns Boolean, true of the object is colliding with the other object, false otherwise
     */
    checkPolygonalCollision(polygon: Array<Point>) {
        var p1 = this.polify();
        var p2 = polygon;
        var square = isSquare(p2);
        var convex = isConvex(p2);
        if ((this.square || this.convex) && (square || convex)) {
            return checkSquareCollision(p1, p2);
        } else {
            return checkCollision(p1, p2);
        }
    }

    /**
     * Does nothing
     */
    update() {
        if (this.pinned) {
            if (this.pinRef == "center") {
                var centroid = getCentroid(this.polify());
                var pinnedCentroid = getCentroid(this.pinned.polify());

                var vector: Vec2 = [pinnedCentroid[0] - centroid[0], pinnedCentroid[1] - centroid[1]];
                this.moveStatic(vector);
            } else {
                this.coordinates = this.pinned.coordinates;
            }
        }
    }

    initialize(scene: Scene) {
    }
    moveTo(point: Point) {
        this.coordinates = point;
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
        super.draw(options);
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
     * Returns a list of points that make up the polygon, with an offset applied.
     * 
     * @param offset The offset to apply to the polygon
     * @returns The vertices of the polygon, with the offset applied
     */
    polifyWithOffset(offset: Vec2): Vec2[] {
        var newPoints: Vec2[] = [];
        for (var point of this.points) {
            newPoints.push(<Vec2>sumArrays(point, offset));
        }
        return newPoints;
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
        if (!moved) return false;
        var newPoints: Point[] = [];
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

    /**
     * Moves the polygon to a point as apposed to moving it by a vector
     * 
     * @param point The point in space to move the polygon to
     * @returns True
     */
    moveTo(point: Point) {
        var newPoints: Point[] = [];

        for (var p of this.points) {
            newPoints.push(<Point>sumArrays(p, <Vec2>sumArrays(point, <Vec2>multArrays([-1, -1], this.coordinates))));
        }
        this.points = newPoints;
        this.coordinates = findTopLeftMostPoint(this.points);
        return true;
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
        // this.source.crossOrigin = "anonymous";
        this.source.src = this.image;
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
        if (!this.spriteLoaded) return;
        super.draw(options);
        var { ctx, camera } = options;
        if (!this.angle || this.angle == 0) {
            ctx.drawImage(this.source, this.coordinates[0] - camera[0], this.coordinates[1] - camera[1], this.width, this.height);
        } else {
            var c = getCentroid(this.polify());
            var [x, y] = [c[0] - camera[0], c[1] - camera[1]];
            var rotation = (this.body && this.body.angle) ? this.body.angle || this.angle || 0 : this.angle || 0;


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

    /**
     * Calculates the vertices of the sprite, with an offset applied
     * 
     * @param offset The offset to apply to the sprite
     * @returns The vertices of the sprite, with the offset applied
     */
    polifyWithOffset(offset: Vec2): Point[] {
        var points = this.polify();
        var newPoints: Point[] = [];
        for (var point of points) {
            newPoints.push(<Point>sumArrays(point, offset));
        }
        return newPoints;
    }
}

/**
 * @interface ParticleOptions
 * @property {number} spread - The spread of the particles (in radians)
 * @property {number} speed - The speed of the particles (in pixels per tick)
 * @property {number} life - The life of the particles (in milliseconds)
 * @property {number} spawnRate - The spawn rate of the particles (in milliseconds)
 * @property {number} angle - The angle of the particles (in radians)
 * @property {number} lifeVariability - The variability of the life of the particles (in milliseconds)
 * @example
 * ```js
 *  const particles = new Particles({
 *      url: "https://i.imgur.com/9Nc8fFp.png",
 *      coordinates: [0, 0],
 *      width: 100,
 *      height: 100,
 *      spread: Math.PI * 2,
 *      speed: 1,
 *      life: 500,
 *      angle: Math.PI / 2,
 *      lifeVariability: 0,
 *      spawnRate: 50
 *  });
 */
interface ParticleOptions extends SpriteOptions {
    spread?: number; // defualt Math.PI * 2
    speed?: number; // defualt 1
    life?: number; // defualt 500
    spawnRate?: number; // defualt 50
    angle?: number; // defualt 0
    lifeVariability?: number; // defualt 0
}
/**
 * @interface ParticleChildOptions
 * @property {number} angle - The angle of the particle (in radians)
 * @property {number} speed - The speed of the particle (in pixels per tick)
 * @property {number} life - The life of the particle (in milliseconds)
 */
interface ParticleChildOptions {
    angle: number;
    speed: number;
    life: number;
}
/**
 * @class Particle
 * @classdesc Particle class, renders a single particle
 * @property {number} speed - The speed of the particles (in pixels per tick)
 * @property {number} life - The life of the particles (in milliseconds)
 * @property {number} angle - The angle of the particles (in radians)
 * @property {number} spawnedAt - The time the particle was spawned
 */
class Particle extends Sprite {
    speed: number;
    life: number;
    angle: number;
    spawnedAt: number;

    constructor(options: SpriteOptions, childOpts: ParticleChildOptions) {
        super(options);
        this.type = "particle_child";
        this.speed = childOpts.speed;
        this.life = childOpts.life;
        this.angle = childOpts.angle;
        this.spawnedAt = performance.now();
    }

    update() {
        super.update();
        this.move([this.speed * Math.cos(this.angle), this.speed * Math.sin(this.angle)]);
    }
    draw(options: DrawOptions) {
        super.draw(options);
    }
}
/**
 * @class Particles
 * @classdesc Particles class, used for rendering particles
 * @property {number} spread - The spread of the particles (in radians)
 * @property {number} speed - The speed of the particles (in pixels per tick)
 * @property {number} life - The life of the particles (in milliseconds)
 * @property {Array<Particle>} children - The children of the particles (each particle object)
 * @property {number} lifeVariability - The variability of the life of the particles (in milliseconds)
 * @example
 * ```js
 *  const particles = new Particles({
 *      url: "https://i.imgur.com/9Nc8fFp.png",
 *      coordinates: [0, 0],
 *      width: 100,
 *      height: 100,
 *      spread: Math.PI * 2,
 *      speed: 1,
 *      life: 500,
 *      angle: Math.PI / 2,
 *      lifeVariability: 0,
 *      spawnRate: 50
 *  });
 */
class Particles extends Sprite {
    spread: number;
    speed: number;
    life: number;
    children: Array<Particle>;
    lifeVariability: number;
    constructor(options: ParticleOptions) {
        super(options);
        this.type = "particle";
        this.spread = options.spread || Math.PI * 2;
        this.speed = options.speed || 1;
        this.life = options.life || 500;
        this.children = [];
        this.spawnRate = options.spawnRate || 50;
        this.angle = options.angle || 0;
        this.lifeVariability = options.lifeVariability || 0;
        this.spawn();
    }
    /**
     * Spawns a number (n) of particles
     * 
     * @param n The number of particles to spawn
     */
    spawn(n = 1) {
        for (var i = 0; i < n; i++) {
            var angle = (Math.random() * this.spread - this.spread / 2) - (this.angle);
            var child = new Particle({
                url: this.image,
                coordinates: this.coordinates,
                width: this.width,
                height: this.height,
            }, {
                angle,
                speed: this.speed,
                life: this.life * (1 + Math.random() * this.lifeVariability - this.lifeVariability / 2)
            });
            this.children.push(child);
        }
        if (this.spawnRate >= 10) {
            setTimeout(() => {
                this.spawn();
            }, this.spawnRate);
        } else {
            setTimeout(() => {
                this.spawn(Math.floor(10 / this.spawnRate));
            })
        }
    }
    /**
     * Updates all of the particles
     */
    update() {
        super.update();
        this.children = this.children.filter((child: Particle) => {
            return performance.now() - child.spawnedAt < child.life;
        });


    }
    /**
     * Draws all of the particles
     * 
     * @param drawOptions The DrawOptions for the object
     */
    draw(drawOptions: DrawOptions) {
        this.children.forEach((child: Particle) => {
            child.update();
            child.draw(drawOptions)
        });
    }
}

/**
 * @class Text
 * @classdesc Text class, used for rendering text
 * @property {string} text - The text to render
 * @property {Point} coordinates - The coordinates of the text
 * @property {string} font - The font of the text, eg: "Arial", "Times New Roman", etc.
 * @property {number} fontSize - The font size of the text, in pixels
 * @property {string} color - The color of the text, in hex or rgb format
 * @property {string} type - The type of the object, "text"
 * @example
 * ```js
 *  const text = new Text({
 *      text: "Hello, World!",
 *      coordinates: [0, 0],
 *      font: "Arial",
 *      fontSize: 20,
 *      color: "black"
 *  });
 */
class Text extends GameObject {
    text: string;
    coordinates: Point;
    font: string;
    fontSize: number;
    color: string;
    type: string;
    ctx: CanvasRenderingContext2D | null;
    constructor(options: TextOptions) {
        super(options)
        this.text = options.text;
        this.coordinates = options.coordinates;
        this.font = options.font;
        this.fontSize = options.fontSize;
        this.color = options.color;
        this.ctx = null;
        this.type = "text";
    };

    /**
     * Draws the text onto the provided drawing context. This is handled automatically with scene and scene managers
     * 
     * @param options DrawOptions for the object
     */
    draw(options: DrawOptions): void {
        if (!options.ctx) return;
        this.ctx = options.ctx;
        this.ctx.font = `${this.fontSize}px ${this.font}`
        this.ctx.fillStyle = this.color;
        this.ctx.fillText(this.text, this.coordinates[0] - options.camera[0], this.coordinates[1] - options.camera[1]);
    }
    /**
     * Gets the width, as rendered, of the text
     * 
     * @param scene The scene that the text is in
     * @returns The width of the text, in pixels
     */
    getWidth(scene: Scene | null) {
        if (!scene && !this.ctx) return 0;
        if (scene) {
            if (!scene.readyToDraw) return 0;
            this.ctx = scene.ctx;
        }
        if (!this.ctx) return 0;
        this.ctx.font = `${this.fontSize}px ${this.font}`
        return this.ctx.measureText(this.text).width;
    }
    /**
     * Gets the height, as rendered, of the text
     * 
     * @param scene The scene that the text is in
     * @returns The height of the text, in pixels
     */
    getHeight(scene: Scene | null) {
        if (!scene && !this.ctx) return 0;
        if (scene) {
            if (!scene.readyToDraw) return 0;
            this.ctx = scene.ctx;
        }
        if (!this.ctx) return 0;
        this.ctx.font = `${this.fontSize}px ${this.font}`
        return this.ctx.measureText(this.text).actualBoundingBoxAscent;
    }
    /**
     * Gets a list of points representing the bounding box of the text
     * 
     * @returns A list of points representing the bounding box of the text
     */
    polify(): Vec2[] {
        return [
            [this.coordinates[0], this.coordinates[1]],
            [this.coordinates[0] + this.getWidth(null), this.coordinates[1]],
            [this.coordinates[0] + this.getWidth(null), this.coordinates[1] + this.getHeight(null)],
            [this.coordinates[0], this.coordinates[1] + this.getHeight(null)]
        ]
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
 * // light at position [0, 0], diffuse 100, strength 0.8, color [255, 255, 255] (white)
 * const light = new Light([0, 0], 100, 0.8, [255, 255, 255]);
 * ```
 * @example
 * // light at position [0, 0], diffuse 150, defualt strength (0.8), defualt color (white)
 * const light = new Light([0, 0], 150);
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
 * // light at position [0, 0], diffuse 150, strength 0.8, color [255, 255, 255] (white)
 * const light = new DirectionalLight([0, 0], 150, 0.8, [255, 255, 255]);
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
 * @class Layer
 * @classdesc Layer class, used for creating layers in the scene. Layers are independent of each other, and can have their own physics engines, objects, etc. Like multiple scenes within a single scene, drawn on top of each other.
 * @property {Array<GameObject>} objects - Objects in the layer
 * @property {boolean} physics - Whether or not the layer has physics enabled
 * @property {String} id - Unique ID of the layer
 * @property {any} Engine - Matter.js Engine
 * @property {any} Bodies - Matter.js Bodies
 * @property {any} Composite - Matter.js Composite
 * @property {any} engine - Matter.js engine instance
 * @property {boolean} boundsActive - Whether or not the bounds are active
 * @property {Array<number>} bounds - Bounds of the layer
 * @property {Vec2} parallax - How the layer processes camrea position. [1, 1] by default. [0, 0] would mean the layer is fixed to the camera, [1, 1] would mean the layer moves with the camera, [2, 2] would mean the layer moves at twice the speed of the camera, etc.
 * @property {number} lastPhysicsUpdate - Last time the physics were updated in the layer
 * 
 * @example
 * ```js
 *  const background = new Layer({
 *      parallax: [0.75, .75]
 *  });
 *  background.addObject(...);
 *  const foreground = new Layer();
 *  foreground.addObject(...);
 *  foreground.addObject(...);
 *  
 *  const scene = new Scene({
 *      layers: [background, foreground]
 *  });
 */
class Layer {
    objects: Array<GameObject>;
    physics: boolean;
    id: String;
    Engine: any;
    Bodies: any;
    Composite: any;
    engine: any;
    boundsActive: boolean;
    bounds: Array<number>;
    parallax: Vec2;
    lastPhysicsUpdate: number;

    constructor(options: LayerOptions) {
        this.objects = options.objects || [];
        this.physics = options.physics || false;
        this.boundsActive = options.boundsActive || false;
        this.bounds = options.bounds || [0, 0];
        this.id = uid();
        this.parallax = options.parallax || [1, 1];
        if (options.physics) {
            this.physics = true;
            this.Engine = Matter.Engine
            this.Bodies = Matter.Bodies
            this.Composite = Matter.Composite;
            this.engine = Matter.Engine.create(options.physicsOptions);
            this.lastPhysicsUpdate = performance.now();
        } else {
            this.physics = false;
            this.Engine = null;
            this.Bodies = null;
            this.Composite = null;
            this.engine = null;
            this.lastPhysicsUpdate = 0;
        }
    }
    /**
     * Adds an object to the layer
     * 
     * @param object The object to add to the layer
     * @param scene A reference to the parent scene
     */
    addObject(object: GameObject, scene: Scene): void {
        object.scene = scene.id;
        object.layerID = this.id;
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
        if (this.boundsActive) object.setBounds(this.bounds);
        object.initialize(scene);
        this.objects.push(object);
    }
    /**
     * Removes an object from the layer
     * 
     * @param object The object to remove from the layer
     */
    removeObject(object: GameObject) {
        this.objects = this.objects.filter(obj => obj.id != object.id);
    }

    /**
     * Draws the layer onto the provided drawing context. This is handled automatically with scene and scene managers
     * @param options The DrawOptions for the layer
     */
    draw(options: DrawOptions) {
        for (var object of this.objects) {
            object.update();
            var newCamera = [options.camera[0] * this.parallax[0], options.camera[1] * this.parallax[1]];
            object.draw({
                ctx: options.ctx,
                camera: newCamera as Vec2,
                canvas: options.canvas
            });
        }
    }

    /**
     * Sets the boundaries of a scene
     * @param rightBound How far to the right objects can go
     * @param bottomBound How far down objects can go
     * @param canvas The canvas that the layer is drawn on
     * @param activate Whether or not to activate the bounds. True by default. If the scene has physics enabled, the bounds will be activated no matter what.
     */
    setBoundaries(rightBound: number, bottomBound: number, canvas: HTMLCanvasElement, activate: boolean = true): void {
        this.bounds = [rightBound || canvas.width, bottomBound || canvas.height];
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
     * Disables the bounds of the layer
     */
    disableBounds(): void {
        this.boundsActive = false;
        this.objects.forEach(object => {
            object.disableBounds();
        })
    }
    /**
     * Activates the bounds of the layer
     */
    activateBounds(): void {
        this.boundsActive = true;
        this.objects.forEach(object => {
            object.activateBounds();
        })
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
 * @property {HTMLCanvasElement} canvas - Canvas of the scene
 * @property {CanvasRenderingContext2D} ctx - Canvas rendering context of the scene
 * @property {number} width - Width of the scene
 * @property {number} height - Height of the scene
 * @property {Vec2} bounds - Bounds of the scene
 * @property {boolean} boundsActive - Whether or not the bounds are active
 * @property {GameObject | null} cameraBind - Object to bind the camera to
 * @property {number} FPS_BUFFER_SIZE - Size of the fps buffer
 * @property {boolean} isActiveScene - Whether or not the scene is the active scene
 * @property {"full" | "plain"} drawMode - Draw mode of the scene. "full" is defualt and used when objects need to be updated as well. "plain" just draws objects (eg: when the scene is handled on the server)
 * @property {Array<number>} formattedLights - Formatted lights for the diffuse kernel
 * @property {Array<number>} formattedDLights - Formatted directional lights for the diffuse kernel
 * @property {boolean} lightsPreFormatted - Whether or not the lights are pre-formatted
 * @property {boolean} isClient - Whether or not the scene is running on the client
 * @property {Object} GPUSettings - GPU.js settings
 * @property {Array<Layer>} layers - Layers of the scene
 * @property {string} backgroundColor - Background color of the scene
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
 * @example
 * ```js
 * const scene = new Scene({
 *      layers: [background, middle, foreground]
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
    canvas!: HTMLCanvasElement;
    ctx!: CanvasRenderingContext2D;
    width!: number;
    height!: number;
    bounds: Vec2;
    boundsActive: boolean;
    cameraBind: GameObject | null;
    FPS_BUFFER_SIZE: number;
    isActiveScene: boolean;
    drawMode: "full" | "plain";
    formattedLights: Array<number>;
    formattedDLights: Array<number>;
    lightsPreFormatted: boolean;
    isClient: boolean;
    GPUSettings: Object;
    layers: Array<Layer>;
    backgroundColor: string;
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
        this.lighting = options.lighting || false;
        this.id = uid();
        this.update = options.update || function () { };
        this.lights = [];
        this.dlights = [];
        this.formattedLights = [];
        this.formattedDLights = [];
        this.lightsPreFormatted = false;
        this.clearScene = (options.clear == undefined) ? true : options.clear;
        this.bounds = options.bounds || [0, 0];
        this.boundsActive = (options.bounds) ? true : false;
        this.cameraBind = options.bindCameraTo || null;
        this.FPS_BUFFER_SIZE = options.FPS_BUFFER_SIZE || 60;
        this.isActiveScene = false;
        this.isClient = (typeof document == "undefined") ? false : true;
        this.GPUSettings = options.GPUsettings || {};
        this.layers = options.layers || [];
        if (this.layers.length == 0) {
            var layer1 = new Layer({
                physics: options.physics || false,
                physicsOptions: options.physicsOptions || {},
                objects: [],
                boundsActive: this.boundsActive,
                bounds: this.bounds,
                parallax: [1, 1]
            });
            this.layers.push(layer1);
            // layers are linear... first layer is layer 0, second is layer 1, etc.
        }
        if (this.boundsActive) {
            this.setBoundaries(this.bounds[0], this.bounds[1], this.boundsActive);
        }
        if (this.lighting) {
            this.fog = (options.lightOptions) ? options.lightOptions.fog || 1.3 : 1.3;
            this.ambient = (options.lightOptions) ? options.lightOptions.ambient || 0.2 : 0.2;
        } else {
            this.fog = 1.3;
            this.ambient = 0.2;
        }
        if (typeof GPU == "function" && this.lighting && this.isClient) {
            this.gpu = new GPU(this.GPUSettings);
        } else if (this.lighting && this.isClient) {
            this.gpu = new GPU.GPU(this.GPUSettings)
        }
        this.readyToDraw = false;
        this.drawMode = "full";
        this.backgroundColor = options.backgroundColor || "white";
    }

    /**
     * Initializes the scene, specifically the light rendering kernel
     */
    ready(): void {
        this.configureLightingKernel();
        this.readyToDraw = true;
    }

    /**
     * Configures the lighting kernel (if lighting is enabled and the scene is on the client side)
     */
    configureLightingKernel(): void {
        if (this.lighting && this.isClient) {
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
     * Updates the formattedLights array property
     * 
     * @param lights List of lights in the scene
     */
    formatLights(lights: Array<Light>, cameraAngle?: Vec2): number[] {
        if (!cameraAngle) cameraAngle = this.cameraAngle;
        var flights = lights.map(l => {
            return [l.point[0] - (cameraAngle as Vec2)[0], l.point[1] - (cameraAngle as Vec2)[1], l.strength, l.diffuse, l.color]
        });
        //this.formattedLights = flights.flat(2);
        return flights.flat(2);
    }

    /**
     * Formats the directional lights into a format that the diffuseKernel can understand
     * Updates the formattedDLights property
     * 
     * @param lights List of directional lights in the scene
     */
    formatDLights(lights: Array<DirectionalLight>, cameraAngle?: Vec2): number[] {
        if (!cameraAngle) cameraAngle = this.cameraAngle;
        var dlights = lights.map(l => {
            return [l.angle, l.point[0] - (cameraAngle as Vec2)[0], l.point[1] - (cameraAngle as Vec2)[1], l.strength, l.diffuse, l.spread, l.color];
        });
        //this.formattedDLights = dlights.flat(2);
        return dlights.flat(2);
    }

    /**
     * Configures the scene to draw on the provided canvas
     * 
     * @param canvas Canvas that the scene will draw on
     * @param ctx The canvas rendering context of the scene
     * @param width The width of the scene
     * @param height The height of the scene
     */
    setDrawingCapabilities(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D, width: number, height: number, drawMode = "full"): void {
        this.canvas = canvas;
        this.ctx = ctx;
        this.width = width;
        this.height = height;

        this.canvas.width = width;
        this.canvas.height = height;

        this.drawMode = <"full" | "plain">drawMode;

    }
    /** 
     * Renders lights onto the scene. Automatically calculates if lights are in the camera view and removes them from the render if they are not.
     * 
     * @param ambient The ambient lighting in the scene
     * @param fog The fog constant in the scene
     */
    diffuseLights(ambient: number = 0.2, fog: number = 1.3): void {
        var lights = Array.from(this.lights);
        var dlights = Array.from(this.dlights);
        if (!this.lightsPreFormatted) {
            this.lights.forEach(l => {
                l.update(this.canvas);
            });
            this.dlights.forEach(l => {
                l.update(this.canvas);
            });
        }
        if (this.lightsPreFormatted) {
            // generate lights from formatted lights
            var formattedLights = this.formattedLights;
            var formattedDLights = this.formattedDLights;
            var numLights = this.formattedLights.length / 7;
            var numDLights = this.formattedDLights.length / 9;
            var lightIndex = 0;
            var dlightIndex = 0;

            for (var i = 0; i < numLights; i++) {
                var light = new Light([formattedLights[lightIndex], formattedLights[lightIndex + 1]], formattedLights[lightIndex + 3], formattedLights[lightIndex + 2], [formattedLights[lightIndex + 4], formattedLights[lightIndex + 5], formattedLights[lightIndex + 6]]);
                lightIndex += 7;
                lights.push(light);
            }
            for (var i = 0; i < numDLights; i++) {
                var dlight = new DirectionalLight([formattedDLights[dlightIndex + 1], formattedDLights[dlightIndex + 2]], formattedDLights[dlightIndex], formattedDLights[dlightIndex + 5], formattedDLights[dlightIndex + 4], formattedDLights[dlightIndex + 3], [formattedDLights[dlightIndex + 6], formattedDLights[dlightIndex + 7], formattedDLights[dlightIndex + 8]]);
                dlightIndex += 9;
                dlights.push(dlight);
            }
        }
        lights = this.lights.filter((light) => {
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
        var flights = this.formatLights(<Array<Light>>lights, this.cameraAngle);
        var dflights = this.formatDLights(<Array<DirectionalLight>>dlights, this.cameraAngle);
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
        this.layers.forEach(layer => {
            layer.setBoundaries(rightBound, bottomBound, this.canvas, activate);
        })
    }

    /**
     * Disables the boundaries of the scene
     */
    disableBounds(): void {
        this.layers.forEach(layer => {
            layer.disableBounds();
        })
    }
    /**
     * Enables the boundaries of the scene
     */
    activateBounds(): void {
        this.layers.forEach(layer => {
            layer.activateBounds();
        })
    }

    /**
     * Used to quickly set up an object as the player. Binds the camera to the object and sets up WASD movement (the object will move `movementSpeed` pixels every 10ms)
     * (Only for sigle-player games)
     * @param object GameObject to configure as player
     * @param movementSpeed How quickly the player should move
     */
    treatAsPlayer(object: GameObject, movementSpeed: number = 2): void {
        var upInput = new Input("w", 10);
        var downInput = new Input("s", 10);
        var leftInput = new Input("a", 10);
        var rightInput = new Input("d", 10);
        upInput.on = () => {
            object.move([0, -movementSpeed]);
        }
        downInput.on = () => {
            object.move([0, movementSpeed]);
        }
        leftInput.on = () => {
            object.move([-movementSpeed, 0]);
        }
        rightInput.on = () => {
            object.move([movementSpeed, 0]);
        }
        upInput.activate();
        downInput.activate();
        leftInput.activate();
        rightInput.activate();

        this.bindCamera(object)
    }
    /**
     * Adds the specified GameObject to the scene
     * 
     * @param object GameObject to add to the scene
     */
    addObject(object: GameObject, layerID?: string): void {
        if (layerID) {
            var layer = this.layers.find(l => l.id == layerID);
            if (layer) {
                layer.addObject(object, this);
            }
        } else {
            this.layers[this.layers.length - 1].addObject(object, this);
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
     * Checks to see if the scene is configured to draw, if not, it configures it (eg: initializes lighting kernel, etc.)
     */
    check() {
        if (this.lighting && this.isClient && !this.gpu) {
            if (typeof GPU == "function" && this.lighting && this.isClient) {
                this.gpu = new GPU(this.GPUSettings || {});
            } else if (this.lighting && this.isClient) {
                this.gpu = new GPU.GPU(this.GPUSettings || {})
            }
        }
        if (this.lighting && this.isClient && !this.diffuseKernel) {
            this.configureLightingKernel();
        }
    }

    /**
     * Draws the scene without updating any of the objects
     */
    plainDraw(): void {
        this.check();
        if (!this.readyToDraw) return;
        this.ctx.fillStyle = this.backgroundColor || "white";
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        if (this.cameraBind) {
            this.cameraTo(this.cameraBind);
        }
        this.layers.forEach(layer => {
            layer.draw({ ctx: this.ctx, camera: this.cameraAngle, canvas: this.canvas });
        })
        if (this.lighting && this.isClient) {
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
            this.ctx.textAlign = "left"
            this.ctx.fillText("FPS: " + calculateFPS(this.fpsBuffer), 5, 20);
        }
    }

    /**
     * Updates all lights in the scene
     */
    updateLights() {
        this.lights.forEach(l => {
            l.update(this.canvas);
        })
        this.dlights.forEach(l => {
            l.update(this.canvas);
        })
    }
    /**
     * Draws all of the objects, lights, and directional lights in the scene.
     * Also updates each physics object and checks for collisions.
     * It also recalculates the FPS if enabled.
     */
    draw(): void {
        this.check();
        if (!this.readyToDraw) return;
        this.ctx.fillStyle = "black";
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        this.update();
        if (this.clearScene) this.clear();
        this.ctx.fillStyle = this.backgroundColor || "white";
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        if (this.cameraBind) {
            this.cameraTo(this.cameraBind);
        }
        for (const layer of this.layers) {
            if (layer.physics) {
                var physicsNow = performance.now();
                var pElapsedTime = physicsNow - layer.lastPhysicsUpdate;
                Matter.Engine.update(layer.engine, pElapsedTime);
                layer.lastPhysicsUpdate = physicsNow;
                layer.objects.forEach(object => {
                    if (object.physicsEnabled) {
                        object.updatePhysics();
                    }
                })
            }
            layer.draw({ ctx: this.ctx, camera: this.cameraAngle, canvas: this.canvas });
        }
        this.collisionMonitors.forEach((monitor) => {
            var [o1, o2, f, f2, active] = monitor;

            if (o1.checkCollision(o2) || o2.checkCollision(o1)) {
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
            monitor[4] = active;
        });
        if (this.lighting && this.isClient) {
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
     * Reloads scene objects from the passed list, used for multiplayer when objects are handled on the server
     * @param objects Objects to draw from
     */
    drawFromPassedObjects(objects: Array<GameObject>): void {
        this.objects = objects;
    }

    /**
     * Updates all of the objects, lights, physics, and collision monitors in the scene
     */
    updateAll(): void {
        this.check();
        if (!this.readyToDraw) return;
        this.update();
        if (this.cameraBind) {
            this.cameraTo(this.cameraBind);
        }
        for (const layer of this.layers) {
            if (layer.physics) {
                var physicsNow = performance.now();
                var pElapsedTime = physicsNow - layer.lastPhysicsUpdate;
                Matter.Engine.update(layer.engine, pElapsedTime);
                layer.lastPhysicsUpdate = physicsNow;
                layer.objects.forEach(object => {
                    if (object.physicsEnabled) {
                        object.updatePhysics();
                    }
                    object.update();
                })
            } else {
                layer.objects.forEach(object => {
                    object.update();
                })
            }
        }
        this.collisionMonitors.forEach((monitor) => {
            var [o1, o2, f, f2, active] = monitor;

            if (o1.checkCollision(o2) || o2.checkCollision(o1)) {
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
            monitor[4] = active;
        });
        this.updateLights();

    }

    /**
     * Removes a GameObject from the scene
     * @param object GameObject to remove from the scene
     */
    removeObject(object: GameObject): void {
        this.collisionMonitors = this.collisionMonitors.filter(monitor => {
            return monitor[0].id != object.id && monitor[1].id != object.id;
        })
        this.objects = this.objects.filter(compare => {
            return !(compare.id == object.id);
        });
        this.layers.forEach(layer => {
            if (layer.id == object.layerID) {
                layer.removeObject(object);
            }
        });

    }

    /**
     * Enables collisions between the specified objects
     * Adds a CollisionMonitor to the scene
     * 
     * @param o1 First object to check for collisions
     * @param o2 Second object to check for collisions
     * @param fo Function that runs when the objects collide (called once)
     * @param ff Function that runs when the objects separate (called once)
     * @param options Options for the collision monitor
     */
    enableCollisionsBetween(o1: GameObject, o2: GameObject, fo: Function, ff: Function, options?: CollisionMonitorOptions) {
        var objectsExist = true;
        if (!this.objects.includes(o1) || !this.objects.includes(o2)) {
            objectsExist = false;
        }
        if (!objectsExist) {
            throw new Error(`One or more of the objects passed to enableCollisionsBetween do not exist in scene ${this.id}'s object list.
Please make sure to add the objects to the scene before enabling collisions between them.`);
        }
        if (options && options.crossLayers) {
            this.collisionMonitors.push([o1, o2, fo, ff, false]);
        } else {
            if (o1.layerID == o2.layerID) {
                this.collisionMonitors.push([o1, o2, fo, ff, false]);
            }
        }
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
 * @property {boolean} start - Whether or not to start the scene manager when it is initialized (true by default)
 * @property {boolean} autoDraw - Should the scene manager start drawing the scene onto the canvas (true, default), or will this be handled by the user (false)
 * 
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
    start: boolean;
    autoDraw: boolean;

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
        this.start = (options.start == undefined) ? true : options.start;
        this.autoDraw = (options.autoDraw == undefined) ? true : options.autoDraw;
        this.scenes[initialScene.id].width = this.width;
        this.scenes[initialScene.id].height = this.height;
        this.scenes[initialScene.id].canvas = this.canvas;
        this.scenes[initialScene.id].ctx = this.ctx;
        this.scenes[initialScene.id].setDrawingCapabilities(this.canvas, this.ctx, this.width, this.height);
        this.scenes[initialScene.id].ready();
        if (this.start) {
            this.draw();
        }


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
        if(this.autoDraw){
            window.requestAnimationFrame(() => {
                this.draw();
            })
        }
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
     * @param activateOn Scene to activate the input on (Only matters if the input is a click monitor)
     */
    activate(activateOn?: Scene) {
        this.active = true;
        if (activateOn && this.clickMonitor && activateOn instanceof Scene) {

            document.addEventListener("mousedown", (event) => {
                if (!activateOn.isActiveScene) return;
                let rect = activateOn.canvas.getBoundingClientRect();
                let x = event.clientX - rect.left;
                let y = event.clientY - rect.top;
                var foundObjects: Array<GameObject> = []

                activateOn.objects.forEach(object => {
                    var r = <Point>sumArrays([x, y], activateOn.cameraAngle);
                    if (checkCollision(object.polify(), [r])) {
                        foundObjects.push(object);
                    }
                })
                if (foundObjects.length > 0) {
                    var topObject = foundObjects[0];
                    var layerIDs = activateOn.layers.map((layer: Layer) => layer.id);
                    foundObjects.forEach(object => {
                        if (layerIDs.indexOf(object.layerID) > layerIDs.indexOf(topObject.layerID)) {
                            topObject = object;
                        }
                    })
                    this.on({
                        gameObject: topObject,
                        realX: x,
                        realY: y,
                        x: x + activateOn.cameraAngle[0],
                        y: y + activateOn.cameraAngle[1]
                    });
                    document.addEventListener("mouseup", (event) => {
                        topObject.returnState();
                    })
                } else {
                    this.on({
                        gameObject: null,
                        realX: x,
                        realY: y,
                        x: x + activateOn.cameraAngle[0],
                        y: y + activateOn.cameraAngle[1]
                    });
                }
            });
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

/**
 * @class MultiPlayerClientInput
 * @classdesc MultiPlayerClientInput class, used for handling input on the client side of a multiplayer game
 * @property {boolean} down - Whether or key is currently down
 * @property {string} key - Key that the input is bound to
 * @property {boolean} sleeping - Whether or not the input is sleeping (waiting for the player to be ready)
 * @property {any} socket - Socket.io socket to emit events on
 * @static {Array<MultiPlayerClientInput>} activeInputs - Array of all active inputs
 * @example
 * ```js
 * const input = new MultiPlayerClientInput("w", playerClient); // passes all "w" key presses to the server
 * ```
 */
class MultiPlayerClientInput {
    static activeInputs: Array<MultiPlayerClientInput> = [];
    socket: any;
    down: boolean;
    key: string;
    sleeping: boolean;

    /**
     * 
     * @param key The key to listen to events on
     * @param playerClient The playerClient instance that the input is bound to
     */
    constructor(key: string, playerClient: PlayerClient) {
        this.key = key;
        this.down = false;
        if (playerClient.ready) {
            this.sleeping = false;
            this.activate(playerClient);
        } else {
            this.socket = null;
            this.sleeping = true;
            playerClient.inputStack.push(this)
        }
    }

    /**
     * Activates the input (called when playerClient is ready)
     * @param playerClient PlayerClient instance to activate the input on
     */
    activate(playerClient: PlayerClient) {
        this.socket = playerClient.socket;
        document.addEventListener("keydown", (e) => {
            if (e.key == this.key && !this.down) {
                this.down = true;
                this.socket.emit("__key_down__", this.key);
            }
        });
        document.addEventListener("keyup", (e) => {
            if (e.key == this.key && this.down) {
                this.down = false;
                this.socket.emit("__key_up__", this.key);
            }
        });
        MultiPlayerClientInput.activeInputs.push(this);
    }
}



/**
 * @class MultiplayerInputHandler
 * @classdesc MultiplayerInputHandler class, used for handling input on the server side of a multiplayer game
 * @property {Array<ServerInputHandler>} monitors - Array of ServerInputHandlers to monitor
 * @example
 * ```js
 * const inputHandler = new MultiPlayerInputHandler({
 *      monitors: [
 *          new ServerInputHandler({
 *          key: "w",
 *          fireRate: 10,
 *          on: (socket, playerObject) => {
 *              playerObject.move(0, -1);
 *          }
 *      }),
 *      new ServerInputHandler({
 *          key: "s",
 *          fireRate: 10,
 *          on: (socket, playerObject) => {
 *              playerObject.move(0, 1);
 *          }
 *      })
 *    ]
 * });
 * ```
 */
class MultiPlayerInputHandler {
    monitors: Array<ServerInputHandler>;

    constructor(options: MultiPlayerInputHandlerOptions) {
        this.monitors = options.monitors;
    }
}


/**
 * @class MultiPlayerServerInput
 * @classdesc MultiPlayerServerInput class, used for handling input on the server side of a multiplayer game
 * @property {string} key - Key that the input is bound to
 * @property {number} fireRate - Fire rate of the input
 * @property {string} id - Unique ID of the input
 * @property {[key: string]: NodeJS.Timeout} fireIntervals - Reference to all of the fire intervals
 * @property {[key: string]: boolean} firing - Whether or not the input is firing for each socket
 * @property {boolean} active - Whether or not the input is active
 * @property {MultiPlayerSceneManager} sceneManager - SceneManager instance that the input is bound to
 * @property {Function} on - Function to run when the input is fired (EventOnFunction)
 * @example
 * ```js
 * const input = new MultiPlayerServerInput({
 *      key: "w",
 *      fireRate: 10,
 *      on: (socket, playerObject) => {
 *      playerObject.move(0, -1);
 *      }
 * });
 * ```
 */
class ServerInputHandler {
    key: string;
    fireRate: number;
    on: (socket: any, playerObject: GameObject) => void;
    id: string;
    fireIntervals: any;
    firing: any;
    active: boolean;
    sceneManager: MultiPlayerSceneManager | null;

    /**
     * 
     * @param options ServerInputHandlerOptions object passed to initialize the ServerInputHandler
     */
    constructor(options: ServerInputHandlerOptions) {
        this.key = options.key;
        this.fireRate = options.fireRate || 10;

        this.id = uid();
        this.fireIntervals = {};
        this.firing = {};
        this.active = false;
        this.sceneManager = null;
        this.on = (socket: any, playerObject: GameObject) => {
            if (this.active) {
                options.on(socket, playerObject);
            }
        };
    }

    /**
     * Activates the input on the given sceneManager (MultiPlayerSceneManager instance)
     * @param sceneManager SceneManager instance to activate the input on
     */
    init(sceneManager: MultiPlayerSceneManager) {
        this.sceneManager = sceneManager;
        this.active = true;
    }

    /**
     * Activates the input on the given socket
     * @param socket Socket.io socket to activate the input on
     */
    activateOn(socket: any) {
        socket.on("__key_down__", (key: string) => {
            if (key == this.key) {
                this.startFiring(socket);
            }
        });
        socket.on("__key_up__", (key: string) => {
            if (key == this.key) {
                this.stopFiring(socket);
            }
        });
    }

    /**
     * Fires the input on a given socket every fireRate ms
     * @param socket Socket.io socket to start firing the input on
     */
    startFiring(socket: any) {
        if (!this.firing[socket.id]) {
            this.firing[socket.id] = true;
            // find the player object based on socket.id, scanning for matching ID in the scene manager
            var playerGameObject = this.sceneManager!.players.filter(player => {
                return player.id == socket.id;
            })[0].gameObject;
            this.on(socket, playerGameObject);
            this.fireIntervals[socket.id] = setInterval(() => {
                if (this.firing[socket.id]) {
                    this.on(socket, playerGameObject);
                }
            }, this.fireRate)
        }
    }

    /**
     * Stops firing the input to a given socket
     * @param socket Socket.io socket to stop firing the input on
     */
    stopFiring(socket: any) {
        if (this.firing[socket.id]) {
            this.firing[socket.id] = false;
            clearInterval(this.fireIntervals[socket.id]!);
        }
    }
}

/**
 * @class Player
 * @classdesc Player class, used for managing players in a multiplayer game. Handled automatically when using MultiPlayerServer
 * @property {string} id - ID of the player
 * @property {string} label - Label of the player
 * @property {any} socket - Socket.io socket of the player
 * @property {GameObject} gameObject - GameObject of the player
 * @property {string | null} inSceneID - ID of the scene that the player is in
 */
class Player {
    id: string;
    label: string;
    socket: any;
    gameObject: GameObject;
    inSceneID: string | null;

    /**
     * 
     * @param options PlayerOptions object passed to initialize the Player
     */
    constructor(options: PlayerOptions) {
        this.id = options.id;
        this.label = options.label;
        this.socket = options.socket;
        this.gameObject = options.playerGameObject || new GameObject();
        this.gameObject.meta = {
            player: true,
            id: this.id,
            label: this.label,
            showLabel: options.showLabel || false
        }
        this.inSceneID = null;

    }

    /**
     * Changes the scene that the player is in
     * @param scene Scene to enter
     */
    enterScene(scene: Scene) {
        scene.addObject(this.gameObject);
        this.inSceneID = scene.id;
    }

    /**
     * Emits the player's data to the client
     */
    emit() {
        this.socket.emit("__player_data__", this.gameObject);
    }
}

/**
 * @class MultiPlayerSceneManager
 * @classdesc MultiPlayerSceneManager class, used for managing scenes, players, and transitions between scenes in a multiplayer game
 * @property {Array<Player>} players - Array of players in the scene manager
 * @property {boolean} showPlayerLabels - Whether or not to show player labels
 * @example
 * ```js
 * const sceneManager = new MultiPlayerSceneManager({
 *      initialScene: scene,
 *      canvas: createCanvas(), // create a synthetic canvas... nothing will be rendered on it, it is just for SceneManager to use under the hood
 *      width: 500,
 *      height: 500,
 *      showPlayerLabels: true
 * });
 * ```
 */
class MultiPlayerSceneManager extends SceneManager {
    players: Array<Player>;
    showPlayerLabels: boolean;

    /**
     * 
     * @param options MultiPlayerSceneManagerOptions object passed to initialize the MultiPlayerSceneManager
     */
    constructor(options: MultiPlayerSceneManagerOptions) {
        super({
            ...options,
            canvas: createCanvas(options.width || 500, options.height || 500),
            width: options.width || 500,
            height: options.height || 500,
            start: false
        });
        this.players = [];
        this.showPlayerLabels = options.showPlayerLabels || false;
        this.draw();
    }

    /**
     * Adds a player into the scene manager
     * @param player Player to add to the scene manager
     */
    addPlayer(player: Player): void {
        player.gameObject.meta.showLabel = this.showPlayerLabels;
        this.players.push(player);
    }

    /**
     * Removes a player from the scene manager
     * @param player Player to remove from the scene manager
     */
    removePlayer(player: Player): void {
        this.players = this.players.filter(p => p.id != player.id);
    }

    /**
     * Retrieves a given player from the scene manager. Has O(n) time complexity, so not recommended to use often
     * @param id ID of the player to get
     * @returns The player with the given ID
     */
    getPlayer(id: string): Player {
        return this.players.filter(p => p.id == id)[0];
    }

    /**
     * Retrieves a given player from the scene manager. Has O(n) time complexity, so not recommended to use often
     * @param label Label of the player to get
     * @returns The first player with the given label
     */
    getPlayerByLabel(label: string): Player {
        return this.players.filter(p => p.label == label)[0];
    }

    /**
     * Gets all players that match a given label
     * @param label Label of the players to get
     * @returns Array of players with the given label (eg: if multiple players have the same label)
     */
    getPlayersByLabel(label: string): Array<Player> {
        return this.players.filter(p => p.label == label);
    }

    /**
     * Updates all scenes with players in them
     */
    draw() {

        // filter out the scenes with no players in them
        var scenesWithPlayers = Object.keys(this.scenes).filter(sceneID => {
            return this.players.filter(player => {
                return player.inSceneID == sceneID;
            }).length > 0;
        });
        // update the scenes with players in them
        scenesWithPlayers.forEach(sceneID => {
            this.scenes[sceneID].updateAll();
        });
    }
}



/**
 * @class MultiPlayerServer
 * @classdesc MultiPlayerServer class, used for constructing, running, and managing a multiplayer server
 * @property {Array<Connection>} socketConnections - Array of socket connections that the server is connected to
 * @property {Function} onNewConnection - Function to run when a new connection is made
 * @property {Function} onDisconnect - Function to run when a connection is disconnected
 * @property {any} io - Socket.io instance
 * @property {MultiPlayerSceneManager} sceneManager - SceneManager instance that the server is using
 * @property {number} tickSpeed - Speed (in ms) of the server tick (Default: 1000/60)
 * @property {GameObject} newPlayerObject - GameObject to use when a new player joins the server
 * @property {MultiPlayerInputHandler} inputHandler - InputHandler to use on the server
 * @property {Function} onNewPlayer - Function to run when a new player joins the server. Should return a GameObject and a label for the player, or a promise that will resolve into a GameObject and a label for the player. If no function is provided, the GameObject will be a clone of newPlayerObject
 * 
 * @example
 * ```js
 * const multiplayerSever = new MultiPlayerServer({
 *
 *  // server config
 *  httpServer: server, // const server = http.createServer(=);
 *  showPlayerLabels: true,
 *  port: 3000,
 *  // game config
 *  newPlayerObject: {
 *      class: Polygon,
 *      options: {
 *          points: [[0,0],[100,0],[100,100],[0,100]],
 *          backgroundColor: "red",
 *      }
 *  },
 *  sceneManager: new MultiPlayerSceneManager({
 *      initialScene: new Scene({
 *          lighting: true,
 *          lightOptions: {
 *              ambient: 0.2
 *          }
 *      }),
 *      showPlayerLabels: true
 *  }),
 *
 *   // events
 *  onNewConnection: () => {
 *      console.log('new connection');
 *  },
 *  onDisconnect: () => {
 *      console.log('disconnected');
 *  }, 
 *  onNewPlayer: (socket, id, data) => {
 *      console.log("new player", id, data);
 *      gameObject = new Polygon({
 *          points: [[0,0],[100,0],[100,100],[0,100]],
 *          backgroundColor: "red",
 *      });
 *      return new Promise((resolve, reject) => {
 *          socket.on("send_username", (username) => {
 *              console.log("got username", username)
 *              resolve([gameObject, username])
 *          });
 *      })
 *  },
 *
 *  // input
 *  inputHandler: new MultiPlayerInputHandler({
 *      monitors: [
 *          new ServerInputHandler({
 *              key: "w",
 *              on: (socket, playerGameObject) => {
 *                  playerGameObject.move([0, -10])
 *              }
 *          }),
 *          new ServerInputHandler({
 *              key: "a",
 *              on: (socket, playerGameObject) => {
 *                  playerGameObject.move([-10,0])
 *              }
 *          }),
 *          new ServerInputHandler({
 *              key: "s",
 *              on: (socket, playerGameObject) => {
 *                  playerGameObject.move([0, 10])
 *              }
 *          }),
 *          new ServerInputHandler({
 *              key: "d",
 *              on: (socket, playerGameObject) => {
 *                  playerGameObject.move([10,0])
 *              }
 *          })
 *
 *      ]
 *  })
 *});
 */
class MultiPlayerServer {
    socketConnections: Array<Connection>;
    onNewConnection: Function;
    onDisconnect: Function;
    io: any;
    sceneManager: MultiPlayerSceneManager;
    tickSpeed: number;
    newPlayerObject: GameObjectBuilder;
    inputHandler: MultiPlayerInputHandler;
    onNewPlayer: (socket: any, id: string, data: object) => [GameObject, string] | Promise<[GameObject, string]>;

    /**
     * 
     * @param multiPlayerServerOptions MultiPlayerServerOptions object passed to initialize the MultiPlayerServer
     */
    constructor(multiPlayerServerOptions: MultiPlayerServerOptions) {
        const socketio = require("socket.io");
        const io = socketio(multiPlayerServerOptions.httpServer);
        this.socketConnections = [];
        this.onNewConnection = multiPlayerServerOptions.onNewConnection;
        this.onDisconnect = multiPlayerServerOptions.onDisconnect;

        io.on("connection", (socket: any) => {
            this.addSocketConnection(socket);
        });
        this.io = io;
        this.sceneManager = multiPlayerServerOptions.sceneManager;
        this.tickSpeed = multiPlayerServerOptions.tickSpeed || 1000 / 60;
        this.newPlayerObject = multiPlayerServerOptions.newPlayerObject || {
            class: GameObject,
            options: {}
        };

        this.onNewPlayer = multiPlayerServerOptions.onNewPlayer || ((socket: any, id: string) => {
            return [new this.newPlayerObject.class(this.newPlayerObject.options), id];
        });
        this.inputHandler = multiPlayerServerOptions.inputHandler || new MultiPlayerInputHandler({
            monitors: []
        });
        this.inputHandler.monitors.forEach(monitor => {
            monitor.init(this.sceneManager);
        });
        multiPlayerServerOptions.httpServer.listen(multiPlayerServerOptions.port, () => {
            this.tick();
            (multiPlayerServerOptions.serverLive) ? multiPlayerServerOptions.serverLive() : (() => { })();
        });
    }

    /**
     * Ticks the server 1 tick (called automatically ever tickSpeed ms)
     */
    tick() {
        this.sceneManager.players.forEach(player => {
            player.emit();
        });
        this.sceneManager.draw();
        this.socketConnections.forEach(connection => {
            var player = this.sceneManager.getPlayer(connection.id);
            if (!player) return;
            var scene = this.sceneManager.scenes[player.inSceneID!];
            var objects = scene.objects;
            this.emitData(connection, {
                objects: objects.map(object => {
                    return object.serialize()
                }),
                lights: scene.formatLights(scene.lights, [0, 0]),
                dlights: scene.formatDLights(scene.dlights, [0, 0]),
                ambient: scene.ambient,
                fog: scene.fog,
                lighting: scene.lighting
            });
        });
        setTimeout(() => {
            this.tick();

        }, this.tickSpeed)
    }

    /**
     * Adds a connection and fires onNewConnection event
     * @param socket Socket.io socket to add to the server
     */
    addSocketConnection(socket: any) {
        var label = this.onNewConnection(socket) || uid();
        this.socketConnections.push({
            socket,
            id: socket.id,
            label
        });
        socket.on("__player_initialized__", async (data: any) => {
            var res = this.onNewPlayer(socket, socket.id, data);
            if (res instanceof Promise) {
                res = await res;
                var playerObject = res[0];
                var label = res[1];
                var player = new Player({
                    id: socket.id,
                    label,
                    socket,
                    playerGameObject: playerObject
                });
                this.sceneManager.addPlayer(player);
                player.enterScene(this.sceneManager.scenes[this.sceneManager.activeScene]);
            } else if (res instanceof Array) {
                var playerObject = res[0];
                var label = res[1];
                var player = new Player({
                    id: socket.id,
                    label,
                    socket,
                    playerGameObject: playerObject
                });
                this.sceneManager.addPlayer(player);
                player.enterScene(this.sceneManager.scenes[this.sceneManager.activeScene]);
            }

            this.inputHandler.monitors.forEach(monitor => {
                monitor.activateOn(socket);
            })
        })
        socket.on("disconnect", () => {
            this.socketConnections = this.socketConnections.filter(s => {
                return s.id != socket.id;
            });
            this.onDisconnect(socket);
        });

    }

    /**
     * Broadcasts data to all connected sockets
     * @param data Data to broadcast
     */
    broadcastData(data: any) {
        this.io.emit("data", data);
    }

    /**
     * Broadcasts an event to all connected sockets. "__key_down__", "__key_up__", "__player_data__", and "__player_initialized__" are reserved events.
     * @param event Event to broadcast to all connected sockets
     * @param data Data to broadcast to all connected sockets
     */
    broadcastEvent(event: string, data: any) {
        this.io.emit(event, data);
    }

    /**
     * Emits data to a given socket
     * @param socket Either socket.io socket, label of a connection, or a connection to emit data to
     * @param data The data to emit
     */
    emitData(socket: any, data: any) {
        switch (typeof socket) {
            case "string":
                this.socketConnections.forEach(s => {
                    if (s.label == socket) {
                        s.socket.emit("data", data);
                    }
                })
                break;
            case "object":
                if (socket.label) {
                    socket.socket.emit("data", data);
                } else {
                    socket.emit("data", data);
                }
                break;
            default:
                socket.emit("data", data);
                break;
        }
    }
    /**
     * Emits an event to a given socket. "__key_down__", "__key_up__", "__player_data__", and "__player_initialized__" are reserved events.
     * @param socket Either socket.io socket, label of a connection, or a connection to emit an event to
     * @param event Event to fire
     * @param data Data to emit
     */
    emitEvent(socket: any, event: string, data: any) {
        switch (typeof socket) {
            case "string":
                this.socketConnections.forEach(s => {
                    if (s.label == socket) {
                        s.socket.emit(event, data);
                    }
                })
                break;
            case "object":
                if (socket.label) {
                    socket.socket.emit(event, data);
                } else {
                    socket.emit(event, data);
                }
                break;
            default:
                socket.emit(event, data);
                break;
        }
    }

    /**
     * Listens for an event on the server
     * @param event Event to listen for
     * @param callback Callback function to call when the event is fired
     */
    on(event: string, callback: Function) {
        this.io.on(event, callback);
    }
}

/**
 * @class PlayerClient
 * @classdesc PlayerClient class, used for constructing, running, and managing a multiplayer client
 * @property {any} socket - Socket.io socket of the client
 * @property {any} io - Socket.io instance (used to generate socket)
 * @property {boolean} ready - Whether or not the client is ready
 * @property {Array<NotReadyStackEmitItem>} emitStack - Stack data to emitwhen the client is ready
 * @property {Array<MultiPlayerClientInput>} inputStack - Stack of inputs to activate when the client is ready
 * @property {HTMLCanvasElement} canvas - Canvas to draw the scene on
 * @property {CanvasRenderingContext2D} ctx - CanvasRenderingContext2D of the canvas
 * @property {number} width - Width of the scene
 * @property {number} height - Height of the scene
 * @property {Scene} scene - A Scene reference used to render the objects and lights sent by the server
 * @property {Array<GameObject>} objects - Array of GameObjects in the scene
 * @property {Function} modifyLocalObject - Function to modify the local player's GameObject
 * @property {GameObject | null} localPlayer - Local player's GameObject
 * @example
 * ```js
 * const playerClient = new ANVIL.PlayerClient({
 *   canvas: document.getElementById('canvas'),
 *   modifyLocalObject: function (obj) {
 *      obj.backgroundColor = "blue";
 *      this.scene.bindCamera(obj)
 *  },
 *  sceneOptions: {
 *      fpsMonitoringEnabled: true
 *  }
 * });
 * ```
 */
class PlayerClient {
    socket: any;
    io: any;
    ready: boolean;
    emitStack: Array<NotReadyStackEmitItem>;
    inputStack: Array<MultiPlayerClientInput>;
    canvas: HTMLCanvasElement;
    ctx: CanvasRenderingContext2D;
    width: number;
    height: number;
    scene: Scene;
    objects: Array<GameObject>;
    localPlayer: GameObject | null;
    modifyLocalObject: (gameObject: GameObject) => void;
    [key: string]: any;

    constructor(options: PlayerClientOptions) {
        this.io = null;
        const script = document.createElement("script");
        script.src = "/socket.io/socket.io.js";
        document.head.appendChild(script);
        script.addEventListener("load", () => {
            this.init((window as any).io!);
        });
        this.ready = false;
        this.emitStack = [];
        this.canvas = options.canvas;
        this.ctx = <CanvasRenderingContext2D>this.canvas.getContext("2d", { willReadFrequently: true });
        this.scene = new Scene(options.sceneOptions || {});
        this.objects = [];
        this.width = options.width || 500;
        this.height = options.height || 500;
        this.inputStack = [];
        this.localPlayer = null;
        this.modifyLocalObject = options.modifyLocalObject || ((gameObject: GameObject) => {
            gameObject.backgroundColor = "blue";
            this.scene.bindCamera(gameObject);
        })
        this.modifyLocalObject.bind(this);
    }

    /**
     * Initializes the client after socket.io is loaded, empties the emitStack and inputStack, and sets the client to ready
     * @param io Socket.io instance
     */
    init(io: any) {
        this.io = io;
        this.socket = this.io();
        this.socket.emit("__player_initialized__", {
            timestamp: new Date().getTime(),
            cookies: document.cookie
        });
        (window as any).ANVIL.multiplayer = {
            socket: this.socket,
            playerClient: this
        }
        this.on("data", (data: any) => {
            this.update(data);
        });
        this.on("__player_data__", (data: any) => {
            this.updatePlayer(data);
        });
        this.scene.setDrawingCapabilities(this.canvas, this.ctx, this.width, this.height, "plain");
        this.scene.ready();
        this.setReady();
    }
    /**
     * Updates the client's local player
     * @param data Sets the local player
     */
    updatePlayer(data: any): void {
        if (this.localPlayer) return;
        var player = this.objects.filter(object => {
            return object.meta.player && object.meta.id == data.meta.id;
        })[0];
        if (!player) return;
        player.isLocalPlayer = true;
        this.localPlayer = player;
    }
    /**
     * Listens for an event, fires the given callback when the event is fired.
     * 
     * @param event Event to listen to
     * @param callback Callback to run when the event is fired
     */
    on(event: string, callback: Function): void {
        if (!this.ready) {
            this.emitStack.push({
                type: "on",
                args: [event, callback]
            });
            return;
        }
        this.socket.on(event, callback);
    }
    /**
     * Emits an event to the server
     * 
     * @param event Event to emit. "__key_down__", "__key_up__", "__player_data__", and "__player_initialized__" are reserved events.
     * @param data Data to send to the server
     */
    emit(event: string, data: any): void {
        if (!this.ready) {
            this.emitStack.push({
                type: "emit",
                args: [event, data]
            });
            return;
        }
        this.socket.emit(event, data);
    }

    /**
     * Emits data to the server
     * @param data Data to send to the server
     */
    emitData(data: any): void {
        if (!this.ready) {
            this.emitStack.push({
                type: "emitData",
                args: [data]
            });
            return;
        }
        this.socket.emit("data", data);
    }

    /**
     * Empties the emitStack and inputStack, and sets the client to ready, starts the render loop
     */
    setReady() {
        this.ready = true;

        this.emitStack.forEach((item) => {
            this[item.type](...item.args);
        });
        this.inputStack.forEach(input => {
            input.activate(this);
        })

        this.on("data", (data: any) => {
            this.update(data);
        });

        this.draw();
    }

    /**
     * Updates the scene with data from the server
     * 
     * @param data Data to update the client with (Updates lights, objects, fog, ambient lighting, and directional lights)
     */
    update(data: any) {
        this.objects = data.objects.map((object: any) => {
            var obj = GameObject.From(object);
            return obj;
        });

        this.scene.objects = this.objects;
        this.scene.layers[this.scene.layers.length - 1].objects = this.objects;
        this.scene.formattedLights = data.lights;
        this.scene.formattedDLights = data.dlights;
        this.scene.fog = data.fog;
        this.scene.ambient = data.ambient;
        this.scene.lightsPreFormatted = true;
        this.scene.lighting = data.lighting;
    }

    /**
     * Draws the scene on the canvas
     */
    draw() {
        this.objects.forEach(object => {
            if (this.localPlayer && object.meta.id == this.socket.id && this.localPlayer.meta.id == this.socket.id && this.localPlayer.meta.id == object.meta.id) {
                this.modifyLocalObject(object);
            }
        });
        this.scene.plainDraw();
        window.requestAnimationFrame(() => {
            this.draw();
        })
    }
}

/**
 * @class Sound
 * @classdesc Sound class, used for playing sounds in a scene
 * @property {HTMLAudioElement} sound A reference to the HTMLAudioElement that actually plays the sound
 * @property {number} volume The volume that the sound plays at. Value 0-1 where 0 is muted and 1 is full volume. In order to get more volume from the sound, do `amplifyMedia(mySound.sound,x)` where X is the volume multiplier
 * @property {boolean} loop True if the audio loops, false otherwise
 * @property {number} playbackRate The rate of playback of the audio
 * @property {boolean} ready Boolean if the audio is ready to play
 * @property {boolean} wantsToPlay Boolean, true if the `play()` method was called before `ready` became true
 * @property {Array<HTMLAudioElement>} audios List of all audio elements that are playing the sound
 * @property {boolean} playing True if the sound is currently playing on the base source. False otherwise
 */
class Sound {
    sound: HTMLAudioElement;
    volume: number;
    loop: boolean;
    playbackRate: number;
    ready: boolean;
    wantsToPlay: boolean;
    audios: Array<HTMLAudioElement>;
    playing: boolean;
    constructor(options: SoundOptions) {
        this.sound = new Audio(options.source);
        this.sound.setAttribute("data-uid", "ANVIL_SOUND_INSTANCE_" + uid());
        this.volume = options.volume || 1;
        this.loop = options.loop || false;
        this.playbackRate = options.playbackRate || 1;

        this.audios = [];
        this.wantsToPlay = false;
        this.ready = false;
        this.playing = false;
        this.sound.addEventListener("canplaythrough", () => {
            this.ready = true;
            if (this.wantsToPlay) this.play()
        });
        this.sound.addEventListener("ended", () => {
            this.playing = false;
        });
    }
    play(): boolean {
        if (!this.ready) {
            this.wantsToPlay = true;
            return false
        }
        if (!this.playing) {
            this.sound.volume = this.volume;
            this.sound.loop = this.loop;
            this.sound.playbackRate = this.playbackRate;
            this.sound.play();
            this.playing = true;
        } else {
            var audio = new Audio(this.sound.src);
            audio.volume = this.volume;
            audio.setAttribute("data-uid", "ANVIL_SOUND_INSTANCE_" + uid());
            audio.loop = this.loop;
            audio.playbackRate = this.playbackRate;
            audio.play();
            this.audios.push(audio);
            audio.addEventListener("ended", () => {
                this.audios = this.audios.filter(a => a.getAttribute("data-uid") != audio.getAttribute("data-uid"));
            });
        }
        return true;
    }
    setVolume(volume: number) {
        this.volume = volume;
        this.sound.volume = volume;
    }
    stop() {
        this.playing = false;
        this.sound.pause();
    }
}

/**
 * @class SoundEmitterPolygon
 * @classdesc SoundEmitterPolygon class, used for emitting sounds from a polygon. This treats the polygon as a sort of speaker
 * @property {Sound} sound The Sound instance that the SoundEmitterPolygon plays
 * @property {GameObject} listener The GameObject that "listens" to the sound. Sound volume will be determined by distance to this game object
 * @property {number} maxDistance The maximum distance that the sound can be heard from (if the listener is farther than this, the sound will not be heard)
 * @property {number} minDistance The minimum distance that the sound can be heard from (if the listener is closer than this, the sound will be heard at full volume)
 * @property {Function} fallOffFunction The function that determines the fall off of the sound. Takes in a distance and returns a volume (0-1). By default, the fall off is linear.
 * @example
 * ```js
 *  const soundEmitter = new ANVIL.SoundEmitterPolygon({
 *      points: [[0,0],[100,0],[100,100],[0,100]],
 *      backgroundColor: "red",
 *      }, {
 *          listener: playerObject,
 *          source: "path/to/sound.mp3",
 *          loop: true,
 *          volume: 1,
 *          maxDistance: 1000,
 *          minDistance: 0,
 *          fallOffFunction: (distance) => {
 *              var falloffstart = this.maxDistance - this.minDistance;
 *              var dist = distance - this.minDistance;
 *              var vol = 1 - (dist / falloffstart);
 *              if (vol < 0) vol = 0;
 *              return vol;
 *          } 
 *      }
 *  });
 * ```
 */
class SoundEmitterPolygon extends Polygon {
    sound: Sound;
    listener: GameObject
    constructor(options: PolygonOptions, soundOptions: SoundEmitterOptions) {
        super(options);
        soundOptions.loop = (soundOptions.loop == undefined) ? true : soundOptions.loop;
        this.sound = new Sound(soundOptions);
        this.listener = soundOptions.listener;

        this.maxDistance = soundOptions.maxDistance || 1000;
        this.minDistance = soundOptions.minDistance || 0;
        this.fallOffFunction = soundOptions.fallOffFunction || ((distance: number) => {
            var falloffstart = this.maxDistance - this.minDistance;
            var dist = distance - this.minDistance;
            var vol = 1 - (dist / falloffstart);
            if (vol < 0) vol = 0;
            return vol;
        });
        var startPlaying = (soundOptions.startPlaying == undefined) ? true : soundOptions.startPlaying;
        if (startPlaying) this.sound.play();
    }
    /**
     * Updates the sound based on the listener's position, then calls the update method of the Polygon
     * @returns {void}
     */
    update(): void {
        var dist = distance(
            getCentroid(this.polify()),
            getCentroid(this.listener.polify())
        );
        if (dist < this.minDistance) {
            this.sound.setVolume(1)
        } else if (dist > this.maxDistance) {
            this.sound.setVolume(0)
        } else {
            this.sound.setVolume(this.fallOffFunction(dist));
        }
        super.update();
    }
    /**
     * Plays the sound
     * @returns {void}
     */
    play(): void {
        this.sound.play();
    }
    /**
     * Stops the sound
     * @returns {void}
     */
    stop(): void {
        this.sound.stop();
    }
}

/**
 * @class 
 * @classdesc SoundEmitterSprite class, used for emitting sounds from a Sprite. This treats the Sprite as a sort of speaker
 * @property {Sound} sound The Sound instance that the SoundEmitterPolygon plays
 * @property {GameObject} listener The GameObject that "listens" to the sound. Sound volume will be determined by distance to this game object
 * @property {number} maxDistance The maximum distance that the sound can be heard from (if the listener is farther than this, the sound will not be heard)
 * @property {number} minDistance The minimum distance that the sound can be heard from (if the listener is closer than this, the sound will be heard at full volume)
 * @property {Function} fallOffFunction The function that determines the fall off of the sound. Takes in a distance and returns a volume (0-1). By default, the fall off is linear.
 * @example
 * ```js
 *  const soundEmitter = new ANVIL.SoundEmitterSprite({
 *      coordinates: [0,0],
 *      width: 100,
 *      height: 100,
 *      url: "path/to/sprite.png",
 *      soundOptions: {
 *          source: "path/to/sound.mp3",
 *          listener: playerObject,
 *          loop: true,
 *          volume: 1,
 *          maxDistance: 1000,
 *          minDistance: 0,
 *          fallOffFunction: (distance) => {
 *              var falloffstart = this.maxDistance - this.minDistance;
 *              var dist = distance - this.minDistance;
 *              var vol = 1 - (dist / falloffstart);
 *              if (vol < 0) vol = 0;
 *              return vol;
 *          } 
 *      }
 *  });
 * ```
 */
class SoundEmitterSprite extends Sprite {
    sound: Sound;
    listener: GameObject
    constructor(options: SpriteOptions, soundOptions: SoundEmitterOptions) {
        super(options);
        this.sound = new Sound(soundOptions);
        this.listener = soundOptions.listener;

        this.maxDistance = soundOptions.maxDistance || 1000;
        this.minDistance = soundOptions.minDistance || 0;
        this.fallOffFunction = soundOptions.fallOffFunction || ((distance: number) => {
            var falloffstart = this.maxDistance - this.minDistance;
            var dist = distance - this.minDistance;
            var vol = 1 - (dist / falloffstart);
            if (vol < 0) vol = 0;
            return vol;
        });
        var startPlaying = (soundOptions.startPlaying == undefined) ? true : soundOptions.startPlaying;
        if (startPlaying) this.sound.play();
    }

    /**
     * Updates the sound based on the listener's position, then calls the update method of the Sprite
     * @returns {void}
     */
    update(): void {
        var dist = distance(
            getCentroid(this.polify()),
            getCentroid(this.listener.polify())
        );
        if (dist < this.minDistance) {
            this.sound.setVolume(1)
        } else if (dist > this.maxDistance) {
            this.sound.setVolume(0)
        } else {
            this.sound.setVolume(this.fallOffFunction(dist));
        }
        super.update();
    }
    /**
     * Plays the sound
     * @returns {void}
     */
    playSound(): void {
        this.sound.play();
    }
    /**
     * Stops the sound
     * @returns {void}
     */
    stopSound(): void {
        this.sound.stop();
    }
}

var ANVIL = {
    GameObject,
    Polygon,
    Sprite,
    Particle,
    Particles,
    Text,

    Sound,
    SoundEmitterPolygon,
    SoundEmitterSprite,

    Light,
    DirectionalLight,

    Scene,
    Layer,
    SceneManager,
    MultiPlayerSceneManager,

    Player,
    MultiPlayerServer,
    PlayerClient,

    Input,
    MultiPlayerClientInput,
    MultiPlayerInputHandler,
    ServerInputHandler,

    isConvex,
    instanceOfDirectionalLight,
    getCentroid,
    calculateFPS,
    findTopLeftMostPoint,
    isSquare,
    distance,
    getBoundingBox,
    sumArrays,
    multArrays,
    uid,
    checkSquareCollision,
    checkCollision,
    amplifyMedia
};
export {
    GameObject,
    Polygon,
    Sprite,
    Particle,
    Particles,
    Text,

    Sound,
    SoundEmitterPolygon,
    SoundEmitterSprite,

    Light,
    DirectionalLight,

    Scene,
    Layer,
    SceneManager,
    MultiPlayerSceneManager,

    Player,
    MultiPlayerServer,
    PlayerClient,

    Input,
    MultiPlayerClientInput,
    MultiPlayerInputHandler,
    ServerInputHandler,

    isConvex,
    instanceOfDirectionalLight,
    getCentroid,
    calculateFPS,
    findTopLeftMostPoint,
    isSquare,
    distance,
    getBoundingBox,
    sumArrays,
    multArrays,
    uid,
    checkSquareCollision,
    checkCollision,
    amplifyMedia,

    PlayerClientOptions,
    GameObjectOptions,
    PolygonOptions,
    SpriteOptions,
    SceneManagerOptions,
    MultiPlayerSceneManagerOptions,
    SceneOptions,
    lightingOptions,
    GPUsettings,
    WorldPhysicsOptions,
    PhysicsTimingOptions,
    PhysicsOptions,
    DrawOptions,
    MultiPlayerInputHandlerOptions,
    ServerInputHandlerOptions,
    PlayerOptions,
    MultiPlayerServerOptions,
    AmplifiedMedia,
    LayerOptions,
    SoundOptions,
    SoundEmitterOptions,
    CollisionMonitorOptions,
    ParticleChildOptions,
    ParticleOptions,
    TextOptions,

    NotReadyStackEmitItem,
    Gravity,
    Connection,
    GameObjectBuilder,

    Bounds,
    Point,
    Vec2,
    Vertex,
    Vector,
    CollisionMonitor,
    EventOnFunction
}
if (typeof window != "undefined") {
    (window as any).ANVIL = ANVIL;
}