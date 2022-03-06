# Death Counter for OBS Browser Source

This is a simple Death Counter using REST-API (nodejs) and the OBS Browser Source.
The REST-API can then be triggered via Nightbot see [Nightbot Commands](#nightbot_commands)

It has three parts:

- Backend (NodeJs)
- Frontend (Window that will be integrated in OBS)
- [Nightbot](https://nightbot.tv) Commands

Glitch Link: <https://hip-holly-beak.glitch.me/>

Project Page: <https://glitch.com/~hip-holly-beak>

Demo (with Controls): <https://spring-chlorinated-seahorse.glitch.me>

created by Blackeye / Blackstareye

## Getting started

1. clone or remix the repo
   * if you have a glitch.com account, you can remix it via this [link](https://glitch.com/~hip-holly-beak)
   * clone the repo to your server. The server must run node js!
2. edit data.json file for setting the sound file (if needed)
2. go to OBS and add a Browsersource with the url of your server
3. if you have nightbot, insert the commands [below](#nightbot_commands)
4. Have fun

optional: restrict the commands for mods only if needed

## Features

- increase death count
- decrease death count
- reset death count
- set death count to a specific value

### Enabling Controls 

Uncomment the Block (Line 52) on index.html  to get Buttons like it is used on the DEMO.


## Note for Glitch Users

1. the first nightbot command (request) can be a bit slow ! Glitch sets the container without requests on sleep mode, hence they need to wake up first.

## Nightbot Commands

Nightbot Commands, change '<your_domain_url>' to the url of your deathcount server

```sh
!commands add !death+ $(eval const result=$(urlfetch json <your_domain_url>/inc); result["msg"])
!commands add !death- $(eval const result=$(urlfetch json <your_domain_url>/dec); result["msg"])
!commands add !deathreset $(eval const result=$(urlfetch json <your_domain_url>/reset); result["msg"])
!commands add !deathset $(eval const result=$(urlfetch json <your_domain_url>/set?n=$(1)); result["msg"])
```

!death+ : increase
!death- : decrease
!deathreset: reset
!deathset _number_ : set death counter to _number_

<!-- LICENSE -->

## License

Distributed under the APGL-3 License. See `LICENSE` for more information.

Images are licensed under the License [Attribution-NonCommercial-NoDerivatives 4.0 International (CC BY-NC-ND 4.0)](https://creativecommons.org/licenses/by-nc-nd/4.0/)

<!-- CONTACT -->

## Contact

Blackeye - [@BlackeyeM](https://twitter.com/BlackeyeM) - private_blackeye+linux_origin@posteo.de

Project Link: [https://github.com/Blackstareye/obs_browser_source_deathcounter](https://github.com/Blackstareye/linux_origin)

<!-- ACKNOWLEDGEMENTS -->

## Acknowledgements

- [Readme Template](https://github.com/othneildrew/Best-README-Template)

## Support

If you like my work and want to support me and my work, then this is the way:

- [kofi](https://ko-fi.com/black_eye)
- [patreon](https://www.patreon.com/black_eye_s?fan_landing=true)
- [tipee](https://www.tipeeestream.com/blackeye/donation)

Many Thanks ♥
