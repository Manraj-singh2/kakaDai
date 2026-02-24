export interface Song {
  id: string;
  title: string;
  artist: string;
  album: string;
  artwork: any; 
  audioUrl: string;
  duration:number;
}

export const SONGS: Song[] = [
  {
   id: '1',
  title: 'Rang',
  artist: 'Hustinder',
  album: 'Him & Her',
  artwork: 'https://lq.djjohal.com/covers/736115/Rang.jpg',
  audioUrl: 'https://dl2.djring.com/sd2.djjohal.com/128/525531/Rang(DJJOhAL.Com).mp3',
  duration:100,
  },
  {
   id: '2',
  title: '5-7',
  artist: 'Karan Aujla',
  album: '',
  artwork: 'https://lq.djjohal.com/covers/736154/5-7.jpg',
  audioUrl: 'https://dl2.djring.com/sd2.djjohal.com/128/525598/5-7(DJJOhAL.Com).mp3',
  duration:100,
  },
  {
   id: '3',
  title: 'V.I.P',
  artist: 'Garry Sandhu',
  album: '',
  artwork: 'https://lq.djjohal.com/covers/736149/V.I.P.jpg',
  audioUrl: 'https://dl2.djring.com/sd2.djjohal.com/128/525588/V.I.P(DJJOhAL.Com).mp3',
  duration:100,
  },
  {
   id: '4',
  title: 'Painkiller',
  artist: 'Dulla',
  album: '',
  artwork: 'https://lq.djjohal.com/covers/736147/Pain Killer.jpg',
  audioUrl: 'https://dl2.djring.com/sd2.djjohal.com/128/525586/Pain Killer(DJJOhAL.Com).mp3',
  duration:100,
  },
  {
   id: '5',
  title: 'Her Town',
  artist: 'Arjan Dhillon',
  album: 'Saroor',
  artwork: 'https://lq.djjohal.com/covers/730207/Her Town.jpg',
  audioUrl: 'https://dl2.djring.com/sd2.djjohal.com/128/516611/Her Town(DJJOhAL.Com).mp3',
  duration:100,
  },
]

export default SONGS;