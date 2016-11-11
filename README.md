# mconv

##Como usarlo:

1º Hay que instalar mconv 
``` bash
$> npm i mconv -g
```
2º Hay que instalar uno de los modulos de conversion como "mconv_mod_flac2mp3"
``` bash
$> npm i mconv_mod_flac2mp3 -g
```
3º Necesitamos ffmpeg
``` bash
$> apt-get install ffmpeg || brew install ffmpeg
```
4º La Ayuda de mconv mostrara los modulos instaldos
``` bash
$> mconv
```
5º La ayuda del modulo mostrara como usarlo
``` bash
$> mconv flac2mp3 -help
```
6º Para realizar una conversion con mconv_mod_flac2mp3
``` bash
$> mconv flac2mp3 ~/path/musica/flac -delete -verbose
```
