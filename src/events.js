import { mouse } from "./game/engine";
import {
  defaultConfiguration,
  gameConfiguration,
  scene1,
} from "./game/globals";
import main from "./game/main";
import { portals } from "./globals";
import {
  audioInit,
  createColorItemElement,
  goBack,
  goTo,
  graphicsInit,
  initSettingsElements,
  particlesInit,
  setGameConfiguration,
  updateDeleteColorButtonsState,
  updateGameConfiguration,
} from "./utils";

/**
 * Setups window events
 * @returns {void}
 */
export function windowsEvents() {
  window.addEventListener("keydown", ({ key }) => {
    if (!mouse.keysDown.includes(key)) {
      mouse.keysDown.push(key);
    }

    if (
      key === "Escape" &&
      portals.get().at(-1) !== "pause" &&
      portals.get().at(-1) !== "game"
    ) {
      goBack();
    } else if (key === "Escape" && scene1.get().status === "ongoing") {
      goTo("pause");
      scene1.get().pause();
    } else if (key === "Escape" && portals.get().at(-1) === "pause") {
      goTo("game");
      scene1.get().resume();
    }
  });

  window.addEventListener("keyup", ({ key }) => {
    mouse.keysDown = mouse.keysDown.filter((k) => k !== key);
  });
}

export function elementsEvents() {
  portalEvents();
  audioSettingsEvents();
  particlesSettingsEvents();
  graphicsSettingsEvents();
  initDefaultButtons();
}

function portalEvents() {
  // START
  const startButton = document.querySelector("button[data-purpose='start']");

  startButton.addEventListener("click", () => {
    goTo("game");
    main();
  });

  // SETTINGS
  const settingsButtons = document.querySelectorAll(
    "button[data-purpose='settings']",
  );

  settingsButtons.forEach((button) =>
    button.addEventListener("click", () => {
      goTo("settings");
    }),
  );

  // BACK
  const backHomes = document.querySelectorAll("button[data-purpose='go-back']");

  backHomes.forEach((button) =>
    button.addEventListener("click", () => {
      goBack();
    }),
  );

  // RESUME GAME
  const resumeButton = document.querySelector("button[data-purpose='resume']");

  resumeButton.addEventListener("click", () => {
    if (scene1.get().status === "pause") {
      goTo("game");
      scene1.get().resume();
    }
  });

  // PARTICLES SETTINGS
  const particlesButton = document.querySelector(
    "button[data-purpose='edit-particles']",
  );

  particlesButton.addEventListener("click", () => {
    goTo("particles-settings");
  });

  // COLORS SETTINGS
  const colorsButton = document.querySelector(
    "button[data-purpose='edit-colors']",
  );

  colorsButton.addEventListener("click", () => {
    goTo("colors-settings");
  });

  // AUDIO SETTINGS
  const audioButton = document.querySelector(
    "button[data-purpose='edit-audio']",
  );

  audioButton.addEventListener("click", () => {
    goTo("audio-settings");
  });
}

