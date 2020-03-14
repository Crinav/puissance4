# Puissance4 / Connect 4  
  
A jquery plugin connect4  

## How to use  

### Prerequisites    
All you need is a basic html file like this :  
  
```html
<!DOCTYPE html>
<html>
<head>
  <title>Connect4</title>
  <meta charset="UTF-8">
</head> 
<body>     
<script src="public/script/jquery-3.4.1.min.js"></script>
<script src="main.js"></script>
</body>
</html>
```
  
A script tag for jquery.js and another for main.js  
  
### Usage  
  
You could call the plugin like this (with graphic UI) :  
```javascript
$('body').puissance4({
    
  });  
```
Or if you want set yours defaults options , you must call like this :  
```javascript
$('body').puissance4({
    color1: 'pink',
    color2: 'blue',
    nbx: '7',
    nby: '6',
    name1: 'Chris',
    name2: 'Lucile'
    }); 
```
'color' for the color of  the player's coin ,  

'name' for firstname or pseudo,  

'nbx' for number of columns,  

'nby' for number of rows.

## Contact  

Copyright (©) Christophe Navarro <navarro.christophe@gmail.com>

linkedin<linkedin.com/in/christophe-navarro-b5173a171> 
  
## Screenshots
  
![alt text](https://github.com/Crinav/puissance4/blob/master/Puissance4.png "main page")  
___  

![alt text](https://github.com/Crinav/puissance4/blob/master/Puissance4(1).png)   
___  

![alt text](https://github.com/Crinav/puissance4/blob/master/Puissance4(2).png)  
