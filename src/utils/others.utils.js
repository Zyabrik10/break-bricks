export function initSettingsElements(gameConfiguration) {
  audioInit(gameConfiguration);
  graphicsInit(gameConfiguration);
  particlesInit(gameConfiguration);
}

export function audioInit(gameConfiguration) {
  initVolume(gameConfiguration);
  initAudioFiles(gameConfiguration);
}

function initVolume(gameConfiguration) {
  // MASTER
  const masterVolumeInput = document.querySelector("input#master-volume-range");
  const masterVolumeValueElement = document.querySelector(
    "#master-volume-range-value",
  );
  const masterValue = gameConfiguration.audio.volume.master;

  masterVolumeInput.value = masterValue;
  masterVolumeValueElement.innerText = masterValue;

  // PADDLE
  const paddleVolumeInput = document.querySelector(
    "input#paddle-hit-volume-range",
  );
  const paddleVolumeValueElement = document.querySelector(
    "#paddle-hit-volume-range-value",
  );
  const paddleValue = gameConfiguration.audio.volume.hit.paddle;

  paddleVolumeInput.value = paddleValue;
  paddleVolumeValueElement.innerText = paddleValue;

  // WALL
  const wallVolumeInput = document.querySelector("input#wall-hit-volume-range");
  const wallVolumeValueElement = document.querySelector(
    "#wall-hit-volume-range-value",
  );
  const wallValue = gameConfiguration.audio.volume.hit.wall;

  wallVolumeInput.value = wallValue;
  wallVolumeValueElement.innerText = wallValue;

  // BRICK
  const brickVolumeInput = document.querySelector(
    "input#brick-hit-volume-range",
  );
  const brickVolumeValueElement = document.querySelector(
    "#brick-hit-volume-range-value",
  );
  const brickValue = gameConfiguration.audio.volume.hit.brick;

  brickVolumeInput.value = brickValue;
  brickVolumeValueElement.innerText = brickValue;

  // BONUS
  const bonusVolumeInput = document.querySelector(
    "input#bonus-hit-volume-range",
  );
  const bonusVolumeValueElement = document.querySelector(
    "#bonus-hit-volume-range-value",
  );
  const bonusValue = gameConfiguration.audio.volume.hit.bonus;

  bonusVolumeInput.value = bonusValue;
  bonusVolumeValueElement.innerText = bonusValue;

  // GET BONUS
  const getBonusVolumeInput = document.querySelector(
    "input#get-bonus-volume-range",
  );
  const getBonusVolumeValueElement = document.querySelector(
    "#get-bonus-volume-range-value",
  );
  const getBonusValue = gameConfiguration.audio.volume.getBonus;

  getBonusVolumeInput.value = getBonusValue;
  getBonusVolumeValueElement.innerText = bonusValue;

  // DESTROY BRICK
  const destroyBrickVolumeInput = document.querySelector(
    "input#destroy-brick-volume-range",
  );
  const destroyBrickVolumeValueElement = document.querySelector(
    "#destroy-brick-volume-range-value",
  );
  const destroyBrickValue = gameConfiguration.audio.volume.destroyBrick;

  destroyBrickVolumeInput.value = destroyBrickValue;
  destroyBrickVolumeValueElement.innerText = bonusValue;
}

function initAudioFiles(gameConfiguration) {
  // WALL
  const wallHitSoundOptions = document.querySelectorAll(
    "select#wall-hit-sound option",
  );

  wallHitSoundOptions.forEach((option) => {
    if (option.value === gameConfiguration.audio.hit.wall) {
      option.selected = true;
    } else {
      option.selected = false;
    }
  });

  // PADDLE
  const paddleHitSoundOptions = document.querySelectorAll(
    "select#paddle-hit-sound option",
  );

  paddleHitSoundOptions.forEach((option) => {
    if (option.value === gameConfiguration.audio.hit.paddle) {
      option.selected = true;
    } else {
      option.selected = false;
    }
  });

  // BRICK
  const brickHitSoundOptions = document.querySelectorAll(
    "select#brick-hit-sound option",
  );

  brickHitSoundOptions.forEach((option) => {
    if (option.value === gameConfiguration.audio.hit.brick) {
      option.selected = true;
    } else {
      option.selected = false;
    }
  });

  // BONUS
  const bonusHitSoundOptions = document.querySelectorAll(
    "select#bonus-hit-sound option",
  );

  bonusHitSoundOptions.forEach((option) => {
    if (option.value === gameConfiguration.audio.hit.bonus) {
      option.selected = true;
    } else {
      option.selected = false;
    }
  });

  // GET BONUS
  const getBonusSoundOptions = document.querySelectorAll(
    "select#get-bonus-sound option",
  );

  getBonusSoundOptions.forEach((option) => {
    if (option.value === gameConfiguration.audio.getBonus) {
      option.selected = true;
    } else {
      option.selected = false;
    }
  });

  // DESTROY BRICK
  const destroyBrickSoundOptions = document.querySelectorAll(
    "select#destroy-brick-sound",
  );

  destroyBrickSoundOptions.forEach((option) => {
    if (option.value === gameConfiguration.audio.destroyBrick) {
      option.selected = true;
    } else {
      option.selected = false;
    }
  });
}

