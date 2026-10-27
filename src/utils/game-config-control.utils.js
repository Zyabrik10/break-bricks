import { defaultConfiguration, gameConfiguration } from "../game/globals";
import { initAudios } from "../game/utils";
import { getStorageItem, setStorageItem } from "./storage.utils";

const GAME_CONFIG_STORAGE_KEY = "game-config";

export function saveGameConfig(gameConfig) {
  setStorageItem(GAME_CONFIG_STORAGE_KEY, gameConfig);
}

export function getGameConfig() {
  const localGameConfig = getStorageItem(
    GAME_CONFIG_STORAGE_KEY,
    defaultConfiguration,
  );

  return localGameConfig;
}

export function initGameConfig() {
  const localGameConfig = getGameConfig();

  gameConfiguration.set(localGameConfig);
}

export function updateGameConfiguration(
  ...gameConfigurationStoreUpdateArguments
) {
  gameConfiguration.update(...gameConfigurationStoreUpdateArguments);
  saveGameConfig(gameConfiguration.get());
  initAudios(gameConfiguration.get());
}

export function setGameConfiguration(newConfiguration) {
  gameConfiguration.set(newConfiguration);
  saveGameConfig(gameConfiguration.get());
  initAudios(gameConfiguration.get());
}
