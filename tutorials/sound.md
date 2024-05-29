# Sound

## Sound Effects

A simple sound effect can be made using the `Sound` class. 

It takes 4 options, only one is mandatory.


```js
const mySound = new Sound({
    source: "my_sound.mp3"
});
```

You can also configure it to loop, can change the rate of playback, and modify the volume:

```js
const mySound = new Sound({
    source: "my_sound.mp3",
    volume: 2, // this will play 2x as loud as the base track
    playbackRate: 1.2 // this will play 1.2x times as fast as the base track
    loop: true // the track will loop
});
```

In order to play the sound, use the `play()` method.

```js
mySound.play();
```

> Note: Sounds can only play after the user has interacted with the page. To work around this, Anvil keeps tracks of which sounds have been played, and then once they are able to be played, anvil will play them automatically. 

## Sound Emitters

Sound emitters are objects within a scene that emit sound. For example, a sprite of a jukebox could be playing some music.


To make a sound emitter, you can use either `SoundEmitterPolygon` or a `SoundEmitterSprite`. Both configurations are the same.

```js
const myPlayer = new Polygon(...);
const mySoundEmitterObject = new SoundEmitterPolygon({
    //.. normal polygon options
},{
    source: "my_sound.mp3",
    listener: myPlayer
});
```

This will play `my_sound` with a volume corresponding to the distance that `mySoundEmitterObject` is from `myPlayer`.

To configure the emitter object, you have access to all of the following options:

```js
var config = {
    fallOffFunction: (x) => (1000-x)/1000, // this will give a gradual dropoff up to 1000 pixels away
    loop: true // loop the audio source,
    maxDistance: 1000, // the maximum distance that the sound canbe heard at.
    minDistance: 10, // the sound will play with max volume if the listener object is within 10 pixels
    playbackRate: 1.2, // the audio will play at 1.2x speed
    startPlaying: true, // the sound is playing as soon as everything initializes. Otherwise you have to start with `.playSound()`
    volume: 2 // this will play the audio at 2x volume as the base track
}
```


The sound can be started and stopped the same way a normal sound object can be controlled. 

```js
mySoundEmitterObject.play();
mySoundEmitterObject.stop();
```


You can also access all methods associated with the `Sound` class through the `sound` property.

```js
mySoundEmitterObject.sound.play();
mySoundEmitterObject.sound.stop();
mySoundEmitterObject.setVolume(0.5);
```