export function particlesInit(gameConfiguration) {
  // PARTICLES CHECK
  const particlesCheckElement = document.querySelector("#particles-check");
  particlesCheckElement.checked = gameConfiguration.particles.areOn;

  // PARTICLES SETTINGS
  const particlesOnSettingsElement = document.querySelector(
    "#particles-on-settings",
  );

  if (gameConfiguration.particles.areOn) {
    particlesOnSettingsElement.classList.remove("hidden");
  } else {
    particlesOnSettingsElement.classList.add("hidden");
  }

  // PARTICLES MAX
  const particlesMaxElement = document.querySelector("#particles-max");
  particlesMaxElement.value = gameConfiguration.particles.maxHit;

  // BRICKS PARTICLES
  const bricksParticlesElement = document.querySelector(
    "#bricks-particles-check",
  );
  bricksParticlesElement.checked = gameConfiguration.particles.bricks;

  // WALLS PARTICLES
  const wallsParticlesElement = document.querySelector(
    "#walls-particles-check",
  );
  wallsParticlesElement.checked = gameConfiguration.particles.walls;

  // PADDLE PARTICLES
  const paddleParticlesElement = document.querySelector(
    "#paddle-particles-check",
  );
  paddleParticlesElement.checked = gameConfiguration.particles.paddle;

  // PADDLE PARTICLES
  const bonusParticlesElement = document.querySelector(
    "#bonus-particles-check",
  );
  bonusParticlesElement.checked = gameConfiguration.particles.bonus;

  // TAIL PARTICLES
  const tailParticlesElement = document.querySelector("#tail-particles-check");
  tailParticlesElement.checked = gameConfiguration.particles.tail;

  // MAX TAIL PARTICLES
  const maxTailParticlesElement = document.querySelector("#max-tail-particles");
  maxTailParticlesElement.value = gameConfiguration.particles.maxTail;

  if (gameConfiguration.particles.tail) {
    maxTailParticlesElement.classList.remove("hidden");
  } else {
    maxTailParticlesElement.classList.add("hidden");
  }
}

