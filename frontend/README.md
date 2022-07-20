# FRONTEND

## Prepare application to run live in android device with prod config:
```shell
$ ionic capacitor add android
$ ionic capacitor copy android --prod
$ ionic capacitor run android -l --host=your_ip --prod
```