function audioSettingsEvents() {
  // MASTER
  const masterVolumeInput = document.querySelector("input#master-volume-range");
  const masterVolumeValueElement = document.querySelector(
    "#master-volume-range-value",
  );

  masterVolumeInput.addEventListener("input", (e) => {
    const volume = +e.target.value;

    masterVolumeValueElement.innerText = volume;

    updateGameConfiguration("audio", "volume", "master", volume);
  });

  // PADDLE
  const paddleVolumeInput = document.querySelector(
    "input#paddle-hit-volume-range",
  );
  const paddleVolumeValueElement = document.querySelector(
    "#paddle-hit-volume-range-value",
  );

  paddleVolumeInput.addEventListener("input", (e) => {
    const volume = +e.target.value;

    paddleVolumeValueElement.innerText = volume;

    updateGameConfiguration("audio", "volume", "hit", "paddle", volume);
  });

  // WALL
  const wallVolumeInput = document.querySelector("input#wall-hit-volume-range");
  const wallVolumeValueElement = document.querySelector(
    "#wall-hit-volume-range-value",
  );

  wallVolumeInput.addEventListener("input", (e) => {
    const volume = +e.target.value;

    wallVolumeValueElement.innerText = volume;

    updateGameConfiguration("audio", "volume", "hit", "wall", volume);
  });

  // BRICK
  const brickVolumeInput = document.querySelector(
    "input#brick-hit-volume-range",
  );
  const brickVolumeValueElement = document.querySelector(
    "#brick-hit-volume-range-value",
  );

  brickVolumeInput.addEventListener("input", (e) => {
    const volume = +e.target.value;

    brickVolumeValueElement.innerText = volume;

    updateGameConfiguration("audio", "volume", "hit", "brick", volume);
  });

  // BRICK
  const bonusVolumeInput = document.querySelector(
    "input#bonus-hit-volume-range",
  );
  const bonusVolumeValueElement = document.querySelector(
    "#bonus-hit-volume-range-value",
  );

  bonusVolumeInput.addEventListener("input", (e) => {
    const volume = +e.target.value;

    bonusVolumeValueElement.innerText = volume;

    updateGameConfiguration("audio", "volume", "hit", "bonus", volume);
  });

  // GET BONUS
  const getBonusVolumeInput = document.querySelector(
    "input#get-bonus-volume-range",
  );
  const getBonusVolumeValueElement = document.querySelector(
    "#get-bonus-volume-range-value",
  );

  getBonusVolumeInput.addEventListener("input", (e) => {
    const volume = +e.target.value;

    getBonusVolumeValueElement.innerText = volume;

    updateGameConfiguration("audio", "volume", "getBonus", volume);
  });

  // DESTROY BRICK
  const destroyBrickVolumeInput = document.querySelector(
    "input#destroy-brick-volume-range",
  );
  const destroyBrickVolumeValueElement = document.querySelector(
    "#destroy-brick-volume-range-value",
  );

  destroyBrickVolumeInput.addEventListener("input", (e) => {
    const volume = +e.target.value;

    destroyBrickVolumeValueElement.innerText = volume;

    updateGameConfiguration("audio", "volume", "destroyBrick", volume);
  });

  // WALL HIT SOUND
  const wallHitSoundSelect = document.querySelector("select#wall-hit-sound");

  wallHitSoundSelect.addEventListener("change", (e) => {
    const newValue = e.target.value;

    updateGameConfiguration("audio", "hit", "wall", newValue);
  });

  // PADDLE HIT SOUND
  const paddleHitSoundSelect = document.querySelector(
    "select#paddle-hit-sound",
  );

  paddleHitSoundSelect.addEventListener("change", (e) => {
    const newValue = e.target.value;

    updateGameConfiguration("audio", "hit", "paddle", newValue);
  });

  // BRICK HIT SOUND
  const brickHitSoundSelect = document.querySelector("select#brick-hit-sound");

  brickHitSoundSelect.addEventListener("change", (e) => {
    const newValue = e.target.value;

    updateGameConfiguration("audio", "hit", "brick", newValue);
  });

  // BONUS HIT SOUND
  const bonusHitSoundSelect = document.querySelector("select#bonus-hit-sound");

  bonusHitSoundSelect.addEventListener("change", (e) => {
    const newValue = e.target.value;

    updateGameConfiguration("audio", "hit", "bonus", newValue);
  });

  // GET BONUS SOUND
  const getBonusSoundSelect = document.querySelector("select#get-bonus-sound");

  getBonusSoundSelect.addEventListener("change", (e) => {
    const newValue = e.target.value;

    updateGameConfiguration("audio", "getBonus", newValue);
  });

  // DESTROY BRICK SOUND
  const destroyBrickSoundSelect = document.querySelector(
    "select#destroy-brick-sound",
  );

  destroyBrickSoundSelect.addEventListener("change", (e) => {
    const newValue = e.target.value;

    updateGameConfiguration("audio", "destroyBrick", newValue);
  });
}