export function graphicsInit(gameConfiguration) {
  // BALL
  const ballColorElement = document.querySelector("select#ball-color");
  ballColorElement.value = gameConfiguration.graphics.colors.ball.type;

  const ballCustomColorElement = document.querySelector(
    "input#ball-custom-color",
  );
  ballCustomColorElement.value = gameConfiguration.graphics.colors.ball.customColor;

  const ballCustomColorWrapperElement = document.querySelector(
    "label[for='ball-custom-color']",
  );

  if (gameConfiguration.graphics.colors.ball.type === "custom") {
    ballCustomColorWrapperElement.classList.remove("hidden");
  } else {
    ballCustomColorWrapperElement.classList.add("hidden");
  }

  // BACKGROUND
  const backgroundColorElement = document.querySelector(
    "select#background-color",
  );
  backgroundColorElement.value = gameConfiguration.graphics.colors.background.type;

  const backgroundCustomColorElement = document.querySelector(
    "input#background-custom-color",
  );
  backgroundCustomColorElement.value =
    gameConfiguration.graphics.colors.background.customColor;

  const backgroundCustomColorWrapperElement = document.querySelector(
    "label[for='background-custom-color']",
  );

  if (gameConfiguration.graphics.colors.background.type === "custom") {
    backgroundCustomColorWrapperElement.classList.remove("hidden");
  } else {
    backgroundCustomColorWrapperElement.classList.add("hidden");
  }

  // PADDLE
  const paddleColorElement = document.querySelector("select#paddle-color");
  paddleColorElement.value = gameConfiguration.graphics.colors.paddle.type;

  const paddleCustomColorElement = document.querySelector(
    "input#paddle-custom-color",
  );
  paddleCustomColorElement.value =
    gameConfiguration.graphics.colors.paddle.customColor;

  const paddleCustomColorWrapperElement = document.querySelector(
    "label[for='paddle-custom-color']",
  );

  if (gameConfiguration.graphics.colors.paddle.type === "custom") {
    paddleCustomColorWrapperElement.classList.remove("hidden");
  } else {
    paddleCustomColorWrapperElement.classList.add("hidden");
  }

  // BRICK
  const brickColorElement = document.querySelector("select#brick-color");
  brickColorElement.value = gameConfiguration.graphics.colors.brick.type;

  const brickCustomColorElement = document.querySelector(
    "input#brick-custom-color",
  );
  brickCustomColorElement.value =
    gameConfiguration.graphics.colors.brick.customColor;

  const brickCustomColorWrapperElement = document.querySelector(
    "label[for='brick-custom-color']",
  );

  if (gameConfiguration.graphics.colors.brick.type === "custom") {
    brickCustomColorWrapperElement.classList.remove("hidden");
  } else {
    brickCustomColorWrapperElement.classList.add("hidden");
  }

  // BONUS
  const bonusColorElement = document.querySelector("select#bonus-color");
  bonusColorElement.value = gameConfiguration.graphics.colors.bonus.type;

  const bonusCustomColorElement = document.querySelector(
    "input#bonus-custom-color",
  );
  bonusCustomColorElement.value =
    gameConfiguration.graphics.colors.bonus.customColor;

  const bonusCustomColorWrapperElement = document.querySelector(
    "label[for='bonus-custom-color']",
  );

  if (gameConfiguration.graphics.colors.bonus.type === "custom") {
    bonusCustomColorWrapperElement.classList.remove("hidden");
  } else {
    bonusCustomColorWrapperElement.classList.add("hidden");
  }

  // BRICK HP
  const brickHpColorElement = document.querySelector("select#brick-hp-color");
  brickHpColorElement.value = gameConfiguration.graphics.colors.brickHp.type;

  const brickHpCustomColorElement = document.querySelector(
    "input#brick-hp-custom-color",
  );
  brickHpCustomColorElement.value =
    gameConfiguration.graphics.colors.brickHp.customColor;

  const brickHpCustomColorWrapperElement = document.querySelector(
    "label[for='brick-hp-custom-color']",
  );

  if (gameConfiguration.graphics.colors.brickHp.type === "custom") {
    brickHpCustomColorWrapperElement.classList.remove("hidden");
  } else {
    brickHpCustomColorWrapperElement.classList.add("hidden");
  }

  // COLORS ARRAY
  const colorsListElement = document.querySelector(".colors-list");
  const addColorButtonElement = colorsListElement.querySelector(
    "button[data-purpose='add-color']",
  );

  colorsListElement
    .querySelectorAll(".colors-item")
    .forEach((colorItemElement) => colorItemElement.remove());

  gameConfiguration.graphics.colors.array.forEach((color) => {
    const colorItemElement = createColorItemElement(color);

    addColorButtonElement.before(colorItemElement);
  });

  updateDeleteColorButtonsState(colorsListElement);
}

export function createColorItemElement(color) {
  const colorItemElement = document.createElement("div");
  colorItemElement.classList.add("colors-item");

  const colorInputElement = document.createElement("input");
  colorInputElement.type = "color";
  colorInputElement.value = color;

  const deleteButtonElement = document.createElement("button");
  deleteButtonElement.classList.add("ui-button");
  deleteButtonElement.dataset.purpose = "delete-color";
  deleteButtonElement.innerText = "Delete";

  colorItemElement.append(colorInputElement, deleteButtonElement);

  return colorItemElement;
}

export function updateDeleteColorButtonsState(colorsListElement) {
  const colorItemElements = colorsListElement.querySelectorAll(".colors-item");
  const isLastColor = colorItemElements.length <= 1;

  colorItemElements.forEach((colorItemElement) => {
    const deleteButtonElement = colorItemElement.querySelector(
      "button[data-purpose='delete-color']",
    );

    deleteButtonElement.disabled = isLastColor;
  });
}
