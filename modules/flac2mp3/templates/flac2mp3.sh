ffmpeg -i "<%= filePath %>" -f mp3 -ab 192000 "<%= folderPath %><%= fileName %>.<%= fileExtTo %>" 2> /dev/null