function particlesSettingsEvents() {
  // PARTICLES CHECK
  const particlesCheckElement = document.querySelector("#particles-check");

  // PARTICLES SETTINGS
  const particlesOnSettingsElement = document.querySelector(
    "#particles-on-settings",
  );

  particlesCheckElement.addEventListener("change", (e) => {
    const isChecked = e.target.checked;

    if (isChecked) {
      particlesOnSettingsElement.classList.remove("hidden");
    } else {
      particlesOnSettingsElement.classList.add("hidden");
    }

    updateGameConfiguration("particles", "areOn", isChecked);
  });

  // PARTICLES MAX
  const particlesMaxElement = document.querySelector("#particles-max");

  particlesMaxElement.addEventListener("input", (e) => {
    const number = +e.target.value;

    updateGameConfiguration("particles", "maxHit", number);
  });

  // BRICKS PARTICLES
  const bricksParticlesElement = document.querySelector(
    "#bricks-particles-check",
  );

  bricksParticlesElement.addEventListener("change", (e) => {
    const isChecked = e.target.checked;

    updateGameConfiguration("particles", "bricks", isChecked);
  });

  // WALLS PARTICLES
  const wallsParticlesElement = document.querySelector(
    "#walls-particles-check",
  );

  wallsParticlesElement.addEventListener("change", (e) => {
    const isChecked = e.target.checked;

    updateGameConfiguration("particles", "walls", isChecked);
  });

  // PADDLE PARTICLES
  const paddleParticlesElement = document.querySelector(
    "#paddle-particles-check",
  );

  paddleParticlesElement.addEventListener("change", (e) => {
    const isChecked = e.target.checked;

    updateGameConfiguration("particles", "paddle", isChecked);
  });

  // BONUS PARTICLES
  const bonusParticlesElement = document.querySelector(
    "#bonus-particles-check",
  );

  bonusParticlesElement.addEventListener("change", (e) => {
    const isChecked = e.target.checked;

    updateGameConfiguration("particles", "bonus", isChecked);
  });

  // TAIL PARTICLES
  const tailParticlesElement = document.querySelector("#tail-particles-check");
  const maxTailParticlesSettingsElement = document.querySelector(
    "#max-tail-particles-settings",
  );

  tailParticlesElement.addEventListener("change", (e) => {
    const isChecked = e.target.checked;

    if (isChecked) {
      maxTailParticlesSettingsElement.classList.remove("hidden");
    } else {
      maxTailParticlesSettingsElement.classList.add("hidden");
    }

    updateGameConfiguration("particles", "tail", isChecked);
  });

  // MAX TAIL PARTICLES
  const maxTailParticlesElement = document.querySelector("#max-tail-particles");

  maxTailParticlesElement.addEventListener("input", (e) => {
    const number = +e.target.value;

    updateGameConfiguration("particles", "maxTail", number);
  });
}

