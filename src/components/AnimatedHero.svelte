
<header class="container">
  <h1 class="end-game">Alicia Sykes</h1>
  <h1 class="title">
    <span>Hello 👋</span>
    <span>I'm</span>
    <span>Alicia</span>
  </h1>
  
  <h2 class="title">
    <span>I build</span>
    <span>free and open source</span>
    <span>apps</span>
    <span>which respect your privacy</span>
  </h2>
  
  <h3 class="title">
    <span>Thanks for</span>
    <span>stopping by <b>🥰</b></span>
  </h3>
</header>


<style lang="scss">

@import url('https://fonts.googleapis.com/css2?family=Permanent+Marker&display=swap');

// Styling variables
$secondary-color: var(--home-accent-background, #f543ea);
$tertiary-color: #ffffff;
$font-size-h1: 4.6rem;
$font-size-h2: 3.5rem;
$font-size-end-game: 4.6rem;

// Basic timings
$animation-duration: 16s;
$fade-in-duration: 2.2s;
$fade-out-speedup-factor: 1;

// Animation delay variables
$initial-delay-h1: 0.6s;
$initial-delay-h2: 3s;
$initial-delay-h3: 6s;
$end-game-delay: 9s;

.container {
  font-family: 'Permanent Marker', 'Poppins', 'Baloo Paaji', cursive;
  width: 80vw;
  height: 24rem;
  position: relative;
  animation: reduceHeight 0.5s forwards;
  animation-delay: $end-game-delay;
}

h1, h2, h3 {
  font-size: $font-size-h1;
  text-transform: uppercase;
  position: absolute;
  top: 0;
  width: 100%;
  opacity: 0;
  animation: fadeInOut $animation-duration;
  animation-fill-mode: forwards;
  line-height: 1.25;

  &.end-game {
    font-size: $font-size-end-game;
    position: relative;
    color: $secondary-color;
    animation: endGameFadeIn 1s forwards;
    text-align: center;
    animation-delay: $end-game-delay;
  }

  span {
    width: 100%;
    float: left;
    color: $tertiary-color;
    -webkit-clip-path: polygon(100% 0, 100% 100%, 0 100%, 0 80%);
    clip-path: polygon(100% 0, 100% 100%, 0 100%, 0 80%);
    transform: translateY(-50px);
    opacity: 0;
    animation-name: titleAnimation;
    animation-timing-function: ease;
    animation-duration: $fade-in-duration;
    animation-fill-mode: forwards;
  }
}

h1 {
  span {
    @for $i from 1 through 3 {
      &:nth-child(#{$i}) {
        animation-delay: $initial-delay-h1 + (($i - 1) * 0.5s);
        @if $i == 3 {
          color: $secondary-color;
        }
      }
    }
  }
}

h2 {
  font-size: $font-size-h2;
  animation-delay: $initial-delay-h2;

  span {
    @for $i from 1 through 4 {
      &:nth-child(#{$i}) {
        animation-delay: $initial-delay-h2 + (($i - 1) * 0.5s + 0.6s);
        @if $i == 4 {
          color: $secondary-color;
        }
      }
    }
  }
}

h3 {
  animation-delay: $initial-delay-h3;
  b {
    font-weight: normal;
    font-size: $font-size-h1 - 1rem;
  }
  span {
    @for $i from 1 through 2 {
      &:nth-child(#{$i}) {
        animation-delay: $initial-delay-h3 + (($i - 1) * 0.5s + 0.6s);
        @if $i == 2 {
          color: $secondary-color;
        }
      }
    }
  }
}

@keyframes titleAnimation {
  0% {
    transform: translateY(-50px);
    opacity: 0;
    -webkit-clip-path: polygon(100% 0, 100% 100%, 0 100%, 0 80%);
    clip-path: polygon(100% 0, 100% 100%, 0 100%, 0 80%);
  }
  20% {
    transform: translateY(0);
    opacity: 1;
    -webkit-clip-path: polygon(100% 0, 100% 100%, 0 100%, 0 15%);
    clip-path: polygon(100% 0, 100% 100%, 0 100%, 0 15%);
  }
  80% {
    transform: translateY(0);
    opacity: 1;
    -webkit-clip-path: polygon(100% 0, 100% 100%, 0 100%, 0 15%);
    clip-path: polygon(100% 0, 100% 100%, 0 100%, 0 15%);
  }
  90% {
    transform: translateY(0);
    opacity: 0.5;
    -webkit-clip-path: polygon(100% 0, 100% -0%, 0 100%, 0 100%);
    clip-path: polygon(100% 0, 100% -0%, 0 100%, 0 100%);
  }
  100% {
    transform: translateY(50px);
    opacity: 0;
    -webkit-clip-path: polygon(100% 0, 100% -0%, 0 100%, 0 100%);
    clip-path: polygon(100% 0, 100% -0%, 0 100%, 0 100%);
    display: none;
  }
}

@keyframes fadeInOut {
  0%, 24.99% {
    opacity: 0;
  }
  5%, 24% {
    opacity: 1;
  }
  25%, 49.99% {
    opacity: 0;
  }
  29%, 48% {
    opacity: 1;
  }
  50%, 74.99% {
    opacity: 0;
  }
  54%, 90% {
    opacity: 0;
  }
  75%, 100% {
    opacity: 0;
  }
}

@keyframes endGameFadeIn {
  0% {
    opacity: 0;
    transform: translateY(100px) scale(0.8) rotate(-10deg);
  }
  50% {
    opacity: 1;
    transform: translateY(-20px) scale(1.1) rotate(5deg);
  }
  70% {
    transform: translateY(10px) scale(0.95) rotate(-3deg);
  }
  85% {
    transform: translateY(-5px) scale(1.05) rotate(2deg);
  }
  100% {
    transform: translateY(0) scale(1) rotate(0deg); 
    opacity: 1;
  }
}

@keyframes reduceHeight {
  0% {
    height: 24rem;
  }
  100% {
    height: 12rem;
  }
}

</style>
