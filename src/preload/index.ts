import { contextBridge, ipcRenderer, IpcRendererEvent } from 'electron';

// Whitelist of valid channels used for IPC communication (Send message from Renderer to Main)
const mainAvailChannels: string[] = ['msgRequestGetVersion', 'msgOpenExternalLink'];
const rendererAvailChannels: string[] = [];

export interface MainApi {
  send: (channel: string, ...data: unknown[]) => void;
  sendSync: (channel: string, ...data: unknown[]) => unknown;
  on: (channel: string, listener: (event: IpcRendererEvent, ...args: unknown[]) => void) => void;
  once: (channel: string, listener: (event: IpcRendererEvent, ...args: unknown[]) => void) => void;
  off: (channel: string, listener: (event: IpcRendererEvent, ...args: unknown[]) => void) => void;
  invoke: (channel: string, ...data: unknown[]) => Promise<unknown>;
}

const MainApi: MainApi = {
  send: (channel: string, ...data: unknown[]): void => {
    if (mainAvailChannels.includes(channel)) {
      ipcRenderer.send.apply(null, [channel, ...data]);
    } else {
      throw new Error(`Unknown ipc channel name: ${channel}`);
    }
  },
  sendSync: (channel: string, ...data: unknown[]): unknown => {
    if (mainAvailChannels.includes(channel)) {
      return ipcRenderer.sendSync.apply(null, [channel, ...data]);
    }

    throw new Error(`Unknown ipc channel name: ${channel}`);
  },

  on: (channel: string, listener: (event: IpcRendererEvent, ...args: unknown[]) => void): void => {
    if (rendererAvailChannels.includes(channel)) {
      ipcRenderer.on(channel, listener);
    } else {
      throw new Error(`Unknown ipc channel name: ${channel}`);
    }
  },

  once: (
    channel: string,
    listener: (event: IpcRendererEvent, ...args: unknown[]) => void,
  ): void => {
    if (rendererAvailChannels.includes(channel)) {
      ipcRenderer.once(channel, listener);
    } else {
      throw new Error(`Unknown ipc channel name: ${channel}`);
    }
  },

  off: (channel: string, listener: (event: IpcRendererEvent, ...args: unknown[]) => void): void => {
    if (rendererAvailChannels.includes(channel)) {
      ipcRenderer.off(channel, listener);
    } else {
      throw new Error(`Unknown ipc channel name: ${channel}`);
    }
  },
  invoke: async (channel: string, ...data: unknown[]): Promise<unknown> => {
    if (mainAvailChannels.includes(channel)) {
      const result = await ipcRenderer.invoke.apply(null, [channel, ...data]);
      return result;
    }
    throw new Error(`Unknown ipc channel name: ${channel}`);
  },
};

contextBridge.exposeInMainWorld('mainApi', MainApi);
