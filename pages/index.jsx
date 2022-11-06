import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.scss";
import { stringify } from "querystring";

import { SlMagnifier } from "react-icons/sl";
import { BiTrashAlt } from "react-icons/bi";
import {
  AiOutlineExclamationCircle,
  AiOutlineCloudDownload,
} from "react-icons/ai";
import { useRef, useState } from "react";
export default function Home() {
  const [selectedFiles, setSelectedFiles] = useState(null);
  let array = [
    { id: 1, name: "План ПГЗУ от 27.10.22.xsl", date: "05.11.2022" },
    {
      id: 2,
      name: "План ПГЗУ от 28.10.22.xsl",
      date: "05.11.2022",
    },
    { id: 3, name: "План ПГЗУ от 29.10.22.xsl", date: "05.11.2022" },
    { id: 4, name: "План ПГЗУ от 30.10.22.xsl", date: "05.11.2022" },
    { id: 5, name: "План ПГЗУ от 31.10.22.xsl", date: "05.11.2022" },
    { id: 6, name: "План ПГЗУ от 01.11.22.xsl", date: "05.11.2022" },
  ];

  const filePicker = useRef();

  const handlePick = () => {
    filePicker.current.click();
  };

  const handleUpload = () => {
    if (!selectedFile) {
      alert("Вы не выбрали файл!");
      return;
    }
    const formData = new FormData();
    formData.append("file", selectedFiles);
    sendFiles()
  };

  const handleChange = (event) => {
    setSelectedFiles(event.target.files);
  };
  return (
    <div className={styles.container}>
      <Head>Ь
        <title>ГПЗУ | Главная страница</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header className={styles.topBar}>
        <h3>ГПЗУ</h3>
      </header>
      <div className={styles.mainContainer}>
        <h1 className={styles.mainText}>
          Сервис по обработке градостроительных планов земельных участков
        </h1>
        <div className={styles.useContainers}>
          <div className={styles.useContainer}>
            <h4>ОНЛАЙН-СЕРВИС</h4>
            <p>
              Сервис автоматически обрабатывает данные из электронного образа
              ГПЗУ (файл в формате PDF), преобразовывает в структурированный
              (машиночитаемый) формат, храненит и экспортирует в целях
              дальнейшего использования.
            </p>
            <div>
              <button onClick={handlePick}>
                ЗАГРУЗИТЬ ФАЙЛЫ
                <sup>
                  <small> .PDF</small>
                </sup>
              </button>
              <button onClick={handleUpload}>Отправить файл</button>
            </div>
            <input
              onChange={handleChange}
              type="file"
              className={styles.hidden}
              ref={filePicker}
            />
          </div>
          <div className={styles.list}>
            <input
              type="text"
              placeholder="Поиск по файлам"
              className={styles.listInput}
            />
            <SlMagnifier className={styles.listSVG} />
            <ul className={styles.listUl}>
              <li className={styles.listUlLiFirst + " " + styles.listUlLi}>
                <h2>Имя файла</h2>
                <h2>Дата</h2>
              </li>
              {array.map((file) => {
                return (
                  <li className={styles.listUlLi}>
                    <h2 className={styles.listUlLiId}>{file.id}</h2>
                    <h2 className={styles.listUlLiName}>{file.name}</h2>
                    <h2 className={styles.listUlLiDate}>{file.date}</h2>
                    <div className={styles.listUlButtons}>
                      <AiOutlineCloudDownload />
                      <AiOutlineExclamationCircle />
                      <BiTrashAlt />
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