function graphicsSettingsEvents() {
  // BALL
  const ballColorElement = document.querySelector("select#ball-color");
  const ballCustomColorWrapperElement = document.querySelector(
    "label[for='ball-custom-color']",
  );

  ballColorElement.addEventListener("change", (e) => {
    const newValue = e.target.value;

    if (newValue === "custom") {
      ballCustomColorWrapperElement.classList.remove("hidden");
    } else {
      ballCustomColorWrapperElement.classList.add("hidden");
    }

    updateGameConfiguration("graphics", "colors", "ball", "type", newValue);
  });

  const ballCustomColorElement = document.querySelector(
    "input#ball-custom-color",
  );

  ballCustomColorElement.addEventListener("input", (e) => {
    const newValue = e.target.value;

    updateGameConfiguration(
      "graphics",
      "colors",
      "ball",
      "customColor",
      newValue,
    );
  });

  // BACKGROUND
  const backgroundColorElement = document.querySelector(
    "select#background-color",
  );
  const backgroundCustomColorWrapperElement = document.querySelector(
    "label[for='background-custom-color']",
  );

  backgroundColorElement.addEventListener("change", (e) => {
    const newValue = e.target.value;

    if (newValue === "custom") {
      backgroundCustomColorWrapperElement.classList.remove("hidden");
    } else {
      backgroundCustomColorWrapperElement.classList.add("hidden");
    }

    updateGameConfiguration(
      "graphics",
      "colors",
      "background",
      "type",
      newValue,
    );
  });

  const backgroundCustomColorElement = document.querySelector(
    "input#background-custom-color",
  );

  backgroundCustomColorElement.addEventListener("input", (e) => {
    const newValue = e.target.value;

    updateGameConfiguration(
      "graphics",
      "colors",
      "background",
      "customColor",
      newValue,
    );
  });

  // PADDLE
  const paddleColorElement = document.querySelector("select#paddle-color");
  const paddleCustomColorWrapperElement = document.querySelector(
    "label[for='paddle-custom-color']",
  );

  paddleColorElement.addEventListener("change", (e) => {
    const newValue = e.target.value;

    if (newValue === "custom") {
      paddleCustomColorWrapperElement.classList.remove("hidden");
    } else {
      paddleCustomColorWrapperElement.classList.add("hidden");
    }

    updateGameConfiguration("graphics", "colors", "paddle", "type", newValue);
  });

  const paddleCustomColorElement = document.querySelector(
    "input#paddle-custom-color",
  );

  paddleCustomColorElement.addEventListener("input", (e) => {
    const newValue = e.target.value;

    updateGameConfiguration(
      "graphics",
      "colors",
      "paddle",
      "customColor",
      newValue,
    );
  });

  // BRICK
  const brickColorElement = document.querySelector("select#brick-color");
  const brickCustomColorWrapperElement = document.querySelector(
    "label[for='brick-custom-color']",
  );

  brickColorElement.addEventListener("change", (e) => {
    const newValue = e.target.value;

    if (newValue === "custom") {
      brickCustomColorWrapperElement.classList.remove("hidden");
    } else {
      brickCustomColorWrapperElement.classList.add("hidden");
    }

    updateGameConfiguration("graphics", "colors", "brick", "type", newValue);
  });

  const brickCustomColorElement = document.querySelector(
    "input#brick-custom-color",
  );

  brickCustomColorElement.addEventListener("input", (e) => {
    const newValue = e.target.value;

    updateGameConfiguration(
      "graphics",
      "colors",
      "brick",
      "customColor",
      newValue,
    );
  });

  // BONUS
  const bonusColorElement = document.querySelector("select#bonus-color");
  const bonusCustomColorWrapperElement = document.querySelector(
    "label[for='bonus-custom-color']",
  );

  bonusColorElement.addEventListener("change", (e) => {
    const newValue = e.target.value;

    if (newValue === "custom") {
      bonusCustomColorWrapperElement.classList.remove("hidden");
    } else {
      bonusCustomColorWrapperElement.classList.add("hidden");
    }

    updateGameConfiguration("graphics", "colors", "bonus", "type", newValue);
  });

  const bonusCustomColorElement = document.querySelector(
    "input#bonus-custom-color",
  );

  bonusCustomColorElement.addEventListener("input", (e) => {
    const newValue = e.target.value;

    updateGameConfiguration(
      "graphics",
      "colors",
      "bonus",
      "customColor",
      newValue,
    );
  });

  // BRICK HP
  const brickHpColorElement = document.querySelector("select#brick-hp-color");
  const brickHpCustomColorWrapperElement = document.querySelector(
    "label[for='brick-hp-custom-color']",
  );

  brickHpColorElement.addEventListener("change", (e) => {
    const newValue = e.target.value;

    if (newValue === "custom") {
      brickHpCustomColorWrapperElement.classList.remove("hidden");
    } else {
      brickHpCustomColorWrapperElement.classList.add("hidden");
    }

    updateGameConfiguration("graphics", "colors", "brickHp", "type", newValue);
  });

  const brickHpCustomColorElement = document.querySelector(
    "input#brick-hp-custom-color",
  );

  brickHpCustomColorElement.addEventListener("input", (e) => {
    const newValue = e.target.value;

    updateGameConfiguration(
      "graphics",
      "colors",
      "brickHp",
      "customColor",
      newValue,
    );
  });

  // COLORS ARRAY
  const colorsListElement = document.querySelector(".colors-list");

  // EDIT COLOR
  colorsListElement.addEventListener("input", (e) => {
    if (e.target.type !== "color") return;

    const colorItemElement = e.target.closest(".colors-item");
    const colorItemElements = [
      ...colorsListElement.querySelectorAll(".colors-item"),
    ];
    const index = colorItemElements.indexOf(colorItemElement);
    const newValue = e.target.value;

    const currentGameConfiguration = gameConfiguration.get();
    const newArray = [...currentGameConfiguration.graphics.colors.array];

    newArray[index] = newValue;

    updateGameConfiguration("graphics", "colors", "array", newArray);
  });

  // ADD / DELETE COLOR
  colorsListElement.addEventListener("click", (e) => {
    if (e.target.dataset.purpose === "add-color") {
      const newColor = "#000000";
      const currentGameConfiguration = gameConfiguration.get();
      const newArray = [
        ...currentGameConfiguration.graphics.colors.array,
        newColor,
      ];

      updateGameConfiguration("graphics", "colors", "array", newArray);

      const colorItemElement = createColorItemElement(newColor);
      e.target.before(colorItemElement);

      updateDeleteColorButtonsState(colorsListElement);

      return;
    }

    if (e.target.dataset.purpose === "delete-color") {
      const colorItemElements = [
        ...colorsListElement.querySelectorAll(".colors-item"),
      ];

      if (colorItemElements.length <= 1) return;

      const colorItemElement = e.target.closest(".colors-item");
      const index = colorItemElements.indexOf(colorItemElement);

      const currentGameConfiguration = gameConfiguration.get();
      const newArray = currentGameConfiguration.graphics.colors.array.filter(
        (_, i) => i !== index,
      );

      updateGameConfiguration("graphics", "colors", "array", newArray);

      colorItemElement.remove();

      updateDeleteColorButtonsState(colorsListElement);
    }
  });
}

