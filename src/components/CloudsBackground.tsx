import './CloudsBackground.css';

const clouds = [
  { size: 'large', num: 1 },
  { size: 'normal', num: 2 },
  { size: 'small', num: 3 },
  { size: 'tiny', num: 4 },
  { size: 'large', num: 5 },
  { size: 'normal', num: 6 },
  { size: 'small', num: 7 },
  { size: 'tiny', num: 8 },
  { size: 'small', num: 9 },
  { size: 'normal', num: 10 },
  { size: 'tiny', num: 11 },
  { size: 'small', num: 12 },
];

const CloudsBackground = () => (
  <div className="clouds-bg-animated">
    {clouds.map(({ size, num }) => (
      <div key={num} className={`cloud ${size} cloud-${num}`}>
        <div></div><div></div><div></div><div></div>
      </div>
    ))}
  </div>
);

export default CloudsBackground; 