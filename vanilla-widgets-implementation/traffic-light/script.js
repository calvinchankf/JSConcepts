const config = {
  red: {
    duration: 4000,
    next: 'green',
  },
  yellow: {
    duration: 500,
    next: 'red',
  },
  green: {
    duration: 3000,
    next: 'yellow',
  },
};

const lights = ['red', 'yellow', 'green'];

const setActiveLight = (color) => {
  lights.forEach((light) => {
    const el = document.getElementById(light);
    if (!el) { return; }
    
    if (light == color) {
      el.className = 'traffic-light active';
    } else {
      el.className = 'traffic-light';
    }
  });
};

const fn = (currentColor) => {
  const state = config[currentColor];
  if (!state) { return; }

  setActiveLight(currentColor);

  const {duration, next} = state;
  setTimeout(() => fn(next), duration);
};

document.addEventListener('DOMContentLoaded', () => fn('green'));