function initDefaultButtons() {
  // DEFAULT ALL SETTINGS
  const defaultSettingsButton = document.querySelector(
    "button[data-purpose='default-settings']",
  );

  defaultSettingsButton.addEventListener("click", () => {
    setGameConfiguration({ ...defaultConfiguration });
    initSettingsElements({ ...defaultConfiguration });
  });

  // DEFAULT AUDIO SETTINGS
  const defaultAudioSettingsButton = document.querySelector(
    "button[data-purpose='default-audio']",
  );

  defaultAudioSettingsButton.addEventListener("click", () => {
    const currentGameConfiguration = gameConfiguration.get();
    const defaultedGameConfiguration = {
      ...currentGameConfiguration,
      audio: {
        ...defaultConfiguration.audio,
      },
    };

    setGameConfiguration({ ...defaultedGameConfiguration });
    audioInit({ ...defaultedGameConfiguration });
  });

  // DEFAULT COLORS SETTINGS
  const defaultColorsSettingsButton = document.querySelector(
    "button[data-purpose='default-colors']",
  );

  defaultColorsSettingsButton.addEventListener("click", () => {
    const currentGameConfiguration = gameConfiguration.get();
    const defaultedGameConfiguration = {
      ...currentGameConfiguration,
      graphics: {
        ...defaultConfiguration.graphics,
      },
    };

    setGameConfiguration({ ...defaultedGameConfiguration });
    graphicsInit({ ...defaultedGameConfiguration });
  });

  // DEFAULT PARTICLES SETTINGS
  const defaultParticlesSettingsButton = document.querySelector(
    "button[data-purpose='default-particles']",
  );

  defaultParticlesSettingsButton.addEventListener("click", () => {
    const currentGameConfiguration = gameConfiguration.get();
    const defaultedGameConfiguration = {
      ...currentGameConfiguration,
      particles: {
        ...defaultConfiguration.particles,
      },
    };

    setGameConfiguration({ ...defaultedGameConfiguration });
    particlesInit({ ...defaultedGameConfiguration });
  });
}
