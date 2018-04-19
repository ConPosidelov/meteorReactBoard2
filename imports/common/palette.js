export const palette = [
   {
    name: 'red',
    color:  '#FF0000'
   },
   {
    name: 'green',
    color: '#008000'
   },
   {
    name:  'blue' ,
    color: '#0000FF'
   },
   {
    name: 'Sienna',
    color: '#A0522D'
   },
   {
    name: 'DimGray',
    color: '#696969'
   },
   {
    name: 'Gold',
    color: '#FFD700'
   },
   {
    name: 'HotPink',
    color: '#FF69B4'
   },
   {
    name: 'BlueViolet',
    color: '#8A2BE2'
   },
   {
    name: 'FireBrick',
    color: '#B22222'
   },
   {
    name: 'Orange',
    color: '#FFA500'
   },
   {
    name: 'Lime',
    color: '#00FF00'
   },
   {
    name: 'Teal',
    color: '#008080'
   },
   {
    name: 'SteelBlue',
    color: '#4682B4'
   },
   {
    name: 'DarkGoldenRod',
    color: '#B8860B'
   },
   {
    name: 'Brown',
    color: '#A52A2A'
   },
   {
    name: 'Olive',
    color: '#808000'
   }
];

export const getRandomColor = (bright) => {
    let h = Math.floor(Math.random() * 360);
    return `hsl(${h}, ${bright}%, ${bright}%)`;
};

