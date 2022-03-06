# Death Counter for OBS Browser Source

Glitch Link: https://hip-holly-beak.glitch.me/

Project Page: https://glitch.com/~hip-holly-beak

created by Blackeye / Blackstareye

## Step by Step

1. Remix this project on glitch or put it on a node server
2. edit data file for setting the sound file (if needed)
3. edit url in meta.js to url of glitch-container or server
4. go to your twitch channel chat
   1. paste the commands below
   2. restrict the commands for mods only if needed

## Note

1. the first request can be a bit slow ! Glitch sets the container without requests on sleep mode, hence they need to wake up first.

## Nightbot Commands

Nightbot Commands
```sh
!commands add !death+ $(eval const result=$(urlfetch json https://hip-holly-beak.glitch.me/inc); result["msg"])
!commands add !death- $(eval const result=$(urlfetch json https://hip-holly-beak.glitch.me/dec); result["msg"])
!commands add !deathreset $(eval const result=$(urlfetch json https://hip-holly-beak.glitch.me/reset); result["msg"])
!commands add !deathset $(eval const result=$(urlfetch json https://hip-holly-beak.glitch.me/set?n=$(1)); result["msg"])
```