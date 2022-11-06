import { makeAutoObservable } from "mobx";
import axios from "axios";

const api = axios.create({
  baseURL: "https://uplp.virusbeats.ru",
});

class State {
  fileId = null;
  stateFiles = [];
  fileList = [];
  sendingFiles = false;
  logInfo = {}

  constructor() {
    makeAutoObservable(this);
  }

  setFileId(data) {
    this.fileId = data;
  }

  setSendingFiles(data) {
    this.sendingFiles = data;
  }

  async getLogInfoFile() {
    let response = await api.get(`/log/${this.fileId}`)
    this.logInfo = response.data
    console.log(this.logInfo)
  }

  async downloadFile(mode) {
    let response = null;
    switch (mode) {
      case "XML":
        response = await fetch(
          `https://uplp.virusbeats.ru/uplp/xml?ids=${this.fileId}`
        );
        break;
      case "XLSX":
        response = await fetch(
          `https://uplp.virusbeats.ru/uplp/xlsx?ids=${this.fileId}`
        );
        break;
      case "JSON":
        response = await fetch(
          `https://uplp.virusbeats.ru/uplp/json?ids=${this.fileId}`
        );
        break;
      case "CSV":
        response = await fetch(
          `https://uplp.virusbeats.ru/uplp/csv?ids=${this.fileId}`
        );
        break;

      default:
        break;
    }
    console.log(response.status);
    if (response.status === 200) {
      const blob = await response.blob();
      const downloadUrl = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = downloadUrl;
      link.download = `Готовый файл №${
        this.fileId
      } ${mode.toLowerCase()}.${mode.toLowerCase()}`;
      document.body.appendChild(link);
      link.click();
      link.remove();
    }
  }

  async deleteFile() {
    let response = await api.delete(`/uplp/${this.fileId}`);
    this.FetchFiles();
  }

  async handleChange(data) {
    this.setSendingFiles(true);
    for (let i = 0; i < data.length; i++) {
      console.log("Sending...");
      await this.handleUpload(data[i]);
      console.log("Sended");
    }
    this.setSendingFiles(false);
    this.FetchFiles();
  }

  setFileList(data) {
    this.fileList = data;
  }

  async handleUpload(file) {
    if (!this.stateFiles) {
      alert("Вы не выбрали файл!");
      return;
    }
    const formData = new FormData();
    formData.append("file", file);
    let response = await api.post("/uplp", formData);
    console.log(response.data);
  }

  async FetchFiles() {
    let response = await api.get("/uplp/all");
    let data = response.data
    for (let i = 0; i < data.length; i++) {
      let response = await api.get(`/log/${data[i].uplpDocId}`)
      data[i].fileName = response.data.fileName
    }
    this.setFileList(data);
  }
}

export default new State();
